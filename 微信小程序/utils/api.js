/**
 * API请求封装
 */

// 基础配置
const BASE_URL = 'https://your-api-domain.com/api'
const TIMEOUT = 10000

// 请求拦截器
const requestInterceptor = (config) => {
  // 添加通用headers
  config.header = {
    'Content-Type': 'application/json',
    ...config.header
  }
  
  // 添加token（如果有）
  const token = wx.getStorageSync('token')
  if (token) {
    config.header.Authorization = `Bearer ${token}`
  }
  
  // 添加时间戳防止缓存
  if (config.method === 'GET') {
    const separator = config.url.includes('?') ? '&' : '?'
    config.url += `${separator}_t=${Date.now()}`
  }
  
  console.log('Request:', config)
  return config
}

// 响应拦截器
const responseInterceptor = (response) => {
  console.log('Response:', response)
  
  // 统一处理响应
  if (response.statusCode === 200) {
    return response.data
  } else if (response.statusCode === 401) {
    // 未授权，清除token并跳转到登录页
    wx.removeStorageSync('token')
    wx.showModal({
      title: '提示',
      content: '登录已过期，请重新登录',
      showCancel: false,
      success: () => {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    })
    return Promise.reject(new Error('Unauthorized'))
  } else {
    const error = new Error(`HTTP ${response.statusCode}`)
    return Promise.reject(error)
  }
}

// 基础请求方法
const request = (options) => {
  return new Promise((resolve, reject) => {
    // 请求拦截
    const config = requestInterceptor({
      url: `${BASE_URL}${options.url}`,
      method: options.method || 'GET',
      data: options.data,
      header: options.header || {},
      timeout: options.timeout || TIMEOUT
    })
    
    wx.request({
      ...config,
      success: (response) => {
        try {
          const result = responseInterceptor(response)
          resolve(result)
        } catch (error) {
          reject(error)
        }
      },
      fail: (error) => {
        console.error('Request failed:', error)
        
        // 网络错误处理
        if (error.errMsg.includes('timeout')) {
          wx.showToast({
            title: '请求超时',
            icon: 'none'
          })
        } else if (error.errMsg.includes('fail')) {
          wx.showToast({
            title: '网络连接失败',
            icon: 'none'
          })
        }
        
        reject(error)
      }
    })
  })
}

// GET请求
const get = (url, params = {}, options = {}) => {
  // 将参数拼接到URL中
  if (Object.keys(params).length > 0) {
    const queryString = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&')
    url += (url.includes('?') ? '&' : '?') + queryString
  }
  
  return request({
    url,
    method: 'GET',
    ...options
  })
}

// POST请求
const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  })
}

// PUT请求
const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  })
}

// DELETE请求
const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'DELETE',
    data,
    ...options
  })
}

// 文件上传
const uploadFile = (filePath, options = {}) => {
  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token')
    
    wx.uploadFile({
      url: `${BASE_URL}${options.url || '/upload'}`,
      filePath,
      name: options.name || 'file',
      formData: options.formData || {},
      header: {
        Authorization: token ? `Bearer ${token}` : '',
        ...options.header
      },
      success: (response) => {
        try {
          const data = JSON.parse(response.data)
          resolve(data)
        } catch (error) {
          reject(new Error('Upload response parse error'))
        }
      },
      fail: (error) => {
        console.error('Upload failed:', error)
        wx.showToast({
          title: '上传失败',
          icon: 'none'
        })
        reject(error)
      }
    })
  })
}

// 文件下载
const downloadFile = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    wx.downloadFile({
      url: url.startsWith('http') ? url : `${BASE_URL}${url}`,
      success: (response) => {
        if (response.statusCode === 200) {
          resolve(response.tempFilePath)
        } else {
          reject(new Error(`Download failed: ${response.statusCode}`))
        }
      },
      fail: (error) => {
        console.error('Download failed:', error)
        wx.showToast({
          title: '下载失败',
          icon: 'none'
        })
        reject(error)
      }
    })
  })
}

// 并发请求
const all = (requests) => {
  return Promise.all(requests)
}

// 竞速请求
const race = (requests) => {
  return Promise.race(requests)
}

// 模拟API（用于开发测试）
const mockApi = {
  // 获取待办列表
  getTodos: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: [
            {
              id: 1,
              title: '学习微信小程序',
              content: '完成基础教程',
              completed: false,
              priority: 'high',
              createTime: Date.now() - 86400000
            }
          ]
        })
      }, 500)
    })
  },
  
  // 创建待办
  createTodo: (todo) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: {
            id: Date.now(),
            ...todo,
            createTime: Date.now()
          }
        })
      }, 300)
    })
  },
  
  // 更新待办
  updateTodo: (id, updates) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          data: { id, ...updates }
        })
      }, 300)
    })
  },
  
  // 删除待办
  deleteTodo: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          code: 200,
          message: 'Deleted successfully'
        })
      }, 300)
    })
  }
}

module.exports = {
  request,
  get,
  post,
  put,
  delete: del,
  uploadFile,
  downloadFile,
  all,
  race,
  mockApi
}
