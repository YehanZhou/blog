// 1.利用闭包实现私有变量和私有方法
const Counter = (function () {
    var count = 0
    function changeBy(val) {
        count += val
    }
    return {
        increment () {
            changeBy(1)
        },
        decrement () {
            changeBy(-1)
        },
        value () {
            console.log(count)
        }
    }
})()

Counter.value()
Counter.increment()
Counter.increment()
Counter.value()
Counter.decrement()
Counter.value()

// 2.闭包经典循环问题
// 2-1.

const showText = function (i) {
    console.log(i)
}

function loop () {
    const btns = document.getElementsByTagName('button')
    // 行不通
    // for (var index = 0; index < btns.length; index++) {
    //     btns[index].onclick = function () {
    //         showText(index)
    //     }
    // }

    // 1. 转为数组，用forEach
    // Array.from(btns).forEach((btn,idx) => {
    //     btns[idx].onclick = function () {
    //         showText(idx)
    //     }
    // })

    // 2. 加一层闭包，保存对index的引用
    // for (var index = 0; index < btns.length; index++) {
    //     btns[index].onclick = function () {
    //         return function () { showText(index) }
    //     }
    // }

    // 3. 匿名函数加一层闭包，保存对index的引用
    for (var index = 0; index < btns.length; index++) {
        (function(index) {
            btns[index].onclick = function () {
                showText(index)
            }
        })(index)
    }
}

loop()
