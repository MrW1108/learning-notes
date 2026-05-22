// pages/todo/todo.js
const app = getApp()

Page({
  data: {
    todos: [],
    filteredTodos: [],
    searchKeyword: '',
    filter: 'all', // all, pending, completed
    sortBy: 'createTime', // createTime, priority
    stats: {
      total: 0,
      pending: 0,
      completed: 0
    },
    showEditModal: false,
    editTodo: {
      id: null,
      title: '',
      content: '',
      priority: 'medium'
    }
  },

  onLoad: function (options) {
    console.log('待办页面加载')
    this.loadData()
  },

  onShow: function () {
    console.log('待办页面显示')
    // 每次显示时刷新数据
    this.loadData()
  },

  // 加载数据
  loadData: function() {
    const todos = app.getTodos().map(this.formatTodoItem)
    
    // 计算统计数据
    const stats = {
      total: todos.length,
      pending: todos.filter(item => !item.completed).length,
      completed: todos.filter(item => item.completed).length
    }
    
    this.setData({
      todos,
      stats
    })
    
    // 应用筛选和排序
    this.applyFilterAndSort()
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

  // 搜索输入
  onSearchInput: function(e) {
    this.setData({
      searchKeyword: e.detail.value
    })
    this.applyFilterAndSort()
  },

  // 设置筛选条件
  setFilter: function(e) {
    const filter = e.currentTarget.dataset.filter
    this.setData({
      filter
    })
    this.applyFilterAndSort()
  },

  // 设置排序方式
  setSortBy: function(e) {
    const sortBy = e.currentTarget.dataset.sort
    this.setData({
      sortBy
    })
    this.applyFilterAndSort()
  },

  // 应用筛选和排序
  applyFilterAndSort: function() {
    let { todos, filter, searchKeyword, sortBy } = this.data
    
    // 筛选
    let filteredTodos = todos
    
    // 按关键词搜索
    if (searchKeyword) {
      filteredTodos = filteredTodos.filter(todo => 
        todo.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        (todo.content && todo.content.toLowerCase().includes(searchKeyword.toLowerCase()))
      )
    }
    
    // 按状态筛选
    if (filter === 'pending') {
      filteredTodos = filteredTodos.filter(todo => !todo.completed)
    } else if (filter === 'completed') {
      filteredTodos = filteredTodos.filter(todo => todo.completed)
    }
    
    // 排序
    if (sortBy === 'createTime') {
      filteredTodos.sort((a, b) => b.createTime - a.createTime)
    } else if (sortBy === 'priority') {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      filteredTodos.sort((a, b) => {
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority]
        if (priorityDiff === 0) {
          return b.createTime - a.createTime
        }
        return priorityDiff
      })
    }
    
    this.setData({
      filteredTodos
    })
  },

  // 切换完成状态
  toggleComplete: function(e) {
    const id = e.currentTarget.dataset.id
    const todo = this.data.todos.find(item => item.id === id)
    
    if (todo) {
      const completed = !todo.completed
      app.updateTodo(id, { completed })
      
      wx.showToast({
        title: completed ? '已完成' : '已取消完成',
        icon: 'success'
      })
      
      this.loadData()
    }
  },

  // 添加待办
  addTodo: function() {
    wx.navigateTo({
      url: '/pages/index/index'
    })
  },

  // 编辑待办
  editTodo: function(e) {
    const id = e.currentTarget.dataset.id
    const todo = this.data.todos.find(item => item.id === id)
    
    if (todo) {
      this.setData({
        showEditModal: true,
        editTodo: {
          id: todo.id,
          title: todo.title,
          content: todo.content || '',
          priority: todo.priority
        }
      })
    }
  },

  // 隐藏编辑弹窗
  hideEditModal: function() {
    this.setData({
      showEditModal: false
    })
  },

  // 编辑标题输入
  onEditTitleInput: function(e) {
    this.setData({
      'editTodo.title': e.detail.value
    })
  },

  // 编辑内容输入
  onEditContentInput: function(e) {
    this.setData({
      'editTodo.content': e.detail.value
    })
  },

  // 设置编辑优先级
  setEditPriority: function(e) {
    const priority = e.currentTarget.dataset.priority
    this.setData({
      'editTodo.priority': priority
    })
  },

  // 确认编辑待办
  confirmEditTodo: function() {
    const { id, title, content, priority } = this.data.editTodo
    
    if (!title.trim()) {
      wx.showToast({
        title: '请输入标题',
        icon: 'none'
      })
      return
    }

    // 更新待办事项
    app.updateTodo(id, {
      title: title.trim(),
      content: content.trim(),
      priority
    })

    wx.showToast({
      title: '更新成功',
      icon: 'success'
    })

    // 关闭弹窗并刷新数据
    this.hideEditModal()
    this.loadData()
  },

  // 删除待办
  deleteTodo: function(e) {
    const id = e.currentTarget.dataset.id
    const todo = this.data.todos.find(item => item.id === id)
    
    if (todo) {
      wx.showModal({
        title: '确认删除',
        content: `确定要删除"${todo.title}"吗？`,
        success: (res) => {
          if (res.confirm) {
            app.deleteTodo(id)
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
            this.loadData()
          }
        }
      })
    }
  },

  // 跳转到详情页
  goToDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    })
  },

  // 下拉刷新
  onPullDownRefresh: function () {
    this.loadData()
    wx.stopPullDownRefresh()
  },

  // 分享功能
  onShareAppMessage: function () {
    return {
      title: '待办小助手 - 高效管理你的待办事项',
      path: '/pages/todo/todo'
    }
  }
})
