/**
 * Retrieves named exports and the default export from a given JavaScript module.
 *
 * @param {string} modulePath - The path to the JavaScript module to import.
 * @returns {Promise<{namedExports: string[], defaultExport: any}>}
 *  - A Promise that resolves to an object containing the named exports and the default export.
 *  - `namedExports` is an array of strings representing the named exports from the module.
 *  - `defaultExport` is the default export from the module.
 */
export async function getExports(modulePath) {
  const module = await import(modulePath)
  const namedExports = Object.keys(module).filter((key) => key !== 'default')
  const defaultExport = module.default

  return {
    namedExports,
    defaultExport,
  }
}
