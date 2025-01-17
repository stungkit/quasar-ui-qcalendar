const LRU = require('lru-cache'),
  hash = require('hash-sum')

const md = require('./markdown.js'),
  { convertToRelated, flatMenu } = require('./flat-menu.js')

const { getVueComponent, parseFrontMatter } = require('./md-loader-utils.js')

const cache = new LRU({ max: 1000 })

module.exports = function (source) {
  const key = hash(source)
  const hit = cache.get(key)

  if (hit) {
    return hit
  }

  const { data, content } = parseFrontMatter(source)

  data.title = data.title || 'Generic Page'

  if (data.related !== void 0) {
    data.related = data.related.map((entry) => convertToRelated(entry))
  }

  if (flatMenu[this.resourcePath]) {
    const { prev, next } = flatMenu[this.resourcePath]

    if (prev !== void 0 || next !== void 0) {
      data.nav = []
    }

    if (prev !== void 0) {
      data.nav.push({ ...prev, dir: 'left' })
    }
    if (next !== void 0) {
      data.nav.push({ ...next, dir: 'right' })
    }
  }

  // console.log('data', data)

  // md.$data = {
  //   toc: []
  // }

  const { rendered, tocData } = md.render(content)
  const toc = tocData
  // const toc = data.toc !== false
  //   ? md.$data.toc
  //   : []

  // md.$data = {}

  const res = getVueComponent(rendered, data, JSON.stringify(toc))

  cache.set(key, res)

  return res
}
