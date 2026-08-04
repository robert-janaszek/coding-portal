export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(
    val = 0,
    left: TreeNode | null = null,
    right: TreeNode | null = null,
  ) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

export function maxPathSum(root: TreeNode | null): number {
  let bestSum = -Infinity;

  const dfsSum = (node: TreeNode | null): number => {
    if (node === null) {
      return 0;
    }
    const sumOfLeft = node ? dfsSum(node.left) : 0;
    const sumOfRight = node ? dfsSum(node.right) : 0;

    const sumOfCombined = Math.max(
      sumOfLeft + sumOfRight + (node?.val ?? 0),
      sumOfRight + (node?.val ?? 0),
      sumOfLeft + (node?.val ?? 0),
      (node?.val ?? 0)
    );

    if (sumOfCombined > bestSum) {
      bestSum = sumOfCombined;
    }

    return Math.max(sumOfLeft + node.val, sumOfRight + node.val, node.val);
  }

  const sum = dfsSum(root);

  if (sum > bestSum) {
    return sum;
  }

  return bestSum;
}
