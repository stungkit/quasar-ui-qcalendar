import QCalendarResource from './components/QCalendarResource.js'
import { version } from './version.js'

import * as Timestamp from './utils/Timestamp.js'
import * as helpers from './utils/helpers.js'

// Explicitly export individual named properties
export * from './utils/Timestamp.js'
export * from './utils/helpers.js'

export { version, QCalendarResource }

export default {
  version,
  QCalendarResource,
  ...Timestamp,
  ...helpers,

  install(app) {
    app.component(QCalendarResource.name, QCalendarResource)
  },
}
