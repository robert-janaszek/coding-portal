import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { heldWater } from "./heldWater";

/** O(n^2) reference for small cases. */
function naive(heights: number[]): number {
  let total = 0;
  const n = heights.length;
  for (let i = 0; i < n; i++) {
    let leftMax = 0;
    for (let j = 0; j < i; j++) leftMax = Math.max(leftMax, heights[j]!);
    let rightMax = 0;
    for (let j = i + 1; j < n; j++) rightMax = Math.max(rightMax, heights[j]!);
    total += Math.max(0, Math.min(leftMax, rightMax) - heights[i]!);
  }
  return total;
}

describe("heldWater", () => {
  describe("examples", () => {
    it("classic skyline", () => {
      assert.equal(heldWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]), 6);
    });

    it("uneven outer walls", () => {
      assert.equal(heldWater([4, 2, 0, 3, 2, 5]), 9);
    });

    it("strictly ascending", () => {
      assert.equal(heldWater([1, 2, 3]), 0);
    });

    it("single bar", () => {
      assert.equal(heldWater([5]), 0);
    });
  });

  describe("no water", () => {
    it("two bars", () => {
      assert.equal(heldWater([1, 2]), 0);
    });

    it("strictly descending", () => {
      assert.equal(heldWater([5, 4, 3, 2, 1]), 0);
    });

    it("flat", () => {
      assert.equal(heldWater([2, 2, 2, 2]), 0);
    });

    it("all zeros", () => {
      assert.equal(heldWater([0, 0, 0]), 0);
    });
  });

  describe("simple basins", () => {
    it("gap between equal walls", () => {
      assert.equal(heldWater([5, 0, 5]), 5);
    });

    it("partial fill under equal walls", () => {
      assert.equal(heldWater([5, 1, 5]), 4);
    });

    it("two empty cells", () => {
      assert.equal(heldWater([3, 0, 0, 3]), 6);
    });

    it("valley of zeros", () => {
      assert.equal(heldWater([2, 0, 2]), 2);
    });

    it("wide empty basin", () => {
      assert.equal(heldWater([5, 0, 0, 0, 5]), 15);
    });

    it("right wall taller", () => {
      assert.equal(heldWater([1, 0, 2]), 1);
    });

    it("left wall taller", () => {
      assert.equal(heldWater([2, 0, 1]), 1);
    });
  });

  describe("several dips", () => {
    it("alternating peaks", () => {
      assert.equal(heldWater([1, 0, 1, 0, 1]), 2);
    });

    it("bowl", () => {
      assert.equal(heldWater([2, 1, 0, 1, 2]), 4);
    });

    it("inner bump does not drain", () => {
      assert.equal(heldWater([3, 1, 2, 1, 4]), 5);
    });

    it("plateau walls", () => {
      assert.equal(heldWater([4, 4, 1, 4, 4]), 3);
    });

    it("water only on the descent", () => {
      assert.equal(heldWater([5, 4, 1, 2]), 1);
    });

    it("multiple local peaks", () => {
      assert.equal(heldWater([6, 2, 5, 4, 5, 1, 6]), 13);
    });

    it("decreasing local peaks keep earlier basins", () => {
      assert.equal(heldWater([6, 1, 5, 1, 4, 1, 3]), 9);
    });
  });

  describe("naive cross-check", () => {
    const cases = [
      [1],
      [0, 0, 0],
      [1, 1, 1, 1, 1],
      [5, 4, 3, 2, 1, 2, 3, 4, 5],
      [2, 1, 2],
      [6, 2, 5, 4, 5, 1, 6],
      [6, 1, 5, 1, 4, 1, 3],
      [1, 3, 2, 1, 2],
      [4, 2, 0, 3, 2, 5],
      [1, 0, 1],
      [9, 0, 9],
      [3, 6, 2, 5, 3],
      [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
      [4, 4, 1, 4, 4],
      [2, 1, 0, 1, 2],
      [5, 4, 1, 2],
      [3, 1, 2, 1, 4],
    ];
    for (const h of cases) {
      it(`[${h.join(", ")}]`, () => {
        assert.equal(heldWater(h), naive(h));
      });
    }
  });
});
