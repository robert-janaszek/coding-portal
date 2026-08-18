import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { kthLargestInArray } from "./kthLargestInArray";

describe("kthLargestInArray", () => {
  it("example 1", () => {
    assert.equal(kthLargestInArray([9, 3, 7, 1], 2), 7);
  });

  it("example 2", () => {
    assert.equal(kthLargestInArray([4, 4, 1, 8, 4], 3), 4);
  });

  it("single element", () => {
    assert.equal(kthLargestInArray([2], 1), 2);
  });

  it("k = 1 is the maximum", () => {
    assert.equal(kthLargestInArray([7, -3, 9, 0], 1), 9);
  });

  it("k = n is the minimum", () => {
    assert.equal(kthLargestInArray([7, -3, 9, 0], 4), -3);
  });

  it("all equal", () => {
    assert.equal(kthLargestInArray([2, 2, 2, 2], 3), 2);
  });

  it("negatives", () => {
    assert.equal(kthLargestInArray([-1, -2, -3, -4], 2), -2);
  });
});
