import { describe, it, expect, beforeEach } from 'vitest'
import {
  isValidStellarAddress,
  formatBalance,
  shortAddress,
  convertToUSDC,
  convertFromUSDC,
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
    expect(formatBalance('9999.12345')).toBe('9999.1235')
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

describe('convertToUSDC', () => {
  it('converts AED to USDC correctly', () => {
    const result = parseFloat(convertToUSDC(100, 'AED'))
    expect(result).toBeCloseTo(27.2, 1)
  })
  it('converts USD to USDC 1:1', () => {
    const result = parseFloat(convertToUSDC(100, 'USD'))
    expect(result).toBeCloseTo(100, 1)
  })
  it('handles zero amount', () => {
    expect(parseFloat(convertToUSDC(0, 'AED'))).toBe(0)
  })
  it('returns a string', () => {
    expect(typeof convertToUSDC(100, 'USD')).toBe('string')
  })
})

describe('convertFromUSDC', () => {
  it('converts USDC to INR correctly', () => {
    const result = parseFloat(convertFromUSDC(1, 'INR'))
    expect(result).toBeCloseTo(83.3, 0)
  })
  it('converts USDC to USD 1:1', () => {
    const result = parseFloat(convertFromUSDC(100, 'USD'))
    expect(result).toBeCloseTo(100, 1)
  })
  it('handles zero', () => {
    expect(parseFloat(convertFromUSDC(0, 'INR'))).toBe(0)
  })
})

describe('calcFee', () => {
  it('returns 0.1 USDC flat fee', () => {
    expect(calcFee(1000)).toBe(0.1)
  })
  it('fee is same regardless of amount', () => {
    expect(calcFee(1)).toBe(calcFee(10000))
  })
})

describe('generateOTP', () => {
  it('returns a 6-digit string', () => {
    const otp = generateOTP()
    expect(otp.length).toBe(6)
  })
  it('returns a numeric string', () => {
    const otp = generateOTP()
    expect(isNaN(parseInt(otp))).toBe(false)
  })
  it('is different each time', () => {
    const otp1 = generateOTP()
    const otp2 = generateOTP()
    // Very unlikely to be equal
    expect(otp1).not.toBe(otp2)
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
  it('all currencies have rate > 0', () => {
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
  it('becomes invalid after invalidate', () => {
    cache.setTxns([{ id: '1' }])
    cache.invalidate()
    expect(cache.isValid()).toBe(false)
  })
})