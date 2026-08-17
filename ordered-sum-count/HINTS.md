# Hints — Ordered Sum Count

Spoilers. Read only after you have tried on your own.

## Idea

Order matters, so a sequence is built left to right. Let `dp[s]` = number of sequences that sum to `s`.

Base: `dp[0] = 1`.

## Structure

Process sums **outer**, numbers **inner**:

```
for s from 1 to target:
  for each num in nums:
    if num <= s:
      dp[s] += dp[s - num]
```

The last number in the sequence can be any `num`, so `[1,2]` and `[2,1]` come from different last numbers and both count.

If you nest the loops the other way (numbers outer), order no longer matters and those two collapse into one.

## Complexity

`target` sums, `n` choices each: `O(n * target)` time, `O(target)` extra space.

Naive recursion without memo follows every sequence and will time out.
