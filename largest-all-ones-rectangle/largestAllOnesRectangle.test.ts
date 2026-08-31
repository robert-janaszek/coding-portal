import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { largestAllOnesRectangle } from "./largestAllOnesRectangle";

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

describe("largestAllOnesRectangle", () => {
  it("example 1", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["1", "1", "0"],
        ["1", "1", "1"],
        ["0", "1", "1"],
      ]),
      4,
    );
  });

  it("example 2 — single zero", () => {
    assert.equal(largestAllOnesRectangle([["0"]]), 0);
  });

  it("example 3 — single one", () => {
    assert.equal(largestAllOnesRectangle([["1"]]), 1);
  });

  it("all zeros", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["0", "0"],
        ["0", "0"],
      ]),
      0,
    );
  });

  it("all ones", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["1", "1", "1"],
        ["1", "1", "1"],
      ]),
      6,
    );
  });

  it("single column", () => {
    assert.equal(
      largestAllOnesRectangle([["1"], ["1"], ["0"], ["1"], ["1"], ["1"]]),
      3,
    );
  });

  it("single row", () => {
    assert.equal(largestAllOnesRectangle([["1", "1", "0", "1", "1", "1"]]), 3);
  });

  it("full width strip", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["0", "0", "0"],
        ["1", "1", "1"],
        ["1", "1", "1"],
        ["0", "0", "0"],
      ]),
      6,
    );
  });

  it("zero resets height — not used as a right edge", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["1", "0", "1"],
        ["1", "1", "0"],
      ]),
      2,
    );
  });

  it("2x2 to the right of a height peak", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["1", "1", "0"],
        ["0", "1", "1"],
        ["0", "1", "1"],
      ]),
      4,
    );
  });

  it("wide short strip after a taller leftover one", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["1", "0", "0", "0"],
        ["1", "1", "1", "0"],
      ]),
      3,
    );
  });

  it("strictly decreasing column heights", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["1", "1", "1"],
        ["1", "1", "0"],
        ["1", "0", "0"],
      ]),
      4,
    );
  });

  it("increasing column heights — last bars must still count", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["0", "0", "1"],
        ["0", "1", "1"],
        ["1", "1", "1"],
      ]),
      4,
    );
  });

  it("equal heights across two columns", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["1", "1"],
        ["1", "1"],
        ["1", "1"],
        ["1", "0"],
      ]),
      6,
    );
  });

  it("histogram valley 2 1 2 1", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["1", "0", "1", "0"],
        ["1", "1", "1", "1"],
      ]),
      4,
    );
  });

  it("ones only in first column", () => {
    assert.equal(
      largestAllOnesRectangle([
        ["1", "0", "0"],
        ["1", "0", "0"],
        ["1", "0", "0"],
      ]),
      3,
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
      [
        ["1", "0", "1"],
        ["1", "1", "0"],
      ],
      [
        ["1", "1", "0"],
        ["0", "1", "1"],
        ["0", "1", "1"],
      ],
      [
        ["1", "0", "0", "0"],
        ["1", "1", "1", "0"],
      ],
      [
        ["0", "1", "0", "0"],
        ["0", "1", "1", "1"],
      ],
      [
        ["1", "1", "1"],
        ["1", "1", "0"],
        ["1", "0", "0"],
      ],
      [
        ["0", "0", "1"],
        ["0", "1", "1"],
        ["1", "1", "1"],
      ],
      [
        ["1", "1"],
        ["1", "1"],
        ["1", "1"],
        ["1", "0"],
      ],
      [
        ["1", "0", "1", "0"],
        ["1", "1", "1", "1"],
      ],
      [
        ["1", "1", "1", "1"],
        ["1", "0", "1", "0"],
      ],
      [
        ["0", "1", "1"],
        ["0", "1", "1"],
        ["1", "1", "0"],
      ],
      [
        ["1", "1", "0"],
        ["1", "1", "0"],
        ["1", "1", "0"],
        ["1", "1", "0"],
        ["1", "0", "1"],
      ],
    ];
    for (const m of cases) {
      assert.equal(
        largestAllOnesRectangle(m),
        naive(m),
        `failed on ${JSON.stringify(m)}`,
      );
    }
  });

  it("exhaustive 3x4 vs naive", () => {
    for (let bits = 0; bits < 2 ** 12; bits++) {
      const m: string[][] = [];
      for (let r = 0; r < 3; r++) {
        const row: string[] = [];
        for (let c = 0; c < 4; c++) {
          row.push((bits >> (r * 4 + c)) & 1 ? "1" : "0");
        }
        m.push(row);
      }
      assert.equal(
        largestAllOnesRectangle(m),
        naive(m),
        `failed on ${JSON.stringify(m)}`,
      );
    }
  });
});
