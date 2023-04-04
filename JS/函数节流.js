function throttle(fn, time) {
  let pre = new Date();
  return function () {
    let now = new Date();
    let content = this;
    let args = arguments;
    if (now - pre >= time) {
      let context = this;
      fn.apply(this, arguments);
      pre = now;
    }
  };
}
