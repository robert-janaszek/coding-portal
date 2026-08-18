import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { combine } from "./combine";

describe("combine", () => {
  it("example 1", () => {
    assert.deepEqual(combine(3, 2), [
      [1, 2],
      [1, 3],
      [2, 3],
    ]);
  });

  it("example 2", () => {
    assert.deepEqual(combine(1, 1), [[1]]);
  });

  it("k=0 returns [[]]", () => {
    assert.deepEqual(combine(4, 0), [[]]);
  });

  it("k=n returns single combination", () => {
    assert.deepEqual(combine(4, 4), [[1, 2, 3, 4]]);
  });
});

