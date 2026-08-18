import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { stringConversionCost } from "./stringConversionCost";

describe("stringConversionCost", () => {
  it("example: kitten → mitten", () => {
    assert.equal(stringConversionCost("kitten", "mitten"), 1);
  });

  it("example: cart → cats", () => {
    assert.equal(stringConversionCost("cart", "cats"), 1);
  });

  it("identical strings", () => {
    assert.equal(stringConversionCost("abc", "abc"), 0);
  });

  it("both empty", () => {
    assert.equal(stringConversionCost("", ""), 0);
  });

  it("one empty", () => {
    assert.equal(stringConversionCost("abc", ""), 3);
    assert.equal(stringConversionCost("", "abc"), 3);
  });

  it("single replace", () => {
    assert.equal(stringConversionCost("a", "b"), 1);
  });

  it("insert only", () => {
    assert.equal(stringConversionCost("a", "abc"), 2);
  });

  it("delete only", () => {
    assert.equal(stringConversionCost("abc", "a"), 2);
  });

  it("completely different same length", () => {
    assert.equal(stringConversionCost("abc", "xyz"), 3);
  });

  it("prefix shared", () => {
    assert.equal(stringConversionCost("kitten", "sitting"), 3);
  });

  it("one char vs longer", () => {
    assert.equal(stringConversionCost("a", "abcdef"), 5);
  });

  it("near miss", () => {
    assert.equal(stringConversionCost("saturday", "sunday"), 3);
  });
});
