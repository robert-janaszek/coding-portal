import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { GraphNode, cloneGraph } from "./cloneGraph";

function buildGraph(adj: number[][]): GraphNode | null {
  if (adj.length === 0) return null;
  const nodes = adj.map((_, i) => new GraphNode(i + 1));
  for (let i = 0; i < adj.length; i++) {
    nodes[i]!.neighbors = adj[i]!.map((v) => nodes[v - 1]!);
  }
  return nodes[0]!;
}

function serialize(node: GraphNode | null): number[][] {
  if (!node) return [];
  const byVal = new Map<number, GraphNode>();
  const stack = [node];
  while (stack.length > 0) {
    const cur = stack.pop()!;
    if (byVal.has(cur.val)) continue;
    byVal.set(cur.val, cur);
    for (const nb of cur.neighbors) stack.push(nb);
  }
  const n = byVal.size;
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (let v = 1; v <= n; v++) {
    const g = byVal.get(v);
    assert.ok(g, `missing node ${v}`);
    adj[v - 1] = g.neighbors.map((nb) => nb.val).sort((a, b) => a - b);
  }
  return adj;
}

function collectNodes(node: GraphNode | null): Set<GraphNode> {
  const seen = new Set<GraphNode>();
  if (!node) return seen;
  const stack = [node];
  while (stack.length > 0) {
    const cur = stack.pop()!;
    if (seen.has(cur)) continue;
    seen.add(cur);
    for (const nb of cur.neighbors) stack.push(nb);
  }
  return seen;
}

function assertDeepCopy(original: GraphNode | null, cloned: GraphNode | null) {
  if (!original) {
    assert.equal(cloned, null);
    return;
  }
  assert.ok(cloned);
  assert.notEqual(cloned, original);
  assert.deepEqual(serialize(cloned), serialize(original));
  const origNodes = collectNodes(original);
  const cloneNodes = collectNodes(cloned);
  for (const n of cloneNodes) {
    assert.equal(origNodes.has(n), false, "clone shares an object with original");
  }
}

describe("cloneGraph", () => {
  it("null", () => {
    assert.equal(cloneGraph(null), null);
  });

  it("single node, no neighbors", () => {
    const g = buildGraph([[]]);
    assertDeepCopy(g, cloneGraph(g));
  });

  it("square (example)", () => {
    const g = buildGraph([[2, 4], [1, 3], [2, 4], [1, 3]]);
    assertDeepCopy(g, cloneGraph(g));
  });

  it("line of three", () => {
    const g = buildGraph([[2], [1, 3], [2]]);
    assertDeepCopy(g, cloneGraph(g));
  });

  it("triangle (cycle)", () => {
    const g = buildGraph([[2, 3], [1, 3], [1, 2]]);
    assertDeepCopy(g, cloneGraph(g));
  });

  it("star", () => {
    const g = buildGraph([[2, 3, 4], [1], [1], [1]]);
    assertDeepCopy(g, cloneGraph(g));
  });
});
