// pages/profile/profile.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    stats: {
      total: 0,
      completed: 0,
      pending: 0,
      completionRate: 0
    },
    showSettings: false,
    settings: {
      autoSave: true,
      soundEnabled: true,
      defaultPriority: 'medium'
    },
    priorityOptions: [
      { value: 'low', label: '低优先级' },
      { value: 'medium', label: '中优先级' },
      { value: 'high', label: '高优先级' }
    ],
    defaultPriorityIndex: 1
  },

  onLoad: function (options) {
    console.log('个人页面加载')
    this.loadUserInfo()
    this.loadSettings()
  },

  onShow: function () {
    console.log('个人页面显示')
    this.calculateStats()
  },

  // 加载用户信息
  loadUserInfo: function() {
    const userInfo = wx.getStorageSync('userInfo') || {}
    this.setData({
      userInfo
    })
  },

  // 加载设置
  loadSettings: function() {
    try {
      const settings = wx.getStorageSync('appSettings')
      if (settings) {
        const defaultPriorityIndex = this.data.priorityOptions.findIndex(
          item => item.value === settings.defaultPriority
        )
        
        this.setData({
          settings,
          defaultPriorityIndex: defaultPriorityIndex >= 0 ? defaultPriorityIndex : 1
        })
      }
    } catch (error) {
      console.error('加载设置失败：', error)
    }
  },

  // 计算统计数据
  calculateStats: function() {
    const todos = app.getTodos()
    const total = todos.length
    const completed = todos.filter(item => item.completed).length
    const pending = total - completed
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

    this.setData({
      stats: {
        total,
        completed,
        pending,
        completionRate
      }
    })
  },

  // 选择头像
  chooseAvatar: function() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath
        
        // 这里可以上传到服务器，现在只是本地显示
        const userInfo = {
          ...this.data.userInfo,
          avatarUrl: tempFilePath
        }
        
        this.setData({
          userInfo
        })
        
        // 保存到本地存储
        wx.setStorageSync('userInfo', userInfo)
        
        wx.showToast({
          title: '头像已更新',
          icon: 'success'
        })
      },
      fail: (error) => {
        console.error('选择头像失败：', error)
      }
    })
  },

  // 导出数据
  exportData: function() {
    const todos = app.getTodos()
    
    if (todos.length === 0) {
      wx.showToast({
        title: '暂无数据可导出',
        icon: 'none'
      })
      return
    }

    const exportData = {
      version: '1.0.0',
      exportTime: new Date().toISOString(),
      todos: todos
    }

    // 将数据转换为字符串并复制到剪贴板
    const dataStr = JSON.stringify(exportData, null, 2)
    
    wx.setClipboardData({
      data: dataStr,
      success: () => {
        wx.showModal({
          title: '导出成功',
          content: '数据已复制到剪贴板，你可以粘贴到文件中保存',
          showCancel: false
        })
      },
      fail: (error) => {
        console.error('复制失败：', error)
        wx.showToast({
          title: '导出失败',
          icon: 'none'
        })
      }
    })
  },

  // 导入数据
  importData: function() {
    wx.showModal({
      title: '导入数据',
      content: '请确保数据格式正确，导入将会覆盖现有数据',
      success: (res) => {
        if (res.confirm) {
          // 这里可以实现一个输入框让用户粘贴数据
          // 为了简单起见，我们提示用户手动操作
          wx.showModal({
            title: '导入说明',
            content: '请将备份数据复制，然后联系开发者获取导入功能',
            showCancel: false
          })
        }
      }
    })
  },

  // 清理已完成的待办
  clearCompleted: function() {
    const todos = app.getTodos()
    const completedCount = todos.filter(item => item.completed).length
    
    if (completedCount === 0) {
      wx.showToast({
        title: '无已完成的待办',
        icon: 'none'
      })
      return
    }

    wx.showModal({
      title: '确认清理',
      content: `确定要删除 ${completedCount} 个已完成的待办吗？`,
      success: (res) => {
        if (res.confirm) {
          // 保留未完成的待办
          app.globalData.todos = todos.filter(item => !item.completed)
          app.saveLocalData()
          
          wx.showToast({
            title: '清理完成',
            icon: 'success'
          })
          
          this.calculateStats()
        }
      }
    })
  },

  // 显示设置
  showSettings: function() {
    this.setData({
      showSettings: true
    })
  },

  // 隐藏设置
  hideSettings: function() {
    this.setData({
      showSettings: false
    })
  },

  // 自动保存开关
  onAutoSaveChange: function(e) {
    this.setData({
      'settings.autoSave': e.detail.value
    })
  },

  // 声音开关
  onSoundChange: function(e) {
    this.setData({
      'settings.soundEnabled': e.detail.value
    })
  },

  // 默认优先级改变
  onPriorityChange: function(e) {
    const index = e.detail.value
    this.setData({
      defaultPriorityIndex: index,
      'settings.defaultPriority': this.data.priorityOptions[index].value
    })
  },

  // 保存设置
  saveSettings: function() {
    try {
      wx.setStorageSync('appSettings', this.data.settings)
      wx.showToast({
        title: '设置已保存',
        icon: 'success'
      })
      this.hideSettings()
    } catch (error) {
      console.error('保存设置失败：', error)
      wx.showToast({
        title: '保存失败',
        icon: 'none'
      })
    }
  },

  // 分享功能
  onShareAppMessage: function () {
    return {
      title: '待办小助手 - 高效管理你的待办事项',
      path: '/pages/index/index'
    }
  }
})
