import QCalendarDay from './components/QCalendarDay.js'
import { version } from './version'

import * as Timestamp from './utils/Timestamp.js'
import * as helpers from './utils/helpers.js'

// Explicitly export individual named properties
export * from './utils/Timestamp.js'
export * from './utils/helpers.js'

export { version, QCalendarDay }

export default {
  version,
  QCalendarDay,
  ...Timestamp,
  ...helpers,

  install(app) {
    app.component(QCalendarDay.name, QCalendarDay)
  },
}
