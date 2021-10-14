/**
 * 实现Promise.all()
 * @param {可迭代的对象} iterable 
 * @returns Promise
 */
function myPromisAll(iterable) {
    const promises = Array.from(iterable);
    const len = promises.length;
    var result = [];
    return new Promise((resolve, reject) => {
        promises.forEach((p, index) => {
            Promise.resolve(p).then(
                value => {
                    result.push(value);
                    if (index + 1 === len) return resolve(result);
                },
                reason => {
                    reject(reason)
                }
            )
        })
    })
}