/**
 * 对于一个整数数组arr,将数组中的每个元素替换为它们排序(从小到大）后的序号,如果两个元素相等，那么它们的序号相同。
 * @param {Array} arr
 * @returns Array
 */
function answer(arr) {
  console.log(arr);
  const res = [...new Set(arr)].sort((a, b) => a - b);
  console.log(res);
  return arr.map((el) => {
    console.log(res.indexOf(el));
    return res.indexOf(el);
  });
}

console.log(answer([4, 12, 9, 22, 8]));
