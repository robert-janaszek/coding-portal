import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { downRightRoutes } from "./downRightRoutes";

/** Recurse from the origin — only for tiny grids. */
function naive(rows: number, cols: number): number {
  const dfs = (r: number, c: number): number => {
    if (r === rows - 1 && c === cols - 1) return 1;
    if (r >= rows || c >= cols) return 0;
    return dfs(r + 1, c) + dfs(r, c + 1);
  };
  return dfs(0, 0);
}

describe("downRightRoutes", () => {
  it("example 1", () => {
    assert.equal(downRightRoutes(2, 3), 3);
  });

  it("example 2 — single cell", () => {
    assert.equal(downRightRoutes(1, 1), 1);
  });

  it("example 3", () => {
    assert.equal(downRightRoutes(3, 4), 10);
  });

  it("one row is a single corridor", () => {
    assert.equal(downRightRoutes(1, 8), 1);
  });

  it("one column is a single corridor", () => {
    assert.equal(downRightRoutes(8, 1), 1);
  });

  it("square 4x4", () => {
    assert.equal(downRightRoutes(4, 4), 20);
  });

  describe("naive cross-check", () => {
    const cases: [number, number][] = [
      [1, 1],
      [2, 2],
      [2, 3],
      [3, 2],
      [3, 3],
      [3, 4],
    ];
    for (const [rows, cols] of cases) {
      it(`${rows}x${cols}`, () => {
        assert.equal(downRightRoutes(rows, cols), naive(rows, cols));
      });
    }
  });

  it("larger square still 32-bit", () => {
    assert.equal(downRightRoutes(10, 10), 48620);
  });
});
