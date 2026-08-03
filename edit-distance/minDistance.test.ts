import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { minDistance } from "./minDistance";

describe("minDistance (Edit Distance)", () => {
  it("example: horse → ros", () => {
    assert.equal(minDistance("horse", "ros"), 3);
  });

  it("example: intention → execution", () => {
    assert.equal(minDistance("intention", "execution"), 5);
  });

  it("identical strings", () => {
    assert.equal(minDistance("abc", "abc"), 0);
  });

  it("both empty", () => {
    assert.equal(minDistance("", ""), 0);
  });

  it("one empty", () => {
    assert.equal(minDistance("abc", ""), 3);
    assert.equal(minDistance("", "abc"), 3);
  });

  it("single replace", () => {
    assert.equal(minDistance("a", "b"), 1);
  });

  it("insert only", () => {
    assert.equal(minDistance("a", "abc"), 2);
  });

  it("delete only", () => {
    assert.equal(minDistance("abc", "a"), 2);
  });

  it("completely different same length", () => {
    assert.equal(minDistance("abc", "xyz"), 3);
  });

  it("prefix shared", () => {
    assert.equal(minDistance("kitten", "sitting"), 3);
  });

  it("one char vs longer", () => {
    assert.equal(minDistance("a", "abcdef"), 5);
  });

  it("near miss", () => {
    assert.equal(minDistance("saturday", "sunday"), 3);
  });
});
