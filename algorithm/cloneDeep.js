const cloneDeep = (obj, cache = new WeakMap()) => {
  // 基本类型或函数直接返回
  if (obj === null || typeof obj !== "object") return obj;

  // 处理循环引用, 避免栈溢出
  if (cache.has(obj)) return cache.get(obj);

  // Date
  if (obj instanceof Date) return new Date(obj);

  // RegExp
  if (obj instanceof RegExp) return new RegExp(obj);

  // Set
  if (obj instanceof Set) {
    const result = new Set();
    cache.set(obj, result);
    for (const val of obj) {
      result.add(cloneDeep(val, cache));
    }
    return result;
  }

  // Map
  if (obj instanceof Map) {
    const result = new Map();
    cache.set(obj, result);
    for (const [key, val] of obj) {
      result.set(key, cloneDeep(val, cache));
    }
    return result;
  }

  // Array
  if (Array.isArray(obj)) {
    const result = [];
    cache.set(obj, result);
    for (let i = 0; i < obj.length; i++) {
      result[i] = cloneDeep(obj[i], cache);
    }
    return result;
  }

  // 普通对象
  const result = {};
  cache.set(obj, result);
  for (const key of Reflect.ownKeys(obj)) {
    result[key] = cloneDeep(obj[key], cache);
  }
  return result;
};
