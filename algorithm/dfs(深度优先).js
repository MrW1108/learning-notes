// const node = {
//   val,
//   left,
//   right,
// };

/**
 *
 *       1
 *      / \
 *     2   3
 *    / \
 *   4   5
 *
 */

// 前序 1 → 2 → 4 → 5 → 3
const dfs1 = (root) => {
  const res = [];
  const fn = (node) => {
    res.push(node.val);
    if (node.left) fn(node.left);
    if (node.right) fn(node.right);
  };
  fn(root);
  return res;
};

// 中序 4 → 2 → 5 → 1 → 3
const dfs2 = (root) => {
  const res = [];
  const fn = (node) => {
    if (node.left) fn(node.left);
    res.push(node.val);
    if (node.right) fn(node.right);
  };
  fn(root);
  return res;
};

// 后序 4 → 5 → 2 → 3 → 1
const dfs3 = (root) => {
  const res = [];
  const fn = (node) => {
    if (node.left) fn(node.left);
    if (node.right) fn(node.right);
    res.push(node.val);
  };
  fn(root);
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
const res1 = dfs1(tree);
console.log("前序：", res1);
const res2 = dfs2(tree);
console.log("中序：", res2);
const res3 = dfs3(tree);
console.log("后序：", res3);
