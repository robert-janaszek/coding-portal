# Hints — Spreading Fire

Spoilers. Read only after you have tried on your own.

## Multi-source BFS

All cells that start as `2` catch fire at minute `0`. They should all sit in the queue at the beginning — this is the same as one BFS from many sources, not a separate search per fire.

Each step of the queue is one minute. When you reach a `1`, mark it burning (`2`) and enqueue it with `time + 1`.

Track the largest time you assigned to any tree. That is the answer, provided every `1` was reached.

## Impossible case

After BFS, if any `1` remains, return `-1`.

## Complexity

Each cell is enqueued at most once → `O(m * n)` time and extra space.
