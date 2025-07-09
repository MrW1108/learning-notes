/**
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

const nums = [0, 1, 0, 3, 2, 3];
console.log(lengthOfLIS(nums));
