class myPromise {
    constructor (executor) {
        // 初始状态
        this.state = 'pending';
        // 初始resolve的值
        this.value = '';
        // 初始reject的值
        this.reason = '';
        // resolve队列
        this.resolveCallbacks = [];
        // reject队列
        this.rejectCallbacks = [];
        // resolve 方法
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
            }
            this.value = value;
            this.resolveCallbacks.forEach((fun) => {
                fun();
            });
        }
        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
            }
            this.reason = reason;
            this.rejectCallbacks.forEach((fun) => {
                fun();
            });
        }
        executor(resolve, reject);
    }
    then(onFulfilled, onRejected) {
        if (this.state === 'fulfilled') {
            onFulfilled(this.value);
        }
        if (this.state === 'rejected') {
            onRejected(this.reason);
        }
        if (this.state === 'pending') {
            this.resolveCallbacks.push(() => {
                onFulfilled(this.value);
            })
            this.rejectCallbacks.push(() => {
                onRejected(this.reason);
            })
        }
    }
}

const promise = new myPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(1);
    }, 1000)
})
promise.then((res) => {
    console.log(res);
}).then(() => {
    console.log(123)
})

function Class1() {
    this.name = 'xusang';
}
Class1.prototype.getName = function() {
    console.log(this.name);
}
function Class2() {
    this.type = 'people';
}
Class2.prototype.getType = function() {
    console.log(this.type);
}
function Class3() {
    Class1.apply(this, arguments);
    Class2.apply(this, arguments);
}
Class3.prototype = Object.create(Object.assign(Class1.prototype, Class2.prototype));
Class3.prototype.constructor = Class3;
let man = new Class3();
console.log(man.name);  //xusang
man.getName();  //xusang
console.log(man.type);  //people
man.getType();  //people