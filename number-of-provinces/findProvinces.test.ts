import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { findProvinces } from "./findProvinces";

describe("findProvinces", () => {
  it("example: two provinces", () => {
    assert.equal(
      findProvinces([
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ]),
      2,
    );
  });

  it("example: three isolated cities", () => {
    assert.equal(
      findProvinces([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]),
      3,
    );
  });

  it("single city", () => {
    assert.equal(findProvinces([[1]]), 1);
  });

  it("fully connected", () => {
    assert.equal(
      findProvinces([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ]),
      1,
    );
  });

  it("chain", () => {
    assert.equal(
      findProvinces([
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 1, 1],
        [0, 0, 1, 1],
      ]),
      1,
    );
  });

  it("two pairs", () => {
    assert.equal(
      findProvinces([
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 1, 1],
      ]),
      2,
    );
  });
});
