/**
 * 从右向左依次执行
 */
function compose(...fns) {
  return function (arg) {
    fns.reduceRight((x, fn) => fn(x), arg);
  };
}
