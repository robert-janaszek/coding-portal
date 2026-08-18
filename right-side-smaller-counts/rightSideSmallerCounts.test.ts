import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { rightSideSmallerCounts } from "./rightSideSmallerCounts";

describe("rightSideSmallerCounts", () => {
  it("example 1", () => {
    assert.deepEqual(rightSideSmallerCounts([8, 1, 5, 2]), [3, 0, 1, 0]);
  });

  it("example 2", () => {
    assert.deepEqual(rightSideSmallerCounts([4]), [0]);
  });

  it("example 3 equal values", () => {
    assert.deepEqual(rightSideSmallerCounts([2, 2]), [0, 0]);
  });

  it("strictly decreasing", () => {
    assert.deepEqual(rightSideSmallerCounts([4, 3, 2, 1]), [3, 2, 1, 0]);
  });

  it("strictly increasing", () => {
    assert.deepEqual(rightSideSmallerCounts([1, 2, 3, 4]), [0, 0, 0, 0]);
  });

  it("all equal", () => {
    assert.deepEqual(rightSideSmallerCounts([7, 7, 7, 7]), [0, 0, 0, 0]);
  });

  it("mixed with zeros and negatives", () => {
    assert.deepEqual(rightSideSmallerCounts([2, 0, 1, -1]), [3, 1, 1, 0]);
  });

  it("duplicates not counted as smaller", () => {
    assert.deepEqual(rightSideSmallerCounts([5, 5, 2, 5, 1]), [2, 2, 1, 1, 0]);
  });

  it("single peak", () => {
    assert.deepEqual(rightSideSmallerCounts([1, 5, 2]), [0, 1, 0]);
  });

  it("longer mixed", () => {
    assert.deepEqual(
      rightSideSmallerCounts([6, 5, 4, 3, 2, 1, 7]),
      [5, 4, 3, 2, 1, 0, 0],
    );
  });
});
