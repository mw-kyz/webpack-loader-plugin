const { tplReplace } = require('../../util.js')
const { getOptions } = require('loader-utils')

function tplLoader (source) {
  source = source.replace(/\s+/g, '') // 去除空格换行等
  const { log } = getOptions(this) // 获取用户传的log值

  const _log = log ? `console.log('compiled the file which is from ${ this.resourcePath }')` : '' // 

  // 返回一个抛出方法的字符串给babel-loader调用
  return `
    export default (options) => {
      ${ tplReplace.toString() } // 将方法转换为字符串形式
      ${ _log }
      return tplReplace('${ source }', options) // 这里的source还得加个单引号变成字符串
    }
  `
}

// function tpl (options) {
//   function tplReplace(template, replaceObject) {
//     return template.replace(/\{\{(.*?)\}\}/g, (node, key) => {
//       return replaceObject[key]
//     })
//   }

//   return tplReplace()
// }

module.exports = tplLoader