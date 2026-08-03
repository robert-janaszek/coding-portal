# Coding Portal

Local TypeScript workspace for algorithm / interview practice. Each exercise lives in its own folder with a statement, tests, optional hints, and a stub to implement. A small web UI lists problems and runs the test suite.

## Setup

```bash
npm install
```

Requires Node.js (with `tsx` via the project deps).

## Portal

```bash
npm run portal
```

Open [http://localhost:3456](http://localhost:3456).

- Browse problems in the sidebar (green ✓ = reference `solution.ts` exists)
- Read the statement, run all tests or a single case
- After a full suite passes, use **Mark as done** to save your code to `solution.ts` and restore the stub from the hidden template

## Solve a problem

1. Open the stub (e.g. `climbing-stairs/climbStairs.ts`) — implement there.
2. Read `PROBLEM.md` in that folder (also shown in the portal).
3. Run tests from the portal or the CLI:

```bash
npm run test:climbing-stairs
# or
npm run test:run -- climbing-stairs/climbStairs.test.ts
```

`HINTS.md` and `solution.ts` are spoilers — use only if stuck.

## Problem layout

```
<problem-id>/
  PROBLEM.md       # statement, examples, constraints
  HINTS.md         # spoilers
  <Name>.ts        # implement here
  .<Name>.ts       # stub template (restored on Mark as done)
  <Name>.test.ts   # tests
  solution.ts      # optional reference solution
```

A folder is picked up by the portal when it contains `PROBLEM.md` and a `*.test.ts` file.

## CLI test scripts

| Script | Problem |
|--------|---------|
| `npm run test:bisection` | Binary search |
| `npm run test:climbing-stairs` | Climbing stairs |
| `npm run test:course-schedule` | Course schedule II |
| `npm run test:edit-distance` | Edit distance |
| `npm run test:findMedianSortedArrays` | Median of two sorted arrays |
| `npm run test:heapsort` | Heap sort |
| `npm run test:kth` | K-th in two sorted arrays |
| `npm run test:histogram` | Largest rectangle in histogram |
| `npm run test:min-window` | Minimum window substring |
| `npm run test:max-path-sum` | Binary tree max path sum |
| `npm run test:lru` | LRU cache |
| `npm run test:day1` / `test:day2` | Grouped suites |

## Add a new exercise

Mirror an existing folder (e.g. `climbing-stairs/`):

1. `PROBLEM.md` + `HINTS.md`
2. Stub `<Name>.ts` and identical hidden template `.<Name>.ts`
3. `<Name>.test.ts` importing `it` from `../test/it`
4. Optional `test:<id>` script in `package.json`
