import { marked } from "/vendor/marked.esm.js";

const problemListEl = document.getElementById("problem-list");
const emptyStateEl = document.getElementById("empty-state");
const workspaceEl = document.getElementById("workspace");
const markdownEl = document.getElementById("markdown");
const testListEl = document.getElementById("test-list");
const terminalEl = document.getElementById("terminal");
const runSummaryEl = document.getElementById("run-summary");
const runStatusEl = document.getElementById("run-status");
const btnRunAll = document.getElementById("btn-run-all");
const btnStop = document.getElementById("btn-stop");
const tabButtons = document.querySelectorAll(".tab");
const panelReadme = document.getElementById("panel-readme");
const panelTests = document.getElementById("panel-tests");
const testsLayoutEl = document.getElementById("tests-layout");
const resultsShellEl = document.getElementById("results-shell");
const terminalPaneEl = document.getElementById("terminal-pane");
const resultsResizeEl = document.getElementById("results-resize");
const btnCollapseResults = document.getElementById("btn-collapse-results");

const RESULTS_HEIGHT_KEY = "coding-portal-results-height";
const RESULTS_COLLAPSED_KEY = "coding-portal-results-collapsed";
const RESULTS_MIN = 120;
const RESULTS_DEFAULT = 280;

/** @type {string | null} */
let selectedId = null;
/** @type {EventSource | null} */
let eventSource = null;
let running = false;
/** @type {string} */
let outputBuffer = "";
/** @type {"readme" | "tests"} */
let activeTab = "readme";
let resultsCollapsed = false;

marked.setOptions({ gfm: true, breaks: false });

function clampResultsHeight(height) {
  const layoutH = testsLayoutEl?.clientHeight || window.innerHeight;
  const max = Math.max(RESULTS_MIN, layoutH - 100);
  return Math.min(max, Math.max(RESULTS_MIN, Math.round(height)));
}

function applyResultsHeight(height) {
  const h = clampResultsHeight(height);
  terminalPaneEl.style.setProperty("--results-height", `${h}px`);
  localStorage.setItem(RESULTS_HEIGHT_KEY, String(h));
  return h;
}

/**
 * @param {boolean} collapsed
 * @param {{ persist?: boolean }} [opts]
 */
function setResultsCollapsed(collapsed, opts = {}) {
  resultsCollapsed = collapsed;
  resultsShellEl.classList.toggle("collapsed", collapsed);
  btnCollapseResults.setAttribute("aria-expanded", String(!collapsed));
  btnCollapseResults.title = collapsed ? "Expand output" : "Collapse output";
  if (opts.persist !== false) {
    localStorage.setItem(RESULTS_COLLAPSED_KEY, collapsed ? "1" : "0");
  }
}

function initResultsPane() {
  const savedHeight = Number(localStorage.getItem(RESULTS_HEIGHT_KEY));
  applyResultsHeight(Number.isFinite(savedHeight) && savedHeight > 0 ? savedHeight : RESULTS_DEFAULT);
  setResultsCollapsed(localStorage.getItem(RESULTS_COLLAPSED_KEY) === "1");

  btnCollapseResults.addEventListener("click", () => {
    setResultsCollapsed(!resultsCollapsed);
  });

  /** @param {PointerEvent} ev */
  const onPointerDown = (ev) => {
    if (resultsCollapsed) return;
    ev.preventDefault();
    const startY = ev.clientY;
    const startH = terminalPaneEl.getBoundingClientRect().height;
    bodyResizing(true);

    /** @param {PointerEvent} moveEv */
    const onMove = (moveEv) => {
      const delta = startY - moveEv.clientY;
      applyResultsHeight(startH + delta);
    };

    const onUp = () => {
      bodyResizing(false);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  resultsResizeEl.addEventListener("pointerdown", onPointerDown);

  resultsResizeEl.addEventListener("keydown", (ev) => {
    if (resultsCollapsed) return;
    const step = ev.shiftKey ? 40 : 16;
    if (ev.key === "ArrowUp") {
      ev.preventDefault();
      applyResultsHeight(terminalPaneEl.getBoundingClientRect().height + step);
    } else if (ev.key === "ArrowDown") {
      ev.preventDefault();
      applyResultsHeight(terminalPaneEl.getBoundingClientRect().height - step);
    }
  });
}

/** @param {boolean} on */
function bodyResizing(on) {
  document.body.classList.toggle("resizing-results", on);
}

/**
 * @param {"readme" | "tests"} tab
 */
function setTab(tab) {
  activeTab = tab;
  for (const btn of tabButtons) {
    const isActive = btn.dataset.tab === tab;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  }
  const showReadme = tab === "readme";
  panelReadme.classList.toggle("active", showReadme);
  panelReadme.hidden = !showReadme;
  panelTests.classList.toggle("active", !showReadme);
  panelTests.hidden = showReadme;
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || res.statusText);
  }
  return res.json();
}

function setRunning(isRunning) {
  running = isRunning;
  btnRunAll.disabled = isRunning;
  btnStop.disabled = !isRunning;
  for (const btn of testListEl.querySelectorAll("button.btn-run")) {
    btn.disabled = isRunning;
  }
}

/**
 * @param {string | null} [onlyName] clear all, or only one row when running a single test
 */
function resetTestStatuses(onlyName = null) {
  const rows = testListEl.querySelectorAll("tr[data-name]");
  for (const row of rows) {
    if (onlyName !== null && row.dataset.name !== onlyName) continue;
    setRowStatus(/** @type {HTMLTableRowElement} */ (row), onlyName !== null ? "running" : "pending");
  }
}

/**
 * @param {HTMLTableRowElement} row
 * @param {"pending" | "running" | "pass" | "fail" | "skip"} status
 */
function setRowStatus(row, status) {
  row.dataset.status = status;
  const cell = row.querySelector(".test-status");
  if (!cell) return;
  const labels = {
    pending: "—",
    running: "…",
    pass: "pass",
    fail: "fail",
    skip: "skip",
  };
  cell.textContent = labels[status];
  cell.className = `test-status status-${status}`;
}

/**
 * Parse per-test results from node:test spec reporter output.
 * @param {string} text
 * @returns {Map<string, "pass" | "fail" | "skip">}
 */
function parseTestResults(text) {
  /** @type {Map<string, "pass" | "fail" | "skip">} */
  const results = new Map();
  const re = /^[ \t]*([✔✖◯﹣-])[ \t]+(.+?)[ \t]+\([\d.]+m?s\)[ \t]*$/gm;
  let match;
  while ((match = re.exec(text)) !== null) {
    const mark = match[1];
    const name = match[2].trim();
    if (mark === "✔") results.set(name, "pass");
    else if (mark === "✖") results.set(name, "fail");
    else results.set(name, "skip");
  }
  return results;
}

function applyTestResults(text) {
  const results = parseTestResults(text);
  for (const row of testListEl.querySelectorAll("tr[data-name]")) {
    const status = results.get(/** @type {HTMLElement} */ (row).dataset.name ?? "");
    if (status) setRowStatus(/** @type {HTMLTableRowElement} */ (row), status);
  }
}

function appendTerminal(text, className = "") {
  if (className) {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = text;
    terminalEl.appendChild(span);
  } else {
    terminalEl.appendChild(document.createTextNode(text));
  }
  terminalEl.scrollTop = terminalEl.scrollHeight;
}

function clearTerminal() {
  terminalEl.textContent = "";
  outputBuffer = "";
}

/**
 * @param {string} text
 * @returns {{ tests?: number, pass?: number, fail?: number, skipped?: number, cancelled?: number, todo?: number, durationMs?: number } | null}
 */
function parseSummary(text) {
  const pick = (key) => {
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
    cancelled: pick("cancelled"),
    todo: pick("todo"),
    durationMs: pick("duration_ms"),
  };
}

/**
 * @param {"idle" | "running" | "ok" | "fail" | "stopped" | "error"} state
 * @param {ReturnType<typeof parseSummary>} [stats]
 */
function renderSummary(state, stats = null) {
  runSummaryEl.hidden = false;
  runSummaryEl.className = `run-summary ${state}`;

  if (state === "running") {
    runSummaryEl.innerHTML = `
      <div class="summary-title">Running…</div>
      <div class="summary-stats">
        <span class="stat">Waiting for results</span>
      </div>`;
    return;
  }

  if (state === "stopped" || state === "error") {
    const label = state === "stopped" ? "Stopped" : "Connection error";
    runSummaryEl.innerHTML = `
      <div class="summary-title">${label}</div>
      <div class="summary-stats">
        <span class="stat">No complete summary</span>
      </div>`;
    return;
  }

  const pass = stats?.pass ?? 0;
  const fail = stats?.fail ?? 0;
  const tests = stats?.tests ?? pass + fail;
  const skipped = stats?.skipped ?? 0;
  const duration =
    stats?.durationMs !== undefined
      ? `${Math.round(stats.durationMs)} ms`
      : null;

  const parts = [
    `<span class="stat stat-pass"><strong>${pass}</strong> passed</span>`,
    `<span class="stat stat-fail"><strong>${fail}</strong> failed</span>`,
    `<span class="stat"><strong>${tests}</strong> total</span>`,
  ];
  if (skipped > 0) {
    parts.push(`<span class="stat"><strong>${skipped}</strong> skipped</span>`);
  }
  if (duration) {
    parts.push(`<span class="stat">${duration}</span>`);
  }

  const title = fail > 0 || state === "fail" ? "Failed" : "Passed";
  runSummaryEl.innerHTML = `
    <div class="summary-title">${title}</div>
    <div class="summary-stats">${parts.join("")}</div>`;
}

function closeRun() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }
}

function runTests(name = null) {
  if (!selectedId || running) return;

  setTab("tests");
  if (resultsCollapsed) setResultsCollapsed(false);
  closeRun();
  clearTerminal();
  resetTestStatuses(name);
  setRunning(true);
  runStatusEl.textContent = "running…";
  runStatusEl.className = "run-status running";
  renderSummary("running");

  const params = new URLSearchParams({ problem: selectedId });
  if (name) params.set("name", name);

  eventSource = new EventSource(`/api/run?${params}`);

  eventSource.addEventListener("status", (ev) => {
    const data = JSON.parse(ev.data);
    appendTerminal(`$ ${data.command}\n\n`, "meta");
  });

  eventSource.addEventListener("output", (ev) => {
    const data = JSON.parse(ev.data);
    outputBuffer += data.text;
    appendTerminal(data.text, data.stream === "stderr" ? "stderr" : "");
    applyTestResults(outputBuffer);
    const live = parseSummary(outputBuffer);
    if (live) renderSummary(live.fail ? "fail" : "ok", live);
  });

  eventSource.addEventListener("exit", (ev) => {
    const data = JSON.parse(ev.data);
    const code = data.code ?? 1;
    const ok = code === 0;
    runStatusEl.textContent = `exit ${code}`;
    runStatusEl.className = `run-status ${ok ? "ok" : "fail"}`;
    appendTerminal(`\n[process exited with code ${code}]\n`, "meta");
    applyTestResults(outputBuffer);
    const stats = parseSummary(outputBuffer);
    renderSummary(ok ? "ok" : "fail", stats);
    setRunning(false);
    closeRun();
  });

  eventSource.onerror = () => {
    if (running) {
      appendTerminal("\n[connection lost]\n", "stderr");
      runStatusEl.textContent = "error";
      runStatusEl.className = "run-status fail";
      renderSummary("error", parseSummary(outputBuffer));
      setRunning(false);
    }
    closeRun();
  };
}

async function stopRun() {
  closeRun();
  try {
    await fetch("/api/stop", { method: "POST" });
  } catch {
    /* ignore */
  }
  if (running) {
    appendTerminal("\n[stopped]\n", "meta");
    runStatusEl.textContent = "stopped";
    runStatusEl.className = "run-status fail";
    renderSummary("stopped", parseSummary(outputBuffer));
    setRunning(false);
  }
}

function renderTestList(tests) {
  testListEl.replaceChildren();
  for (const name of tests) {
    const tr = document.createElement("tr");
    tr.dataset.name = name;
    tr.dataset.status = "pending";

    const statusTd = document.createElement("td");
    statusTd.className = "test-status status-pending";
    statusTd.textContent = "—";

    const nameTd = document.createElement("td");
    nameTd.className = "test-name";
    nameTd.textContent = name;
    nameTd.title = name;

    const actionTd = document.createElement("td");
    actionTd.className = "test-action";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-run btn-sm";
    btn.textContent = "RUN";
    btn.disabled = running;
    btn.addEventListener("click", () => runTests(name));
    actionTd.appendChild(btn);

    tr.append(statusTd, nameTd, actionTd);
    testListEl.appendChild(tr);
  }
}

async function selectProblem(id) {
  selectedId = id;

  for (const btn of problemListEl.querySelectorAll(".problem-item")) {
    btn.classList.toggle("active", btn.dataset.id === id);
  }

  emptyStateEl.hidden = true;
  workspaceEl.hidden = false;
  setTab("readme");
  markdownEl.innerHTML = "<p class='meta'>Loading…</p>";

  const [problem, { tests }] = await Promise.all([
    fetchJson(`/api/problems/${encodeURIComponent(id)}`),
    fetchJson(`/api/problems/${encodeURIComponent(id)}/tests`),
  ]);

  markdownEl.innerHTML = marked.parse(problem.markdown);
  renderTestList(tests);
  history.replaceState(null, "", `#${encodeURIComponent(id)}`);
}

async function init() {
  const problems = await fetchJson("/api/problems");
  problemListEl.replaceChildren();

  for (const p of problems) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "problem-item";
    btn.dataset.id = p.id;

    const idEl = document.createElement("span");
    idEl.className = "id";
    idEl.textContent = p.id;

    const titleEl = document.createElement("span");
    titleEl.className = "title";
    titleEl.textContent = p.title;

    btn.append(idEl, titleEl);
    btn.addEventListener("click", () => {
      selectProblem(p.id).catch((err) => {
        markdownEl.textContent = String(err);
      });
    });
    problemListEl.appendChild(btn);
  }

  for (const btn of tabButtons) {
    btn.addEventListener("click", () => {
      setTab(/** @type {"readme" | "tests"} */ (btn.dataset.tab));
    });
  }

  btnRunAll.addEventListener("click", () => runTests(null));
  btnStop.addEventListener("click", () => {
    stopRun().catch(() => {});
  });

  initResultsPane();

  const hash = decodeURIComponent(location.hash.replace(/^#/, ""));
  if (hash && problems.some((p) => p.id === hash)) {
    await selectProblem(hash);
  } else if (problems[0]) {
    await selectProblem(problems[0].id);
  }
}

init().catch((err) => {
  emptyStateEl.textContent = `Failed to load: ${err}`;
});
