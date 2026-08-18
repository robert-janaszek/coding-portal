# Course Order

**Difficulty:** Medium  
**Topics:** Graph  
**Target:** `O(V + E)` time

## Problem

There are `numCourses` classes numbered `0 … numCourses - 1`. Each pair `[a, b]` in `prerequisites` means **`b` must come before `a`**.

Return any permutation that respects every pair. If a cycle makes that impossible, return `[]`.

## Examples

```
Input:  numCourses = 3, prerequisites = [[1,0],[2,1]]
Output: [0, 1, 2]

Input:  numCourses = 3, prerequisites = [[1,0],[2,0],[2,1]]
Output: [0, 1, 2]   // [0, 1, 2] is the only order

Input:  numCourses = 1, prerequisites = []
Output: [0]
```

## Constraints

- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= numCourses * (numCourses - 1)`
- `prerequisites[i].length == 2`
- `0 <= ai, bi < numCourses`
- `ai != bi`
- no duplicate edges in tests

## Files

| File | Role |
|------|------|
| `findOrder.ts` | Stub — implement here |
| `solutions/` | Archived attempts (spoilers) |
| `findOrder.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:course-schedule
```
