import path, { resolve } from 'node:path'
import open from 'open'
import { fileURLToPath } from 'node:url'

// Convert __dirname to ES module equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

open(resolve(__dirname, '../umd-test.html'))
