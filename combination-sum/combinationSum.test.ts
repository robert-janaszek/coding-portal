import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { combinationSum } from "./combinationSum";

function canon(sets: number[][]): string {
  return sets
    .map((s) => [...s].sort((a, b) => a - b).join(","))
    .sort()
    .join("|");
}

function assertSameCombos(actual: number[][], expected: number[][]) {
  assert.equal(canon(actual), canon(expected));
}

describe("combinationSum", () => {
  it("example 1", () => {
    assertSameCombos(combinationSum([2, 3, 6, 7], 7), [
      [2, 2, 3],
      [7],
    ]);
  });

  it("example 2", () => {
    assertSameCombos(combinationSum([2, 3, 5], 8), [
      [2, 2, 2, 2],
      [2, 3, 3],
      [3, 5],
    ]);
  });

  it("example 3 — no combination", () => {
    assertSameCombos(combinationSum([2], 1), []);
  });

  it("exact single candidate", () => {
    assertSameCombos(combinationSum([7], 7), [[7]]);
  });

  it("repeated self", () => {
    assertSameCombos(combinationSum([3], 9), [[3, 3, 3]]);
  });
});
