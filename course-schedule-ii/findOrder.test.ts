import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { findOrder } from "./findOrder";

function isValidOrder(
  numCourses: number,
  prerequisites: number[][],
  order: unknown,
): boolean {
  if (!Array.isArray(order) || order.length !== numCourses) return false;
  const pos = new Map<number, number>();
  for (let i = 0; i < order.length; i++) {
    const course = order[i];
    if (typeof course !== "number" || !Number.isInteger(course)) return false;
    if (course < 0 || course >= numCourses) return false;
    if (pos.has(course)) return false;
    pos.set(course, i);
  }
  for (const [a, b] of prerequisites) {
    const posA = pos.get(a!);
    const posB = pos.get(b!);
    if (posA === undefined || posB === undefined) return false;
    if (posB >= posA) return false;
  }
  return true;
}

function check(numCourses: number, prerequisites: [number, number][], possible: boolean) {
  const order = findOrder(numCourses, prerequisites);
  if (!possible) {
    assert.deepEqual(order, []);
    return;
  }
  assert.ok(isValidOrder(numCourses, prerequisites, order));
}

describe("findOrder (Course Schedule II)", () => {
  it("example: two courses", () => {
    check(2, [[1, 0]], true);
  });

  it("example: four courses", () => {
    check(4, [[1, 0], [2, 0], [3, 1], [3, 2]], true);
  });

  it("single course", () => {
    check(1, [], true);
  });

  it("no prerequisites", () => {
    check(3, [], true);
  });

  it("simple cycle", () => {
    check(2, [[1, 0], [0, 1]], false);
  });

  it("self-contained longer cycle", () => {
    check(3, [[0, 1], [1, 2], [2, 0]], false);
  });

  it("chain", () => {
    check(4, [[1, 0], [2, 1], [3, 2]], true);
  });

  it("disconnected components", () => {
    check(5, [[1, 0], [3, 2]], true);
  });

  it("diamond", () => {
    check(4, [[3, 1], [3, 2], [1, 0], [2, 0]], true);
  });

  it("cycle with extra nodes", () => {
    check(4, [[1, 0], [2, 1], [1, 2], [3, 0]], false);
  });
});
