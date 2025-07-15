var lengthOfLongestSubstring = function (s) {
  const occ = new Set();
  const n = s.length;
  let l = 0,
    res = 0;
  for (let i = 0; i < n; i++) {
    if (!occ.has(s[i])) {
      occ.add(s[i]);
      res = Math.max(res, i - l + 1);
      continue;
    }
    while (l < i && s[l] !== s[i]) {
      occ.delete(s[l])
      l++;
    }
    l++;
    res = Math.max(res, i - l + 1);
  }
  return res;
};

const s = "tmmzuxt";5
console.log(lengthOfLongestSubstring(s))
