import QCalendarTask from './components/QCalendarTask.js'
import { version } from './version.js'

import * as Timestamp from './utils/Timestamp.js'
import * as helpers from './utils/helpers.js'

// Explicitly export individual named properties
export * from './utils/Timestamp.js'
export * from './utils/helpers.js'

export { version, QCalendarTask }

export default {
  version,
  QCalendarTask,
  ...Timestamp,
  ...helpers,

  install(app) {
    app.component(QCalendarTask.name, QCalendarTask)
  },
}
