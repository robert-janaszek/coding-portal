import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import {
  TreeNode,
  bfsLevelOrder,
  createBfsIterator,
  createDfsIterator,
  dfsPreorder,
} from "./treeIterator";

const GeneratorFunction = function* () {}.constructor;

function isGeneratorFunction(fn: unknown): boolean {
  return typeof fn === "function" && fn.constructor === GeneratorFunction;
}

function isGeneratorObject(value: unknown): boolean {
  return Object.prototype.toString.call(value) === "[object Generator]";
}

function drain(it: Iterator<number>): number[] {
  const out: number[] = [];
  for (;;) {
    const step = it.next();
    if (step.done) return out;
    out.push(step.value);
  }
}

function tree(vals: (number | null)[]): TreeNode | null {
  if (vals.length === 0 || vals[0] == null) return null;
  const root = new TreeNode(vals[0]);
  const queue: TreeNode[] = [root];
  let i = 1;
  while (i < vals.length) {
    const node = queue.shift()!;
    if (i < vals.length && vals[i] != null) {
      node.left = new TreeNode(vals[i]!);
      queue.push(node.left);
    }
    i++;
    if (i < vals.length && vals[i] != null) {
      node.right = new TreeNode(vals[i]!);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

const example = tree([1, 2, 3, 4, 5, 6, 7]);
const DFS = [1, 2, 4, 5, 3, 6, 7];
const BFS = [1, 2, 3, 4, 5, 6, 7];

describe("iterator protocol", () => {
  it("dfsPreorder and bfsLevelOrder are generator functions", () => {
    assert.equal(isGeneratorFunction(dfsPreorder), true);
    assert.equal(isGeneratorFunction(bfsLevelOrder), true);
  });

  it("createDfsIterator / createBfsIterator return a non-generator with next()", () => {
    const dfs = createDfsIterator(example);
    const bfs = createBfsIterator(example);
    assert.equal(typeof dfs.next, "function");
    assert.equal(typeof bfs.next, "function");
    assert.equal(isGeneratorObject(dfs), false);
    assert.equal(isGeneratorObject(bfs), false);
  });
});

describe("examples", () => {
  it("full tree — generator DFS / BFS", () => {
    assert.deepEqual([...dfsPreorder(example)], DFS);
    assert.deepEqual([...bfsLevelOrder(example)], BFS);
  });

  it("full tree — next() DFS / BFS", () => {
    assert.deepEqual(drain(createDfsIterator(example)), DFS);
    assert.deepEqual(drain(createBfsIterator(example)), BFS);
  });
});

describe("edge cases", () => {
  it("null root", () => {
    assert.deepEqual([...dfsPreorder(null)], []);
    assert.deepEqual([...bfsLevelOrder(null)], []);
    assert.deepEqual(drain(createDfsIterator(null)), []);
    assert.deepEqual(drain(createBfsIterator(null)), []);
  });

  it("single node", () => {
    const root = new TreeNode(42);
    assert.deepEqual([...dfsPreorder(root)], [42]);
    assert.deepEqual([...bfsLevelOrder(root)], [42]);
    assert.deepEqual(drain(createDfsIterator(root)), [42]);
    assert.deepEqual(drain(createBfsIterator(root)), [42]);
  });

  it("left spine", () => {
    const root = tree([1, 2, null, 3]);
    assert.deepEqual([...dfsPreorder(root)], [1, 2, 3]);
    assert.deepEqual([...bfsLevelOrder(root)], [1, 2, 3]);
    assert.deepEqual(drain(createDfsIterator(root)), [1, 2, 3]);
    assert.deepEqual(drain(createBfsIterator(root)), [1, 2, 3]);
  });

  it("right spine", () => {
    const root = tree([1, null, 2, null, 3]);
    assert.deepEqual([...dfsPreorder(root)], [1, 2, 3]);
    assert.deepEqual([...bfsLevelOrder(root)], [1, 2, 3]);
    assert.deepEqual(drain(createDfsIterator(root)), [1, 2, 3]);
    assert.deepEqual(drain(createBfsIterator(root)), [1, 2, 3]);
  });

  it("unbalanced — DFS and BFS differ", () => {
    const root = tree([1, 2, 3, 4, null, null, 5]);
    const dfs = [1, 2, 4, 3, 5];
    const bfs = [1, 2, 3, 4, 5];
    assert.deepEqual([...dfsPreorder(root)], dfs);
    assert.deepEqual([...bfsLevelOrder(root)], bfs);
    assert.deepEqual(drain(createDfsIterator(root)), dfs);
    assert.deepEqual(drain(createBfsIterator(root)), bfs);
  });
});

describe("next() semantics", () => {
  it("yields one value at a time", () => {
    const it = createDfsIterator(example);
    assert.deepEqual(it.next(), { value: 1, done: false });
    assert.deepEqual(it.next(), { value: 2, done: false });
    assert.deepEqual(it.next(), { value: 4, done: false });
  });

  it("stays done after the walk finishes", () => {
    const it = createBfsIterator(new TreeNode(7));
    assert.equal(it.next().done, false);
    const end = it.next();
    assert.equal(end.done, true);
    assert.equal(it.next().done, true);
  });

  it("generator next() matches the protocol", () => {
    const g = dfsPreorder(new TreeNode(9));
    assert.deepEqual(g.next(), { value: 9, done: false });
    assert.equal(g.next().done, true);
  });
});
