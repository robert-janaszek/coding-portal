import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { partition } from "./partition";

function expectedPivotIndex(
  nums: number[],
  left: number,
  right: number,
): number {
  const pivot = nums[right]!;
  let le = 0;
  for (let i = left; i < right; i++) {
    if (nums[i]! <= pivot) le++;
  }
  return left + le;
}

function asMultiset(values: number[]): number[] {
  return [...values].sort((a, b) => a - b);
}

function check(nums: number[], left: number, right: number) {
  const original = [...nums];
  const expectedP = expectedPivotIndex(original, left, right);
  const pivotValue = original[right]!;

  const p = partition(nums, left, right);

  assert.equal(p, expectedP);
  assert.equal(nums[p], pivotValue);

  for (let i = left; i < p; i++) {
    assert.ok(nums[i]! <= nums[p]!);
  }
  for (let i = p + 1; i <= right; i++) {
    assert.ok(nums[i]! > nums[p]!);
  }

  assert.deepEqual(
    asMultiset(nums.slice(left, right + 1)),
    asMultiset(original.slice(left, right + 1)),
  );

  assert.deepEqual(nums.slice(0, left), original.slice(0, left));
  assert.deepEqual(nums.slice(right + 1), original.slice(right + 1));
}

describe("partition", () => {
  describe("examples", () => {
    it("example 1", () => {
      // console.log(partition([5, 1, 2, 4, 3], 0, 4));
      check([5, 1, 2, 4, 3], 0, 4);
    });

    it("example 2", () => {
      check([3, 1, 4, 2], 0, 3);
    });

    it("example 3 all <= pivot", () => {
      check([1, 2, 3], 0, 2);
    });
  });

  describe("edge cases", () => {
    it("single element", () => {
      check([7], 0, 0);
    });

    it("two elements already ordered", () => {
      check([1, 2], 0, 1);
    });

    it("two elements reversed", () => {
      check([2, 1], 0, 1);
    });

    it("all equal", () => {
      check([4, 4, 4, 4], 0, 3);
    });

    it("strictly decreasing", () => {
      check([4, 3, 2, 1], 0, 3);
    });

    it("strictly increasing", () => {
      check([1, 2, 3, 4], 0, 3);
    });

    it("all greater than pivot", () => {
      check([9, 8, 7, 1], 0, 3);
    });
  });

  describe("subarray bounds", () => {
    it("partitions only the middle", () => {
      check([9, 5, 1, 4, 2, 8], 1, 4);
    });

    it("left half only", () => {
      check([3, 1, 2, 9, 8], 0, 2);
    });

    it("right half only", () => {
      check([9, 8, 3, 1, 2], 2, 4);
    });

    it("does not touch a prefix", () => {
      const nums = [100, 50, 3, 1, 2];
      partition(nums, 2, 4);
      assert.equal(nums[0], 100);
      assert.equal(nums[1], 50);
    });
  });

  describe("negatives and duplicates", () => {
    it("negatives", () => {
      check([-1, -5, 0, -2], 0, 3);
    });

    it("mixed signs", () => {
      check([2, -3, 4, -1, 0], 0, 4);
    });

    it("duplicates around pivot", () => {
      check([2, 1, 2, 3, 2], 0, 4);
    });
  });
});
