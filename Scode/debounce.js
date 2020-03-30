/*
 * @Author: sang.xu
 * @Date: 2020-03-30 12:30:47
 * @LastEditTime: 2020-03-30 12:37:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/issue/Scode/debounce.js
 */
const debounce = (fn, delay) => {
    let timer;
    return function() {
      let ctx = this;
      let arg = arguments;
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        fn.apply(ctx, arg);
      }, delay)
    }
}
const fn = () => {
    console.log('滚动');
}
document.body.addEventListener('scroll', debounce(fn))