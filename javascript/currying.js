/**
 * 实现函数柯里化
 */
function currying(fn, ...bindArgs) {
  return function (...args) {
    const allArgs = [...bindArgs, ...args];
    if (allArgs.length < fn.length) {
      // Function.length 函数形参的数量
      return currying(fn, ...allArgs);
    } else {
      return fn(...allArgs);
    }
  };
}

const add = (a, b, c, d) => a + b + c + d;
const curryingAdd = currying(add, 10);
console.log(curryingAdd(1, 2, 3));
console.log(curryingAdd(1, 2)(3));
console.log(curryingAdd(1)(2)(3));
