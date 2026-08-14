import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { Queue } from "./Queue";

describe("Queue", () => {
  it("dequeue on empty returns undefined", () => {
    const q = new Queue();
    assert.equal(q.dequeue(), undefined);
  });

  it("single enqueue then dequeue", () => {
    const q = new Queue();
    q.enqueue(7);
    assert.equal(q.dequeue(), 7);
    assert.equal(q.dequeue(), undefined);
  });

  it("FIFO order", () => {
    const q = new Queue();
    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    assert.equal(q.dequeue(), 1);
    assert.equal(q.dequeue(), 2);
    assert.equal(q.dequeue(), 3);
    assert.equal(q.dequeue(), undefined);
  });

  it("interleaved enqueue and dequeue stay FIFO", () => {
    const q = new Queue();
    q.enqueue(1);
    q.enqueue(2);
    assert.equal(q.dequeue(), 1);
    q.enqueue(3);
    q.enqueue(4);
    assert.equal(q.dequeue(), 2);
    assert.equal(q.dequeue(), 3);
    assert.equal(q.dequeue(), 4);
    assert.equal(q.dequeue(), undefined);
  });

  it("can fill again after being drained", () => {
    const q = new Queue();
    q.enqueue(1);
    q.enqueue(2);
    q.dequeue();
    q.dequeue();
    q.enqueue(9);
    q.enqueue(8);
    assert.equal(q.dequeue(), 9);
    assert.equal(q.dequeue(), 8);
    assert.equal(q.dequeue(), undefined);
  });

  it("handles 0 and negative values", () => {
    const q = new Queue();
    q.enqueue(0);
    q.enqueue(-3);
    assert.equal(q.dequeue(), 0);
    assert.equal(q.dequeue(), -3);
  });

  it("matches a mixed sequence of operations", () => {
    const q = new Queue();
    const ref: number[] = [];
    for (let i = 0; i < 50; i++) {
      q.enqueue(i);
      ref.push(i);
      if (i % 3 === 2) {
        assert.equal(q.dequeue(), ref.shift());
      }
    }
    while (ref.length > 0) {
      assert.equal(q.dequeue(), ref.shift());
    }
    assert.equal(q.dequeue(), undefined);
  });

  it("repeated drain-and-refill keeps FIFO", () => {
    const q = new Queue();
    for (let round = 0; round < 5; round++) {
      const base = round * 10;
      for (let i = 0; i < 8; i++) q.enqueue(base + i);
      for (let i = 0; i < 8; i++) {
        assert.equal(q.dequeue(), base + i);
      }
    }
  });

  it("enqueue past a small buffer still succeeds and stays FIFO", () => {
    const q = new Queue();
    const n = 100;
    for (let i = 0; i < n; i++) q.enqueue(i);
    for (let i = 0; i < n; i++) {
      assert.equal(q.dequeue(), i);
    }
    assert.equal(q.dequeue(), undefined);
  });
});
