import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { OrderedMap } from "./OrderedMap";

describe("OrderedMap", () => {
  it("example", () => {
    const m = new OrderedMap();
    m.set(10, 100);
    m.set(20, 200);
    m.set(30, 300);

    assert.equal(m.get(20), 200);
    assert.equal(m.get(15), null);
    assert.equal(m.has(10), true);
    assert.equal(m.size(), 3);

    assert.equal(m.floorKey(25), 20);
    assert.equal(m.floorKey(10), 10);
    assert.equal(m.floorKey(5), null);

    assert.equal(m.ceilingKey(25), 30);
    assert.equal(m.ceilingKey(30), 30);
    assert.equal(m.ceilingKey(35), null);

    m.set(20, 999);
    assert.equal(m.get(20), 999);

    assert.equal(m.delete(20), true);
    assert.equal(m.has(20), false);
    assert.equal(m.floorKey(25), 10);
    assert.equal(m.ceilingKey(15), 30);
    assert.equal(m.size(), 2);
  });

  it("empty map", () => {
    const m = new OrderedMap();
    assert.equal(m.size(), 0);
    assert.equal(m.get(1), null);
    assert.equal(m.has(1), false);
    assert.equal(m.delete(1), false);
    assert.equal(m.floorKey(0), null);
    assert.equal(m.ceilingKey(0), null);
  });

  it("overwrite does not change size", () => {
    const m = new OrderedMap();
    m.set(1, 10);
    m.set(1, 20);
    assert.equal(m.size(), 1);
    assert.equal(m.get(1), 20);
  });

  it("delete missing returns false", () => {
    const m = new OrderedMap();
    m.set(1, 1);
    assert.equal(m.delete(2), false);
    assert.equal(m.size(), 1);
  });

  it("delete then reinsert", () => {
    const m = new OrderedMap();
    m.set(5, 50);
    assert.equal(m.delete(5), true);
    assert.equal(m.has(5), false);
    assert.equal(m.size(), 0);
    m.set(5, 55);
    assert.equal(m.get(5), 55);
    assert.equal(m.size(), 1);
  });

  it("negative and zero keys", () => {
    const m = new OrderedMap();
    m.set(-3, 1);
    m.set(0, 2);
    m.set(4, 3);

    assert.equal(m.floorKey(-1), -3);
    assert.equal(m.floorKey(0), 0);
    assert.equal(m.ceilingKey(-2), 0);
    assert.equal(m.ceilingKey(-10), -3);
    assert.equal(m.floorKey(-10), null);
  });

  it("floor and ceiling on single key", () => {
    const m = new OrderedMap();
    m.set(7, 70);
    assert.equal(m.floorKey(7), 7);
    assert.equal(m.ceilingKey(7), 7);
    assert.equal(m.floorKey(6), null);
    assert.equal(m.ceilingKey(8), null);
  });

  it("dense keys floor and ceiling", () => {
    const m = new OrderedMap();
    for (let i = 0; i < 20; i++) m.set(i * 2, i);

    assert.equal(m.floorKey(7), 6);
    assert.equal(m.ceilingKey(7), 8);
    assert.equal(m.floorKey(0), 0);
    assert.equal(m.ceilingKey(38), 38);
    assert.equal(m.ceilingKey(39), null);
    assert.equal(m.floorKey(-1), null);
  });

  it("stored nullish-looking values are real", () => {
    const m = new OrderedMap();
    m.set(1, 0);
    m.set(2, -1);
    assert.equal(m.get(1), 0);
    assert.equal(m.get(2), -1);
    assert.equal(m.has(1), true);
  });

  it("ascending inserts then deletes", () => {
    const m = new OrderedMap();
    for (let i = 1; i <= 10; i++) m.set(i, i * 10);
    assert.equal(m.size(), 10);

    for (let i = 1; i <= 10; i += 2) assert.equal(m.delete(i), true);
    assert.equal(m.size(), 5);
    assert.equal(m.floorKey(5), 4);
    assert.equal(m.ceilingKey(5), 6);
    assert.equal(m.has(5), false);
    assert.equal(m.has(6), true);
  });

  it("descending inserts", () => {
    const m = new OrderedMap();
    for (let i = 10; i >= 1; i--) m.set(i, i);
    assert.equal(m.size(), 10);
    assert.equal(m.floorKey(5), 5);
    assert.equal(m.ceilingKey(5), 5);
    assert.equal(m.get(1), 1);
    assert.equal(m.get(10), 10);
  });

  it("interleaved set delete floor ceiling", () => {
    const m = new OrderedMap();
    m.set(50, 1);
    m.set(25, 2);
    m.set(75, 3);
    m.set(10, 4);
    m.set(30, 5);
    m.set(60, 6);
    m.set(90, 7);

    assert.equal(m.delete(25), true);
    assert.equal(m.delete(75), true);
    assert.equal(m.floorKey(40), 30);
    assert.equal(m.ceilingKey(40), 50);
    assert.equal(m.floorKey(75), 60);
    assert.equal(m.ceilingKey(75), 90);
    assert.equal(m.size(), 5);
  });
});
