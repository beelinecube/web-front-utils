// 做了cache缓存
function cache(cb) {
  const cache = Object.create(null)
  return (function cachedFn(str) {
    const hit = cache[str]
    return hit || (cache[str] = cb(str))
  })
}

let cnt = 0

const fn = cache(id => {
  console.log("===== " + id + " =====")
  cnt++
  return id + cnt
})

// fn(12)
// fn(12)
// fn(13)

// 是否在浏览器中
const inBrowser = ((typeof window) !== 'undefined')

function FrameWork() {

}

console.log(FrameWork.constructor.super)