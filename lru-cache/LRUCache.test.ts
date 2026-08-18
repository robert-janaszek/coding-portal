import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { LRUCache } from "./LRUCache";

describe("LRUCache", () => {
  it("example", () => {
    const cache = new LRUCache(2);
    cache.put(10, 10);
    cache.put(20, 20);
    assert.equal(cache.get(10), 10);
    cache.put(30, 30);
    assert.equal(cache.get(20), -1);
    cache.put(40, 40);
    assert.equal(cache.get(10), -1);
    assert.equal(cache.get(30), 30);
    assert.equal(cache.get(40), 40);
  });

  it("capacity 1", () => {
    const cache = new LRUCache(1);
    cache.put(1, 1);
    assert.equal(cache.get(1), 1);
    cache.put(2, 2);
    assert.equal(cache.get(1), -1);
    assert.equal(cache.get(2), 2);
  });

  it("update existing key refreshes recency", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(1, 10);
    cache.put(3, 3);
    assert.equal(cache.get(2), -1);
    assert.equal(cache.get(1), 10);
    assert.equal(cache.get(3), 3);
  });

  it("get refreshes recency", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    assert.equal(cache.get(1), 1);
    cache.put(3, 3);
    assert.equal(cache.get(2), -1);
    assert.equal(cache.get(1), 1);
  });

  it("missing key", () => {
    const cache = new LRUCache(2);
    assert.equal(cache.get(9), -1);
  });

  it("overwrite value", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(1, 100);
    assert.equal(cache.get(1), 100);
  });

  it("evict in order without gets", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    assert.equal(cache.get(1), -1);
    assert.equal(cache.get(2), 2);
    assert.equal(cache.get(3), 3);
  });

  it("update at capacity does not evict other keys", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(2, 20);
    assert.equal(cache.get(1), 1);
    assert.equal(cache.get(2), 20);
  });

  it("overwrite below capacity does not inflate size", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(1, 100);
    cache.put(2, 2);
    assert.equal(cache.get(1), 100);
    assert.equal(cache.get(2), 2);
  });

  it("overwrite with spare capacity keeps other keys", () => {
    const cache = new LRUCache(3);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(1, 10);
    cache.put(3, 3);
    assert.equal(cache.get(1), 10);
    assert.equal(cache.get(2), 2);
    assert.equal(cache.get(3), 3);
  });

  it("update middle key at capacity does not evict others", () => {
    const cache = new LRUCache(3);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    cache.put(2, 20);
    assert.equal(cache.get(1), 1);
    assert.equal(cache.get(2), 20);
    assert.equal(cache.get(3), 3);
  });

  it("stored -1 is a real value and refreshes recency", () => {
    const cache = new LRUCache(2);
    cache.put(1, -1);
    cache.put(2, 2);
    assert.equal(cache.get(1), -1);
    cache.put(3, 3);
    assert.equal(cache.get(2), -1);
    assert.equal(cache.get(1), -1);
    assert.equal(cache.get(3), 3);
  });
});
