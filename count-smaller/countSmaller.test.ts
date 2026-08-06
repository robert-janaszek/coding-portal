import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { countSmaller } from "./countSmaller";

describe("countSmaller", () => {
  it("example 1", () => {
    assert.deepEqual(countSmaller([5, 2, 6, 1]), [2, 1, 1, 0]);
  });

  it("example 2", () => {
    assert.deepEqual(countSmaller([-1]), [0]);
  });

  it("example 3 equal values", () => {
    assert.deepEqual(countSmaller([-1, -1]), [0, 0]);
  });

  it("strictly decreasing", () => {
    assert.deepEqual(countSmaller([4, 3, 2, 1]), [3, 2, 1, 0]);
  });

  it("strictly increasing", () => {
    assert.deepEqual(countSmaller([1, 2, 3, 4]), [0, 0, 0, 0]);
  });

  it("all equal", () => {
    assert.deepEqual(countSmaller([7, 7, 7, 7]), [0, 0, 0, 0]);
  });

  it("mixed with zeros and negatives", () => {
    assert.deepEqual(countSmaller([2, 0, 1, -1]), [3, 1, 1, 0]);
  });

  it("duplicates not counted as smaller", () => {
    assert.deepEqual(countSmaller([5, 5, 2, 5, 1]), [2, 2, 1, 1, 0]);
  });

  it("single peak", () => {
    assert.deepEqual(countSmaller([1, 5, 2]), [0, 1, 0]);
  });

  it("longer mixed", () => {
    assert.deepEqual(
      countSmaller([6, 5, 4, 3, 2, 1, 7]),
      [5, 4, 3, 2, 1, 0, 0],
    );
  });
});
