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

  it("enqueue past constructor size still succeeds and stays FIFO", () => {
    const q = new Queue(4);
    const n = 20;
    for (let i = 0; i < n; i++) q.enqueue(i);
    for (let i = 0; i < n; i++) {
      assert.equal(q.dequeue(), i);
    }
    assert.equal(q.dequeue(), undefined);
  });

  it("size 1 grows and stays FIFO", () => {
    const q = new Queue(1);
    q.enqueue(10);
    q.enqueue(20);
    q.enqueue(30);
    assert.equal(q.dequeue(), 10);
    q.enqueue(40);
    assert.equal(q.dequeue(), 20);
    assert.equal(q.dequeue(), 30);
    assert.equal(q.dequeue(), 40);
    assert.equal(q.dequeue(), undefined);
  });

  it("wraps a full constructor-sized buffer without losing FIFO", () => {
    const q = new Queue(8);
    for (let i = 0; i < 8; i++) q.enqueue(i);
    for (let i = 0; i < 3; i++) {
      assert.equal(q.dequeue(), i);
    }
    for (let i = 8; i < 11; i++) q.enqueue(i);
    for (let i = 3; i < 11; i++) {
      assert.equal(q.dequeue(), i);
    }
    assert.equal(q.dequeue(), undefined);
  });

  it("grows after wrapping a constructor-sized buffer", () => {
    const q = new Queue(8);
    for (let i = 0; i < 8; i++) q.enqueue(i);
    for (let i = 0; i < 3; i++) {
      assert.equal(q.dequeue(), i);
    }
    for (let i = 8; i < 25; i++) q.enqueue(i);
    for (let i = 3; i < 25; i++) {
      assert.equal(q.dequeue(), i);
    }
    assert.equal(q.dequeue(), undefined);
  });

  it("interleaved ops past constructor size stay FIFO", () => {
    const q = new Queue(2);
    const ref: number[] = [];
    for (let i = 0; i < 40; i++) {
      q.enqueue(i);
      ref.push(i);
      if (i % 2 === 0) {
        assert.equal(q.dequeue(), ref.shift());
      }
    }
    while (ref.length > 0) {
      assert.equal(q.dequeue(), ref.shift());
    }
    assert.equal(q.dequeue(), undefined);
  });
});
