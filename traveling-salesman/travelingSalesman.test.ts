import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { travelingSalesman } from "./travelingSalesman";

function brute(dist: number[][]): number {
  const n = dist.length;
  if (n <= 1) return 0;
  const rest = Array.from({ length: n - 1 }, (_, i) => i + 1);
  let best = Infinity;

  function permute(i: number) {
    if (i === rest.length) {
      let cost = dist[0]![rest[0]!]!;
      for (let k = 0; k < rest.length - 1; k++) {
        cost += dist[rest[k]!]![rest[k + 1]!]!;
      }
      cost += dist[rest[rest.length - 1]!]![0]!;
      best = Math.min(best, cost);
      return;
    }
    for (let j = i; j < rest.length; j++) {
      [rest[i], rest[j]] = [rest[j]!, rest[i]!];
      permute(i + 1);
      [rest[i], rest[j]] = [rest[j]!, rest[i]!];
    }
  }

  permute(0);
  return best;
}

describe("travelingSalesman", () => {
  it("classic 4-city example", () => {
    assert.equal(
      travelingSalesman([
        [0, 10, 15, 20],
        [10, 0, 35, 25],
        [15, 35, 0, 30],
        [20, 25, 30, 0],
      ]),
      80,
    );
  });

  it("triangle", () => {
    assert.equal(
      travelingSalesman([
        [0, 1, 5],
        [1, 0, 3],
        [5, 3, 0],
      ]),
      9,
    );
  });

  it("single city", () => {
    assert.equal(travelingSalesman([[0]]), 0);
  });

  it("two cities", () => {
    assert.equal(
      travelingSalesman([
        [0, 4],
        [4, 0],
      ]),
      8,
    );
  });

  it("asymmetric costs", () => {
    assert.equal(
      travelingSalesman([
        [0, 1, 10],
        [2, 0, 1],
        [1, 10, 0],
      ]),
      3,
    );
  });

  describe("brute cross-check", () => {
    const cases = [
      [
        [0, 2, 9, 10],
        [1, 0, 6, 4],
        [15, 7, 0, 8],
        [6, 3, 12, 0],
      ],
      [
        [0, 5, 9, 8, 6],
        [5, 0, 4, 7, 3],
        [9, 4, 0, 5, 2],
        [8, 7, 5, 0, 6],
        [6, 3, 2, 6, 0],
      ],
    ];
    for (let i = 0; i < cases.length; i++) {
      it(`case ${i + 1}`, () => {
        const d = cases[i]!;
        assert.equal(travelingSalesman(d), brute(d));
      });
    }
  });
});
