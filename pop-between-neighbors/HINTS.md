# Hints — Pop Between Neighbors

Spoilers. Read only after you have tried on your own.

## Idea

Trying every removal order is `n!`. The useful subproblem is a **subarray whose two ends stay as walls**: you will remove everything strictly between them, and the last value you remove in that open interval is multiplied by those two walls.

Pad the line with `1` on both ends. Those sentinels are never removed.

## Structure

Let `vals = [1, ...nums, 1]`.

`dp[i][j]` = max score from removing every index strictly between `i` and `j` (walls `vals[i]` and `vals[j]` stay).

The last index removed in `(i, j)` is some `k` (`i < k < j`):

```
dp[i][j] = max over k of
  vals[i] * vals[k] * vals[j]  +  dp[i][k]  +  dp[k][j]
```

The two inner ranges are independent because `k` is still present while they are cleared.

Fill by growing the gap `j - i` so the inner `dp` cells are already known.

Answer: `dp[0][vals.length - 1]`. Empty `nums` → `0`.

## Complexity

`O(n²)` intervals, `O(n)` choices of `k` each → `O(n³)` time, `O(n²)` extra space.
