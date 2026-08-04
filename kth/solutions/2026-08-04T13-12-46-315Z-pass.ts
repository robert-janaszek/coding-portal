export function findKthSortedArrays(
  nums1: number[],
  nums2: number[],
  k: number,
): number {
  if (k > nums1.length + nums2.length) {
    throw new Error("k is greater than combined length of both input arrays");
  }

  if (nums1.length > nums2.length) {
    return findKthSortedArrays(nums2, nums1, k);
  }

  let low = Math.max(0, k - nums2.length);
  let high = Math.min(nums1.length, k);

  while (high >= low) {
    const split = Math.floor((high - low) / 2) + low;
    const rSplit = k - split;

    const first1 = nums1[split - 1] ?? -Infinity;
    const first2 = nums1[split] ?? Infinity;
    const second1 = nums2[rSplit - 1] ?? -Infinity;
    const second2 = nums2[rSplit] ?? Infinity;

    if (first1 > second2) {
      high = split - 1;
      continue;
    }
    if (first2 < second1) {
      low = split + 1;
      continue;
    }

    return Math.max(first1, second1);
  }

  return -1;
}
