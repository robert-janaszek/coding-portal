import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { permute } from "./permute";

function canon(perms: number[][]): string {
  return perms
    .map((p) => p.join(","))
    .sort()
    .join("|");
}

function assertSamePerms(actual: number[][], expected: number[][]) {
  assert.equal(canon(actual), canon(expected));
}

describe("permute", () => {
  it("example 1", () => {
    assertSamePerms(permute([4, 8]), [
      [4, 8],
      [8, 4],
    ]);
  });

  it("three elements", () => {
    assertSamePerms(permute([1, 2, 3]), [
      [1, 2, 3],
      [1, 3, 2],
      [2, 1, 3],
      [2, 3, 1],
      [3, 1, 2],
      [3, 2, 1],
    ]);
  });

  it("example 2", () => {
    assertSamePerms(permute([9]), [[9]]);
  });

  it("example 3", () => {
    assertSamePerms(permute([1]), [[1]]);
  });

  it("count is n!", () => {
    assert.equal(permute([1, 2, 3, 4]).length, 24);
  });
});
