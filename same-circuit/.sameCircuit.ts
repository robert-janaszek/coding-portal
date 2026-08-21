export type CircuitOp =
  | ["link", number, number]
  | ["check", number, number];

export function sameCircuit(n: number, ops: CircuitOp[]): boolean[] {
  void n;
  void ops;
  throw new Error("Not implemented");
}
