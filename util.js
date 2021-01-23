// 匹配双大括号里面的内容，并替代，模板替换函数
function tplReplace(template, replaceObject) {
  return template.replace(/\{\{(.*?)\}\}/g, (node, key) => {
    return replaceObject[key]
  })
}

module.exports = {
  tplReplace
}