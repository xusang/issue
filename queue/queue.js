const isSellerQueue = (callback) => {
    // 判断标志位 是否存在身份标志 默认-1
    if (window.is_seller_type === 1 || window.is_seller_type === 0) { // 存在标志位判断身份，直接回调
        callback(window.is_seller_type)
    } else { // 不存在标志
        // 判断标志位 是否hybrid执行中
        if (window.is_seller_is_queue) {
            // 如果不存在任务数组队列则创建数组
            if (!window.is_seller_queue_arr) {
                window.is_seller_queue_arr = [];
            }
            window.is_seller_queue_arr.push(callback);
        } else {
            // hybrid不在执行中
            window.is_seller_is_queue = 1;
            window.window.hybrid && window.hybrid.config({
                jsApiList: {getUserInfo: 'optional'}
            }, (error, result) => {
                if (error) {
                    window.is_seller_is_queue = 0;
                    return;
                }
                // result中无type
                if (result[0] !== 'getUserInfo') {
                    window.is_seller_type = 0;
                    window.is_seller_is_queue = 0;
                    return;
                }
                window.hybrid.getUserInfo((error, res) => {
                    if (error) {
                        window.is_seller_is_queue = 0;
                        return;
                    }
                    if (res.type * 1 === 2) {
                        window.is_seller_type = 1;
                    } else {
                        window.is_seller_type = 0;
                    }
                    callback(window.is_seller_type);
                    // 若存在未执行队列
                    if (window.is_seller_queue_arr && window.is_seller_queue_arr.length !== 0) {
                        window.is_seller_queue_arr.forEach((ele, index) => {
                            typeof ele === 'function' && ele(window.is_seller_type);
                            window.is_seller_queue_arr.splice(index, 1);
                        })
                    }
                    // 去除执行中
                    window.is_seller_is_queue = 0;
                });
            });
        }
    }
}

export default isSellerQueue