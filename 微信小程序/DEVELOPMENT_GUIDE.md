# 微信小程序开发流程详解

## 🎯 开发前准备

### 1. 开发环境搭建

#### 1.1 微信开发者工具
1. 下载安装：https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html
2. 使用微信扫码登录
3. 创建新项目或导入现有项目

#### 1.2 注册小程序
1. 访问微信公众平台：https://mp.weixin.qq.com/
2. 注册小程序账号
3. 获取 AppID（开发时可使用测试号）

#### 1.3 开发工具配置
- 设置代理（如需要）
- 配置编辑器偏好
- 安装必要的插件

## 📂 项目结构规划

### 2.1 标准目录结构
```
小程序根目录/
├── app.js              # 小程序主逻辑
├── app.json            # 小程序公共配置
├── app.wxss            # 小程序公共样式表
├── project.config.json # 项目配置文件
├── sitemap.json        # 站点地图
├── pages/              # 页面文件夹
│   ├── index/          # 首页
│   └── ...
├── components/         # 自定义组件
├── utils/             # 工具函数
├── images/            # 图片资源
└── lib/               # 第三方库
```

### 2.2 文件命名规范
- 页面文件：使用小写字母，单词间用连字符分隔
- 组件文件：使用 kebab-case 命名
- 工具函数：使用 camelCase 命名

## 🔧 核心配置文件

### 3.1 app.json - 全局配置

#### 基础配置
```json
{
  "pages": [
    "pages/index/index",
    "pages/todo/todo"
  ],
  "window": {
    "backgroundTextStyle": "light",
    "navigationBarBackgroundColor": "#1890ff",
    "navigationBarTitleText": "应用标题",
    "navigationBarTextStyle": "white",
    "backgroundColor": "#f5f5f5"
  }
}
```

#### 底部导航配置
```json
{
  "tabBar": {
    "color": "#999999",
    "selectedColor": "#1890ff",
    "backgroundColor": "#ffffff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "images/home.png",
        "selectedIconPath": "images/home-active.png"
      }
    ]
  }
}
```

### 3.2 project.config.json - 项目配置
```json
{
  "description": "项目描述",
  "packOptions": {
    "ignore": []
  },
  "setting": {
    "urlCheck": false,
    "es6": true,
    "enhance": true,
    "postcss": true,
    "minified": true,
    "newFeature": false
  },
  "compileType": "miniprogram",
  "libVersion": "2.19.4",
  "appid": "你的AppID",
  "projectname": "项目名称"
}
```

## 📄 页面开发流程

### 4.1 页面文件结构
每个页面包含四个文件：
- `.wxml` - 页面结构
- `.wxss` - 页面样式
- `.js` - 页面逻辑
- `.json` - 页面配置

### 4.2 页面开发步骤

#### 步骤1：页面配置 (.json)
```json
{
  "navigationBarTitleText": "页面标题",
  "enablePullDownRefresh": true,
  "usingComponents": {
    "custom-component": "/components/custom-component/custom-component"
  }
}
```

#### 步骤2：页面结构 (.wxml)
```html
<view class="container">
  <view class="header">{{title}}</view>
  <view class="content">
    <block wx:for="{{list}}" wx:key="id">
      <view class="item" bindtap="onItemTap" data-id="{{item.id}}">
        {{item.name}}
      </view>
    </block>
  </view>
</view>
```

#### 步骤3：页面样式 (.wxss)
```css
.container {
  padding: 32rpx;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.header {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
  margin-bottom: 32rpx;
}

.item {
  background: white;
  padding: 24rpx;
  margin-bottom: 16rpx;
  border-radius: 8rpx;
}
```

#### 步骤4：页面逻辑 (.js)
```javascript
Page({
  data: {
    title: '页面标题',
    list: []
  },

  onLoad(options) {
    // 页面加载时执行
    this.initData()
  },

  onShow() {
    // 页面显示时执行
  },

  initData() {
    // 初始化数据
    this.setData({
      list: [
        { id: 1, name: '项目1' },
        { id: 2, name: '项目2' }
      ]
    })
  },

  onItemTap(e) {
    const id = e.currentTarget.dataset.id
    console.log('点击了项目:', id)
  }
})
```

## 🧩 组件开发

### 5.1 创建自定义组件

#### 组件配置 (.json)
```json
{
  "component": true,
  "usingComponents": {}
}
```

#### 组件逻辑 (.js)
```javascript
Component({
  properties: {
    title: {
      type: String,
      value: ''
    },
    data: {
      type: Object,
      value: {}
    }
  },

  data: {
    // 组件内部数据
  },

  methods: {
    onTap() {
      // 向父组件传递事件
      this.triggerEvent('tap', {
        data: this.data.data
      })
    }
  },

  lifetimes: {
    attached() {
      // 组件生命周期
    }
  }
})
```

### 5.2 使用自定义组件

#### 在页面配置中声明
```json
{
  "usingComponents": {
    "my-component": "/components/my-component/my-component"
  }
}
```

#### 在页面中使用
```html
<my-component title="标题" data="{{componentData}}" bindtap="onComponentTap" />
```

## 💾 数据管理

### 6.1 本地存储

#### 同步存储
```javascript
// 存储数据
wx.setStorageSync('key', value)

// 读取数据
const data = wx.getStorageSync('key')

// 删除数据
wx.removeStorageSync('key')

// 清空存储
wx.clearStorageSync()
```

#### 异步存储
```javascript
// 存储数据
wx.setStorage({
  key: 'key',
  data: value,
  success: () => {
    console.log('存储成功')
  }
})

// 读取数据
wx.getStorage({
  key: 'key',
  success: (res) => {
    console.log('数据:', res.data)
  }
})
```

### 6.2 全局数据管理

#### 在 app.js 中定义全局数据
```javascript
App({
  globalData: {
    userInfo: null,
    todos: []
  },

  // 全局方法
  addTodo(todo) {
    this.globalData.todos.push(todo)
    this.saveData()
  },

  saveData() {
    wx.setStorageSync('todos', this.globalData.todos)
  }
})
```

#### 在页面中使用全局数据
```javascript
const app = getApp()

Page({
  onLoad() {
    const todos = app.globalData.todos
    console.log('全局待办数据:', todos)
  }
})
```

## 🌐 网络请求

### 7.1 基础请求
```javascript
wx.request({
  url: 'https://api.example.com/data',
  method: 'GET',
  data: {
    id: 1
  },
  success: (res) => {
    console.log('请求成功:', res.data)
  },
  fail: (err) => {
    console.error('请求失败:', err)
  }
})
```

### 7.2 封装请求方法
```javascript
// utils/request.js
const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(new Error(`HTTP ${res.statusCode}`))
        }
      },
      fail: reject
    })
  })
}

module.exports = { request }
```

## 🎨 界面设计

### 8.1 尺寸单位
- `rpx`: 响应式像素单位，1rpx = 屏幕宽度/750
- `px`: 物理像素
- `%`: 百分比
- `rem`: 相对于根字体大小

### 8.2 布局方式

#### Flex 布局
```css
.flex-container {
  display: flex;
  flex-direction: row; /* row, column */
  justify-content: center; /* flex-start, flex-end, center, space-between */
  align-items: center; /* flex-start, flex-end, center, stretch */
}
```

#### Grid 布局
```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20rpx;
}
```

### 8.3 响应式设计
```css
/* 小屏幕 */
@media (max-width: 600px) {
  .container {
    padding: 16rpx;
  }
}

/* 大屏幕 */
@media (min-width: 1200px) {
  .container {
    max-width: 1200rpx;
    margin: 0 auto;
  }
}
```

## 🚀 性能优化

### 9.1 代码优化

#### 合理使用 setData
```javascript
// ❌ 错误做法 - 频繁调用
for (let i = 0; i < 100; i++) {
  this.setData({
    [`list[${i}]`]: newValue
  })
}

// ✅ 正确做法 - 批量更新
const updates = {}
for (let i = 0; i < 100; i++) {
  updates[`list[${i}]`] = newValue
}
this.setData(updates)
```

#### 减少数据传输
```javascript
// ❌ 传输整个对象
this.setData({
  userInfo: {
    ...this.data.userInfo,
    name: 'new name'
  }
})

// ✅ 只传输变化的字段
this.setData({
  'userInfo.name': 'new name'
})
```

### 9.2 资源优化

#### 图片优化
- 使用 WebP 格式
- 压缩图片大小
- 使用 CDN 加速
- 懒加载图片

#### 代码分包
```json
{
  "pages": ["pages/index/index"],
  "subpackages": [
    {
      "root": "pages/sub",
      "pages": ["pages/detail/detail"]
    }
  ]
}
```

## 🐛 调试技巧

### 10.1 控制台调试
```javascript
// 基础日志
console.log('调试信息:', data)
console.warn('警告信息:', warning)
console.error('错误信息:', error)

// 性能监控
console.time('operation')
// 执行操作
console.timeEnd('operation')
```

### 10.2 真机调试
1. 开启调试模式
2. 扫码连接真机
3. 查看 vconsole 面板
4. 分析网络请求

### 10.3 性能分析
- 使用性能面板分析渲染性能
- 监控内存使用情况
- 分析网络请求时间
- 检查代码覆盖率

## 📦 发布上线

### 11.1 发布准备
1. 代码质量检查
2. 功能测试
3. 兼容性测试
4. 性能测试

### 11.2 提交审核
1. 在开发者工具中点击上传
2. 填写版本号和更新说明
3. 在微信公众平台提交审核
4. 等待审核结果

### 11.3 版本管理
- 使用语义化版本号
- 维护更新日志
- 制定发布计划
- 监控线上问题

## 📚 学习资源

### 官方文档
- [小程序开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [API 参考](https://developers.weixin.qq.com/miniprogram/dev/api/)
- [组件库](https://developers.weixin.qq.com/miniprogram/dev/component/)

### 开发工具
- [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
- [小程序代码片段](https://developers.weixin.qq.com/s/000000)

### 社区资源
- 微信开发者社区
- GitHub 开源项目
- 技术博客和教程

---

通过以上完整的开发流程，你可以从零开始构建一个功能完整的微信小程序。记住，实践是最好的学习方式！
