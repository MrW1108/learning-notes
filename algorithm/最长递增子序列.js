const maxSlidingWindow = function(nums, k) {
  const q = []
  for (let i = 0; i < k; i++) {
    while(q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop()
    }
    q.push(i)
  }
  const res = [nums[q[0]]]
  for(let i = k; i< nums.length; i++) {
    while(q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop()
    }
    q.push(i)
    if(q[0] < i - k) {
      q.shift()
    }
    res.push(nums[q[0]])
  }
  return res;
};

const arr = [1,2,5,6,4]
console.log(maxSlidingWindow(arr, 3))