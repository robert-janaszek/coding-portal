import { spawn, type ChildProcess } from "node:child_process";
import { createReadStream, existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const PUBLIC = join(ROOT, "portal", "public");
const PORT = Number(process.env.PORT) || 3456;

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".svg": "image/svg+xml",
  ".json": "application/json",
};

type Problem = {
  id: string;
  title: string;
  testFile: string;
};

let running: ChildProcess | null = null;

function json(res: ServerResponse, status: number, body: unknown) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
  });
  res.end(JSON.stringify(body));
}

function discoverProblems(): Problem[] {
  const entries = readdirSync(ROOT, { withFileTypes: true });
  const problems: Problem[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "node_modules" || entry.name === "portal" || entry.name === "test") {
      continue;
    }

    const dir = join(ROOT, entry.name);
    const problemMd = join(dir, "PROBLEM.md");
    if (!existsSync(problemMd)) continue;

    const testFile = readdirSync(dir).find((f) => f.endsWith(".test.ts"));
    if (!testFile) continue;

    const md = readFileSync(problemMd, "utf8");
    const titleMatch = md.match(/^#\s+(.+)$/m);
    problems.push({
      id: entry.name,
      title: titleMatch?.[1]?.trim() ?? entry.name,
      testFile: join(entry.name, testFile),
    });
  }

  return problems.sort((a, b) => a.id.localeCompare(b.id));
}

function findProblem(id: string): Problem | undefined {
  return discoverProblems().find((p) => p.id === id);
}

function parseTestNames(testFileRel: string): string[] {
  const content = readFileSync(join(ROOT, testFileRel), "utf8");
  const names: string[] = [];
  const re = /\bit\s*\(\s*(['"`])((?:\\.|(?!\1).)*)\1/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(content)) !== null) {
    names.push(match[2]!.replace(/\\(['"`])/g, "$1"));
  }
  return names;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function writeSse(res: ServerResponse, event: string, data: unknown) {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

function runTests(
  res: ServerResponse,
  problem: Problem,
  testName: string | null,
) {
  if (running) {
    running.kill("SIGTERM");
    running = null;
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });
  res.write(":\n\n");

  const args = ["--test", "--test-reporter=spec"];
  if (testName) {
    args.push(`--test-name-pattern=^${escapeRegex(testName)}$`);
  }
  args.push(problem.testFile);

  writeSse(res, "status", {
    state: "running",
    command: `tsx ${args.join(" ")}`,
  });

  const tsxBin = join(ROOT, "node_modules", ".bin", "tsx");
  const child = spawn(tsxBin, args, {
    cwd: ROOT,
    env: { ...process.env, FORCE_COLOR: "0" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  running = child;

  const sendChunk = (stream: "stdout" | "stderr", chunk: Buffer) => {
    const text = chunk.toString("utf8");
    if (text.length === 0) return;
    writeSse(res, "output", { stream, text });
  };

  child.stdout?.on("data", (chunk: Buffer) => sendChunk("stdout", chunk));
  child.stderr?.on("data", (chunk: Buffer) => sendChunk("stderr", chunk));

  const cleanup = () => {
    if (running === child) running = null;
  };

  child.on("error", (err) => {
    writeSse(res, "output", { stream: "stderr", text: String(err) + "\n" });
    writeSse(res, "exit", { code: 1 });
    cleanup();
    res.end();
  });

  child.on("close", (code, signal) => {
    writeSse(res, "exit", { code: code ?? 1, signal });
    cleanup();
    res.end();
  });

  reqClose(res, () => {
    if (running === child) {
      child.kill("SIGTERM");
      running = null;
    }
  });
}

function reqClose(res: ServerResponse, onClose: () => void) {
  res.on("close", onClose);
}

function serveStatic(reqPath: string, res: ServerResponse) {
  let filePath: string;
  if (reqPath === "/vendor/marked.esm.js") {
    filePath = join(ROOT, "node_modules", "marked", "lib", "marked.esm.js");
  } else {
    const relative = reqPath === "/" ? "/index.html" : reqPath;
    filePath = resolve(join(PUBLIC, relative));
    if (!filePath.startsWith(PUBLIC)) {
      json(res, 404, { error: "Not found" });
      return;
    }
  }
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    json(res, 404, { error: "Not found" });
    return;
  }
  const type = MIME[extname(filePath)] ?? "application/octet-stream";
  res.writeHead(200, { "Content-Type": type });
  createReadStream(filePath).pipe(res);
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolveBody, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolveBody(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://${req.headers.host ?? "localhost"}`);
  const { pathname } = url;

  try {
    if (req.method === "GET" && pathname === "/api/problems") {
      json(res, 200, discoverProblems());
      return;
    }

    const problemMatch = pathname.match(/^\/api\/problems\/([^/]+)$/);
    if (req.method === "GET" && problemMatch) {
      const id = decodeURIComponent(problemMatch[1]!);
      const problem = findProblem(id);
      if (!problem) {
        json(res, 404, { error: "Problem not found" });
        return;
      }
      const markdown = readFileSync(join(ROOT, problem.id, "PROBLEM.md"), "utf8");
      json(res, 200, { ...problem, markdown });
      return;
    }

    const testsMatch = pathname.match(/^\/api\/problems\/([^/]+)\/tests$/);
    if (req.method === "GET" && testsMatch) {
      const id = decodeURIComponent(testsMatch[1]!);
      const problem = findProblem(id);
      if (!problem) {
        json(res, 404, { error: "Problem not found" });
        return;
      }
      json(res, 200, { tests: parseTestNames(problem.testFile) });
      return;
    }

    if (req.method === "GET" && pathname === "/api/run") {
      const id = url.searchParams.get("problem");
      const name = url.searchParams.get("name");
      if (!id) {
        json(res, 400, { error: "Missing problem query param" });
        return;
      }
      const problem = findProblem(id);
      if (!problem) {
        json(res, 404, { error: "Problem not found" });
        return;
      }
      runTests(res, problem, name);
      return;
    }

    if (req.method === "POST" && pathname === "/api/stop") {
      await readBody(req);
      if (running) {
        running.kill("SIGTERM");
        running = null;
      }
      json(res, 200, { ok: true });
      return;
    }

    if (req.method === "GET") {
      serveStatic(pathname, res);
      return;
    }

    json(res, 405, { error: "Method not allowed" });
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      json(res, 500, { error: String(err) });
    } else {
      res.end();
    }
  }
});

server.listen(PORT, () => {
  console.log(`Coding portal: http://localhost:${PORT}`);
});
