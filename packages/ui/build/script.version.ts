import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createRequire } from 'node:module'
const require = createRequire(import.meta.url)

// Convert __dirname to ES module equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// get version
const { version } = require('../package.json')

// read in the template as text
let template = fs.readFileSync(path.resolve(__dirname, './version/version-template.js'), 'utf-8')

// do the replacement
template = template.replace('__UI_VERSION__', `'${version}'`)

// write the file
fs.writeFileSync(path.resolve(__dirname, '../src/version.js'), template, 'utf-8')
