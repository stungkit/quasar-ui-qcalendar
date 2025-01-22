import { describe, it, expect } from 'vitest'
import { parseTimestamp, parseDate, compareTimestamps } from '../src/utils/Timestamp.js'

describe('[TIMESTAMP] compareTimestamps', () => {
  it('Compare 2 timestamps are the same', async () => {
    const ts1 = parseTimestamp('2020-01-01')
    const ts2 = parseTimestamp('2020-01-01')
    const tests = compareTimestamps(ts1, ts2)
    expect(tests).toBe(true)
  })

  it('Compare 2 timestamps are NOT the same', async () => {
    const ts1 = parseTimestamp('2020-01-01')
    const ts2 = parseTimestamp('2020-12-31')
    const tests = compareTimestamps(ts1, ts2)
    expect(tests).toBe(false)
  })

  it('Compare 2 timestamps are the same with Date', async () => {
    const ts1 = parseTimestamp('2020-01-01')
    const ts2 = parseDate(new Date(2020, 0, 1))
    const tests = compareTimestamps(ts1, ts2)
    expect(tests).toBe(true)
  })

  it('Compare 2 timestamps are NOT the same with Date', async () => {
    const ts1 = parseTimestamp('2020-01-01')
    const ts2 = parseDate(new Date(2020, 11, 31))
    const tests = compareTimestamps(ts1, ts2)
    expect(tests).toBe(false)
  })
})
