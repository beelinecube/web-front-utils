export let isUsingMicroTask = false

// 回调队列
const callbacks = []
// 是否处于处理状态
let pending = false

// 对回调队列的函数进行调用
function flushCallbacks() {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i=0; i<copies.length; i++) {
    copies[i]()
  }
}

let timerFunc

if (typeOf Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    
  }
}