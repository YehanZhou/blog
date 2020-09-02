function Button () {
    this.clicked = false
    this.click = function () {
        this.clicked = true
        console.log('clicked!', button.clicked)
        console.log(this)
    }.bind(this)
}
var button = new Button()
var elem = document.getElementById('test')
elem.addEventListener('click', button.click)

// 4. 表达式
var ninjia1 = {
    whoAmI: function () {
        return this
    }
}

var ninjia2 = {
    whoAmI: ninjia1.whoAmI
}

var identify = ninjia2.whoAmI

console.log('ninjia1.whoAmI() === ninjia1', ninjia1.whoAmI() === ninjia1) // t

console.log('ninjia2.whoAmI() === ninjia1', ninjia2.whoAmI() === ninjia1) // f

console.log('identify() === ninjia1', identify() === ninjia1) // f

console.log('ninjia1.whoAmI.call(ninjia2) === ninjia2', ninjia1.whoAmI.call(ninjia2) === ninjia2) // t

// 5. new 箭头
function Ninjia1 () {
    this.whoAmI = () => this
}

var ninjia1 = new Ninjia1()
var ninjia2 = {
    whoAmI: ninjia1.whoAmI
}

console.log('ninjia1.whoAmI() === ninjia1', ninjia1.whoAmI() === ninjia1) // t
console.log('ninjia2.whoAmI() === ninjia2', ninjia2.whoAmI() === ninjia2) // f

// 6. bind
function Ninjia2 () {
    this.whoAmI = function () {
        return this
    }.bind(this)
}

var ninjia1 = new Ninjia2()
var ninjia2 = {
    whoAmI: ninjia1.whoAmI
}

console.log('ninjia1.whoAmI()', ninjia1.whoAmI()) // ninjia1
console.log('ninjia2.whoAmI()', ninjia2.whoAmI()) // ninjia1
console.log('ninjia1.whoAmI() === ninjia1', ninjia1.whoAmI() === ninjia1) // t
console.log('ninjia2.whoAmI() === ninjia2', ninjia2.whoAmI() === ninjia2) // f

// 5和6说明
/**
 * 箭头函数和bind，都是在函数创建时确定this值，
 * 所以当调用构造函数时，this就永久确定了
 * 结合8对象字面量，this永久绑定成window了
 */

// 7. 纯表达式
function Ninjia3 () {
    this.whoAmI = function () {
        return this
    } // .bind(this)
}

var ninjia1 = new Ninjia3()
var ninjia2 = {
    whoAmI: ninjia1.whoAmI
}
console.log('ninjia1.whoAmI()', ninjia1.whoAmI()) // ninjia1
console.log('ninjia2.whoAmI()', ninjia2.whoAmI()) // ninjia1

console.log('ninjia1.whoAmI() === ninjia1', ninjia1.whoAmI() === ninjia1) // t
console.log('ninjia2.whoAmI() === ninjia2', ninjia2.whoAmI() === ninjia2) // f

// 8. 对象字面量和箭头函数
var ninjia = {
    whoAmI: () => this,
    whoAmI2: function () { return this },
    whoAmI3: function () { return this }.bind(this)
}

console.log('ninjia.whoAmI()', ninjia.whoAmI()) // window
console.log('ninjia.whoAmI2()', ninjia.whoAmI2()) // ninjia
console.log('ninjia.whoAmI3()', ninjia.whoAmI3()) // window
/**
 * 箭头函数是作为对象字面量的属性定义的，对象字面量在全局代码中定义，因此，箭头函数内部this值与全局代码的this值相同
 */
console.log('ninjia.whoAmI() === ninjia', ninjia.whoAmI() === ninjia) // f
console.log('ninjia.whoAmI2() === ninjia', ninjia.whoAmI2() === ninjia) // t
console.log('ninjia.whoAmI3() === ninjia', ninjia.whoAmI3() === ninjia) // f