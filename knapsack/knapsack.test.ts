import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { knapsack } from "./knapsack";

/** Exponential oracle — only for tiny n. */
function naive(weights: number[], values: number[], capacity: number): number {
  const n = weights.length;
  let best = 0;
  const limit = 1 << n;
  for (let mask = 0; mask < limit; mask++) {
    let w = 0;
    let v = 0;
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        w += weights[i]!;
        v += values[i]!;
      }
    }
    if (w <= capacity) best = Math.max(best, v);
  }
  return best;
}

describe("knapsack", () => {
  it("example: 22", () => {
    assert.equal(knapsack([1, 2, 3], [6, 10, 12], 5), 22);
  });

  it("example: 7", () => {
    assert.equal(knapsack([2, 3, 4, 5], [3, 4, 5, 6], 5), 7);
  });

  it("nothing fits", () => {
    assert.equal(knapsack([10], [1], 5), 0);
  });

  it("empty items", () => {
    assert.equal(knapsack([], [], 10), 0);
  });

  it("zero capacity", () => {
    assert.equal(knapsack([1, 2], [5, 6], 0), 0);
  });

  it("take the single item", () => {
    assert.equal(knapsack([3], [9], 3), 9);
  });

  it("skip a heavy high-value item", () => {
    assert.equal(knapsack([5, 1, 1], [10, 6, 6], 2), 12);
  });

  describe("naive cross-check", () => {
    const cases: [number[], number[], number][] = [
      [[1, 2, 3], [1, 2, 3], 3],
      [[4, 5, 1], [1, 2, 3], 4],
      [[2, 2, 2], [1, 2, 3], 4],
      [[1, 1, 1, 1], [4, 3, 2, 1], 2],
    ];
    for (const [w, v, c] of cases) {
      it(`weights=${JSON.stringify(w)} cap=${c}`, () => {
        assert.equal(knapsack(w, v, c), naive(w, v, c));
      });
    }
  });
});
