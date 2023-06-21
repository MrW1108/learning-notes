/**
 * 实现Promise.all()
 * 注意参数是 iterable 类型，Array、Map、Set
 * @param {可迭代的对象} iterable
 * @returns Promise
 */
function myPromisAll(iterable) {
  let result = [];
  let fulfilledCount = 0;
  const promises = Array.from(iterable);
  return new Promise((resolve, reject) => {
    promises.forEach((prom, i) => {
      Promise.resolve(prom).then(
        (data) => {
          result[i] = data;
          fulfilledCount++;
          if (fulfilledCount === promises.length) {
            resolve(result);
          }
        },
        (reason) => {
          reject(reason);
        }
      );
    });
    if (promises.length === 0) {
      resolve(result);
    }
  });
}


// test
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(2);
  }, 2000);
});

myPromisAll([p1, 10]).then((res) => {
  console.log(res); // [2, 20]
});

