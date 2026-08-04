import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { mergeIntervals } from "./mergeIntervals";

describe("mergeIntervals", () => {
  it("example 1", () => {
    assert.deepEqual(
      mergeIntervals([
        [1, 3],
        [2, 6],
        [8, 10],
        [15, 18],
      ]),
      [
        [1, 6],
        [8, 10],
        [15, 18],
      ],
    );
  });

  it("example 2", () => {
    assert.deepEqual(mergeIntervals([[1, 4], [0, 4]]), [[0, 4]]);
  });

  it("touching endpoints merge", () => {
    assert.deepEqual(mergeIntervals([[1, 4], [4, 5]]), [[1, 5]]);
  });

  it("unsorted input", () => {
    assert.deepEqual(
      mergeIntervals([
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
      mergeIntervals([
        [1, 10],
        [2, 3],
        [4, 8],
        [9, 10],
      ]),
      [[1, 10]],
    );
  });

  it("empty input", () => {
    assert.deepEqual(mergeIntervals([]), []);
  });
});

