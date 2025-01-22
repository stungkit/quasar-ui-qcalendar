/* global console */
import { getExports } from './getExports.js'

/**
 * Tests the getExports function by retrieving named and default exports from '@quasar/quasar-ui-qcalendar'.
 * This function demonstrates the usage of getExports and logs the results to the console.
 *
 * @async
 * @function test
 * @returns {Promise<void>} A promise that resolves when the exports are retrieved and logged.
 */
async function test() {
  const { namedExports, defaultExport } = await getExports('@quasar/quasar-ui-qcalendar')

  console.log('Named Exports:', namedExports)
  console.log('Default Export:', defaultExport)
}

test()
