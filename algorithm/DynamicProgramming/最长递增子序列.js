/**
 * 给你一个整数数组 nums ，找到其中最长严格递增子序列的长度。
 * 子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。
 * 动态规划 dp[i] = max(dp[j]) + 1;    // 0 <= j < i
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  if (nums.length === 0) {
    return 0;
  }
  const dp = new Array(nums.length).fill({}).map((_, i) => ({
    len: 1,
    subArr: [nums[i]],
  }));
  let res = {
    len: 1,
    subArr: [nums[0]],
  };
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (dp[j].len + 1 > dp[i].len) {
          dp[i] = {
            len: dp[j].len + 1,
            subArr: dp[j].subArr.concat(nums[i]),
          };
        }
      }
    }
    if (dp[i].len > res.len) {
      res = { ...dp[i] };
    }
  }
  return res;
};

// 示例 1：

// 输入：nums = [10,9,2,5,3,7,101,18]
// 输出：4
// 解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
// 示例 2：

// 输入：nums = [0,1,0,3,2,3]
// 输出：4
// 示例 3：

// 输入：nums = [7,7,7,7,7,7,7]
// 输出：1

const nums = [0, 1, 0, 3, 2, 3];
console.log(lengthOfLIS(nums));
