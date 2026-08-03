# Hints — Minimum Window Substring

Spoilers. Read only after you have tried on your own.

Sliding window:

1. Count needed chars from `t`.
2. Expand `right` until window is valid.
3. Shrink `left` while still valid; track best length/start.
4. Use a `have/need` counter so validity is `O(1)`.
