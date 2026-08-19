# Tree Iterator (DFS & BFS)

**Difficulty:** Medium  
**Topics:** Binary tree, Design  
**Target:** `O(n)` time to walk the whole tree; DFS `O(h)` extra space, BFS `O(w)` extra space (`h` = height, `w` = max width)

## Problem

Implement **four** ways to iterate a binary tree and produce node values. Two traversals × two JavaScript iterator styles.

### Traversals

- **DFS preorder:** visit the node, then the left subtree, then the right subtree.
- **BFS (level order):** visit nodes left-to-right, one level at a time.

### Iterator styles

**1. Generator (`yield`)** — `function*` that `yield`s each value as it goes. JS builds the iterator protocol for you. Callers can use `for...of` or spread (`[...dfsPreorder(root)]`).

**2. Manual `next()`** — return a plain object that implements the [iterator protocol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols):

```
it.next() → { value: number, done: false }  // one more node
it.next() → { value: undefined, done: true } // finished
```

Values must be produced lazily as the caller asks for them. `createDfsIterator` / `createBfsIterator` must return a plain iterator object — not a generator.

`root === null` is an empty walk: a generator yields nothing; a manual iterator’s first `next()` is already `{ done: true }`.

### API

```ts
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

function* dfsPreorder(root: TreeNode | null): Generator<number>
function* bfsLevelOrder(root: TreeNode | null): Generator<number>

function createDfsIterator(root: TreeNode | null): Iterator<number>
function createBfsIterator(root: TreeNode | null): Iterator<number>
```

Both styles of the same traversal must produce the **same sequence**.

## Examples

```
Tree:
      1
     / \
    2   3
   / \ / \
  4  5 6  7

DFS preorder:  1, 2, 4, 5, 3, 6, 7
BFS level-order: 1, 2, 3, 4, 5, 6, 7
```

```
Input:  root = null
DFS / BFS:  []
```

```
Input:  single node 42
DFS / BFS:  [42]
```

```ts
const it = createDfsIterator(root); // the tree above
it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
// ...
it.next(); // { value: 7, done: false }
it.next(); // { value: undefined, done: true }
it.next(); // still { done: true }
```

```ts
[...dfsPreorder(root)]   // [1, 2, 4, 5, 3, 6, 7]
[...bfsLevelOrder(root)] // [1, 2, 3, 4, 5, 6, 7]
```

## Constraints

- `0 <= n <= 10^4` nodes (tests are smaller)
- node values fit in JS `number`
- left child before right child at every step

## Files

| File | Role |
|------|------|
| `treeIterator.ts` | Stub — implement here (`TreeNode` + four exports) |
| `treeIterator.test.ts` | Tests |
| `solutions/` | Archived attempts (spoilers) |
| `HINTS.md` | Spoilers — open only if stuck |

```bash
npm run test:tree-iterator
```
