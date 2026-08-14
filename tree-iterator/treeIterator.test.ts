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

describe("dfsPreorder", () => {
  it("is a generator function", () => {
    assert.equal(isGeneratorFunction(dfsPreorder), true);
  });

  it("full tree", () => {
    assert.deepEqual([...dfsPreorder(example)], DFS);
  });

  it("null root", () => {
    assert.deepEqual([...dfsPreorder(null)], []);
  });

  it("single node", () => {
    assert.deepEqual([...dfsPreorder(new TreeNode(42))], [42]);
  });

  it("left spine", () => {
    assert.deepEqual([...dfsPreorder(tree([1, 2, null, 3]))], [1, 2, 3]);
  });

  it("right spine", () => {
    assert.deepEqual([...dfsPreorder(tree([1, null, 2, null, 3]))], [1, 2, 3]);
  });

  it("unbalanced", () => {
    assert.deepEqual(
      [...dfsPreorder(tree([1, 2, 3, 4, null, null, 5]))],
      [1, 2, 4, 3, 5],
    );
  });

  it("next() matches the protocol", () => {
    const g = dfsPreorder(new TreeNode(9));
    assert.deepEqual(g.next(), { value: 9, done: false });
    assert.equal(g.next().done, true);
  });
});

describe("bfsLevelOrder", () => {
  it("is a generator function", () => {
    assert.equal(isGeneratorFunction(bfsLevelOrder), true);
  });

  it("full tree", () => {
    assert.deepEqual([...bfsLevelOrder(example)], BFS);
  });

  it("null root", () => {
    assert.deepEqual([...bfsLevelOrder(null)], []);
  });

  it("single node", () => {
    assert.deepEqual([...bfsLevelOrder(new TreeNode(42))], [42]);
  });

  it("left spine", () => {
    assert.deepEqual([...bfsLevelOrder(tree([1, 2, null, 3]))], [1, 2, 3]);
  });

  it("right spine", () => {
    assert.deepEqual([...bfsLevelOrder(tree([1, null, 2, null, 3]))], [1, 2, 3]);
  });

  it("unbalanced", () => {
    assert.deepEqual(
      [...bfsLevelOrder(tree([1, 2, 3, 4, null, null, 5]))],
      [1, 2, 3, 4, 5],
    );
  });

  it("next() matches the protocol", () => {
    const g = bfsLevelOrder(new TreeNode(9));
    assert.deepEqual(g.next(), { value: 9, done: false });
    assert.equal(g.next().done, true);
  });
});

describe("createDfsIterator", () => {
  it("returns a non-generator with next()", () => {
    const it = createDfsIterator(example);
    assert.equal(typeof it.next, "function");
    assert.equal(isGeneratorObject(it), false);
  });

  it("full tree", () => {
    assert.deepEqual(drain(createDfsIterator(example)), DFS);
  });

  it("null root", () => {
    assert.deepEqual(drain(createDfsIterator(null)), []);
  });

  it("single node", () => {
    assert.deepEqual(drain(createDfsIterator(new TreeNode(42))), [42]);
  });

  it("left spine", () => {
    assert.deepEqual(drain(createDfsIterator(tree([1, 2, null, 3]))), [1, 2, 3]);
  });

  it("right spine", () => {
    assert.deepEqual(
      drain(createDfsIterator(tree([1, null, 2, null, 3]))),
      [1, 2, 3],
    );
  });

  it("unbalanced", () => {
    assert.deepEqual(
      drain(createDfsIterator(tree([1, 2, 3, 4, null, null, 5]))),
      [1, 2, 4, 3, 5],
    );
  });

  it("yields one value at a time", () => {
    const it = createDfsIterator(example);
    assert.deepEqual(it.next(), { value: 1, done: false });
    assert.deepEqual(it.next(), { value: 2, done: false });
    assert.deepEqual(it.next(), { value: 4, done: false });
  });

  it("stays done after the walk finishes", () => {
    const it = createDfsIterator(new TreeNode(7));
    assert.equal(it.next().done, false);
    assert.equal(it.next().done, true);
    assert.equal(it.next().done, true);
  });
});

describe("createBfsIterator", () => {
  it("returns a non-generator with next()", () => {
    const it = createBfsIterator(example);
    assert.equal(typeof it.next, "function");
    assert.equal(isGeneratorObject(it), false);
  });

  it("full tree", () => {
    assert.deepEqual(drain(createBfsIterator(example)), BFS);
  });

  it("null root", () => {
    assert.deepEqual(drain(createBfsIterator(null)), []);
  });

  it("single node", () => {
    assert.deepEqual(drain(createBfsIterator(new TreeNode(42))), [42]);
  });

  it("left spine", () => {
    assert.deepEqual(drain(createBfsIterator(tree([1, 2, null, 3]))), [1, 2, 3]);
  });

  it("right spine", () => {
    assert.deepEqual(
      drain(createBfsIterator(tree([1, null, 2, null, 3]))),
      [1, 2, 3],
    );
  });

  it("unbalanced", () => {
    assert.deepEqual(
      drain(createBfsIterator(tree([1, 2, 3, 4, null, null, 5]))),
      [1, 2, 3, 4, 5],
    );
  });

  it("yields one value at a time", () => {
    const it = createBfsIterator(example);
    assert.deepEqual(it.next(), { value: 1, done: false });
    assert.deepEqual(it.next(), { value: 2, done: false });
    assert.deepEqual(it.next(), { value: 3, done: false });
  });

  it("stays done after the walk finishes", () => {
    const it = createBfsIterator(new TreeNode(7));
    assert.equal(it.next().done, false);
    assert.equal(it.next().done, true);
    assert.equal(it.next().done, true);
  });
});
