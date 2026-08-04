class Heap {
  public data: number[] = []

  public add(key: number) {
    this.data[this.data.length] = key;
    this.bubbleUp(this.data.length - 1);
  }

  public pop(): number {
    const value = this.data[0];
    if (this.data.length === 1) {
      return this.data.pop() as number;
    }
    this.data[0] = this.data.pop() as number;

    this.bubbleDown(0);

    return value;
  }

  public has() {
    return this.data.length > 0;
  }

  private bubbleUp(index: number): void {
    if (index === 0) {
      return;
    }
    const parentIndex = Math.floor((index - 1) / 2);
    const parentValue = this.data[parentIndex];
    const currentValue = this.data[index];

    if (parentValue <= currentValue) {
      return;
    }

    this.swap(parentIndex, index);
    return this.bubbleUp(parentIndex);
  }

  private bubbleDown(index: number) {
    const child1Index = index*2+1;
    const child2Index = index*2+2;

    if (child1Index >= this.data.length) {
      return;
    }
    let onlyOneChild = child2Index >= this.data.length;

    const currentVal = this.data[index];

    const child1Val = this.data[child1Index];
    const child2Val = this.data[child2Index];

    let lowerValueAt = child1Index;
    let childLowerVal = this.data[child1Index];
    if (child2Val < child1Val && !onlyOneChild) {
      lowerValueAt = child2Index;
      childLowerVal = this.data[child2Index];
    }

    if (childLowerVal >= currentVal) {
      return;
    }

    this.swap(index, lowerValueAt);
    this.bubbleDown(lowerValueAt);
  }

  private swap(index1: number, index2: number) {
    const temp = this.data[index1];
    this.data[index1] = this.data[index2];
    this.data[index2] = temp;
  }
}

export function heapSort(nums: number[]): number[] {
  const heap = new Heap();
  for (const value of nums) {
    heap.add(value)
  }

  const result = [];
  while(heap.has()) {
    const value = heap.pop();
    result.push(value);
  }

  return result;
}
