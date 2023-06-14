/**
 * 实现Promise.all()
 * @param {可迭代的对象} iterable
 * @returns Promise
 */
function myPromisAll(iterable) {
  let result = [];
  let count = 0;
  let fulfilledCount = 0;
  return new Promise((resolve, reject) => {
    // 用for...of， 因为参数是 iterable 类型（Array, Set, Map )
    for (const prom of iterable) {
      const i = count;
      count++;
      Promise.resolve(prom).then(
        (data) => {
          result[i] = data;
          fulfilledCount++;
          if (fulfilledCount === count) {
            resolve(result);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    }
    if (count === 0) {
      resolve(result);
    }
  });
}
