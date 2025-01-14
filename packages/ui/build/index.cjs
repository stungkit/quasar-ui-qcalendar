/*global console process  */
process.env.NODE_ENV = 'production'

const parallel = require('os').cpus().length > 1
// const runJob = parallel ? require('child_process').fork : require
const { createFolder } = require('./utils.cjs')
const { green, blue } = require('kolorist')

console.log()

require('./script.app-ext.cjs').syncAppExt()
require('./script.clean.cjs')

console.log(
  ` 📦 Building ${green('v' + require('../package.json').version)}...${parallel ? blue(' [multi-threaded]') : ''}\n`,
)

createFolder('dist')

require('./script.version.cjs')

require('./build.api.cjs')
require('./script.javascript.cjs')
require('./script.css.cjs')
// runJob(join(__dirname, './script.javascript.js'))
// runJob(join(__dirname, './script.css.js'))
