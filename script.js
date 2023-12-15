const displayHistory = document.querySelector(".display-history")
const display = document.querySelector(".display-input")
const temporary = document.querySelector(".display-temporary")
const num = document.querySelectorAll(".num")
const ops = document.querySelectorAll(".ops")
const equal = document.querySelector(".equal")
const clear_all = document.querySelector(".all-clear")
const clear = document.querySelector(".clear")

let disNum1 = ""
let disNum2 = ""
let result = null
let lastOps = ""
let haveDot = false

num.forEach((num)=>{
    num.addEventListener("click", (e) => {
        if(e.target.innerText === "." && !haveDot){
            console.log (e.target.innerText)
            haveDot = true
        }else if(e.target.innerText === "." && haveDot){
            return
        }
        disNum2 += e.target.innerText
        display.innerText = disNum2
    })
})

ops.forEach((ops) => {
    ops.addEventListener("click", (e) => {
        if(!disNum2) return
        haveDot = false
        const opsName = e.target.innerText
        if (disNum1 && disNum2 && lastOps){
            mathOps()
        }else{
            result = parseFloat(disNum2)
        }
        clearVar(opsName)
        lastOps = opsName
    })
})

function clearVar(name = ""){
    disNum1 += disNum2 + " " + name + " "
    displayHistory.innerText = disNum1
    display.innerText = ""
    disNum2 = ""
    temporary.innerText = result
}

function mathOps(){
    if (lastOps === "X"){
        result = parseFloat(result) * parseFloat(disNum2)
    }else if(lastOps === "+"){
        result = parseFloat(result) + parseFloat(disNum2)
    }else if(lastOps === "-"){
        result = parseFloat(result) - parseFloat(disNum2)
    }else if(lastOps === "/"){
        result = parseFloat(result) / parseFloat(disNum2)
    }else if(lastOps === "%"){
        result = parseFloat(result) % parseFloat(disNum2)
    }
}

equal.addEventListener("click", () => {
    if (!disNum1 || !disNum2) return
    haveDot = false
    mathOps()
    clearVar()
    display.innerText = result
    temporary.innerText = ""
    disNum2 = result
    disNum1 = ""
})

clear_all.addEventListener("click", () => {
    disNum1 = ""
    disNum2 = ""
    haveDot = false
    displayHistory.innerText = ""
    display.innerText = ""
    temporary.innerText = ""
    result = null
    lastOps = ""
})

clear.addEventListener("click", () => {
    display.innerText = ""
    disNum2 = ""
})

window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9"     
    ){
        clickButton(e.key)
    }else if(e.key === "+" || e.key === "-" || e.key === "%" || e.key === "/"){
        clickOps(e.key)
    }else if(e.key === "x" || e.key === "*"){
        clickOps("X")
    }else if(e.key === "Enter" || e.key === "="){
        clickEqual()
    }else if(e.key === "Backspace"){
        clickClear()
    }
})

function clickButton(key){
    num.forEach((button) => {
        if (button.innerText === key)
        button.click()
    })
}

function clickOps(key){
    ops.forEach((ops) => {
        if (ops.innerText === key)
        ops.click()
    })
}

function clickEqual(){
    equal.click()
}

function clickClear(){
    clear_all.click()
}