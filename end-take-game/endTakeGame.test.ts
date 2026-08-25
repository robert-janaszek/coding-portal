import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { endTakeGame } from "./endTakeGame";

/** Optimal first-player score — only for tiny n. */
function naive(piles: number[]): number {
  const best = (i: number, j: number): number => {
    if (i > j) return 0;
    if (i === j) return piles[i]!;
    let sum = 0;
    for (let k = i; k <= j; k++) sum += piles[k]!;
    return sum - Math.min(best(i + 1, j), best(i, j - 1));
  };
  return best(0, piles.length - 1);
}

describe("endTakeGame", () => {
  describe("examples", () => {
    it("example 1", () => {
      assert.equal(endTakeGame([1, 5, 2]), 3);
    });

    it("example 2 — larger visible end is a trap", () => {
      assert.equal(endTakeGame([1, 5, 233, 7]), 234);
    });

    it("example 3 — single pile", () => {
      assert.equal(endTakeGame([5]), 5);
    });
  });

  describe("edges", () => {
    it("empty", () => {
      assert.equal(endTakeGame([]), 0);
    });

    it("two piles — first takes the larger", () => {
      assert.equal(endTakeGame([1, 5]), 5);
      assert.equal(endTakeGame([5, 1]), 5);
      assert.equal(endTakeGame([2, 2]), 2);
    });

    it("zeros", () => {
      assert.equal(endTakeGame([0, 0, 0]), 0);
    });

    it("greedy larger end is not always best", () => {
      assert.equal(endTakeGame([8, 15, 3, 7]), 22);
    });
  });

  describe("naive cross-check", () => {
    const cases: number[][] = [
      [],
      [5],
      [0],
      [1, 5],
      [5, 1],
      [1, 5, 2],
      [1, 5, 233, 7],
      [4, 4, 9, 4],
      [6, 1, 2, 10],
      [7, 1, 8, 2],
      [100, 1, 1, 100],
      [20, 30, 2, 2, 2, 10],
    ];
    for (const piles of cases) {
      it(`naive [${piles}]`, () => {
        assert.equal(endTakeGame(piles), naive(piles));
      });
    }
  });
});
