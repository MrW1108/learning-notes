const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

class MyPromise {
  // 私有属性
  #state = PENDING;
  #result = undefined;
  #handlers = []; // 维护 thenable 队列

  constructor(executor) {
    // try catch 只能捕获同步错误，异步错误捕捉不到（Promise也是这样）
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      this.reject(error);
    }
  }

  // 这里使用箭头函数，否则外部调用时this指向问题
  resolve = (data) => {
    this.#changeState(FULFILLED, data);
  };

  reject = (reason) => {
    this.#changeState(REJECTED, reason);
  };

  #changeState(state, result) {
    if (this.#state !== PENDING) {
      return;
    }
    this.#state = state;
    this.#result = result;
    this.#run();
  }

  /** Promise.then */

  #run() {
    if (this.#state === PENDING) {
      return;
    }
    while (this.#handlers.length) {
      const { onFulfilled, onRejcted, resolve, reject } =
        this.#handlers.shift();
      this.#runOne(
        this.#state === FULFILLED ? onFulfilled : onRejcted,
        resolve,
        reject
      );
    }
  }

  #isPromiseLike(value) {
    // 只要符合Promise A+ 规范，也就是有xxx.then 函数
    if (
      value !== null &&
      (typeof value === "object" || typeof value === "function")
    ) {
      return typeof value.then === "function";
    }
  }

  #runMicrotask(func) {
    // node 环境
    if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(func);
      return;
    }
    // 浏览器环境
    else if (typeof MutationObserver === "function") {
      // MutationObserver 这个观察器的回调函数会在微队列中运行
      // 创建一个文本节点，然后监听它字符的变化，然后手动对文本节点重新赋值
      const ob = new MutationObserver(func);
      const textNode = document.createComment("1");
      ob.observe(textNode, {
        characterData: true,
      });
      textNode.data = "2";
    } else {
      // 实在没办法只能这样，因为事件循环是环境能力
      setTimeout(func, 0);
    }
  }

  #runOne(callBack, resolve, reject) {
    this.#runMicrotask(() => {
      // 参数不是函数，数据穿透
      if (typeof callBack !== "function") {
        const settled = this.#state === FULFILLED ? resolve : reject;
        settled(this.#result);
        return;
      }
      // 是函数
      try {
        const data = callBack(this.#result);
        // 返回结果如果是Promise
        if (this.#isPromiseLike(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  }

  then(onFulfilled, onRejcted) {
    return new MyPromise((resolve, reject) => {
      this.#handlers.push({
        onFulfilled,
        onRejcted,
        resolve,
        reject,
      });
      this.#run();
    });
  }

  /** Promise.then */

  catch(onRejcted) {
    return this.then(undefined, onRejcted);
  }

  finally(onFinally) {
    // 近似于then(onFinally, onFinally), 但是 onFinally 函数不用接收参数， finally返回的Promise状态与最后的状态一致（透明）
    return this.then(
      (res) => {
        onFinally();
        return res;
      },
      (err) => {
        onFinally();
        throw err;
      }
    );
  }

  // 参考 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    let _resolve, _reject;
    // 注意，静态方法中不能直接调用实例方法（如this.#isPromiseLike)
    const p = new MyPromise((resolve, reject) => {
      _resolve = resolve;
      _reject = reject;
    });
    if (p.#isPromiseLike(value)) {
      value.then(_resolve, _reject);
    } else {
      _resolve(value);
    }
    return p;
  }

  // 参考 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
  static reject(reason) {
    return new MyPromise((_, reject) => {
      reject(reason);
    });
  }
}

setTimeout(() => {
  console.log(1);
}, 0);
new MyPromise((resolve, reject) => {
  resolve(2);
}).then((data) => {
  console.log(data);
});
