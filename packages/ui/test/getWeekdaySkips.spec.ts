import { describe, it, expect } from 'vitest'
import * as timestamp from '../src/utils/Timestamp'

describe('[TIMESTAMP] getWeekdaySkips', () => {
  it('getWeekdaySkips [0,1,2,3,4,5,6]', async () => {
    const tests = timestamp.getWeekdaySkips([0, 1, 2, 3, 4, 5, 6])
    expect(tests).toStrictEqual([1, 1, 1, 1, 1, 1, 1])
  })

  it('getWeekdaySkips []', async () => {
    const tests = timestamp.getWeekdaySkips([])
    expect(tests).toStrictEqual([0, 0, 0, 0, 0, 0, 0])
  })
})
