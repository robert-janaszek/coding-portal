import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { LRUCache } from "./LRUCache.ts";

describe("LRUCache", () => {
  it("example", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    assert.equal(cache.get(1), 1);
    cache.put(3, 3);
    assert.equal(cache.get(2), -1);
    cache.put(4, 4);
    assert.equal(cache.get(1), -1);
    assert.equal(cache.get(3), 3);
    assert.equal(cache.get(4), 4);
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
});
