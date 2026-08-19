import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { commonSubsequence } from "./commonSubsequence";

describe("commonSubsequence", () => {
  it("example 1", () => {
    assert.equal(commonSubsequence("portal", "trail"), 3);
  });

  it("identical strings", () => {
    assert.equal(commonSubsequence("wave", "wave"), 4);
  });

  it("no shared letters", () => {
    assert.equal(commonSubsequence("xyz", "abc"), 0);
  });

  it("empty on either side", () => {
    assert.equal(commonSubsequence("", "ab"), 0);
    assert.equal(commonSubsequence("ab", ""), 0);
    assert.equal(commonSubsequence("", ""), 0);
  });

  it("repeated letters", () => {
    assert.equal(commonSubsequence("aaaa", "aa"), 2);
  });

  it("contiguous is not required", () => {
    assert.equal(commonSubsequence("qrst", "qt"), 2);
  });

  it("interleaved matches are not greedy", () => {
    assert.equal(commonSubsequence("abab", "baba"), 3);
  });

  it("skips shared letters when a longer path exists", () => {
    assert.equal(commonSubsequence("aggtab", "gxtxayb"), 4);
    assert.equal(commonSubsequence("abcbdab", "bdcaba"), 4);
  });
});
