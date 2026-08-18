export class GraphNode {
  val: number;
  neighbors: GraphNode[];

  constructor(val = 0, neighbors: GraphNode[] = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

export function deepCopyGraph(node: GraphNode | null): GraphNode | null {
  void node;
  throw new Error("Not implemented");
}
