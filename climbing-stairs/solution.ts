export function climbStairs(n: number): number {
  const results = [1, 2];
  for (let i = 2; i <= n; i++) {
    results[i] = results[i - 1] + results[i - 2];
  }

  return results[n - 1];
}
