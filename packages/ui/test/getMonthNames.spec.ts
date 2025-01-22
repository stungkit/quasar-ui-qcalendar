import { describe, it, expect } from 'vitest'
import * as timestamp from '../src/utils/Timestamp'

describe('[TIMESTAMP] getMonthNames', () => {
  it('getMonthNames (long en-US)', () => {
    const names = timestamp.getMonthNames('long', 'en-US')
    expect(names).toEqual([
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ])
  })

  it('getMonthNames (short en-US)', () => {
    const names = timestamp.getMonthNames('short', 'en-US')
    expect(names).toEqual([
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ])
  })

  it('getMonthNames (narrow en-US)', () => {
    const names = timestamp.getMonthNames('narrow', 'en-US')
    expect(names).toEqual(['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'])
  })

  //---

  it('getMonthNames (long se)', () => {
    const names = timestamp.getMonthNames('long', 'se')
    expect(names).toEqual([
      'ođđajagemánnu',
      'guovvamánnu',
      'njukčamánnu',
      'cuoŋománnu',
      'miessemánnu',
      'geassemánnu',
      'suoidnemánnu',
      'borgemánnu',
      'čakčamánnu',
      'golggotmánnu',
      'skábmamánnu',
      'juovlamánnu',
    ])
  })

  it('getMonthNames (short se)', () => {
    const names = timestamp.getMonthNames('short', 'se')
    expect(names).toEqual([
      'ođđj',
      'guov',
      'njuk',
      'cuo',
      'mies',
      'geas',
      'suoi',
      'borg',
      'čakč',
      'golg',
      'skáb',
      'juov',
    ])
  })

  it('getMonthNames (narrow se)', () => {
    const names = timestamp.getMonthNames('narrow', 'se')
    expect(names).toEqual(['O', 'G', 'N', 'C', 'M', 'G', 'S', 'B', 'Č', 'G', 'S', 'J'])
  })
})
