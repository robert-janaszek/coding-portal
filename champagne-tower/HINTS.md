# Hints — Champagne Tower

Spoilers. Read only after you have tried on your own.

Same mass idea as the knight: pour **all** `poured` cups into the top at once, then let overflow cascade.

A glass that receives `x` keeps `min(1, x)`. Overflow is `max(0, x - 1)` and splits `/ 2` to the two children `(row+1, glass)` and `(row+1, glass+1)`.

Simulate row by row down to `queryRow`. You only need the current row (and the next), so extra space is `O(row)`.

Answer: `min(1, amount at (queryRow, queryGlass))`.

Do not loop `poured` times — `10^9` cups will time out. One cascade of mass is enough.
