const { randomNum } = require('./util')

// 以空字符串开头，以空格结尾的1个以上字符（用来匹配# - 等的）
const reg_mark = /^(.+?)\s/
// 以#号开头的字符串
const reg_sharp = /^\#/
// 以-号开头
const reg_crossbar = /^\-/
// 以数字开头
const reg_number = /^\d/

// 通过数组创建html树
function createTree (mdArr) {
  let _htmlPool = {}
  // 记录上一行的标识符
  let _lastMark = ''
  let _key = 0

  mdArr.forEach((mdFragment) => {
    // 匹配#、-等字符
    const matched = mdFragment.match(reg_mark)
    
    if (matched) {
      // 匹配出来的子表达式
      const mark = matched[1]
      // input的值就是mdFragment的值
      const input = matched['input']

      // 如果存在#号，做相关处理
      if (reg_sharp.test(mark)) {
        // 根据#数量决定是h几标签，一个就是h1，两个就是h2
        const tag = `h${ mark.length }`
        // 将#替换为空，只留下内容
        const tagContent = input.replace(reg_mark, '').trim()
        // 如果连续，就放在一起
        if (_lastMark === mark) {
          _htmlPool[`${ tag }-${ _key }`].tags = [..._htmlPool[`${ tag }-${ _key }`].tags, `<${ tag }>${ tagContent}</${ tag }>`]
        } else {
          _lastMark = mark
          _key = randomNum()
          _htmlPool[`${ tag }-${ _key }`] = {
            type: 'single',
            tags: [`<${ tag }>${ tagContent}</${ tag }>`]
          }
        }
      }

      // 如果存在-号，做相关处理
      if (reg_crossbar.test(mark)) {
        const tag = `li`
        // 将-替换为空，只留下内容
        const tagContent = input.replace(reg_mark, '').trim()

        if (_lastMark === mark) {
          _htmlPool[`ul-${ _key }`].tags =  [..._htmlPool[`ul-${ _key }`].tags, `<${ tag }>${ tagContent}</${ tag }>`]
        } else {
          _lastMark = mark
          _key = randomNum()
          _htmlPool[`ul-${ _key }`] = {
            type: 'wrap',
            tags: [`<${ tag }>${ tagContent }</${ tag }>`]
          }
        }
      }
      // 如果存在数字，做相关处理
      if (reg_number.test(mark)) {
        const tag = 'li'
        // 将数字替换为空，只留下内容
        const tagContent = input.replace(reg_mark, '').trim()
        // 判断上一个是不是也是以数字开头的，是的话就是属于同一个ol里的
        if (reg_number.test(_lastMark)) {
          _htmlPool[`ol-${ _key }`].tags =  [..._htmlPool[`ol-${ _key }`].tags, `<${ tag }>${ tagContent}</${ tag }>`]
        } else {
          _lastMark = mark
          _key = randomNum()
          _htmlPool[`ol-${ _key }`] = {
            type: 'wrap',
            tags: [`<${ tag }>${ tagContent }</${ tag }>`]
          }
        }
      }
    }
  })
  
  return _htmlPool
}

function compileHTML (_mdArr) {
  const _htmlPool = createTree(_mdArr)

  let _htmlStr = ''
  let item

  for (let key in _htmlPool) {
    item = _htmlPool[key]

    if (item.type === 'single') {
      item.tags.forEach((tag) => {
        _htmlStr += tag
      })
    } else if (item.type === 'wrap') {
      let _list = `<${ key.split('-')[0] }>`

      item.tags.forEach((tag) => {
        _list += tag
      })

      _list += `</${ key.split('-')[0] }>`

      _htmlStr += _list
    }
  }
  return _htmlStr
}

module.exports =  {
  compileHTML
}

/**
 * {
 *    h1: {
 *      type: 'single',
 *      tags: ['<h1>这是一个h1的标题</h2>']
 *    },
 *    ul: {
 *      type: 'wrap',
 *      tags: [
 *        '<li>这是ul列表第1项</li>'
 *        '<li>这是ul列表第2项</li>'
 *        '<li>这是ul列表第3项</li>'
 *        '<li>这是ul列表第4项</li>'
 *        '<li>这是ul列表第5项</li>'
 *        '<li>这是ul列表第6项</li>'
 *      ]
 *    }
 * }
 */