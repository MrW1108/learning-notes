/**
 * 题目：路径之谜
 * 给定一个 n * n 的网格，需要找到一条左上角到右下角的路径，每个格子只能走一次。
 * 现在给定两个整数数组 col, row， 对应每行每列，要求路径所经过的格子按行列分别计数，等于 col, row 对应的值， 1 <= n <= 20
 */
function pathPuzzle(row, col, n) {
  const dx = [0, 0, 1, -1]
  const dy = [1, -1, 0, 0]

  // 1. 确定状态
  const vis = Array.from(new Array(n), () => new Array(n).fill(false)); // 记录每个格子是否走过
  const path = [] // 记录走过的路径

  function dfs(x, y) {
    // console.log(x, y, row, col, path, vis.toString())
    // 2. 非法状态
    if(x < 0 || x >= n || y < 0 || y >= n) {
      return false
    }
    if(vis[x][y]){
      return false
    }
    if(row[x] === 0 || col[y] === 0) {
      return false
    }

    // 3. 更新状态
    row[x]--;
    col[y]--;
    vis[x][y] = true;
    path.push(x * n + y);

    // 4. 结束状态
    function accumulate(arr) {
      // 行列格子数
      return arr.reduce((a, b) => a + b)
    }
    if(x === n - 1 && y === n - 1 && accumulate(row) === 0 &&  accumulate(col) === 0) {
      return true
    }

    // 5. 状态转移
    // 当前格子向上下左右四个方向枚举
    for (let d = 0; d < 4; d++) {
      if(dfs(x + dx[d], y + dy[d])) {
        return true
      }
    }
    // 6. 还原状态
    row[x]++;
    col[y]++;
    vis[x][y] = false;
    path.pop()
    return false;
  }

  dfs(0, 0)
  return path
}

// 测试用例
const row = [4, 3, 3, 3]
const col = [2, 4, 3, 4]
const n = 4

const path = pathPuzzle(row, col, n)
console.log(path)