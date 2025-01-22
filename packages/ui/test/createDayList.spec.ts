import { describe, it, expect } from 'vitest'
import {
  parseTimestamp,
  parseDate,
  createDayList,
  getWeekdaySkips,
} from '../src/utils/Timestamp.js'

describe('[TIMESTAMP] createDayList', () => {
  it('createDayList', async () => {
    const start = parseTimestamp('2020-01-01')
    const end = parseTimestamp('2020-01-31')
    const now = parseDate(new Date())
    const tests = createDayList(start, end, now, getWeekdaySkips([0, 1, 2, 3, 4, 5, 6]))
    expect(tests).toHaveLength(31)
  })

  it('createDayList inverted', async () => {
    const start = parseTimestamp('2020-01-01')
    const end = parseTimestamp('2020-01-31')
    const now = parseDate(new Date())
    const tests = createDayList(end, start, now)
    expect(tests).toHaveLength(0)
  })

  it('createDayList with restricted weekday skips', async () => {
    const start = parseTimestamp('2020-01-01')
    const end = parseTimestamp('2020-01-31')
    const now = parseDate(new Date())
    const tests = createDayList(start, end, now, getWeekdaySkips([1, 2, 3, 4, 5]))
    expect(tests).toHaveLength(23)
  })
})
