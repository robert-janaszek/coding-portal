import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { searchSortedMatrix } from "./searchSortedMatrix";

const example = [
  [1, 6, 10, 14],
  [2, 7, 11, 16],
  [4, 9, 12, 18],
  [8, 13, 17, 20],
];

describe("searchSortedMatrix", () => {
  describe("examples", () => {
    it("finds a value in the middle", () => {
      assert.equal(searchSortedMatrix(example, 9), true);
    });

    it("missing value", () => {
      assert.equal(searchSortedMatrix(example, 15), false);
    });
  });

  describe("corners and edges", () => {
    it("top-left", () => {
      assert.equal(searchSortedMatrix(example, 1), true);
    });

    it("top-right", () => {
      assert.equal(searchSortedMatrix(example, 14), true);
    });

    it("bottom-left", () => {
      assert.equal(searchSortedMatrix(example, 8), true);
    });

    it("bottom-right", () => {
      assert.equal(searchSortedMatrix(example, 20), true);
    });

    it("smaller than every entry", () => {
      assert.equal(searchSortedMatrix(example, 0), false);
    });

    it("larger than every entry", () => {
      assert.equal(searchSortedMatrix(example, 21), false);
    });
  });

  describe("shapes", () => {
    it("empty matrix", () => {
      assert.equal(searchSortedMatrix([], 1), false);
    });

    it("empty row", () => {
      assert.equal(searchSortedMatrix([[]], 1), false);
    });

    it("1x1 hit", () => {
      assert.equal(searchSortedMatrix([[7]], 7), true);
    });

    it("1x1 miss", () => {
      assert.equal(searchSortedMatrix([[7]], 1), false);
    });

    it("single row", () => {
      assert.equal(searchSortedMatrix([[1, 3, 5, 7]], 5), true);
      assert.equal(searchSortedMatrix([[1, 3, 5, 7]], 4), false);
    });

    it("single column", () => {
      assert.equal(searchSortedMatrix([[1], [3], [5], [7]], 5), true);
      assert.equal(searchSortedMatrix([[1], [3], [5], [7]], 4), false);
    });
  });

  describe("duplicates", () => {
    it("repeated value still found", () => {
      const matrix = [
        [1, 2, 2],
        [2, 3, 4],
        [3, 4, 5],
      ];
      assert.equal(searchSortedMatrix(matrix, 2), true);
    });
  });
});
