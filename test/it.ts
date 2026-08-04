import { it as nodeIt, type TestContext } from "node:test";

/** Default timeout applied to every `it(...)` in this repo. */
export const TEST_TIMEOUT_MS = 2_000;

type TestFn = (t: TestContext) => void | Promise<void>;

type ItOptions = {
  timeout?: number;
  skip?: boolean | string;
  todo?: boolean | string;
  only?: boolean;
};

/**
 * Drop-in replacement for `it` from `node:test` with a per-test timeout.
 * Suites (`describe`) are not limited by this — only each individual `it`.
 *
 * Note: a synchronous infinite loop blocks the event loop, so this timeout
 * cannot fire until the loop yields. The portal additionally kills the test
 * process after 2s with no output (SIGKILL).
 */
export function it(name: string, fn: TestFn): void;
export function it(name: string, options: ItOptions, fn: TestFn): void;
export function it(
  name: string,
  optionsOrFn: ItOptions | TestFn,
  fn?: TestFn,
): void {
  if (typeof optionsOrFn === "function") {
    nodeIt(name, { timeout: TEST_TIMEOUT_MS }, optionsOrFn);
    return;
  }
  nodeIt(name, { timeout: TEST_TIMEOUT_MS, ...optionsOrFn }, fn!);
}
