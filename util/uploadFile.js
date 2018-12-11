const inspect = require('util').inspect
const path = require('path')
const fs = require('fs')
const Busboy = require('busboy')

/**
 * 同步创建文件目录
 * @param {string} dirname 目录绝对路径
 * @return {boolean} 创建目录结果
 */
function mkdirsSync (dirname) {
  if (fs.existsSync(dirname)) {
    return true
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname)
      return true
    }
  }
}

/**
 * 获取文件上传后缀名
 * @param {string} fileName 获取上传文件的后缀
 * @return {string} 文件后缀名
 */
function getSuffixName (fileName) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param {object} ctx koa上下文
 * @param {object} options 文件上传参数 fileType, path等
 * @return {promise}
 */
function uploadFile (ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})
  let fileType = options.fileType || 'common'
  let filePath = path.join(options.path, fileType)
  let mkdirResult = mkdirsSync(filePath)
  return new Promise((resolve, reject) => {
    console.log('文件上传中')
    let result = {
      success: false,
      formData: {}
    }
    // 解析请求文件事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      let _uploadFilePath = path.join(filePath, fileName)
      let saveTo = path.join(_uploadFilePath)
      // 文件保存到特定路径
      file.pipe(fs.createWriteStream(saveTo))
      file.on('end', function() {
        result.success = true
        result.message = '文件上传成功'
        console.log('文件上传成功')
        resolve(result)
      })
    })
    // 解析表单中其他字段信熹
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log(`表单字段数据 [${fieldname}]: value: ${inspect(val)}`)
      result.formData[fieldname] = inspect(val)
    })
    // 解析结束事件
    busboy.on('finish', function () {
      console.log('文件上传结束')
      resolve(result)
    })
    // 解析错误事件
    busboy.on('error', function () {
      console.log('文件上传出错')
      reject(result)
    })
    req.pipe(busboy)
  })
}

module.exports = {
  uploadFile
}