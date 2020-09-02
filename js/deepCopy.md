# 1. JSON.stringify()以及JSON.parse()
优点：简易
缺点：使用JSON.stringify()以及JSON.parse()它是不可以拷贝 undefined ， function， RegExp 等等类型的
当然对于函数可以使用JSON.stringify()和JSON.parse()的第二个参数进行转换
```javascript
function stringifyRep(key, value) {
    if (typeof value === "function") {
        return `${value}`;
    }
    return value;
}
function parseRep(key, value) {
    return eval(value);
}
var a = {
    b: () => 1 + 1
}
var aa = JSON.parse(JSON.stringify(a, stringifyRep), parseRep)
```


# 2.Object.assign(target, source)
```javascript
Object.assign({}, obj)
```
仅可拷贝第一层


# 3.扩展符 {...obj}
仅可拷贝第一层


# 4. 数组中的slice() & concat()
```javascript
var arr1 = [1,2,3]
var arr2 = arr1.slice()  // 方法一
// var arr2 = arr1.concat()  //方法二
arr2.push(4)
console.log('arr1:', arr1)  // arr1: [1, 2, 3]
console.log('arr2:', arr2)  // arr1: [1, 2, 3, 4]
```

# 5. 第三方库
 jQuery.extend 和 lodash.cloneDeep

# 6. 递归拷贝——最优解决方案
## 6.1 简易版递归深拷贝
```javascript
function deepClone(obj) {
    if(obj === null) return null;
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    if(typeof obj !== 'object') {
        return obj;
    }
    let t = new obj.constructor();
    for(let key in obj) {
        t[key] = deepClone(obj[key]);
    }
    return t;
}
```
## 6.2 vuex中的深拷贝代码
vuex中深拷贝代码考虑了循环引用等多种问题，更加完善，且写的简明，学习一下：
https://github.com/vuejs/vuex/blob/dev/src/util.js#L22
```javascript
export function find (list, f) {
  return list.filter(f)[0]
}
/**
 * 深拷贝传入的对象：
 * 缓存所有嵌套对象和它们的拷贝对象。
 * 如果传入对象为循环引用结构，利用缓存过的拷贝避免无限循环。
 * 
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy (obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // 检测obj是否是循环引用结构，是的话直接返回它的拷贝对象
  const hit = find(cache, c => c.original === obj)
  if (hit) {
    return hit.copy
  }

  const copy = Array.isArray(obj) ? [] : {}
  // 首先将copy放入cache, 因为我们需要在递归deepCopy的时候引用它
  cache.push({
    original: obj,
    copy
  })

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache)
  })

  return copy
}
```
