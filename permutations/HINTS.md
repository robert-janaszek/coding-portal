# Hints — Permutations

Spoilers. Read only after you have tried on your own.

## Idea

Same `path` + `push` / recurse / `pop` as combinations. You cannot use a `start` index: the next value can be any number **not already in `path`**.

## Structure

1. Keep a `used: boolean[]` (or a set) aligned with `nums`.
2. When `path.length === nums.length`, save a copy of `path`.
3. Loop over every index `i`. If `used[i]`, skip. Otherwise mark it, `path.push(nums[i])`, recurse, then unmark and `pop`.

## Complexity

There are `n!` permutations. Copying each costs `O(n)` → `O(n * n!)`. Extra space is `path` and `used`: `O(n)`.
