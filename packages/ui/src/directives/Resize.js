/* global window */
export default {
  name: 'Resize',

  mounted(el, { modifiers, value }) {
    if (!value) return // callback
    if (typeof window !== 'undefined') {
      const callback = value
      const options = modifiers || { passive: true }

      window.addEventListener('resize', callback, options)

      el._onResize = {
        callback,
        options,
      }

      if (!modifiers || !modifiers.quiet) {
        callback()
      }
    }
  },

  beforeUnmount(el) {
    if (!el._onResize) return
    if (typeof window !== 'undefined') {
      const { callback, options } = el._onResize
      window.removeEventListener('resize', callback, options)
      delete el._onResize
    }
  },
}
