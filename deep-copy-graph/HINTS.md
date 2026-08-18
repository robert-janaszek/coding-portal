# Hints — Deep Copy a Graph

Spoilers. Read only after you have tried on your own.

## Idea

The graph is stored as **objects and pointers**: each `GraphNode` holds references to neighbor objects. A deep copy means a new object per original node, with neighbor pointers rewritten to the new objects.

## Approach

1. Map original node → cloned node (so you never clone twice, and cycles don’t loop forever).
2. DFS or BFS from the start node.
3. When you first see a node, create its clone and record it in the map.
4. After a neighbor is cloned (or already in the map), push that clone onto `clone.neighbors`.

## Complexity

Each node and edge is processed once → `O(V + E)`.
