import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { maxPathSum, TreeNode } from "./maxPathSum";

/** Build tree from level-order array with `null` gaps. */
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

describe("maxPathSum", () => {
  it("example 1", () => {
    assert.equal(maxPathSum(tree([1, 2, 3])), 6);
  });

  it("example 2", () => {
    assert.equal(maxPathSum(tree([-10, 9, 20, null, null, 15, 7])), 42);
  });

  it("single node", () => {
    assert.equal(maxPathSum(tree([5])), 5);
  });

  it("single negative node", () => {
    assert.equal(maxPathSum(tree([-3])), -3);
  });

  it("all negative — pick least bad node", () => {
    assert.equal(maxPathSum(tree([-2, -1, -3])), -1);
  });

  it("left chain", () => {
    assert.equal(maxPathSum(tree([1, 2, null, 3])), 6);
  });

  it("right chain", () => {
    assert.equal(maxPathSum(tree([1, null, 2, null, 3])), 6);
  });

  it("bend better than root alone", () => {
    assert.equal(maxPathSum(tree([9, 6, -3, null, null, -6, 2, null, null, 2, null, -6, -6, -6])), 16);
  });

  it("linear positives", () => {
    assert.equal(maxPathSum(tree([1, 2, null, 3, null, 4])), 10);
  });

  it("discard both negative children — node alone wins", () => {
    //     -100
    //      /
    //     5
    //    / \
    //  -1  -2
    assert.equal(maxPathSum(tree([-100, 5, null, -1, -2])), 5);
  });

  it("discard one negative child — node plus better child wins", () => {
    //     -100
    //      /
    //     5
    //    / \
    //   3  -10
    assert.equal(maxPathSum(tree([-100, 5, null, 3, -10])), 8);
  });
});
