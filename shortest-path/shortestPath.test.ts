import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { shortestPath } from "./shortestPath";

describe("shortestPath", () => {
  it("path of four nodes", () => {
    assert.deepEqual(shortestPath(4, [[0, 1], [1, 2], [2, 3]], 0), [0, 1, 2, 3]);
  });

  it("unreachable node", () => {
    assert.deepEqual(shortestPath(3, [[0, 1]], 0), [0, 1, -1]);
  });

  it("single node", () => {
    assert.deepEqual(shortestPath(1, [], 0), [0]);
  });

  it("source in the middle of a path", () => {
    assert.deepEqual(shortestPath(5, [[0, 1], [1, 2], [2, 3], [3, 4]], 2), [
      2, 1, 0, 1, 2,
    ]);
  });

  it("cycle prefers fewer edges", () => {
    assert.deepEqual(
      shortestPath(4, [[0, 1], [1, 2], [2, 3], [0, 3], [1, 3]], 0),
      [0, 1, 2, 1],
    );
  });

  it("disconnected components", () => {
    assert.deepEqual(shortestPath(4, [[0, 1], [2, 3]], 0), [0, 1, -1, -1]);
  });

  it("star from the center", () => {
    assert.deepEqual(shortestPath(4, [[0, 1], [0, 2], [0, 3]], 0), [0, 1, 1, 1]);
  });

  it("star from a leaf", () => {
    assert.deepEqual(shortestPath(4, [[0, 1], [0, 2], [0, 3]], 1), [1, 0, 2, 2]);
  });
});
