// 消除异步的传染性
// 思路：抛错误，执行两次
// 但是这样写不是很有意义

function getUser() {
  return fetch(
    "https://mu-json-server.typicode.com/typecode/demo/profile"
  ).then((resp) => resp.json());
}

function m1() {
  // other works
  return getUser();
}

function m2() {
  // other works
  return m1();
}

function main() {
  const user = m2();
  console.log(user);
}

function run(func) {
  let cache = [];
  let i = 0;
  const _originalFetch = fetch;
  window.fetch = (...args) => {
    // 交付缓存结果
    if (cache[i]) {
      if (cache[i].status === "fulfilled") {
        return cache[i].data;
      } else if (cache[i].status === "rejected") {
        throw cache[i].data;
      }
    }
    const result = {
      status: "pending",
      data: null,
      err: null,
    };
    cache[i++] = result;
    // 执行异步函数
    const promsie = _originalFetch(...args)
      .then((resp) => resp.json())
      .then(
        (resp) => {
          result.status = "fulfilled";
          result.data = resp;
        },
        (err) => {
          result.status = "rejected";
          result.data = err;
        }
      );
    // 报错
    throw promsie;
  };
  try {
    func();
  } catch (err) {
    // 什么时候重新执行 func
    if (err instanceof Promise) {
      const reRun = () => {
        i = 0;
        func();
      };
      err.then(reRun, reRun);
    }
  }
}

run(main);
