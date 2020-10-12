class Vue {
    constructor (opt) {
        this.opt = opt
        this.observe(opt.data)
        const el = document.querySelector(opt.el)
        this.compile(el)
    }

    observe (data) {
        Object.keys(data).forEach(key => {
            let val = data[key]
            const dep = new Dep()
            Object.defineProperty(data, key, {
                get () {
                    if (Dep.target) {
                        dep.addSub(Dep.target) // 添加订阅者
                    }
                    return val
                },
                set (newVal) {
                    val = newVal
                    dep.notify(newVal)
                }
            })
        })
    }

    compile (node) {
        [].forEach.call(node.childNodes, child => {
            if (!child.firstElementChild && /\{\{(.*)\}\}/.test(child.innerHTML)) {
                let key = RegExp.$1.trim()
                child.innerHTML = child.innerHTML.replace(new RegExp('\\{\\{\\s*'+ key +'\\s*\\}\\}', 'gm'),this.opt.data[key])
                Dep.target = child
                this.opt.data[key]
                Dep.target = null
            } else if (child.firstElementChild) {
                this.compile(child)
            }
        })
    }
}

class Dep { // 依赖收集器（发布者的工具）
    constructor () {
        this.subs = new Set()
    }

    addSub (target) {
        this.subs.add(target)
    }

    notify (newVal) {
        this.subs.forEach(sub => {
            sub.innerHTML = newVal
        })
    }
}