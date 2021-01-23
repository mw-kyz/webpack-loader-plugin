const { readFileSync } = require("fs")
const { resolve } = require('path')
const { compileHTML } = require('./compile')

const INNER_MARK = '<!-- inner -->'

class MdToHtmlPlugin {
  constructor ({ template, filename}) {
    if (!template) {
      // 如果用户没有传要转换的md文件的模板，抛出错误
      throw new Error('The config for "template" must be configured')
    }

    this.template = template  // 接收要转换的md文件的路径
    this.filename = filename ? filename : 'md.html' // 转换后的html文件名，如果没传，就给默认值
  }

  apply (compiler) {
    compiler.hooks.emit.tap('md-to-html-plugin', (compilation) => {
      const _assets = compilation.assets; // 获取静态资源
      const _mdContent =  readFileSync(this.template, 'utf-8') // 读取md模板文件
      const _templateHTML =  readFileSync(resolve(__dirname, 'template.html'), 'utf-8') // 读取html模板文件
      const _mdContentArr = _mdContent.split('\n')  // 用换行符将字符串分割为数组
      const _htmlStr = compileHTML(_mdContentArr)

      const _finalHTML = _templateHTML.replace(INNER_MARK, _htmlStr)

      _assets[this.filename] = {
        source() {
          return _finalHTML
        },
        size() {
          return _finalHTML.length
        }
      }
    })
  }
}

module.exports = MdToHtmlPlugin