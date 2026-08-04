import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { maximalRectangle } from "./maximalRectangle";

/** Brute-force over all sub-rectangles — only for tiny matrices. */
function naive(matrix: string[][]): number {
  const rows = matrix.length;
  if (rows === 0) return 0;
  const cols = matrix[0]!.length;
  let best = 0;

  for (let r1 = 0; r1 < rows; r1++) {
    for (let r2 = r1; r2 < rows; r2++) {
      for (let c1 = 0; c1 < cols; c1++) {
        for (let c2 = c1; c2 < cols; c2++) {
          let allOnes = true;
          for (let r = r1; r <= r2 && allOnes; r++) {
            for (let c = c1; c <= c2; c++) {
              if (matrix[r]![c] !== "1") {
                allOnes = false;
                break;
              }
            }
          }
          if (allOnes) {
            best = Math.max(best, (r2 - r1 + 1) * (c2 - c1 + 1));
          }
        }
      }
    }
  }

  return best;
}

describe("maximalRectangle", () => {
  it("example 1", () => {
    assert.equal(
      maximalRectangle([
        ["1", "0", "1", "0", "0"],
        ["1", "0", "1", "1", "1"],
        ["1", "1", "1", "1", "1"],
        ["1", "0", "0", "1", "0"],
      ]),
      6,
    );
  });

  it("example 2 — single zero", () => {
    assert.equal(maximalRectangle([["0"]]), 0);
  });

  it("example 3 — single one", () => {
    assert.equal(maximalRectangle([["1"]]), 1);
  });

  it("all zeros", () => {
    assert.equal(
      maximalRectangle([
        ["0", "0"],
        ["0", "0"],
      ]),
      0,
    );
  });

  it("all ones", () => {
    assert.equal(
      maximalRectangle([
        ["1", "1", "1"],
        ["1", "1", "1"],
      ]),
      6,
    );
  });

  it("single column", () => {
    assert.equal(
      maximalRectangle([["1"], ["1"], ["0"], ["1"], ["1"], ["1"]]),
      3,
    );
  });

  it("single row", () => {
    assert.equal(maximalRectangle([["1", "1", "0", "1", "1", "1"]]), 3);
  });

  it("full width strip", () => {
    assert.equal(
      maximalRectangle([
        ["0", "0", "0"],
        ["1", "1", "1"],
        ["1", "1", "1"],
        ["0", "0", "0"],
      ]),
      6,
    );
  });

  it("naive cross-check batch", () => {
    const cases: string[][][] = [
      [["1"]],
      [["0"]],
      [
        ["1", "0"],
        ["0", "1"],
      ],
      [
        ["1", "1"],
        ["1", "0"],
      ],
      [
        ["1", "0", "1"],
        ["1", "1", "1"],
        ["0", "1", "1"],
      ],
      [
        ["1", "1", "0", "1"],
        ["1", "1", "0", "1"],
        ["1", "1", "1", "1"],
      ],
    ];
    for (const m of cases) {
      assert.equal(
        maximalRectangle(m),
        naive(m),
        `failed on ${JSON.stringify(m)}`,
      );
    }
  });
});
