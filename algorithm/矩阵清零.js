// 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。

// 示例 1：

// 输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]
// 输出：[[1,0,1],[0,0,0],[1,0,1]]
// 示例 2：

// 输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]
// 输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]

// 提示：

// m == matrix.length
// n == matrix[0].length
// 1 <= m, n <= 200
// -231 <= matrix[i][j] <= 231 - 1

// 进阶：

// 一个直观的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
// 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
// 你能想出一个仅使用常量空间的解决方案吗？

/**
 * @param {number[][]} matrix
 * @return {void}
 */
var setZeroes = function (matrix) {
    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {
        return;
    }
    
    const m = matrix.length;
    const n = matrix[0].length;
    
    // 检查第一行是否有0
    let firstRowHasZero = false;
    for (let j = 0; j < n; j++) {
        if (matrix[0][j] === 0) {
            firstRowHasZero = true;
            break;
        }
    }
    
    // 检查第一列是否有0
    let firstColHasZero = false;
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            firstColHasZero = true;
            break;
        }
    }
    
    // 使用第一行和第一列来标记需要清零的行和列
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0; // 标记第i行需要清零
                matrix[0][j] = 0; // 标记第j列需要清零
            }
        }
    }
    
    // 根据第一行的标记清零列
    for (let j = 1; j < n; j++) {
        if (matrix[0][j] === 0) {
            for (let i = 0; i < m; i++) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // 根据第一列的标记清零行
    for (let i = 1; i < m; i++) {
        if (matrix[i][0] === 0) {
            for (let j = 0; j < n; j++) {
                matrix[i][j] = 0;
            }
        }
    }
    
    // 处理第一行
    if (firstRowHasZero) {
        for (let j = 0; j < n; j++) {
            matrix[0][j] = 0;
        }
    }
    
    // 处理第一列
    if (firstColHasZero) {
        for (let i = 0; i < m; i++) {
            matrix[i][0] = 0;
        }
    }
};

// 测试用例
console.log("=== 矩阵清零算法测试 ===\n");

// 测试用例1
console.log("测试用例1:");
const matrix1 = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];
console.log("输入:", JSON.stringify(matrix1));
setZeroes(matrix1);