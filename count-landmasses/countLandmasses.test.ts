import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { countLandmasses } from "./countLandmasses";

describe("countLandmasses", () => {
  it("example 1", () => {
    const grid = [
      ["1", "0", "1", "0"],
      ["1", "0", "1", "1"],
      ["0", "0", "0", "1"],
    ];
    assert.equal(countLandmasses(grid), 2);
  });

  it("example 2", () => {
    const grid = [["1"]];
    assert.equal(countLandmasses(grid), 1);
  });

  it("example 3", () => {
    const grid = [["0", "0"]];
    assert.equal(countLandmasses(grid), 0);
  });

  it("empty grid", () => {
    assert.equal(countLandmasses([]), 0);
  });

  it("diagonal does not connect islands", () => {
    const grid = [
      ["1", "0"],
      ["0", "1"],
    ];
    assert.equal(countLandmasses(grid), 2);
  });

  it("single row", () => {
    const grid = [["1", "1", "1", "0", "1"]];
    assert.equal(countLandmasses(grid), 2);
  });

  it("T-shape land is one island", () => {
    const grid = [
      ["0", "1", "0"],
      ["1", "1", "1"],
    ];
    assert.equal(countLandmasses(grid), 1);
  });
});

