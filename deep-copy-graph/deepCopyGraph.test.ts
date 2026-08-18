import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { GraphNode, deepCopyGraph } from "./deepCopyGraph";

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

describe("deepCopyGraph", () => {
  it("null", () => {
    assert.equal(deepCopyGraph(null), null);
  });

  it("single node", () => {
    const node = new GraphNode(1);
    const cloned = deepCopyGraph(node);
    assert.ok(cloned);
    assert.notEqual(cloned, node);
    assert.equal(cloned.val, 1);
    assert.deepEqual(cloned.neighbors, []);
  });

  it("one directed edge 1 -> 2", () => {
    const a = new GraphNode(1);
    const b = new GraphNode(2);
    a.neighbors = [b];

    const cloned = deepCopyGraph(a)!;
    assert.equal(cloned.val, 1);
    assert.equal(cloned.neighbors.length, 1);
    assert.equal(cloned.neighbors[0]!.val, 2);
    assert.deepEqual(cloned.neighbors[0]!.neighbors, []);
    assert.notEqual(cloned, a);
    assert.notEqual(cloned.neighbors[0], b);
  });

  it("chain 1 -> 2 -> 3", () => {
    const a = new GraphNode(1);
    const b = new GraphNode(2);
    const c = new GraphNode(3);
    a.neighbors = [b];
    b.neighbors = [c];

    const cloned = deepCopyGraph(a)!;
    assert.equal(cloned.val, 1);
    const n2 = cloned.neighbors[0]!;
    assert.equal(n2.val, 2);
    assert.equal(n2.neighbors.length, 1);
    assert.equal(n2.neighbors[0]!.val, 3);
    assert.deepEqual(n2.neighbors[0]!.neighbors, []);
    assert.notEqual(cloned, a);
    assert.notEqual(n2, b);
    assert.notEqual(n2.neighbors[0], c);
  });

  it("star, one-way from center", () => {
    const center = new GraphNode(1);
    const leaves = [new GraphNode(2), new GraphNode(3), new GraphNode(4)];
    center.neighbors = leaves;

    const cloned = deepCopyGraph(center)!;
    assert.equal(cloned.val, 1);
    assert.deepEqual(
      cloned.neighbors.map((n) => n.val),
      [2, 3, 4],
    );
    for (const n of cloned.neighbors) {
      assert.deepEqual(n.neighbors, []);
    }
    assert.notEqual(cloned, center);
    assert.notEqual(cloned.neighbors[0], leaves[0]);
  });

  it("two nodes, undirected (back-edge)", () => {
    const a = new GraphNode(1);
    const b = new GraphNode(2);
    a.neighbors = [b];
    b.neighbors = [a];

    const cloned = deepCopyGraph(a)!;
    assert.equal(cloned.val, 1);
    assert.equal(cloned.neighbors.length, 1);
    assert.equal(cloned.neighbors[0]!.val, 2);
    assert.equal(cloned.neighbors[0]!.neighbors[0], cloned);
    assert.notEqual(cloned, a);
    assert.notEqual(cloned.neighbors[0], b);
  });

  it("square (example)", () => {
    const g = buildGraph([
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ]);
    assertDeepCopy(g, deepCopyGraph(g));
  });

  it("triangle", () => {
    const g = buildGraph([
      [2, 3],
      [1, 3],
      [1, 2],
    ]);
    assertDeepCopy(g, deepCopyGraph(g));
  });
});
