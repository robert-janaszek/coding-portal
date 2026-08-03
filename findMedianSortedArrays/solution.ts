export function findMedianSortedArrays(
  nums1: number[],
  nums2: number[],
): number {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  let low = 0;
  let high = nums1.length;
  let mn = nums1.length + nums2.length;
  let isEven = mn % 2 == 0;
  let mnHalf = Math.ceil(mn / 2);

  while (high >= low) {
    let splitPoint = Math.ceil((high - low) / 2) + low;
    let num2SplitPoint = mnHalf - splitPoint;

    let l1 = nums1[splitPoint - 1] ?? -Infinity;
    let l2 = nums1[splitPoint] ?? Infinity;
    let r1 = nums2[num2SplitPoint - 1] ?? -Infinity;
    let r2 = nums2[num2SplitPoint] ?? Infinity;

    if (l1 > r2) {
      high = splitPoint - 1;
      continue;
    }
    if (l2 < r1) {
      low = splitPoint + 1;
      continue;
    }

    if (!isEven) {
      return Math.max(l1, r1);
    }
    return (Math.max(l1, r1) + Math.min(l2, r2)) / 2;
  }

  return -1;
}
