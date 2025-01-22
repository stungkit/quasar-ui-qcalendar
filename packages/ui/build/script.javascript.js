/*global console process */
process.env.BABEL_ENV = 'production'

import path from 'path'
import { URL } from 'url'
import * as rollup from 'rollup'
import uglify from 'uglify-js'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'

import buildConf from './config.js'
import * as buildUtils from './utils.js'

function pathResolve(relativePath) {
  return path.resolve(path.dirname(new URL(import.meta.url).pathname), relativePath)
}

const rollupPlugins = [
  nodeResolve(),
  json(),
  babel({
    babelHelpers: 'bundled',
    presets: ['@babel/preset-env'],
    exclude: 'node_modules/**',
  }),
]

const uglifyOptions = {
  compress: {
    // Optimized compression settings
    arrows: false,
    collapse_vars: false,
    comparisons: false,
    hoist_funs: false,
    hoist_props: false,
    inline: false,
    loops: false,
    negate_iife: false,
    properties: false,
    reduce_funcs: false,
    reduce_vars: false,
    switches: false,
    toplevel: false,
    typeofs: false,
    // Essential features
    booleans: true,
    if_return: true,
    sequences: true,
    unused: true,
    conditionals: true,
    dead_code: true,
    evaluate: true,
  },
}

const buildEntries = [
  'index',
  'QCalendar',
  'QCalendarAgenda',
  'QCalendarDay',
  'QCalendarMonth',
  'QCalendarResource',
  'QCalendarScheduler',
  'QCalendarTask',
  'Timestamp',
]

const builds = buildEntries.flatMap((entry) =>
  ['esm', 'cjs', 'umd'].map((format) => ({
    rollup: {
      input: {
        input: pathResolve(`entry/${entry}.${format}.js`),
        plugins: rollupPlugins,
        external: ['vue'],
      },
      output: {
        file: pathResolve(`../dist/${entry}.${format}.js`),
        format,
        name: format === 'umd' ? entry : undefined,
        exports: 'auto',
        banner: buildConf.banner,
        globals: { vue: 'Vue' },
      },
    },
    build: {
      unminified: true,
      minified: true,
      minExt: true,
    },
  })),
)

build(builds)

/**
 * Main Build Process
 */
async function build(builds) {
  try {
    for (const config of builds) {
      await buildEntry(config)
    }
  } catch (error) {
    buildUtils.logError(error)
    process.exit(1)
  }
}

/**
 * Generates the build output for a single entry.
 */
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
      const minified = uglify.minify(code, uglifyOptions)

      if (minified.error) {
        throw minified.error
      }

      const minifiedFile = config.build.minExt
        ? addFileExtension(config.rollup.output.file, 'min')
        : config.rollup.output.file

      await buildUtils.writeFile(minifiedFile, buildConf.banner + minified.code, true)
    }
  } catch (error) {
    console.error(`Error building ${config.rollup.output.file}:`, error)
    process.exit(1)
  }
}

/**
 * Adds or replaces an extension in a file path.
 */
function addFileExtension(filename, ext = 'min') {
  const index = filename.lastIndexOf('.')
  return `${filename.slice(0, index)}.${ext}${filename.slice(index)}`
}

/**
 * Injects a Vue dependency check into UMD builds.
 */
function injectVueRequirement(code) {
  const dependencyCheck = `if (Vue === void 0) {
    console.error('[ QCalendar ] Vue is required to run. Please add a script tag for it before loading QCalendar.');
    return;
  }`

  const vueCheckIndex = code.indexOf(
    `Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue`,
  )

  return vueCheckIndex !== -1
    ? code.slice(0, vueCheckIndex - 1) + dependencyCheck + code.slice(vueCheckIndex)
    : code
}
