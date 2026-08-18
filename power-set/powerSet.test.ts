import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { powerSet } from "./powerSet";

function canon(sets: number[][]): string {
  return sets
    .map((s) => [...s].sort((a, b) => a - b).join(","))
    .sort()
    .join("|");
}

function assertSameSets(actual: number[][], expected: number[][]) {
  assert.equal(canon(actual), canon(expected));
}

describe("powerSet", () => {
  it("example 1", () => {
    assertSameSets(powerSet([4, 8]), [
      [],
      [4],
      [8],
      [4, 8],
    ]);
  });

  it("example 2", () => {
    assertSameSets(powerSet([0]), [[], [0]]);
  });

  it("empty input is the empty subset", () => {
    assertSameSets(powerSet([]), [[]]);
  });

  it("two elements", () => {
    assertSameSets(powerSet([1, 2]), [[], [1], [2], [1, 2]]);
  });

  it("count is 2^n", () => {
    assert.equal(powerSet([4, 5, 6, 7]).length, 16);
  });
});
