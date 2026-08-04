import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import {
  TreeNode,
  lowestCommonAncestor,
} from "./lowestCommonAncestor";

/** Build tree from level-order array with `null` gaps. */
function buildTree(vals: (number | null)[]): TreeNode | null {
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

function findByVal(root: TreeNode | null, val: number): TreeNode {
  if (!root) throw new Error("Tree is empty");
  const q: TreeNode[] = [root];
  while (q.length) {
    const node = q.shift()!;
    if (node.val === val) return node;
    if (node.left) q.push(node.left);
    if (node.right) q.push(node.right);
  }
  throw new Error(`Node with val=${val} not found`);
}

describe("lowestCommonAncestor", () => {
  it("example 1", () => {
    const root = buildTree([
      3,
      5,
      1,
      6,
      2,
      0,
      8,
      null,
      null,
      7,
      4,
    ]);
    const p = findByVal(root, 5);
    const q = findByVal(root, 1);
    const lca = lowestCommonAncestor(root, p, q);
    assert.equal(lca?.val, 3);
  });

  it("example 2", () => {
    const root = buildTree([
      3,
      5,
      1,
      6,
      2,
      0,
      8,
      null,
      null,
      7,
      4,
    ]);
    const p = findByVal(root, 5);
    const q = findByVal(root, 4);
    const lca = lowestCommonAncestor(root, p, q);
    assert.equal(lca?.val, 5);
  });

  it("example 3", () => {
    const root = buildTree([
      3,
      5,
      1,
      6,
      2,
      0,
      8,
      null,
      null,
      7,
      4,
    ]);
    const p = findByVal(root, 6);
    const q = findByVal(root, 4);
    const lca = lowestCommonAncestor(root, p, q);
    assert.equal(lca?.val, 2);
  });

  it("p equals q returns p", () => {
    const root = buildTree([1, 2, 3]);
    const p = findByVal(root, 2);
    const lca = lowestCommonAncestor(root, p, p);
    assert.equal(lca?.val, 2);
  });
});

