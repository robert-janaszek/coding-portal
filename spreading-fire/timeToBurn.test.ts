import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { timeToBurn } from "./timeToBurn";

describe("timeToBurn", () => {
  it("example 1 — fire reaches every tree", () => {
    assert.equal(
      timeToBurn([
        [1, 1, 2],
        [1, 0, 1],
        [0, 1, 1],
      ]),
      3,
    );
  });

  it("example 2 — some trees are unreachable", () => {
    assert.equal(
      timeToBurn([
        [2, 1, 0],
        [0, 0, 0],
        [0, 1, 1],
      ]),
      -1,
    );
  });

  it("example 3 — nothing left to burn", () => {
    assert.equal(
      timeToBurn([
        [0, 2],
        [0, 0],
      ]),
      0,
    );
  });

  it("single unburned tree and no fire", () => {
    assert.equal(timeToBurn([[1]]), -1);
  });

  it("single burning cell", () => {
    assert.equal(timeToBurn([[2]]), 0);
  });

  it("empty ground only", () => {
    assert.equal(
      timeToBurn([
        [0, 0],
        [0, 0],
      ]),
      0,
    );
  });

  it("one row", () => {
    assert.equal(timeToBurn([[1, 1, 1, 2]]), 3);
  });

  it("two fires meet in the middle", () => {
    assert.equal(timeToBurn([[2, 1, 1, 1, 2]]), 2);
  });
});
