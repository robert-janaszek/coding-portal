import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { findKthLargest } from "./findKthLargest";

describe("findKthLargest", () => {
  it("example 1", () => {
    assert.equal(findKthLargest([9, 3, 7, 1], 2), 7);
  });

  it("example 2", () => {
    assert.equal(findKthLargest([4, 4, 1, 8, 4], 3), 4);
  });

  it("single element", () => {
    assert.equal(findKthLargest([2], 1), 2);
  });

  it("k = 1 is the maximum", () => {
    assert.equal(findKthLargest([7, -3, 9, 0], 1), 9);
  });

  it("k = n is the minimum", () => {
    assert.equal(findKthLargest([7, -3, 9, 0], 4), -3);
  });

  it("all equal", () => {
    assert.equal(findKthLargest([2, 2, 2, 2], 3), 2);
  });

  it("negatives", () => {
    assert.equal(findKthLargest([-1, -2, -3, -4], 2), -2);
  });
});
