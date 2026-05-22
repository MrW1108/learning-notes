/**
 * 本地存储封装
 */

class Storage {
  // 设置存储
  static set(key, value) {
    try {
      const data = JSON.stringify(value)
      wx.setStorageSync(key, data)
      return true
    } catch (error) {
      console.error('Storage set error:', error)
      return false
    }
  }

  // 获取存储
  static get(key, defaultValue = null) {
    try {
      const data = wx.getStorageSync(key)
      if (data) {
        return JSON.parse(data)
      }
      return defaultValue
    } catch (error) {
      console.error('Storage get error:', error)
      return defaultValue
    }
  }

  // 删除存储
  static remove(key) {
    try {
      wx.removeStorageSync(key)
      return true
    } catch (error) {
      console.error('Storage remove error:', error)
      return false
    }
  }

  // 清空所有存储
  static clear() {
    try {
      wx.clearStorageSync()
      return true
    } catch (error) {
      console.error('Storage clear error:', error)
      return false
    }
  }

  // 获取存储信息
  static getInfo() {
    try {
      return wx.getStorageInfoSync()
    } catch (error) {
      console.error('Storage getInfo error:', error)
      return null
    }
  }

  // 异步设置存储
  static setAsync(key, value) {
    return new Promise((resolve, reject) => {
      try {
        const data = JSON.stringify(value)
        wx.setStorage({
          key,
          data,
          success: () => resolve(true),
          fail: (error) => {
            console.error('Storage setAsync error:', error)
            reject(error)
          }
        })
      } catch (error) {
        console.error('Storage setAsync error:', error)
        reject(error)
      }
    })
  }

  // 异步获取存储
  static getAsync(key, defaultValue = null) {
    return new Promise((resolve) => {
      wx.getStorage({
        key,
        success: (res) => {
          try {
            const data = JSON.parse(res.data)
            resolve(data)
          } catch (error) {
            console.error('Storage getAsync parse error:', error)
            resolve(defaultValue)
          }
        },
        fail: (error) => {
          console.error('Storage getAsync error:', error)
          resolve(defaultValue)
        }
      })
    })
  }

  // 异步删除存储
  static removeAsync(key) {
    return new Promise((resolve, reject) => {
      wx.removeStorage({
        key,
        success: () => resolve(true),
        fail: (error) => {
          console.error('Storage removeAsync error:', error)
          reject(error)
        }
      })
    })
  }

  // 批量设置
  static setBatch(data) {
    const results = []
    for (const key in data) {
      results.push(this.set(key, data[key]))
    }
    return results.every(result => result)
  }

  // 批量获取
  static getBatch(keys, defaultValue = null) {
    const results = {}
    keys.forEach(key => {
      results[key] = this.get(key, defaultValue)
    })
    return results
  }

  // 检查key是否存在
  static has(key) {
    try {
      const data = wx.getStorageSync(key)
      return data !== '' && data !== null && data !== undefined
    } catch (error) {
      console.error('Storage has error:', error)
      return false
    }
  }

  // 获取所有key
  static keys() {
    try {
      const info = wx.getStorageInfoSync()
      return info.keys || []
    } catch (error) {
      console.error('Storage keys error:', error)
      return []
    }
  }

  // 获取存储大小（单位：KB）
  static size() {
    try {
      const info = wx.getStorageInfoSync()
      return info.currentSize || 0
    } catch (error) {
      console.error('Storage size error:', error)
      return 0
    }
  }

  // 存储过期管理
  static setWithExpiry(key, value, expiryInMinutes = 60) {
    const now = new Date()
    const item = {
      value: value,
      expiry: now.getTime() + (expiryInMinutes * 60 * 1000)
    }
    return this.set(key, item)
  }

  // 获取带过期时间的存储
  static getWithExpiry(key, defaultValue = null) {
    const item = this.get(key)
    
    if (!item) {
      return defaultValue
    }
    
    const now = new Date()
    if (now.getTime() > item.expiry) {
      // 已过期，删除并返回默认值
      this.remove(key)
      return defaultValue
    }
    
    return item.value
  }
}

module.exports = Storage
