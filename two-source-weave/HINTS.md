# Hints — Two-Source Weave

Spoilers. Read only after you have tried on your own.

## Idea

Boolean table on prefixes. `dp[i][j]` = whether `left[0..i)` and `right[0..j)` can form `woven[0..i + j)`.

Same grid shape as common subsequence / string conversion; the cell is a yes/no, not a length or a cost.

## Structure

If `woven.length !== left.length + right.length`, return `false`.

- `dp[0][0] = true`
- from `(i, j)` you may take `left[i]` when it equals `woven[i + j]`, or `right[j]` when it equals `woven[i + j]`
- fill by growing `i` and `j`; a cell is true if either parent is true and the matching character is taken

Empty `left` (or `right`) is just: `woven` must equal the other source.

## Complexity

`O(m * n)` cells, constant work each. A rolling row is enough for `O(min(m, n))` extra space.
