/** Leaf test plus ancestor `describe` titles, matching node:test `--test-name-pattern`. */
export type ParsedTest = {
  name: string;
  /** Space-joined suites + name, e.g. `dfsPreorder full tree`. */
  fullName: string;
  suites: string[];
};

export type SpecStatus = "pass" | "fail" | "skip";

function isIdentPart(ch: string): boolean {
  return /[A-Za-z0-9_$]/.test(ch);
}

function unescapeQuoted(value: string): string {
  return value.replace(/\\(['"`\\])/g, "$1");
}

/** True when `it(\`…${…}\`)` is a runtime-generated title, not a node:test name. */
export function testNameIsDynamic(name: string): boolean {
  return name.includes("${");
}

/** Parse a JS/TS string or template at `i`. Template interpolations are kept as source text. */
function parseQuoted(src: string, i: number): { value: string; end: number } | null {
  const q = src[i];
  if (q !== "'" && q !== '"' && q !== "`") return null;
  let j = i + 1;
  let value = "";
  while (j < src.length) {
    const ch = src[j]!;
    if (ch === "\\") {
      value += ch + (src[j + 1] ?? "");
      j += 2;
      continue;
    }
    if (q === "`" && ch === "$" && src[j + 1] === "{") {
      const start = j;
      j += 2;
      let depth = 1;
      while (j < src.length && depth > 0) {
        if (src[j] === "\\" ) {
          j += 2;
          continue;
        }
        const inner = parseQuoted(src, j);
        if (inner) {
          j = inner.end;
          continue;
        }
        if (src[j] === "{") depth++;
        else if (src[j] === "}") depth--;
        if (depth > 0) j++;
      }
      value += src.slice(start, j + 1);
      j++;
      continue;
    }
    if (ch === q) {
      return { value: unescapeQuoted(value), end: j + 1 };
    }
    value += ch;
    j++;
  }
  return null;
}

function skipQuoted(src: string, i: number): number {
  const parsed = parseQuoted(src, i);
  return parsed?.end ?? i + 1;
}

/**
 * Collect `it(...)` cases with enclosing `describe` titles from a test file.
 * `fullName` is what node:test matches with `--test-name-pattern="^…$"`.
 *
 * Interpolated titles (`it(\`n=${n}\`)`) never exist at runtime, so `fullName`
 * is the enclosing describe path — node:test then runs every generated child.
 */
export function parseTestsFromSource(source: string): ParsedTest[] {
  const tests: ParsedTest[] = [];
  const suiteStack: { name: string; depth: number }[] = [];
  let pendingSuite: string | null = null;
  let depth = 0;
  let i = 0;

  while (i < source.length) {
    if (source.startsWith("//", i)) {
      const nl = source.indexOf("\n", i);
      i = nl < 0 ? source.length : nl + 1;
      continue;
    }
    if (source.startsWith("/*", i)) {
      const end = source.indexOf("*/", i + 2);
      i = end < 0 ? source.length : end + 2;
      continue;
    }

    const ch = source[i]!;
    if (ch === "'" || ch === '"' || ch === "`") {
      i = skipQuoted(source, i);
      continue;
    }

    if (ch === "{") {
      depth++;
      if (pendingSuite !== null) {
        suiteStack.push({ name: pendingSuite, depth });
        pendingSuite = null;
      }
      i++;
      continue;
    }

    if (ch === "}") {
      while (suiteStack.length > 0 && suiteStack[suiteStack.length - 1]!.depth === depth) {
        suiteStack.pop();
      }
      depth = Math.max(0, depth - 1);
      i++;
      continue;
    }

    if (isIdentPart(ch) && (i === 0 || !isIdentPart(source[i - 1]!))) {
      let j = i;
      while (j < source.length && isIdentPart(source[j]!)) j++;
      const ident = source.slice(i, j);
      if (ident === "describe" || ident === "it") {
        let k = j;
        while (k < source.length && /\s/.test(source[k]!)) k++;
        if (source[k] === ".") {
          k++;
          while (k < source.length && isIdentPart(source[k]!)) k++;
        }
        while (k < source.length && /\s/.test(source[k]!)) k++;
        if (source[k] === "(") {
          k++;
          while (k < source.length && /\s/.test(source[k]!)) k++;
          const quoted = parseQuoted(source, k);
          if (quoted) {
            if (ident === "describe") {
              pendingSuite = quoted.value;
            } else {
              const suites = suiteStack.map((s) => s.name);
              const name = quoted.value;
              const fullName =
                testNameIsDynamic(name) && suites.length > 0
                  ? suites.join(" ")
                  : [...suites, name].join(" ");
              tests.push({ name, fullName, suites: [...suites] });
            }
            i = quoted.end;
            continue;
          }
        }
      }
      i = j;
      continue;
    }

    i++;
  }

  return tests;
}

/**
 * Map spec-reporter lines to `fullName` → status.
 * Tracks `▶` suite headers so duplicate `it` titles in different describes stay distinct.
 * Stops before the summary / "failing tests" dump, which repeats leaf names without suites.
 */
export function parseSpecResults(text: string): Map<string, SpecStatus> {
  const results = new Map<string, SpecStatus>();
  const stack: { indent: number; name: string }[] = [];

  for (const line of text.split(/\r?\n/)) {
    if (/^[ \t]*ℹ\s+tests\b/.test(line) || /^\s*✖\s+failing tests:\s*$/.test(line)) {
      break;
    }

    const start = /^( *)▶[ \t]+(.+)$/.exec(line);
    if (start) {
      const indent = start[1]!.length;
      const name = start[2]!.trim();
      while (stack.length > 0 && stack[stack.length - 1]!.indent >= indent) {
        stack.pop();
      }
      stack.push({ indent, name });
      continue;
    }

    const result = /^( *)([✔✖◯﹣-])[ \t]+(.+?)[ \t]+\([\d.]+m?s\)[ \t]*$/.exec(line);
    if (!result) continue;

    const indent = result[1]!.length;
    const mark = result[2]!;
    const name = result[3]!.trim();

    while (stack.length > 0 && stack[stack.length - 1]!.indent > indent) {
      stack.pop();
    }
    if (
      stack.length > 0 &&
      stack[stack.length - 1]!.indent === indent &&
      stack[stack.length - 1]!.name === name
    ) {
      stack.pop();
      continue;
    }

    const fullName = [...stack.map((s) => s.name), name].join(" ");
    const status: SpecStatus = mark === "✔" ? "pass" : mark === "✖" ? "fail" : "skip";
    results.set(fullName, status);
  }

  return results;
}

function descendantStatus(
  fullName: string,
  results: Map<string, SpecStatus>,
): SpecStatus | undefined {
  let saw = false;
  let fail = false;
  let skip = false;
  for (const [name, status] of results) {
    if (name !== fullName && !name.startsWith(`${fullName} `)) continue;
    saw = true;
    if (status === "fail") fail = true;
    else if (status === "skip") skip = true;
  }
  if (!saw) return undefined;
  if (fail) return "fail";
  if (skip) return "skip";
  return "pass";
}

/** Map spec results onto parsed tests (generated `it` titles match descendant names). */
export function statusesFromSpecResults(
  tests: ParsedTest[],
  results: Map<string, SpecStatus>,
): Map<string, SpecStatus> {
  const next = new Map<string, SpecStatus>();
  for (const test of tests) {
    const status = testNameIsDynamic(test.name)
      ? descendantStatus(test.fullName, results)
      : results.get(test.fullName);
    if (status) next.set(test.fullName, status);
  }
  return next;
}
