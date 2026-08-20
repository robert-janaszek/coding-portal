import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { oppositeEnds } from "./oppositeEnds";

describe("oppositeEnds", () => {
  it("chain of four terminals", () => {
    assert.equal(oppositeEnds(4, [[0, 1], [1, 2], [2, 3]]), true);
  });

  it("triangle cannot alternate", () => {
    assert.equal(oppositeEnds(3, [[0, 1], [1, 2], [0, 2]]), false);
  });

  it("single terminal", () => {
    assert.equal(oppositeEnds(1, []), true);
  });

  it("two terminals with no cable", () => {
    assert.equal(oppositeEnds(2, []), true);
  });

  it("one cable", () => {
    assert.equal(oppositeEnds(2, [[0, 1]]), true);
  });

  it("four-cycle can alternate", () => {
    assert.equal(oppositeEnds(4, [[0, 1], [1, 2], [2, 3], [3, 0]]), true);
  });

  it("four-cycle plus a diagonal cannot", () => {
    assert.equal(
      oppositeEnds(4, [[0, 1], [1, 2], [2, 3], [3, 0], [0, 2]]),
      false,
    );
  });

  it("star from the center", () => {
    assert.equal(oppositeEnds(4, [[0, 1], [0, 2], [0, 3]]), true);
  });

  it("odd pentagon", () => {
    assert.equal(
      oppositeEnds(5, [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0]]),
      false,
    );
  });

  it("path plus a separate triangle", () => {
    assert.equal(
      oppositeEnds(6, [[0, 1], [1, 2], [3, 4], [4, 5], [5, 3]]),
      false,
    );
  });

  it("two disjoint chains", () => {
    assert.equal(oppositeEnds(5, [[0, 1], [2, 3], [3, 4]]), true);
  });

  it("even cycle and an unused terminal", () => {
    assert.equal(oppositeEnds(5, [[0, 1], [1, 2], [2, 3], [3, 0]]), true);
  });
});
