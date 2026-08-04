import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { ListNode, hasCycle } from "./linkedListCycle";

function buildList(values: number[], pos: number): ListNode | null {
  if (values.length === 0) return null;
  const nodes = values.map((v) => new ListNode(v));
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i]!.next = nodes[i + 1]!;
  }
  const tail = nodes[nodes.length - 1]!;
  if (pos >= 0) {
    tail.next = nodes[pos]!;
  }
  return nodes[0]!;
}

describe("linkedListCycle", () => {
  it("empty list", () => {
    assert.equal(hasCycle(null), false);
  });

  it("no cycle", () => {
    const head = buildList([1, 2], -1);
    assert.equal(hasCycle(head), false);
  });

  it("cycle starting at index 1", () => {
    const head = buildList([3, 2, 0, -4], 1);
    assert.equal(hasCycle(head), true);
  });

  it("cycle starting at head", () => {
    const head = buildList([1, 2, 3], 0);
    assert.equal(hasCycle(head), true);
  });

  it("single node self-cycle", () => {
    const head = buildList([1], 0);
    assert.equal(hasCycle(head), true);
  });
});

