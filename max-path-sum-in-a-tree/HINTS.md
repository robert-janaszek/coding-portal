# Hints — Max Path Sum in a Tree

Spoilers. Read only after you have tried on your own.

Walk **post-order**: recurse left, recurse right, then combine at the current node.

DFS returning the **best downward contribution** from this node (for the parent):

`gain = node.val + max(0, leftGain, rightGain)`  // at most one child

Meanwhile update global answer with a path that may bend here:

`node.val + max(0, leftGain) + max(0, rightGain)`

Negative children are discarded via `max(0, …)`.
