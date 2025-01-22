import { describe, it, expect } from 'vitest'
import { createNativeLocaleFormatter, parseTimestamp } from '../src/utils/Timestamp.js'

describe('[TIMESTAMP] createNativeLocaleFormatter', () => {
  it('monthFormatter', async () => {
    function monthFormatter() {
      const longOptions = { timeZone: 'UTC', month: 'long' }
      const shortOptions = { timeZone: 'UTC', month: 'short' }

      return createNativeLocaleFormatter('en-US', (_tms, short) =>
        short ? shortOptions : longOptions,
      )
    }

    const ts = parseTimestamp('2020-01-01')
    let tests = monthFormatter()(ts, true)
    expect(tests).toBe('Jan')
    tests = monthFormatter()(ts, false)
    expect(tests).toBe('January')
  })

  it('weekdayFormatter', async () => {
    function weekdayFormatter() {
      const longOptions = { timeZone: 'UTC', weekday: 'long' }
      const shortOptions = { timeZone: 'UTC', weekday: 'short' }

      return createNativeLocaleFormatter('en-US', (_tms, short) =>
        short ? shortOptions : longOptions,
      )
    }

    const ts = parseTimestamp('2020-01-01')
    let tests = weekdayFormatter()(ts, true)
    expect(tests).toBe('Wed')
    tests = weekdayFormatter()(ts, false)
    expect(tests).toBe('Wednesday')
  })

  it('dayFormatter', async () => {
    function dayFormatter() {
      const options = { timeZone: 'UTC', day: 'numeric' }

      return createNativeLocaleFormatter('en-US', () => options)
    }

    const ts = parseTimestamp('2020-01-01')
    const tests = dayFormatter()(ts, false)
    expect(tests).toBe('1')
  })
})
