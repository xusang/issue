/*
 * @Author: sang.xu
 * @Date: 2020-03-30 12:26:30
 * @LastEditTime: 2020-03-30 12:29:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /github/issue/youzanDemo/index.js
 */
// let t2 = `list[0]=a&list[1]=b&x=1&y=2`;
// fn(t2) =>
// {
//     list: ['a', 'b'],
//     x: 1,
//     y: 2
// }
let t1 = `x=1&y=2`;
let t2 = `list[0]=a&list[1]=b&x=1&y=2`;
const format = (str) => {
    let obj = {};
    let arr = str.split('&');
    arr.forEach((ele) => {
        let _arr = ele.split('=');
        let key = _arr[0];
        let value = _arr[1];
        if (key.match(/\[(\d*)\]/)) {
        const index = key.match(/\[(\S*)\]/)[1];
        key = key.replace(key.match(/\[(\S*)\]/)[0], '');
        if (!obj[key]) {
            obj[key] = [];
        }
        obj[key][index] = value;
        } else {
        obj[key] = value;
        }
        
    });
    return obj;
}
format(t2)
