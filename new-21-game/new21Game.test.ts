import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { new21Game } from "./new21Game";

function oracle(n: number, k: number, maxPts: number): number {
  if (k === 0) return 1;
  const dp = new Array(k + maxPts).fill(0);
  for (let x = k; x <= n && x < dp.length; x++) dp[x] = 1;
  for (let x = k - 1; x >= 0; x--) {
    let s = 0;
    for (let i = 1; i <= maxPts; i++) s += dp[x + i];
    dp[x] = s / maxPts;
  }
  return dp[0];
}

function close(actual: number, expected: number) {
  assert.ok(
    Math.abs(actual - expected) < 1e-5,
    `expected ~${expected}, got ${actual}`,
  );
}

describe("new21Game", () => {
  it("example: one draw always <= n", () => {
    close(new21Game(10, 1, 10), 1);
  });

  it("example: one draw, 6 of 10 succeed", () => {
    close(new21Game(6, 1, 10), 0.6);
  });

  it("example: n = 21, k = 17, maxPts = 10", () => {
    close(new21Game(21, 17, 10), 0.732778);
  });

  it("k = 0 never draws", () => {
    close(new21Game(0, 0, 1), 1);
    close(new21Game(10, 0, 10), 1);
  });

  it("cannot overshoot when n covers the whole window", () => {
    close(new21Game(10, 1, 10), 1);
    close(new21Game(20, 10, 5), 1);
  });

  describe("oracle cross-check (small)", () => {
    const cases: [number, number, number][] = [
      [1, 1, 1],
      [3, 1, 3],
      [3, 2, 2],
      [10, 5, 3],
      [21, 17, 10],
      [0, 0, 5],
      [15, 15, 1],
      [15, 15, 10],
    ];
    for (const [n, k, maxPts] of cases) {
      it(`n=${n} k=${k} maxPts=${maxPts}`, () => {
        close(new21Game(n, k, maxPts), oracle(n, k, maxPts));
      });
    }
  });
});
