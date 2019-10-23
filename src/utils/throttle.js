function throttle(fn, time) {
    let last = 0;
    return function() {
        let context = this;
        let args = arguments;
        let now = +new Date();
        if (now - last >= time) {
            last = now;
            fn.apply(context, args);
        }
    };
}
const better_scroll = throttle(() => {
    console.log('触发了滚动事件');
    console.log(this);
}, 1000);

document.addEventListener('scroll', better_scroll);
