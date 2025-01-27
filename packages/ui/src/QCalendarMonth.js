import QCalendarMonth from './components/QCalendarMonth.js'
import { version } from './version.js'

import * as Timestamp from './utils/Timestamp.js'
import * as helpers from './utils/helpers.js'

// Explicitly export individual named properties
export * from './utils/Timestamp.js'
export * from './utils/helpers.js'

export { version, QCalendarMonth }

export default {
  version,
  QCalendarMonth,
  ...Timestamp,
  ...helpers,

  install(app) {
    app.component(QCalendarMonth.name, QCalendarMonth)
  },
}
