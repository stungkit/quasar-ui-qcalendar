/*global console process */
import { cpus } from 'node:os'
import { createFolder } from './build.utils.js'
import { green, blue } from 'kolorist'
// import { fileURLToPath } from 'url'
// import path from 'path'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)
const { version } = require('../package.json')

process.env.NODE_ENV = 'production'

const parallel = cpus().length > 1
// const runJob = parallel ? require('child_process').fork : require

console.log()

async function buildApi() {
  // const api = await import('./build.api.js').then(({ generate }) => generate({ compact: true }))
  // console.log('API generation completed successfully.', api)
  import('./build.api.js').then(({ generate }) => generate())
}

// Dynamic imports to maintain order
import('./script.app-ext.js').then(({ syncAppExt }) => {
  syncAppExt()

  import('./script.clean.js').then(() => {
    console.log(
      ` 📦 Building ${green('v' + version)}...${parallel ? blue(' [multi-threaded]') : ''}\n`,
    )

    createFolder('dist')
    createFolder('dist/transforms')
    createFolder('dist/types')
    createFolder('dist/api')

    import('./script.version.js').then(() => {
      import('./build.api.js').then(() => {
        import('./script.javascript.js').then(() => {
          import('./script.css.js').then(() => {
            buildApi()
          })
        })
      })
    })
  })
})

// runJob(join(__dirname, './script.javascript.js'))
// runJob(join(__dirname, './script.css.js'))
