const path = require('path')
const fs = require('fs')
const dir = require('./dir')
const file = require('./file')

/**
 * 获取静态资源
 * @param {object} ctx koa上下文
 * @param {string} fullStaticPath 静态资源目录在本地的绝对路径
 * @return {string} 请求获取的本地内容
 */
async function content(ctx, fullStaticPath) {
  // 请求资源的绝对路径
  let reqPath = path.join(fullStaticPath, ctx.url)
  // 判断请求是否为存在目录或者文件
  let exist = fs.existsSync(reqPath)
  // 返回请求内容，默认为空
  let content = ''
  if (!exist) {
    // 请求不存在，则返回404
    content = '404 Not found'
  } else {
    // 判断请求内容是文件还是文件夹
    let stat = fs.statSync(reqPath)
    if (stat.isDirectory()) {
      content = dir(ctx.url, reqPath)
    } else {
      content = await file(reqPath)
    }
  }
  return content
}
module.exports = content