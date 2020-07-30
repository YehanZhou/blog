// 闭包实现私有方法
const Counter = (function() {
    let num = 0
    function changeNum(val) { // 私有方法，外部词法环境无法访问
        num += val
    }
    return {
        increment () {
            changeNum(1)
        },
        decrement () {
            changeNum(-1)
        },
        value () {
            console.log(num)
        }
    }
})()

// Counter.value() // 0
// Counter.increment()
// Counter.increment()
// Counter.value() // 2
// Counter.decrement()
// Counter.value() // 1

// 闭包常见错误：循环
function logIdx (i) {
    console.log(i)
}
function logIdxCb (i) {
    return function () {
        logIdx(i)
    }
}
function loop () {
    var btns = document.getElementsByTagName('button');
    for (var index = 0; index < btns.length; index++) {
        // 方法1：用闭包关联index
        // (function (i) {
        //     btns[i].onclick = function () {
        //         logIdx(i)
        //     }
        // })(index) // 马上把当前循环项的index与事件回调相关联起来

        // 方法2: 函数工厂，logIdxCb
        // btns[index].onclick = logIdxCb(index)

        // 方法3：btns对象属性保存index
        btns[index].num = index
        btns[index].onclick = function () {
            logIdx(this.num)
        }
    }
}
loop()