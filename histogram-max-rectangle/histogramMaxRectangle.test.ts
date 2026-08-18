import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { histogramMaxRectangle } from "./histogramMaxRectangle";

/** O(n^2) reference for small cases. */
function naive(heights: number[]): number {
  let best = 0;
  const n = heights.length;
  for (let i = 0; i < n; i++) {
    let minH = heights[i]!;
    for (let j = i; j < n; j++) {
      minH = Math.min(minH, heights[j]!);
      best = Math.max(best, minH * (j - i + 1));
    }
  }
  return best;
}

describe("histogramMaxRectangle", () => {
  it("example 1", () => {
    assert.equal(histogramMaxRectangle([2, 4, 2]), 6);
  });

  it("example 2", () => {
    assert.equal(histogramMaxRectangle([3, 1]), 3);
  });

  it("single bar", () => {
    assert.equal(histogramMaxRectangle([5]), 5);
  });

  it("all equal", () => {
    assert.equal(histogramMaxRectangle([3, 3, 3, 3]), 12);
  });

  it("strictly increasing", () => {
    assert.equal(histogramMaxRectangle([1, 2, 3, 4]), 6);
  });

  it("strictly decreasing", () => {
    assert.equal(histogramMaxRectangle([4, 3, 2, 1]), 6);
  });

  it("with zeros", () => {
    assert.equal(histogramMaxRectangle([2, 0, 2]), 2);
  });

  it("peak in middle", () => {
    assert.equal(histogramMaxRectangle([1, 2, 3, 2, 1]), 6);
  });

  it("additional", () => {
    assert.equal(histogramMaxRectangle([1, 3, 2, 1, 2]), 5);
  });

  it("two peaks", () => {
    assert.equal(histogramMaxRectangle([1, 2, 3, 2, 1, 2, 3, 2, 1]), 9);
  });

  it("repeated histogram pattern", () => {
    assert.equal(histogramMaxRectangle([2, 1, 5, 6, 2, 3, 2, 1, 5, 6, 2, 3]), 12);
  });

  it("naive cross-check batch", () => {
    const cases = [
      [1],
      [0, 0, 0],
      [1, 1, 1, 1, 1],
      [5, 4, 3, 2, 1, 2, 3, 4, 5],
      [2, 1, 2],
      [6, 2, 5, 4, 5, 1, 6],
      [1, 3, 2, 1, 2],
      [1, 2, 3, 2, 1, 2, 3, 2, 1],
      [2, 1, 5, 6, 2, 3, 2, 1, 5, 6, 2, 3],
      [4, 2, 0, 3, 2, 5],
      [1, 0, 1],
      [9, 0, 9],
      [3, 6, 2, 5, 3],
      [1, 2, 3, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1],
    ];
    for (const h of cases) {
      assert.equal(histogramMaxRectangle(h), naive(h), `failed on [${h}]`);
    }
  });
});
