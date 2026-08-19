import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { nonAdjacentMax } from "./nonAdjacentMax";

/** Exponential oracle — only for tiny n. */
function naive(nums: number[]): number {
  const dfs = (i: number): number => {
    if (i >= nums.length) return 0;
    return Math.max(nums[i]! + dfs(i + 2), dfs(i + 1));
  };
  return dfs(0);
}

describe("nonAdjacentMax", () => {
  it("example 1", () => {
    assert.equal(nonAdjacentMax([4, 1, 5, 8, 3]), 12);
  });

  it("example 2", () => {
    assert.equal(nonAdjacentMax([6, 1, 2, 10]), 16);
  });

  it("example 3 — single value", () => {
    assert.equal(nonAdjacentMax([5]), 5);
  });

  it("example 4 — empty", () => {
    assert.equal(nonAdjacentMax([]), 0);
  });

  it("two values — take the larger", () => {
    assert.equal(nonAdjacentMax([3, 9]), 9);
    assert.equal(nonAdjacentMax([10, 3]), 10);
  });

  it("zeros", () => {
    assert.equal(nonAdjacentMax([0, 0, 0]), 0);
  });

  it("ends are both worth taking", () => {
    assert.equal(nonAdjacentMax([9, 1, 1, 9]), 18);
  });

  it("skip a large middle neighbor", () => {
    assert.equal(nonAdjacentMax([7, 2, 1, 8, 4]), 15);
  });

  describe("naive cross-check", () => {
    const cases: number[][] = [
      [],
      [5],
      [3, 9],
      [4, 1, 5, 8, 3],
      [6, 1, 2, 10],
      [7, 2, 1, 8, 4],
      [2, 4, 6, 2, 5],
      [8, 3, 6, 4, 5, 2],
    ];
    for (const nums of cases) {
      it(`${JSON.stringify(nums)}`, () => {
        assert.equal(nonAdjacentMax(nums), naive(nums));
      });
    }
  });

  it("longer line", () => {
    assert.equal(nonAdjacentMax([8, 3, 6, 4, 5, 2]), 19);
  });
});
