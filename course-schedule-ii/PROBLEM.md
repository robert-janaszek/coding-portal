# Course Schedule II

**Difficulty:** Medium  
**Topics:** Graph  
**Target:** `O(V + E)` time

## Problem

There are `numCourses` courses labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` means you must take course `bi` before course `ai`.

Return **any** valid order of courses to finish all. If it is impossible (cycle), return an empty array.

## Examples

```
Input:  numCourses = 2, prerequisites = [[1,0]]
Output: [0,1]

Input:  numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
Output: [0,1,2,3]   // or [0,2,1,3]

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
