import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import {
  parseSpecResults,
  parseTestsFromSource,
  statusesFromSpecResults,
} from "./parseTests";

describe("parseTestsFromSource", () => {
  it("joins describe + it into node:test fullName", () => {
    const tests = parseTestsFromSource(`
      describe("knightSurvivalProbability", () => {
        it("k = 0 is always 1", () => {});
      });
    `);
    assert.deepEqual(tests, [
      {
        name: "k = 0 is always 1",
        fullName: "knightSurvivalProbability k = 0 is always 1",
        suites: ["knightSurvivalProbability"],
      },
    ]);
  });

  it("uses enclosing describe as fullName for interpolated it titles", () => {
    const tests = parseTestsFromSource(`
      describe("knightSurvivalProbability", () => {
        describe("naive cross-check (small k)", () => {
          for (const [n, k, r, c] of cases) {
            it(\`n=\${n} k=\${k} (\${r},\${c})\`, () => {});
          }
        });
      });
    `);
    assert.equal(tests.length, 1);
    assert.equal(tests[0]!.name, "n=${n} k=${k} (${r},${c})");
    assert.equal(tests[0]!.fullName, "knightSurvivalProbability naive cross-check (small k)");
    assert.deepEqual(tests[0]!.suites, [
      "knightSurvivalProbability",
      "naive cross-check (small k)",
    ]);
  });
});

describe("statusesFromSpecResults", () => {
  it("maps generated-case reporter lines onto the enclosing describe", () => {
    const tests = parseTestsFromSource(`
      describe("knightSurvivalProbability", () => {
        describe("naive cross-check (small k)", () => {
          it(\`n=\${n} k=\${k} (\${r},\${c})\`, () => {});
        });
      });
    `);
    const spec = `
▶ knightSurvivalProbability
  ▶ naive cross-check (small k)
    ✔ n=3 k=1 (0,0) (0.4ms)
    ✔ n=3 k=2 (1,1) (0.1ms)
  ✔ naive cross-check (small k) (0.9ms)
✔ knightSurvivalProbability (1.5ms)
`;
    const mapped = statusesFromSpecResults(tests, parseSpecResults(spec));
    assert.equal(mapped.get("knightSurvivalProbability naive cross-check (small k)"), "pass");
  });
});
