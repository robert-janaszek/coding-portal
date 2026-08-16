import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { generateParenthesis } from "./generateParenthesis";

function assertSameStrings(actual: string[], expected: string[]) {
  assert.deepEqual([...actual].sort(), [...expected].sort());
}

describe("generateParenthesis", () => {
  it("example 1", () => {
    assertSameStrings(generateParenthesis(3), [
      "((()))",
      "(()())",
      "(())()",
      "()(())",
      "()()()",
    ]);
  });

  it("example 2", () => {
    assertSameStrings(generateParenthesis(1), ["()"]);
  });

  it("example 3", () => {
    assertSameStrings(generateParenthesis(2), ["(())", "()()"]);
  });

  it("n = 4 has 14 strings (Catalan)", () => {
    assert.equal(generateParenthesis(4).length, 14);
  });

  it("every string has length 2n", () => {
    const n = 3;
    for (const s of generateParenthesis(n)) {
      assert.equal(s.length, 2 * n);
    }
  });
});
