import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { combinationSumCount } from "./combinationSumCount";

/** Enumerate combinations — only for tiny inputs. */
function naive(candidates: number[], target: number): number {
  let count = 0;
  const dfs = (sum: number, index: number) => {
    if (sum === target) {
      count++;
      return;
    }
    if (sum > target) return;
    for (let i = index; i < candidates.length; i++) {
      dfs(sum + candidates[i]!, i);
    }
  };
  dfs(0, 0);
  return count;
}

describe("combinationSumCount", () => {
  it("example 1", () => {
    assert.equal(combinationSumCount([3, 5, 8], 8), 2);
  });

  it("example 2", () => {
    assert.equal(combinationSumCount([4, 5, 6], 10), 2);
  });

  it("example 3 — no combination", () => {
    assert.equal(combinationSumCount([4], 3), 0);
  });

  it("example 4", () => {
    assert.equal(combinationSumCount([1, 3, 4], 6), 4);
  });

  it("exact single candidate", () => {
    assert.equal(combinationSumCount([7], 7), 1);
  });

  it("repeated self", () => {
    assert.equal(combinationSumCount([3], 9), 1);
  });

  it("impossible odd target", () => {
    assert.equal(combinationSumCount([2], 3), 0);
  });

  it("empty combination for target 0", () => {
    assert.equal(combinationSumCount([2, 4, 6], 0), 1);
  });

  describe("naive cross-check", () => {
    const cases: [number[], number][] = [
      [[2, 3, 6, 7], 7],
      [[2, 3, 5], 8],
      [[1, 2, 5], 5],
      [[3], 9],
      [[2, 4], 6],
    ];
    for (const [candidates, target] of cases) {
      it(`${JSON.stringify(candidates)} target=${target}`, () => {
        assert.equal(combinationSumCount(candidates, target), naive(candidates, target));
      });
    }
  });

  it("larger target", () => {
    assert.equal(combinationSumCount([1, 2, 5], 500), 12701);
  });

  it("mixed candidates, target 100", () => {
    assert.equal(combinationSumCount([3, 5, 7, 8, 9, 10, 11], 100), 6606);
  });
});
