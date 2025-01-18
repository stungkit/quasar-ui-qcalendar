/*global console process */
/* eslint-disable array-bracket-spacing */
import path from 'path'
import { compileAsync } from 'sass-embedded'
import postcss from 'postcss'
import cssnano from 'cssnano'
import rtl from 'rtlcss'
import autoprefixer from 'autoprefixer'
import { fileURLToPath } from 'url'

import buildConf from './config.js'
import * as buildUtils from './utils.js'

// Convert __dirname to ES module equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const postCssCompiler = postcss([autoprefixer])
const postCssRtlCompiler = postcss([rtl({})])

const nano = postcss([
  cssnano({
    preset: [
      'default',
      {
        mergeLonghand: false,
        convertValues: false,
        cssDeclarationSorter: false,
        reduceTransforms: false,
      },
    ],
  }),
])

Promise.all([
  generate('src/index.scss', 'dist/index'),
  generate('src/QCalendar.scss', 'dist/QCalendar'),
  generate('src/QCalendarAgenda.scss', 'dist/QCalendarAgenda'),
  generate('src/QCalendarDay.scss', 'dist/QCalendarDay'),
  generate('src/QCalendarMonth.scss', 'dist/QCalendarMonth'),
  generate('src/QCalendarResource.scss', 'dist/QCalendarResource'),
  generate('src/QCalendarScheduler.scss', 'dist/QCalendarScheduler'),
  generate('src/QCalendarTask.scss', 'dist/QCalendarTask'),
  generate('src/QCalendarTransitions.scss', 'dist/QCalendarTransitions'),
  generate('src/QCalendarVariables.scss', 'dist/QCalendarVariables'),
]).catch((e) => {
  console.error(e)
  process.exit(1)
})

/**
 * Helpers
 */

function resolve(_path) {
  return path.resolve(__dirname, '..', _path)
}

async function generate(src, dest) {
  src = resolve(src)
  dest = resolve(dest)

  try {
    const result = await compileAsync(src, { loadPaths: ['node_modules'] })
    let code = buildConf.banner + result.css

    code = await postCssCompiler.process(code, { from: void 0 })
    code.warnings().forEach((warn) => {
      console.warn(warn.toString())
    })

    await Promise.all([
      generateUMD(dest, code.css),
      postCssRtlCompiler
        .process(code.css, { from: void 0 })
        .then((code) => generateUMD(dest, code.css, '.rtl')),
    ])
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

function generateUMD(dest, code, ext = '') {
  return buildUtils
    .writeFile(`${dest}${ext}.css`, code, true)
    .then((code) => nano.process(code, { from: void 0 }))
    .then((code) => buildUtils.writeFile(`${dest}${ext}.min.css`, code.css, true))
}
