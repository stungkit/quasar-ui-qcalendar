/**
 * Utility functions for event handling.
 */
export default function () {
  /**
   * Checks if the event's keyCode matches any of the specified keyCodes.
   * @param {KeyboardEvent} evt - The keyboard event.
   * @param {number|number[]} keyCodes - The key code or an array of key codes to check against.
   * @returns {boolean} True if the keyCode matches, false otherwise.
   */
  function isKeyCode(evt, keyCodes) {
    return [].concat(keyCodes).includes(evt.keyCode)
  }

  return {
    isKeyCode,
  }
}
