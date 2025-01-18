import QCalendarMonth from './components/QCalendarMonth.js'
import { version } from './version'

import * as Timestamp from './utils/Timestamp.js'
import * as helpers from './utils/helpers.js'

export { version, QCalendarMonth, Timestamp, helpers }

export default {
  version,
  QCalendarMonth,
  ...Timestamp,
  ...helpers,

  install(app) {
    app.component(QCalendarMonth.name, QCalendarMonth)
  },
}
