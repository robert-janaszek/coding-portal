import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { searchRotated } from "./searchRotated";

describe("searchRotated", () => {
  describe("examples", () => {
    it("finds target in the right (pivoted) half", () => {
      assert.equal(searchRotated([8, 14, -3, 0, 2], 0), 3);
    });

    it("missing target", () => {
      assert.equal(searchRotated([8, 14, -3, 0, 2], 5), -1);
    });

    it("single element miss", () => {
      assert.equal(searchRotated([4], 1), -1);
    });
  });

  describe("rotation positions", () => {
    it("no rotation — fully sorted", () => {
      assert.equal(searchRotated([1, 2, 3, 4, 5], 4), 3);
    });

    it("rotated by one", () => {
      assert.equal(searchRotated([5, 1, 2, 3, 4], 1), 1);
    });

    it("pivot in the middle", () => {
      assert.equal(searchRotated([6, 7, 1, 2, 3, 4, 5], 7), 1);
    });

    it("target is the smallest (new head after pivot)", () => {
      assert.equal(searchRotated([8, 14, -3, 0, 2], 8), 0);
    });

    it("target is the last element", () => {
      assert.equal(searchRotated([8, 14, -3, 0, 2], 2), 4);
    });
  });

  describe("edges", () => {
    it("empty array", () => {
      assert.equal(searchRotated([], 1), -1);
    });

    it("single element hit", () => {
      assert.equal(searchRotated([5], 5), 0);
    });

    it("two elements — left", () => {
      assert.equal(searchRotated([3, 1], 3), 0);
    });

    it("two elements — right", () => {
      assert.equal(searchRotated([3, 1], 1), 1);
    });

    it("two elements — miss", () => {
      assert.equal(searchRotated([3, 1], 2), -1);
    });

    it("target smaller than all", () => {
      assert.equal(searchRotated([8, 14, -3, 0, 2], -4), -1);
    });

    it("target larger than all", () => {
      assert.equal(searchRotated([8, 14, -3, 0, 2], 15), -1);
    });
  });

  describe("naive cross-check", () => {
    const nums = [11, 14, 19, 25, 30, -20, -7, -1, 0, 2, 5, 8];

    for (const target of nums) {
      it(`hits ${target}`, () => {
        assert.equal(searchRotated(nums, target), nums.indexOf(target));
      });
    }

    for (const target of [-21, -8, 1, 3, 9, 15, 31]) {
      it(`misses ${target}`, () => {
        assert.equal(searchRotated(nums, target), -1);
      });
    }
  });
});
