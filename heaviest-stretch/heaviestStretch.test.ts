import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { heaviestStretch } from "./heaviestStretch";

/** Cubic-free O(n^2) oracle — only for tiny n. */
function naive(nums: number[]): number {
  if (nums.length === 0) return 0;
  let best = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let sum = 0;
    for (let j = i; j < nums.length; j++) {
      sum += nums[j]!;
      best = Math.max(best, sum);
    }
  }
  return best;
}

describe("heaviestStretch", () => {
  it("example 1", () => {
    assert.equal(heaviestStretch([3, -2, 5, -1]), 6);
  });

  it("example 2 — all negative", () => {
    assert.equal(heaviestStretch([-4, -1, -7]), -1);
  });

  it("example 3 — drop a deep dip", () => {
    assert.equal(heaviestStretch([2, -5, 3, 4, -1]), 7);
  });

  it("example 4 — empty", () => {
    assert.equal(heaviestStretch([]), 0);
  });

  it("single value", () => {
    assert.equal(heaviestStretch([8]), 8);
    assert.equal(heaviestStretch([-3]), -3);
  });

  it("whole line wins", () => {
    assert.equal(heaviestStretch([9, -2, -1, 8]), 14);
  });

  it("drop a losing prefix", () => {
    assert.equal(heaviestStretch([-5, 4, 3]), 7);
  });

  it("drop a losing prefix before a later dip", () => {
    assert.equal(heaviestStretch([-2, 3, 4, -10]), 7);
    assert.equal(heaviestStretch([-3, 4, 5, -20]), 9);
  });

  it("best stretch is a late singleton after a deep dip", () => {
    assert.equal(heaviestStretch([1, -2, -3, 4]), 4);
  });

  it("best stretch is a late singleton after two losing dips", () => {
    assert.equal(heaviestStretch([5, -6, -7, 8]), 8);
  });

  it("positive peak after a negative start", () => {
    assert.equal(heaviestStretch([-7, 9, -19]), 9);
  });

  it("drop a losing suffix", () => {
    assert.equal(heaviestStretch([4, 3, -10]), 7);
  });

  it("shallow dip is worth keeping", () => {
    assert.equal(heaviestStretch([5, -1, -2, 4]), 6);
  });

  it("zeros", () => {
    assert.equal(heaviestStretch([0, 0]), 0);
    assert.equal(heaviestStretch([0, -1, 0]), 0);
  });

  it("two values", () => {
    assert.equal(heaviestStretch([-2, 1]), 1);
    assert.equal(heaviestStretch([1, -2]), 1);
  });

  describe("naive cross-check", () => {
    const cases: number[][] = [
      [],
      [8],
      [-3],
      [3, -2, 5, -1],
      [-4, -1, -7],
      [2, -5, 3, 4, -1],
      [1, -2, 3, -2, 5],
      [7, -8, 6, -3, 4],
      [4, -1, 2, -3, 5, -2, 1],
      [10, -20, 5],
      [-2, 3, 4, -10],
      [-3, 4, 5, -20],
    ];
    for (const nums of cases) {
      it(`${JSON.stringify(nums)}`, () => {
        assert.equal(heaviestStretch(nums), naive(nums));
      });
    }
  });

  it("longer line", () => {
    assert.equal(heaviestStretch([4, -1, 2, -3, 5, -2, 1]), 7);
  });
});
