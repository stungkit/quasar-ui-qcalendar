/* global Intl console */
export const PARSE_DATETIME =
  /^(\d{4})-(\d{1,2})(-(\d{1,2}))?([^\d]+(\d{1,2}))?(:(\d{1,2}))?(:(\d{1,2}))?(.(\d{1,3}))?$/
export const PARSE_DATE = /^(\d{4})-(\d{1,2})(-(\d{1,2}))?/
export const PARSE_TIME = /(\d\d?)(:(\d\d?)|)(:(\d\d?)|)/

export const DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
export const DAYS_IN_MONTH_LEAP = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export const TIME_CONSTANTS = {
  MILLISECONDS_IN: {
    SECOND: 1000,
    MINUTE: 60000,
    HOUR: 3600000,
    DAY: 86400000,
    WEEK: 604800000,
  },
  SECONDS_IN: {
    MINUTE: 60,
    HOUR: 3600,
    DAY: 86400,
    WEEK: 604800,
  },
  MINUTES_IN: {
    MINUTE: 1,
    HOUR: 60,
    DAY: 1440,
    WEEK: 10080,
  },
  HOURS_IN: {
    DAY: 24,
    WEEK: 168,
  },
  DAYS_IN: {
    WEEK: 7,
  },
}

export const DAYS_IN_MONTH_MIN = 28
export const DAYS_IN_MONTH_MAX = 31
export const MONTH_MAX = 12
export const MONTH_MIN = 1
export const DAY_MIN = 1
export const FIRST_HOUR = 0

/**
 * @typedef {Object} Timestamp The Timestamp object
 * @property {string=} Timestamp.date Date string in format 'YYYY-MM-DD'
 * @property {string=} Timestamp.time Time string in format 'HH:MM'
 * @property {number} Timestamp.year The numeric year
 * @property {number} Timestamp.month The numeric month (Jan = 1, ...)
 * @property {number} Timestamp.day The numeric day
 * @property {number} Timestamp.weekday The numeric weekday (Sun = 0, ..., Sat = 6)
 * @property {number=} Timestamp.hour The numeric hour
 * @property {number} Timestamp.minute The numeric minute
 * @property {number=} Timestamp.doy The numeric day of the year (doy)
 * @property {number=} Timestamp.workweek The numeric workweek
 * @property {boolean} Timestamp.hasDay True if Timestamp.date is filled in and usable
 * @property {boolean} Timestamp.hasTime True if Timestamp.time is filled in and usable
 * @property {boolean=} Timestamp.past True if the Timestamp is in the past
 * @property {boolean=} Timestamp.current True if Timestamp is current day (now)
 * @property {boolean=} Timestamp.future True if Timestamp is in the future
 * @property {boolean=} Timestamp.disabled True if this is a disabled date
 * @property {boolean=} Timestamp.currentWeekday True if this date corresponds to current weekday
 */
export const Timestamp = {
  date: '', // YYYY-MM-DD
  time: '', // HH:MM (optional)
  year: 0, // YYYY
  month: 0, // MM (Jan = 1, etc)
  day: 0, // day of the month
  weekday: 0, // week day (0=Sunday...6=Saturday)
  hour: 0, // 24-hr format
  minute: 0, // mm
  doy: 0, // day of year
  workweek: 0, // workweek number
  hasDay: false, // if this timestamp is supposed to have a date
  hasTime: false, // if this timestamp is supposed to have a time
  past: false, // if timestamp is in the past (based on `now` property)
  current: false, // if timestamp is current date (based on `now` property)
  future: false, // if timestamp is in the future (based on `now` property)
  disabled: false, // if timestamp is disabled
  currentWeekday: false, // if this date corresponds to current weekday
}

export const TimeObject = {
  hour: 0, // Number
  minute: 0, // Number
}

/**
 * Validates the passed input ('YYY-MM-DD') as a date or ('YYY-MM-DD HH:MM') date time combination
 * @param {string} input A string in the form 'YYYY-MM-DD' or 'YYYY-MM-DD HH:MM'
 * @returns {boolean} True if parseable
 */
export function validateTimestamp(input) {
  if (typeof input !== 'string') return false
  return PARSE_DATETIME.test(input)
}

/**
 * Fast low-level parser for a date string ('YYYY-MM-DD'). Does not update formatted or relative date.
 * Use 'parseTimestamp' for formatted and relative updates
 * @param {string} input In the form 'YYYY-MM-DD hh:mm:ss' (seconds are optional, but not used)
 * @returns {Timestamp} This {@link Timestamp} is minimally filled in. The {@link Timestamp.date} and {@link Timestamp.time} as well as relative data will not be filled in.
 */
export function parsed(input) {
  if (typeof input !== 'string') return null
  const parts = PARSE_DATETIME.exec(input)

  if (!parts) return null

  const year = parseInt(parts[1], 10)
  const month = parseInt(parts[2], 10)
  const day = parseInt(parts[4] || '1', 10)
  const hour = parseInt(parts[6] || '0', 10)
  const minute = parseInt(parts[8] || '0', 10)

  return {
    date: input,
    time: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
    year,
    month,
    day,
    hour,
    minute,
    hasDay: !!parts[4],
    hasTime: true, // time is always present, even if '00:00'
    past: false,
    current: false,
    future: false,
    disabled: false,
    weekday: 0,
    doy: 0,
    workweek: 0,
  }
}

/**
 * Takes a JavaScript Date and returns a {@link Timestamp}. The {@link Timestamp} is not updated with relative information.
 * @param {date} date JavaScript Date
 * @param {boolean} utc If set the {@link Timestamp} will parse the Date as UTC
 * @returns {Timestamp} A minimal {@link Timestamp} without updated or relative updates.
 */
export function parseDate(date, utc = false) {
  const UTC = utc ? 'UTC' : ''
  return updateFormatted({
    date:
      padNumber(date[`get${UTC}FullYear`](), 4) +
      '-' +
      padNumber(date[`get${UTC}Month`]() + 1, 2) +
      '-' +
      padNumber(date[`get${UTC}Date`](), 2),
    time:
      padNumber(date[`get${UTC}Hours`]() || 0, 2) +
      ':' +
      padNumber(date[`get${UTC}Minutes`]() || 0, 2),
    year: date[`get${UTC}FullYear`](),
    month: date[`get${UTC}Month`]() + 1,
    day: date[`get${UTC}Date`](),
    hour: date[`get${UTC}Hours`](),
    minute: date[`get${UTC}Minutes`](),
    weekday: 0,
    doy: 0,
    workweek: 0,
    hasDay: true,
    hasTime: true, // Date always has time, even if it is '00:00'
    past: false,
    current: false,
    future: false,
    disabled: false,
  })
}

/**
 * Padds a passed in number to length (converts to a string). Good for converting '5' as '05'.
 * @param {number} x The number to pad
 * @param {number} length The length of the required number as a string
 * @returns {string} The padded number (as a string). (ie: 5 = '05')
 */
export function padNumber(x, length) {
  let padded = String(x)
  while (padded.length < length) {
    padded = '0' + padded
  }

  return padded
}

/**
 * Returns if the passed year is a leap year
 * @param {number} year The year to check (ie: 1999, 2020)
 * @returns {boolean} True if the year is a leap year
 */
export function isLeapYear(year) {
  return ((year % 4 === 0) ^ (year % 100 === 0) ^ (year % 400 === 0)) === 1
}

/**
 * Returns the days of the specified month in a year
 * @param {number} year The year (ie: 1999, 2020)
 * @param {number} month The month (zero-based)
 * @returns {number} The number of days in the month (corrected for leap years)
 */
export function daysInMonth(year, month) {
  return isLeapYear(year) ? DAYS_IN_MONTH_LEAP[month] : DAYS_IN_MONTH[month]
}

/**
 * Returns a {@link Timestamp} of next day from passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {Timestamp} The modified {@link Timestamp} as the next day
 */
export function nextDay(timestamp) {
  const date = new Date(timestamp.year, timestamp.month - 1, timestamp.day + 1)
  return updateFormatted(
    normalizeTimestamp({
      ...timestamp,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }),
  )
}

/**
 * Returns a {@link Timestamp} of previous day from passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {Timestamp} The modified {@link Timestamp} as the previous day
 */
export function prevDay(timestamp) {
  const date = new Date(timestamp.year, timestamp.month - 1, timestamp.day - 1)
  return updateFormatted(
    normalizeTimestamp({
      ...timestamp,
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    }),
  )
}

/**
 * Returns today's date
 * @returns {string} Date string in the form 'YYYY-MM-dd'
 */
export function today() {
  const d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  return [year, padNumber(month, 2), padNumber(day, 2)].join('-')
}

/**
 * Takes a date string ('YYYY-MM-DD') and validates if it is today's date
 * @param {string} date Date string in the form 'YYYY-MM-DD'
 * @returns {boolean} True if the date is today's date
 */
export function isToday(date) {
  return date === today()
}

/**
 * Returns the start of the week give a {@link Timestamp} and weekdays (in which it finds the day representing the start of the week).
 * If today {@link Timestamp} is passed in then this is used to update relative information in the returned {@link Timestamp}.
 * @param {Timestamp} timestamp The {@link Timestamp} to use to find the start of the week
 * @param {number[]} weekdays The array is [0,1,2,3,4,5,6] where 0=Sunday and 6=Saturday
 * @param {Timestamp=} today If passed in then the {@link Timestamp} is updated with relative information
 * @returns {Timestamp} The {@link Timestamp} representing the start of the week
 */
export function getStartOfWeek(timestamp, weekdays, today) {
  let start = copyTimestamp(timestamp)
  if (start.day === 1 || start.weekday === 0) {
    while (!weekdays.includes(start.weekday)) {
      start = nextDay(start)
    }
  }
  start = findWeekday(start, weekdays[0], prevDay)
  start = updateFormatted(start)
  if (today) {
    start = updateRelative(start, today, start.hasTime)
  }
  return start
}

/**
 * Returns the end of the week give a {@link Timestamp} and weekdays (in which it finds the day representing the last of the week).
 * If today {@link Timestamp} is passed in then this is used to update relative information in the returned {@link Timestamp}.
 * @param {Timestamp} timestamp The {@link Timestamp} to use to find the end of the week
 * @param {number[]} weekdays The array is [0,1,2,3,4,5,6] where 0=Sunday and 6=Saturday
 * @param {Timestamp=} today If passed in then the {@link Timestamp} is updated with relative information
 * @returns {Timestamp} The {@link Timestamp} representing the end of the week
 */
export function getEndOfWeek(timestamp, weekdays, today) {
  let end = copyTimestamp(timestamp)
  // is last day of month?
  const lastDay = daysInMonth(end.year, end.month)
  if (lastDay === end.day || end.weekday === weekdays[weekdays.length - 1]) {
    while (!weekdays.includes(end.weekday)) {
      end = prevDay(end)
    }
  }
  end = findWeekday(end, weekdays[weekdays.length - 1], nextDay)
  end = updateFormatted(end)
  if (today) {
    end = updateRelative(end, today, end.hasTime)
  }
  return end
}

/**
 * Finds the start of the month based on the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use to find the start of the month
 * @returns {Timestamp} A {@link Timestamp} of the start of the month
 */
export function getStartOfMonth(timestamp) {
  let start = copyTimestamp(timestamp)
  start.day = DAY_MIN
  start = updateFormatted(start)
  return start
}

/**
 * Finds the end of the month based on the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use to find the end of the month
 * @returns {Timestamp} A {@link Timestamp} of the end of the month
 */
export function getEndOfMonth(timestamp) {
  let end = copyTimestamp(timestamp)
  end.day = daysInMonth(end.year, end.month)
  end = updateFormatted(end)
  return end
}

// returns minutes since midnight
export function parseTime(input) {
  const type = Object.prototype.toString.call(input)
  switch (type) {
    case '[object Number]':
      // when a number is given, it's minutes since 12:00am
      return input
    case '[object String]': {
      // when a string is given, it's a hh:mm:ss format where seconds are optional, but not used
      const parts = PARSE_TIME.exec(input)
      if (!parts) {
        return false
      }
      return parseInt(parts[1], 10) * 60 + parseInt(parts[3] || 0, 10)
    }
    case '[object Object]':
      // when an object is given, it must have hour and minute
      if (typeof input.hour !== 'number' || typeof input.minute !== 'number') {
        return false
      }
      return input.hour * 60 + input.minute
  }

  return false
}

/**
 * Compares two {@link Timestamp}s for exactness
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @returns {boolean} True if the two {@link Timestamp}s are an exact match
 */
export function compareTimestamps(ts1, ts2) {
  if (!ts1 || !ts2) return false

  return (
    ts1.year === ts2.year &&
    ts1.month === ts2.month &&
    ts1.day === ts2.day &&
    ts1.hour === ts2.hour &&
    ts1.minute === ts2.minute
  )
}

/**
 * Compares the date of two {@link Timestamp}s that have been updated with relative data
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @returns {boolean} True if the two dates are the same
 */
export function compareDate(ts1, ts2) {
  return getDate(ts1) === getDate(ts2)
}

/**
 * Compares the time of two {@link Timestamp}s that have been updated with relative data
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @returns {boolean} True if the two times are an exact match
 */
export function compareTime(ts1, ts2) {
  return getTime(ts1) === getTime(ts2)
}

/**
 * Compares the date and time of two {@link Timestamp}s that have been updated with relative data
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @returns {boolean} True if the date and time are an exact match
 */
export function compareDateTime(ts1, ts2) {
  return getDateTime(ts1) === getDateTime(ts2)
}

/**
 * High-level parser that converts the passed in string to {@link Timestamp} and uses 'now' to update relative information.
 * @param {string} input In the form 'YYYY-MM-DD hh:mm:ss' (seconds are optional, but not used)
 * @param {Timestamp} now A {@link Timestamp} to use for relative data updates
 * @returns {Timestamp} The {@link Timestamp.date} will be filled in as well as the {@link Timestamp.time} if a time is supplied and formatted fields (doy, weekday, workweek, etc). If 'now' is supplied, then relative data will also be updated.
 */
export function parseTimestamp(input, now = null) {
  let timestamp = parsed(input)
  if (timestamp === null) return null

  timestamp = updateFormatted(timestamp)

  if (now) {
    timestamp = updateRelative(timestamp, now, timestamp.hasTime)
  }

  return timestamp
}

/**
 * Converts a {@link Timestamp} into a numeric date identifier based on the passed {@link Timestamp}'s date
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The numeric date identifier
 */
export function getDayIdentifier(timestamp) {
  return timestamp.year * 100000000 + timestamp.month * 1000000 + timestamp.day * 10000
}

/**
 * Converts a {@link Timestamp} into a numeric time identifier based on the passed {@link Timestamp}'s time
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The numeric time identifier
 */
export function getTimeIdentifier(timestamp) {
  return timestamp.hour * 100 + timestamp.minute
}

/**
 * Converts a {@link Timestamp} into a numeric date and time identifier based on the passed {@link Timestamp}'s date and time
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The numeric date+time identifier
 */
export function getDayTimeIdentifier(timestamp) {
  return getDayIdentifier(timestamp) + getTimeIdentifier(timestamp)
}

/**
 * Returns the difference between two {@link Timestamp}s
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @param {boolean=} strict Optional flag to not to return negative numbers
 * @returns {number} The difference
 */
export function diffTimestamp(ts1, ts2, strict) {
  const utc1 = Date.UTC(ts1.year, ts1.month - 1, ts1.day, ts1.hour, ts1.minute)
  const utc2 = Date.UTC(ts2.year, ts2.month - 1, ts2.day, ts2.hour, ts2.minute)
  if (strict === true && utc2 < utc1) {
    // Not negative number
    // utc2 - utc1 < 0  -> utc2 < utc1 ->   NO: utc1 >= utc2
    return 0
  }
  return utc2 - utc1
}

/**
 * Updates a {@link Timestamp} with relative data (past, current and future)
 * @param {Timestamp} timestamp The {@link Timestamp} that needs relative data updated
 * @param {Timestamp} now {@link Timestamp} that represents the current date (optional time)
 * @param {boolean=} time Optional flag to include time ('timestamp' and 'now' params should have time values)
 * @returns {Timestamp} A new {@link Timestamp}
 */
export function updateRelative(timestamp, now, time = false) {
  let ts = copyTimestamp(timestamp)
  let a = getDayIdentifier(now)
  let b = getDayIdentifier(ts)
  let current = a === b

  if (ts.hasTime && time && current) {
    a = getTimeIdentifier(now)
    b = getTimeIdentifier(ts)
    current = a === b
  }

  ts.past = b < a
  ts.current = current
  ts.future = b > a
  ts.currentWeekday = ts.weekday === now.weekday

  return ts
}

/**
 * Sets a Timestamp{@link Timestamp} to number of minutes past midnight (modifies hour and minutes if needed)
 * @param {Timestamp} timestamp The {@link Timestamp} to modify
 * @param {number} minutes The number of minutes to set from midnight
 * @param {Timestamp=} now Optional {@link Timestamp} representing current date and time
 * @returns {Timestamp} A new {@link Timestamp}
 */
export function updateMinutes(timestamp, minutes, now) {
  let ts = copyTimestamp(timestamp)
  ts.hasTime = true
  ts.hour = Math.floor(minutes / TIME_CONSTANTS.MINUTES_IN.HOUR)
  ts.minute = minutes % TIME_CONSTANTS.MINUTES_IN.HOUR
  ts.time = getTime(ts)
  if (now) {
    ts = updateRelative(ts, now, true)
  }

  return ts
}

/**
 * Updates the {@link Timestamp} with the weekday
 * @param {Timestamp} timestamp The {@link Timestamp} to modify
 * @returns A new Timestamp
 */
export function updateWeekday(timestamp) {
  let ts = copyTimestamp(timestamp)
  ts.weekday = getWeekday(ts)

  return ts
}

/**
 * Updates the {@link Timestamp} with the day of the year (doy)
 * @param {Timestamp} timestamp The {@link Timestamp} to modify
 * @returns A new Timestamp
 */
export function updateDayOfYear(timestamp) {
  let ts = copyTimestamp(timestamp)
  ts.doy = getDayOfYear(ts)

  return ts
}

/**
 * Updates the {@link Timestamp} with the workweek
 * @param {Timestamp} timestamp The {@link Timestamp} to modify
 * @returns A new {@link Timestamp}
 */
export function updateWorkWeek(timestamp) {
  let ts = copyTimestamp(timestamp)
  ts.workweek = getWorkWeek(ts)

  return ts
}

/**
 * Updates the passed {@link Timestamp} with disabled, if needed
 * @param {Timestamp} timestamp The {@link Timestamp} to modify
 * @param {string} [disabledBefore] In 'YYY-MM-DD' format
 * @param {string} [disabledAfter] In 'YYY-MM-DD' format
 * @param {number[]} [disabledWeekdays] An array of numbers representing weekdays [0 = Sun, ..., 6 = Sat]
 * @param {string[]|string[][]} [disabledDays] An array of days in 'YYYY-MM-DD' format. If an array with a pair of dates is in first array, then this is treated as a range.
 * @returns A new {@link Timestamp}
 */
export function updateDisabled(
  timestamp,
  disabledBefore,
  disabledAfter,
  disabledWeekdays,
  disabledDays,
) {
  let ts = copyTimestamp(timestamp)
  const t = getDayIdentifier(ts)

  if (disabledBefore !== undefined) {
    const before = getDayIdentifier(parsed(disabledBefore))
    if (t <= before) {
      ts.disabled = true
    }
  }

  if (ts.disabled !== true && disabledAfter !== undefined) {
    const after = getDayIdentifier(parsed(disabledAfter))
    if (t >= after) {
      ts.disabled = true
    }
  }

  if (ts.disabled !== true && Array.isArray(disabledWeekdays) && disabledWeekdays.length > 0) {
    for (const weekday in disabledWeekdays) {
      if (disabledWeekdays[weekday] === ts.weekday) {
        ts.disabled = true
        break
      }
    }
  }

  if (ts.disabled !== true && Array.isArray(disabledDays) && disabledDays.length > 0) {
    for (const day in disabledDays) {
      if (Array.isArray(disabledDays[day]) && disabledDays[day].length === 2) {
        const start = parsed(disabledDays[day][0])
        const end = parsed(disabledDays[day][1])
        if (isBetweenDates(ts, start, end)) {
          ts.disabled = true
          break
        }
      } else {
        const d = getDayIdentifier(parseTimestamp(disabledDays[day] + ' 00:00'))
        if (d === t) {
          ts.disabled = true
          break
        }
      }
    }
  }

  return ts
}

/**
 * Updates the passed {@link Timestamp} with formatted data (time string, date string, weekday, day of year and workweek)
 * @param {Timestamp} timestamp The {@link Timestamp} to modify
 * @returns A new {@link Timestamp}
 */
export function updateFormatted(timestamp) {
  let ts = copyTimestamp(timestamp)
  ts.hasTime = true
  ts.time = getTime(ts)
  ts.date = getDate(ts)
  ts.weekday = getWeekday(ts)
  ts.doy = getDayOfYear(ts)
  ts.workweek = getWorkWeek(ts)

  return ts
}

/**
 * Returns day of the year (doy) for the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The day of the year
 */
export function getDayOfYear(timestamp) {
  if (timestamp.year === 0) return
  return (
    (Date.UTC(timestamp.year, timestamp.month - 1, timestamp.day) -
      Date.UTC(timestamp.year, 0, 0)) /
    24 /
    60 /
    60 /
    1000
  )
}

/**
 * Returns workweek for the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The work week
 */
export function getWorkWeek(timestamp) {
  let ts = copyTimestamp(timestamp)
  if (ts.year === 0) {
    ts = parseTimestamp(today())
  }

  // Remove time components of date
  const weekday = new Date(Date.UTC(ts.year, ts.month - 1, ts.day))

  // Adjust the date to the correct day of the week
  const dayAdjustment = 4 // thursday is 4
  weekday.setUTCDate(weekday.getUTCDate() - ((weekday.getUTCDay() + 6) % 7) + dayAdjustment)

  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  weekday.setUTCDate(weekday.getUTCDate() + dayAdjustment - (weekday.getUTCDay() || 7))

  // Get first day of year
  var yearStart = new Date(Date.UTC(weekday.getUTCFullYear(), 0, 1))

  // Calculate full weeks to nearest Thursday
  var weekNumber = Math.ceil(((weekday - yearStart) / 86400000 + 1) / 7)

  return weekNumber
}

/**
 * Returns weekday for the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @returns {number} The weekday
 */
export function getWeekday(timestamp) {
  let weekday = timestamp.weekday
  if (timestamp.hasDay) {
    const floor = Math.floor
    const day = timestamp.day
    const month = ((timestamp.month + 9) % MONTH_MAX) + 1
    const century = floor(timestamp.year / 100)
    const year = (timestamp.year % 100) - (timestamp.month <= 2 ? 1 : 0)

    weekday =
      (((day +
        floor(2.6 * month - 0.2) -
        2 * century +
        year +
        floor(year / 4) +
        floor(century / 4)) %
        7) +
        7) %
      7
  }

  return weekday
}

/**
 * Makes a copy of the passed in {@link Timestamp}
 * @param {Timestamp} timestamp The original {@link Timestamp}
 * @returns {Timestamp} A copy of the original {@link Timestamp}
 */
export function copyTimestamp(timestamp) {
  return { ...timestamp }
}

/**
 * Used internally to convert {@link Timestamp} used with 'parsed' or 'parseDate' so the 'date' portion of the {@link Timestamp} is correct.
 * @param {Timestamp} timestamp The (raw) {@link Timestamp}
 * @returns {string} A formatted date ('YYYY-MM-DD')
 */
export function getDate(timestamp) {
  let str = `${padNumber(timestamp.year, 4)}-${padNumber(timestamp.month, 2)}`

  if (timestamp.hasDay) str += `-${padNumber(timestamp.day, 2)}`

  return str
}

/**
 * Used intenally to convert {@link Timestamp} with 'parsed' or 'parseDate' so the 'time' portion of the {@link Timestamp} is correct.
 * @param {Timestamp} timestamp The (raw) {@link Timestamp}
 * @returns {string} A formatted time ('hh:mm')
 */
export function getTime(timestamp) {
  if (!timestamp.hasTime) {
    return ''
  }

  return `${padNumber(timestamp.hour, 2)}:${padNumber(timestamp.minute, 2)}`
}

/**
 * Returns a formatted string date and time ('YYYY-YY-MM hh:mm')
 * @param {Timestamp} timestamp The {@link Timestamp}
 * @returns {string} A formatted date time ('YYYY-MM-DD HH:mm')
 */
export function getDateTime(timestamp) {
  return getDate(timestamp) + ' ' + (timestamp.hasTime ? getTime(timestamp) : '00:00')
}

/**
 * An alias for {relativeDays}
 * @param {Timestamp} timestamp The {@link Timestamp} to modify
 * @param {function} [mover=nextDay] The mover function to use (ie: {nextDay} or {prevDay}).
 * @param {number} [days=1] The number of days to move.
 * @param {number[]} [allowedWeekdays=[ 0, 1, 2, 3, 4, 5, 6 ]] An array of numbers representing the weekdays. ie: [0 = Sun, ..., 6 = Sat].
 * @returns The modified {@link Timestamp}
 */
export function moveRelativeDays(
  timestamp,
  mover = nextDay,
  days = 1,
  allowedWeekdays = [0, 1, 2, 3, 4, 5, 6],
) {
  const ts = copyTimestamp(timestamp)
  return relativeDays(ts, mover, days, allowedWeekdays)
}

/**
 * Moves the {@link Timestamp} the number of relative days
 * @param {Timestamp} timestamp The {@link Timestamp} to modify
 * @param {function} [mover=nextDay] The mover function to use (ie: {nextDay} or {prevDay}).
 * @param {number} [days=1] The number of days to move.
 * @param {number[]} [allowedWeekdays=[ 0, 1, 2, 3, 4, 5, 6 ]] An array of numbers representing the weekdays. ie: [0 = Sun, ..., 6 = Sat].
 * @returns A new {@link Timestamp}
 */
export function relativeDays(
  timestamp,
  mover = nextDay,
  days = 1,
  allowedWeekdays = [0, 1, 2, 3, 4, 5, 6],
) {
  let ts = copyTimestamp(timestamp)
  if (!allowedWeekdays.includes(ts.weekday) && ts.weekday === 0 && mover === nextDay) {
    ++days
  }
  while (--days >= 0) {
    ts = mover(ts)
    if (allowedWeekdays.length < 7 && !allowedWeekdays.includes(ts.weekday)) {
      ++days
    }
  }

  return ts
}

/**
 * Finds the specified weekday (forward or back) based on the {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to modify
 * @param {number} weekday The weekday number (Sun = 0, ..., Sat = 6)
 * @param {function} [mover=nextDay] The function to use ({prevDay} or {nextDay}).
 * @param {number} [maxDays=6] The number of days to look forward or back.
 * @returns A new {@link Timestamp}
 */
export function findWeekday(timestamp, weekday, mover = nextDay, maxDays = 6) {
  let ts = copyTimestamp(timestamp)
  while (ts.weekday !== weekday && --maxDays >= 0) ts = mover(ts)
  return ts
}

/**
 * Returns an array of 0's and mostly 1's representing skipped days (used internally)
 * @param {number[]} weekdays An array of numbers representing the weekdays. ie: [0 = Sun, ..., 6 = Sat].
 * @returns {number[]} An array of 0's and mostly 1's (other numbers may occur previous to skipped days)
 */
export function getWeekdaySkips(weekdays) {
  const skips = [1, 1, 1, 1, 1, 1, 1]
  const filled = [0, 0, 0, 0, 0, 0, 0]
  for (let i = 0; i < weekdays.length; ++i) {
    filled[weekdays[i]] = 1
  }
  for (let k = 0; k < TIME_CONSTANTS.DAYS_IN.WEEK; ++k) {
    let skip = 1
    for (let j = 1; j < TIME_CONSTANTS.DAYS_IN.WEEK; ++j) {
      const next = (k + j) % TIME_CONSTANTS.DAYS_IN.WEEK
      if (filled[next]) {
        break
      }
      ++skip
    }
    skips[k] = filled[k] * skip
  }

  return skips
}

/**
 * Creates an array of {@link Timestamp}s based on start and end params
 * @param {Timestamp} start The starting {@link Timestamp}
 * @param {Timestamp} end The ending {@link Timestamp}
 * @param {Timestamp} now The relative day
 * @param {number[]} weekdaySkips An array representing available and skipped weekdays
 * @param {string} [disabledBefore] Days before this date are disabled (YYYY-MM-DD)
 * @param {string} [disabledAfter] Days after this date are disabled (YYYY-MM-DD)
 * @param {number[]} [disabledWeekdays] An array representing weekdays that are disabled [0 = Sun, ..., 6 = Sat]
 * @param {string[]} [disabledDays] An array of days in 'YYYY-MM-DD' format. If an array with a pair of dates is in first array, then this is treated as a range.
 * @param {number} [max=42] Max days to do
 * @param {number} [min=0]  Min days to do
 * @returns {Timestamp[]} The requested array of {@link Timestamp}s
 */
export function createDayList(
  start,
  end,
  now,
  weekdaySkips = [1, 1, 1, 1, 1, 1, 1],
  disabledBefore = undefined,
  disabledAfter = undefined,
  disabledWeekdays = [],
  disabledDays = [],
  max = 42,
  min = 0,
) {
  const stop = getDayIdentifier(end)
  const days = []
  let current = copyTimestamp(start)
  let currentIdentifier = 0
  let stopped = currentIdentifier === stop

  if (stop < getDayIdentifier(start)) {
    return days
  }

  while ((!stopped || days.length < min) && days.length < max) {
    currentIdentifier = getDayIdentifier(current)
    stopped = stopped || (currentIdentifier > stop && days.length >= min)
    if (stopped) {
      break
    }
    if (weekdaySkips[current.weekday] === 0) {
      current = relativeDays(current, nextDay)
      continue
    }
    let day = copyTimestamp(current)
    day = updateFormatted(day)
    day = updateRelative(day, now)
    day = updateDisabled(day, disabledBefore, disabledAfter, disabledWeekdays, disabledDays)
    days.push(day)
    current = relativeDays(current, nextDay)
  }

  return days
}

/**
 * Creates an array of interval {@link Timestamp}s based on params
 * @param {Timestamp} timestamp The starting {@link Timestamp}
 * @param {number} first The starting interval time
 * @param {number} minutes How many minutes between intervals (ie: 60, 30, 15 would be common ones)
 * @param {number} count The number of intervals needed
 * @param {Timestamp} now A relative {@link Timestamp} with time
 * @returns {Timestamp[]} The requested array of interval {@link Timestamp}s
 */
export function createIntervalList(timestamp, first, minutes, count, now) {
  const intervals = []

  for (let i = 0; i < count; ++i) {
    const mins = (first + i) * minutes
    const ts = copyTimestamp(timestamp)
    intervals.push(updateMinutes(ts, mins, now))
  }

  return intervals
}

/**
 * @callback getOptions
 * @param {Timestamp} timestamp A {@link Timestamp} object
 * @param {boolean} short True if using short options
 * @returns {Object} An Intl object representing optioons to be used
 */

/**
 * @callback formatter
 * @param {Timestamp} timestamp The {@link Timestamp} being used
 * @param {boolean} short If short format is being requested
 * @returns {string} The localized string of the formatted {@link Timestamp}
 */

/**
 * Returns a function that uses Intl.DateTimeFormat formatting
 * @param {string} locale The locale to use (ie: en-US)
 * @param {getOptions} cb The function to call for options. This function should return an Intl formatted object. The function is passed (timestamp, short).
 * @returns {formatter} The function has params (timestamp, short). The short is to use the short options.
 */
export function createNativeLocaleFormatter(locale, cb) {
  // eslint-disable-next-line no-unused-vars
  const emptyFormatter = (_t, _s) => ''

  /* istanbul ignore next */
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return emptyFormatter
  }

  return (timestamp, short) => {
    try {
      const intlFormatter = new Intl.DateTimeFormat(locale || undefined, cb(timestamp, short))
      return intlFormatter.format(makeDateTime(timestamp))
    } catch (e) /* istanbul ignore next */ {
      console.error(`Intl.DateTimeFormat: ${e.message} -> ${getDateTime(timestamp)}`)
      return emptyFormatter
    }
  }
}

/**
 * Makes a JavaScript Date from the passed {@link Timestamp}
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @param {boolean} utc True to get Date object using UTC
 * @returns {date} A JavaScript Date
 */
export function makeDate(timestamp, utc = true) {
  if (utc) return new Date(Date.UTC(timestamp.year, timestamp.month - 1, timestamp.day, 0, 0))
  return new Date(timestamp.year, timestamp.month - 1, timestamp.day, 0, 0)
}

/**
 * Makes a JavaScript Date from the passed {@link Timestamp} (with time)
 * @param {Timestamp} timestamp The {@link Timestamp} to use
 * @param {boolean} utc True to get Date object using UTC
 * @returns {date} A JavaScript Date
 */
export function makeDateTime(timestamp, utc = true) {
  if (utc)
    return new Date(
      Date.UTC(
        timestamp.year,
        timestamp.month - 1,
        timestamp.day,
        timestamp.hour,
        timestamp.minute,
      ),
    )
  return new Date(
    timestamp.year,
    timestamp.month - 1,
    timestamp.day,
    timestamp.hour,
    timestamp.minute,
  )
}

// validate a number IS a number
/**
 * Teting is passed value is a number
 * @param {(string|number)} input The value to use
 * @returns {boolean} True if a number (not floating point)
 */
export function validateNumber(input) {
  return isFinite(parseInt(input, 10))
}

/**
 * Given an array of {@link Timestamp}s, finds the max date (and possible time)
 * @param {Timestamp[]} timestamps This is an array of {@link Timestamp}s
 * @param {boolean=} useTime Default false; if true, uses time in the comparison as well
 * @returns The {@link Timestamp} with the highest date (and possibly time) value
 */
export function maxTimestamp(timestamps, useTime = false) {
  const func = useTime === true ? getDayTimeIdentifier : getDayIdentifier
  return timestamps.reduce((prev, cur) => {
    return Math.max(func(prev), func(cur)) === func(prev) ? prev : cur
  })
}

/**
 * Given an array of {@link Timestamp}s, finds the min date (and possible time)
 * @param {Timestamp[]} timestamps This is an array of {@link Timestamp}s
 * @param {boolean=} useTime Default false; if true, uses time in the comparison as well
 * @returns The {@link Timestamp} with the lowest date (and possibly time) value
 */
export function minTimestamp(timestamps, useTime = false) {
  const func = useTime === true ? getDayTimeIdentifier : getDayIdentifier
  return timestamps.reduce((prev, cur) => {
    return Math.min(func(prev), func(cur)) === func(prev) ? prev : cur
  })
}

/**
 * Determines if the passed {@link Timestamp} is between (or equal) to two {@link Timestamp}s (range)
 * @param {Timestamp} timestamp The {@link Timestamp} for testing
 * @param {Timestamp} startTimestamp The starting {@link Timestamp}
 * @param {Timestamp} endTimestamp The ending {@link Timestamp}
 * @param {boolean=} useTime If true, use time from the {@link Timestamp}s
 * @returns {boolean} True if {@link Timestamp} is between (or equal) to two {@link Timestamp}s (range)
 */
export function isBetweenDates(timestamp, startTimestamp, endTimestamp, useTime /* = false */) {
  const cd = getDayIdentifier(timestamp) + (useTime === true ? getTimeIdentifier(timestamp) : 0)
  const sd =
    getDayIdentifier(startTimestamp) + (useTime === true ? getTimeIdentifier(startTimestamp) : 0)
  const ed =
    getDayIdentifier(endTimestamp) + (useTime === true ? getTimeIdentifier(endTimestamp) : 0)

  return cd >= sd && cd <= ed
}

/**
 * Determine if two ranges of {@link Timestamp}s overlap each other
 * @param {Timestamp} startTimestamp The starting {@link Timestamp} of first range
 * @param {Timestamp} endTimestamp The endinging {@link Timestamp} of first range
 * @param {Timestamp} firstTimestamp The starting {@link Timestamp} of second range
 * @param {Timestamp} lastTimestamp The ending {@link Timestamp} of second range
 * @returns {boolean} True if the two ranges overlap each other
 */
export function isOverlappingDates(startTimestamp, endTimestamp, firstTimestamp, lastTimestamp) {
  const start = getDayIdentifier(startTimestamp)
  const end = getDayIdentifier(endTimestamp)
  const first = getDayIdentifier(firstTimestamp)
  const last = getDayIdentifier(lastTimestamp)
  return (
    (start >= first && start <= last) || // overlap left
    (end >= first && end <= last) || // overlap right
    (first >= start && end >= last) // surrounding
  )
}

/**
 * Add or decrements years, months, days, hours or minutes to a timestamp
 * @param {Timestamp} timestamp The {@link Timestamp} object
 * @param {Object} options configuration data
 * @param {number=} options.year If positive, adds years. If negative, removes years.
 * @param {number=} options.month If positive, adds months. If negative, removes month.
 * @param {number=} options.day If positive, adds days. If negative, removes days.
 * @param {number=} options.hour If positive, adds hours. If negative, removes hours.
 * @param {number=} options.minute If positive, adds minutes. If negative, removes minutes.
 * @returns {Timestamp} A modified copy of the passed in {@link Timestamp}
 */
export function addToDate(timestamp, options) {
  const ts = copyTimestamp(timestamp)

  if (options.year) ts.year += options.year
  if (options.month) ts.month += options.month
  if (options.day) ts.day += options.day
  if (options.hour) ts.hour += options.hour
  if (options.minute) ts.minute += options.minute

  return updateFormatted(normalizeTimestamp(ts))
}

function normalizeTimestamp(ts) {
  const date = new Date(ts.year, ts.month - 1, ts.day, ts.hour, ts.minute)
  return {
    ...ts,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  }
}

/**
 * Returns number of days between two {@link Timestamp}s
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 * @returns Number of days
 */
export function daysBetween(ts1, ts2) {
  const diff = diffTimestamp(ts1, ts2, true)
  return Math.floor(diff / TIME_CONSTANTS.MILLISECONDS_IN.DAY)
}

/**
 * Returns number of weeks between two {@link Timestamp}s
 * @param {Timestamp} ts1 The first {@link Timestamp}
 * @param {Timestamp} ts2 The second {@link Timestamp}
 */
export function weeksBetween(ts1, ts2) {
  let t1 = copyTimestamp(ts1)
  let t2 = copyTimestamp(ts2)
  t1 = findWeekday(t1, 0)
  t2 = findWeekday(t2, 6)
  return Math.ceil(daysBetween(t1, t2) / TIME_CONSTANTS.DAYS_IN.WEEK)
}

// Known dates - starting week on a monday to conform to browser
const weekdayDateMap = {
  Sun: new Date('2020-01-05T00:00:00.000Z'),
  Mon: new Date('2020-01-06T00:00:00.000Z'),
  Tue: new Date('2020-01-07T00:00:00.000Z'),
  Wed: new Date('2020-01-08T00:00:00.000Z'),
  Thu: new Date('2020-01-09T00:00:00.000Z'),
  Fri: new Date('2020-01-10T00:00:00.000Z'),
  Sat: new Date('2020-01-11T00:00:00.000Z'),
}

export function getWeekdayFormatter() {
  // eslint-disable-next-line no-unused-vars
  const emptyFormatter = (_d, _t) => ''
  const options = {
    long: { timeZone: 'UTC', weekday: 'long' },
    short: { timeZone: 'UTC', weekday: 'short' },
    narrow: { timeZone: 'UTC', weekday: 'narrow' },
  }

  /* istanbul ignore next */
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return emptyFormatter
  }

  // type = 'narrow', 'short', 'long'
  function weekdayFormatter(weekday, type, locale) {
    try {
      const intlFormatter = new Intl.DateTimeFormat(
        locale || undefined,
        options[type] || options['long'],
      )
      return intlFormatter.format(weekdayDateMap[weekday])
    } catch (e) /* istanbul ignore next */ {
      console.error(`Intl.DateTimeFormat: ${e.message} -> day of week: ${weekday}`)
      return emptyFormatter
    }
  }

  return weekdayFormatter
}

export function getWeekdayNames(type, locale) {
  const shortWeekdays = Object.keys(weekdayDateMap)
  const weekdayFormatter = getWeekdayFormatter()
  return shortWeekdays.map((weekday) => weekdayFormatter(weekday, type, locale))
}

export function getMonthFormatter() {
  // eslint-disable-next-line no-unused-vars
  const emptyFormatter = (_m, _t) => ''
  const options = {
    long: { timeZone: 'UTC', month: 'long' },
    short: { timeZone: 'UTC', month: 'short' },
    narrow: { timeZone: 'UTC', month: 'narrow' },
  }

  /* istanbul ignore next */
  if (typeof Intl === 'undefined' || typeof Intl.DateTimeFormat === 'undefined') {
    return emptyFormatter
  }

  // type = 'narrow', 'short', 'long'
  function monthFormatter(month, type, locale) {
    try {
      const intlFormatter = new Intl.DateTimeFormat(
        locale || undefined,
        options[type] || options['long'],
      )
      const date = new Date()
      date.setDate(1)
      date.setMonth(month)
      return intlFormatter.format(date)
    } catch (e) /* istanbul ignore next */ {
      console.error(`Intl.DateTimeFormat: ${e.message} -> month: ${month}`)
      return emptyFormatter
    }
  }

  return monthFormatter
}

export function getMonthNames(type, locale) {
  const monthFormatter = getMonthFormatter()
  return [...Array(12).keys()].map((month) => monthFormatter(month, type, locale))
}

// the exports...
export default {
  PARSE_DATETIME,
  PARSE_DATE,
  PARSE_TIME,
  DAYS_IN_MONTH,
  DAYS_IN_MONTH_LEAP,
  DAYS_IN_MONTH_MIN,
  DAYS_IN_MONTH_MAX,
  MONTH_MAX,
  MONTH_MIN,
  DAY_MIN,
  TIME_CONSTANTS,
  FIRST_HOUR,
  Timestamp,
  TimeObject,
  today,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfMonth,
  getEndOfMonth,
  parseTime,
  validateTimestamp,
  parsed,
  parseTimestamp,
  parseDate,
  getDayIdentifier,
  getTimeIdentifier,
  getDayTimeIdentifier,
  diffTimestamp,
  updateRelative,
  updateMinutes,
  updateWeekday,
  updateDayOfYear,
  updateWorkWeek,
  updateDisabled,
  updateFormatted,
  getDayOfYear,
  getWorkWeek,
  getWeekday,
  isLeapYear,
  daysInMonth,
  copyTimestamp,
  padNumber,
  getDate,
  getTime,
  getDateTime,
  nextDay,
  prevDay,
  relativeDays,
  findWeekday,
  getWeekdaySkips,
  createDayList,
  createIntervalList,
  createNativeLocaleFormatter,
  makeDate,
  makeDateTime,
  validateNumber,
  isBetweenDates,
  isOverlappingDates,
  daysBetween,
  weeksBetween,
  addToDate,
  compareTimestamps,
  compareDate,
  compareTime,
  compareDateTime,
  getWeekdayFormatter,
  getWeekdayNames,
  getMonthFormatter,
  getMonthNames,
}
