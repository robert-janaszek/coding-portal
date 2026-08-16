import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { subsets } from "./subsets";

function canon(sets: number[][]): string {
  return sets
    .map((s) => [...s].sort((a, b) => a - b).join(","))
    .sort()
    .join("|");
}

function assertSameSets(actual: number[][], expected: number[][]) {
  assert.equal(canon(actual), canon(expected));
}

describe("subsets", () => {
  it("example 1", () => {
    assertSameSets(subsets([1, 2, 3]), [
      [],
      [1],
      [2],
      [3],
      [1, 2],
      [1, 3],
      [2, 3],
      [1, 2, 3],
    ]);
  });

  it("example 2", () => {
    assertSameSets(subsets([0]), [[], [0]]);
  });

  it("empty input is the empty subset", () => {
    assertSameSets(subsets([]), [[]]);
  });

  it("two elements", () => {
    assertSameSets(subsets([1, 2]), [[], [1], [2], [1, 2]]);
  });

  it("count is 2^n", () => {
    assert.equal(subsets([4, 5, 6, 7]).length, 16);
  });
});
