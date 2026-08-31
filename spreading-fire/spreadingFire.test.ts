import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { spreadingFire } from "./spreadingFire";

describe("spreadingFire", () => {
  it("example 1 — fire reaches every tree", () => {
    assert.equal(
      spreadingFire([
        [1, 1, 2],
        [1, 0, 1],
        [0, 1, 1],
      ]),
      3,
    );
  });

  it("example 2 — some trees are unreachable", () => {
    assert.equal(
      spreadingFire([
        [2, 1, 0],
        [0, 0, 0],
        [0, 1, 1],
      ]),
      -1,
    );
  });

  it("example 3 — nothing left to burn", () => {
    assert.equal(
      spreadingFire([
        [0, 2],
        [0, 0],
      ]),
      0,
    );
  });

  it("single unburned tree and no fire", () => {
    assert.equal(spreadingFire([[1]]), -1);
  });

  it("single burning cell", () => {
    assert.equal(spreadingFire([[2]]), 0);
  });

  it("empty ground only", () => {
    assert.equal(
      spreadingFire([
        [0, 0],
        [0, 0],
      ]),
      0,
    );
  });

  it("one row", () => {
    assert.equal(spreadingFire([[1, 1, 1, 2]]), 3);
  });

  it("two fires meet in the middle", () => {
    assert.equal(spreadingFire([[2, 1, 1, 1, 2]]), 2);
  });

  it("two adjacent fires then a tree chain", () => {
    assert.equal(spreadingFire([[2, 2, 1, 1]]), 2);
  });

  it("fire with a tree cut off by empty ground", () => {
    assert.equal(
      spreadingFire([
        [2, 0],
        [0, 1],
      ]),
      -1,
    );
  });
});
