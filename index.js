const Koa = require('koa')
// const convert = require('koa-convert')
// const loggerGenetrator = require('./middleware/logger-generator')
const loggerAsync = require('./middleware/logger-async')
const app =  new Koa()

// app.use(convert(loggerGenetrator()))
app.use(loggerAsync())
app.use((ctx) => {
  ctx.body = 'hello, world!'
})

app.listen(3000)
console.log('this server is starting at port 3000!')