import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";

export type ProgressStatus = "pass" | "softpass" | "fail";

export type ProblemProgress = {
  status: ProgressStatus;
  updatedAt: string;
};

export type ProgressFile = {
  problems: Record<string, ProblemProgress>;
};

const STATUSES = new Set<ProgressStatus>(["pass", "softpass", "fail"]);

export function isProgressStatus(value: unknown): value is ProgressStatus {
  return typeof value === "string" && STATUSES.has(value as ProgressStatus);
}

function progressPath(root: string): string {
  return join(root, "progress.json");
}

function emptyProgress(): ProgressFile {
  return { problems: {} };
}

export function readProgress(root: string): ProgressFile {
  const path = progressPath(root);
  if (!existsSync(path)) return emptyProgress();
  try {
    const raw = JSON.parse(readFileSync(path, "utf8")) as ProgressFile;
    if (!raw || typeof raw !== "object" || typeof raw.problems !== "object" || !raw.problems) {
      return emptyProgress();
    }
    return raw;
  } catch {
    return emptyProgress();
  }
}

export function writeProgress(root: string, data: ProgressFile): void {
  writeFileSync(progressPath(root), `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function getStatus(root: string, id: string): ProgressStatus | null {
  const entry = readProgress(root).problems[id];
  return entry?.status ?? null;
}

export function setStatus(root: string, id: string, status: ProgressStatus): ProblemProgress {
  const data = readProgress(root);
  const entry: ProblemProgress = {
    status,
    updatedAt: new Date().toISOString(),
  };
  data.problems[id] = entry;
  writeProgress(root, data);
  return entry;
}

/** Filename-safe timestamp for archive files. */
export function archiveTimestamp(date = new Date()): string {
  return date.toISOString().replace(/[:.]/g, "-");
}

/** Per-problem archive directory: `<problem-id>/solutions/`. */
export function problemSolutionsDir(root: string, problemId: string): string {
  return join(root, problemId, "solutions");
}

export function archiveSolutionPath(
  root: string,
  problemId: string,
  status: ProgressStatus,
  date = new Date(),
): string {
  return join(problemSolutionsDir(root, problemId), `${archiveTimestamp(date)}-${status}.ts`);
}

/**
 * Copy impl into `<problem-id>/solutions/…` and ensure the directory exists.
 * Returns the relative archive path from repo root.
 */
export function archiveImpl(
  root: string,
  problemId: string,
  implPath: string,
  status: ProgressStatus,
): string {
  const dest = archiveSolutionPath(root, problemId, status);
  mkdirSync(problemSolutionsDir(root, problemId), { recursive: true });
  copyFileSync(implPath, dest);
  return dest.slice(root.length + 1);
}

/**
 * Move archives from the old root-level `solutions/<id>/` into `<id>/solutions/`.
 */
function relocateRootSolutions(root: string): void {
  const legacyRoot = join(root, "solutions");
  if (!existsSync(legacyRoot)) return;

  for (const entry of readdirSync(legacyRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const fromDir = join(legacyRoot, entry.name);
    const toDir = problemSolutionsDir(root, entry.name);
    mkdirSync(toDir, { recursive: true });

    for (const file of readdirSync(fromDir)) {
      if (!file.endsWith(".ts")) continue;
      const from = join(fromDir, file);
      const to = join(toDir, file);
      if (!existsSync(to)) {
        renameSync(from, to);
      } else {
        unlinkSync(from);
      }
    }

    rmSync(fromDir, { recursive: true, force: true });
  }

  rmSync(legacyRoot, { recursive: true, force: true });
}

/**
 * One-time migration: move each problem's solution.ts into `<id>/solutions/`,
 * relocate root-level `solutions/`, and seed progress.json. Idempotent.
 */
export function migrateLegacySolutions(root: string): void {
  relocateRootSolutions(root);

  const data = readProgress(root);
  let changed = false;

  const entries = readdirSync(root, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "node_modules" || entry.name === "portal" || entry.name === "test") {
      continue;
    }

    const legacy = join(root, entry.name, "solution.ts");
    if (!existsSync(legacy)) continue;

    if (!data.problems[entry.name]) {
      data.problems[entry.name] = {
        status: "pass",
        updatedAt: new Date().toISOString(),
      };
      changed = true;
    }

    const dir = problemSolutionsDir(root, entry.name);
    mkdirSync(dir, { recursive: true });
    const hasArchive = readdirSync(dir).some((f) => f.endsWith(".ts"));
    if (!hasArchive) {
      copyFileSync(legacy, archiveSolutionPath(root, entry.name, "pass"));
    }

    unlinkSync(legacy);
    changed = true;
  }

  if (changed || !existsSync(progressPath(root))) {
    writeProgress(root, data);
  }
}
