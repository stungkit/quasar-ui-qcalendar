import { defineBoot } from '@quasar/app-webpack/wrappers'
import VuePlugin from '@quasar/quasar-ui-qcalendar'

export default defineBoot(({ app }) => {
  app.use(VuePlugin)
})
