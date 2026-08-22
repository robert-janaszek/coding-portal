import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { popBetweenNeighbors } from "./popBetweenNeighbors";

/** Try every removal order — only for tiny n. */
function naive(nums: number[]): number {
  const dfs = (arr: number[]): number => {
    if (arr.length === 0) return 0;
    let best = 0;
    for (let i = 0; i < arr.length; i++) {
      const left = i === 0 ? 1 : arr[i - 1]!;
      const right = i === arr.length - 1 ? 1 : arr[i + 1]!;
      const gain = left * arr[i]! * right;
      const next = arr.slice(0, i).concat(arr.slice(i + 1));
      best = Math.max(best, gain + dfs(next));
    }
    return best;
  };
  return dfs(nums);
}

describe("popBetweenNeighbors", () => {
  describe("examples", () => {
    it("example 1", () => {
      assert.equal(popBetweenNeighbors([2, 4, 6]), 66);
    });

    it("example 2 — single value", () => {
      assert.equal(popBetweenNeighbors([4]), 4);
    });

    it("example 3 — two values", () => {
      assert.equal(popBetweenNeighbors([1, 2]), 4);
    });
  });

  describe("edges", () => {
    it("empty", () => {
      assert.equal(popBetweenNeighbors([]), 0);
    });

    it("zeros", () => {
      assert.equal(popBetweenNeighbors([0]), 0);
      assert.equal(popBetweenNeighbors([0, 0]), 0);
    });

    it("removing the middle first is not always best", () => {
      assert.equal(popBetweenNeighbors([2, 4, 6]), 66);
    });
  });

  describe("naive cross-check", () => {
    const cases: number[][] = [
      [],
      [4],
      [0],
      [1, 2],
      [2, 1],
      [2, 4, 6],
      [1, 5, 4],
      [3, 1, 5],
      [0, 2, 0],
      [7, 1, 8, 2],
    ];
    for (const nums of cases) {
      it(`naive [${nums}]`, () => {
        assert.equal(popBetweenNeighbors(nums), naive(nums));
      });
    }
  });
});
