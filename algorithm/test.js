/**
n 个孩子站成一排。给你一个整数数组 ratings 表示每个孩子的评分。

你需要按照以下要求，给这些孩子分发糖果：

每个孩子至少分配到 1 个糖果。
相邻两个孩子评分更高的孩子会获得更多的糖果。
请你给每个孩子分发糖果，计算并返回需要准备的 最少糖果数目 。

示例 1：

输入：ratings = [1,0,2]
输出：5
解释：你可以分别给第一个、第二个、第三个孩子分发 2、1、2 颗糖果。

输入：ratings = [1,2,2]
输出：4
解释：你可以分别给第一个、第二个、第三个孩子分发 1、2、1 颗糖果。
     第三个孩子只得到 1 颗糖果，这满足题面中的两个条件。

     [9,5,8,4,2,6,7]

      [2, 1, 2, 1,]
 */
var candy = function(ratings) {
  const n = ratings.length;
  let res = 1;
  let pre = 1;
  for(let i = 1; i < n; i++) {
    if(ratings[i] > ratings[i - 1]) {
      res += pre + 1;
      pre = pre + 1
    }else {
      res += pre + 1;
    }
  }
};
const gas = [1,0,2]

const res = candy(gas)
 
console.log(res)