import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { commonSubseqLen } from "./commonSubseqLen";

describe("commonSubseqLen", () => {
  it("example 1", () => {
    assert.equal(commonSubseqLen("portal", "trail"), 3);
  });

  it("identical strings", () => {
    assert.equal(commonSubseqLen("wave", "wave"), 4);
  });

  it("no shared letters", () => {
    assert.equal(commonSubseqLen("xyz", "abc"), 0);
  });

  it("empty on either side", () => {
    assert.equal(commonSubseqLen("", "ab"), 0);
    assert.equal(commonSubseqLen("ab", ""), 0);
    assert.equal(commonSubseqLen("", ""), 0);
  });

  it("repeated letters", () => {
    assert.equal(commonSubseqLen("aaaa", "aa"), 2);
  });

  it("contiguous is not required", () => {
    assert.equal(commonSubseqLen("qrst", "qt"), 2);
  });
});
