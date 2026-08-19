import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { palindromeKeep } from "./palindromeKeep";

describe("palindromeKeep", () => {
  it("example 1", () => {
    assert.equal(palindromeKeep("abca"), 3);
  });

  it("already a palindrome", () => {
    assert.equal(palindromeKeep("tenet"), 5);
  });

  it("all unique letters", () => {
    assert.equal(palindromeKeep("xyz"), 1);
  });

  it("empty and single", () => {
    assert.equal(palindromeKeep(""), 0);
    assert.equal(palindromeKeep("a"), 1);
  });

  it("repeated letters", () => {
    assert.equal(palindromeKeep("aa"), 2);
    assert.equal(palindromeKeep("aaa"), 3);
  });

  it("contiguous is not required", () => {
    assert.equal(palindromeKeep("character"), 5);
  });

  it("even-length keep", () => {
    assert.equal(palindromeKeep("abba"), 4);
    assert.equal(palindromeKeep("abb"), 2);
  });
});
