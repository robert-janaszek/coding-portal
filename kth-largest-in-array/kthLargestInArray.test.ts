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

  it("increasing sequence, k = 2", () => {
    assert.equal(kthLargestInArray([1, 2, 3], 2), 2);
  });

  it("replace min when new value is larger than the rest of the heap", () => {
    assert.equal(kthLargestInArray([1, 5, 10], 2), 5);
  });

  it("even-sized heap sifts with only a left child", () => {
    assert.equal(kthLargestInArray([1, 2, 3, 4, 5, 6, 7], 4), 4);
  });

  it("duplicates then a strictly larger value, k = 2", () => {
    assert.equal(kthLargestInArray([4, 4, 4, 5], 2), 4);
  });
});
