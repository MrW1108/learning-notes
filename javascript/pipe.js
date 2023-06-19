/**
 * pipe 与 compose 函数相似，只是数据流向不同。是从左向右
 */
function pipe(...fns) {
  return function (x) {
    fns.reduce((arg, fn) => fn(x), arg);
  };
}
