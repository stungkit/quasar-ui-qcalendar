import path, { resolve } from 'path'
import open from 'open'
import { fileURLToPath } from 'url'

// Convert __dirname to ES module equivalent
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

open(resolve(__dirname, '../umd-test.html'))
