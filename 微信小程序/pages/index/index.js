// pages/index/index.js
const app = getApp()

Page({
  data: {
    stats: {
      total: 0,
      pending: 0,
      completed: 0
    },
    recentTodos: [],
    showAddModal: false,
    newTodo: {
      title: '',
      content: '',
      priority: 'medium'
    }
  },

  onLoad: function (options) {
    console.log('首页加载')
    this.loadData()
  },

  onShow: function () {
    console.log('首页显示')
    // 每次显示时刷新数据
    this.loadData()
  },

  // 加载数据
  loadData: function() {
    const todos = app.getTodos()
    
    // 计算统计数据
    const stats = {
      total: todos.length,
      pending: todos.filter(item => !item.completed).length,
      completed: todos.filter(item => item.completed).length
    }
    
    // 获取最近的3个待办事项
    const recentTodos = todos.slice(0, 3).map(this.formatTodoItem)
    
    this.setData({
      stats,
      recentTodos
    })
  },

  // 格式化待办事项显示
  formatTodoItem: function(todo) {
    const priorityTextMap = {
      high: '高',
      medium: '中', 
      low: '低'
    }
    
    return {
      ...todo,
      priorityText: priorityTextMap[todo.priority] || '中',
      createTimeText: this.formatTime(todo.createTime)
    }
  },

  // 格式化时间显示
  formatTime: function(timestamp) {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    
    if (diff < 60000) { // 1分钟内
      return '刚刚'
    } else if (diff < 3600000) { // 1小时内
      return Math.floor(diff / 60000) + '分钟前'
    } else if (diff < 86400000) { // 1天内
      return Math.floor(diff / 3600000) + '小时前'
    } else if (diff < 604800000) { // 1周内
      return Math.floor(diff / 86400000) + '天前'
    } else {
      return date.toLocaleDateString()
    }
  },

  // 显示添加待办弹窗
  addTodo: function() {
    this.setData({
      showAddModal: true,
      newTodo: {
        title: '',
        content: '',
        priority: 'medium'
      }
    })
  },

  // 隐藏添加待办弹窗
  hideAddModal: function() {
    this.setData({
      showAddModal: false
    })
  },

  // 输入标题
  onTitleInput: function(e) {
    this.setData({
      'newTodo.title': e.detail.value
    })
  },

  // 输入内容
  onContentInput: function(e) {
    this.setData({
      'newTodo.content': e.detail.value
    })
  },

  // 设置优先级
  setPriority: function(e) {
    const priority = e.currentTarget.dataset.priority
    this.setData({
      'newTodo.priority': priority
    })
  },

  // 确认添加待办
  confirmAddTodo: function() {
    const { title, content, priority } = this.data.newTodo
    
    if (!title.trim()) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return
    }

    // 添加到全局数据
    const newTodo = app.addTodo({
      title: title.trim(),
      content: content.trim(),
      priority
    })

    wx.showToast({
      title: '添加成功',
      icon: 'success'
    })

    // 关闭弹窗并刷新数据
    this.hideAddModal()
    this.loadData()
  },

  // 完成待办
  completeTodo: function(e) {
    const id = e.currentTarget.dataset.id
    
    app.updateTodo(id, { completed: true })
    
    wx.showToast({
      title: '已完成',
      icon: 'success'
    })
    
    this.loadData()
  },

  // 跳转到待办列表
  goToTodoList: function() {
    wx.switchTab({
      url: '/pages/todo/todo'
    })
  },

  // 跳转到详情页
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  // 分享功能
  onShareAppMessage: function () {
    return {
      title: '待办小助手 - 高效管理你的待办事项',
      path: '/pages/index/index'
    }
  }
})
