export type TimerStatus = "idle" | "running" | "paused";

export type TimerState = {
  status: TimerStatus;
  accumulatedMs: number;
  startedAt: number | null;
};

const PREFIX = "coding-portal-timer:";

export function idleState(): TimerState {
  return { status: "idle", accumulatedMs: 0, startedAt: null };
}

function key(problemId: string): string {
  return `${PREFIX}${problemId}`;
}

export function loadTimer(problemId: string): TimerState {
  try {
    const raw = localStorage.getItem(key(problemId));
    if (!raw) return idleState();
    const parsed = JSON.parse(raw) as Partial<TimerState>;
    if (
      parsed.status !== "running" &&
      parsed.status !== "paused" &&
      parsed.status !== "idle"
    ) {
      return idleState();
    }
    return {
      status: parsed.status,
      accumulatedMs: typeof parsed.accumulatedMs === "number" ? parsed.accumulatedMs : 0,
      startedAt: typeof parsed.startedAt === "number" ? parsed.startedAt : null,
    };
  } catch {
    return idleState();
  }
}

export function saveTimer(problemId: string, state: TimerState): void {
  if (state.status === "idle") {
    localStorage.removeItem(key(problemId));
    return;
  }
  localStorage.setItem(key(problemId), JSON.stringify(state));
}

export function elapsedMs(state: TimerState, now = Date.now()): number {
  if (state.status === "running" && state.startedAt != null) {
    return state.accumulatedMs + (now - state.startedAt);
  }
  return state.accumulatedMs;
}

export function formatElapsed(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSec / 60);
  const seconds = totalSec % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export function startTimer(): TimerState {
  return { status: "running", accumulatedMs: 0, startedAt: Date.now() };
}

export function pauseTimer(state: TimerState, now = Date.now()): TimerState {
  if (state.status !== "running" || state.startedAt == null) {
    return { ...state, status: "paused", startedAt: null };
  }
  return {
    status: "paused",
    accumulatedMs: state.accumulatedMs + (now - state.startedAt),
    startedAt: null,
  };
}

export function resumeTimer(state: TimerState, now = Date.now()): TimerState {
  return {
    status: "running",
    accumulatedMs: state.accumulatedMs,
    startedAt: now,
  };
}

export function resetTimer(): TimerState {
  return idleState();
}

export function isSolving(state: TimerState): boolean {
  return state.status === "running" || state.status === "paused";
}
