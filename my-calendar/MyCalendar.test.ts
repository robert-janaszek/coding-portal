import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { MyCalendar } from "./MyCalendar";

describe("MyCalendar", () => {
  it("example 1", () => {
    const cal = new MyCalendar();
    assert.equal(cal.book(10, 20), true);
    assert.equal(cal.book(15, 25), false);
    assert.equal(cal.book(20, 30), true);
  });

  it("example 2", () => {
    const cal = new MyCalendar();
    assert.equal(cal.book(47, 50), true);
    assert.equal(cal.book(33, 41), true);
    assert.equal(cal.book(39, 45), false);
    assert.equal(cal.book(33, 42), false);
    assert.equal(cal.book(25, 32), true);
    assert.equal(cal.book(26, 35), false);
    assert.equal(cal.book(19, 25), true);
    assert.equal(cal.book(3, 8), true);
    assert.equal(cal.book(8, 13), true);
    assert.equal(cal.book(18, 27), false);
  });

  it("empty then single booking", () => {
    const cal = new MyCalendar();
    assert.equal(cal.book(0, 1), true);
  });

  it("touching endpoints allowed", () => {
    const cal = new MyCalendar();
    assert.equal(cal.book(1, 5), true);
    assert.equal(cal.book(5, 10), true);
    assert.equal(cal.book(10, 12), true);
    assert.equal(cal.book(0, 1), true);
  });

  it("rejected booking does not persist", () => {
    const cal = new MyCalendar();
    assert.equal(cal.book(10, 20), true);
    assert.equal(cal.book(15, 18), false);
    assert.equal(cal.book(20, 25), true);
    assert.equal(cal.book(18, 20), true);
  });

  it("contained interval rejected", () => {
    const cal = new MyCalendar();
    assert.equal(cal.book(10, 30), true);
    assert.equal(cal.book(15, 20), false);
  });

  it("containing interval rejected", () => {
    const cal = new MyCalendar();
    assert.equal(cal.book(15, 20), true);
    assert.equal(cal.book(10, 30), false);
  });

  it("identical interval rejected", () => {
    const cal = new MyCalendar();
    assert.equal(cal.book(5, 10), true);
    assert.equal(cal.book(5, 10), false);
  });

  it("many non-overlapping ascending", () => {
    const cal = new MyCalendar();
    for (let i = 0; i < 50; i++) {
      assert.equal(cal.book(i * 2, i * 2 + 1), true);
    }
    assert.equal(cal.book(0, 2), false);
    assert.equal(cal.book(99, 100), true);
  });

  it("insert between existing gaps", () => {
    const cal = new MyCalendar();
    assert.equal(cal.book(10, 20), true);
    assert.equal(cal.book(40, 50), true);
    assert.equal(cal.book(20, 30), true);
    assert.equal(cal.book(30, 40), true);
    assert.equal(cal.book(25, 35), false);
  });
});
