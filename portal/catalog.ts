/**
 * Catalog helpers. Family is the first `**Topics:**` tag in PROBLEM.md.
 */
export const FAMILIES = [
  "Arrays",
  "Strings",
  "Linked List",
  "Binary tree",
  "Balanced BST",
  "Graph",
  "Design",
  "Sorting",
  "Counting",
  "Combinatorics",
  "Probability",
  "NP-complete",
] as const;

export type Family = (typeof FAMILIES)[number];

export function familyRank(family: string | null): number {
  if (!family) return FAMILIES.length;
  const i = FAMILIES.indexOf(family as Family);
  return i === -1 ? FAMILIES.length : i;
}
