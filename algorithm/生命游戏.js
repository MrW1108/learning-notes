// 题目：生命游戏
// https://leetcode.cn/problems/game-of-life/description/?envType=study-plan-v2&envId=top-interview-150

// 根据 百度百科 ， 生命游戏 ，简称为 生命 ，是英国数学家约翰·何顿·康威在 1970 年发明的细胞自动机。

// 给定一个包含 m × n 个格子的面板，每一个格子都可以看成是一个细胞。每个细胞都具有一个初始状态： 1 即为 活细胞 （live），或 0 即为 死细胞 （dead）。每个细胞与其八个相邻位置（水平，垂直，对角线）的细胞都遵循以下四条生存定律：

// 如果活细胞周围八个位置的活细胞数少于两个，则该位置活细胞死亡；
// 如果活细胞周围八个位置有两个或三个活细胞，则该位置活细胞仍然存活；
// 如果活细胞周围八个位置有超过三个活细胞，则该位置活细胞死亡；
// 如果死细胞周围正好有三个活细胞，则该位置死细胞复活；
// 下一个状态是通过将上述规则同时应用于当前状态下的每个细胞所形成的，其中细胞的出生和死亡是 同时 发生的。给你 m x n 网格面板 board 的当前状态，返回下一个状态。

// 给定当前 board 的状态，更新 board 到下一个状态。

// 注意 你不需要返回任何东西。

// 输入：board = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]]
// 输出：[[0,0,0],[1,0,1],[0,1,1],[0,1,0]]

// 输入：board = [[1,1],[1,0]]
// 输出：[[1,1],[1,1]]

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function(board) {
  const boradCopy = JSON.parse(JSON.stringify(board));
  for(let i = 0; i < boradCopy.length; i++) {
    for(let j = 0; j < boradCopy[i].length; j++) {
      let liveCount = 0;
      for(let k = -1; k <=1; k++) {
        for(let l = -1; l <=1; l++) {
          const x = i + k;
          const y = j + l;
          if(boradCopy[x] && boradCopy[x][y] === 1 && !(k === 0 && l === 0)) {
            liveCount++;
          }
        }
      }
      if(boradCopy[i][j] === 1 && (liveCount < 2 || liveCount > 3)) {
        // 活细胞
        board[i][j] = 0
      }
      if(boradCopy[i][j] === 0 && liveCount === 3) {
        // 死细胞
        board[i][j] = 1;
      }
    }
  }
};

const args = [[0,1,0],[0,0,1],[1,1,1],[0,0,0]];
const res = gameOfLife(args);
console.log(res);

