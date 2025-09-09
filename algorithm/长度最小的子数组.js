/**
 * 长度最小的子数组
 * 难度：中
 * [leetcode 209](https://leetcode.cn/problems/minimum-size-subarray-sum/description/?envType=study-plan-v2&envId=top-interview-150)

给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其总和大于等于 target 的长度最小的 子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

示例 1：

输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
示例 2：

输入：target = 4, nums = [1,4,4]
输出：1
示例 3：

输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0
 */

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const len = nums.length;
  let l = 0,
    r = 0;
  let minLen = 0;
  let count = 0;
  while (r < len && count < target) {
    while (r < len && count < target) {
      count += nums[r];
      r++;
    }
    while (l < r && count >= target) {
      minLen = minLen ? Math.min(minLen, r - l) : r - l;
      count -= nums[l];
      l++;
    }
  }
  return minLen;
};

const target = 7,
  nums = [2, 3, 1, 2, 4, 3];

const res = minSubArrayLen(target, nums);

console.log(res);
