const Koa = require('koa')
const path = require('path')
const app = new Koa()

const {uploadFile} = require('./util/uploadFile')

app.use( async (ctx) => {
  if (ctx.url === '/' && ctx.method === 'GET') {
    let html = `
      <h1>koa2 upload demo</h1>
      <form method="POST" action="/upload" enctype="multipart/form-data">
        <p>file upload</p>
        <span>picName:</span><input name="picName" type="text" /><br>
        <input name="file" type="file" /><br>
        <button type="submit">submit</button>
      </form>
    `
    ctx.body = html
  } else if (ctx.url === '/upload' && ctx.method === 'POST') {
    // 上传文件请求处理
    let result = {success: false}
    let serverFilePath = path.join(__dirname, 'upload-files')
    // 上传文件事件
    result = await uploadFile(ctx, {
      fileType: 'album',
      path: serverFilePath
    })
    ctx.body = result
  } else {
    ctx.body = '<h1>404 !!!</h1>'+ ctx.utl + ctx.method
  }
})
app.listen(3000, () => {
  console.log('demo upload is starting at port 3000')
})