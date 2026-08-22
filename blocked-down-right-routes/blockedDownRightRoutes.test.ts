import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { blockedDownRightRoutes } from "./blockedDownRightRoutes";

/** Recurse from the origin — only for tiny grids. */
function naive(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  if (rows === 0 || cols === 0) return 0;
  const dfs = (r: number, c: number): number => {
    if (r >= rows || c >= cols || grid[r]![c] === 1) return 0;
    if (r === rows - 1 && c === cols - 1) return 1;
    return dfs(r + 1, c) + dfs(r, c + 1);
  };
  return dfs(0, 0);
}

describe("blockedDownRightRoutes", () => {
  describe("examples", () => {
    it("example 1", () => {
      assert.equal(
        blockedDownRightRoutes([
          [0, 0, 1],
          [0, 0, 0],
          [1, 0, 0],
        ]),
        4,
      );
    });

    it("example 2 — one wall on the first row", () => {
      assert.equal(
        blockedDownRightRoutes([
          [0, 1],
          [0, 0],
        ]),
        1,
      );
    });

    it("example 3 — start blocked", () => {
      assert.equal(blockedDownRightRoutes([[1]]), 0);
    });
  });

  describe("open grids match empty-corridor counts", () => {
    it("single open cell", () => {
      assert.equal(blockedDownRightRoutes([[0]]), 1);
    });

    it("one open row", () => {
      assert.equal(blockedDownRightRoutes([[0, 0, 0, 0]]), 1);
    });

    it("one open column", () => {
      assert.equal(blockedDownRightRoutes([[0], [0], [0]]), 1);
    });

    it("2x3 fully open", () => {
      assert.equal(
        blockedDownRightRoutes([
          [0, 0, 0],
          [0, 0, 0],
        ]),
        3,
      );
    });
  });

  describe("walls", () => {
    it("finish blocked", () => {
      assert.equal(
        blockedDownRightRoutes([
          [0, 0],
          [0, 1],
        ]),
        0,
      );
    });

    it("wall splits the first row", () => {
      assert.equal(blockedDownRightRoutes([[0, 1, 0]]), 0);
    });

    it("wall splits the first column", () => {
      assert.equal(blockedDownRightRoutes([[0], [1], [0]]), 0);
    });

    it("all blocked except a useless open cell", () => {
      assert.equal(
        blockedDownRightRoutes([
          [1, 0],
          [0, 0],
        ]),
        0,
      );
    });
  });

  describe("naive cross-check", () => {
    const cases: number[][][] = [
      [[0]],
      [[1]],
      [
        [0, 0],
        [0, 0],
      ],
      [
        [0, 1],
        [0, 0],
      ],
      [
        [0, 0, 1],
        [0, 0, 0],
        [1, 0, 0],
      ],
      [
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ],
    ];
    for (const grid of cases) {
      it(`naive ${grid.length}x${grid[0]!.length}`, () => {
        assert.equal(blockedDownRightRoutes(grid), naive(grid));
      });
    }
  });
});
