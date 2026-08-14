import { marked } from "marked";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { familyRank } from "../catalog";
import { parseSpecResults, type ParsedTest } from "../parseTests";
import {
  elapsedMs,
  formatElapsed,
  isSolving,
  loadTimer,
  pauseTimer,
  resetTimer,
  resumeTimer,
  saveTimer,
  startTimer,
  type TimerState,
  type TimerStatus,
} from "./timer";

type ActiveTimerStatus = Exclude<TimerStatus, "idle">;

marked.setOptions({ gfm: true, breaks: false });

type ProgressStatus = "pass" | "softpass" | "fail";
type TestRowStatus = "pending" | "running" | "pass" | "fail" | "skip";
type Tab = "readme" | "tests";
type SummaryState = "idle" | "running" | "ok" | "fail" | "stopped" | "error" | "saved";

type ProblemListItem = {
  id: string;
  title: string;
  difficulty: string | null;
  family: string | null;
  topics: string[];
  status: ProgressStatus | null;
};

type ProblemDetail = ProblemListItem & { markdown: string };

type RunStats = {
  tests?: number;
  pass?: number;
  fail?: number;
  skipped?: number;
  durationMs?: number;
};

type TerminalChunk = { text: string; kind?: "stderr" | "meta" };

const STATUS_META: Record<ProgressStatus, { mark: string; title: string; label: string }> = {
  pass: { mark: "✓", title: "Passed", label: "Status: passed" },
  softpass: { mark: "~", title: "Soft pass", label: "Status: soft pass" },
  fail: { mark: "✗", title: "Gave up", label: "Status: gave up" },
};

const RESULTS_HEIGHT_KEY = "coding-portal-results-height";
const RESULTS_COLLAPSED_KEY = "coding-portal-results-collapsed";
const RESULTS_MIN = 120;
const RESULTS_DEFAULT = 280;

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || res.statusText);
  }
  return res.json() as Promise<T>;
}

type TestTableRow =
  | { kind: "suite"; label: string; depth: number; key: string }
  | { kind: "test"; test: ParsedTest; index: number };

function flattenTestRows(tests: ParsedTest[]): TestTableRow[] {
  const rows: TestTableRow[] = [];
  let prev: string[] = [];
  tests.forEach((test, index) => {
    const { suites } = test;
    let diverge = 0;
    while (
      diverge < prev.length &&
      diverge < suites.length &&
      prev[diverge] === suites[diverge]
    ) {
      diverge++;
    }
    for (let d = diverge; d < suites.length; d++) {
      rows.push({
        kind: "suite",
        label: suites[d]!,
        depth: d,
        key: `suite:${suites.slice(0, d + 1).join("\0")}`,
      });
    }
    rows.push({ kind: "test", test, index });
    prev = suites;
  });
  return rows;
}

function parseSummary(text: string): RunStats | null {
  const pick = (key: string) => {
    const m = text.match(new RegExp(`(?:^|\\n)ℹ\\s+${key}\\s+(\\d+(?:\\.\\d+)?)`, "m"));
    return m ? Number(m[1]) : undefined;
  };
  const tests = pick("tests");
  const pass = pick("pass");
  const fail = pick("fail");
  if (tests === undefined && pass === undefined && fail === undefined) return null;
  return {
    tests,
    pass,
    fail,
    skipped: pick("skipped"),
    durationMs: pick("duration_ms"),
  };
}

function rowLabel(status: TestRowStatus): string {
  return { pending: "—", running: "…", pass: "pass", fail: "fail", skip: "skip" }[status];
}

export default function App() {
  const [problems, setProblems] = useState<ProblemListItem[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [tests, setTests] = useState<ParsedTest[]>([]);
  const [testStatuses, setTestStatuses] = useState<Record<string, TestRowStatus>>({});
  const [activeTab, setActiveTab] = useState<Tab>("readme");
  const [markdownHtml, setMarkdownHtml] = useState("");
  const [currentStatus, setCurrentStatus] = useState<ProgressStatus | null>(null);
  const [lastFullRunOk, setLastFullRunOk] = useState(false);
  const [finishBusy, setFinishBusy] = useState(false);
  const [testsRunning, setTestsRunning] = useState(false);
  const [terminalChunks, setTerminalChunks] = useState<TerminalChunk[]>([]);
  const [runStatus, setRunStatus] = useState({ text: "", className: "run-status" });
  const [summaryState, setSummaryState] = useState<SummaryState>("idle");
  const [summaryStats, setSummaryStats] = useState<RunStats | null>(null);
  const [resultsCollapsed, setResultsCollapsed] = useState(
    () => localStorage.getItem(RESULTS_COLLAPSED_KEY) === "1",
  );
  const [resultsHeight, setResultsHeight] = useState(() => {
    const saved = Number(localStorage.getItem(RESULTS_HEIGHT_KEY));
    return Number.isFinite(saved) && saved > 0 ? saved : RESULTS_DEFAULT;
  });

  const [timer, setTimer] = useState<TimerState>(() => idleFor(null));
  const [timerModalOpen, setTimerModalOpen] = useState(false);
  const [timerDisplay, setTimerDisplay] = useState("00:00");
  const [activeTimers, setActiveTimers] = useState<Record<string, ActiveTimerStatus>>({});

  const eventSourceRef = useRef<EventSource | null>(null);
  const outputBufferRef = useRef("");
  const currentRunNameRef = useRef<string | null>(null);
  const testsLayoutRef = useRef<HTMLDivElement | null>(null);
  const terminalPaneRef = useRef<HTMLDivElement | null>(null);
  const terminalPreRef = useRef<HTMLPreElement | null>(null);

  const persistTimer = useCallback((problemId: string, next: TimerState) => {
    saveTimer(problemId, next);
    setTimer(next);
    setActiveTimers((prev) => {
      if (next.status !== "running" && next.status !== "paused") {
        if (!(problemId in prev)) return prev;
        const { [problemId]: _removed, ...rest } = prev;
        return rest;
      }
      if (prev[problemId] === next.status) return prev;
      return { ...prev, [problemId]: next.status };
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await fetchJson<ProblemListItem[]>("/api/problems");
        if (cancelled) return;
        setProblems(list);
        const timers: Record<string, ActiveTimerStatus> = {};
        for (const p of list) {
          const t = loadTimer(p.id);
          if (t.status === "running" || t.status === "paused") {
            timers[p.id] = t.status;
          }
        }
        setActiveTimers(timers);
        const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
        const initial = hash && list.some((p) => p.id === hash) ? hash : null;
        if (initial) await selectProblem(initial, list);
      } catch (err) {
        if (!cancelled) setLoadError(String(err));
      }
    })();
    return () => {
      cancelled = true;
      closeRun();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once
  }, []);

  useEffect(() => {
    if (!isSolving(timer)) {
      setTimerDisplay(formatElapsed(elapsedMs(timer)));
      return;
    }
    const tick = () => setTimerDisplay(formatElapsed(elapsedMs(timer)));
    tick();
    if (!timerModalOpen || timer.status !== "running") return;
    const id = window.setInterval(tick, 250);
    return () => clearInterval(id);
  }, [timer, timerModalOpen]);

  useEffect(() => {
    if (!timerModalOpen) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") setTimerModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [timerModalOpen]);

  useEffect(() => {
    document.body.classList.toggle("resizing-results", false);
  }, []);

  function closeRun() {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
  }

  function appendTerminal(text: string, kind?: "stderr" | "meta") {
    setTerminalChunks((prev) => [...prev, { text, kind }]);
  }

  function clearTerminal() {
    outputBufferRef.current = "";
    setTerminalChunks([]);
  }

  function showCatalog() {
    closeRun();
    setSelectedId(null);
    setProblem(null);
    setTimerModalOpen(false);
    setTimer(idleFor(null));
    history.replaceState(null, "", location.pathname);
  }

  async function selectProblem(id: string, list?: ProblemListItem[]) {
    const fromList = (list ?? problems).find((p) => p.id === id);
    setSelectedId(id);
    setLastFullRunOk(false);
    setFinishBusy(false);
    setCurrentStatus(fromList?.status ?? null);
    setActiveTab("readme");
    setMarkdownHtml("<p class='meta'>Loading…</p>");
    setSummaryState("idle");
    setSummaryStats(null);
    clearTerminal();
    setRunStatus({ text: "", className: "run-status" });
    setTimerModalOpen(false);

    const loaded = loadTimer(id);
    setTimer(loaded);
    setTimerDisplay(formatElapsed(elapsedMs(loaded)));

    try {
      const [detail, testsRes] = await Promise.all([
        fetchJson<ProblemDetail>(`/api/problems/${encodeURIComponent(id)}`),
        fetchJson<{ tests: ParsedTest[] }>(`/api/problems/${encodeURIComponent(id)}/tests`),
      ]);
      setProblem(detail);
      setCurrentStatus(detail.status ?? null);
      setProblems((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                status: detail.status,
                difficulty: detail.difficulty,
                family: detail.family,
                topics: detail.topics,
              }
            : p,
        ),
      );
      setMarkdownHtml(marked.parse(detail.markdown) as string);
      setTests(testsRes.tests);
      setTestStatuses(
        Object.fromEntries(testsRes.tests.map((t) => [t.fullName, "pending" as const])),
      );
      history.replaceState(null, "", `#${encodeURIComponent(id)}`);
    } catch (err) {
      setMarkdownHtml(`<p class="meta">${String(err)}</p>`);
    }
  }

  function applyResultsFromBuffer(buf: string) {
    const results = parseSpecResults(buf);
    if (results.size === 0) return;
    setTestStatuses((prev) => {
      const next = { ...prev };
      for (const [name, status] of results) {
        if (name in next) next[name] = status;
      }
      return next;
    });
  }

  function resetTestStatuses(onlyName: string | null = null) {
    setTestStatuses((prev) => {
      const next = { ...prev };
      for (const name of Object.keys(next)) {
        if (onlyName !== null && name !== onlyName) continue;
        next[name] = onlyName !== null ? "running" : "pending";
      }
      return next;
    });
  }

  function runTests(name: string | null = null) {
    if (!selectedId || testsRunning) return;

    setActiveTab("tests");
    if (resultsCollapsed) persistCollapsed(false);
    closeRun();
    clearTerminal();
    resetTestStatuses(name);
    setLastFullRunOk(false);
    currentRunNameRef.current = name;
    setTestsRunning(true);
    setRunStatus({ text: "running…", className: "run-status running" });
    setSummaryState("running");
    setSummaryStats(null);

    const params = new URLSearchParams({ problem: selectedId });
    if (name) params.set("name", name);
    const es = new EventSource(`/api/run?${params}`);
    eventSourceRef.current = es;

    es.addEventListener("status", (ev) => {
      const data = JSON.parse((ev as MessageEvent).data) as { command: string };
      appendTerminal(`$ ${data.command}\n\n`, "meta");
    });

    es.addEventListener("output", (ev) => {
      const data = JSON.parse((ev as MessageEvent).data) as {
        text: string;
        stream: string;
      };
      outputBufferRef.current += data.text;
      appendTerminal(data.text, data.stream === "stderr" ? "stderr" : undefined);
      applyResultsFromBuffer(outputBufferRef.current);
      const live = parseSummary(outputBufferRef.current);
      if (live) {
        setSummaryState(live.fail ? "fail" : "ok");
        setSummaryStats(live);
      }
    });

    es.addEventListener("exit", (ev) => {
      const data = JSON.parse((ev as MessageEvent).data) as {
        code?: number;
        timedOut?: boolean;
      };
      const code = data.code ?? 1;
      const timedOut = Boolean(data.timedOut);
      const ok = code === 0 && !timedOut;
      const wasFullRun = currentRunNameRef.current === null;
      setLastFullRunOk(ok && wasFullRun);
      setRunStatus({
        text: timedOut ? "timeout" : `exit ${code}`,
        className: `run-status ${ok ? "ok" : "fail"}`,
      });
      appendTerminal(
        timedOut
          ? "\n[timed out — process killed]\n"
          : `\n[process exited with code ${code}]\n`,
        timedOut ? "stderr" : "meta",
      );
      applyResultsFromBuffer(outputBufferRef.current);
      setSummaryState(ok ? "ok" : "fail");
      setSummaryStats(parseSummary(outputBufferRef.current));
      setTestsRunning(false);
      closeRun();
    });

    es.onerror = () => {
      if (eventSourceRef.current === es) {
        setLastFullRunOk(false);
        appendTerminal("\n[connection lost]\n", "stderr");
        setRunStatus({ text: "error", className: "run-status fail" });
        setSummaryState("error");
        setSummaryStats(parseSummary(outputBufferRef.current));
        setTestsRunning(false);
        closeRun();
      }
    };
  }

  async function stopRun() {
    closeRun();
    try {
      await fetch("/api/stop", { method: "POST" });
    } catch {
      /* ignore */
    }
    setLastFullRunOk(false);
    appendTerminal("\n[stopped]\n", "meta");
    setRunStatus({ text: "stopped", className: "run-status fail" });
    setSummaryState("stopped");
    setSummaryStats(parseSummary(outputBufferRef.current));
    setTestsRunning(false);
  }

  async function finishProblem(status: ProgressStatus) {
    if (!selectedId || finishBusy) return;
    if (status === "pass" && !lastFullRunOk) return;

    const confirms: Record<ProgressStatus, string> = {
      pass: "Mark as done? Archive under this problem's solutions/ folder and restore the stub.",
      softpass: "Soft pass? Archive under this problem's solutions/ folder and restore the stub.",
      fail: "Give up? Archive under this problem's solutions/ folder and restore the stub.",
    };
    if (!window.confirm(confirms[status])) return;

    const elapsed = elapsedMs(timer);
    setFinishBusy(true);
    try {
      const res = await fetch(`/api/problems/${encodeURIComponent(selectedId)}/finish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, elapsedMs: elapsed }),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || res.statusText || "Request failed");
      setLastFullRunOk(false);
      setCurrentStatus(status);
      setProblems((prev) => prev.map((p) => (p.id === selectedId ? { ...p, status } : p)));
      setSummaryState("saved");
      setSummaryStats(null);
      stopTimerAfterFinish();
      appendTerminal(
        `\n[archived as ${status} — elapsed ${formatElapsed(elapsed)} — stub restored]\n`,
        "meta",
      );
    } catch (err) {
      appendTerminal(`\n[finish failed] ${err}\n`, "stderr");
    } finally {
      setFinishBusy(false);
    }
  }

  function onStartTimer() {
    if (!selectedId) return;
    const next = startTimer();
    persistTimer(selectedId, next);
    setTimerDisplay(formatElapsed(0));
  }

  function onPauseTimer() {
    if (!selectedId) return;
    const next = pauseTimer(timer);
    persistTimer(selectedId, next);
  }

  function onResumeTimer() {
    if (!selectedId) return;
    const next = resumeTimer(timer);
    persistTimer(selectedId, next);
    setTimerModalOpen(false);
  }

  function stopTimerAfterFinish() {
    if (!selectedId) return;
    const next = resetTimer();
    persistTimer(selectedId, next);
    setTimerModalOpen(false);
    setTimerDisplay("00:00");
  }

  function onResetTimer() {
    if (!selectedId) return;
    const next = resetTimer();
    persistTimer(selectedId, next);
    setTimerModalOpen(false);
    setTimerDisplay("00:00");
  }

  function persistCollapsed(collapsed: boolean) {
    setResultsCollapsed(collapsed);
    localStorage.setItem(RESULTS_COLLAPSED_KEY, collapsed ? "1" : "0");
  }

  function clampResultsHeight(height: number) {
    const layoutH = testsLayoutRef.current?.clientHeight || window.innerHeight;
    const max = Math.max(RESULTS_MIN, layoutH - 100);
    return Math.min(max, Math.max(RESULTS_MIN, Math.round(height)));
  }

  function applyResultsHeight(height: number) {
    const h = clampResultsHeight(height);
    setResultsHeight(h);
    localStorage.setItem(RESULTS_HEIGHT_KEY, String(h));
  }

  function onResizePointerDown(ev: { preventDefault(): void; clientY: number }) {
    if (resultsCollapsed) return;
    ev.preventDefault();
    const startY = ev.clientY;
    const startH = terminalPaneRef.current?.getBoundingClientRect().height ?? resultsHeight;
    document.body.classList.add("resizing-results");

    const onMove = (moveEv: PointerEvent) => {
      applyResultsHeight(startH + (startY - moveEv.clientY));
    };
    const onUp = () => {
      document.body.classList.remove("resizing-results");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  useEffect(() => {
    const el = terminalPreRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [terminalChunks]);

  const solving = isSolving(timer);
  const selected = problems.find((p) => p.id === selectedId) ?? problem;

  if (loadError) {
    return <div className="empty-state">Failed to load: {loadError}</div>;
  }

  return (
    <>
      <aside className="sidebar">
        <header className="sidebar-header">
          <button type="button" className="sidebar-home" onClick={showCatalog}>
            <h1>Coding portal</h1>
            <p>Run &amp; review tests</p>
          </button>
        </header>
        <nav className="problem-list" aria-label="Problems">
          {problems.map((p) => {
            const meta = p.status ? STATUS_META[p.status] : null;
            const timerStatus = activeTimers[p.id];
            return (
              <button
                key={p.id}
                type="button"
                className={[
                  "problem-item",
                  selectedId === p.id ? "active" : "",
                  p.status ? `status-${p.status}` : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => {
                  void selectProblem(p.id);
                }}
              >
                <span className="problem-text">
                  <span className="id">{p.id}</span>
                  <span className="title">{p.title}</span>
                </span>
                <span className="problem-item-badges">
                  {timerStatus ? (
                    <span
                      className={`problem-timer-badge ${timerStatus}`}
                      title={timerStatus === "running" ? "Timer running" : "Timer paused"}
                      aria-label={timerStatus === "running" ? "Timer running" : "Timer paused"}
                    >
                      <TimerGlyph running={timerStatus === "running"} />
                    </span>
                  ) : null}
                  {meta ? (
                    <span className="problem-status-badge" title={meta.title} aria-label={meta.title}>
                      {meta.mark}
                    </span>
                  ) : null}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="main">
        {!selectedId ? (
          <CatalogTable problems={problems} onSelect={(id) => void selectProblem(id)} />
        ) : !solving ? (
          <div className="gate">
            <h2 className="gate-title">{selected?.title ?? selectedId}</h2>
            {selected?.difficulty ? (
              <p className="gate-difficulty">{selected.difficulty}</p>
            ) : null}
            <button type="button" className="btn btn-start-timer" onClick={onStartTimer}>
              Start timer
            </button>
          </div>
        ) : (
          <div className="workspace">
            <div className="tab-bar" role="tablist" aria-label="Problem views">
              <button
                type="button"
                className={`tab ${activeTab === "readme" ? "active" : ""}`}
                role="tab"
                aria-selected={activeTab === "readme"}
                onClick={() => setActiveTab("readme")}
              >
                README
              </button>
              <button
                type="button"
                className={`tab ${activeTab === "tests" ? "active" : ""}`}
                role="tab"
                aria-selected={activeTab === "tests"}
                onClick={() => setActiveTab("tests")}
              >
                Tests
              </button>
              <div className="tab-bar-spacer" />
              <button
                type="button"
                className={`timer-icon-btn ${timer.status === "running" ? "running" : "paused"}`}
                aria-label="Open timer"
                title="Timer"
                onClick={() => setTimerModalOpen(true)}
              >
                <TimerGlyph running={timer.status === "running"} />
              </button>
            </div>

            {activeTab === "readme" ? (
              <section className="tab-panel active" id="panel-readme">
                <div className="problem-actions">
                  {currentStatus ? (
                    <div className="problem-status-label" data-status={currentStatus}>
                      {STATUS_META[currentStatus].label}
                    </div>
                  ) : (
                    <div className="problem-status-label" hidden />
                  )}
                  <div className="problem-action-buttons">
                    <button
                      type="button"
                      className="btn btn-ghost btn-give-up"
                      disabled={finishBusy}
                      onClick={() => void finishProblem("fail")}
                    >
                      Give up
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-softpass"
                      disabled={finishBusy}
                      onClick={() => void finishProblem("softpass")}
                    >
                      Soft pass
                    </button>
                    <button
                      type="button"
                      className="btn btn-ghost btn-mark-done"
                      disabled={finishBusy || !lastFullRunOk}
                      title={
                        lastFullRunOk
                          ? "Archive solution as passed and restore the stub"
                          : "Run the full test suite successfully first"
                      }
                      onClick={() => void finishProblem("pass")}
                    >
                      Mark as done
                    </button>
                  </div>
                </div>
                <article
                  className="markdown"
                  dangerouslySetInnerHTML={{ __html: markdownHtml }}
                />
              </section>
            ) : (
              <section className="tab-panel active" id="panel-tests">
                <div className="tests-layout" ref={testsLayoutRef}>
                  <div className="tests-pane">
                    <div className="tests-toolbar">
                      <h2>Tests</h2>
                      <div className="toolbar-actions">
                        <button
                          type="button"
                          className="btn btn-ghost"
                          disabled={!testsRunning}
                          onClick={() => void stopRun()}
                        >
                          Stop
                        </button>
                        <button
                          type="button"
                          className="btn btn-run"
                          disabled={testsRunning}
                          onClick={() => runTests(null)}
                        >
                          RUN all
                        </button>
                      </div>
                    </div>
                    <div className="tests-table-wrap">
                      <table className="tests-table">
                        <thead>
                          <tr>
                            <th className="col-status">Status</th>
                            <th className="col-name">Name</th>
                            <th className="col-action" />
                          </tr>
                        </thead>
                        <tbody>
                          {flattenTestRows(tests).map((row) => {
                            if (row.kind === "suite") {
                              return (
                                <tr key={row.key} className="suite-row">
                                  <td colSpan={3} className="test-suite">
                                    <span
                                      className="test-indent"
                                      style={{ paddingLeft: `${row.depth * 0.9}rem` }}
                                    >
                                      {row.label}
                                    </span>
                                  </td>
                                </tr>
                              );
                            }
                            const { test, index } = row;
                            const status = testStatuses[test.fullName] ?? "pending";
                            return (
                              <tr
                                key={`${test.fullName}#${index}`}
                                data-name={test.fullName}
                                data-status={status}
                              >
                                <td className={`test-status status-${status}`}>
                                  {rowLabel(status)}
                                </td>
                                <td className="test-name" title={test.fullName}>
                                  <span
                                    className="test-indent"
                                    style={{
                                      paddingLeft: `${test.suites.length * 0.9}rem`,
                                    }}
                                  >
                                    {test.name}
                                  </span>
                                </td>
                                <td className="test-action">
                                  <button
                                    type="button"
                                    className="btn btn-run btn-sm"
                                    disabled={testsRunning}
                                    onClick={() => runTests(test.fullName)}
                                  >
                                    RUN
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className={`results-shell ${resultsCollapsed ? "collapsed" : ""}`}>
                    <div
                      className="resize-handle"
                      role="separator"
                      aria-orientation="horizontal"
                      aria-label="Resize output pane"
                      tabIndex={0}
                      onPointerDown={onResizePointerDown}
                      onKeyDown={(ev) => {
                        if (resultsCollapsed) return;
                        const step = ev.shiftKey ? 40 : 16;
                        if (ev.key === "ArrowUp") {
                          ev.preventDefault();
                          applyResultsHeight(resultsHeight + step);
                        } else if (ev.key === "ArrowDown") {
                          ev.preventDefault();
                          applyResultsHeight(resultsHeight - step);
                        }
                      }}
                    />
                    <div
                      className="terminal-pane"
                      ref={terminalPaneRef}
                      style={{ ["--results-height" as string]: `${resultsHeight}px` }}
                    >
                      <div className="terminal-header">
                        <div className="terminal-header-left">
                          <button
                            type="button"
                            className="btn-collapse"
                            aria-expanded={!resultsCollapsed}
                            title={resultsCollapsed ? "Expand output" : "Collapse output"}
                            onClick={() => persistCollapsed(!resultsCollapsed)}
                          >
                            ▾
                          </button>
                          <span>Output</span>
                        </div>
                        <span className={runStatus.className}>{runStatus.text}</span>
                      </div>
                      <div className="terminal-body">
                        {summaryState !== "idle" ? (
                          <RunSummary
                            state={summaryState}
                            stats={summaryStats}
                            currentStatus={currentStatus}
                          />
                        ) : null}
                        <pre className="terminal" aria-live="polite" ref={terminalPreRef}>
                          {terminalChunks.map((c, i) =>
                            c.kind ? (
                              <span key={i} className={c.kind}>
                                {c.text}
                              </span>
                            ) : (
                              <span key={i}>{c.text}</span>
                            ),
                          )}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {timerModalOpen && solving ? (
        <div
          className="timer-modal-backdrop"
          role="presentation"
          onClick={() => setTimerModalOpen(false)}
        >
          <div
            className="timer-modal"
            role="dialog"
            aria-label="Timer"
            onClick={(ev) => ev.stopPropagation()}
          >
            <button
              type="button"
              className="timer-modal-close"
              aria-label="Close"
              onClick={() => setTimerModalOpen(false)}
            >
              ×
            </button>
            <div className="timer-modal-display">{timerDisplay}</div>
            <div className="timer-modal-actions">
              {timer.status === "running" ? (
                <button type="button" className="btn btn-ghost" onClick={onPauseTimer}>
                  Pause
                </button>
              ) : (
                <>
                  <button type="button" className="btn btn-run" onClick={onResumeTimer}>
                    Resume
                  </button>
                  <button type="button" className="btn btn-ghost" onClick={onResetTimer}>
                    Reset
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function idleFor(_id: string | null): TimerState {
  return { status: "idle", accumulatedMs: 0, startedAt: null };
}

function CatalogTable({
  problems,
  onSelect,
}: {
  problems: ProblemListItem[];
  onSelect: (id: string) => void;
}) {
  const grouped = [...problems].sort((a, b) => {
    const byFamily = familyRank(a.family) - familyRank(b.family);
    if (byFamily !== 0) return byFamily;
    const fa = (a.family ?? "").localeCompare(b.family ?? "");
    if (fa !== 0) return fa;
    return a.title.localeCompare(b.title);
  });
  const familyCount = new Set(problems.map((p) => p.family).filter(Boolean)).size;

  return (
    <section className="catalog">
      <header className="catalog-header">
        <h2>Problems</h2>
        <p>
          {problems.length} exercises · {familyCount} families
        </p>
      </header>
      <div className="catalog-table-wrap">
        <table className="catalog-table">
          <thead>
            <tr>
              <th className="col-problem">Problem</th>
              <th className="col-family">Family</th>
              <th className="col-difficulty">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {grouped.map((p) => (
              <tr key={p.id}>
                <td className="col-problem">
                  <a
                    href={`#${encodeURIComponent(p.id)}`}
                    className="catalog-link"
                    onClick={(ev) => {
                      ev.preventDefault();
                      onSelect(p.id);
                    }}
                  >
                    <span className="catalog-title">{p.title}</span>
                    <span className="catalog-id">{p.id}</span>
                  </a>
                </td>
                <td className="col-family">
                  {p.topics.length > 0 ? p.topics.join(", ") : (p.family ?? "—")}
                </td>
                <td className="col-difficulty">
                  {p.difficulty ? (
                    <span
                      className={`difficulty-badge difficulty-${p.difficulty.toLowerCase()}`}
                    >
                      {p.difficulty}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TimerGlyph({ running }: { running: boolean }) {
  return (
    <svg
      className={`timer-glyph ${running ? "running" : "paused"}`}
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
    >
      <circle cx="12" cy="13" r="8" fill="none" stroke="currentColor" strokeWidth="1.75" />
      <path d="M9 3.5h6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <path d="M12 3.5v1.75" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      <g className="timer-hand timer-hand-minute">
        <line
          x1="12"
          y1="13"
          x2="12"
          y2="7.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </g>
      <g className="timer-hand timer-hand-second">
        <line
          x1="12"
          y1="13"
          x2="12"
          y2="6.25"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </g>
      <circle cx="12" cy="13" r="1.15" fill="currentColor" />
    </svg>
  );
}

function RunSummary({
  state,
  stats,
  currentStatus,
}: {
  state: SummaryState;
  stats: RunStats | null;
  currentStatus: ProgressStatus | null;
}) {
  let body: ReactNode;
  if (state === "running") {
    body = (
      <>
        <div className="summary-title">Running…</div>
        <div className="summary-stats">
          <span className="stat">Waiting for results</span>
        </div>
      </>
    );
  } else if (state === "stopped" || state === "error") {
    body = (
      <>
        <div className="summary-title">{state === "stopped" ? "Stopped" : "Connection error"}</div>
        <div className="summary-stats">
          <span className="stat">No complete summary</span>
        </div>
      </>
    );
  } else if (state === "saved") {
    const meta = currentStatus ? STATUS_META[currentStatus] : null;
    body = (
      <div className="summary-main">
        <div className="summary-title">{meta ? meta.title : "Saved"}</div>
        <div className="summary-stats">
          <span className="stat">Archived in this problem&apos;s solutions/ folder — stub restored</span>
        </div>
      </div>
    );
  } else {
    const pass = stats?.pass ?? 0;
    const fail = stats?.fail ?? 0;
    const tests = stats?.tests ?? pass + fail;
    const skipped = stats?.skipped ?? 0;
    const duration =
      stats?.durationMs !== undefined ? `${Math.round(stats.durationMs)} ms` : null;
    const title = fail > 0 || state === "fail" ? "Failed" : "Passed";
    body = (
      <div className="summary-main">
        <div className="summary-title">{title}</div>
        <div className="summary-stats">
          <span className="stat stat-pass">
            <strong>{pass}</strong> passed
          </span>
          <span className="stat stat-fail">
            <strong>{fail}</strong> failed
          </span>
          <span className="stat">
            <strong>{tests}</strong> total
          </span>
          {skipped > 0 ? (
            <span className="stat">
              <strong>{skipped}</strong> skipped
            </span>
          ) : null}
          {duration ? <span className="stat">{duration}</span> : null}
        </div>
      </div>
    );
  }

  const className = `run-summary ${state === "saved" ? "ok" : state}`;
  return <div className={className}>{body}</div>;
}
