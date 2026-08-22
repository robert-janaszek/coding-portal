import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { risingGridTrail } from "./risingGridTrail";

const DIRS: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/** DFS from every cell — only for tiny grids. Strict rise ⇒ no cycles. */
function naive(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  if (rows === 0 || cols === 0) return 0;

  const dfs = (r: number, c: number): number => {
    let local = 1;
    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
      if (grid[nr]![nc]! > grid[r]![c]!) {
        local = Math.max(local, 1 + dfs(nr, nc));
      }
    }
    return local;
  };

  let best = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      best = Math.max(best, dfs(r, c));
    }
  }
  return best;
}

describe("risingGridTrail", () => {
  describe("examples", () => {
    it("example 1 — snake around the bottom row", () => {
      assert.equal(
        risingGridTrail([
          [1, 2, 3],
          [6, 5, 4],
        ]),
        6,
      );
    });

    it("example 2", () => {
      assert.equal(
        risingGridTrail([
          [10, 1],
          [9, 2],
        ]),
        4,
      );
    });

    it("example 3 — single cell", () => {
      assert.equal(risingGridTrail([[7]]), 1);
    });
  });

  describe("edges", () => {
    it("empty grid", () => {
      assert.equal(risingGridTrail([]), 0);
      assert.equal(risingGridTrail([[]]), 0);
    });

    it("all equal — no legal step", () => {
      assert.equal(
        risingGridTrail([
          [2, 2],
          [2, 2],
        ]),
        1,
      );
    });

    it("strictly falling in every direction from the max", () => {
      assert.equal(
        risingGridTrail([
          [1, 2],
          [4, 3],
        ]),
        4,
      );
    });

    it("one row", () => {
      assert.equal(risingGridTrail([[9, 1, 2, 3]]), 3);
    });

    it("one column", () => {
      assert.equal(risingGridTrail([[5], [1], [4]]), 2);
    });

    it("negatives", () => {
      assert.equal(
        risingGridTrail([
          [-3, -1],
          [-4, 0],
        ]),
        4,
      );
    });
  });

  describe("naive cross-check", () => {
    const cases: number[][][] = [
      [],
      [[]],
      [[7]],
      [
        [1, 2],
        [4, 3],
      ],
      [
        [10, 1],
        [9, 2],
      ],
      [
        [1, 2, 3],
        [6, 5, 4],
      ],
      [
        [2, 2],
        [2, 2],
      ],
      [[9, 1, 2, 3]],
    ];
    for (const grid of cases) {
      const label = grid.length === 0 ? "empty" : `${grid.length}x${grid[0]!.length}`;
      it(`naive ${label}`, () => {
        assert.equal(risingGridTrail(grid), naive(grid));
      });
    }
  });
});
