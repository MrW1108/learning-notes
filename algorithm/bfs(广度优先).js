/**
 *
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 *
 *   1 → 2 →3 → 4 → 5
 */

const bfs = (root) => {
  if (!root) return [];
  const queue = [root];
  const res = [];
  while (queue.length) {
    const node = queue.shift();
    res.push(node.val);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return res;
};

const tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: null,
    },
    right: {
      val: 5,
      left: null,
      right: null,
    },
  },
  right: {
    val: 3,
    left: null,
    right: null,
  },
};

console.log(bfs(tree));
