# this的四种用法
              
在函数执行时，this 总是指向调用该函数的对象。
要判断 this 的指向，其实就是判断 this 所在的函数属于谁。
在《javaScript语言精粹》这本书中，把 this出现的场景分为四类，简单的说就是：
**有对象就指向调用对象,没调用对象就指向全局对象,用new构造就指向新对象，通过 apply 或 call 或 bind 来改变 this 的所指。**


1. 函数有所属对象时：指向所属对象
   
函数有所属对象时，通常通过 . 表达式调用，这时 this自然指向所属对象。比如下面的例子：
```javascript
 var  myObject = {
     value: 100
 }

 myObject.getValue = function () {
     console.log(this.value) // 输出100
     console.log(this) // 输出 { value: 100, getValue: [Function] }, 其实就是 myObject 对象本身
     return this.value
 }

 console.log(myObject.getValue()) // 输出100
 ```
 getValue() 属于对象 myObject，并由 myOjbect 进行 . 调用，因此 this 指向对象 myObject。

2. 函数没有所属对象：指向全局对象
```javascript
var myObject = { value: 100 }
myObject.getValue = function () {
    var foo = function () {
        console.log(this) // 输出全局对象 global
        console.log(this.value) // undefined
    }
    foo()
    return this.value
}
console.log(myObject.getValue()) // 100
```
在上述代码块中，foo 函数虽然定义在 getValue的函数体内，但实际上它既不属于 getValue 也不属于 myObject。foo 并没有被绑定在任何对象上，所以当调用时，它的 this 指针指向了全局对象 global。据说这是个设计错误。

但当foo为箭头函数时,foo的this指针指向了外层函数所绑定的对象上

```javascript
var myObject = { value: 100 }
myObject.getValue = function () {
    var foo = () => {
        console.log(this) // 输出 { value: 100, getValue: [Function] }, 其实就是 myObject 对象本身
        console.log(this.value) // 100
    }
    foo()
    return this.value
}
console.log(myObject.getValue()) // 100
```

3. 构造器中的 this：指向新对象

js 中，我们通过 new 关键词来调用构造函数，此时 this会绑定在该新对象上。

```javascript
var SomeClass = function () {
    this.value = 100
}
var myCreate = new SomeClass()
console.log(myCreate.value) // 输出100
```

顺便说一句，在 js 中，构造函数、普通函数、对象方法、闭包，这四者没有明确界线。界线都在人的心中。

4. apply 和 call 调用以及 bind 绑定：指向绑定的对象
 
* apply() 方法接受两个参数第一个是函数运行的作用域，另外一个是一个参数数组(arguments)。
* call() 方法第一个参数的意义与apply()方法相同，只是其他的参数需要一个个列举出来。
* bind() 方法调用方式同call，但他不是直接调用，而是返回一个新的函数
  
简单来说，call 的方式更接近我们平时调用函数，而 apply 需要我们传递 Array 形式的数组给它。它们是可以互相转换的。

```javascript
var myObject = { value: 100 }
var foo = function () {
    console.log(this)
}
foo() // 全局变量 global
foo.apply(myObject) // { value: 100 }
foo.call(myObject) // { value: 100 }

var newFoo = foo.bind(myObject)
newFoo() // { value: 100 }
```
