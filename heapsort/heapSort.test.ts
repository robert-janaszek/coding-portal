import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { heapSort } from "./heapSort";

function sortedCopy(nums: number[]): number[] {
  return [...nums].sort((a, b) => a - b);
}

function check(input: number[]) {
  const expected = sortedCopy(input);
  const original = [...input];
  const result = heapSort(input);

  assert.deepEqual(result, expected);
  // allow either in-place mutation returning same ref, or a new array
  assert.deepEqual(
    result === input ? input : sortedCopy(original),
    expected,
  );
  if (result === input) {
    assert.deepEqual(input, expected);
  }
}

describe("heapSort", () => {
  describe("examples", () => {
    it("example 1", () => {
      check([4, 10, 3, 5, 1]);
    });

    it("single element", () => {
      check([1]);
    });

    it("empty", () => {
      check([]);
    });
  });

  describe("already ordered", () => {
    it("sorted ascending", () => {
      check([1, 2, 3, 4, 5]);
    });

    it("sorted descending", () => {
      check([5, 4, 3, 2, 1]);
    });

    it("all equal", () => {
      check([7, 7, 7, 7]);
    });
  });

  describe("small permutations", () => {
    it("two elements ascending", () => {
      check([1, 2]);
    });

    it("two elements descending", () => {
      check([2, 1]);
    });

    it("three elements", () => {
      check([3, 1, 2]);
      check([2, 3, 1]);
      check([1, 3, 2]);
    });
  });

  describe("duplicates", () => {
    it("many duplicates", () => {
      check([2, 1, 2, 1, 2, 1]);
    });

    it("duplicates with outliers", () => {
      check([5, 1, 5, 1, 5, 0, 5]);
    });
  });

  describe("negatives", () => {
    it("all negative", () => {
      check([-1, -5, -3, -2, -4]);
    });

    it("mixed signs", () => {
      check([-2, 0, 3, -1, 5, -4]);
    });

    it("zeros and negatives", () => {
      check([0, 0, -1, 0, -1]);
    });
  });

  describe("larger inputs", () => {
    it("20 shuffled ints", () => {
      check([15, 3, 8, 1, 20, 7, 12, 4, 19, 2, 11, 6, 18, 9, 14, 5, 17, 10, 16, 13]);
    });

    it("array with one max at front", () => {
      check([100, 1, 2, 3, 4, 5]);
    });

    it("array with one min at end", () => {
      check([2, 3, 4, 5, 6, 1]);
    });

    // After extract-min, last leaf moves to root and sifts down. If the
    // node is already smaller than both children, sift must stop — otherwise
    // it keeps swapping and the heap order breaks.
    it("sift-down stops when parent is already smaller than both children", () => {
      check([1, 2, 3, 8, 9, 4, 5]);
    });

    it("already sorted 1..15", () => {
      check(Array.from({ length: 15 }, (_, i) => i + 1));
    });
  });

  describe("does not rely on built-in sort of the input path", () => {
    it("returns ascending order for random-ish sample", () => {
      const input = [42, -7, 13, 0, 13, -7, 42, 1, 99, -100];
      const result = heapSort([...input]);
      for (let i = 1; i < result.length; i++) {
        assert.ok(result[i]! >= result[i - 1]!);
      }
      assert.deepEqual(result, sortedCopy(input));
    });
  });

  describe("naive cross-check batch", () => {
    const cases: number[][] = [
      [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      [0, 1, 0, 1, 0, 1],
      [-10, 10, -5, 5, 0],
      [1, 1, 1, 2, 2, 3],
      [1000, -1000, 500, -500, 0],
      [3],
      [2, 2],
      [8, 1, 5, 2, 9, 3, 7, 4, 6],
      Array.from({ length: 50 }, (_, i) => 50 - i),
      Array.from({ length: 50 }, () => 3),
    ];

    for (const [index, input] of cases.entries()) {
      it(`batch #${index}: length ${input.length}`, () => {
        check(input);
      });
    }
  });
});
