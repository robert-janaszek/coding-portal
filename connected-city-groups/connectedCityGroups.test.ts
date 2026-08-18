import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { connectedCityGroups } from "./connectedCityGroups";

describe("connectedCityGroups", () => {
  it("example: two provinces", () => {
    assert.equal(
      connectedCityGroups([
        [1, 0, 1],
        [0, 1, 0],
        [1, 0, 1],
      ]),
      2,
    );
  });

  it("example: three isolated cities", () => {
    assert.equal(
      connectedCityGroups([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
      ]),
      3,
    );
  });

  it("single city", () => {
    assert.equal(connectedCityGroups([[1]]), 1);
  });

  it("fully connected", () => {
    assert.equal(
      connectedCityGroups([
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ]),
      1,
    );
  });

  it("chain", () => {
    assert.equal(
      connectedCityGroups([
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
      connectedCityGroups([
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 1, 1],
      ]),
      2,
    );
  });

  it("one group linked through higher-index cities", () => {
    assert.equal(
      connectedCityGroups([
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 1],
        [0, 1, 1, 1],
      ]),
      1,
    );
  });

  it("path 0-3-2-1 is still one group", () => {
    assert.equal(
      connectedCityGroups([
        [1, 0, 0, 1],
        [0, 1, 1, 0],
        [0, 1, 1, 1],
        [1, 0, 1, 1],
      ]),
      1,
    );
  });

  it("indirect group plus an isolated city", () => {
    assert.equal(
      connectedCityGroups([
        [1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 1, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 1],
      ]),
      2,
    );
  });
});
