import QCalendarTask from './components/QCalendarTask.js'
import { version } from './version.js'

import * as Timestamp from './utils/Timestamp.js'
import * as helpers from './utils/helpers.js'

export { version, QCalendarTask, Timestamp, helpers }

export default {
  version,
  QCalendarTask,
  ...Timestamp,
  ...helpers,

  install(app) {
    app.component(QCalendarTask.name, QCalendarTask)
  },
}
