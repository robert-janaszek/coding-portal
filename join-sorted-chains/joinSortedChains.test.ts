import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { ListNode, joinSortedChains } from "./joinSortedChains";

function buildList(values: number[]): ListNode | null {
  if (values.length === 0) return null;
  const nodes = values.map((v) => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i]!.next = nodes[i + 1]!;
  }
  return nodes[0]!;
}

function toArray(head: ListNode | null): number[] {
  const out: number[] = [];
  const seen = new Set<ListNode>();
  while (head) {
    if (seen.has(head)) {
      throw new Error("cycle detected after join");
    }
    seen.add(head);
    out.push(head.val);
    head = head.next;
  }
  return out;
}

function collectNodes(head: ListNode | null): Set<ListNode> {
  const nodes = new Set<ListNode>();
  while (head) {
    nodes.add(head);
    head = head.next;
  }
  return nodes;
}

function allInputNodes(chains: (ListNode | null)[]): Set<ListNode> {
  const nodes = new Set<ListNode>();
  for (const head of chains) {
    for (const node of collectNodes(head)) {
      nodes.add(node);
    }
  }
  return nodes;
}

describe("joinSortedChains", () => {
  it("example 1", () => {
    const chains = [buildList([1, 4, 7]), buildList([2, 5]), buildList([3])];
    assert.deepEqual(toArray(joinSortedChains(chains)), [1, 2, 3, 4, 5, 7]);
  });

  it("empty array", () => {
    assert.equal(joinSortedChains([]), null);
  });

  it("example 3: empty slots around one chain", () => {
    const chains = [null, buildList([0, 2, 2]), null];
    assert.deepEqual(toArray(joinSortedChains(chains)), [0, 2, 2]);
  });

  it("all entries null", () => {
    assert.equal(joinSortedChains([null, null]), null);
  });

  it("single chain", () => {
    const chains = [buildList([1, 3, 8])];
    assert.deepEqual(toArray(joinSortedChains(chains)), [1, 3, 8]);
  });

  it("two chains of equal length", () => {
    const chains = [buildList([1, 4, 6]), buildList([2, 3, 5])];
    assert.deepEqual(toArray(joinSortedChains(chains)), [1, 2, 3, 4, 5, 6]);
  });

  it("one chain much longer than the others", () => {
    const chains = [
      buildList([10, 20, 30, 40, 50]),
      buildList([15]),
      buildList([5, 25]),
    ];
    assert.deepEqual(
      toArray(joinSortedChains(chains)),
      [5, 10, 15, 20, 25, 30, 40, 50],
    );
  });

  it("negatives and duplicates across chains", () => {
    const chains = [
      buildList([-4, -1, 0]),
      buildList([-4, 2]),
      buildList([-1, 2, 2]),
    ];
    assert.deepEqual(
      toArray(joinSortedChains(chains)),
      [-4, -4, -1, -1, 0, 2, 2, 2],
    );
  });

  it("many singleton chains", () => {
    const chains = [3, 1, 4, 1, 5, 9, 2, 6].map((v) => buildList([v]));
    assert.deepEqual(
      toArray(joinSortedChains(chains)),
      [1, 1, 2, 3, 4, 5, 6, 9],
    );
  });

  it("rewires the original nodes", () => {
    const chains = [buildList([1, 4]), buildList([2, 3])];
    const original = allInputNodes(chains);
    const joined = joinSortedChains(chains);
    const result = collectNodes(joined);
    assert.equal(result.size, original.size);
    for (const node of result) {
      assert.equal(original.has(node), true);
    }
  });
});
