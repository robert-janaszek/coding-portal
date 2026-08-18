import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { champagneTower } from "./champagneTower";

function oracle(poured: number, queryRow: number, queryGlass: number): number {
  let curr = [poured];
  for (let r = 0; r < queryRow; r++) {
    const next = new Array(r + 2).fill(0);
    for (let j = 0; j <= r; j++) {
      const overflow = Math.max(0, curr[j] - 1) / 2;
      next[j] += overflow;
      next[j + 1] += overflow;
    }
    curr = next;
  }
  return Math.min(1, curr[queryGlass]);
}

function close(actual: number, expected: number) {
  assert.ok(
    Math.abs(actual - expected) < 1e-6,
    `expected ~${expected}, got ${actual}`,
  );
}

describe("champagneTower", () => {
  it("example: 1 cup, query row 1 is empty", () => {
    close(champagneTower(1, 1, 0), 0);
  });

  it("example: 2 cups, row 1 is half full", () => {
    close(champagneTower(3, 1, 0), 1);
  });

  it("example: huge pour fills (33, 17)", () => {
    close(champagneTower(8, 2, 1), 1);
  });

  it("poured = 0 is always empty", () => {
    close(champagneTower(0, 0, 0), 0);
    close(champagneTower(0, 5, 2), 0);
  });

  it("top glass saturates at 1", () => {
    close(champagneTower(1, 0, 0), 1);
    close(champagneTower(50, 0, 0), 1);
  });

  it("3 cups fill row 1 and leave row 2 empty", () => {
    close(champagneTower(3, 1, 0), 1);
    close(champagneTower(3, 1, 1), 1);
    close(champagneTower(3, 2, 0), 0);
    close(champagneTower(3, 2, 1), 0);
    close(champagneTower(3, 2, 2), 0);
  });

  describe("oracle cross-check (small pyramids)", () => {
    const cases: [number, number, number][] = [
      [4, 2, 0],
      [4, 2, 1],
      [4, 2, 2],
      [5, 2, 1],
      [10, 3, 0],
      [10, 3, 1],
      [10, 3, 2],
      [10, 3, 3],
      [25, 6, 3],
    ];
    for (const [poured, row, glass] of cases) {
      it(`poured=${poured} (${row},${glass})`, () => {
        close(champagneTower(poured, row, glass), oracle(poured, row, glass));
      });
    }
  });
});
