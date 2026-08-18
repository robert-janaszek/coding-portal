import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { sortedMatrixSearch } from "./sortedMatrixSearch";

const example = [
  [1, 6, 10, 14],
  [2, 7, 11, 16],
  [4, 9, 12, 18],
  [8, 13, 17, 20],
];

describe("sortedMatrixSearch", () => {
  describe("examples", () => {
    it("finds a value in the middle", () => {
      assert.equal(sortedMatrixSearch(example, 9), true);
    });

    it("missing value", () => {
      assert.equal(sortedMatrixSearch(example, 15), false);
    });
  });

  describe("corners and edges", () => {
    it("top-left", () => {
      assert.equal(sortedMatrixSearch(example, 1), true);
    });

    it("top-right", () => {
      assert.equal(sortedMatrixSearch(example, 14), true);
    });

    it("bottom-left", () => {
      assert.equal(sortedMatrixSearch(example, 8), true);
    });

    it("bottom-right", () => {
      assert.equal(sortedMatrixSearch(example, 20), true);
    });

    it("smaller than every entry", () => {
      assert.equal(sortedMatrixSearch(example, 0), false);
    });

    it("larger than every entry", () => {
      assert.equal(sortedMatrixSearch(example, 21), false);
    });
  });

  describe("shapes", () => {
    it("empty matrix", () => {
      assert.equal(sortedMatrixSearch([], 1), false);
    });

    it("empty row", () => {
      assert.equal(sortedMatrixSearch([[]], 1), false);
    });

    it("1x1 hit", () => {
      assert.equal(sortedMatrixSearch([[7]], 7), true);
    });

    it("1x1 miss", () => {
      assert.equal(sortedMatrixSearch([[7]], 1), false);
    });

    it("single row", () => {
      assert.equal(sortedMatrixSearch([[1, 3, 5, 7]], 5), true);
      assert.equal(sortedMatrixSearch([[1, 3, 5, 7]], 4), false);
    });

    it("single column", () => {
      assert.equal(sortedMatrixSearch([[1], [3], [5], [7]], 5), true);
      assert.equal(sortedMatrixSearch([[1], [3], [5], [7]], 4), false);
    });
  });

  describe("duplicates", () => {
    it("repeated value still found", () => {
      const matrix = [
        [1, 2, 2],
        [2, 3, 4],
        [3, 4, 5],
      ];
      assert.equal(sortedMatrixSearch(matrix, 2), true);
    });
  });
});
