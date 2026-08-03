import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { binarySearch } from "./binarySearch";

describe("binarySearch (bisection)", () => {
  describe("examples", () => {
    it("finds target in the middle-right", () => {
      assert.equal(binarySearch([-1, 0, 3, 5, 9, 12], 9), 4);
    });

    it("missing target", () => {
      assert.equal(binarySearch([-1, 0, 3, 5, 9, 12], 2), -1);
    });

    it("single element hit", () => {
      assert.equal(binarySearch([5], 5), 0);
    });
  });

  describe("edges", () => {
    it("empty array", () => {
      assert.equal(binarySearch([], 1), -1);
    });

    it("single element miss", () => {
      assert.equal(binarySearch([5], 0), -1);
    });

    it("first element", () => {
      assert.equal(binarySearch([1, 2, 3, 4, 5], 1), 0);
    });

    it("last element", () => {
      assert.equal(binarySearch([1, 2, 3, 4, 5], 5), 4);
    });

    it("target smaller than all", () => {
      assert.equal(binarySearch([2, 4, 6, 8], 1), -1);
    });

    it("target larger than all", () => {
      assert.equal(binarySearch([2, 4, 6, 8], 10), -1);
    });
  });

  describe("negatives", () => {
    it("all negative", () => {
      assert.equal(binarySearch([-10, -5, -2, -1], -5), 1);
    });

    it("mixed signs", () => {
      assert.equal(binarySearch([-3, -1, 0, 2, 4], 0), 2);
    });
  });

  describe("various lengths", () => {
    it("two elements — left", () => {
      assert.equal(binarySearch([1, 3], 1), 0);
    });

    it("two elements — right", () => {
      assert.equal(binarySearch([1, 3], 3), 1);
    });

    it("two elements — miss", () => {
      assert.equal(binarySearch([1, 3], 2), -1);
    });

    it("odd length middle", () => {
      assert.equal(binarySearch([1, 3, 5, 7, 9], 5), 2);
    });

    it("even length", () => {
      assert.equal(binarySearch([1, 3, 5, 7, 9, 11], 7), 3);
    });
  });

  describe("naive cross-check", () => {
    const nums = [-20, -7, -1, 0, 2, 5, 8, 11, 14, 19, 25, 30];

    for (const target of nums) {
      it(`hits ${target}`, () => {
        assert.equal(binarySearch(nums, target), nums.indexOf(target));
      });
    }

    for (const target of [-21, -8, 1, 3, 9, 15, 31]) {
      it(`misses ${target}`, () => {
        assert.equal(binarySearch(nums, target), -1);
      });
    }
  });
});
