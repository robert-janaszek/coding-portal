import { spawn, type ChildProcess } from "node:child_process";
import {
  copyFileSync,
  createReadStream,
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
} from "node:fs";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { basename, dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  archiveImpl,
  getStatus,
  isProgressStatus,
  migrateLegacySolutions,
  setStatus,
  type ProgressStatus,
} from "./progress";

const ROOT = resolve(fileURLToPath(new URL("..", import.meta.url)));
const DIST = join(ROOT, "portal", "dist");
const PORT = Number(process.env.PORT) || 3456;
/** When set (e.g. `portal:api` next to Vite), do not serve portal/dist — avoid stale UI on :3456. */
const API_ONLY = process.env.PORTAL_API_ONLY === "1";

/** Kill a test run after this long with no stdout/stderr (covers sync infinite loops). */
const TEST_STALL_TIMEOUT_MS = 2_000;

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
  difficulty: string | null;
  family: string | null;
  topics: string[];
  testFile: string;
  /** Latest attempt status from progress.json, or null if unset. */
  status: ProgressStatus | null;
};

/** Parse `**Difficulty:** Easy …` → primary label (Easy / Medium / Hard) or trimmed line. */
function parseDifficulty(md: string): string | null {
  const m = md.match(/\*\*Difficulty:\*\*\s*(.+)/i);
  if (!m?.[1]) return null;
  const line = m[1].trim();
  const primary = line.match(/^(Easy|Medium|Hard)\b/i);
  if (primary?.[1]) {
    return primary[1]![0]!.toUpperCase() + primary[1]!.slice(1).toLowerCase();
  }
  const short = line.split(/[(\n]/)[0]?.trim();
  return short || null;
}

/** Parse `**Topics:** Graph, DFS` → trimmed topic tags. */
function parseTopics(md: string): string[] {
  const m = md.match(/\*\*Topics:\*\*\s*(.+)/i);
  if (!m?.[1]) return [];
  return m[1]
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

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
    const topics = parseTopics(md);
    problems.push({
      id: entry.name,
      title: titleMatch?.[1]?.trim() ?? entry.name,
      difficulty: parseDifficulty(md),
      family: topics[0] ?? null,
      topics,
      testFile: join(entry.name, testFile),
      status: getStatus(ROOT, entry.name),
    });
  }

  return problems.sort((a, b) => a.id.localeCompare(b.id));
}

function findProblem(id: string): Problem | undefined {
  return discoverProblems().find((p) => p.id === id);
}

/** Resolve the stub/impl `.ts` path from the test file's local import. */
function findImplFile(problem: Problem): string {
  const testContent = readFileSync(join(ROOT, problem.testFile), "utf8");
  const match = testContent.match(/from\s+["']\.\/([^"']+)["']/);
  if (!match?.[1]) {
    throw new Error(`No local './…' import found in ${problem.testFile}`);
  }

  let rel = match[1];
  if (!rel.endsWith(".ts")) rel += ".ts";
  const implPath = join(ROOT, problem.id, basename(rel));
  if (!existsSync(implPath)) {
    throw new Error(`Implementation file not found: ${problem.id}/${basename(rel)}`);
  }
  return implPath;
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

function tsxBin(): string {
  return join(ROOT, "node_modules", ".bin", "tsx");
}

/** SIGKILL the whole process group — tsx/node:test spawn grandchildren that hold stdio open. */
function forceKill(child: ChildProcess) {
  const pid = child.pid;
  if (!pid) return;
  try {
    process.kill(-pid, "SIGKILL");
  } catch {
    try {
      child.kill("SIGKILL");
    } catch {
      /* already dead */
    }
  }
  child.stdout?.destroy();
  child.stderr?.destroy();
}

/**
 * If the child produces no output for TEST_STALL_TIMEOUT_MS, call onStall.
 * Resets on each stdout/stderr chunk so a suite of fast tests is fine.
 * Returns a disposer that clears the timer.
 */
function watchStall(child: ChildProcess, onStall: () => void): () => void {
  let timer = setTimeout(onStall, TEST_STALL_TIMEOUT_MS);
  const bump = () => {
    clearTimeout(timer);
    timer = setTimeout(onStall, TEST_STALL_TIMEOUT_MS);
  };
  child.stdout?.on("data", bump);
  child.stderr?.on("data", bump);
  return () => clearTimeout(timer);
}

function spawnTests(args: string[]): ChildProcess {
  return spawn(tsxBin(), args, {
    cwd: ROOT,
    env: { ...process.env, FORCE_COLOR: "0" },
    stdio: ["ignore", "pipe", "pipe"],
    // New process group so forceKill can SIGKILL tsx + node:test workers together.
    detached: true,
  });
}

function buildTestArgs(problem: Problem, testName: string | null): string[] {
  // isolation=none: one process — sync infinite loops are killable without orphan workers.
  const args = ["--test", "--test-isolation=none", "--test-reporter=spec"];
  if (testName) {
    args.push(`--test-name-pattern=^${escapeRegex(testName)}$`);
  }
  args.push(problem.testFile);
  return args;
}

function runTestsOnce(
  problem: Problem,
  testName: string | null = null,
): Promise<{ code: number; stdout: string; stderr: string }> {
  return new Promise((resolvePromise, reject) => {
    const args = buildTestArgs(problem, testName);
    const child = spawnTests(args);

    let stdout = "";
    let stderr = "";
    let timedOut = false;
    let settled = false;

    const settle = (code: number) => {
      if (settled) return;
      settled = true;
      clearStall();
      resolvePromise({ code, stdout, stderr });
    };

    const clearStall = watchStall(child, () => {
      timedOut = true;
      stderr += `\n[timeout] No test output for ${TEST_STALL_TIMEOUT_MS / 1000}s — killed (possible infinite loop)\n`;
      forceKill(child);
      settle(1);
    });

    child.stdout?.on("data", (chunk: Buffer) => {
      stdout += chunk.toString("utf8");
    });
    child.stderr?.on("data", (chunk: Buffer) => {
      stderr += chunk.toString("utf8");
    });
    child.on("error", (err) => {
      clearStall();
      if (!settled) {
        settled = true;
        reject(err);
      }
    });
    // Prefer `exit` over `close` — grandchildren can keep stdio open after the parent dies.
    child.on("exit", (code) => {
      settle(timedOut ? 1 : (code ?? 1));
    });
  });
}

function writeSse(res: ServerResponse, event: string, data: unknown) {
  res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}

function runTestsSse(
  res: ServerResponse,
  problem: Problem,
  testName: string | null,
) {
  if (running) {
    forceKill(running);
    running = null;
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
  });
  res.write(":\n\n");

  const args = buildTestArgs(problem, testName);

  writeSse(res, "status", {
    state: "running",
    command: `tsx ${args.join(" ")}`,
  });

  const child = spawnTests(args);
  running = child;

  let timedOut = false;
  let finished = false;

  const finish = (code: number, signal: NodeJS.Signals | null) => {
    if (finished) return;
    finished = true;
    clearStall();
    writeSse(res, "exit", {
      code,
      signal: timedOut ? "SIGKILL" : signal,
      timedOut,
    });
    if (running === child) running = null;
    res.end();
  };

  const clearStall = watchStall(child, () => {
    timedOut = true;
    writeSse(res, "output", {
      stream: "stderr",
      text: `\n[timeout] No test output for ${TEST_STALL_TIMEOUT_MS / 1000}s — killed (possible infinite loop)\n`,
    });
    forceKill(child);
    // Don't wait for exit/close — orphaned workers previously left the UI stuck on "running".
    finish(1, "SIGKILL");
  });

  const sendChunk = (stream: "stdout" | "stderr", chunk: Buffer) => {
    const text = chunk.toString("utf8");
    if (text.length === 0) return;
    writeSse(res, "output", { stream, text });
  };

  child.stdout?.on("data", (chunk: Buffer) => sendChunk("stdout", chunk));
  child.stderr?.on("data", (chunk: Buffer) => sendChunk("stderr", chunk));

  child.on("error", (err) => {
    writeSse(res, "output", { stream: "stderr", text: String(err) + "\n" });
    finish(1, null);
  });

  child.on("exit", (code, signal) => {
    finish(timedOut ? 1 : (code ?? 1), signal);
  });

  reqClose(res, () => {
    clearStall();
    if (running === child) {
      forceKill(child);
      running = null;
    }
  });
}

/** Hidden stub template next to the impl, e.g. `.climbStairs.ts`. */
function findStubTemplate(implPath: string): string {
  const templatePath = join(dirname(implPath), `.${basename(implPath)}`);
  if (!existsSync(templatePath)) {
    throw new Error(`Stub template not found: ${basename(dirname(implPath))}/.${basename(implPath)}`);
  }
  return templatePath;
}

async function finishProblem(
  problem: Problem,
  status: ProgressStatus,
  elapsedMs?: number,
): Promise<{ status: ProgressStatus; archive: string; elapsedMs?: number }> {
  if (running) {
    forceKill(running);
    running = null;
  }

  if (status === "pass") {
    const result = await runTestsOnce(problem);
    if (result.code !== 0) {
      throw Object.assign(new Error("Tests must all pass before marking as done"), {
        status: 400,
        detail: result.stderr || result.stdout,
      });
    }
  }

  const implPath = findImplFile(problem);
  const stubTemplate = findStubTemplate(implPath);
  const meta =
    typeof elapsedMs === "number" && Number.isFinite(elapsedMs) && elapsedMs >= 0
      ? { elapsedMs }
      : undefined;
  const archive = archiveImpl(ROOT, problem.id, implPath, status, meta);
  copyFileSync(stubTemplate, implPath);
  setStatus(ROOT, problem.id, status);
  return { status, archive, ...(meta ? { elapsedMs: meta.elapsedMs } : {}) };
}

function reqClose(res: ServerResponse, onClose: () => void) {
  res.on("close", onClose);
}

function serveStatic(reqPath: string, res: ServerResponse) {
  if (API_ONLY || !existsSync(DIST)) {
    json(res, 503, {
      error: API_ONLY
        ? "API-only mode. Open the Vite UI (default http://localhost:5173)."
        : "UI not built. Run `npm run portal:ui` (dev) or `npm run portal:build`.",
    });
    return;
  }

  const relative = reqPath === "/" ? "/index.html" : reqPath;
  let filePath = resolve(join(DIST, relative));
  if (!filePath.startsWith(DIST)) {
    json(res, 404, { error: "Not found" });
    return;
  }

  // SPA fallback: unknown paths without a file extension → index.html
  if (!existsSync(filePath) || !statSync(filePath).isFile()) {
    if (extname(relative) === "") {
      filePath = join(DIST, "index.html");
    } else {
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

    const finishMatch = pathname.match(/^\/api\/problems\/([^/]+)\/finish$/);
    if (req.method === "POST" && finishMatch) {
      const raw = await readBody(req);
      let body: { status?: unknown; elapsedMs?: unknown } = {};
      try {
        body = raw ? (JSON.parse(raw) as { status?: unknown; elapsedMs?: unknown }) : {};
      } catch {
        json(res, 400, { error: "Invalid JSON body" });
        return;
      }
      if (!isProgressStatus(body.status)) {
        json(res, 400, { error: "Body must include status: pass | softpass | fail" });
        return;
      }
      const elapsedMs =
        typeof body.elapsedMs === "number" && Number.isFinite(body.elapsedMs)
          ? body.elapsedMs
          : undefined;
      const id = decodeURIComponent(finishMatch[1]!);
      const problem = findProblem(id);
      if (!problem) {
        json(res, 404, { error: "Problem not found" });
        return;
      }
      try {
        const result = await finishProblem(problem, body.status, elapsedMs);
        json(res, 200, { ok: true, ...result });
      } catch (err) {
        const status = (err as { status?: number }).status ?? 500;
        const message = err instanceof Error ? err.message : String(err);
        const detail = (err as { detail?: string }).detail;
        json(res, status, { error: message, detail });
      }
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
      runTestsSse(res, problem, name);
      return;
    }

    if (req.method === "POST" && pathname === "/api/stop") {
      await readBody(req);
      if (running) {
        forceKill(running);
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

migrateLegacySolutions(ROOT);

server.listen(PORT, () => {
  console.log(`Coding portal API: http://localhost:${PORT}`);
  if (API_ONLY) {
    console.log(`API-only (no static UI). Open Vite: http://localhost:5173`);
  } else if (existsSync(DIST)) {
    console.log(`Serving UI from portal/dist`);
  } else {
    console.log(`UI: run \`npm run portal:ui\` (Vite) or \`npm run portal:build\``);
  }
});
