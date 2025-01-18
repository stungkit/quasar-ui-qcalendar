import { version } from './version'

import * as Timestamp from './utils/Timestamp.js'
import * as helpers from './utils/helpers.js'

export { version, Timestamp, helpers }

export default {
  version,
  ...Timestamp,
  ...helpers,
}
