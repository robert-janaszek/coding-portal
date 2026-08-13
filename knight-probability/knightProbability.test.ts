import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { knightProbability } from "./knightProbability";

const DELTAS: [number, number][] = [
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
];

function naive(n: number, k: number, row: number, column: number): number {
  function dfs(r: number, c: number, left: number): number {
    if (r < 0 || r >= n || c < 0 || c >= n) return 0;
    if (left === 0) return 1;
    let p = 0;
    for (const [dr, dc] of DELTAS) p += dfs(r + dr, c + dc, left - 1);
    return p / 8;
  }
  return dfs(row, column, k);
}

function close(actual: number, expected: number) {
  assert.ok(
    Math.abs(actual - expected) < 1e-6,
    `expected ~${expected}, got ${actual}`,
  );
}

describe("knightProbability", () => {
  it("example: 3x3, 2 moves from corner", () => {
    close(knightProbability(3, 2, 0, 0), 0.0625);
  });

  it("k = 0 is always 1", () => {
    close(knightProbability(1, 0, 0, 0), 1);
    close(knightProbability(8, 0, 3, 4), 1);
  });

  it("1x1, one move leaves the board", () => {
    close(knightProbability(1, 1, 0, 0), 0);
  });

  it("2x2, one move always leaves", () => {
    close(knightProbability(2, 1, 0, 0), 0);
  });

  describe("naive cross-check (small k)", () => {
    const cases: [number, number, number, number][] = [
      [3, 1, 0, 0],
      [3, 2, 1, 1],
      [4, 2, 0, 0],
      [5, 2, 2, 2],
    ];
    for (const [n, k, r, c] of cases) {
      it(`n=${n} k=${k} (${r},${c})`, () => {
        close(knightProbability(n, k, r, c), naive(n, k, r, c));
      });
    }
  });
});
