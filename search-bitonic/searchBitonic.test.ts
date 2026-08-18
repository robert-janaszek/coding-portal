import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { searchBitonic } from "./searchBitonic";

describe("searchBitonic", () => {
  describe("examples", () => {
    it("finds target on the descending half", () => {
      assert.equal(searchBitonic([1, 3, 8, 12, 4, 2], 4), 4);
    });

    it("finds the peak", () => {
      assert.equal(searchBitonic([1, 3, 8, 12, 4, 2], 12), 3);
    });

    it("missing target", () => {
      assert.equal(searchBitonic([1, 3, 8, 12, 4, 2], 5), -1);
    });
  });

  describe("which half", () => {
    it("first element (ascending side)", () => {
      assert.equal(searchBitonic([1, 3, 8, 12, 4, 2], 1), 0);
    });

    it("last element (descending side)", () => {
      assert.equal(searchBitonic([1, 3, 8, 12, 4, 2], 2), 5);
    });

    it("value just left of the peak", () => {
      assert.equal(searchBitonic([1, 3, 8, 12, 4, 2], 8), 2);
    });
  });

  describe("peak position", () => {
    it("peak near the start", () => {
      assert.equal(searchBitonic([1, 9, 7, 5, 3], 5), 3);
    });

    it("peak near the end", () => {
      assert.equal(searchBitonic([1, 3, 5, 7, 4], 3), 1);
    });

    it("shortest mountain", () => {
      assert.equal(searchBitonic([1, 3, 2], 3), 1);
    });

    it("shortest mountain — miss", () => {
      assert.equal(searchBitonic([1, 3, 2], 4), -1);
    });
  });

  describe("edges", () => {
    it("target smaller than all", () => {
      assert.equal(searchBitonic([2, 4, 8, 5, 1], 0), -1);
    });

    it("target larger than peak", () => {
      assert.equal(searchBitonic([2, 4, 8, 5, 1], 9), -1);
    });

    it("negatives", () => {
      assert.equal(searchBitonic([-10, -3, 0, 4, -1, -8], -1), 4);
    });
  });

  describe("naive cross-check", () => {
    const nums = [-20, -7, 0, 2, 8, 19, 14, 11, 5, -1];

    for (const target of nums) {
      it(`hits ${target}`, () => {
        assert.equal(searchBitonic(nums, target), nums.indexOf(target));
      });
    }

    for (const target of [-21, -8, 1, 3, 9, 15, 20]) {
      it(`misses ${target}`, () => {
        assert.equal(searchBitonic(nums, target), -1);
      });
    }
  });
});
