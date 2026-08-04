export function numIslands(grid: string[][]): number {
  const processedGrid: boolean[][] = []
  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    processedGrid[i] = [];
    for (let j = 0; j < row.length; j++) {
      processedGrid[i][j] = false;
    }
  }

  let foundIslands = 0;

  const processRecursively = (grid: string[][], i: number, j: number) => {
    if (i >= grid.length) {
      return;
    }
    if (i < 0) {
      return;
    }
    if (j < 0) {
      return;
    }
    const row = grid[i];
    if (j >= row.length) {
      return;
    }
    const char = row[j];

    if (processedGrid[i][j]) {
      return;
    }
    processedGrid[i][j] = true;
    
    if (char !== '1') {
      return;
    }
    processRecursively(grid, i-1, j);
    processRecursively(grid, i, j-1);
    processRecursively(grid, i+1, j);
    processRecursively(grid, i, j+1);
  }

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    for (let j = 0; j < row.length; j++) {
      if (grid[i][j] === '1' && !processedGrid[i][j]) {
        foundIslands++
        processRecursively(grid, i, j);
      }
    }
  }

  return foundIslands;
}
