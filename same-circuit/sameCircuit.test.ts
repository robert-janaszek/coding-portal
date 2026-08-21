import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { sameCircuit } from "./sameCircuit";

describe("sameCircuit", () => {
  it("example: two circuits then a merging wire", () => {
    assert.deepEqual(
      sameCircuit(5, [
        ["link", 0, 1],
        ["link", 1, 2],
        ["check", 0, 2],
        ["check", 0, 3],
        ["link", 3, 4],
        ["check", 2, 4],
        ["link", 2, 3],
        ["check", 0, 4],
      ]),
      [true, false, false, true],
    );
  });

  it("example: check before any wire, then a self-check", () => {
    assert.deepEqual(
      sameCircuit(2, [
        ["check", 0, 1],
        ["check", 0, 0],
        ["link", 0, 1],
        ["check", 1, 0],
      ]),
      [false, true, true],
    );
  });

  it("empty log", () => {
    assert.deepEqual(sameCircuit(1, []), []);
  });

  it("self-check with no wires", () => {
    assert.deepEqual(sameCircuit(3, [["check", 2, 2]]), [true]);
  });

  it("only links, no checks", () => {
    assert.deepEqual(
      sameCircuit(3, [
        ["link", 0, 1],
        ["link", 1, 2],
      ]),
      [],
    );
  });

  it("chain reaches the far end only after the last wire", () => {
    assert.deepEqual(
      sameCircuit(4, [
        ["link", 0, 1],
        ["check", 0, 3],
        ["link", 1, 2],
        ["check", 0, 3],
        ["link", 2, 3],
        ["check", 0, 3],
      ]),
      [false, false, true],
    );
  });

  it("two pairs stay separate until a bridge", () => {
    assert.deepEqual(
      sameCircuit(4, [
        ["link", 0, 1],
        ["link", 2, 3],
        ["check", 0, 2],
        ["check", 1, 3],
        ["link", 1, 2],
        ["check", 0, 3],
      ]),
      [false, false, true],
    );
  });

  it("a second wire on an existing circuit is allowed", () => {
    assert.deepEqual(
      sameCircuit(3, [
        ["link", 0, 1],
        ["link", 1, 2],
        ["link", 0, 2],
        ["check", 0, 2],
      ]),
      [true],
    );
  });

  it("checks do not change the wiring", () => {
    assert.deepEqual(
      sameCircuit(3, [
        ["check", 0, 1],
        ["check", 0, 1],
        ["link", 0, 1],
        ["check", 0, 1],
        ["check", 0, 2],
      ]),
      [false, false, true, false],
    );
  });

  it("later merge does not rewrite earlier checks", () => {
    assert.deepEqual(
      sameCircuit(3, [
        ["link", 0, 1],
        ["check", 0, 2],
        ["link", 1, 2],
        ["check", 0, 2],
      ]),
      [false, true],
    );
  });

  it("star from a hub", () => {
    assert.deepEqual(
      sameCircuit(5, [
        ["link", 0, 1],
        ["link", 0, 2],
        ["link", 0, 3],
        ["check", 1, 3],
        ["check", 2, 4],
        ["link", 0, 4],
        ["check", 1, 4],
      ]),
      [true, false, true],
    );
  });
});
