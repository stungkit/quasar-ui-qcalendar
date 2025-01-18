import QCalendarScheduler from './components/QCalendarScheduler.js'
import { version } from './version'

import * as Timestamp from './utils/Timestamp.js'
import * as helpers from './utils/helpers.js'

export { version, QCalendarScheduler, Timestamp, helpers }

export default {
  version,
  QCalendarScheduler,
  ...Timestamp,
  ...helpers,

  install(app) {
    app.component(QCalendarScheduler.name, QCalendarScheduler)
  },
}
