import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { findMedianSortedArrays } from "./findMedianSortedArrays";

/** Reference median via merge+sort — for expected values only. */
function naiveMedian(nums1: number[], nums2: number[]): number {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  const n = merged.length;
  if (n % 2 === 1) return merged[Math.floor(n / 2)]!;
  return (merged[n / 2 - 1]! + merged[n / 2]!) / 2;
}

function check(nums1: number[], nums2: number[], expected?: number) {
  const got = findMedianSortedArrays(nums1, nums2);
  const want = expected ?? naiveMedian(nums1, nums2);
  assert.equal(got, want);
}

describe("findMedianSortedArrays (ex1)", () => {
  describe("examples", () => {
    it("example 1: odd total", () => {
      check([1, 3], [2], 2);
    });

    it("example 2: even total", () => {
      check([1, 2], [3, 4], 2.5);
    });

    it("argument order does not matter", () => {
      assert.equal(findMedianSortedArrays([9], [1, 2, 3, 4, 5, 6, 7, 8]), 5);
      assert.equal(findMedianSortedArrays([1, 2, 3, 4, 5, 6, 7, 8], [9]), 5);
    });
  });

  describe("empty / single-sided", () => {
    it("nums1 empty, odd", () => {
      check([], [1], 1);
    });

    it("nums1 empty, even", () => {
      check([], [1, 2], 1.5);
    });

    it("nums2 empty, odd", () => {
      check([1], [], 1);
    });

    it("nums2 empty, even", () => {
      check([1, 2], [], 1.5);
    });

    it("one empty, longer array", () => {
      check([], [1, 2, 3, 4, 5], 3);
    });
  });

  describe("single elements", () => {
    it("two singles, ordered", () => {
      check([1], [2], 1.5);
    });

    it("two singles, reversed", () => {
      check([2], [1], 1.5);
    });

    it("equal singles", () => {
      check([1], [1], 1);
    });
  });

  describe("interleaved ranges", () => {
    it("all nums1 smaller than nums2", () => {
      check([1, 2, 3, 4, 5], [6, 7, 8, 9, 10], 5.5);
    });

    it("all nums2 smaller than nums1", () => {
      check([6, 7, 8, 9, 10], [1, 2, 3, 4, 5], 5.5);
    });

    it("nums1 entirely between halves of nums2", () => {
      check([1, 2, 33], [0, 10, 10, 10, 10], 10);
    });

    it("strictly alternating start", () => {
      check([1, 3, 5], [2, 4, 6], 3.5);
    });
  });

  describe("duplicates", () => {
    it("many duplicates across both", () => {
      check([1, 1, 1], [1, 1, 1], 1);
    });

    it("duplicates around median", () => {
      check([1, 2, 2], [2, 2, 3], 2);
    });

    it("plateau on one side", () => {
      // merged = [0,1,2,3,10,10,10,10] → (3+10)/2
      check([1, 2, 3], [0, 10, 10, 10, 10], 6.5);
    });
  });

  describe("negatives", () => {
    it("all negative", () => {
      check([-5, -3, -1], [-4, -2], -3);
    });

    it("mixed signs", () => {
      check([-5, -1, 0], [1, 2, 3], 0.5);
    });

    it("constraint edges", () => {
      check([-1_000_000], [1_000_000], 0);
    });
  });

  describe("uneven lengths", () => {
    it("short + long, odd", () => {
      check([1], [2, 3, 4, 5, 6], 3.5);
    });

    it("short + long, even", () => {
      check([1, 2], [3, 4, 5, 6, 7, 8], 4.5);
    });

    it("one element vs many", () => {
      check([100], [1, 2, 3, 4, 5, 6, 7], 4.5);
    });

    it("m=0 handled via swap path mentally", () => {
      check([2, 2, 2, 2], [], 2);
    });
  });

  describe("odd vs even totals", () => {
    it("total 1", () => {
      check([7], [], 7);
    });

    it("total 3", () => {
      check([1, 4], [3], 3);
    });

    it("total 4", () => {
      check([1, 4], [2, 3], 2.5);
    });

    it("total 5", () => {
      check([1, 2, 3], [4, 5], 3);
    });

    it("total 7", () => {
      check([0, 0], [0, 0, 0, 0, 0], 0);
    });
  });

  describe("naive cross-check batch", () => {
    const cases: [number[], number[]][] = [
      [[1, 3, 8, 9, 15], [7, 11, 18, 19, 21, 25]],
      [[2, 3, 5, 8], [10, 12, 14, 16, 18, 20]],
      [[-2, -1], [0]],
      [[1, 1, 3, 3], [1, 1, 3, 3]],
      [[9], [1, 2, 3, 4, 5, 6, 7, 8]],
      [[1, 2, 3, 4, 5, 6, 7, 8], [9]],
      [[4], [1, 2, 3, 5, 6]],
      [[1, 5, 9], [2, 3, 4, 6, 7, 8]],
    ];

    for (const [a, b] of cases) {
      it(`naive: [${a}] × [${b}]`, () => {
        check(a, b);
      });
    }
  });
});
