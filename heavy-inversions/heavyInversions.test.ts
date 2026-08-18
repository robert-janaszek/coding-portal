import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { heavyInversions } from "./heavyInversions";

function brute(nums: number[]): number {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i]! > 2 * nums[j]!) count++;
    }
  }
  return count;
}

describe("heavyInversions", () => {
  it("example 1", () => {
    assert.equal(heavyInversions([6, 1, 2]), 2);
  });

  it("example 2", () => {
    assert.equal(heavyInversions([9, 2, 3]), 2);
  });

  it("example 3 decreasing", () => {
    assert.equal(heavyInversions([4, 1]), 1);
  });

  it("single element", () => {
    assert.equal(heavyInversions([1]), 0);
  });

  it("two elements pair", () => {
    assert.equal(heavyInversions([5, 1]), 1);
  });

  it("two elements no pair", () => {
    assert.equal(heavyInversions([1, 5]), 0);
  });

  it("strictly increasing", () => {
    assert.equal(heavyInversions([1, 2, 3, 4, 5]), 0);
  });

  it("all equal", () => {
    assert.equal(heavyInversions([2, 2, 2, 2]), 0);
  });

  it("equals vs twice", () => {
    assert.equal(heavyInversions([4, 2]), 0);
    assert.equal(heavyInversions([5, 2]), 1);
  });

  it("negatives", () => {
    assert.equal(heavyInversions([-2, -4]), 1);
    assert.equal(heavyInversions([-5, -5]), 1);
  });

  it("zeros", () => {
    assert.equal(heavyInversions([0, 0]), 0);
    assert.equal(heavyInversions([1, 0]), 1);
  });

  it("mixed signs", () => {
    assert.equal(heavyInversions([2, -1, 0, -3]), brute([2, -1, 0, -3]));
  });

  describe("brute-force cross-check", () => {
    const cases: number[][] = [
      [6, 1, 5, 3, 2],
      [1, 1, 1],
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      [-10, 10, -5, 5, 0],
      [8, 1, 5, 2, 9, 3, 7, 4, 6],
      [2147483647, -2147483648],
      Array.from({ length: 20 }, (_, i) => 20 - i),
    ];

    for (const [index, input] of cases.entries()) {
      it(`batch #${index}: length ${input.length}`, () => {
        assert.equal(heavyInversions([...input]), brute(input));
      });
    }
  });
});
