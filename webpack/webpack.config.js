const path = require("path");
const MyCustomPlugin = require('./plugins/myCustomPlugin');

/** 请在该目录下使用 npx webpack --config webpack.config.js 进行调试 */

module.exports = {
  mode: "development",
  entry: "./src/test.txt",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.txt$/, // 匹配需要使用 Loader 的文件类型
        use: [
          {
            loader: path.resolve(__dirname, "loaders/customCaseLoader.js"), // 指定 Loader 的绝对路径
            options: {
              // 配置选项传递给 Loader
              caseType: "upper",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MyCustomPlugin({
      outputPath: 'dist' // 可选的插件选项
    })
  ]
};
