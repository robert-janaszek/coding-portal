import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { twoSourceWeave } from "./twoSourceWeave";

/** Recurse on unused prefixes — only for short strings. */
function naive(left: string, right: string, woven: string): boolean {
  if (left.length + right.length !== woven.length) return false;
  const dfs = (i: number, j: number): boolean => {
    if (i + j === woven.length) return true;
    const ch = woven[i + j]!;
    if (i < left.length && left[i] === ch && dfs(i + 1, j)) return true;
    if (j < right.length && right[j] === ch && dfs(i, j + 1)) return true;
    return false;
  };
  return dfs(0, 0);
}

describe("twoSourceWeave", () => {
  describe("examples", () => {
    it("example 1: alternating take", () => {
      assert.equal(twoSourceWeave("ace", "bd", "abcde"), true);
    });

    it("example 2: breaks right-hand order", () => {
      assert.equal(twoSourceWeave("abc", "def", "abedcf"), false);
    });

    it("example 3: duplicate letters", () => {
      assert.equal(twoSourceWeave("aa", "ab", "aaba"), true);
    });
  });

  describe("empties", () => {
    it("all empty", () => {
      assert.equal(twoSourceWeave("", "", ""), true);
    });

    it("one source empty, woven matches the other", () => {
      assert.equal(twoSourceWeave("portal", "", "portal"), true);
      assert.equal(twoSourceWeave("", "trail", "trail"), true);
    });

    it("one source empty, woven differs", () => {
      assert.equal(twoSourceWeave("a", "", "b"), false);
    });
  });

  describe("length", () => {
    it("too short", () => {
      assert.equal(twoSourceWeave("ab", "c", "ab"), false);
    });

    it("too long", () => {
      assert.equal(twoSourceWeave("ab", "c", "abcx"), false);
    });
  });

  describe("order", () => {
    it("concatenated left then right", () => {
      assert.equal(twoSourceWeave("ab", "cd", "abcd"), true);
    });

    it("concatenated right then left", () => {
      assert.equal(twoSourceWeave("ab", "cd", "cdab"), true);
    });

    it("right's second character appears too early", () => {
      assert.equal(twoSourceWeave("ab", "cd", "abdc"), false);
    });

    it("mixed take is allowed", () => {
      assert.equal(twoSourceWeave("ab", "cd", "acbd"), true);
    });

    it("cannot skip the next character of a source", () => {
      assert.equal(twoSourceWeave("ab", "cd", "adbc"), false);
    });
  });

  describe("naive cross-check", () => {
    const cases: [string, string, string][] = [
      ["", "", ""],
      ["a", "", "a"],
      ["", "b", "b"],
      ["a", "b", "ab"],
      ["a", "b", "ba"],
      ["a", "b", "aa"],
      ["aa", "ab", "aaba"],
      ["aa", "ab", "abaa"],
      ["aa", "ab", "baaa"],
      ["ace", "bd", "abcde"],
      ["ace", "bd", "abced"],
      ["abc", "def", "abedcf"],
      ["xyz", "abc", "xaybzc"],
      ["aab", "axy", "aaxaby"],
      ["aaaa", "aaa", "aaaaaaa"],
    ];
    for (const [left, right, woven] of cases) {
      it(`naive: "${left}" × "${right}" → "${woven}"`, () => {
        assert.equal(twoSourceWeave(left, right, woven), naive(left, right, woven));
      });
    }
  });
});
