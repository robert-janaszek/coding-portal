import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { minFareFromHub } from "./minFareFromHub";

describe("minFareFromHub", () => {
  it("detour through a cheap stop beats a pricey direct ride", () => {
    assert.deepEqual(
      minFareFromHub(4, [[0, 1, 4], [0, 2, 1], [2, 1, 1], [1, 3, 3]], 0),
      [0, 2, 1, 5],
    );
  });

  it("unreachable stop", () => {
    assert.deepEqual(minFareFromHub(3, [[0, 1, 7]], 0), [0, 7, -1]);
  });

  it("single stop", () => {
    assert.deepEqual(minFareFromHub(1, [], 0), [0]);
  });

  it("longer route is cheaper than a steep direct fare", () => {
    assert.deepEqual(
      minFareFromHub(3, [[0, 1, 50], [0, 2, 3], [2, 1, 4]], 0),
      [0, 7, 3],
    );
  });

  it("hub in the middle of a line", () => {
    assert.deepEqual(
      minFareFromHub(5, [[0, 1, 2], [1, 2, 2], [2, 3, 2], [3, 4, 2]], 2),
      [4, 2, 0, 2, 4],
    );
  });

  it("two separate clusters", () => {
    assert.deepEqual(
      minFareFromHub(4, [[0, 1, 5], [2, 3, 1]], 0),
      [0, 5, -1, -1],
    );
  });

  it("star, starting from a leaf", () => {
    assert.deepEqual(
      minFareFromHub(4, [[0, 1, 2], [0, 2, 9], [0, 3, 4]], 1),
      [2, 0, 11, 6],
    );
  });

  it("square of unit fares plus an expensive diagonal", () => {
    assert.deepEqual(
      minFareFromHub(
        4,
        [[0, 1, 1], [1, 2, 1], [2, 3, 1], [3, 0, 1], [0, 2, 10]],
        0,
      ),
      [0, 1, 2, 1],
    );
  });

  it("three cheap hops beat a huge direct link", () => {
    assert.deepEqual(
      minFareFromHub(4, [[0, 1, 100], [0, 2, 1], [2, 3, 1], [3, 1, 1]], 0),
      [0, 3, 1, 2],
    );
  });
});
