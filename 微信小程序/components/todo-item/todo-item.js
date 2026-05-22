// components/todo-item/todo-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 待办ID
    id: {
      type: Number,
      value: 0
    },
    
    // 标题
    title: {
      type: String,
      value: ''
    },
    
    // 内容描述
    content: {
      type: String,
      value: ''
    },
    
    // 是否已完成
    completed: {
      type: Boolean,
      value: false
    },
    
    // 优先级
    priority: {
      type: String,
      value: 'medium' // low, medium, high
    },
    
    // 创建时间
    createTime: {
      type: Number,
      value: 0
    },
    
    // 显示选项
    showContent: {
      type: Boolean,
      value: true
    },
    
    showTime: {
      type: Boolean,
      value: true
    },
    
    showPriority: {
      type: Boolean,
      value: true
    },
    
    showActions: {
      type: Boolean,
      value: false
    },
    
    // 操作权限
    allowEdit: {
      type: Boolean,
      value: true
    },
    
    allowDelete: {
      type: Boolean,
      value: true
    },
    
    allowToggle: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    priorityText: '中',
    createTimeText: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化数据
    initData() {
      const priorityTextMap = {
        high: '高',
        medium: '中',
        low: '低'
      }
      
      this.setData({
        priorityText: priorityTextMap[this.data.priority] || '中',
        createTimeText: this.formatTime(this.data.createTime)
      })
    },

    // 格式化时间
    formatTime(timestamp) {
      if (!timestamp) return ''
      
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

    // 点击整个组件
    onTap(e) {
      this.triggerEvent('tap', {
        id: this.data.id,
        item: this.data
      }, { bubbles: true })
    },

    // 切换完成状态
    onToggleComplete(e) {
      if (!this.data.allowToggle) return
      
      this.triggerEvent('toggle', {
        id: this.data.id,
        completed: !this.data.completed
      })
    },

    // 编辑
    onEdit(e) {
      if (!this.data.allowEdit) return
      
      this.triggerEvent('edit', {
        id: this.data.id,
        item: this.data
      })
    },

    // 删除
    onDelete(e) {
      if (!this.data.allowDelete) return
      
      this.triggerEvent('delete', {
        id: this.data.id,
        title: this.data.title
      })
    }
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached() {
      this.initData()
    }
  },

  /**
   * 监听属性变化
   */
  observers: {
    'priority, createTime': function(priority, createTime) {
      this.initData()
    }
  }
})
