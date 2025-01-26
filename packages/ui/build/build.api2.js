import path from 'path'
import { fileURLToPath } from 'url'
import quasarJsonApi from 'quasar-json-api'

// Convert __dirname to ES module equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

globalThis.rootDir = path.resolve(__dirname, '..')
globalThis.distDir = path.resolve(__dirname, '../dist')

quasarJsonApi({
  buildVetur: false,
  buildTypes: true,
  forcedTypes: ['Timestamp'],
})
