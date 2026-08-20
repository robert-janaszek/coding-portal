# Hints — Opposite Ends

Spoilers. Read only after you have tried on your own.

## Idea

This is 2-coloring an undirected graph. Cables are edges; polarities are two colors. Adjacent terminals must get different colors.

## Structure

1. Build an adjacency list (both directions).
2. For each uncolored terminal, BFS or DFS: assign it polarity `0`, then give each neighbor the other polarity.
3. If you ever see a neighbor that already has the **same** polarity as the current terminal, return `false`.
4. Separate components are independent — start a new search for each uncolored terminal.

An odd-length cycle cannot be 2-colored. Even cycles and trees can.

## Complexity

Each terminal and cable is processed a constant number of times → `O(n + m)`.
