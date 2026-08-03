export function binarySearch(nums: number[], target: number): number {
  let low = 0;
  let high = nums.length - 1;

  while (high >= low) {
    let half = Math.floor((high - low) / 2) + low;
    let candidate = nums[half];
    if (candidate === target) {
      return half;
    }
    if (target < candidate) {
      high = half - 1;
      continue;
    }

    low = half + 1;
    continue;
  }

  return -1;
}
