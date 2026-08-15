import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { AVLTree, type AVLArray } from "./AVLTree";

/** Loose upper bound: still O(log n), fails for a linked-list BST. */
function maxAllowedHeight(n: number): number {
  if (n <= 0) return 0;
  return 2 * Math.ceil(Math.log2(n + 1));
}

function isSnapshot(value: unknown): value is AVLArray {
  if (!Array.isArray(value)) return false;
  if (value.length === 0) return true;
  if (value.length !== 3) return false;
  const [key, left, right] = value;
  return typeof key === "number" && isSnapshot(left) && isSnapshot(right);
}

function heightOf(snapshot: AVLArray): number {
  if (snapshot.length === 0) return 0;
  return 1 + Math.max(heightOf(snapshot[1]), heightOf(snapshot[2]));
}

function inOrder(snapshot: AVLArray): number[] {
  if (snapshot.length === 0) return [];
  return [...inOrder(snapshot[1]), snapshot[0], ...inOrder(snapshot[2])];
}

function assertAvl(snapshot: unknown, expectedKeys: number[]): void {
  assert.ok(isSnapshot(snapshot), "toArray() must be [] or [key, left, right]");
  const keys = inOrder(snapshot);
  assert.deepEqual(keys, expectedKeys);

  function check(node: AVLArray, min: number, max: number): number {
    if (node.length === 0) return 0;
    const [key, left, right] = node;
    assert.ok(key > min && key < max, `BST violated at ${key}`);
    const leftH = check(left, min, key);
    const rightH = check(right, key, max);
    assert.ok(
      Math.abs(leftH - rightH) <= 1,
      `unbalanced at ${key}: left height ${leftH}, right height ${rightH}`,
    );
    return 1 + Math.max(leftH, rightH);
  }

  const h = check(snapshot, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY);
  assert.equal(h, heightOf(snapshot));
  assert.ok(
    h <= maxAllowedHeight(expectedKeys.length),
    `height ${h} > ${maxAllowedHeight(expectedKeys.length)}`,
  );
}

describe("AVLTree", () => {
  it("example LL then RR", () => {
    const t = new AVLTree();
    t.insert(30);
    t.insert(20);
    t.insert(10);
    assert.deepEqual(t.toArray(), [20, [10, [], []], [30, [], []]]);

    t.insert(40);
    t.insert(50);
    assert.deepEqual(t.toArray(), [
      20,
      [10, [], []],
      [40, [30, [], []], [50, [], []]],
    ]);
    assertAvl(t.toArray(), [10, 20, 30, 40, 50]);
  });

  it("empty tree", () => {
    const t = new AVLTree();
    assert.deepEqual(t.toArray(), []);
  });

  it("duplicate insert is no-op", () => {
    const t = new AVLTree();
    t.insert(5);
    t.insert(5);
    assert.deepEqual(t.toArray(), [5, [], []]);
  });

  it("LR rotation case", () => {
    const t = new AVLTree();
    t.insert(30);
    t.insert(10);
    t.insert(20);
    assert.deepEqual(t.toArray(), [20, [10, [], []], [30, [], []]]);
  });

  it("RL rotation case", () => {
    const t = new AVLTree();
    t.insert(10);
    t.insert(30);
    t.insert(20);
    assert.deepEqual(t.toArray(), [20, [10, [], []], [30, [], []]]);
  });

  it("sorted ascending inserts stay balanced", () => {
    const t = new AVLTree();
    const n = 200;
    for (let i = 1; i <= n; i++) t.insert(i);
    const snapshot = t.toArray();
    assertAvl(
      snapshot,
      Array.from({ length: n }, (_, i) => i + 1),
    );
    assert.ok(
      heightOf(snapshot as AVLArray) < n / 2,
      "height looks linear — missing rotations?",
    );
  });

  it("sorted descending inserts stay balanced", () => {
    const t = new AVLTree();
    const n = 200;
    for (let i = n; i >= 1; i--) t.insert(i);
    assertAvl(
      t.toArray(),
      Array.from({ length: n }, (_, i) => i + 1),
    );
  });

  it("sequential 1..7 is a complete tree", () => {
    const t = new AVLTree();
    for (let i = 1; i <= 7; i++) t.insert(i);
    assert.deepEqual(t.toArray(), [
      4,
      [2, [1, [], []], [3, [], []]],
      [6, [5, [], []], [7, [], []]],
    ]);
  });

  it("negative keys", () => {
    const t = new AVLTree();
    t.insert(0);
    t.insert(-2);
    t.insert(3);
    t.insert(-5);
    assertAvl(t.toArray(), [-5, -2, 0, 3]);
  });

  it("mixed insertion order stays balanced", () => {
    const t = new AVLTree();
    for (const k of [50, 25, 75, 10, 30, 60, 90]) t.insert(k);
    assertAvl(t.toArray(), [10, 25, 30, 50, 60, 75, 90]);
  });
});
