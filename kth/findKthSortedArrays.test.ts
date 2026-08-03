import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { findKthSortedArrays } from "./findKthSortedArrays";

/** Reference via merge+sort — for expected values only. */
function naiveKth(nums1: number[], nums2: number[], k: number): number {
  const merged = [...nums1, ...nums2].sort((a, b) => a - b);
  return merged[k - 1]!;
}

function check(nums1: number[], nums2: number[], k: number, expected?: number) {
  const want = expected ?? naiveKth(nums1, nums2, k);
  assert.equal(findKthSortedArrays(nums1, nums2, k), want);
}

describe("findKthSortedArrays (bisection)", () => {
  describe("examples", () => {
    it("example 1", () => {
      check([1, 3, 5], [2, 4, 6], 4, 4);
    });

    it("example 2: k = 1", () => {
      check([1, 2], [3, 4], 1, 1);
    });

    it("example 3: k = last", () => {
      check([1, 2], [3, 4], 4, 4);
    });

    it("argument order does not matter", () => {
      assert.equal(findKthSortedArrays([9], [1, 2, 3, 4, 5, 6, 7, 8], 5), 5);
      assert.equal(findKthSortedArrays([1, 2, 3, 4, 5, 6, 7, 8], [9], 5), 5);
    });
  });

  describe("empty / single-sided", () => {
    it("nums1 empty", () => {
      check([], [10, 20, 30], 2, 20);
    });

    it("nums2 empty", () => {
      check([10, 20, 30], [], 3, 30);
    });

    it("one empty, k = 1", () => {
      check([], [7], 1, 7);
    });

    it("one empty, k = last", () => {
      check([1, 2, 3, 4, 5], [], 5, 5);
    });
  });

  describe("single elements", () => {
    it("two singles, k = 1", () => {
      check([1], [2], 1, 1);
    });

    it("two singles, k = 2", () => {
      check([1], [2], 2, 2);
    });

    it("equal singles", () => {
      check([5], [5], 1, 5);
      check([5], [5], 2, 5);
    });
  });

  describe("disjoint ranges", () => {
    it("all nums1 smaller, middle k", () => {
      check([1, 2, 3, 4, 5], [6, 7, 8, 9, 10], 5, 5);
    });

    it("all nums1 smaller, first of nums2", () => {
      check([1, 2, 3, 4, 5], [6, 7, 8, 9, 10], 6, 6);
    });

    it("all nums2 smaller", () => {
      check([6, 7, 8], [1, 2, 3, 4, 5], 4, 4);
    });
  });

  describe("duplicates", () => {
    it("flat plateau", () => {
      check([1, 1, 1], [1, 1, 1], 3, 1);
    });

    it("duplicates around k", () => {
      check([1, 2, 2], [2, 2, 3], 3, 2);
      check([1, 2, 2], [2, 2, 3], 4, 2);
    });
  });

  describe("negatives", () => {
    it("all negative", () => {
      check([-5, -3, -1], [-4, -2], 3, -3);
    });

    it("mixed signs", () => {
      check([-2, -1, 0], [1, 2, 3], 3, 0);
      check([-2, -1, 0], [1, 2, 3], 4, 1);
    });
  });

  describe("uneven lengths", () => {
    it("short + long", () => {
      check([1], [2, 3, 4, 5, 6], 3, 3);
    });

    it("one vs many, k near start", () => {
      check([100], [1, 2, 3, 4, 5, 6, 7], 1, 1);
    });

    it("one vs many, k = the singleton rank", () => {
      check([100], [1, 2, 3, 4, 5, 6, 7], 8, 100);
    });
  });

  describe("every k for a fixed pair", () => {
    const a = [1, 3, 8, 9, 15];
    const b = [7, 11, 18, 19, 21, 25];
    const total = a.length + b.length;

    for (let k = 1; k <= total; k++) {
      it(`k = ${k}`, () => {
        check(a, b, k);
      });
    }
  });

  describe("relation to median positions", () => {
    it("odd total → middle k", () => {
      // merged length 5, median at k=3
      check([1, 2, 3], [4, 5], 3, 3);
    });

    it("even total → two central ks", () => {
      // merged [1,2,3,4], centers k=2 and k=3
      check([1, 2], [3, 4], 2, 2);
      check([1, 2], [3, 4], 3, 3);
    });
  });

  describe("naive cross-check batch", () => {
    const cases: [number[], number[], number][] = [
      [[2, 3, 5, 8], [10, 12, 14, 16, 18, 20], 5],
      [[1, 1, 3, 3], [1, 1, 3, 3], 5],
      [[9], [1, 2, 3, 4, 5, 6, 7, 8], 5],
      [[1, 2, 3, 4, 5, 6, 7, 8], [9], 9],
      [[4], [1, 2, 3, 5, 6], 4],
      [[1, 5, 9], [2, 3, 4, 6, 7, 8], 6],
      [[0, 10, 10, 10, 10], [1, 2, 33], 4],
      [[-1_000_000], [1_000_000], 1],
      [[-1_000_000], [1_000_000], 2],
    ];

    for (const [a, b, k] of cases) {
      it(`naive: k=${k} [${a}] × [${b}]`, () => {
        check(a, b, k);
      });
    }
  });
});
