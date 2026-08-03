# Hints — Course Schedule II

Spoilers. Read only after you have tried on your own.

Topological sort (Kahn or DFS):

1. Build adjacency list: `bi → ai` (edge = “bi before ai”).
2. Kahn: indegrees + queue of zero-indegree nodes; emit order.
3. If emitted count `< numCourses` → cycle → `[]`.
