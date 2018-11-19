function myAsyncFunction (name, fn) {
  setTimeout(() => {
    fn(null, '-' + name + '-')
  }, 3000)
}
myAsyncFunction('hello node.js', (err, name) => {
  if(err) {
    console.log(err)
  } else {
    console.log(name)
  }
})