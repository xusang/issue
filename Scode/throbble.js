const throttle = (fn, delay) => {
    let last = 0;
    return function() {
      let ctx = this;
      let now = new Date();
      let arg = arguments;
      if (now - last > delay) {
        fn.apply(ctx, arguments);
        last = now;
      }
    }
}
const fn = () => {
    console.log('触发')
}
throttle(fn)