import QCalendar from './components/QCalendar.js'
import QCalendarAgenda from './components/QCalendarAgenda.js'
import QCalendarDay from './components/QCalendarDay.js'
import QCalendarMonth from './components/QCalendarMonth.js'
import QCalendarResource from './components/QCalendarResource.js'
import QCalendarScheduler from './components/QCalendarScheduler.js'
import QCalendarTask from './components/QCalendarTask.js'
import { version } from './version'

import * as Timestamp from './utils/Timestamp.js'
import * as helpers from './utils/helpers.js'

export {
  version,
  QCalendar,
  QCalendarAgenda,
  QCalendarDay,
  QCalendarMonth,
  QCalendarResource,
  QCalendarScheduler,
  QCalendarTask,
  Timestamp,
  helpers,
}

export default {
  version,
  QCalendar,
  QCalendarAgenda,
  QCalendarDay,
  QCalendarMonth,
  QCalendarResource,
  QCalendarScheduler,
  QCalendarTask,
  ...Timestamp,
  ...helpers,

  install(app) {
    app.component(QCalendar.name, QCalendar)
  },
}
