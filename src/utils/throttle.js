function throttle(fn, time) {
    let last = 0;
    return function() {
        let now = +new Date();
        let arg = arguments;
        let context = this;
        if (now - last > time) {
            last = now;
            fn.apply(context, arg);
        }
    };
}
const better_scroll = throttle(() => console.log('触发了滚动事件'), 1000);

document.addEventListener('scroll', better_scroll);

function debounce(fn, times) {
    let time = null;
    return function() {
        let arg = arguments;
        let context = this;
        if (time) {
            clearTimeout(time);
        }
        time = setTimeout(function() {
            fn.apply(context, arg);
        }, times);
    };
}
const better_scrolls = debounce(() => console.log('触发了滚动事件'), 1000);

document.addEventListener('scroll', better_scrolls);

function thdebounce(fn, times) {
    let time = null;
    let last = 0;
    return function() {
        let arg = arguments;
        let context = this;
        let now = +new Date();
        if (now - last < times) {
            clearTimeout(time);
            time = setTimeout(function() {
                last = now;
                fn.apply(context, arg);
            }, times);
        } else {
            last = now;
            fn.apply(context, arg);
        }
    };
}

const better_scrollss = thdebounce(() => console.log('触发了滚动事件'), 1000);

document.addEventListener('scroll', better_scrollss);
