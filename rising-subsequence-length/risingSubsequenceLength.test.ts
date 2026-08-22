import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { risingSubsequenceLength } from "./risingSubsequenceLength";

/** Take / skip recursion — only for short arrays. */
function naive(nums: number[]): number {
  const n = nums.length;
  const dfs = (i: number, prev: number): number => {
    if (i === n) return 0;
    const skip = dfs(i + 1, prev);
    const canTake = prev === Number.NEGATIVE_INFINITY || nums[i]! > prev;
    const take = canTake ? 1 + dfs(i + 1, nums[i]!) : 0;
    return Math.max(skip, take);
  };
  return dfs(0, Number.NEGATIVE_INFINITY);
}

describe("risingSubsequenceLength", () => {
  describe("examples", () => {
    it("example 1", () => {
      assert.equal(risingSubsequenceLength([3, 1, 2, 4]), 3);
    });

    it("example 2 — strictly falling", () => {
      assert.equal(risingSubsequenceLength([5, 4, 3, 2]), 1);
    });

    it("example 3 — equals are not rising", () => {
      assert.equal(risingSubsequenceLength([7, 7, 7]), 1);
    });
  });

  describe("edges", () => {
    it("empty", () => {
      assert.equal(risingSubsequenceLength([]), 0);
    });

    it("single", () => {
      assert.equal(risingSubsequenceLength([4]), 1);
    });

    it("already rising", () => {
      assert.equal(risingSubsequenceLength([1, 2, 3, 4]), 4);
    });

    it("two elements rising", () => {
      assert.equal(risingSubsequenceLength([1, 3]), 2);
    });

    it("two elements falling", () => {
      assert.equal(risingSubsequenceLength([3, 1]), 1);
    });
  });

  describe("skips and negatives", () => {
    it("must skip a dip", () => {
      assert.equal(risingSubsequenceLength([1, 8, 2, 3, 4]), 4);
    });

    it("negatives", () => {
      assert.equal(risingSubsequenceLength([-5, -1, 0, 2]), 4);
    });

    it("mixed signs", () => {
      assert.equal(risingSubsequenceLength([3, -1, 2, 0, 4]), 3);
    });

    it("plateau then rise", () => {
      assert.equal(risingSubsequenceLength([2, 2, 2, 3]), 2);
    });
  });

  describe("naive cross-check", () => {
    const cases: number[][] = [
      [],
      [1],
      [1, 2, 3],
      [3, 2, 1],
      [3, 1, 2, 4],
      [7, 7, 7],
      [1, 8, 2, 3, 4],
      [-2, -1, 0],
      [4, 1, 3, 2, 5],
      [10, 9, 2, 5, 3, 7],
    ];
    for (const nums of cases) {
      it(`naive [${nums}]`, () => {
        assert.equal(risingSubsequenceLength(nums), naive(nums));
      });
    }
  });
});
