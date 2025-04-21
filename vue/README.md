# Vite HMR Demo

这个项目用于演示 Vite 的 Hot Module Replacement (HMR) 工作原理。

## 项目结构

```
.
├── src/
│   ├── components/
│   │   └── Counter.vue    # 用于演示 HMR 的计数器组件
│   ├── App.vue            # 主应用组件
│   └── main.js            # 应用入口文件
├── index.html             # HTML 入口文件
├── vite.config.js         # Vite 配置文件
└── package.json           # 项目配置文件
```

## 如何运行

1. 安装依赖：
```bash
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

## HMR 演示

1. 启动项目后，你会看到一个计数器组件
2. 尝试修改 `src/components/Counter.vue` 文件中的内容，比如：
   - 修改模板中的文本
   - 更改样式
   - 添加新的功能
3. 观察浏览器中的变化，你会发现：
   - 修改会立即生效
   - 组件状态（计数器值）会被保留
   - 不会触发完整的页面刷新

## HMR 工作原理

1. Vite 在开发模式下会启动一个 WebSocket 服务器
2. 当文件发生变化时，Vite 会通过 WebSocket 通知客户端
3. 客户端收到通知后，会请求新的模块代码
4. Vue 组件会通过 `import.meta.hot.accept()` 处理更新
5. 更新只影响修改的组件，保持其他组件状态不变

## 注意事项

- HMR 只在开发模式下工作
- 某些类型的更改（如组件名称改变）可能需要手动刷新页面
- 确保你的编辑器保存文件时不会添加额外的空格或格式化，这可能会触发不必要的 HMR 