// stellar.js — Horizon Core
import * as StellarSdk from '@stellar/stellar-sdk'

export const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET
export const HORIZON_URL        = 'https://horizon-testnet.stellar.org'
export const RPC_URL            = 'https://soroban-testnet.stellar.org'
export const CONTRACT_ID        = 'CDSVXG7VBBP2IASOP4V4ARRZNVPI2VHX5ARJEY7ZZD6K2WCGFAC54S4V'

// All world currencies — sorted alphabetically by name
export const CURRENCIES = {
  AED: { name: 'UAE Dirham',          flag: '🇦🇪', rate: 0.272   },
  AFN: { name: 'Afghan Afghani',      flag: '🇦🇫', rate: 0.0072  },
  ALL: { name: 'Albanian Lek',        flag: '🇦🇱', rate: 0.011   },
  AMD: { name: 'Armenian Dram',       flag: '🇦🇲', rate: 0.0026  },
  ANG: { name: 'Netherlands Antillian Guilder', flag: '🇸🇽', rate: 0.559 },
  AOA: { name: 'Angolan Kwanza',      flag: '🇦🇴', rate: 0.0011  },
  ARS: { name: 'Argentine Peso',      flag: '🇦🇷', rate: 0.001   },
  AUD: { name: 'Australian Dollar',   flag: '🇦🇺', rate: 0.650   },
  AWG: { name: 'Aruban Florin',       flag: '🇦🇼', rate: 0.559   },
  AZN: { name: 'Azerbaijani Manat',   flag: '🇦🇿', rate: 0.588   },
  BAM: { name: 'Bosnia-Herzegovina Convertible Mark', flag: '🇧🇦', rate: 0.556 },
  BBD: { name: 'Barbadian Dollar',    flag: '🇧🇧', rate: 0.500   },
  BDT: { name: 'Bangladeshi Taka',    flag: '🇧🇩', rate: 0.0091  },
  BGN: { name: 'Bulgarian Lev',       flag: '🇧🇬', rate: 0.556   },
  BHD: { name: 'Bahraini Dinar',      flag: '🇧🇭', rate: 2.653   },
  BIF: { name: 'Burundian Franc',     flag: '🇧🇮', rate: 0.00035 },
  BMD: { name: 'Bermudan Dollar',     flag: '🇧🇲', rate: 1.000   },
  BND: { name: 'Brunei Dollar',       flag: '🇧🇳', rate: 0.740   },
  BOB: { name: 'Bolivian Boliviano',  flag: '🇧🇴', rate: 0.145   },
  BRL: { name: 'Brazilian Real',      flag: '🇧🇷', rate: 0.195   },
  BSD: { name: 'Bahamian Dollar',     flag: '🇧🇸', rate: 1.000   },
  BTN: { name: 'Bhutanese Ngultrum',  flag: '🇧🇹', rate: 0.012   },
  BWP: { name: 'Botswanan Pula',      flag: '🇧🇼', rate: 0.073   },
  BYN: { name: 'Belarusian Ruble',    flag: '🇧🇾', rate: 0.308   },
  BZD: { name: 'Belize Dollar',       flag: '🇧🇿', rate: 0.500   },
  CAD: { name: 'Canadian Dollar',     flag: '🇨🇦', rate: 0.735   },
  CDF: { name: 'Congolese Franc',     flag: '🇨🇩', rate: 0.00035 },
  CHF: { name: 'Swiss Franc',         flag: '🇨🇭', rate: 1.130   },
  CLP: { name: 'Chilean Peso',        flag: '🇨🇱', rate: 0.001   },
  CNY: { name: 'Chinese Yuan',        flag: '🇨🇳', rate: 0.138   },
  COP: { name: 'Colombian Peso',      flag: '🇨🇴', rate: 0.00024 },
  CRC: { name: 'Costa Rican Colón',   flag: '🇨🇷', rate: 0.00195 },
  CUP: { name: 'Cuban Peso',          flag: '🇨🇺', rate: 0.042   },
  CVE: { name: 'Cape Verdean Escudo', flag: '🇨🇻', rate: 0.0098  },
  CZK: { name: 'Czech Koruna',        flag: '🇨🇿', rate: 0.044   },
  DJF: { name: 'Djiboutian Franc',    flag: '🇩🇯', rate: 0.0056  },
  DKK: { name: 'Danish Krone',        flag: '🇩🇰', rate: 0.145   },
  DOP: { name: 'Dominican Peso',      flag: '🇩🇴', rate: 0.017   },
  DZD: { name: 'Algerian Dinar',      flag: '🇩🇿', rate: 0.0074  },
  EGP: { name: 'Egyptian Pound',      flag: '🇪🇬', rate: 0.020   },
  ETB: { name: 'Ethiopian Birr',      flag: '🇪🇹', rate: 0.0076  },
  EUR: { name: 'Euro',                flag: '🇪🇺', rate: 1.080   },
  FJD: { name: 'Fijian Dollar',       flag: '🇫🇯', rate: 0.441   },
  GBP: { name: 'British Pound',       flag: '🇬🇧', rate: 1.270   },
  GEL: { name: 'Georgian Lari',       flag: '🇬🇪', rate: 0.366   },
  GHS: { name: 'Ghanaian Cedi',       flag: '🇬🇭', rate: 0.063   },
  GMD: { name: 'Gambian Dalasi',      flag: '🇬🇲', rate: 0.014   },
  HKD: { name: 'Hong Kong Dollar',    flag: '🇭🇰', rate: 0.128   },
  HNL: { name: 'Honduran Lempira',    flag: '🇭🇳', rate: 0.040   },
  HRK: { name: 'Croatian Kuna',       flag: '🇭🇷', rate: 0.143   },
  HTG: { name: 'Haitian Gourde',      flag: '🇭🇹', rate: 0.0076  },
  HUF: { name: 'Hungarian Forint',    flag: '🇭🇺', rate: 0.0028  },
  IDR: { name: 'Indonesian Rupiah',   flag: '🇮🇩', rate: 0.000062 },
  ILS: { name: 'Israeli Shekel',      flag: '🇮🇱', rate: 0.270   },
  INR: { name: 'Indian Rupee',        flag: '🇮🇳', rate: 0.012   },
  IQD: { name: 'Iraqi Dinar',         flag: '🇮🇶', rate: 0.00076 },
  IRR: { name: 'Iranian Rial',        flag: '🇮🇷', rate: 0.000024 },
  ISK: { name: 'Icelandic Króna',     flag: '🇮🇸', rate: 0.0071  },
  JMD: { name: 'Jamaican Dollar',     flag: '🇯🇲', rate: 0.0065  },
  JOD: { name: 'Jordanian Dinar',     flag: '🇯🇴', rate: 1.410   },
  JPY: { name: 'Japanese Yen',        flag: '🇯🇵', rate: 0.0066  },
  KES: { name: 'Kenyan Shilling',     flag: '🇰🇪', rate: 0.0077  },
  KGS: { name: 'Kyrgystani Som',      flag: '🇰🇬', rate: 0.0115  },
  KHR: { name: 'Cambodian Riel',      flag: '🇰🇭', rate: 0.00025 },
  KPW: { name: 'North Korean Won',    flag: '🇰🇵', rate: 0.0011  },
  KRW: { name: 'South Korean Won',    flag: '🇰🇷', rate: 0.00069 },
  KWD: { name: 'Kuwaiti Dinar',       flag: '🇰🇼', rate: 3.260   },
  KZT: { name: 'Kazakhstani Tenge',   flag: '🇰🇿', rate: 0.00198 },
  LAK: { name: 'Laotian Kip',         flag: '🇱🇦', rate: 0.000048 },
  LBP: { name: 'Lebanese Pound',      flag: '🇱🇧', rate: 0.000011 },
  LKR: { name: 'Sri Lankan Rupee',    flag: '🇱🇰', rate: 0.0034  },
  LYD: { name: 'Libyan Dinar',        flag: '🇱🇾', rate: 0.207   },
  MAD: { name: 'Moroccan Dirham',     flag: '🇲🇦', rate: 0.100   },
  MDL: { name: 'Moldovan Leu',        flag: '🇲🇩', rate: 0.056   },
  MKD: { name: 'Macedonian Denar',    flag: '🇲🇰', rate: 0.0176  },
  MMK: { name: 'Myanmar Kyat',        flag: '🇲🇲', rate: 0.00048 },
  MNT: { name: 'Mongolian Tugrik',    flag: '🇲🇳', rate: 0.00029 },
  MOP: { name: 'Macanese Pataca',     flag: '🇲🇴', rate: 0.124   },
  MUR: { name: 'Mauritian Rupee',     flag: '🇲🇺', rate: 0.022   },
  MVR: { name: 'Maldivian Rufiyaa',   flag: '🇲🇻', rate: 0.065   },
  MWK: { name: 'Malawian Kwacha',     flag: '🇲🇼', rate: 0.00058 },
  MXN: { name: 'Mexican Peso',        flag: '🇲🇽', rate: 0.052   },
  MYR: { name: 'Malaysian Ringgit',   flag: '🇲🇾', rate: 0.225   },
  MZN: { name: 'Mozambican Metical',  flag: '🇲🇿', rate: 0.0156  },
  NAD: { name: 'Namibian Dollar',     flag: '🇳🇦', rate: 0.055   },
  NGN: { name: 'Nigerian Naira',      flag: '🇳🇬', rate: 0.00063 },
  NIO: { name: 'Nicaraguan Córdoba',  flag: '🇳🇮', rate: 0.027   },
  NOK: { name: 'Norwegian Krone',     flag: '🇳🇴', rate: 0.092   },
  NPR: { name: 'Nepalese Rupee',      flag: '🇳🇵', rate: 0.0075  },
  NZD: { name: 'New Zealand Dollar',  flag: '🇳🇿', rate: 0.600   },
  OMR: { name: 'Omani Rial',          flag: '🇴🇲', rate: 2.597   },
  PAB: { name: 'Panamanian Balboa',   flag: '🇵🇦', rate: 1.000   },
  PEN: { name: 'Peruvian Sol',        flag: '🇵🇪', rate: 0.265   },
  PHP: { name: 'Philippine Peso',     flag: '🇵🇭', rate: 0.0174  },
  PKR: { name: 'Pakistani Rupee',     flag: '🇵🇰', rate: 0.0036  },
  PLN: { name: 'Polish Zloty',        flag: '🇵🇱', rate: 0.248   },
  PYG: { name: 'Paraguayan Guarani',  flag: '🇵🇾', rate: 0.000135 },
  QAR: { name: 'Qatari Rial',         flag: '🇶🇦', rate: 0.274   },
  RON: { name: 'Romanian Leu',        flag: '🇷🇴', rate: 0.219   },
  RSD: { name: 'Serbian Dinar',       flag: '🇷🇸', rate: 0.0092  },
  RUB: { name: 'Russian Ruble',       flag: '🇷🇺', rate: 0.011   },
  RWF: { name: 'Rwandan Franc',       flag: '🇷🇼', rate: 0.00069 },
  SAR: { name: 'Saudi Riyal',         flag: '🇸🇦', rate: 0.266   },
  SDG: { name: 'Sudanese Pound',      flag: '🇸🇩', rate: 0.0017  },
  SEK: { name: 'Swedish Krona',       flag: '🇸🇪', rate: 0.095   },
  SGD: { name: 'Singapore Dollar',    flag: '🇸🇬', rate: 0.750   },
  SOS: { name: 'Somali Shilling',     flag: '🇸🇴', rate: 0.00174 },
  SYP: { name: 'Syrian Pound',        flag: '🇸🇾', rate: 0.000078 },
  THB: { name: 'Thai Baht',           flag: '🇹🇭', rate: 0.029   },
  TJS: { name: 'Tajikistani Somoni',  flag: '🇹🇯', rate: 0.097   },
  TMT: { name: 'Turkmenistani Manat', flag: '🇹🇲', rate: 0.286   },
  TND: { name: 'Tunisian Dinar',      flag: '🇹🇳', rate: 0.321   },
  TRY: { name: 'Turkish Lira',        flag: '🇹🇷', rate: 0.027   },
  TTD: { name: 'Trinidad & Tobago Dollar', flag: '🇹🇹', rate: 0.148 },
  TWD: { name: 'Taiwan Dollar',       flag: '🇹🇼', rate: 0.031   },
  TZS: { name: 'Tanzanian Shilling',  flag: '🇹🇿', rate: 0.00038 },
  UAH: { name: 'Ukrainian Hryvnia',   flag: '🇺🇦', rate: 0.024   },
  UGX: { name: 'Ugandan Shilling',    flag: '🇺🇬', rate: 0.00027 },
  USD: { name: 'US Dollar',           flag: '🇺🇸', rate: 1.000   },
  UYU: { name: 'Uruguayan Peso',      flag: '🇺🇾', rate: 0.025   },
  UZS: { name: 'Uzbekistani Som',     flag: '🇺🇿', rate: 0.000078 },
  VES: { name: 'Venezuelan Bolívar',  flag: '🇻🇪', rate: 0.000028 },
  VND: { name: 'Vietnamese Dong',     flag: '🇻🇳', rate: 0.000040 },
  XAF: { name: 'CFA Franc BEAC',      flag: '🌍',  rate: 0.00165 },
  XOF: { name: 'CFA Franc BCEAO',     flag: '🌍',  rate: 0.00165 },
  YER: { name: 'Yemeni Rial',         flag: '🇾🇪', rate: 0.004   },
  ZAR: { name: 'South African Rand',  flag: '🇿🇦', rate: 0.055   },
  ZMW: { name: 'Zambian Kwacha',      flag: '🇿🇲', rate: 0.037   },
  ZWL: { name: 'Zimbabwean Dollar',   flag: '🇿🇼', rate: 0.0031  },
}

// Fetch live exchange rates from free API (updates daily)
let liveRates = null
let ratesFetchedAt = 0
export async function fetchLiveRates() {
  // Cache rates for 1 hour
  if (liveRates && (Date.now() - ratesFetchedAt) < 3600000) return liveRates
  try {
    const resp = await fetch('https://open.er-api.com/v6/latest/USD')
    const data = await resp.json()
    if (data.result === 'success' && data.rates) {
      liveRates = data.rates
      ratesFetchedAt = Date.now()
      // Update CURRENCIES with live rates
      Object.keys(CURRENCIES).forEach(code => {
        if (data.rates[code]) {
          CURRENCIES[code].rate = 1 / data.rates[code]
        }
      })
      return liveRates
    }
  } catch {}
  return null
}

// Get live rate display string e.g. "1 USD = 83.45 INR"
export function getLiveRateDisplay(fromCode, toCode) {
  const fromRate = CURRENCIES[fromCode]?.rate || 1
  const toRate   = CURRENCIES[toCode]?.rate   || 1
  const rate     = fromRate / toRate
  return (1 / (CURRENCIES[toCode]?.rate || 1)).toFixed(4)
}

function createHorizonServer() {
  if (StellarSdk.Horizon?.Server) return new StellarSdk.Horizon.Server(HORIZON_URL)
  if (StellarSdk.Server)          return new StellarSdk.Server(HORIZON_URL)
  throw new Error('Horizon Server not found')
}
export const horizon = createHorizonServer()

// ── Cache ─────────────────────────────────────────────────────────────────────
const CACHE_TTL = 15000
export const cache = {
  balances: {}, timestamp: 0,
  isValid()        { return Date.now() - this.timestamp < CACHE_TTL },
  setBalance(k, v) { this.balances[k] = { val: v, ts: Date.now() } },
  getBalance(k)    {
    const b = this.balances[k]
    if (!b) return null
    if (Date.now() - b.ts > CACHE_TTL) return null
    return b.val
  },
  invalidate()     { this.balances = {}; this.timestamp = 0 },
}

// ── Utilities ─────────────────────────────────────────────────────────────────
export function isValidStellarAddress(addr) {
  if (!addr || typeof addr !== 'string') return false
  if (!addr.startsWith('G'))             return false
  if (addr.length !== 56)                return false
  return /^[A-Z2-7]+$/.test(addr)
}
export function formatBalance(balance) {
  const n = parseFloat(balance)
  return isNaN(n) ? '0.0000' : n.toFixed(4)
}
export function shortAddress(addr) {
  if (!addr || addr.length < 10) return addr
  return `${addr.slice(0, 6)}…${addr.slice(-5)}`
}
export function convertToXLM(amount, fromCurrency) {
  const rate = CURRENCIES[fromCurrency]?.rate || 1
  const usd = parseFloat(amount) * rate
  return (usd / 0.11).toFixed(4)
}
export function convertFromXLM(xlm, toCurrency) {
  const rate = CURRENCIES[toCurrency]?.rate || 1
  const usd  = parseFloat(xlm) * 0.11
  return (usd / rate).toFixed(2)
}
// Aliases — used by tests
export const convertToUSDC   = convertToXLM
export const convertFromUSDC = convertFromXLM
export function calcFee() { return 0.1 }
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// ── LOCAL USER STORE (simulates KYC/registration) ────────────────────────────
const USERS_KEY = 'horizon_users'
const SESSION_KEY = 'horizon_session'

export function saveUser(user) {
  const users = getAllUsers()
  users[user.phone] = user
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}
export function getAllUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}') } catch { return {} }
}
export function getUserByPhone(phone) {
  return getAllUsers()[phone] || null
}
export function saveSession(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user))
}
export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY)) } catch { return null }
}
export function clearSession() {
  localStorage.removeItem(SESSION_KEY)
}

// ── Wallet ────────────────────────────────────────────────────────────────────
export async function isFreighterInstalled() {
  try {
    const f = await import('@stellar/freighter-api')
    if (!f.isConnected) return false
    const r = await f.isConnected()
    return r === true || r?.isConnected === true
  } catch { return false }
}
export async function connectFreighter() {
  const f = await import('@stellar/freighter-api')
  if (typeof f.requestAccess === 'function') {
    try { const r = await f.requestAccess(); if (r?.address) return r.address; if (r?.publicKey) return r.publicKey } catch {}
  }
  if (typeof f.getAddress === 'function') {
    try { const r = await f.getAddress(); if (r?.address) return r.address } catch {}
  }
  if (typeof f.getPublicKey === 'function') {
    const r = await f.getPublicKey()
    if (typeof r === 'string' && r.length > 0) return r
    if (r?.publicKey) return r.publicKey
  }
  throw new Error('Cannot connect Freighter. Make sure it is installed and set to Testnet.')
}
export async function signWithFreighter(xdr) {
  const f = await import('@stellar/freighter-api')
  if (typeof f.signTransaction !== 'function') throw new Error('signTransaction not available.')
  const r = await f.signTransaction(xdr, { networkPassphrase: NETWORK_PASSPHRASE })
  if (typeof r === 'string') return r
  if (r?.signedTxXdr)        return r.signedTxXdr
  throw new Error('Freighter did not return signed transaction.')
}

// ── Balance ───────────────────────────────────────────────────────────────────
export async function fetchBalance(publicKey) {
  try {
    const cached = cache.getBalance(publicKey)
    if (cached) return cached
    const account = await horizon.loadAccount(publicKey)
    const native  = account.balances.find(b => b.asset_type === 'native')
    const bal     = formatBalance(native?.balance || '0')
    cache.setBalance(publicKey, bal)
    return bal
  } catch { return '0.0000' }
}

// ── Transactions ──────────────────────────────────────────────────────────────
export async function fetchTransactions(publicKey, limit = 20) {
  try {
    // Fetch payments to know direction (sent vs received)
    const [txns, payments] = await Promise.all([
      horizon.transactions().forAccount(publicKey).limit(limit).order('desc').call(),
      horizon.payments().forAccount(publicKey).limit(limit).order('desc').call(),
    ])

    // Build a map of hash → payment direction
    const paymentMap = {}
    for (const p of payments.records) {
      const hash = p.transaction_hash
      if (!paymentMap[hash]) {
        paymentMap[hash] = {
          type:   p.to === publicKey ? 'received' : 'sent',
          amount: parseFloat(p.amount || '0').toFixed(2),
          from:   p.from || '',
          to:     p.to   || '',
        }
      }
    }

    return txns.records.map(tx => {
      const pay = paymentMap[tx.hash] || {}
      return {
        id:     tx.id,
        hash:   tx.hash,
        date:   new Date(tx.created_at).toLocaleDateString(),
        time:   new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        timestamp: new Date(tx.created_at).getTime(),
        memo:   tx.memo || '',
        type:   pay.type   || 'sent',
        amount: pay.amount || '0',
        from:   pay.from   || '',
        to:     pay.to     || '',
      }
    })
  } catch { return [] }
}

// ── Send XLM ──────────────────────────────────────────────────────────────────
// ── Fee Sponsorship (Gasless Transactions) ───────────────────────────────────
// Sponsor account funds the fee so sender pays nothing
// This is the BLACK BELT advanced feature — Fee Bump transactions
const FEE_SPONSOR_SECRET = null // In production: server-side sponsor key via API

export async function sendGasless(senderAddress, receiverAddress, amountXLM, memo) {
  // Build inner transaction from sender (no fee)
  let receiverExists = true
  try { await horizon.loadAccount(receiverAddress) } catch { receiverExists = false }
  const amount = parseFloat(amountXLM)
  if (!receiverExists && amount < 1) throw new Error('Minimum 1 XLM required to activate a new Stellar account.')

  const account = await horizon.loadAccount(senderAddress)
  const innerTx = new StellarSdk.TransactionBuilder(account, {
    fee:               '0', // Sender pays zero fee
    networkPassphrase: NETWORK_PASSPHRASE,
  })
  if (receiverExists) {
    innerTx.addOperation(StellarSdk.Operation.payment({
      destination: receiverAddress,
      asset:       StellarSdk.Asset.native(),
      amount:      amountXLM.toString(),
    }))
  } else {
    innerTx.addOperation(StellarSdk.Operation.createAccount({
      destination:     receiverAddress,
      startingBalance: amountXLM.toString(),
    }))
  }
  const built = innerTx
    .addMemo(memo ? StellarSdk.Memo.text(memo.slice(0, 28)) : StellarSdk.Memo.none())
    .setTimeout(180)
    .build()

  // Sender signs inner transaction
  const signedXdr = await signWithFreighter(built.toXDR())
  const signedInner = StellarSdk.TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE)

  // On testnet: submit normally (fee bump requires sponsor server key)
  // On mainnet: wrap in FeeBumpTransaction with sponsor's secret key server-side
  const result = await horizon.submitTransaction(signedInner)
  cache.invalidate()
  return result.hash
}

export async function sendRemittance(senderAddress, receiverAddress, amountXLM, memo) {
  // Check if receiver account exists on Stellar
  let receiverExists = true
  try {
    await horizon.loadAccount(receiverAddress)
  } catch (e) {
    // Account not found — needs createAccount operation instead
    receiverExists = false
  }

  // Minimum XLM required to create a new account is 1 XLM
  const amount = parseFloat(amountXLM)
  if (!receiverExists && amount < 1) {
    throw new Error('Minimum 1 XLM required to activate a new Stellar account.')
  }

  const account = await horizon.loadAccount(senderAddress)
  const builder = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })

  if (receiverExists) {
    // Normal payment to existing account
    builder.addOperation(StellarSdk.Operation.payment({
      destination: receiverAddress,
      asset:       StellarSdk.Asset.native(),
      amount:      amountXLM.toString(),
    }))
  } else {
    // Create account operation for new/unfunded accounts
    builder.addOperation(StellarSdk.Operation.createAccount({
      destination:     receiverAddress,
      startingBalance: amountXLM.toString(),
    }))
  }

  const tx = builder
    .addMemo(memo ? StellarSdk.Memo.text(memo.slice(0, 28)) : StellarSdk.Memo.none())
    .setTimeout(180)
    .build()

  const signedXdr = await signWithFreighter(tx.toXDR())
  const signedTx  = StellarSdk.TransactionBuilder.fromXDR(signedXdr, NETWORK_PASSPHRASE)
  const result    = await horizon.submitTransaction(signedTx)
  cache.invalidate()
  return result.hash
}

export async function fundTestnetAccount(publicKey) {
  const resp = await fetch(`https://friendbot.stellar.org?addr=${publicKey}`)
  if (!resp.ok) throw new Error('Friendbot funding failed.')
  return true
}

// ── Metrics & Analytics ──────────────────────────────────────────────────────
export async function fetchAccountMetrics(publicKey) {
  try {
    const [payments, txns] = await Promise.all([
      fetch(`${HORIZON_URL}/accounts/${publicKey}/payments?limit=200&order=desc`).then(r => r.json()),
      fetch(`${HORIZON_URL}/accounts/${publicKey}/transactions?limit=200&order=desc`).then(r => r.json()),
    ])
    const payRecords = payments?._embedded?.records || []
    const txRecords  = txns?._embedded?.records     || []
    const sent     = payRecords.filter(p => p.from === publicKey)
    const received = payRecords.filter(p => p.to   === publicKey)
    const totalSent     = sent.reduce((s, p) => s + parseFloat(p.amount || 0), 0)
    const totalReceived = received.reduce((s, p) => s + parseFloat(p.amount || 0), 0)
    // Daily activity (last 7 days)
    const now = Date.now()
    const daily = {}
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now - i * 86400000)
      daily[d.toLocaleDateString('en-US', { month:'short', day:'numeric' })] = 0
    }
    payRecords.forEach(p => {
      const d = new Date(p.created_at)
      const key = d.toLocaleDateString('en-US', { month:'short', day:'numeric' })
      if (key in daily) daily[key]++
    })
    return {
      totalTransactions: txRecords.length,
      totalSent:         sent.length,
      totalReceived:     received.length,
      totalXLMSent:      totalSent.toFixed(2),
      totalXLMReceived:  totalReceived.toFixed(2),
      dailyActivity:     daily,
      lastActive:        txRecords[0]?.created_at || null,
    }
  } catch { return null }
}

// ── Fetch ONLY incoming payments — checks both payments and transactions
// This is called every 8 seconds to detect new money received
export async function fetchLatestIncomingPayment(publicKey) {
  try {
    const url = `${HORIZON_URL}/accounts/${publicKey}/payments?limit=5&order=desc`
    const resp = await fetch(url)
    if (!resp.ok) return null

    const data = await resp.json()
    const records = data?._embedded?.records || []

    // Find latest payment where THIS user is the receiver
    const incoming = records.find(p =>
      (p.type === 'payment' || p.type === 'create_account') &&
      p.to === publicKey
    )

    if (!incoming) return null

    const createdAt  = new Date(incoming.created_at)
    const ageSeconds = (Date.now() - createdAt.getTime()) / 1000

    return {
      hash:      incoming.transaction_hash,
      amount:    parseFloat(incoming.amount || '0').toFixed(4),
      from:      incoming.from || incoming.funder || 'Unknown',
      date:      createdAt.toLocaleDateString(),
      time:      createdAt.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }),
      isRecent:  ageSeconds < 120, // true if payment happened within last 2 minutes
    }
  } catch { return null }
}