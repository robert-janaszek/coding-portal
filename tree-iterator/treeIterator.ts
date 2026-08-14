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

export function* dfsPreorder(root: TreeNode | null): Generator<number> {
  void root;
  throw new Error("Not implemented");
}

export function* bfsLevelOrder(root: TreeNode | null): Generator<number> {
  void root;
  throw new Error("Not implemented");
}

export function createDfsIterator(root: TreeNode | null): Iterator<number> {
  void root;
  throw new Error("Not implemented");
}

export function createBfsIterator(root: TreeNode | null): Iterator<number> {
  void root;
  throw new Error("Not implemented");
}
