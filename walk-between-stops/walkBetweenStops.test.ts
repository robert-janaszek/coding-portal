import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { walkBetweenStops } from "./walkBetweenStops";

function hopsFromStart(
  n: number,
  trails: [number, number][],
  start: number,
): number[] {
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [u, v] of trails) {
    adj[u].push(v);
    adj[v].push(u);
  }
  const dist = new Array<number>(n).fill(-1);
  dist[start] = 0;
  const queue = [start];
  for (let head = 0; head < queue.length; head++) {
    const u = queue[head];
    for (const v of adj[u]) {
      if (dist[v] !== -1) {
        continue;
      }
      dist[v] = dist[u] + 1;
      queue.push(v);
    }
  }
  return dist;
}

function trailSet(trails: [number, number][]): Set<string> {
  const set = new Set<string>();
  for (const [u, v] of trails) {
    set.add(`${u},${v}`);
    set.add(`${v},${u}`);
  }
  return set;
}

function assertShortestWalk(
  n: number,
  trails: [number, number][],
  start: number,
  finish: number,
  walk: number[],
): void {
  const dist = hopsFromStart(n, trails, start);
  if (dist[finish] === -1) {
    assert.deepEqual(walk, []);
    return;
  }
  assert.ok(walk.length >= 1, "walk must not be empty when reachable");
  assert.equal(walk[0], start);
  assert.equal(walk[walk.length - 1], finish);
  assert.equal(walk.length - 1, dist[finish]);
  const edges = trailSet(trails);
  for (let i = 0; i + 1 < walk.length; i++) {
    assert.ok(
      edges.has(`${walk[i]},${walk[i + 1]}`),
      `missing trail ${walk[i]}-${walk[i + 1]}`,
    );
  }
}

describe("walkBetweenStops", () => {
  it("line of four stops", () => {
    assert.deepEqual(
      walkBetweenStops(4, [[0, 1], [1, 2], [2, 3]], 0, 3),
      [0, 1, 2, 3],
    );
  });

  it("direct trail beats the long way around", () => {
    assert.deepEqual(
      walkBetweenStops(4, [[0, 1], [1, 2], [2, 3], [0, 3]], 0, 3),
      [0, 3],
    );
  });

  it("unreachable finish", () => {
    assert.deepEqual(walkBetweenStops(3, [[0, 1]], 0, 2), []);
  });

  it("start equals finish", () => {
    assert.deepEqual(walkBetweenStops(1, [], 0, 0), [0]);
  });

  it("start equals finish on a larger map", () => {
    assert.deepEqual(
      walkBetweenStops(4, [[0, 1], [1, 2], [2, 3]], 2, 2),
      [2],
    );
  });

  it("from the middle of a line toward one end", () => {
    assert.deepEqual(
      walkBetweenStops(5, [[0, 1], [1, 2], [2, 3], [3, 4]], 2, 4),
      [2, 3, 4],
    );
  });

  it("two leaves of a star", () => {
    assert.deepEqual(
      walkBetweenStops(4, [[0, 1], [0, 2], [0, 3]], 1, 2),
      [1, 0, 2],
    );
  });

  it("separate clusters", () => {
    assert.deepEqual(walkBetweenStops(4, [[0, 1], [2, 3]], 0, 3), []);
  });

  it("either shortest two-hop walk is accepted", () => {
    const trails: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 3],
      [2, 3],
    ];
    assertShortestWalk(4, trails, 0, 3, walkBetweenStops(4, trails, 0, 3));
  });

  it("two-hop walk beats a three-hop detour", () => {
    const trails: [number, number][] = [
      [1, 4],
      [1, 0],
      [0, 3],
      [4, 2],
      [2, 3],
    ];
    assertShortestWalk(5, trails, 1, 3, walkBetweenStops(5, trails, 1, 3));
  });
});
