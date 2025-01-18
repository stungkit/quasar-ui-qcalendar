/*global console */
import fs from 'fs'
import path from 'path'
import { blue } from 'kolorist'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '../..')
const resolvePath = (file) => path.resolve(root, file)

const writeJson = function (file, json) {
  return fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf-8')
}

export function syncAppExt(both = true) {
  // make sure this project has an app-extension project
  const appExtDir = resolvePath('app-extension')
  if (!fs.existsSync(appExtDir)) {
    return
  }

  // make sure this project has an ui project
  const uiDir = resolvePath('ui')
  if (!fs.existsSync(uiDir)) {
    return
  }

  // get version and name from ui package.json
  const { name, version } = JSON.parse(fs.readFileSync(resolvePath('ui/package.json'), 'utf-8'))

  // read app-ext package.json
  const appExtFile = resolvePath('app-extension/package.json')
  const appExtJson = JSON.parse(fs.readFileSync(appExtFile, 'utf-8'))
  let finished = false

  // sync version numbers
  if (both === true) {
    appExtJson.version = version
  }

  // check dependencies
  if (appExtJson.dependencies !== void 0) {
    if (appExtJson.dependencies[name] !== void 0) {
      appExtJson.dependencies[name] = '^' + version
      finished = true
    }
  }
  // check devDependencies, if not finished
  if (finished === false && appExtJson.devDependencies !== void 0) {
    if (appExtJson.devDependencies[name] !== void 0) {
      appExtJson.devDependencies[name] = '^' + version
      finished = true
    }
  }

  if (finished === true) {
    writeJson(appExtFile, appExtJson)
    console.log(` ⭐️ App Extension version ${blue(appExtJson.name)} synced with UI version.\n`)
    return
  }

  console.error('   App Extension version and dependency NOT synced.\n')
}
