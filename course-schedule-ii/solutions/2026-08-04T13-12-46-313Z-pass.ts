type Node = {
  next: number[];
  degree: number;
};

const emit = (i: number, nodes: Node[], result: number[], queue: number[]) => {
  result.push(i);
  nodes[i].next.forEach((n) => {
    nodes[n].degree--;

    if (nodes[n].degree === 0) {
      queue.push(n);
    }
  });
};

export function findOrder(
  numCourses: number,
  prerequisites: [number, number][],
): number[] {
  const nodes: Node[] = [];

  for (let i = 0; i < numCourses; i++) {
    nodes[i] = {
      next: [],
      degree: 0,
    };
  }

  for (let i = 0; i < prerequisites.length; i++) {
    const ai = prerequisites[i][0];
    const bi = prerequisites[i][1];
    nodes[ai].degree++;
    nodes[bi].next.push(ai);
  }

  let queue: number[] = [];
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].degree === 0) {
      queue.push(i);
    }
  }

  const result: number[] = [];

  while (queue.length > 0) {
    const nextQueue: number[] = [];
    queue.forEach((i) => emit(i, nodes, result, nextQueue));

    queue = nextQueue;
  }

  if (result.length !== numCourses) {
    return [];
  }

  return result;
}
