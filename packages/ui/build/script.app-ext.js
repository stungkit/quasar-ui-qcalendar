/*global console */
import fs from 'node:fs'
import path from 'node:path'
import { blue } from 'kolorist'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const root = path.resolve(__dirname, '../..')
const resolvePath = (file) => path.resolve(root, file)

const writeJson = (file, json) => {
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf-8')
}

export function syncAppExt(syncVersion = true) {
  const appExtDir = resolvePath('app-extension')
  const uiDir = resolvePath('ui')

  // Ensure required directories exist
  if (!fs.existsSync(appExtDir) || !fs.existsSync(uiDir)) {
    console.warn('Required directories not found. Skipping sync.')
    return
  }

  // Load UI project metadata
  const uiPackagePath = resolvePath('ui/package.json')
  const { name, version } = readJson(uiPackagePath)

  // Load App Extension metadata
  const appExtPackagePath = resolvePath('app-extension/package.json')
  const appExtJson = readJson(appExtPackagePath)

  // Sync version and dependencies
  let updated = false

  if (syncVersion) {
    appExtJson.version = version
    updated = true
  }

  updated ||= updateDependency(appExtJson.dependencies, name, version)
  updated ||= updateDependency(appExtJson.devDependencies, name, version)

  if (updated) {
    writeJson(appExtPackagePath, appExtJson)
    console.log(` ⭐️ App Extension version ${blue(appExtJson.name)} synced with UI version.\n`)
  } else {
    console.error('   App Extension version and dependency NOT synced.\n')
  }
}

/**
 * Read JSON from file
 */
function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf-8'))
}

/**
 * Update a dependency to the correct version if it exists.
 */
function updateDependency(dependencies, name, version) {
  if (dependencies?.[name]) {
    dependencies[name] = `^${version}`
    return true
  }
  return false
}
