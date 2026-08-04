export function largestRectangleArea(heights: number[]): number {
  let maxArea = 0;
  let maxHeight = heights[0]
  
  for (const h of heights) {
    if (h > maxHeight) {
      maxHeight = h;
    }
  }
  
  const currentHeights: number[] = Array.from({ length: maxHeight }).fill(0) as number[];

  const checkHeights = (lowestHeight: number) => {
    for (let j = currentHeights.length - 1; j > lowestHeight; j--) {
      const checkedHeight = currentHeights[j];
      if (!checkedHeight) {
        continue;
      }
      if (checkedHeight * j > maxArea) {
        maxArea = checkedHeight * j;
      }

      currentHeights[j] = 0;
    }
  }

  for (let i = 0; i < heights.length; i++) {
    const height = heights[i];
    
    for (let j = 1; j <= height; j++) {
      currentHeights[j] = (currentHeights[j] ?? 0) + 1;
    }

    checkHeights(height);
  }

  checkHeights(0);

  return maxArea;
}
