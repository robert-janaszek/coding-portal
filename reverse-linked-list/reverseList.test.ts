import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { ListNode, reverseList } from "./reverseList";

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
      throw new Error("cycle detected after reverse");
    }
    seen.add(head);
    out.push(head.val);
    head = head.next;
  }
  return out;
}

function nodesInOrder(head: ListNode | null): ListNode[] {
  const nodes: ListNode[] = [];
  while (head) {
    nodes.push(head);
    head = head.next;
  }
  return nodes;
}

describe("reverseList", () => {
  it("empty list", () => {
    assert.equal(reverseList(null), null);
  });

  it("single node", () => {
    const head = new ListNode(1);
    const reversed = reverseList(head);
    assert.equal(reversed, head);
    assert.deepEqual(toArray(reversed), [1]);
  });

  it("example 1", () => {
    const reversed = reverseList(buildList([8, 3, 1, 6]));
    assert.deepEqual(toArray(reversed), [6, 1, 3, 8]);
  });

  it("example 2", () => {
    const reversed = reverseList(buildList([4, 9]));
    assert.deepEqual(toArray(reversed), [9, 4]);
  });

  it("rewires the original nodes in place", () => {
    const head = buildList([1, 2, 3, 4]);
    const original = nodesInOrder(head);
    const reversed = reverseList(head);
    assert.deepEqual(nodesInOrder(reversed), original.reverse());
  });
});
