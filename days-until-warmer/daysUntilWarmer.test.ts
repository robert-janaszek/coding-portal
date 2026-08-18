import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { daysUntilWarmer } from "./daysUntilWarmer";

/** O(n²) reference for small cases. */
function naive(temperatures: number[]): number[] {
  const n = temperatures.length;
  const answer = Array.from({ length: n }, () => 0);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (temperatures[j]! > temperatures[i]!) {
        answer[i] = j - i;
        break;
      }
    }
  }
  return answer;
}

describe("daysUntilWarmer", () => {
  it("example 1", () => {
    assert.deepEqual(
      daysUntilWarmer([18, 21, 19, 24, 22]),
      [1, 2, 1, 0, 0],
    );
  });

  it("example 2", () => {
    assert.deepEqual(daysUntilWarmer([5, 6, 7]), [1, 1, 0]);
  });

  it("example 3", () => {
    assert.deepEqual(daysUntilWarmer([9, 4, 4]), [0, 0, 0]);
  });

  it("single day", () => {
    assert.deepEqual(daysUntilWarmer([55]), [0]);
  });

  it("strictly decreasing", () => {
    assert.deepEqual(daysUntilWarmer([90, 80, 70, 60]), [0, 0, 0, 0]);
  });

  it("strictly increasing", () => {
    assert.deepEqual(daysUntilWarmer([30, 40, 50, 60]), [1, 1, 1, 0]);
  });

  it("all equal", () => {
    assert.deepEqual(daysUntilWarmer([70, 70, 70, 70]), [0, 0, 0, 0]);
  });

  it("warmer only at the end", () => {
    assert.deepEqual(daysUntilWarmer([50, 40, 30, 80]), [3, 2, 1, 0]);
  });

  it("naive cross-check batch", () => {
    const cases = [
      [73],
      [30, 30],
      [71, 71, 71, 72],
      [89, 62, 70, 58, 47, 47, 46, 76, 100, 70],
      [55, 38, 53, 81, 61, 93, 97, 32, 43, 90],
      [34, 80, 80, 34, 34, 80, 80],
    ];
    for (const t of cases) {
      assert.deepEqual(
        daysUntilWarmer(t),
        naive(t),
        `failed on [${t}]`,
      );
    }
  });
});
