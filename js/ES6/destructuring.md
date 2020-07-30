---
title:  ECMAScript 6 变量解构赋值
date: 2016-12-06 11:17:21
tags: ECMAScript 6
categories: 理解ECMAScript 6
---

## 为什么解构很有用

ECMAScript 5以及以前的版本:
```javascript
let options = {
  repeat: true,
  save: false
};
// extract data from the object
let repeat = options.repeat, 
    save = options.save;
```
虽然这段代码看上去也挺简单的,但想象一下如果你要给大量的变量赋值,你得一个一个的赋值。
或者你需要取一个嵌套结构数据的某个值,也许你得遍历整个解构。
如果你能把数据解构成一些小小的片段,那获取信息将会更加容易。

## 对象的解构

```javascript
let node = {
  type: "Identifier",
  name: "foo"
};
let { type, name } = node;
console.log(type);      // "Identifier"
console.log(name);      // "foo"
```

**注意:** 必须初始化
```javascript
// syntax error!
var { type, name };
// syntax error!
let { type, name };
// syntax error!
const { type, name };
```

### 解构赋值

可以赋值给已经定义过的变量:
```javascript
let node = {
    type: "Identifier",
    name: "foo"
},
type = "Literal",
name = 5;
// assign different values using destructuring
({ type, name } = node);
console.log(type);      // "Identifier"
console.log(name);      // "foo"

```

### 默认值

```javascript
let node = {
    type: "Identifier",
    name: "foo"
};
let { type, name, value = true } = node;
console.log(type); // "Identifier"
console.log(name); // "foo"
console.log(value); // true
```

### 给不同名本地变量赋值

```javascript
let node = {
    type: "Identifier",
    name: "foo"
};
let { type: localType, name: localName } = node;
console.log(localType);     // "Identifier"
console.log(localName);     // "foo"
```

### 嵌套对象解构

```javascript
let node = {
    type: "Identifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
            column: 1 
            },
        end: {
            line: 1,
            column: 4
            }
        } 
};
let { loc: { start }} = node;
console.log(start.line); // 1
console.log(start.column); // 1
```

## 数组的解构

```javascript
let colors = [ "red", "green", "blue" ];
let [ firstColor, secondColor ] = colors;
console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```

只取你需要的部分
```javascript
let colors = [ "red", "green", "blue" ];
let [ , , thirdColor ] = colors;
console.log(thirdColor);        // "blue"
```

**注意:** 和对象的解构一样,必须初始化

### 解构赋值

可以赋值给已经定义过的变量:
```javascript
let colors = [ "red", "green", "blue" ],
    firstColor = "black",
    secondColor = "purple";
[ firstColor, secondColor ] = colors;
console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```

在ECMAScript 5 中交换变量值
```javascript
let a = 1,
    b = 2, tmp;
tmp = a;
a = b;
b = tmp;
console.log(a); // 2
console.log(b); // 1
```

在ECMAScript 6 中交换变量值
```javascript
let a = 1,
    b = 2;
[ a, b ] = [ b, a ];
console.log(a);     // 2
console.log(b);     // 1
```

### 默认值

```javascript
let colors = [ "red" ];
let [ firstColor, secondColor = "green" ] = colors;
console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```

### 嵌套数组解构

```javascript
let colors = [ "red", [ "green", "lightgreen" ], "blue" ];
// later
let [ firstColor, [ secondColor ] ] = colors;
console.log(firstColor);        // "red"
console.log(secondColor);       // "green"
```

### 剩余的元素

```javascript
let colors = [ "red", "green", "blue" ];
let [ firstColor, ...restColors ] = colors;
console.log(firstColor);        // "red"
console.log(restColors.length); // 2
console.log(restColors[0]);     // "green"
console.log(restColors[1]);     // "blue"
```
数组的第一个值赋给了firstColor,剩下的值组成了一个新的数组赋给了restColors。

ECMAScript 5克隆一个数组:
```javascript
var colors = [ "red", "green", "blue" ];
var clonedColors = colors.concat();
console.log(clonedColors);   // "[red,green,blue]"
```

ECMAScript 6克隆一个数组:
```javascript
let colors = [ "red", "green", "blue" ];
let [ ...clonedColors ] = colors;
console.log(clonedColors);  // "[red,green,blue]"
```

**注意:** 剩余的元素必须是解构数组的最后一个元素,后面不能有逗号。

### 混合解构

对象与数组嵌套混合的解构:
```javascript
let node = {
    type: "Identifier",
    name: "foo",
    loc: {
        start: {
            line: 1,
column: 1 },
        end: {
            line: 1,
column: 4 }
},
    range: [0, 3]
};
let {
    loc: { start },
    range: [ startIndex ]
} = node;
console.log(start.line); // 1
console.log(start.column); // 1
console.log(startIndex); // 0
```

## 参数解构

```javascript
function setCookie(name, value, { secure, path, domain, expires }) {
    // code to set the cookie
}
setCookie("type", "js", {
    secure: true,
    expires: 60000
});
```

### 解构的参数是必需的

```javascript
// error!
setCookie("type", "js");
```

它实际上是这样运行的:
```javascript
function setCookie(name, value, options) {
    let { secure, path, domain, expires } = options;
    // code to set the cookie
}
```
当解构赋值的右边是null或者undefined,就会抛出错误。

如果你希望解构参数是可选的,你可以这样写:
```javascript
function setCookie(name, value, { secure, path, domain, expires } = {}) {
    // empty }
```

### 解构参数的默认值

```javascript
function setCookie(name, value,
    {
        secure = false,
        path = "/",
        domain = "example.com",
        expires = new Date(Date.now() + 360000000)
} = {} ){
// empty }
```




