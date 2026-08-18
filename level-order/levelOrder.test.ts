import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { TreeNode, levelOrder } from "./levelOrder";

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

describe("levelOrder", () => {
  it("example 1", () => {
    assert.deepEqual(levelOrder(tree([4, 9, 2, 1, null, 7, 6])), [
      [4],
      [9, 2],
      [1, 7, 6],
    ]);
  });

  it("single node", () => {
    assert.deepEqual(levelOrder(tree([3])), [[3]]);
  });

  it("empty tree", () => {
    assert.deepEqual(levelOrder(null), []);
  });

  it("only left children", () => {
    assert.deepEqual(levelOrder(tree([1, 2, null, 3])), [[1], [2], [3]]);
  });

  it("only right children", () => {
    assert.deepEqual(levelOrder(tree([1, null, 2, null, 3])), [[1], [2], [3]]);
  });

  it("missing left child on the last level", () => {
    assert.deepEqual(levelOrder(tree([8, 3, 9, null, 5])), [
      [8],
      [3, 9],
      [5],
    ]);
  });
});
