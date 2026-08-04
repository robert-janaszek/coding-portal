function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let maxArea = 0;
  const n = heights.length;

  for (let i = 0; i <= n; i++) {
    const current = i === n ? 0 : heights[i]!;
    while (stack.length > 0 && heights[stack[stack.length - 1]!]! >= current) {
      const h = heights[stack.pop()!]!;
      const left = stack.length === 0 ? -1 : stack[stack.length - 1]!;
      maxArea = Math.max(maxArea, h * (i - left - 1));
    }
    if (i < n) stack.push(i);
  }

  return maxArea;
}

export function maximalRectangle(matrix: string[][]): number {
  if (matrix.length === 0 || matrix[0]!.length === 0) return 0;

  const cols = matrix[0]!.length;
  const heights = Array.from({ length: cols }, () => 0);
  let maxArea = 0;

  for (const row of matrix) {
    for (let c = 0; c < cols; c++) {
      heights[c] = row[c] === "1" ? heights[c]! + 1 : 0;
    }
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
}
