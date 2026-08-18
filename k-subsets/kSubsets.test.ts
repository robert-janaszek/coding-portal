import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { kSubsets } from "./kSubsets";

describe("kSubsets", () => {
  it("example 1", () => {
    assert.deepEqual(kSubsets(3, 2), [
      [1, 2],
      [1, 3],
      [2, 3],
    ]);
  });

  it("example 2", () => {
    assert.deepEqual(kSubsets(1, 1), [[1]]);
  });

  it("k=0 returns [[]]", () => {
    assert.deepEqual(kSubsets(4, 0), [[]]);
  });

  it("k=n returns single combination", () => {
    assert.deepEqual(kSubsets(4, 4), [[1, 2, 3, 4]]);
  });
});

