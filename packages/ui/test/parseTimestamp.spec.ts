import { describe, it, expect } from 'vitest'
import * as timestamp from '../src/utils/Timestamp'

describe('[TIMESTAMP] parseTimestamp', () => {
  it('parseTimestamp simple', async () => {
    const tests = timestamp.parseTimestamp('2020-01-01')
    expect(tests.hasDay).toBe(true)
    expect(tests.hasTime).toBe(true)
    expect(tests.year).toBe(2020)
    expect(tests.month).toBe(1)
    expect(tests.day).toBe(1)
  })

  it('parseTimestamp with time', async () => {
    const tests = timestamp.parseTimestamp('2020-01-01 03:00')
    expect(tests.hasDay).toBe(true)
    expect(tests.hasTime).toBe(true)
    expect(tests.year).toBe(2020)
    expect(tests.month).toBe(1)
    expect(tests.day).toBe(1)
    expect(tests.hour).toBe(3)
    expect(tests.minute).toBe(0)
  })

  it('parseTimestamp with now', async () => {
    const tests = timestamp.parseTimestamp('2020-01-01 03:00', timestamp.parseDate(new Date()))
    expect(tests.hasDay).toBe(true)
    expect(tests.hasTime).toBe(true)
    expect(tests.year).toBe(2020)
    expect(tests.month).toBe(1)
    expect(tests.day).toBe(1)
    expect(tests.hour).toBe(3)
    expect(tests.minute).toBe(0)
    expect(tests.past).toBe(true)
  })

  it('parseTimestamp invalid, with null', async () => {
    const tests = timestamp.parseTimestamp(null)
    expect(tests).toBe(null)
  })

  it('parseTimestamp invalid, with empty string', async () => {
    const tests = timestamp.parseTimestamp('')
    expect(tests).toBe(null)
  })

  it('parseTimestamp invalid, with invalid arg', async () => {
    const tests = timestamp.parseTimestamp('12345')
    expect(tests).toBe(null)
  })

  it('parseTimestamp for midnight not falsy', async () => {
    // having 00:00 time should not be falsy
    const tests = timestamp.parseTimestamp('2021-11-28 00:00')
    expect(tests.hasDay).toBe(true)
    expect(tests.hasTime).toBe(true)
    expect(tests.year).toBe(2021)
    expect(tests.month).toBe(11)
    expect(tests.day).toBe(28)
    expect(tests.hour).toBe(0)
    expect(tests.minute).toBe(0)
  })
})
