import QCalendarResource from './components/QCalendarResource.js'
import { version } from './version'

import * as Timestamp from './utils/Timestamp.js'
import * as helpers from './utils/helpers.js'

export { version, QCalendarResource, Timestamp, helpers }

export default {
  version,
  QCalendarResource,
  ...Timestamp,
  ...helpers,

  install(app) {
    app.component(QCalendarResource.name, QCalendarResource)
  },
}
