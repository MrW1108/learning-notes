/**
 *
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 *
 *   1 → 2 → 4 → 5 → 3
 */

const bfs = (root) => {
  const queue = [root];
  const res = [];
  while (queue.length) {
    const node = queue.shift();
    res.push(node.val);
    if (node.left) queue.push(left);
    if (node.right) queue.push(right);
  }
  return res;
};
