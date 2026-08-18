import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { stairClimbingWays } from "./stairClimbingWays";

/** Naive recursion — only for small n expected values. */
function naive(n: number): number {
  if (n <= 2) return n;
  return naive(n - 1) + naive(n - 2);
}

describe("stairClimbingWays", () => {
  describe("examples", () => {
    it("n = 4", () => {
      assert.equal(stairClimbingWays(4), 5);
    });

    it("n = 1", () => {
      assert.equal(stairClimbingWays(1), 1);
    });
  });

  describe("small n", () => {
    it("n = 1", () => {
      assert.equal(stairClimbingWays(1), 1);
    });

    it("n = 4", () => {
      assert.equal(stairClimbingWays(4), 5);
    });

    it("n = 5", () => {
      assert.equal(stairClimbingWays(5), 8);
    });
  });

  describe("naive cross-check", () => {
    for (let n = 1; n <= 15; n++) {
      it(`n = ${n}`, () => {
        assert.equal(stairClimbingWays(n), naive(n));
      });
    }
  });

  describe("upper constraint", () => {
    it("n = 45 fits in JS number", () => {
      // Fibonacci(45) ways; known value
      assert.equal(stairClimbingWays(45), 1_836_311_903);
    });
  });
});
