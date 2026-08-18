import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { combineOverlappingRanges } from "./combineOverlappingRanges";

describe("combineOverlappingRanges", () => {
  it("example 1", () => {
    assert.deepEqual(
      combineOverlappingRanges([
        [2, 5],
        [1, 3],
        [9, 12],
        [8, 10],
      ]),
      [
        [1, 5],
        [8, 12],
      ],
    );
  });

  it("example 2", () => {
    assert.deepEqual(combineOverlappingRanges([[4, 7], [0, 4]]), [[0, 7]]);
  });

  it("touching endpoints merge", () => {
    assert.deepEqual(combineOverlappingRanges([[3, 6], [6, 9]]), [[3, 9]]);
  });

  it("unsorted input", () => {
    assert.deepEqual(
      combineOverlappingRanges([
        [6, 8],
        [1, 3],
        [2, 4],
        [10, 12],
        [9, 10],
      ]),
      [
        [1, 4],
        [6, 8],
        [9, 12],
      ],
    );
  });

  it("nested intervals", () => {
    assert.deepEqual(
      combineOverlappingRanges([
        [1, 10],
        [2, 3],
        [4, 8],
        [9, 10],
      ]),
      [[1, 10]],
    );
  });

  it("empty input", () => {
    assert.deepEqual(combineOverlappingRanges([]), []);
  });
});

