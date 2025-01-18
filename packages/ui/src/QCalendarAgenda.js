import QCalendarAgenda from './components/QCalendarAgenda.js'
import { version } from './version'

import * as Timestamp from './utils/Timestamp.js'
import * as helpers from './utils/helpers.js'

export { version, QCalendarAgenda, Timestamp, helpers }

export default {
  version,
  QCalendarAgenda,
  ...Timestamp,
  ...helpers,

  install(app) {
    app.component(QCalendarAgenda.name, QCalendarAgenda)
  },
}
