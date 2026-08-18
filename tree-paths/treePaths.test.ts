import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { TreeNode, treePaths } from "./treePaths";

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

describe("treePaths", () => {
  it("example 1", () => {
    assert.deepEqual(treePaths(tree([8, 3, 9, 1, 5])), [
      "8->3->1",
      "8->3->5",
      "8->9",
    ]);
  });

  it("single node", () => {
    assert.deepEqual(treePaths(tree([4])), ["4"]);
  });

  it("empty tree", () => {
    assert.deepEqual(treePaths(null), []);
  });

  it("only left children", () => {
    assert.deepEqual(treePaths(tree([1, 2, null, 3])), ["1->2->3"]);
  });

  it("only right children", () => {
    assert.deepEqual(treePaths(tree([1, null, 2, null, 3])), ["1->2->3"]);
  });

  it("unbalanced with two leaves on the right", () => {
    assert.deepEqual(treePaths(tree([5, null, 6, 7, 8])), [
      "5->6->7",
      "5->6->8",
    ]);
  });
});
