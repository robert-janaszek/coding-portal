import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { quickSort } from "./quickSort";

function sortedCopy(nums: number[]): number[] {
  return [...nums].sort((a, b) => a - b);
}

function check(input: number[]) {
  const expected = sortedCopy(input);
  const original = [...input];
  const result = quickSort(input);

  assert.deepEqual(result, expected);
  assert.deepEqual(
    result === input ? input : sortedCopy(original),
    expected,
  );
  if (result === input) {
    assert.deepEqual(input, expected);
  }
}

describe("quickSort", () => {
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
      check([
        15, 3, 8, 1, 20, 7, 12, 4, 19, 2, 11, 6, 18, 9, 14, 5, 17, 10, 16, 13,
      ]);
    });

    it("array with one max at front", () => {
      check([100, 1, 2, 3, 4, 5]);
    });

    it("array with one min at end", () => {
      check([2, 3, 4, 5, 6, 1]);
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
