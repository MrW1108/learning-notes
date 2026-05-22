# 微信小程序开发完整教程 - 待办小助手

## 📱 项目概述

这是一个完整的微信小程序项目，实现了待办事项管理功能。通过这个项目，你可以学习到微信小程序开发的完整流程和核心概念。

### 🎯 主要功能

- ✅ 创建、编辑、删除待办事项
- ✅ 标记完成/未完成状态
- ✅ 优先级管理（高、中、低）
- ✅ 搜索和筛选功能
- ✅ 数据本地存储
- ✅ 统计分析
- ✅ 数据导入导出
- ✅ 个性化设置

### 🛠 技术栈

- **框架**: 微信小程序原生框架
- **语言**: JavaScript, WXML, WXSS
- **存储**: 微信小程序本地存储API
- **UI设计**: 现代化扁平设计风格

## 🚀 快速开始

### 1. 环境准备

1. **下载微信开发者工具**
   - 访问 [微信小程序开发者工具官网](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
   - 下载并安装最新版本

2. **注册小程序账号**
   - 访问 [微信公众平台](https://mp.weixin.qq.com/)
   - 注册小程序账号并获取 AppID

### 2. 项目导入

1. 打开微信开发者工具
2. 选择"导入项目"
3. 填写项目信息：
   - 项目目录：选择本项目文件夹
   - AppID：填写你的小程序 AppID（或选择测试号）
   - 项目名称：待办小助手

### 3. 运行项目

1. 点击"编译"按钮
2. 在模拟器中查看效果
3. 扫码在手机上预览

## 📁 项目结构

```
微信小程序/
├── app.js                 # 全局应用逻辑
├── app.json              # 全局配置文件
├── app.wxss              # 全局样式文件
├── project.config.json   # 项目配置文件
├── sitemap.json          # 站点地图配置
├── pages/                # 页面目录
│   ├── index/            # 首页
│   │   ├── index.wxml
│   │   ├── index.wxss
│   │   ├── index.js
│   │   └── index.json
│   ├── todo/             # 待办列表页
│   ├── detail/           # 详情页
│   └── profile/          # 个人页
├── components/           # 组件目录
│   └── todo-item/        # 待办项组件
├── utils/               # 工具函数
│   ├── util.js          # 通用工具
│   ├── storage.js       # 存储管理
│   └── api.js           # 接口封装
└── images/              # 图片资源
    ├── home.png
    ├── todo.png
    └── profile.png
```

## 🎨 核心概念详解

### 1. 小程序配置

#### app.json - 全局配置
```json
{
  "pages": ["pages/index/index"],      // 页面路径列表
  "window": {                          // 全局的默认窗口表现
    "navigationBarTitleText": "待办小助手"
  },
  "tabBar": {                          // 底部 tab 栏
    "list": [...]
  }
}
```

#### page.json - 页面配置
```json
{
  "navigationBarTitleText": "页面标题",
  "enablePullDownRefresh": true        // 启用下拉刷新
}
```

### 2. 页面生命周期

```javascript
Page({
  onLoad(options) {
    // 页面加载时触发，只会调用一次
    console.log('页面加载', options)
  },
  
  onShow() {
    // 页面显示时触发，每次显示都会调用
    console.log('页面显示')
  },
  
  onReady() {
    // 页面初次渲染完成时触发，只会调用一次
    console.log('页面初次渲染完成')
  },
  
  onHide() {
    // 页面隐藏时触发
    console.log('页面隐藏')
  },
  
  onUnload() {
    // 页面卸载时触发
    console.log('页面卸载')
  }
})
```

### 3. 数据绑定和事件处理

#### WXML 数据绑定
```html
<!-- 文本绑定 -->
<view>{{message}}</view>

<!-- 属性绑定 -->
<view class="{{className}}">内容</view>

<!-- 条件渲染 -->
<view wx:if="{{condition}}">显示内容</view>

<!-- 列表渲染 -->
<view wx:for="{{array}}" wx:key="id">
  {{item.name}}
</view>
```

#### 事件处理
```javascript
Page({
  data: {
    message: 'Hello World'
  },
  
  // 事件处理函数
  onButtonTap(e) {
    const { id } = e.currentTarget.dataset
    this.setData({
      message: 'Button clicked'
    })
  }
})
```

### 4. 组件开发

```javascript
Component({
  properties: {
    // 组件属性
    title: {
      type: String,
      value: ''
    }
  },
  
  data: {
    // 组件内部数据
  },
  
  methods: {
    // 组件方法
    onTap() {
      this.triggerEvent('tap', { /* 数据 */ })
    }
  }
})
```

## 🔧 开发流程

### 1. 需求分析
- 确定功能需求
- 设计用户界面
- 规划页面结构

### 2. 项目初始化
1. 创建项目目录
2. 配置 `app.json`
3. 设置全局样式 `app.wxss`
4. 编写应用逻辑 `app.js`

### 3. 页面开发
1. 创建页面文件（.wxml, .wxss, .js, .json）
2. 编写页面结构和样式
3. 实现页面逻辑和数据交互
4. 测试页面功能

### 4. 组件开发
1. 分析可复用的UI模块
2. 创建自定义组件
3. 在页面中使用组件

### 5. 数据管理
1. 设计数据结构
2. 实现数据存储（本地存储/服务器）
3. 处理数据同步

### 6. 优化和调试
1. 性能优化
2. 兼容性测试
3. 错误处理

### 7. 发布上线
1. 代码审查
2. 提交审核
3. 发布版本

## 📋 最佳实践

### 1. 代码规范
- 使用 ES6+ 语法
- 保持代码简洁清晰
- 添加必要的注释
- 统一命名规范

### 2. 性能优化
- 合理使用 `setData`
- 避免频繁的数据更新
- 优化图片资源
- 减少页面层级

### 3. 用户体验
- 提供加载状态提示
- 处理网络异常情况
- 保持界面响应
- 遵循微信设计规范

### 4. 数据安全
- 敏感数据加密存储
- 验证用户输入
- 防止XSS攻击
- 合理使用权限

## 🎯 学习重点

### 初级阶段
1. 熟悉小程序开发工具
2. 掌握基础语法（WXML, WXSS, JS）
3. 理解页面生命周期
4. 学会数据绑定和事件处理

### 中级阶段
1. 自定义组件开发
2. 网络请求和数据管理
3. 本地存储使用
4. 性能优化技巧

### 高级阶段
1. 复杂业务逻辑实现
2. 第三方插件集成
3. 小程序云开发
4. 分包加载优化

## 🐛 常见问题

### 1. 开发工具问题
**Q: 无法预览或真机调试？**
A: 检查网络连接，确认已登录微信账号，AppID配置正确。

**Q: 代码修改后不生效？**
A: 点击编译按钮重新编译，或清除缓存重启工具。

### 2. 代码问题
**Q: setData 后页面不更新？**
A: 检查数据路径是否正确，避免直接修改 data 中的数组或对象。

**Q: 组件事件不响应？**
A: 确认事件名称和处理函数名称匹配，检查 catch:tap 的使用。

### 3. 样式问题
**Q: 样式不生效？**
A: 检查选择器优先级，确认 rpx 单位使用正确。

**Q: 在不同机型上显示异常？**
A: 使用相对单位 rpx，测试不同屏幕尺寸。

## 📚 扩展学习

### 官方文档
- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [小程序 API 文档](https://developers.weixin.qq.com/miniprogram/dev/api/)
- [小程序组件文档](https://developers.weixin.qq.com/miniprogram/dev/component/)

### 进阶话题
- 小程序云开发
- 自定义组件库开发
- 小程序性能监控
- 多端框架（Taro, uni-app）

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来完善这个教程项目！

## 📄 许可证

MIT License - 详见 LICENSE 文件

---

🎉 恭喜你完成了微信小程序的学习！继续练习和探索更多功能吧！
