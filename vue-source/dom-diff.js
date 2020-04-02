const arrNew = [1, 2, 3, 7]
const arrOld = [1, 2, 3]

compareArr(arrOld, arrNew)
compareArrFor(arrOld, arrNew)
function compareArrFor (arrOld, arrNew) {
    let count = 0
    for (let i = 0; i < arrNew.length; i++) {
        count++
        // console.log('for loop level 1')
        const aNew = arrNew[i]
        for (let j = 0; j < arrOld.length; j++) {
            count++
            // console.log('for loop level 2')
            const aOld = arrOld[j]
            if (aNew === aOld) {
                console.log(aNew)
            }
        }
        // if (arrOld.indexOf(aNew) > -1) {
        //     console.log(aNew)
        // }
    }
    console.log('for loop count:' + count)
}
function compareArr (arrOld, arrNew) {
    let oldStartIdx = 0
    let oldEndIdx = arrOld.length - 1
    let oldStartVnode = arrOld[0]
    let oldEndVnode = arrOld[oldEndIdx]
    let newStartIdx = 0
    let newEndIdx = arrNew.length - 1
    let newStartVnode = arrNew[0]
    let newEndVnode = arrNew[newEndIdx]
    let count = 0
    // let idxInOld
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        count++
        // console.log(`loop index no.${count}`)
        if (oldStartVnode === undefined) {
            oldStartVnode = arrOld[++oldStartIdx]
        } else if (newStartVnode === undefined) {
            newStartVnode = arrNew[++newStartIdx]
        } else if (newStartVnode === oldStartVnode) {
            console.log(oldStartVnode)
            newStartVnode = arrNew[++newStartIdx]
            oldStartVnode = arrOld[++oldStartIdx]
        } else if (newEndVnode === oldEndVnode) {
            console.log(oldEndVnode)
            newEndVnode = arrNew[--newEndIdx]
            oldEndVnode = arrOld[--oldEndIdx]
        } else if (newEndVnode === oldStartVnode) {
            console.log(oldStartVnode)
            newEndVnode = arrNew[--newEndIdx]
            oldStartVnode = arrOld[++oldStartIdx]
        } else if (newStartVnode === oldEndVnode) {
            console.log(oldEndVnode)
            newStartVnode = arrNew[++newStartIdx]
            oldEndVnode = arrOld[--oldEndIdx]
        } else {
            for (let j = 0; j < arrOld.length; j++) {
                count++
                const aOld = arrOld[j]
                if (newStartVnode === aOld) {
                    console.log(newStartVnode)
                }
            }
            // let idxInOld = arrOld.indexOf(newStartVnode)
            // if (idxInOld > -1) {
            //     console.log('indexOf:' + newStartVnode)
            // }
            newStartVnode = arrNew[++newStartIdx]
        }
    }
    console.log('loop count:' + count)
}