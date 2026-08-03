import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { largestRectangleArea } from "./largestRectangleArea.ts";

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

describe("largestRectangleArea", () => {
  it("example 1", () => {
    assert.equal(largestRectangleArea([2, 1, 5, 6, 2, 3]), 10);
  });

  it("example 2", () => {
    assert.equal(largestRectangleArea([2, 4]), 4);
  });

  it("single bar", () => {
    assert.equal(largestRectangleArea([5]), 5);
  });

  it("all equal", () => {
    assert.equal(largestRectangleArea([3, 3, 3, 3]), 12);
  });

  it("strictly increasing", () => {
    assert.equal(largestRectangleArea([1, 2, 3, 4]), 6);
  });

  it("strictly decreasing", () => {
    assert.equal(largestRectangleArea([4, 3, 2, 1]), 6);
  });

  it("with zeros", () => {
    assert.equal(largestRectangleArea([2, 0, 2]), 2);
  });

  it("peak in middle", () => {
    assert.equal(largestRectangleArea([1, 2, 3, 2, 1]), 6);
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
    ];
    for (const h of cases) {
      assert.equal(largestRectangleArea(h), naive(h), `failed on [${h}]`);
    }
  });
});
