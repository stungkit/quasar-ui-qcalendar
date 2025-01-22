/*global console process */
process.env.BABEL_ENV = 'production'

import path from 'path'
import { URL } from 'url'
import * as rollup from 'rollup'
import uglify from 'uglify-js'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'

import buildConf from './config.js'
import * as buildUtils from './utils.js'

function pathResolve(_path) {
  return path.resolve(path.dirname(new URL(import.meta.url).pathname), _path)
}

const rollupPluginsModern = [nodeResolve(), json()]

const uglifyJsOptions = {
  compress: {
    // turn off flags with small gains to speed up minification
    arrows: false,
    collapse_vars: false,
    comparisons: false,
    // computed_props: false,
    hoist_funs: false,
    hoist_props: false,
    hoist_vars: false,
    inline: false,
    loops: false,
    negate_iife: false,
    properties: false,
    reduce_funcs: false,
    reduce_vars: false,
    switches: false,
    toplevel: false,
    typeofs: false,

    // a few flags with noticable gains/speed ratio
    booleans: true,
    if_return: true,
    sequences: true,
    unused: true,

    // required features to drop conditional branches
    conditionals: true,
    dead_code: true,
    evaluate: true,
  },
}

const buildEntries = [
  'index',
  'QCalendar', // same as index
  'QCalendarAgenda',
  'QCalendarDay',
  'QCalendarMonth',
  'QCalendarResource',
  'QCalendarScheduler',
  'QCalendarTask',
  'Timestamp',
]

function generateBuilds() {
  const builds = []

  buildEntries.forEach((entry) => {
    builds.push({
      rollup: {
        input: {
          input: pathResolve(`entry/${entry}.esm.js`),
        },
        output: {
          file: pathResolve(`../dist/${entry}.esm.js`),
          format: 'es',
          exports: 'auto',
        },
      },
      build: {
        unminified: true,
        minified: true,
        minExt: true,
      },
    })
    builds.push({
      rollup: {
        input: {
          input: pathResolve(`entry/${entry}.cjs.js`),
        },
        output: {
          file: pathResolve(`../dist/${entry}.cjs.js`),
          format: 'cjs',
          exports: 'auto',
        },
      },
      build: {
        unminified: true,
        minified: true,
        minExt: true,
      },
    })
    builds.push({
      rollup: {
        input: {
          input: pathResolve(`entry/${entry}.umd.js`),
        },
        output: {
          name: entry,
          file: pathResolve(`../dist/${entry}.umd.js`),
          format: 'umd',
        },
      },
      build: {
        unminified: true,
        minified: true,
        minExt: true,
      },
    })
  })

  return builds
}

const builds = generateBuilds()
// Add your asset folders here, if needed
// addAssets(builds, 'icon-set', 'iconSet')
// addAssets(builds, 'lang', 'lang')

build(builds)

/**
 * Helpers
 */

// eslint-disable-next-line no-unused-vars
// function addAssets(builds, type, injectName) {
//   const files = fs.readdirSync(pathResolve('../../ui/src/components/' + type)),
//     plugins = [buble(bubleConfig)],
//     outputDir = pathResolve(`../dist/${type}`)

//   fse.mkdirp(outputDir)

//   files
//     .filter((file) => file.endsWith('.js'))
//     .forEach((file) => {
//       const name = file.substr(0, file.length - 3).replace(/-([a-z])/g, (g) => g[1].toUpperCase())
//       builds.push({
//         rollup: {
//           input: {
//             input: pathResolve(`../src/components/${type}/${file}`),
//             plugins,
//           },
//           output: {
//             file: addExtension(pathResolve(`../dist/${type}/${file}`), 'umd'),
//             format: 'umd',
//             name: `QCalendar.${injectName}.${name}`,
//           },
//         },
//         build: {
//           minified: true,
//         },
//       })
//     })
// }

function build(builds) {
  return Promise.all(builds.map(genConfig).map(buildEntry)).catch(buildUtils.logError)
}

function genConfig(opts) {
  Object.assign(opts.rollup.input, {
    plugins: rollupPluginsModern,
    external: ['vue'],
  })

  Object.assign(opts.rollup.output, {
    banner: buildConf.banner,
    globals: { vue: 'Vue' },
  })

  return opts
}

function addExtension(filename, ext = 'min') {
  const insertionPoint = filename.lastIndexOf('.')
  return `${filename.slice(0, insertionPoint)}.${ext}${filename.slice(insertionPoint)}`
}

function injectVueRequirement(code) {
  // eslint-disable-next-line quotes
  const index = code.indexOf(`Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue`)

  if (index === -1) {
    return code
  }

  const checkMe = ` if (Vue === void 0) {
    console.error('[ QCalendar ] Vue is required to run. Please add a script tag for it before loading QCalendar.')
    return
  }
  `

  return code.substring(0, index - 1) + checkMe + code.substring(index)
}

async function buildEntry(config) {
  try {
    const bundle = await rollup.rollup(config.rollup.input)
    const { output } = await bundle.generate(config.rollup.output)
    const code =
      config.rollup.output.format === 'umd' ? injectVueRequirement(output[0].code) : output[0].code

    if (config.build.unminified) {
      await buildUtils.writeFile(config.rollup.output.file, code)
    }

    if (config.build.minified) {
      const minified = uglify.minify(code, uglifyJsOptions)

      if (minified.error) {
        throw minified.error
      }

      await buildUtils.writeFile(
        config.build.minExt === true
          ? addExtension(config.rollup.output.file)
          : config.rollup.output.file,
        buildConf.banner + minified.code,
        true,
      )
    }
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}
