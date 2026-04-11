import { describe, it, expect, beforeEach } from 'vitest'
import {
  isValidStellarAddress,
  formatBalance,
  shortAddress,
  convertToXLM,
  convertFromXLM,
  calcFee,
  generateOTP,
  CURRENCIES,
  cache,
} from '../stellar.js'

describe('isValidStellarAddress', () => {
  it('returns true for valid address', () => {
    expect(isValidStellarAddress('GBVZS4GWZPBQRQNKOVXUTZFHZRMYYQNKQNHGD6WSOVBZADJXCPMRMVJL')).toBe(true)
  })
  it('returns false for empty string', () => {
    expect(isValidStellarAddress('')).toBe(false)
  })
  it('returns false for null', () => {
    expect(isValidStellarAddress(null)).toBe(false)
  })
  it('returns false for address not starting with G', () => {
    expect(isValidStellarAddress('XBVZS4GWZPBQRQNKOVXUTZFHZRMYYQNKQNHGD6WSOVBZADJXCPMRMVJL')).toBe(false)
  })
  it('returns false for short address', () => {
    expect(isValidStellarAddress('GABC123')).toBe(false)
  })
  it('returns false for random string', () => {
    expect(isValidStellarAddress('hello world')).toBe(false)
  })
})

describe('formatBalance', () => {
  it('formats to 4 decimal places', () => {
    expect(formatBalance('100')).toBe('100.0000')
  })
  it('rounds correctly', () => {
    expect(formatBalance('9999.12345')).toBe('9999.1234')
  })
  it('returns 0.0000 for invalid', () => {
    expect(formatBalance('abc')).toBe('0.0000')
  })
  it('handles undefined', () => {
    expect(formatBalance(undefined)).toBe('0.0000')
  })
  it('handles zero', () => {
    expect(formatBalance('0')).toBe('0.0000')
  })
})

describe('shortAddress', () => {
  it('shortens correctly', () => {
    const addr = 'GAAZI4TCR3TY5OJHCTJC2A4QSY6CJWJH5IAJTGKIN2ER7LBNVKOCCWN'
    expect(shortAddress(addr)).toBe('GAAZI4…OCCWN')
  })
  it('returns original for short strings', () => {
    expect(shortAddress('GABC')).toBe('GABC')
  })
  it('handles null', () => {
    expect(shortAddress(null)).toBe(null)
  })
  it('starts with first 6 chars', () => {
    const addr = 'GBTEST123456789012345678901234567890123456789012345678'
    expect(shortAddress(addr).startsWith('GBTEST')).toBe(true)
  })
})

describe('convertToXLM', () => {
  it('returns a string', () => {
    expect(typeof convertToXLM(100, 'USD')).toBe('string')
  })
  it('handles zero amount', () => {
    expect(parseFloat(convertToXLM(0, 'AED'))).toBe(0)
  })
  it('converts USD to XLM correctly', () => {
    // 100 USD at rate 1.0 / 0.11 per XLM = ~909 XLM
    const result = parseFloat(convertToXLM(100, 'USD'))
    expect(result).toBeGreaterThan(0)
  })
  it('converts AED to XLM correctly', () => {
    // AED rate is 0.272, so 100 AED = 27.2 USD = ~247 XLM
    const result = parseFloat(convertToXLM(100, 'AED'))
    expect(result).toBeGreaterThan(0)
  })
  it('AED gives less XLM than USD for same amount', () => {
    const usd = parseFloat(convertToXLM(100, 'USD'))
    const aed = parseFloat(convertToXLM(100, 'AED'))
    expect(usd).toBeGreaterThan(aed)
  })
})

describe('convertFromXLM', () => {
  it('returns a string', () => {
    expect(typeof convertFromXLM(100, 'INR')).toBe('string')
  })
  it('handles zero', () => {
    expect(parseFloat(convertFromXLM(0, 'INR'))).toBe(0)
  })
  it('converts XLM to USD correctly', () => {
    // 100 XLM * 0.11 = 11 USD
    const result = parseFloat(convertFromXLM(100, 'USD'))
    expect(result).toBeCloseTo(11, 0)
  })
  it('INR result is greater than USD for same XLM', () => {
    const usd = parseFloat(convertFromXLM(100, 'USD'))
    const inr = parseFloat(convertFromXLM(100, 'INR'))
    expect(inr).toBeGreaterThan(usd)
  })
})

describe('calcFee', () => {
  it('returns 0.1 flat fee', () => {
    expect(calcFee()).toBe(0.1)
  })
  it('fee is same regardless of amount', () => {
    expect(calcFee(1)).toBe(calcFee(10000))
  })
})

describe('generateOTP', () => {
  it('returns a 6-digit string', () => {
    expect(generateOTP().length).toBe(6)
  })
  it('returns only digits', () => {
    expect(/^[0-9]{6}$/.test(generateOTP())).toBe(true)
  })
  it('two OTPs are different most of the time', () => {
    const results = new Set(Array.from({ length: 10 }, generateOTP))
    expect(results.size).toBeGreaterThan(1)
  })
})

describe('CURRENCIES', () => {
  it('has AED currency', () => {
    expect(CURRENCIES.AED).toBeDefined()
  })
  it('has INR currency', () => {
    expect(CURRENCIES.INR).toBeDefined()
  })
  it('USD rate is 1', () => {
    expect(CURRENCIES.USD.rate).toBe(1)
  })
  it('all currencies have rate greater than 0', () => {
    Object.values(CURRENCIES).forEach(c => {
      expect(c.rate).toBeGreaterThan(0)
    })
  })
  it('has at least 5 currencies', () => {
    expect(Object.keys(CURRENCIES).length).toBeGreaterThanOrEqual(5)
  })
})

describe('Cache', () => {
  beforeEach(() => {
    cache.invalidate()
    cache.balances = {}
  })
  it('is invalid when empty', () => {
    expect(cache.isValid()).toBe(false)
  })
  it('stores and retrieves balance', () => {
    cache.setBalance('GTEST', '100.0000')
    expect(cache.getBalance('GTEST')).toBe('100.0000')
  })
  it('returns null for unknown address', () => {
    expect(cache.getBalance('GUNKNOWN')).toBe(null)
  })
  it('invalidate clears balances', () => {
    cache.setBalance('GTEST', '100.0000')
    cache.invalidate()
    expect(cache.isValid()).toBe(false)
  })
})