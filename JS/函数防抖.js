function debounce(fn, time) {
    let timer = null;
    return function () {
        let content = this; //保持this正确指向
        console.log(content)
        let args = arguments;  //保持event事件对象
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(function () {
            fn.apply(content, args)
        }, time)
    }
}