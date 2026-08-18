# Shortest Covering Window

**Difficulty:** Hard  
**Topics:** Strings  
**Target:** `O(|s| + |t|)` time

## Problem

From `s`, pick the shortest contiguous slice that still contains every character of `t` (with at least the same multiplicity). If several slices share that length, keep the **leftmost**. If nothing covers `t`, return `""`.

Comparison is case-sensitive.

## Examples

```
Input:  s = "mmxymzym", t = "xyz"
Output: "xymz"

Input:  s = "k", t = "k"
Output: "k"

Input:  s = "k", t = "kk"
Output: ""
```

## Constraints

- tests stay modest in length
- `t` consists of letters; case-sensitive

## Files

| File | Role |
|------|------|
| `shortestCoveringWindow.ts` | Stub |
| `shortestCoveringWindow.test.ts` | Tests |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:shortest-covering-window
```
