import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { shortestCoveringWindow } from "./shortestCoveringWindow";

function covers(window: string, t: string): boolean {
  const need = new Map<string, number>();
  for (const ch of t) need.set(ch, (need.get(ch) ?? 0) + 1);
  for (const ch of window) {
    if (!need.has(ch)) continue;
    need.set(ch, need.get(ch)! - 1);
  }
  for (const v of need.values()) if (v > 0) return false;
  return true;
}

describe("shortestCoveringWindow", () => {
  it("example 1", () => {
    assert.equal(shortestCoveringWindow("mmxymzym", "xyz"), "xymz");
  });

  it("example 2", () => {
    assert.equal(shortestCoveringWindow("k", "k"), "k");
  });

  it("example 3: impossible", () => {
    assert.equal(shortestCoveringWindow("k", "kk"), "");
  });

  it("whole string needed", () => {
    assert.equal(shortestCoveringWindow("abc", "abc"), "abc");
  });

  it("duplicates in t", () => {
    assert.equal(shortestCoveringWindow("aaflslflsldkalskaaa", "aaa"), "aaa");
  });

  it("first of equal-length windows", () => {
    const s = "ababac";
    const t = "abc";
    const got = shortestCoveringWindow(s, t);
    assert.ok(covers(got, t));
    // "abac" at index 2, or "babc"-like — first min is "abac" starting at 2? 
    // windows covering a,b,c: "abab a c" → "ababac" itself length 6;
    // "baba c" from 1: babac; "abac" from 2 length 4; "bac" from 3 length 3.
    assert.equal(got, "bac");
  });

  it("case sensitive", () => {
    assert.equal(shortestCoveringWindow("aAbBcC", "Abc"), "AbBc");
  });

  it("t longer than s", () => {
    assert.equal(shortestCoveringWindow("ab", "abc"), "");
  });

  it("scattered letters", () => {
    assert.equal(shortestCoveringWindow("cabwefgowac", "cwa"), "wac");
  });
});
