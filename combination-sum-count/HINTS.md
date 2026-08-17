# Hints — Combination Sum Count

Spoilers. Read only after you have tried on your own.

## Idea

You do not need the combinations, only how many there are. Let `dp[s]` = number of unordered combinations that sum to `s`.

Base: `dp[0] = 1` (one way to make nothing: take nothing).

## Structure

Process candidates **outer**, sums **inner** (forward):

```
for each candidate c:
  for s from c to target:
    dp[s] += dp[s - c]
```

Outer `c` means each combination is built in a fixed candidate order, so `[2,3]` is counted once. If you nest the loops the other way (sums outer), `[2,3]` and `[3,2]` both get counted.

Reuse is free because `s` goes upward.

## Complexity

`n` candidates, `target + 1` sums: `O(n * target)` time, `O(target)` extra space.
