# Hints — Days Until Warmer

Spoilers. Read only after you have tried on your own.

Brute force is `O(n²)`: for each day scan forward until a warmer one.

For `O(n)`, keep a **monotonic stack of indices** of days that still wait for a warmer temperature (temperatures on the stack are non-increasing from bottom to top):

1. Iterate `i` from left to right.
2. While the stack is non-empty and `temperatures[i] > temperatures[stack.top]`, pop: that day found its warmer day at `i`. Set `answer[popped] = i - popped`.
3. Push `i`.

Each index is pushed and popped at most once → `O(n)`.
