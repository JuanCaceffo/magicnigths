import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CDate } from './CDate'

describe('CDate Methods Tests', () => {
  beforeEach(() => {
    // Simulated timers
    vi.useFakeTimers()

    // Arrange
    const date = new Date(2015, 1, 2).toISOString()
    vi.setSystemTime(date)
  })

  afterEach(() => {
    // Restore normal timers
    vi.useRealTimers()
  })

  it('Should fail if the date is lower than the current date', () => {
    //Assert

    expect(CDate.validateFutureDate('2015-02-01')).toBeFalsy()
  })

  it('Should succeed if the date is greater than the current date', () => {
    //Assert
    expect(CDate.validateFutureDate('2015-02-03')).toBeTruthy()
  })

  it('Should fail if the time is lower than the current time', () => {
    // Arrange
    const date = new Date(2000, 1, 1, 12, 0, 0)
    vi.setSystemTime(date)
    //Assert
    expect(CDate.validateFutureTime('11:59:59')).toBeFalsy()
  })

  it('Should succeed if the time is greater than the current time', () => {
    const date = new Date(2000, 1, 1, 12, 0, 0)
    vi.setSystemTime(date)
    //Assert
    expect(CDate.validateFutureTime('12:00:01')).toBeTruthy()
  })

  it('Should succeed if dates are equal', () => {
    const date = new Date(2000, 0, 1, 0, 0, 0)
    vi.setSystemTime(date)
    //Assert
    expect(CDate.isSameDate('2000-01-01')).toBeTruthy()
  })

  it('Should be falsy if dates are not equal', () => {
    const date = new Date(2015, 0, 1)
    vi.setSystemTime(date)
    //Assert
    expect(CDate.isSameDate('2000-01-01')).toBeFalsy()
  })
})
