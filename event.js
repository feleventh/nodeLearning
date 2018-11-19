class Evente {
  constructor () {
    this.map = {}
  }
  add (name, fn) {
    if (this.map[name]) {
      this.map[name].push(fn)
      return
    } else {
      this.map[name] = [fn]
      return
    }
  }
  emit (name, ...args) {
    this.map[name].forEach(fn => {
      fn(...args)
    });
  }
}
let e = new Evente()
e.add('hello', (err, name) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(name)
})
e.emit('hello', '事件触发')
e.emit('hello', null, '错误信息')