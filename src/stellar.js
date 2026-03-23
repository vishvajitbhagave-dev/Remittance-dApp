// stellar.js — RemitChain Core
import * as StellarSdk from '@stellar/stellar-sdk'

export const NETWORK_PASSPHRASE = StellarSdk.Networks.TESTNET
export const HORIZON_URL        = 'https://horizon-testnet.stellar.org'
export const RPC_URL            = 'https://soroban-testnet.stellar.org'
export const CONTRACT_ID        = 'CDSVXG7VBBP2IASOP4V4ARRZNVPI2VHX5ARJEY7ZZD6K2WCGFAC54S4V'

export const CURRENCIES = {
  AED: { name: 'UAE Dirham',       symbol: 'AED', flag: '🇦🇪', rate: 0.272  },
  USD: { name: 'US Dollar',        symbol: 'USD', flag: '🇺🇸', rate: 1.000  },
  GBP: { name: 'British Pound',    symbol: 'GBP', flag: '🇬🇧', rate: 1.270  },
  EUR: { name: 'Euro',             symbol: 'EUR', flag: '🇪🇺', rate: 1.080  },
  INR: { name: 'Indian Rupee',     symbol: 'INR', flag: '🇮🇳', rate: 0.012  },
  PHP: { name: 'Philippine Peso',  symbol: 'PHP', flag: '🇵🇭', rate: 0.0174 },
  BDT: { name: 'Bangladeshi Taka', symbol: 'BDT', flag: '🇧🇩', rate: 0.0091 },
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
  // Convert to USD first, then XLM (1 XLM ≈ $0.11)
  const usd = parseFloat(amount) * rate
  return (usd / 0.11).toFixed(4)
}
export function convertFromXLM(xlm, toCurrency) {
  const rate = CURRENCIES[toCurrency]?.rate || 1
  const usd  = parseFloat(xlm) * 0.11
  return (usd / rate).toFixed(2)
}
export function calcFee() { return 0.1 }
export function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// ── LOCAL USER STORE (simulates KYC/registration) ────────────────────────────
const USERS_KEY = 'remitchain_users'
const SESSION_KEY = 'remitchain_session'

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
export async function fetchTransactions(publicKey, limit = 10) {
  try {
    const txns = await horizon.transactions().forAccount(publicKey).limit(limit).order('desc').call()
    return txns.records.map(tx => ({
      id:   tx.id,
      hash: tx.hash,
      date: new Date(tx.created_at).toLocaleDateString(),
      time: new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      memo: tx.memo || '',
    }))
  } catch { return [] }
}

// ── Send XLM ──────────────────────────────────────────────────────────────────
export async function sendRemittance(senderAddress, receiverAddress, amountXLM, memo) {
  const account = await horizon.loadAccount(senderAddress)
  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase: NETWORK_PASSPHRASE,
  })
    .addOperation(StellarSdk.Operation.payment({
      destination: receiverAddress,
      asset:       StellarSdk.Asset.native(),
      amount:      amountXLM.toString(),
    }))
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