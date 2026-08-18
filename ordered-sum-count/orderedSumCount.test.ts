import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { orderedSumCount } from "./orderedSumCount";

/** Count ordered sequences — only for tiny inputs. */
function naive(nums: number[], target: number): number {
  const dfs = (remain: number): number => {
    if (remain === 0) return 1;
    if (remain < 0) return 0;
    let count = 0;
    for (const n of nums) {
      count += dfs(remain - n);
    }
    return count;
  };
  return dfs(target);
}

describe("orderedSumCount", () => {
  it("example 1", () => {
    assert.equal(orderedSumCount([1, 3], 4), 4);
  });

  it("example 2 — impossible", () => {
    assert.equal(orderedSumCount([9], 3), 0);
  });

  it("example 3", () => {
    assert.equal(orderedSumCount([2, 5], 7), 2);
  });

  it("permutations of a multiset all count", () => {
    assert.equal(orderedSumCount([2, 3, 5], 8), 6);
  });

  it("repeated self is one sequence", () => {
    assert.equal(orderedSumCount([3], 9), 1);
  });

  describe("naive cross-check", () => {
    const cases: [number[], number][] = [
      [[1, 3], 4],
      [[9], 3],
      [[2, 5], 7],
      [[2, 3, 5], 8],
      [[1, 2], 5],
    ];
    for (const [nums, target] of cases) {
      it(`${JSON.stringify(nums)} target=${target}`, () => {
        assert.equal(orderedSumCount(nums, target), naive(nums, target));
      });
    }
  });

  it("larger target", () => {
    assert.equal(orderedSumCount([1, 2, 3], 32), 181997601);
  });

  it("mixed step sizes", () => {
    assert.equal(orderedSumCount([4, 2, 1], 32), 39882198);
  });
});
