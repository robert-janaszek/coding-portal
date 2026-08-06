import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { AVLTree } from "./AVLTree";

/** Loose upper bound: still O(log n), fails for a linked-list BST. */
function maxAllowedHeight(n: number): number {
  if (n <= 0) return 0;
  return 2 * Math.ceil(Math.log2(n + 1));
}

describe("AVLTree", () => {
  it("example LL then RR", () => {
    const t = new AVLTree();
    t.insert(30);
    t.insert(20);
    t.insert(10);
    assert.deepEqual(t.toArray(), [10, 20, 30]);
    assert.equal(t.height(), 2);
    assert.equal(t.size(), 3);
    assert.equal(t.contains(20), true);

    t.insert(40);
    t.insert(50);
    assert.deepEqual(t.toArray(), [10, 20, 30, 40, 50]);
    assert.equal(t.delete(20), true);
    assert.equal(t.contains(20), false);
  });

  it("empty tree", () => {
    const t = new AVLTree();
    assert.equal(t.size(), 0);
    assert.equal(t.height(), 0);
    assert.deepEqual(t.toArray(), []);
    assert.equal(t.contains(1), false);
    assert.equal(t.delete(1), false);
  });

  it("duplicate insert is no-op", () => {
    const t = new AVLTree();
    t.insert(5);
    t.insert(5);
    assert.equal(t.size(), 1);
    assert.deepEqual(t.toArray(), [5]);
    assert.equal(t.height(), 1);
  });

  it("LR rotation case", () => {
    const t = new AVLTree();
    t.insert(30);
    t.insert(10);
    t.insert(20);
    assert.deepEqual(t.toArray(), [10, 20, 30]);
    assert.equal(t.height(), 2);
    assert.ok(t.height() <= maxAllowedHeight(3));
  });

  it("RL rotation case", () => {
    const t = new AVLTree();
    t.insert(10);
    t.insert(30);
    t.insert(20);
    assert.deepEqual(t.toArray(), [10, 20, 30]);
    assert.equal(t.height(), 2);
  });

  it("sorted ascending inserts stay logarithmic height", () => {
    const t = new AVLTree();
    const n = 200;
    for (let i = 1; i <= n; i++) t.insert(i);
    assert.equal(t.size(), n);
    assert.deepEqual(
      t.toArray(),
      Array.from({ length: n }, (_, i) => i + 1),
    );
    assert.ok(
      t.height() <= maxAllowedHeight(n),
      `height ${t.height()} > ${maxAllowedHeight(n)}`,
    );
    assert.ok(t.height() < n / 2, "height looks linear — missing rotations?");
  });

  it("sorted descending inserts stay logarithmic height", () => {
    const t = new AVLTree();
    const n = 200;
    for (let i = n; i >= 1; i--) t.insert(i);
    assert.equal(t.size(), n);
    assert.ok(t.height() <= maxAllowedHeight(n));
    assert.equal(t.contains(1), true);
    assert.equal(t.contains(n), true);
  });

  it("negative keys", () => {
    const t = new AVLTree();
    t.insert(0);
    t.insert(-2);
    t.insert(3);
    t.insert(-5);
    assert.deepEqual(t.toArray(), [-5, -2, 0, 3]);
    assert.equal(t.contains(-2), true);
  });

  it("delete leaf", () => {
    const t = new AVLTree();
    t.insert(2);
    t.insert(1);
    t.insert(3);
    assert.equal(t.delete(1), true);
    assert.deepEqual(t.toArray(), [2, 3]);
    assert.equal(t.size(), 2);
  });

  it("delete node with two children", () => {
    const t = new AVLTree();
    for (const k of [50, 25, 75, 10, 30, 60, 90]) t.insert(k);
    assert.equal(t.delete(50), true);
    assert.equal(t.contains(50), false);
    assert.deepEqual(t.toArray(), [10, 25, 30, 60, 75, 90]);
    assert.ok(t.height() <= maxAllowedHeight(6));
  });

  it("delete missing returns false", () => {
    const t = new AVLTree();
    t.insert(1);
    assert.equal(t.delete(99), false);
    assert.equal(t.size(), 1);
  });

  it("delete all keeps empty invariants", () => {
    const t = new AVLTree();
    for (let i = 1; i <= 15; i++) t.insert(i);
    for (let i = 1; i <= 15; i++) assert.equal(t.delete(i), true);
    assert.equal(t.size(), 0);
    assert.equal(t.height(), 0);
    assert.deepEqual(t.toArray(), []);
  });

  it("interleaved inserts and deletes stay balanced", () => {
    const t = new AVLTree();
    for (let i = 1; i <= 50; i++) t.insert(i);
    for (let i = 1; i <= 50; i += 2) assert.equal(t.delete(i), true);
    assert.equal(t.size(), 25);
    assert.ok(t.height() <= maxAllowedHeight(25));
    assert.deepEqual(
      t.toArray(),
      Array.from({ length: 25 }, (_, i) => (i + 1) * 2),
    );
    for (let i = 51; i <= 80; i++) t.insert(i);
    assert.ok(t.height() <= maxAllowedHeight(t.size()));
  });
});
