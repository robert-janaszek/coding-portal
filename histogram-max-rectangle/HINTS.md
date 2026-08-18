# Hints — Histogram Max Rectangle

Spoilers. Read only after you have tried on your own.

For each bar `i`, find the nearest smaller bar on the left and on the right.  
Area using `heights[i]` as the shortest bar: `(right - left - 1) * heights[i]`.

Monotonic increasing stack of indices:

1. Push while stack top height `<` current (or use sentinel `0` at end).
2. When a smaller bar arrives, pop and compute area for the popped bar.
