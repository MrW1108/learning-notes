// app.js
App({
  // 全局数据
  globalData: {
    userInfo: null,
    todos: [
      {
        id: 1,
        title: '学习微信小程序开发',
        content: '完成小程序基础教程学习',
        completed: false,
        createTime: new Date().getTime(),
        priority: 'high'
      },
      {
        id: 2,
        title: '完成项目开发',
        content: '实现待办事项管理功能',
        completed: false,
        createTime: new Date().getTime(),
        priority: 'medium'
      }
    ],
    nextId: 3
  },

  // 小程序启动时执行
  onLaunch: function () {
    console.log('小程序启动')
    
    // 获取小程序更新机制
    this.checkUpdate()
    
    // 加载本地存储的数据
    this.loadLocalData()
  },

  // 小程序显示时执行
  onShow: function (options) {
    console.log('小程序显示', options)
  },

  // 小程序隐藏时执行
  onHide: function () {
    console.log('小程序隐藏')
    // 保存数据到本地存储
    this.saveLocalData()
  },

  // 检查小程序更新
  checkUpdate: function() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      
      updateManager.onCheckForUpdate(function (res) {
        console.log('检查更新结果：', res.hasUpdate)
      })
      
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success: function (res) {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          }
        })
      })
    }
  },

  // 加载本地数据
  loadLocalData: function() {
    try {
      const todos = wx.getStorageSync('todos')
      const nextId = wx.getStorageSync('nextId')
      
      if (todos && todos.length > 0) {
        this.globalData.todos = todos
      }
      if (nextId) {
        this.globalData.nextId = nextId
      }
    } catch (error) {
      console.error('加载本地数据失败：', error)
    }
  },

  // 保存数据到本地
  saveLocalData: function() {
    try {
      wx.setStorageSync('todos', this.globalData.todos)
      wx.setStorageSync('nextId', this.globalData.nextId)
    } catch (error) {
      console.error('保存数据失败：', error)
    }
  },

  // 添加待办事项
  addTodo: function(todo) {
    const newTodo = {
      id: this.globalData.nextId++,
      title: todo.title,
      content: todo.content || '',
      completed: false,
      createTime: new Date().getTime(),
      priority: todo.priority || 'medium'
    }
    
    this.globalData.todos.unshift(newTodo)
    this.saveLocalData()
    return newTodo
  },

  // 更新待办事项
  updateTodo: function(id, updates) {
    const todo = this.globalData.todos.find(item => item.id === id)
    if (todo) {
      Object.assign(todo, updates)
      this.saveLocalData()
      return todo
    }
    return null
  },

  // 删除待办事项
  deleteTodo: function(id) {
    const index = this.globalData.todos.findIndex(item => item.id === id)
    if (index > -1) {
      this.globalData.todos.splice(index, 1)
      this.saveLocalData()
      return true
    }
    return false
  },

  // 获取待办事项
  getTodos: function() {
    return this.globalData.todos
  }
})
