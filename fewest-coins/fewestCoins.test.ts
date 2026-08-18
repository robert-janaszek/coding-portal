import assert from "node:assert/strict";
import { describe } from "node:test";
import { it } from "../test/it";
import { fewestCoins } from "./fewestCoins";

/** Min coins by DFS — only for tiny inputs. */
function naive(coins: number[], amount: number): number {
  const INF = amount + 1;
  const dfs = (remain: number): number => {
    if (remain === 0) return 0;
    if (remain < 0) return INF;
    let best = INF;
    for (const c of coins) {
      best = Math.min(best, dfs(remain - c) + 1);
    }
    return best;
  };
  const ans = dfs(amount);
  return ans >= INF ? -1 : ans;
}

describe("fewestCoins", () => {
  it("example 1", () => {
    assert.equal(fewestCoins([2, 7, 9], 11), 2);
  });

  it("example 2 — impossible", () => {
    assert.equal(fewestCoins([4], 7), -1);
  });

  it("example 3 — zero amount", () => {
    assert.equal(fewestCoins([3], 0), 0);
  });

  it("example 4 — greedy is wrong", () => {
    assert.equal(fewestCoins([1, 3, 4], 6), 2);
  });

  it("single denomination too large", () => {
    assert.equal(fewestCoins([5], 3), -1);
  });

  it("all ones", () => {
    assert.equal(fewestCoins([1, 2, 5], 100), 20);
  });

  it("mixed coins amount 27", () => {
    assert.equal(fewestCoins([2, 5, 10, 1], 27), 4);
  });

  describe("naive cross-check", () => {
    const cases: [number[], number][] = [
      [[1, 2, 5], 11],
      [[2], 3],
      [[1, 3, 4], 6],
      [[5], 3],
      [[2, 4], 0],
    ];
    for (const [coins, amount] of cases) {
      it(`${JSON.stringify(coins)} amount=${amount}`, () => {
        assert.equal(fewestCoins(coins, amount), naive(coins, amount));
      });
    }
  });

  it("larger amount, greedy-looking denominations", () => {
    assert.equal(fewestCoins([186, 419, 83, 408], 6249), 20);
  });
});
