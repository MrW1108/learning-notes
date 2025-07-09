/**
 * 数字全排列， 元素可以重复
 */
const test = (arr) => {
  const res = [];
  const vis = new Array(arr.length).fill(false);
  const traverse = (index, visitedArr) => {
    if (index === arr.length) {
      res.push(visitedArr.slice());
      return;
    }
    for (let i = 0; i < arr.length; i++) {
      if (vis[i] || (i > 0 && arr[i] === arr[i - 1] && !vis[i - 1])) {
        continue;
      }
      vis[i] = true;
      visitedArr.push(arr[i]);
      traverse(index + 1, visitedArr);
      vis[i] = false;
      visitedArr.pop();
    }
  };
  arr = arr.sort();
  traverse(0, []);
  return res;
};

console.log(test([1, 1, 3]));
