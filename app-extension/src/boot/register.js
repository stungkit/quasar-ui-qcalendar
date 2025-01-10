import { defineBoot } from '#q-app/wrappers'
import VuePlugin from '@quasar/quasar-ui-qcalendar'

export default defineBoot(({ app }) => {
  app.use(VuePlugin)
})
