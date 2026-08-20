import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { singleTrailMap } from "./singleTrailMap";

describe("singleTrailMap", () => {
  it("branching layout from a hub", () => {
    assert.equal(singleTrailMap(5, [[0, 1], [0, 2], [0, 3], [1, 4]]), true);
  });

  it("loop among three junctions", () => {
    assert.equal(
      singleTrailMap(5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]),
      false,
    );
  });

  it("single junction", () => {
    assert.equal(singleTrailMap(1, []), true);
  });

  it("two junctions, one trail", () => {
    assert.equal(singleTrailMap(2, [[0, 1]]), true);
  });

  it("two junctions, no trail", () => {
    assert.equal(singleTrailMap(2, []), false);
  });

  it("straight line of four", () => {
    assert.equal(singleTrailMap(4, [[0, 1], [1, 2], [2, 3]]), true);
  });

  it("triangle of three", () => {
    assert.equal(singleTrailMap(3, [[0, 1], [1, 2], [0, 2]]), false);
  });

  it("two separate pairs", () => {
    assert.equal(singleTrailMap(4, [[0, 1], [2, 3]]), false);
  });

  it("triangle plus a leftover junction still has n-1 trails", () => {
    assert.equal(singleTrailMap(4, [[0, 1], [1, 2], [0, 2]]), false);
  });

  it("line missing one junction", () => {
    assert.equal(singleTrailMap(3, [[0, 1]]), false);
  });

  it("forked path of six", () => {
    assert.equal(
      singleTrailMap(6, [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5]]),
      true,
    );
  });

  it("forked path with an extra closing trail", () => {
    assert.equal(
      singleTrailMap(6, [[0, 1], [1, 2], [1, 3], [3, 4], [3, 5], [2, 4]]),
      false,
    );
  });

  it("four-cycle uses every junction", () => {
    assert.equal(singleTrailMap(4, [[0, 1], [1, 2], [2, 3], [3, 0]]), false);
  });
});
