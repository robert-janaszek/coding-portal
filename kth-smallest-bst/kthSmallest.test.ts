import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { TreeNode, kthSmallest } from "./kthSmallest";

function tree(vals: (number | null)[]): TreeNode | null {
  if (vals.length === 0 || vals[0] == null) return null;
  const root = new TreeNode(vals[0]);
  const q: TreeNode[] = [root];
  let i = 1;
  while (q.length && i < vals.length) {
    const node = q.shift()!;
    if (i < vals.length) {
      const v = vals[i++];
      if (v != null) {
        node.left = new TreeNode(v);
        q.push(node.left);
      }
    }
    if (i < vals.length) {
      const v = vals[i++];
      if (v != null) {
        node.right = new TreeNode(v);
        q.push(node.right);
      }
    }
  }
  return root;
}

describe("kthSmallest", () => {
  const example = [6, 2, 8, 1, 4];

  it("example 1 — k = 3", () => {
    assert.equal(kthSmallest(tree(example), 3), 4);
  });

  it("smallest", () => {
    assert.equal(kthSmallest(tree(example), 1), 1);
  });

  it("largest", () => {
    assert.equal(kthSmallest(tree(example), 5), 8);
  });

  it("single node", () => {
    assert.equal(kthSmallest(tree([7]), 1), 7);
  });

  it("right-skewed", () => {
    assert.equal(kthSmallest(tree([1, null, 2, null, 3, null, 4]), 3), 3);
  });

  it("left-skewed", () => {
    assert.equal(kthSmallest(tree([4, 3, null, 2, null, 1]), 2), 2);
  });
});
