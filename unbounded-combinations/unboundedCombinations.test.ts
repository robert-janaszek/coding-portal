import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { unboundedCombinations } from "./unboundedCombinations";

function canon(sets: number[][]): string {
  return sets
    .map((s) => [...s].sort((a, b) => a - b).join(","))
    .sort()
    .join("|");
}

function assertSameCombos(actual: number[][], expected: number[][]) {
  assert.equal(canon(actual), canon(expected));
}

describe("unboundedCombinations", () => {
  it("example 1", () => {
    assertSameCombos(unboundedCombinations([3, 5, 8], 8), [
      [3, 5],
      [8],
    ]);
  });

  it("example 2", () => {
    assertSameCombos(unboundedCombinations([4, 5, 6], 10), [
      [4, 6],
      [5, 5],
    ]);
  });

  it("example 3 — no combination", () => {
    assertSameCombos(unboundedCombinations([4], 3), []);
  });

  it("exact single candidate", () => {
    assertSameCombos(unboundedCombinations([7], 7), [[7]]);
  });

  it("repeated self", () => {
    assertSameCombos(unboundedCombinations([3], 9), [[3, 3, 3]]);
  });
});
