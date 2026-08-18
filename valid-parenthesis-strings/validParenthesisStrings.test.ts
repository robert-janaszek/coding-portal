import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { validParenthesisStrings } from "./validParenthesisStrings";

function assertSameStrings(actual: string[], expected: string[]) {
  assert.deepEqual([...actual].sort(), [...expected].sort());
}

describe("validParenthesisStrings", () => {
  it("example 1", () => {
    assertSameStrings(validParenthesisStrings(2), ["(())", "()()"]);
  });

  it("example 2", () => {
    assertSameStrings(validParenthesisStrings(1), ["()"]);
  });

  it("three pairs has Catalan(3) = 5 strings", () => {
    assert.equal(validParenthesisStrings(3).length, 5);
  });

  it("n = 4 has 14 strings (Catalan)", () => {
    assert.equal(validParenthesisStrings(4).length, 14);
  });

  it("every string has length 2n", () => {
    const n = 3;
    for (const s of validParenthesisStrings(n)) {
      assert.equal(s.length, 2 * n);
    }
  });
});
