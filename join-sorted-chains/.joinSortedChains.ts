export class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val = 0, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

export function joinSortedChains(
  chains: (ListNode | null)[],
): ListNode | null {
  void chains;
  throw new Error("Not implemented");
}
