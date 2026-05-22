// pages/detail/detail.js
const app = getApp()

Page({
  data: {
    todo: null,
    loading: true,
    notFound: false,
    showEditModal: false,
    editTodo: {
      id: null,
      title: '',
      content: '',
      priority: 'medium'
    }
  },

  onLoad: function (options) {
    console.log('详情页面加载', options)
    const { id } = options
    if (id) {
      this.loadTodo(parseInt(id))
    } else {
      this.setData({
        loading: false,
        notFound: true
      })
    }
  },

  onShow: function () {
    // 如果从编辑页面返回，重新加载数据
    if (this.data.todo && !this.data.loading) {
      this.loadTodo(this.data.todo.id)
    }
  },

  // 加载待办详情
  loadTodo: function(id) {
    this.setData({ loading: true })
    
    const todos = app.getTodos()
    const todo = todos.find(item => item.id === id)
    
    if (todo) {
      const formattedTodo = this.formatTodoItem(todo)
      this.setData({
        todo: formattedTodo,
        loading: false,
        notFound: false
      })
      
      // 设置页面标题
      wx.setNavigationBarTitle({
        title: todo.title.length > 10 ? todo.title.substring(0, 10) + '...' : todo.title
      })
    } else {
      this.setData({
        loading: false,
        notFound: true
      })
    }
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
      createTimeText: this.formatFullTime(todo.createTime),
      completedTimeText: todo.completedTime ? this.formatFullTime(todo.completedTime) : null
    }
  },

  // 格式化完整时间显示
  formatFullTime: function(timestamp) {
    const date = new Date(timestamp)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  },

  // 完成待办
  completeTodo: function() {
    const todo = this.data.todo
    if (todo) {
      app.updateTodo(todo.id, { 
        completed: true,
        completedTime: new Date().getTime()
      })
      
      wx.showToast({
        title: '已完成',
        icon: 'success'
      })
      
      this.loadTodo(todo.id)
    }
  },

  // 取消完成
  uncompleteTodo: function() {
    const todo = this.data.todo
    if (todo) {
      app.updateTodo(todo.id, { 
        completed: false,
        completedTime: null
      })
      
      wx.showToast({
        title: '已取消完成',
        icon: 'success'
      })
      
      this.loadTodo(todo.id)
    }
  },

  // 编辑待办
  editTodo: function() {
    const todo = this.data.todo
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
    this.loadTodo(id)
  },

  // 删除待办
  deleteTodo: function() {
    const todo = this.data.todo
    if (todo) {
      wx.showModal({
        title: '确认删除',
        content: `确定要删除"${todo.title}"吗？`,
        success: (res) => {
          if (res.confirm) {
            app.deleteTodo(todo.id)
            wx.showToast({
              title: '删除成功',
              icon: 'success'
            })
            // 返回上一页
            wx.navigateBack()
          }
        }
      })
    }
  },

  // 返回上一页
  goBack: function() {
    wx.navigateBack({
      fail: () => {
        // 如果没有上一页，跳转到首页
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  },

  // 分享功能
  onShareAppMessage: function () {
    const todo = this.data.todo
    return {
      title: todo ? `待办：${todo.title}` : '待办小助手',
      path: `/pages/detail/detail?id=${todo ? todo.id : ''}`
    }
  }
})
