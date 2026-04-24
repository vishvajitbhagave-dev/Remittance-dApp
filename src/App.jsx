// App.jsx — Horizon with Login, Signup, KYC, QR Code
import React, { useState, useEffect, useCallback } from 'react'
import {
  CURRENCIES,
  isFreighterInstalled, connectFreighter,
  fetchBalance, fetchTransactions, sendRemittance, fundTestnetAccount,
  isValidStellarAddress, shortAddress, convertToXLM, convertFromXLM,
  formatBalance, generateOTP, fetchLiveRates, fetchAccountMetrics, sendGasless,
  saveUser, getUserByPhone, saveSession, getSession, clearSession, cache,
  fetchLatestIncomingPayment,
} from './stellar.js'
import './App.css'
import { LANGUAGES, getT } from './translations.js'
import Icon from './icons.jsx'


// ── Country Phone Codes (All Countries — Alphabetical) ──────────────────────
const COUNTRY_CODES = [
  { code: '+93', country: 'AF', flag: '🇦🇫', name: 'Afghanistan', digits: 9 },
  { code: '+213', country: 'DZ', flag: '🇩🇿', name: 'Algeria', digits: 9 },
  { code: '+54', country: 'AR', flag: '🇦🇷', name: 'Argentina', digits: 10 },
  { code: '+61', country: 'AU', flag: '🇦🇺', name: 'Australia', digits: 9 },
  { code: '+43', country: 'AT', flag: '🇦🇹', name: 'Austria', digits: 10 },
  { code: '+973', country: 'BH', flag: '🇧🇭', name: 'Bahrain', digits: 8 },
  { code: '+880', country: 'BD', flag: '🇧🇩', name: 'Bangladesh', digits: 10 },
  { code: '+375', country: 'BY', flag: '🇧🇾', name: 'Belarus', digits: 9 },
  { code: '+32', country: 'BE', flag: '🇧🇪', name: 'Belgium', digits: 9 },
  { code: '+591', country: 'BO', flag: '🇧🇴', name: 'Bolivia', digits: 8 },
  { code: '+387', country: 'BA', flag: '🇧🇦', name: 'Bosnia', digits: 8 },
  { code: '+55', country: 'BR', flag: '🇧🇷', name: 'Brazil', digits: 11 },
  { code: '+673', country: 'BN', flag: '🇧🇳', name: 'Brunei', digits: 7 },
  { code: '+359', country: 'BG', flag: '🇧🇬', name: 'Bulgaria', digits: 9 },
  { code: '+855', country: 'KH', flag: '🇰🇭', name: 'Cambodia', digits: 9 },
  { code: '+1', country: 'CA', flag: '🇨🇦', name: 'Canada', digits: 10 },
  { code: '+56', country: 'CL', flag: '🇨🇱', name: 'Chile', digits: 9 },
  { code: '+86', country: 'CN', flag: '🇨🇳', name: 'China', digits: 11 },
  { code: '+57', country: 'CO', flag: '🇨🇴', name: 'Colombia', digits: 10 },
  { code: '+385', country: 'HR', flag: '🇭🇷', name: 'Croatia', digits: 9 },
  { code: '+420', country: 'CZ', flag: '🇨🇿', name: 'Czech Republic', digits: 9 },
  { code: '+45', country: 'DK', flag: '🇩🇰', name: 'Denmark', digits: 8 },
  { code: '+593', country: 'EC', flag: '🇪🇨', name: 'Ecuador', digits: 9 },
  { code: '+20', country: 'EG', flag: '🇪🇬', name: 'Egypt', digits: 10 },
  { code: '+372', country: 'EE', flag: '🇪🇪', name: 'Estonia', digits: 8 },
  { code: '+251', country: 'ET', flag: '🇪🇹', name: 'Ethiopia', digits: 9 },
  { code: '+679', country: 'FJ', flag: '🇫🇯', name: 'Fiji', digits: 7 },
  { code: '+358', country: 'FI', flag: '🇫🇮', name: 'Finland', digits: 9 },
  { code: '+33', country: 'FR', flag: '🇫🇷', name: 'France', digits: 9 },
  { code: '+49', country: 'DE', flag: '🇩🇪', name: 'Germany', digits: 10 },
  { code: '+233', country: 'GH', flag: '🇬🇭', name: 'Ghana', digits: 9 },
  { code: '+30', country: 'GR', flag: '🇬🇷', name: 'Greece', digits: 10 },
  { code: '+852', country: 'HK', flag: '🇭🇰', name: 'Hong Kong', digits: 8 },
  { code: '+36', country: 'HU', flag: '🇭🇺', name: 'Hungary', digits: 9 },
  { code: '+91', country: 'IN', flag: '🇮🇳', name: 'India', digits: 10 },
  { code: '+62', country: 'ID', flag: '🇮🇩', name: 'Indonesia', digits: 11 },
  { code: '+98', country: 'IR', flag: '🇮🇷', name: 'Iran', digits: 10 },
  { code: '+964', country: 'IQ', flag: '🇮🇶', name: 'Iraq', digits: 10 },
  { code: '+353', country: 'IE', flag: '🇮🇪', name: 'Ireland', digits: 9 },
  { code: '+972', country: 'IL', flag: '🇮🇱', name: 'Israel', digits: 9 },
  { code: '+39', country: 'IT', flag: '🇮🇹', name: 'Italy', digits: 10 },
  { code: '+81', country: 'JP', flag: '🇯🇵', name: 'Japan', digits: 10 },
  { code: '+962', country: 'JO', flag: '🇯🇴', name: 'Jordan', digits: 9 },
  { code: '+7', country: 'KZ', flag: '🇰🇿', name: 'Kazakhstan', digits: 10 },
  { code: '+254', country: 'KE', flag: '🇰🇪', name: 'Kenya', digits: 9 },
  { code: '+965', country: 'KW', flag: '🇰🇼', name: 'Kuwait', digits: 8 },
  { code: '+996', country: 'KG', flag: '🇰🇬', name: 'Kyrgyzstan', digits: 9 },
  { code: '+856', country: 'LA', flag: '🇱🇦', name: 'Laos', digits: 9 },
  { code: '+371', country: 'LV', flag: '🇱🇻', name: 'Latvia', digits: 8 },
  { code: '+961', country: 'LB', flag: '🇱🇧', name: 'Lebanon', digits: 8 },
  { code: '+218', country: 'LY', flag: '🇱🇾', name: 'Libya', digits: 9 },
  { code: '+370', country: 'LT', flag: '🇱🇹', name: 'Lithuania', digits: 8 },
  { code: '+853', country: 'MO', flag: '🇲🇴', name: 'Macau', digits: 8 },
  { code: '+60', country: 'MY', flag: '🇲🇾', name: 'Malaysia', digits: 9 },
  { code: '+52', country: 'MX', flag: '🇲🇽', name: 'Mexico', digits: 10 },
  { code: '+976', country: 'MN', flag: '🇲🇳', name: 'Mongolia', digits: 8 },
  { code: '+212', country: 'MA', flag: '🇲🇦', name: 'Morocco', digits: 9 },
  { code: '+95', country: 'MM', flag: '🇲🇲', name: 'Myanmar', digits: 9 },
  { code: '+977', country: 'NP', flag: '🇳🇵', name: 'Nepal', digits: 10 },
  { code: '+31', country: 'NL', flag: '🇳🇱', name: 'Netherlands', digits: 9 },
  { code: '+64', country: 'NZ', flag: '🇳🇿', name: 'New Zealand', digits: 9 },
  { code: '+234', country: 'NG', flag: '🇳🇬', name: 'Nigeria', digits: 10 },
  { code: '+47', country: 'NO', flag: '🇳🇴', name: 'Norway', digits: 8 },
  { code: '+968', country: 'OM', flag: '🇴🇲', name: 'Oman', digits: 8 },
  { code: '+92', country: 'PK', flag: '🇵🇰', name: 'Pakistan', digits: 10 },
  { code: '+595', country: 'PY', flag: '🇵🇾', name: 'Paraguay', digits: 9 },
  { code: '+51', country: 'PE', flag: '🇵🇪', name: 'Peru', digits: 9 },
  { code: '+63', country: 'PH', flag: '🇵🇭', name: 'Philippines', digits: 10 },
  { code: '+48', country: 'PL', flag: '🇵🇱', name: 'Poland', digits: 9 },
  { code: '+351', country: 'PT', flag: '🇵🇹', name: 'Portugal', digits: 9 },
  { code: '+974', country: 'QA', flag: '🇶🇦', name: 'Qatar', digits: 8 },
  { code: '+40', country: 'RO', flag: '🇷🇴', name: 'Romania', digits: 9 },
  { code: '+7', country: 'RU', flag: '🇷🇺', name: 'Russia', digits: 10 },
  { code: '+966', country: 'SA', flag: '🇸🇦', name: 'Saudi Arabia', digits: 9 },
  { code: '+381', country: 'RS', flag: '🇷🇸', name: 'Serbia', digits: 9 },
  { code: '+65', country: 'SG', flag: '🇸🇬', name: 'Singapore', digits: 8 },
  { code: '+421', country: 'SK', flag: '🇸🇰', name: 'Slovakia', digits: 9 },
  { code: '+386', country: 'SI', flag: '🇸🇮', name: 'Slovenia', digits: 8 },
  { code: '+27', country: 'ZA', flag: '🇿🇦', name: 'South Africa', digits: 9 },
  { code: '+82', country: 'KR', flag: '🇰🇷', name: 'South Korea', digits: 10 },
  { code: '+34', country: 'ES', flag: '🇪🇸', name: 'Spain', digits: 9 },
  { code: '+94', country: 'LK', flag: '🇱🇰', name: 'Sri Lanka', digits: 9 },
  { code: '+249', country: 'SD', flag: '🇸🇩', name: 'Sudan', digits: 9 },
  { code: '+46', country: 'SE', flag: '🇸🇪', name: 'Sweden', digits: 9 },
  { code: '+41', country: 'CH', flag: '🇨🇭', name: 'Switzerland', digits: 9 },
  { code: '+963', country: 'SY', flag: '🇸🇾', name: 'Syria', digits: 9 },
  { code: '+886', country: 'TW', flag: '🇹🇼', name: 'Taiwan', digits: 9 },
  { code: '+992', country: 'TJ', flag: '🇹🇯', name: 'Tajikistan', digits: 9 },
  { code: '+255', country: 'TZ', flag: '🇹🇿', name: 'Tanzania', digits: 9 },
  { code: '+66', country: 'TH', flag: '🇹🇭', name: 'Thailand', digits: 9 },
  { code: '+670', country: 'TL', flag: '🇹🇱', name: 'Timor-Leste', digits: 7 },
  { code: '+216', country: 'TN', flag: '🇹🇳', name: 'Tunisia', digits: 8 },
  { code: '+993', country: 'TM', flag: '🇹🇲', name: 'Turkmenistan', digits: 8 },
  { code: '+971', country: 'AE', flag: '🇦🇪', name: 'UAE', digits: 9 },
  { code: '+1', country: 'US', flag: '🇺🇸', name: 'USA', digits: 10 },
  { code: '+256', country: 'UG', flag: '🇺🇬', name: 'Uganda', digits: 9 },
  { code: '+380', country: 'UA', flag: '🇺🇦', name: 'Ukraine', digits: 9 },
  { code: '+44', country: 'GB', flag: '🇬🇧', name: 'United Kingdom', digits: 10 },
  { code: '+598', country: 'UY', flag: '🇺🇾', name: 'Uruguay', digits: 9 },
  { code: '+998', country: 'UZ', flag: '🇺🇿', name: 'Uzbekistan', digits: 9 },
  { code: '+58', country: 'VE', flag: '🇻🇪', name: 'Venezuela', digits: 10 },
  { code: '+84', country: 'VN', flag: '🇻🇳', name: 'Vietnam', digits: 10 },
  { code: '+967', country: 'YE', flag: '🇾🇪', name: 'Yemen', digits: 9 },
  { code: '+260', country: 'ZM', flag: '🇿🇲', name: 'Zambia', digits: 9 },
  { code: '+263', country: 'ZW', flag: '🇿🇼', name: 'Zimbabwe', digits: 9 },
]

// Phone input with country code selector + search
function PhoneInput({ countryCode, onCountryChange, phone, onPhoneChange, error }) {
  const [open, setOpen]     = React.useState(false)
  const [search, setSearch] = React.useState('')
  const selected = COUNTRY_CODES.find(c => c.code === countryCode && c.country === (COUNTRY_CODES.find(x => x.code === countryCode)?.country)) || COUNTRY_CODES[0]

  const filtered = search.trim()
    ? COUNTRY_CODES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.code.includes(search) ||
        c.country.toLowerCase().includes(search.toLowerCase())
      )
    : COUNTRY_CODES

  function selectCountry(c) {
    onCountryChange(c.code)
    setOpen(false)
    setSearch('')
    onPhoneChange('')
  }

  return (
    <div className="phone-wrap">
      <div className="phone-input-row">
        {/* Country code selector */}
        <div className="cc-selector" onClick={() => setOpen(!open)}>
          <span className="cc-flag">{selected.flag}</span>
          <span className="cc-code">{selected.code}</span>
          <span className="cc-arrow">{open ? '▲' : '▼'}</span>
        </div>
        {/* Phone number input */}
        <input
          className="phone-number-input"
          type="tel"
          placeholder={`${selected.digits} digit number`}
          value={phone}
          onChange={e => onPhoneChange(e.target.value.replace(/[^0-9]/g, ''))}
          maxLength={selected.digits}
        />
        {/* Digit counter */}
        <span className={`digit-counter ${phone.length === selected.digits ? 'valid' : phone.length > 0 ? 'counting' : ''}`}>
          {phone.length}/{selected.digits}
        </span>
      </div>

      {/* Dropdown with search */}
      {open && (
        <div className="cc-dropdown">
          <div className="cc-search-wrap">
            <input
              className="cc-search"
              placeholder="Search country or code..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              autoFocus
              onClick={e => e.stopPropagation()}
            />
          </div>
          <div className="cc-list">
            {filtered.length === 0 ? (
              <div className="cc-no-result">No country found</div>
            ) : filtered.map((c, i) => (
              <div key={i} className={`cc-option ${c.code === countryCode ? 'cc-selected' : ''}`}
                onClick={() => selectCountry(c)}>
                <span className="cc-flag">{c.flag}</span>
                <span className="cc-opt-name">{c.name}</span>
                <span className="cc-opt-code">{c.code}</span>
                <span className="cc-opt-digits">{c.digits} digits</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && <div className="phone-error">{error}</div>}
    </div>
  )
}

// ── Email OTP Functions ───────────────────────────────────────────────────────

// Local fallback — used on localhost where /api/ routes don't exist
function localGenerateToken(email) {
  const otp    = String(Math.floor(100000 + Math.random() * 900000))
  const expiry = Date.now() + 5 * 60 * 1000
  const token  = btoa(JSON.stringify({ email: email.toLowerCase(), otp, expiry, attempts: 0 }))
  return { success: true, testMode: true, token, otp }
}

function localCheckOTP(token, otp) {
  try {
    const data = JSON.parse(atob(token))
    if (Date.now() > data.expiry)
      return { success: false, error: 'OTP expired. Please request a new one.', expired: true }
    if (data.attempts >= 3)
      return { success: false, error: 'Max attempts exceeded. Request a new OTP.', maxAttempts: true }
    if (otp.trim() !== data.otp) {
      data.attempts += 1
      const newToken     = btoa(JSON.stringify(data))
      const attemptsLeft = 3 - data.attempts
      return {
        success: false,
        error:   'Incorrect OTP. ' + attemptsLeft + ' attempt' + (attemptsLeft === 1 ? '' : 's') + ' remaining.',
        token:   newToken,
        attemptsLeft,
      }
    }
    return { success: true }
  } catch {
    return { success: false, error: 'Invalid token. Please request a new OTP.' }
  }
}

// Step 1: Request OTP — tries Vercel API first, falls back to local on localhost
async function requestEmailOTP(email) {
  try {
    const resp = await fetch('/api/send-otp', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ email }),
    })
    // Read as text first — if empty or HTML, API does not exist (localhost)
    const text = await resp.text()
    if (!text || !text.trim().startsWith('{')) {
      return localGenerateToken(email)
    }
    const data = JSON.parse(text)
    // No alert — testOtp will be shown in UI
    if (data.testMode && data.message) {
      const parts = data.message.split('OTP: ')
      if (parts[1]) data.otp = parts[1].trim()
    }
    return data
  } catch {
    return localGenerateToken(email)
  }
}

// Step 2: Verify OTP — tries Vercel API first, falls back to local
async function verifyEmailOTP(token, otp, email) {
  try {
    const resp = await fetch('/api/verify-otp', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ token, otp, email }),
    })
    const text = await resp.text()
    if (!text || !text.trim().startsWith('{')) {
      return localCheckOTP(token, otp)
    }
    return JSON.parse(text)
  } catch {
    return localCheckOTP(token, otp)
  }
}


// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner({ size = 18, color = 'var(--accent)' }) {
  return <span style={{
    display:'inline-block', width:size, height:size,
    border:`2.5px solid rgba(0,0,0,0.1)`, borderTopColor:color,
    borderRadius:'50%', animation:'spin .7s linear infinite', flexShrink:0,
  }}/>
}

// ── QR Code SVG Generator ─────────────────────────────────────────────────────
function QRCode({ value, name, size = 240 }) {
  const [loaded, setLoaded] = React.useState(false)
  const [failed, setFailed] = React.useState(false)

  if (!value) return null

  // QR encodes plain Stellar address — works with any QR scanner and Horizon app scanner
  const qrData = value
  const qrUrl  = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(qrData)}&margin=15&ecc=M&format=png`

  return (
    <div style={{ display:'inline-block', background:'#fff', borderRadius:14, padding:10, boxShadow:'0 4px 24px rgba(0,0,0,0.12)' }}>
      {/* Loading */}
      {!loaded && !failed && (
        <div style={{ width:size, height:size, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:10 }}>
          <Spinner size={32} />
          <span style={{ fontSize:'0.75rem', color:'#999' }}>Generating QR...</span>
        </div>
      )}

      {/* Error */}
      {failed && (
        <div style={{ width:size, height:size, display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8, padding:'0 16px' }}>
          <Icon name='alert' size={32} color='#f59e0b'/>
          <span style={{ fontSize:'0.75rem', color:'#999', textAlign:'center' }}>No internet. Check connection.</span>
          <button style={{ fontSize:'0.72rem', color:'var(--accent)', background:'none', border:'none', cursor:'pointer', fontWeight:700 }}
            onClick={() => { setFailed(false); setLoaded(false) }}>
            Retry
          </button>
        </div>
      )}

      {/* QR Image — NO logo overlay so camera can scan it properly */}
      <img
        src={qrUrl}
        width={size}
        height={size}
        alt="Scan to send money"
        style={{ display: loaded ? 'block' : 'none', borderRadius:8 }}
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
      />
    </div>
  )
}


// ── Status Banner ─────────────────────────────────────────────────────────────
function Banner({ status, hash, msg, onDismiss }) {
  if (!status) return null
  const MAP = {
    pending:     { bg:'#fff3e0', border:'#ff9800', icon:<Spinner size={15} color="#ff9800"/>, text:'Processing transfer…' },
    confirming:  { bg:'#fffde7', border:'#ffc107', icon:<Spinner size={15} color="#ffc107"/>, text:'Confirming on Stellar…' },
    success:     { bg:'#e8f5e9', border:'#4caf50', icon:'✓', text:'Transfer successful!' },
    error:       { bg:'#ffebee', border:'#f44336', icon:'✕', text:msg||'Transfer failed.' },
    no_wallet:   { bg:'#fff8e1', border:'#ff9800', icon:'⚠', text:'Connect your wallet first.' },
    insufficient:{ bg:'#ffebee', border:'#f44336', icon:'⚠', text:'Insufficient XLM balance.' },
    rejected:    { bg:'#ffebee', border:'#f44336', icon:'✕', text:'Transaction rejected by user.' },
    invalid_addr:{ bg:'#ffebee', border:'#f44336', icon:'⚠', text:'Invalid receiver address.' },
  }
  const c = MAP[status] || MAP.error
  const canDismiss = !['pending','confirming'].includes(status)
  return (
    <div className="banner pop-in" style={{ background:c.bg, borderColor:c.border }}>
      <span style={{ color:c.border, fontSize:'1rem' }}>{c.icon}</span>
      <div style={{ flex:1 }}>
        <div style={{ color:c.border, fontWeight:700, fontSize:'0.88rem' }}>{c.text}</div>
        {status==='success' && hash && (
          <a className="banner-link" href={`https://stellar.expert/explorer/testnet/tx/${hash}`} target="_blank" rel="noreferrer">
            View on Stellar Explorer ↗
          </a>
        )}
      </div>
      {canDismiss && <button className="icon-btn" onClick={onDismiss}>✕</button>}
    </div>
  )
}


// ── PAN Card Validator ────────────────────────────────────────────────────────
const PAN_HOLDER_TYPES = {
  P:'Individual', C:'Company', H:'HUF', F:'Firm',
  T:'Trust', A:'AOP', B:'BOI', G:'Government', J:'Juridical Person', L:'Local Authority'
}

function validatePAN(pan) {
  const p = pan.toUpperCase().replace(/\s/g, '')
  const errors = []

  if (p.length === 0) return { valid:false, errors:[], info:null }

  // Check 1-3: Must be alphabets
  if (p.length >= 1 && !/^[A-Z]$/.test(p[0])) errors.push('Position 1 must be a letter (A-Z)')
  if (p.length >= 2 && !/^[A-Z]$/.test(p[1])) errors.push('Position 2 must be a letter (A-Z)')
  if (p.length >= 3 && !/^[A-Z]$/.test(p[2])) errors.push('Position 3 must be a letter (A-Z)')

  // Check 4: Holder type
  const holderTypes = Object.keys(PAN_HOLDER_TYPES)
  if (p.length >= 4) {
    if (!holderTypes.includes(p[3])) {
      errors.push(`Position 4 must be holder type: ${holderTypes.join(', ')}`)
    }
  }

  // Check 5: First letter of name (must be alphabet)
  if (p.length >= 5 && !/^[A-Z]$/.test(p[4])) errors.push('Position 5 must be first letter of your surname')

  // Check 6-9: Sequential numbers 0001-9999
  if (p.length >= 9) {
    const numPart = p.slice(5, 9)
    if (!/^[0-9]{4}$/.test(numPart)) errors.push('Positions 6-9 must be 4 digits (0001-9999)')
    else if (parseInt(numPart) === 0) errors.push('Positions 6-9 cannot be 0000')
  }

  // Check 10: Must be alphabet
  if (p.length >= 10 && !/^[A-Z]$/.test(p[9])) errors.push('Position 10 must be a letter (check digit)')

  const holderType = p.length >= 4 && holderTypes.includes(p[3]) ? PAN_HOLDER_TYPES[p[3]] : null
  const isComplete = p.length === 10
  const isValid    = isComplete && errors.length === 0

  return { valid:isValid, errors, holderType, isComplete }
}

function PANInput({ value, onChange, fullName }) {
  const pan = value.toUpperCase().replace(/\s/g, '')

  // Get first letters of first name and last name from fullName
  const nameParts     = (fullName || '').trim().toUpperCase().split(/\s+/).filter(Boolean)
  const validPos5     = nameParts.map(p => p[0]).filter(Boolean) // first letters of each word
  const pos5Char      = pan.length >= 5 ? pan[4] : null
  const pos5Valid     = pos5Char ? validPos5.includes(pos5Char) : true


  // Extend validatePAN to also check pos 5 against name
  const result        = validatePAN(pan)
  const nameError     = pan.length >= 5 && !pos5Valid
    ? `Position 5 must be the first letter of your name or surname.`
    : null
  const finalValid    = result.valid && !nameError
  const finalError    = nameError || (result.errors[0] || null)

  return (
    <div>
      {/* Input only — no format guide */}
      <div style={{ position:'relative' }}>
        <input
          className="auth-input pan-input"
          placeholder="e.g. RBCPB1234Z"
          value={value}
          maxLength={10}
          onChange={e => onChange(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0,10))}
          style={{ fontFamily:'var(--mono)', letterSpacing:'4px', fontSize:'1.1rem', fontWeight:700 }}
        />
        <span
          className={`digit-counter ${pan.length === 10 ? (finalValid ? 'valid' : 'invalid-count') : pan.length > 0 ? 'counting' : ''}`}
          style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)' }}>
          {pan.length}/10
        </span>
      </div>

      {/* Show error for pos 5 mismatch — no hint, just error if wrong */}
      {pan.length >= 5 && nameError && (
        <div className="phone-error">
          ⚠ Position 5 must match the first letter of your name or surname.
        </div>
      )}

      {/* Final result when all 10 chars entered */}
      {pan.length === 10 && (
        <div className={`pan-result ${finalValid ? 'pan-valid' : 'pan-invalid'}`}>
          {finalValid
            ? `Valid PAN — Holder: ${result.holderType}`
            : `❌ ${finalError}`
          }
        </div>
      )}
    </div>
  )
}

// ── SIGNUP PAGE ───────────────────────────────────────────────────────────────
function SignupPage({ onSignup, onGoLogin }) {
  const [step, setStep]         = useState(1) // 1=basic, 2=kyc, 3=wallet, 4=otp
  const [form, setForm]         = useState({ name:'', phone:'', country:'IN', idType:'aadhaar', idNumber:'', walletAddress:'' })
  const [countryCode, setCountryCode] = useState('+91')
  const [phoneError, setPhoneError]   = useState('')
  const [otp, setOtp]           = useState('')
  const [generatedOtp, setGeneratedOtp] = useState('')
  const [otpToken, setOtpToken]           = useState('')
  const [otpAttemptsLeft, setOtpAttemptsLeft] = useState(3)
  const [testOtp, setTestOtp]               = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [connecting, setConnecting] = useState(false)

  function update(k, v) { setForm(p => ({ ...p, [k]: v })); setError('') }

  function validateStep1() {
    if (!form.name.trim())  { setError('Full name is required.'); return false }
    if (!form.email?.trim() || !form.email.includes('@')) {
      setError('Please enter a valid email address.'); return false
    }
    if (!form.phone.trim()) { setPhoneError('Phone number is required.'); return false }
    const required = COUNTRY_CODES.find(c => c.code === countryCode)?.digits || 10
    const countryName = COUNTRY_CODES.find(c => c.code === countryCode)?.name || 'this country'
    if (form.phone.length < required) {
      setPhoneError(`Phone number must be exactly ${required} digits for ${countryName}.`)
      return false
    }
    if (form.phone.length > required) {
      setPhoneError(`Too many digits. ${countryName} numbers must be exactly ${required} digits.`)
      return false
    }
    const fullPhone = countryCode + form.phone.trim()
    // Check both with and without country code for backward compatibility
    if (getUserByPhone(fullPhone) || getUserByPhone(form.phone.trim())) {
      setPhoneError('This number is already registered. Please login instead.')
      return false
    }
    setPhoneError('')
    return true
  }
  function validateStep2() {
    if (!form.idNumber.trim()) { setError('ID number is required.'); return false }
    const idType  = ID_TYPES.find(t => t.code === form.idType)
    const cleaned = form.idNumber.replace(/\s/g, '')
    const required = idType?.digits || 6
    // Special PAN validation
    if (form.idType === 'pan') {
      const panResult = validatePAN(cleaned)
      if (!panResult.valid) {
        setError('Invalid PAN number. ' + (panResult.errors[0] || 'Please check the format.'))
        return false
      }
      // Check position 5 matches name/surname
      const nameParts  = form.name.trim().toUpperCase().split(/\s+/).filter(Boolean)
      const validPos5  = nameParts.map(p => p[0]).filter(Boolean)
      const pos5Char   = cleaned[4]
      if (validPos5.length > 0 && !validPos5.includes(pos5Char)) {
        setError(`Invalid PAN: Position 5 must be the first letter of your name or surname.`)
        return false
      }
      return true
    }
    if (cleaned.length < required) {
      setError(`${idType?.name} must be exactly ${required} digits/characters. You entered ${cleaned.length}.`)
      return false
    }
    if (cleaned.length > required) {
      setError(`${idType?.name} must be exactly ${required} digits/characters. You entered ${cleaned.length} — too many.`)
      return false
    }
    return true
  }

  async function connectWallet() {
    setError(''); setConnecting(true)
    try {
      const inst = await isFreighterInstalled()
      if (!inst) throw new Error('Freighter not found. Install from freighter.app')
      const addr = await connectFreighter()
      update('walletAddress', addr)
    } catch (e) {
      setError(e.message)
    } finally { setConnecting(false) }
  }

  async function sendOtp() {
    if (!form.email?.trim() || !form.email.includes('@')) {
      setError('Please enter a valid email address.'); return
    }
    setLoading(true); setError('')
    try {
      const result = await requestEmailOTP(form.email.trim())
      setOtpToken(result.token || '')
      setOtpAttemptsLeft(3)
      setTestOtp(result.testMode && result.otp ? result.otp : '')
      setStep(4)
    } catch(e) {
      setError(e.message || 'Failed to send OTP. Please try again.')
    } finally { setLoading(false) }
  }

  async function verifyAndSignup() {
    if (!otp.trim()) { setError('Please enter the OTP.'); return }
    setLoading(true); setError('')
    try {
      const result = await verifyEmailOTP(otpToken, otp.trim(), form.email.trim())
      if (result.success) {
        const user = {
          name:          form.name.trim(),
          phone:         countryCode + form.phone.trim(),
          email:         form.email.trim(),
          country:       form.country,
          idType:        form.idType,
          idNumber:      form.idNumber.trim(),
          walletAddress: form.walletAddress,
          kycVerified:   true,
          createdAt:     new Date().toISOString(),
        }
        saveUser(user)
        saveSession(user)
        onSignup(user)
      } else {
        if (result.token) setOtpToken(result.token)
        if (result.attemptsLeft !== undefined) setOtpAttemptsLeft(result.attemptsLeft)
        setError(result.error || 'Incorrect OTP.')
      }
    } catch(e) {
      setError('Verification failed. Please try again.')
    } finally { setLoading(false) }
  }


  const ID_TYPES = [
    { code:'aadhaar',   name:'Aadhaar Card',       digits:12, placeholder:'XXXX XXXX XXXX',     hint:'12 digit Aadhaar number' },
    { code:'passport',  name:'Passport',            digits:8,  placeholder:'A1234567',            hint:'8 character passport number' },
    { code:'national',  name:'National ID',         digits:10, placeholder:'XXXXXXXXXX',          hint:'10 digit national ID' },
    { code:'driving',   name:'Driving License',     digits:15, placeholder:'XX-XXXXXXXXXXXXX',   hint:'Up to 15 character license number' },
    { code:'pan',       name:'PAN Card',            digits:10, placeholder:'ABCDE1234F',          hint:'10 character PAN number' },
    { code:'voter',     name:'Voter ID',            digits:10, placeholder:'XXXXXXXXXX',          hint:'10 character voter ID' },
  ]
  const currentIdType = ID_TYPES.find(t => t.code === form.idType) || ID_TYPES[0]

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#1a56db"/>
            <path d="M8 16l6 6 10-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="10" r="3" fill="#38bdf8"/>
          </svg>
          Horizon
        </div>
        <div className="auth-title">Create Account</div>
        <div className="auth-subtitle">Join millions sending money home instantly</div>

        {/* Progress */}
        <div className="progress-steps">
          {['Basic Info', 'KYC', 'Wallet', 'Verify'].map((s, i) => (
            <div key={i} className={`prog-step ${step > i+1 ? 'done' : step === i+1 ? 'active' : ''}`}>
              <div className="prog-circle">{step > i+1 ? '✓' : i+1}</div>
              <div className="prog-label">{s}</div>
            </div>
          ))}
        </div>

        {error && <div className="auth-error">{error}</div>}

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="auth-form">
            <div className="field-group">
              <label>Full Name *</label>
              <input className="auth-input" placeholder="e.g. Vishvajit Bhagave"
                value={form.name} onChange={e => update('name', e.target.value)} />
            </div>
            <div className="field-group">
              <label>Phone Number *</label>
              <PhoneInput
                countryCode={countryCode}
                onCountryChange={c => {
                  setCountryCode(c)
                  setPhoneError('')
                  // Auto-fill country field from phone code selection
                  const found = COUNTRY_CODES.find(x => x.code === c)
                  if (found) update('country', found.country)
                }}
                phone={form.phone}
                onPhoneChange={v => {
                  update('phone', v)
                  setPhoneError('')
                  // Real-time duplicate check when digits are complete
                  const required = COUNTRY_CODES.find(c => c.code === countryCode)?.digits || 10
                  if (v.length === required) {
                    const full1 = countryCode + v
                    const full2 = v
                    if (getUserByPhone(full1) || getUserByPhone(full2)) {
                      setPhoneError('This number is already registered. Please login instead.')
                    }
                  }
                }}
                error={phoneError}
              />
            </div>
            <div className="field-group">
              <label>Email Address * <span className="id-hint">(OTP will be sent here)</span></label>
              <input
                className="auth-input"
                type="email"
                placeholder="yourname@gmail.com"
                value={form.email || ''}
                onChange={e => update('email', e.target.value.trim())}
              />
              {form.email && !form.email.includes('@') && (
                <div className="phone-error">Please enter a valid email address.</div>
              )}
            </div>
            <div className="field-group">
              <label>Country *</label>
              <div className="country-select-wrap">
                <select
                  className="auth-input"
                  value={form.country}
                  onChange={e => {
                    update('country', e.target.value)
                    // Also sync country code when country is manually changed
                    const found = COUNTRY_CODES.find(x => x.country === e.target.value)
                    if (found) { setCountryCode(found.code); setPhoneError('') }
                  }}
                >
                  {/* Sort alphabetically and deduplicate by country code */}
                  {Array.from(new Map(
                    COUNTRY_CODES
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(c => [c.country, c])
                  ).values()).map(c => (
                    <option key={c.country} value={c.country}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
                {form.country && (
                  <span className="country-auto-tag">
                    {COUNTRY_CODES.find(c => c.country === form.country)?.code}
                  </span>
                )}
              </div>
              {form.country && (
                <div className="country-hint">
                  ✓ Auto-filled from phone number selection
                </div>
              )}
            </div>
            <button className="auth-btn" onClick={() => { if (validateStep1()) setStep(2) }}>
              Continue →
            </button>
          </div>
        )}

        {/* Step 2: KYC */}
        {step === 2 && (
          <div className="auth-form">
            <div className="kyc-banner">
              🔐 KYC Verification Required<br/>
              <span>As per RBI & FEMA regulations, identity verification is mandatory for international transfers.</span>
            </div>
            <div className="field-group">
              <label>ID Type *</label>
              <select className="auth-input" value={form.idType} onChange={e => update('idType', e.target.value)}>
                {ID_TYPES.map(t => <option key={t.code} value={t.code}>{t.name}</option>)}
              </select>
            </div>
            <div className="field-group">
              <label>ID Number * <span className="id-hint">({currentIdType.hint})</span></label>

              {/* PAN Card uses special validator */}
              {form.idType === 'pan' ? (
                <PANInput
                  value={form.idNumber}
                  onChange={v => update('idNumber', v)}
                  fullName={form.name}
                />
              ) : (
                <div>
                  <div style={{ position:'relative' }}>
                    <input
                      className="auth-input"
                      placeholder={currentIdType.placeholder}
                      value={form.idNumber}
                      maxLength={currentIdType.digits + 4}
                      onChange={e => {
                        let val = e.target.value.toUpperCase()
                        if (form.idType === 'aadhaar') {
                          val = val.replace(/\D/g, '').slice(0, 12)
                          val = val.replace(/(\d{4})(\d{4})(\d{0,4})/, (_, a, b, c) => c ? `${a} ${b} ${c}` : b ? `${a} ${b}` : a)
                        }
                        update('idNumber', val)
                      }}
                    />
                    <span className={`digit-counter ${form.idNumber.replace(/\s/g,'').length === currentIdType.digits ? 'valid' : form.idNumber.length > 0 ? 'counting' : ''}`}
                      style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)' }}>
                      {form.idNumber.replace(/\s/g,'').length}/{currentIdType.digits}
                    </span>
                  </div>
                  {form.idType === 'aadhaar' && form.idNumber.replace(/\s/g,'').length > 0 && form.idNumber.replace(/\s/g,'').length < 12 && (
                    <div className="phone-error">Aadhaar number must be exactly 12 digits.</div>
                  )}
                  {form.idNumber.replace(/\s/g,'').length === currentIdType.digits && (
                    <div className="id-valid">✓ Valid {currentIdType.name} format</div>
                  )}
                </div>
              )}
            </div>
            <div className="kyc-note">
Your data is encrypted and stored securely<br/>Compliant with Stellar SEP-12 KYC protocol<br/>Never shared with third parties
            </div>
            <div className="btn-row">
              <button className="auth-btn-outline" onClick={() => setStep(1)}>← Back</button>
              <button className="auth-btn" onClick={() => { if (validateStep2()) setStep(3) }}>Continue →</button>
            </div>
          </div>
        )}

        {/* Step 3: Wallet */}
        {step === 3 && (
          <div className="auth-form">
            <div className="kyc-banner" style={{ background:'#e8f4fd', borderColor:'#2196f3', color:'#1565c0' }}>
              Connect Stellar Wallet
              <span>Your Stellar wallet is used to send and receive transfers on-chain.</span>
            </div>
            {form.walletAddress ? (
              <div className="wallet-connected-box">
                <div className="wcb-icon"><Icon name="check" size={16} color="var(--green)"/></div>
                <div>
                  <div className="wcb-title">Wallet Connected</div>
                  <div className="wcb-addr">{shortAddress(form.walletAddress)}</div>
                </div>
              </div>
            ) : (
              <button className="auth-btn wallet-connect-btn" onClick={connectWallet} disabled={connecting}>
{connecting ? <><Spinner size={16} color="#fff"/> Connecting…</> : 'Connect Freighter Wallet'}
              </button>
            )}
            <div className="kyc-note">
              Don't have Freighter? <a href="https://freighter.app" target="_blank" rel="noreferrer" style={{ color:'var(--accent)' }}>Install here ↗</a><br/>
              Need test XLM? <a href="https://laboratory.stellar.org/#account-creator?network=test" target="_blank" rel="noreferrer" style={{ color:'var(--accent)' }}>Use Friendbot ↗</a>
            </div>
            <div className="btn-row">
              <button className="auth-btn-outline" onClick={() => setStep(2)}>← Back</button>
              <button className="auth-btn" onClick={() => { if (!form.walletAddress) { setError('Please connect wallet first.'); return } sendOtp() }} disabled={!form.walletAddress}>
                Send OTP →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: OTP */}
        {step === 4 && (
          <div className="auth-form">
            <div className="otp-info">
              OTP sent to <strong>{form.email}</strong><br/>
              <span style={{ fontSize:'0.78rem', color:'var(--ink3)' }}>(Check the popup for testnet OTP)</span>
            </div>
            <div className="field-group">
              <label>Enter 6-digit OTP *</label>
              <input className="auth-input otp-input" placeholder="000000" maxLength={6}
                value={otp} onChange={e => setOtp(e.target.value)} />
            </div>
            <button className="auth-btn" onClick={verifyAndSignup} disabled={otp.length !== 6}>
              {otp.length === 6 ? 'Verify & Create Account ✓' : 'Enter 6-digit OTP'}
            </button>
            <div style={{ textAlign:'center', marginTop:10 }}>
              <button className="link-btn" onClick={sendOtp}>Resend OTP</button>
            </div>
          </div>
        )}

        <div className="auth-footer">
          Already have an account? <button className="link-btn" onClick={onGoLogin}>Login here</button>
        </div>
      </div>
    </div>
  )
}

// ── LOGIN PAGE ────────────────────────────────────────────────────────────────
function LoginPage({ onLogin, onGoSignup }) {
  const [phone, setPhone]       = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [countryCode, setCC]    = useState('+91')
  const [phoneError, setPhoneErr] = useState('')
  const [otp, setOtp]           = useState('')
  const [genOtp, setGenOtp]     = useState('')
  const [otpToken, setOtpToken]     = useState('')
  const [attemptsLeft, setAttemptsLeft] = useState(3)
  const [testOtp, setTestOtp]         = useState('')
  const [step, setStep]         = useState(1) // 1=phone, 2=otp
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function sendOtp() {
    setError(''); setPhoneErr('')
    if (!phone.trim()) { setPhoneErr('Please enter your phone number.'); return }
    const required = COUNTRY_CODES.find(c => c.code === countryCode)?.digits || 10
    if (phone.length < required) { setPhoneErr(`Must be ${required} digits.`); return }
    const fullPhone = countryCode + phone
    let user = getUserByPhone(fullPhone)
    if (!user) user = getUserByPhone(phone)
    if (!user) { setError('Phone number not registered. Please sign up.'); return }
    if (!loginEmail.trim() || !loginEmail.includes('@')) {
      setError('Please enter your registered email address.'); return
    }
    // Verify email matches account
    if (user.email && user.email.toLowerCase() !== loginEmail.trim().toLowerCase()) {
      setError('Email does not match your registered account.'); return
    }
    setLoading(true); setError('')
    try {
      const result = await requestEmailOTP(loginEmail.trim())
      setOtpToken(result.token || '')
      setAttemptsLeft(3)
      setTestOtp(result.testMode && result.otp ? result.otp : '')
      setStep(2)
    } catch(e) {
      setError(e.message || 'Failed to send OTP.')
    } finally { setLoading(false) }
  }

  async function verify() {
    if (!otp.trim()) { setError('Please enter the OTP.'); return }
    setLoading(true); setError('')
    try {
      const result = await verifyEmailOTP(otpToken, otp.trim(), loginEmail.trim())
      if (result.success) {
        let user = getUserByPhone(countryCode + phone.trim())
        if (!user) user = getUserByPhone(phone.trim())
        saveSession(user)
        onLogin(user)
      } else {
        if (result.token) setOtpToken(result.token)
        if (result.attemptsLeft !== undefined) setAttemptsLeft(result.attemptsLeft)
        setError(result.error || 'Incorrect OTP.')
      }
    } catch(e) {
      setError('Verification failed. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#1a56db"/>
            <path d="M8 16l6 6 10-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="24" cy="10" r="3" fill="#38bdf8"/>
          </svg>
          Horizon
        </div>
        <div className="auth-title">Welcome Back</div>
        <div className="auth-subtitle">Login to send money home instantly</div>

        {error && <div className="auth-error">{error}</div>}

        {step === 1 && (
          <div className="auth-form">
            <div className="field-group">
              <label>Phone Number</label>
              <PhoneInput
                countryCode={countryCode}
                onCountryChange={c => { setCC(c); setPhoneErr(''); setPhone('') }}
                phone={phone}
                onPhoneChange={v => { setPhone(v.replace(/[^0-9]/g, '')); setPhoneErr('') }}
                error={phoneError}
              />
            </div>
            <button className="auth-btn" onClick={sendOtp} disabled={!phone.trim()}>
              Send OTP →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="auth-form">
            <div className="otp-info">
              {testOtp ? (
                <>OTP sent in <strong>test mode</strong> — check the box below</>
              ) : (
                <>OTP sent to <strong>{loginEmail}</strong> — check your inbox</>
              )}
              {attemptsLeft < 3 && (
                <span style={{color:'var(--red)',display:'block',marginTop:4,fontSize:'0.8rem'}}>
                  {attemptsLeft} attempt{attemptsLeft===1?'':'s'} remaining
                </span>
              )}
            </div>
            <div className="field-group">
              <label>Enter 6-digit OTP</label>
              <input className="auth-input otp-input" placeholder="000000" maxLength={6}
                value={otp} onChange={e => { setOtp(e.target.value); setError('') }} />
            </div>
            <button className="auth-btn" onClick={verify} disabled={otp.length !== 6}>
              Login ✓
            </button>
            <div style={{ textAlign:'center', marginTop:10 }}>
              <button className="link-btn" onClick={() => setStep(1)}>← Change number</button>
            </div>
          </div>
        )}

        <div className="auth-footer">
          New to Horizon?
        </div>
        <button className="signup-big-btn" onClick={onGoSignup}>
          ✏️ Create New Account
        </button>
        <button className="clear-data-btn" onClick={() => {
          if (window.confirm('This will delete all saved accounts and data. Continue?')) {
            localStorage.clear()
            window.location.reload()
          }
        }}>
          🗑️ Clear all data (for testing)
        </button>
      </div>
    </div>
  )
}


// ── Transfer Receipt Modal ────────────────────────────────────────────────────
function ReceiptModal({ data, onClose }) {
  const receiptRef = React.useRef(null)
  const [saving, setSaving] = React.useState(false)
  const [saved, setSaved]   = React.useState(false)

  if (!data) return null

  // Save receipt as image using html2canvas from CDN
  async function handleSaveImage() {
    setSaving(true)
    try {
      // Load html2canvas from CDN
      await new Promise((resolve, reject) => {
        if (window.html2canvas) { resolve(); return }
        const script = document.createElement('script')
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
        script.onload  = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
      const canvas = await window.html2canvas(receiptRef.current, {
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        logging: false,
      })
      // Download the image
      const link = document.createElement('a')
      link.download = `Horizon-Receipt-${data.date.replace(/\s/g,'-')}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      alert('Could not save image. Please take a screenshot using Windows + Shift + S.')
    } finally {
      setSaving(false)
    }
  }

  // Share on WhatsApp
  function handleWhatsApp() {
    const text = `Horizon Transfer Receipt

Transfer Successful!

From: ${data.from}
To: ${data.to}
Amount: ${data.amount} ${data.fromCur} → ${parseFloat(data.localAmount).toLocaleString()} ${data.toCur}
On Stellar: ${data.xlmAmount} XLM
💳 *Fee:* 0.1 XLM (≈ ₹8)
📅 *Date:* ${data.date}
⏰ *Time:* ${data.time}${data.memo ? `
📝 *Memo:* ${data.memo}` : ''}

View Transaction:
https://stellar.expert/explorer/testnet/tx/${data.hash}

_Sent via Horizon · Stellar Testnet_`
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="overlay fade-in" onClick={onClose}>
      <div className="receipt-modal pop-in" onClick={e => e.stopPropagation()}>

        {/* ── Capture area starts here ── */}
        <div ref={receiptRef} style={{ background: '#fff' }}>

          {/* Header */}
          <div className="receipt-header">
            <div className="receipt-success-icon"><Icon name="check" size={24} color="white"/></div>
            <div className="receipt-title">Transfer Successful!</div>
            <div className="receipt-subtitle">Your money is on its way</div>
          </div>

          {/* Amount */}
          <div className="receipt-amount-box">
            <div className="receipt-sent">
              <span className="receipt-amt-label">You Sent</span>
              <span className="receipt-amt-val">{data.amount} {data.fromCur}</span>
            </div>
            <div className="receipt-arrow-down">↓</div>
            <div className="receipt-received">
              <span className="receipt-amt-label">They Receive</span>
              <span className="receipt-amt-val green">{parseFloat(data.localAmount).toLocaleString()} {data.toCur}</span>
            </div>
          </div>

          {/* Details */}
          <div className="receipt-details">
            {[
              ['From',        data.from],
              ['To',          data.to],
              ['On Stellar',  `${data.xlmAmount} XLM`],
              ['Fee',         '0.1 XLM (≈ ₹8)'],
              ['Date',        data.date],
              ['Time',        data.time],
              ['Memo',        data.memo || '—'],
              ['Transaction', `${data.hash?.slice(0,20)}...`],
            ].map(([label, value]) => (
              <div key={label} className="receipt-row">
                <span className="receipt-label">{label}</span>
                <span className="receipt-value">{value}</span>
              </div>
            ))}
          </div>

          {/* Powered by */}
          <div className="receipt-powered" style={{ padding: '12px 24px', background: '#f7f3ee', borderTop: '1px dashed #ddd5c8', textAlign: 'center', fontSize: '0.68rem', color: '#9a8f82', fontFamily: 'monospace' }}>
            Powered by Horizon · Stellar Testnet
          </div>

        </div>
        {/* ── Capture area ends here ── */}

        {/* Buttons — NOT captured in image */}
        <div className="receipt-footer">
          <div className="receipt-tip">
            💡 Save image → Send as photo on WhatsApp
          </div>
          <div className="receipt-btns">
            <button className="btn-outline r-btn" onClick={onClose}>
              ✕ Close
            </button>
            <button className="btn-outline r-btn" onClick={handleSaveImage} disabled={saving}>
              {saving ? 'Saving...' : saved ? 'Saved!' : <><Icon name='download' size={14}/> Save Image</>}
            </button>
            <button className="btn-primary whatsapp-btn r-btn" onClick={handleWhatsApp}>
              <Icon name='share' size={14}/> WhatsApp
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}


// ── QR Scanner using device camera ───────────────────────────────────────────
function QRScanner({ onScan, onClose }) {
  const videoRef  = React.useRef(null)
  const streamRef = React.useRef(null)
  const [error, setError]     = React.useState('')
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [])

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' } // Use back camera on phone
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.play()
        setLoading(false)
        scanQR()
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permission and try again.')
      setLoading(false)
    }
  }

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
  }

  async function scanQR() {
    // Load jsQR library from CDN
    if (!window.jsQR) {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js'
        script.onload  = resolve
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    const canvas  = document.createElement('canvas')
    const ctx     = canvas.getContext('2d')
    let running   = true

    const scan = () => {
      if (!running || !videoRef.current || videoRef.current.readyState !== 4) {
        if (running) requestAnimationFrame(scan)
        return
      }
      canvas.width  = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      ctx.drawImage(videoRef.current, 0, 0)
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = window.jsQR(imageData.data, imageData.width, imageData.height)
      if (code) {
        running = false
        stopCamera()

        const raw = code.data.trim()

        // Try 1 — Plain Stellar address (starts with G, 56 chars)
        if (raw.startsWith('G') && raw.length === 56) {
          onScan(raw, '')
          return
        }

        // Try 2 — JSON format {"address":"G...","name":"..."}
        try {
          const parsed = JSON.parse(raw)
          if (parsed.address && parsed.address.startsWith('G')) {
            onScan(parsed.address, parsed.name || '')
            return
          }
        } catch {}

        // Try 3 — URL format like localhost:5173/?to=G...&name=...
        try {
          // Handle both http:// and localhost: formats
          let urlStr = raw
          if (!urlStr.startsWith('http')) urlStr = 'http://' + urlStr
          const url    = new URL(urlStr)
          const toAddr = url.searchParams.get('to')
          const toName = url.searchParams.get('name')
          if (toAddr && toAddr.startsWith('G') && toAddr.length === 56) {
            onScan(toAddr, toName || '')
            return
          }
        } catch {}

        // Try 4 — web+stellar: or stellar: scheme
        if (raw.startsWith('web+stellar:') || raw.startsWith('stellar:')) {
          const addr = raw.split(':').pop().split('?')[0]
          if (addr.startsWith('G') && addr.length === 56) {
            onScan(addr, '')
            return
          }
        }

        // Nothing matched — show error and retry
        setError('Invalid QR code. Please scan the QR code from Horizon Receive page.')
        running = true
        startCamera()
        return
      }
      if (running) requestAnimationFrame(scan)
    }
    requestAnimationFrame(scan)

    return () => { running = false }
  }

  return (
    <div className="scanner-overlay fade-in">
      <div className="scanner-modal pop-in">
        <div className="scanner-header">
          <span className="scanner-title">Scan QR Code</span>
          <button className="icon-btn" onClick={onClose}>✕</button>
        </div>
        <div className="scanner-body">
          {loading && (
            <div className="scanner-loading">
              <Spinner size={32} />
              <p>Starting camera…</p>
            </div>
          )}
          {error ? (
            <div className="scanner-error">
              <Icon name="camera" size={32} color="rgba(255,255,255,0.6)"/>
              <p>{error}</p>
              <button className="btn-outline" onClick={onClose}>Go Back</button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                className="scanner-video"
                playsInline
                muted
                style={{ display: loading ? 'none' : 'block' }}
              />
              <div className="scanner-frame">
                <div className="sf-corner sf-tl" />
                <div className="sf-corner sf-tr" />
                <div className="sf-corner sf-bl" />
                <div className="sf-corner sf-br" />
                <div className="sf-line" />
              </div>
              {!loading && !error && (
                <p className="scanner-hint">Point camera at receiver's QR code</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MAIN APP (after login) ────────────────────────────────────────────────────
function MainApp({ user, onLogout, qrPayload, setQrPayload }) {
  const [page, setPage]           = useState('home')
  const [lang, setLang]           = useState(() => localStorage.getItem('rc_lang') || 'en')
  const t = getT(lang)
  const [balance, setBalance]     = useState('—')
  const [balLoading, setBalLoading] = useState(false)
  const [liveRates, setLiveRates]   = useState(null)
  const [ratesLoading, setRatesLoading] = useState(false)
  const [viewMoreRates, setViewMoreRates] = useState(false)
  const [rateSearch, setRateSearch]       = useState('')
  const [txns, setTxns]                 = useState([])
  const [txnsLoading, setTxnsLoading]   = useState(false)
  const [txSearch, setTxSearch]         = useState('')
  const [txFilter, setTxFilter]         = useState('all')   // all | sent | received
  const [txSort, setTxSort]             = useState('latest') // latest | oldest
  const [viewMore, setViewMore]         = useState(false)
  const [showDownload, setShowDownload] = useState(false)
  const [profilePic, setProfilePic]     = useState(() => { try { return localStorage.getItem('rc_pic_' + (user?.phone || '')) || null } catch { return null } })
  const [addrCopied, setAddrCopied]     = useState(false)
  const profilePicRef                   = React.useRef(null)
  const [dlYear, setDlYear]             = useState(new Date().getFullYear().toString())
  const [dlFormat, setDlFormat]         = useState('pdf')
  const [dlLoading, setDlLoading]       = useState(false)
  const [newTxCount, setNewTxCount]     = useState(0)
  const [incomingPayment, setIncoming]  = useState(null)
  const lastIncomingHashRef             = React.useRef(null)

  // Send form
  const [receiver, setReceiver]         = useState('')
  const [receiverName, setReceiverName] = useState('')
  const [amount, setAmount]             = useState('')
  const [fromCur, setFromCur]           = useState('AED')
  const [toCur, setToCur]               = useState('INR')
  const [memo, setMemo]                 = useState('')
  const [sending, setSending]           = useState(false)
  const [txStatus, setTxStatus]         = useState(null)
  const [txHash, setTxHash]             = useState(null)
  const [showReceipt, setShowReceipt]   = useState(false)
  const [gasless, setGasless]           = useState(false)
  const [metrics, setMetrics]           = useState(null)
  const [metricsLoading, setMetricsLoading] = useState(false)
  const [receiptData, setReceiptData]   = useState(null)
  const [txMsg, setTxMsg]               = useState('')
  const [sendMode, setSendMode]         = useState('options') // 'options' | 'search' | 'scanner' | 'manual'
  const [scanError, setScanError]       = useState('')
  const [scanning, setScanning]         = useState(false)
  const videoRef                        = React.useRef(null)
  const streamRef                       = React.useRef(null)
  const [searchQuery, setSearchQuery]   = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)

  // Search user by name or phone
  function handleSearch(q) {
    setSearchQuery(q)
    if (!q.trim()) { setSearchResults([]); return }
    setSearchLoading(true)
    try {
      // Search from locally registered users (key = horizon_users)
      const allUsers = JSON.parse(localStorage.getItem('horizon_users') || '{}')
      const results = Object.values(allUsers).filter(u =>
        u.walletAddress !== addr && (
          u.name?.toLowerCase().includes(q.toLowerCase()) ||
          u.phone?.includes(q)
        )
      )
      setSearchResults(results)
    } catch { setSearchResults([]) }
    finally { setSearchLoading(false) }
  }

  function selectContact(u) {
    setReceiver(u.walletAddress)
    setReceiverName(u.name)
    setSendMode('manual')
    setSearchQuery('')
    setSearchResults([])
  }

  function clearReceiver() {
    setReceiver('')
    setReceiverName('')
    setSendMode('options')
  }

  // QR
  const [showQR, setShowQR]       = useState(false)
  const [copied, setCopied]       = useState(false)

  const addr = user.walletAddress

  const loadBalance = useCallback(async () => {
    if (!addr) return
    setBalLoading(true)
    try { setBalance(await fetchBalance(addr)) }
    catch {} finally { setBalLoading(false) }
  }, [addr])

  const loadTxns = useCallback(async () => {
    if (!addr) return
    setTxnsLoading(true)
    try { setTxns(await fetchTransactions(addr, 10)) }
    catch {} finally { setTxnsLoading(false) }
  }, [addr])

  // Check ONLY for incoming payments every 8 seconds
  const checkIncomingPayments = useCallback(async () => {
    if (!addr) return
    try {
      const payment = await fetchLatestIncomingPayment(addr)
      if (!payment) return

      // First run
      if (lastIncomingHashRef.current === null) {
        lastIncomingHashRef.current = payment.hash
        // If payment happened within last 2 minutes — show notification
        // This handles case: Vishvajit sent → Mom logs in → sees notification
        if (payment.isRecent) {
          setNewTxCount(1)
          setIncoming(payment)
        }
        return
      }

      // Subsequent runs — new payment detected
      if (payment.hash !== lastIncomingHashRef.current) {
        lastIncomingHashRef.current = payment.hash
        setNewTxCount(prev => prev + 1)
        setIncoming(payment)
      }
    } catch {}
  }, [addr])

  useEffect(() => { loadBalance() }, [loadBalance])

  // Fetch live exchange rates on mount
  useEffect(() => {
    setRatesLoading(true)
    fetchLiveRates().then(rates => {
      if (rates) setLiveRates(rates)
      setRatesLoading(false)
    })
  }, [])

  // Auto-fill send form when user scanned a QR code
  useEffect(() => {
    if (qrPayload && user) {
      setReceiver(qrPayload.address)
      setReceiverName(qrPayload.name || shortAddress(qrPayload.address))
      setSendMode('manual')
      setPage('send')
      setQrPayload(null)
    }
  }, [qrPayload, user])
  useEffect(() => { const t = setInterval(loadBalance, 15000); return () => clearInterval(t) }, [loadBalance])

  // Check for incoming payments every 8 seconds (near real-time)
  useEffect(() => {
    if (!addr) return
    // Small delay on first run so Horizon has time to index the tx
    const init = setTimeout(() => {
      checkIncomingPayments()
    }, 3000)
    const t = setInterval(checkIncomingPayments, 8000)
    return () => { clearTimeout(init); clearInterval(t) }
  }, [addr, checkIncomingPayments])

  async function handleSend() {
    if (!addr)                         { setTxStatus('no_wallet'); return }
    if (!isValidStellarAddress(receiver)) { setTxStatus('invalid_addr'); return }
    if (!amount || parseFloat(amount) <= 0) return
    const xlm = convertToXLM(amount, fromCur)
    if (parseFloat(balance) < parseFloat(xlm) + 1) { setTxStatus('insufficient'); return }

    setSending(true); setTxStatus('pending'); setTxHash(null); setTxMsg('')
    try {
      setTxStatus('confirming')
      const hash = gasless
        ? await sendGasless(addr, receiver, xlm, memo || 'H:' + fromCur + '->' + toCur)
        : await sendRemittance(addr, receiver, xlm, memo || 'H:' + fromCur + '->' + toCur)
      setTxHash(hash); setTxStatus('success')
      // Save receipt data before clearing form
      setReceiptData({
        from:        user.name,
        to:          receiverName || shortAddress(receiver),
        toAddress:   receiver,
        amount:      amount,
        fromCur:     fromCur,
        toCur:       toCur,
        localAmount: convertFromXLM(convertToXLM(amount, fromCur), toCur),
        xlmAmount:   xlm,
        date:        new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' }),
        time:        new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }),
        hash:        hash,
        memo:        memo,
      })
      setShowReceipt(true)
      setAmount(''); setReceiver(''); setMemo('')
      setReceiverName(''); setSendMode('options')
      await loadBalance()
    } catch (e) {
      const m = (e.message || '').toLowerCase()
      // Give friendly error messages
      let friendlyMsg = e.message || 'Transfer failed.'
      if (m.includes('400'))          friendlyMsg = 'Transaction rejected. Check receiver address and try again.'
      if (m.includes('minimum'))      friendlyMsg = e.message
      if (m.includes('underfunded'))  friendlyMsg = 'Insufficient XLM balance to complete this transfer.'
      if (m.includes('not found'))    friendlyMsg = 'Receiver account not found. Make sure the address is correct.'
      if (m.includes('low reserve'))  friendlyMsg = 'Your balance is too low. Keep at least 2 XLM in your wallet.'
      setTxMsg(friendlyMsg)
      if (m.includes('rejected') || m.includes('denied') || m.includes('cancel')) setTxStatus('rejected')
      else setTxStatus('error')
    } finally { setSending(false) }
  }

  function copyAddress() {
    navigator.clipboard.writeText(addr)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function handleFund() {
    try {
      await fundTestnetAccount(addr)
      setTimeout(loadBalance, 3000)
      alert('Account funded! Balance will update in a few seconds.')
    } catch { alert('Funding failed. Try again.') }
  }

  const xlmAmount   = convertToXLM(amount || 0, fromCur)
  const localAmount = convertFromXLM(xlmAmount, toCur)

  return (
    <div className="app">
      <div className="app-bg" aria-hidden />

      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#1a56db"/>
              <path d="M8 16l6 6 10-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="10" r="3" fill="#38bdf8"/>
            </svg>
            <span className="logo-text">Horizon</span>
          </div>
          <span className="logo-tag">Testnet</span>
          {/* Language Selector */}
          <div className="lang-selector-wrap">
            <select
              className="lang-selector"
              value={lang}
              onChange={e => {
                setLang(e.target.value)
                localStorage.setItem('rc_lang', e.target.value)
              }}
            >
              {LANGUAGES.map(l => (
                <option key={l.code} value={l.code}>
                  {l.flag} {l.native}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="header-right">
          <div className="user-pill">
            <span className="user-avatar">{user.name[0].toUpperCase()}</span>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-kyc"><Icon name="shield" size={11} color="var(--green)"/> KYC Verified</span>
            </div>
            <div className="user-bal">
              {balLoading ? <Spinner size={12}/> : `${balance} XLM`}
            </div>
            <button className="pill-btn" onClick={handleFund} title="Fund Testnet"><Icon name="fund" size={14}/></button>
            <button className="pill-btn danger" onClick={onLogout} title="Logout"><Icon name="logout" size={14}/></button>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="nav">
        {[
          { id:'home',    icon:'home',    label:'Home'     },
          { id:'send',    icon:'send',    label:t.send    },
          { id:'receive', icon:'receive', label:t.receive },
          { id:'history', icon:'history', label:t.history },
          { id:'invite',  icon:'invite',  label:'Invite'  },
          { id:'metrics', icon:'chart',   label:'Metrics' },
          { id:'profile', icon:'profile', label:t.profile },
        ].map(n => (
          <button key={n.id} className={`nav-btn ${page===n.id?'nav-active':''}`}
            onClick={() => {
              setPage(n.id)
              if (n.id === 'history') {
                loadTxns()
                setNewTxCount(0)
                setIncoming(null)
              }
              if (n.id === 'metrics') {
                setMetricsLoading(true)
                fetchAccountMetrics(addr).then(m => { setMetrics(m); setMetricsLoading(false) })
              }
            }}>
            <span className="nav-icon-wrap">
              <span className="nav-icon"><Icon name={n.icon} size={20}/></span>
              {/* Show red badge on History when new transactions */}
              {n.id === 'history' && newTxCount > 0 && (
                <span className="notif-badge">{newTxCount}</span>
              )}
            </span>
            <span className="nav-label">{n.label}</span>
          </button>
        ))}
      </nav>

      <main className="main">
        <div className="content">

          {/* ── HOME / DASHBOARD ── */}
          {page === 'home' && (
            <div className="page fade-up">
              <div className="page-title">
                <h2>Welcome, {user.name.split(' ')[0]}</h2>
                <p>Your Horizon Dashboard</p>
              </div>

              {/* Balance Card */}
              <div className="card home-balance-card">
                <div className="home-bal-label">{t.balance}</div>
                <div className="home-bal-big">
                  {balLoading ? <Spinner size={28}/> : balance}
                  <span className="home-bal-unit">XLM</span>
                </div>
                <div className="home-bal-usd">≈ ${(parseFloat(balance||0) * 0.11).toFixed(2)} USD</div>
                <button className="btn-outline small" onClick={handleFund} style={{ marginTop:12 }}><Icon name="fund" size={14}/> Fund Testnet</button>
              </div>

              {/* Quick Actions */}
              <div className="home-actions">
                <button className="home-action-btn" onClick={() => setPage('send')}>
                  <span className="ha-icon"><Icon name="send" size={22} color="var(--accent)"/></span>
                  <span className="ha-label">{t.send}</span>
                </button>
                <button className="home-action-btn" onClick={() => setPage('receive')}>
                  <span className="ha-icon"><Icon name="receive" size={22} color="#0ea5e9"/></span>
                  <span className="ha-label">{t.receive}</span>
                </button>
                <button className="home-action-btn" onClick={() => { setPage('history'); loadTxns() }}>
                  <span className="ha-icon"><Icon name="history" size={22} color="#8b5cf6"/></span>
                  <span className="ha-label">{t.history}</span>
                </button>
                <button className="home-action-btn" onClick={() => setPage('profile')}>
                  <span className="ha-icon"><Icon name="profile" size={22} color="#10b981"/></span>
                  <span className="ha-label">{t.profile}</span>
                </button>
              </div>

              {/* Exchange Rates */}
              {/* Exchange Rates card with search + view more */}
              {(() => {
                const allCurrencies = Object.entries(CURRENCIES)
                  .sort((a,b) => a[1].name.localeCompare(b[1].name))
                const filtered = rateSearch.trim()
                  ? allCurrencies.filter(([c, v]) =>
                      c.toLowerCase().includes(rateSearch.toLowerCase()) ||
                      v.name.toLowerCase().includes(rateSearch.toLowerCase())
                    )
                  : allCurrencies
                const displayed = viewMoreRates ? filtered : filtered.slice(0, 5)
                return (
                  <div className="card fade-up">
                    <div className="card-label">
                      {t.exchange_rates}
                      {ratesLoading && <span style={{marginLeft:6,fontSize:'0.62rem',color:'var(--accent)'}}>Live</span>}
                      {!ratesLoading && liveRates && <span style={{marginLeft:6,fontSize:'0.62rem',color:'var(--green)'}}>● Live rates</span>}
                    </div>

                    {/* Search box */}
                    <div className="rates-search-wrap">
                      <Icon name='search' size={16} color='var(--ink3)'/>
                      <input
                        className="rates-search-input"
                        placeholder="Search currency..."
                        value={rateSearch}
                        onChange={e => { setRateSearch(e.target.value); setViewMoreRates(true) }}
                      />
                      {rateSearch && (
                        <button className="tx-search-clear" onClick={() => { setRateSearch(''); setViewMoreRates(false) }}>✕</button>
                      )}
                    </div>

                    {/* Rates list */}
                    <div className="rates-list">
                      {displayed.length === 0 ? (
                        <div style={{fontSize:'0.8rem',color:'var(--ink3)',textAlign:'center',padding:'12px'}}>No currency found</div>
                      ) : displayed.map(([c, v]) => {
                        const rate = liveRates ? (liveRates[c] ?? (1/v.rate)) : (1/v.rate)
                        return (
                          <div key={c} className="rate-list-row">
                            <span className="rate-flag">{v.flag}</span>
                            <div className="rate-list-info">
                              <span className="rate-code">{c}</span>
                              <span className="rate-list-name">{v.name}</span>
                            </div>
                            <span className="rate-list-val">
                              1 USD = {typeof rate === 'number' ? rate.toFixed(4) : rate}
                            </span>
                          </div>
                        )
                      })}
                    </div>

                    {/* View More / Less */}
                    {!rateSearch && filtered.length > 5 && (
                      <button className="view-more-btn" onClick={() => setViewMoreRates(!viewMoreRates)}>
                        {viewMoreRates
                          ? 'View Less'
                          : 'View More (' + (filtered.length - 5) + ' currencies)'}
                      </button>
                    )}
                  </div>
                )
              })()}

            </div>
          )}

          {/* ── SEND ── */}
          {page === 'send' && (
            <div className="page fade-up">
              <div className="page-title"><h2>{t.send_money}</h2><p>{t.send_subtitle}</p></div>
              <div className="card">

                {/* ── RECEIVER SELECTION ── */}
                {sendMode === 'options' && (
                  <div className="field-group">
                    <label className="field-label">Send To</label>
                    <div className="send-options">
                      {/* Option 1 — Search by name or phone */}
                      <button className="send-opt-btn" onClick={() => setSendMode('search')}>
                        <span className="send-opt-icon"><Icon name="contacts" size={20} color="var(--accent)"/></span>
                        <div className="send-opt-text">
                          <span className="send-opt-title">Search Contact</span>
                          <span className="send-opt-sub">Find by name or phone number</span>
                        </div>
                        <span className="send-opt-arrow">→</span>
                      </button>

                      {/* Option 2 — Scan QR Code */}
                      <button className="send-opt-btn send-opt-scanner" onClick={() => setSendMode('scanner')}>
                        <span className="send-opt-icon"><Icon name="scan" size={20} color="#0ea5e9"/></span>
                        <div className="send-opt-text">
                          <span className="send-opt-title">Scan QR Code</span>
                          <span className="send-opt-sub">Point camera at receiver's QR</span>
                        </div>
                        <span className="send-opt-arrow">→</span>
                      </button>

                      {/* Option 3 — Paste wallet address (advanced) */}
                      <button className="send-opt-btn send-opt-secondary" onClick={() => setSendMode('manual')}>
                        <span className="send-opt-icon"><Icon name="paste" size={20} color="#8b5cf6"/></span>
                        <div className="send-opt-text">
                          <span className="send-opt-title">Paste Wallet Address</span>
                          <span className="send-opt-sub">For advanced users only</span>
                        </div>
                        <span className="send-opt-arrow">→</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* ── SCANNER MODE ── */}
                {sendMode === 'scanner' && (
                  <QRScanner
                    onScan={(address, name) => {
                      setReceiver(address)
                      setReceiverName(name || shortAddress(address))
                      setSendMode('manual')
                      setScanError('')
                    }}
                    onClose={() => setSendMode('options')}
                  />
                )}

                {/* ── SEARCH MODE ── */}
                {sendMode === 'search' && (
                  <div className="field-group">
                    <div className="search-header">
                      <label className="field-label">Search Contact</label>
                      <button className="back-btn" onClick={() => { setSendMode('options'); setSearchQuery(''); setSearchResults([]) }}>← Back</button>
                    </div>
                    <input
                      className="field-input"
                      placeholder="Type name or phone number..."
                      value={searchQuery}
                      onChange={e => handleSearch(e.target.value)}
                      autoFocus
                    />
                    {searchLoading && <div className="search-loading"><Spinner size={14}/> Searching...</div>}
                    {searchResults.length > 0 && (
                      <div className="search-results">
                        {searchResults.map((u, i) => (
                          <button key={i} className="contact-row" onClick={() => selectContact(u)}>
                            <div className="contact-avatar">{u.name[0].toUpperCase()}</div>
                            <div className="contact-info">
                              <span className="contact-name">{u.name}</span>
                              <span className="contact-phone">{u.phone}</span>
                            </div>
                            <span className="contact-select">Select →</span>
                          </button>
                        ))}
                      </div>
                    )}
                    {searchQuery && !searchLoading && searchResults.length === 0 && (
                      <div className="search-empty">
                        No user found. Ask them to join Horizon first.
                      </div>
                    )}
                  </div>
                )}

                {/* ── MANUAL / SELECTED ── */}
                {sendMode === 'manual' && (
                  <div className="field-group">
                    <div className="search-header">
                      <label className="field-label">
                        {receiverName ? `Sending to: ${receiverName}` : 'Receiver Wallet Address'}
                      </label>
                      <button className="back-btn" onClick={clearReceiver}>← Change</button>
                    </div>
                    {receiverName ? (
                      <div className="selected-contact">
                        <div className="contact-avatar large">{receiverName[0].toUpperCase()}</div>
                        <div className="contact-info">
                          <span className="contact-name">{receiverName}</span>
                          <span className="contact-addr">{receiver.slice(0,10)}...{receiver.slice(-8)}</span>
                        </div>
                        <span style={{ color:'var(--green)', fontWeight:700 }}>✓ Selected</span>
                      </div>
                    ) : (
                      <div style={{ position:'relative' }}>
                        <input className="field-input" placeholder="GXXXX... (Stellar address)"
                          value={receiver} onChange={e => setReceiver(e.target.value)} />
                        {receiver && (
                          <span style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', fontWeight:700, color: isValidStellarAddress(receiver) ? 'var(--green)' : 'var(--red)' }}>
                            {isValidStellarAddress(receiver) ? '✓' : '✕'}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* ── AMOUNT ── (always shown after receiver selected) */}
                {(sendMode === 'manual' && (receiver || receiverName)) && (
                  <>
                    <div className="converter">
                      <div className="conv-row">
                        <div className="conv-side">
                          <div className="conv-label">You Send</div>
                          <div className="conv-inputs">
                            <input className="conv-amount" type="number" placeholder="0.00" min="0"
                              value={amount} onChange={e => setAmount(e.target.value)} />
                            <div className="conv-cur-wrap">
                              <span className="conv-flag">{CURRENCIES[fromCur]?.flag}</span>
                            <select className="conv-cur conv-cur-inner" value={fromCur} onChange={e => setFromCur(e.target.value)}>
                              {Object.entries(CURRENCIES)
                                .sort((a,b) => a[1].name.localeCompare(b[1].name))
                                .map(([c, v]) => <option key={c} value={c}>{v.flag} {c}</option>)}
                            </select>
                            </div>
                          </div>
                        </div>
                        <div className="conv-mid">
                          <div className="conv-arrow">⇄</div>
                          <div className="conv-fee">Fee: ₹8</div>
                        </div>
                        <div className="conv-side">
                          <div className="conv-label">They Receive</div>
                          <div className="conv-inputs">
                            <div className="conv-result">{parseFloat(localAmount).toLocaleString()}</div>
                            <div className="conv-cur-wrap">
                              <span className="conv-flag">{CURRENCIES[toCur]?.flag}</span>
                            <select className="conv-cur conv-cur-inner" value={toCur} onChange={e => setToCur(e.target.value)}>
                              {Object.entries(CURRENCIES)
                                .sort((a,b) => a[1].name.localeCompare(b[1].name))
                                .map(([c, v]) => <option key={c} value={c}>{v.flag} {c}</option>)}
                            </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="conv-info">≈ {xlmAmount} XLM on Stellar · 1 XLM ≈ $0.11</div>
                    </div>

                    <div className="field-group">
                      <label className="field-label">Note (optional)</label>
                      <input className="field-input" placeholder="e.g. Monthly allowance"
                        value={memo} onChange={e => setMemo(e.target.value)} maxLength={28} />
                    </div>

                    <div className="summary">
                      {[
                        ['You send', `${amount||'0'} ${fromCur}`],
                        ['On Stellar', `${xlmAmount} XLM`],
                        ['Fee', '0.1 XLM (≈ ₹8)'],
                        ['They receive', `${parseFloat(localAmount).toLocaleString()} ${toCur}`],
                      ].map(([k, v], i) => (
                        <div key={i} className={`summary-row ${i===3?'summary-total':''}`}>
                          <span>{k}</span><span>{v}</span>
                        </div>
                      ))}
                    </div>

                    <button className="btn-primary full" onClick={handleSend}
                      disabled={!receiver || !amount || sending || !isValidStellarAddress(receiver)}>
                      {sending ? <><Spinner size={16} color="#fff"/> Sending…</> : `Send ${amount||'0'} ${fromCur} →`}
                    </button>

                    <Banner status={txStatus} hash={txHash} msg={txMsg} onDismiss={() => setTxStatus(null)} />
                  </>
                )}

              </div>
            </div>
          )}

          {/* ── RECEIVE ── */}
          {page === 'receive' && (
            <div className="page fade-up">
              <div className="page-title"><h2>{t.receive_money}</h2><p>{t.receive_subtitle}</p></div>
              <div className="card">
                <div className="qr-section">
                  <div className="qr-wrapper">
                    <QRCode value={addr} name={user.name} size={240}/>
                  </div>
                  <div className="qr-name">{user.name}</div>
                  <div className="qr-addr-row">
                    <div className="qr-addr-full">{addr}</div>
                    <button className="addr-copy-icon" title="Copy address" onClick={() => {
                      navigator.clipboard.writeText(addr)
                      setCopied(true)
                      setTimeout(() => setCopied(false), 2000)
                    }}>
                      {copied ? <Icon name='check' size={14} color='var(--green)'/> : <Icon name='copy' size={14}/>}
                    </button>
                  </div>
                  {/* 4 action buttons */}
                  <div className="qr-action-btns">

                    {/* 1. Download QR */}
                    <button className="qr-action-btn" onClick={async () => {
                      try {
                        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(addr)}&margin=20&ecc=M&format=png`
                        const resp  = await fetch(qrUrl)
                        const blob  = await resp.blob()
                        const link  = document.createElement('a')
                        link.href   = URL.createObjectURL(blob)
                        link.download = `Horizon-QR-${user.name.replace(/\s/g,'-')}.png`
                        link.click()
                        URL.revokeObjectURL(link.href)
                      } catch {
                        alert('Download failed. Please take a screenshot instead.')
                      }
                    }}>
                      <span className="qab-icon"><Icon name="download" size={20} color="var(--accent)"/></span>
                      <span className="qab-label">Download QR</span>
                    </button>

                    {/* 2. Share QR */}
                    <button className="qr-action-btn" onClick={async () => {
                      const shareText = `Send me money on Horizon!

Name: ${user.name}
Wallet: ${addr}

Open Horizon → Send → Paste wallet address`
                      if (navigator.share) {
                        try {
                          // Try sharing QR image
                          const qrUrl  = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(addr)}&margin=20&format=png`
                          const resp   = await fetch(qrUrl)
                          const blob   = await resp.blob()
                          const file   = new File([blob], 'Horizon-QR.png', { type: 'image/png' })
                          await navigator.share({ title: 'My Horizon QR Code', text: shareText, files: [file] })
                        } catch {
                          // Fallback to text share if image fails
                          try { await navigator.share({ title: 'My Horizon QR', text: shareText }) }
                          catch {}
                        }
                      } else {
                        // Desktop: copy share text to clipboard
                        navigator.clipboard.writeText(shareText)
                        alert('Share text copied! Paste it on WhatsApp or any app.')
                      }
                    }}>
                      <span className="qab-icon"><Icon name="share" size={20} color="#0ea5e9"/></span>
                      <span className="qab-label">Share QR</span>
                    </button>

                    {/* 3. Show QR Info */}
                    <button className="qr-action-btn" onClick={() => setShowQR(!showQR)}>
                      <span className="qab-icon"><Icon name={showQR ? "chevronUp" : "chevronDown"} size={20} color="#8b5cf6"/></span>
                      <span className="qab-label">{showQR ? 'Hide Info' : 'QR Info'}</span>
                    </button>

                  </div>

                  {/* QR Info expanded */}
                  {showQR && (
                    <div className="qr-info-box fade-in">
                      <div className="qr-info-row"><span>Name</span><span>{user.name}</span></div>
                      <div className="qr-info-row"><span>Network</span><span>Stellar Testnet</span></div>
                      <div className="qr-info-row"><span>Address</span><span style={{ fontSize:'0.7rem', wordBreak:'break-all' }}>{addr}</span></div>
                      <div className="qr-info-row"><span>KYC</span><span style={{ color:'var(--green)',display:'flex',alignItems:'center',gap:4 }}><Icon name="verified" size={13} color="var(--green)"/> Verified</span></div>
                    </div>
                  )}
                </div>
                <div className="receive-steps">
                  <div className="rs-title">How to receive money:</div>
                  {['Share your QR code screenshot with the sender','Sender scans QR or pastes your address','Money arrives in 5–10 seconds','Balance updates automatically'].map((s,i) => (
                    <div key={i} className="rs-row"><span className="rs-num">{i+1}</span><span>{s}</span></div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── HISTORY ── */}
          {page === 'history' && (() => {
            // Apply search + filter + sort
            const filtered = txns
              .filter(tx => {
                const q = txSearch.toLowerCase()
                const matchSearch = !q ||
                  tx.hash?.toLowerCase().includes(q) ||
                  tx.memo?.toLowerCase().includes(q) ||
                  tx.date?.toLowerCase().includes(q) ||
                  tx.amount?.toString().includes(q)
                const matchFilter =
                  txFilter === 'all' ? true :
                  txFilter === 'sent' ? tx.type === 'sent' :
                  tx.type === 'received'
                return matchSearch && matchFilter
              })
              .sort((a, b) =>
                txSort === 'latest'
                  ? (b.timestamp || 0) - (a.timestamp || 0)
                  : (a.timestamp || 0) - (b.timestamp || 0)
              )

            const displayed = viewMore ? filtered : filtered.slice(0, 5)

            return (
              <div className="page fade-up">

                {/* Title row with Download History button */}
                <div className="tx-title-row">
                  <div>
                    <h2 style={{ fontSize:'1.3rem', fontWeight:800, color:'var(--ink)' }}>{t.tx_history}</h2>
                    <p style={{ fontSize:'0.82rem', color:'var(--ink3)', marginTop:2 }}>{t.tx_subtitle}</p>
                  </div>
                  <div className="dl-btn-wrap" style={{ position:'relative' }}>
                    <button className="btn-outline dl-history-btn" onClick={() => setShowDownload(!showDownload)}>
                      Download History
                    </button>
                    {showDownload && (
                      <>
                        <div className="dl-backdrop" onClick={() => setShowDownload(false)} />
                        <div className="dl-modal-popup pop-in">

                          <div className="dl-popup-head">
                            <span className="dl-popup-title">⬇️ Download History</span>
                            <button className="icon-btn" onClick={() => setShowDownload(false)}>✕</button>
                          </div>
                          <p className="dl-modal-subtitle">Get transfer dates and amounts.</p>

                          <div className="dl-field">
                            <label className="dl-label">Select year</label>
                            <select className="dl-select" value={dlYear} onChange={e => setDlYear(e.target.value)}>
                              {[2026, 2025, 2024].map(y => (
                                <option key={y} value={y}>{y}</option>
                              ))}
                            </select>
                          </div>

                          <div className="dl-field">
                            <label className="dl-label">File format</label>
                            <div className="dl-formats">
                              {[
                                { val:'pdf', label:'PDF', desc:'Portable Document Format' },
                                { val:'csv', label:'CSV', desc:'Comma-Separated Values' },
                              ].map(f => (
                                <div key={f.val}
                                  className={"dl-format-opt " + (dlFormat === f.val ? 'dl-format-active' : '')}
                                  onClick={() => setDlFormat(f.val)}
                                >
                                  <div className={"dl-radio " + (dlFormat === f.val ? 'dl-radio-active' : '')}/>
                                  <div>
                                    <div className="dl-format-name">{f.label}</div>
                                    <div className="dl-format-desc">{f.desc}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <button className="dl-download-btn" disabled={dlLoading}
                            onClick={() => {
                              setDlLoading(true)
                              const yearTxns = txns.filter(tx => tx.date?.includes(dlYear))
                              if (dlFormat === 'csv') {
                                const rows = [
                                  ['Date','Time','Type','Amount (XLM)','Memo','Transaction Hash'],
                                  ...yearTxns.map(tx => [
                                    tx.date, tx.time,
                                    tx.type === 'received' ? 'Received' : 'Sent',
                                    (tx.type === 'received' ? '+' : '-') + tx.amount,
                                    tx.memo || '',
                                    tx.hash,
                                  ])
                                ]
                                const csv  = rows.map(r => r.join(',')).join('\n')
                                const blob = new Blob([csv], { type: 'text/csv' })
                                const link = document.createElement('a')
                                link.href     = URL.createObjectURL(blob)
                                link.download = 'Horizon-History-' + dlYear + '.csv'
                                link.click()
                                setDlLoading(false)
                                setShowDownload(false)
                              } else {
                                const rows = yearTxns.map(tx =>
                                  '<tr><td>' + tx.date + '</td><td>' + tx.time + '</td>' +
                                  '<td style="color:' + (tx.type==='received'?'#2d6a4f':'#e85d04') + '">' + (tx.type==='received'?'Received':'Sent') + '</td>' +
                                  '<td style="font-weight:700">' + (tx.type==='received'?'+':'-') + tx.amount + ' XLM</td>' +
                                  '<td>' + (tx.memo||'—') + '</td>' +
                                  '<td style="font-size:10px">' + (tx.hash?.slice(0,20)||'') + '...</td></tr>'
                                ).join('')
                                const html = '<html><head><title>Horizon History ' + dlYear + '</title>' +
                                  '<style>body{font-family:Arial,sans-serif;padding:30px}h1{color:#e85d04}table{width:100%;border-collapse:collapse;margin-top:20px}th{background:#e85d04;color:#fff;padding:10px 8px;text-align:left;font-size:12px}td{padding:8px;border-bottom:1px solid #eee;font-size:12px}tr:nth-child(even){background:#f9f9f9}.footer{margin-top:30px;font-size:11px;color:#999;text-align:center}</style></head>' +
                                  '<body><h1>Horizon</h1><h3>Transfer History — ' + dlYear + '</h3>' +
                                  '<p style="font-size:12px;color:#888">Account: ' + user.name + ' | Generated: ' + new Date().toLocaleDateString() + '</p>' +
                                  '<table><thead><tr><th>Date</th><th>Time</th><th>Type</th><th>Amount</th><th>Memo</th><th>Transaction</th></tr></thead>' +
                                  '<tbody>' + (rows || '<tr><td colspan="6" style="text-align:center;color:#999">No transactions in ' + dlYear + '</td></tr>') + '</tbody></table>' +
                                  '<div class="footer">Powered by Horizon Stellar Testnet ' + new Date().toLocaleDateString() + '</div>' +
                                  '</body></html>'
                                const win = window.open('', '_blank')
                                win.document.write(html)
                                win.document.close()
                                win.print()
                                setDlLoading(false)
                                setShowDownload(false)
                              }
                            }}
                          >
                            {dlLoading ? 'Preparing...' : 'Download'}
                          </button>
                          <button className="dl-cancel-btn" onClick={() => setShowDownload(false)}>Cancel</button>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Search + Filter + Refresh Controls */}
                <div className="tx-controls">

                  {/* Search box */}
                  <div className="tx-search-wrap">
                    <span className="tx-search-icon"><Icon name="search" size={16} color="var(--ink3)"/></span>
                    <input
                      className="tx-search-input"
                      placeholder="Search by memo, date, amount..."
                      value={txSearch}
                      onChange={e => setTxSearch(e.target.value)}
                    />
                    {txSearch && (
                      <button className="tx-search-clear" onClick={() => setTxSearch('')}>✕</button>
                    )}
                  </div>

                  {/* Filter + Refresh row */}
                  <div className="tx-filter-row">
                    <div className="tx-filter-group">
                      {[
                        { val:'all',      label:'All',      icon:'history' },
                        { val:'sent',     label:'Sent',     icon:'send' },
                        { val:'received', label:'Received', icon:'receive' },
                      ].map(f => (
                        <button
                          key={f.val}
                          className={`tx-filter-btn ${txFilter === f.val ? 'tx-filter-active' : ''}`}
                          onClick={() => { setTxFilter(f.val); setViewMore(false) }}
                        >
                          <Icon name={f.icon} size={13}/> {f.label}
                        </button>
                      ))}
                    </div>
                    {/* Refresh button */}
                    <button className="tx-refresh-btn" onClick={loadTxns} disabled={txnsLoading}>
                      {txnsLoading ? <Spinner size={14}/> : <Icon name="refresh" size={14}/>} Refresh
                    </button>
                  </div>

                  {/* Results count */}
                  {!txnsLoading && txns.length > 0 && (
                    <div className="tx-count">
                      Showing {Math.min(displayed.length, filtered.length)} of {filtered.length} transactions
                    </div>
                  )}
                </div>

                {/* Transaction list */}
                {txnsLoading ? (
                  <div className="card">
                    {[0,1,2,3].map(i => (
                      <div key={i} className="tx-skeleton" style={{ animationDelay:`${i*0.1}s` }}/>
                    ))}
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="empty-state">
                    <div style={{ marginBottom:8 }}>{txSearch || txFilter !== 'all' ? <Icon name='search' size={32} color='var(--ink3)'/> : <Icon name='history' size={32} color='var(--ink3)'/>}</div>
                    <p>{txSearch || txFilter !== 'all' ? 'No transactions match your search' : 'No transactions yet'}</p>
                    {txSearch && (
                      <button className="btn-outline" onClick={() => { setTxSearch(''); setTxFilter('all') }}>
                        Clear Search
                      </button>
                    )}
                    {!txSearch && txns.length === 0 && (
                      <button className="btn-outline" onClick={loadTxns}>{t.refresh}</button>
                    )}
                  </div>
                ) : (
                  <div className="card">
                    {displayed.map((tx, i) => (
                      <div key={i} className={`tx-row ${tx.type === 'received' ? 'tx-received' : 'tx-sent'}`}>
                        <div className="tx-type-icon">
                          {tx.type === 'received' ? <Icon name="receive" size={18} color="#10b981"/> : <Icon name="send" size={18} color="var(--accent)"/>}
                        </div>
                        <div className="tx-info">
                          <div className="tx-top-row">
                            <span className={`tx-type-label ${tx.type === 'received' ? 'type-received' : 'type-sent'}`}>
                              {tx.type === 'received' ? 'Received' : 'Sent'}
                            </span>
                            {tx.amount && tx.amount !== '0' && (
                              <span className={`tx-amount ${tx.type === 'received' ? 'amount-in' : 'amount-out'}`}>
                                {tx.type === 'received' ? '+' : '-'}{tx.amount} XLM
                              </span>
                            )}
                          </div>
                          <div className="tx-hash">TX: {tx.hash?.slice(0,14)}…</div>
                          <div className="tx-date">{tx.date} · {tx.time}</div>
                          {tx.memo && <div className="tx-memo">"{tx.memo}"</div>}
                        </div>
                        <a className="tx-view" href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`} target="_blank" rel="noreferrer">View ↗</a>
                      </div>
                    ))}

                    {/* View More / View Less button */}
                    {filtered.length > 5 && (
                      <button
                        className="view-more-btn"
                        onClick={() => setViewMore(!viewMore)}
                      >
                        {viewMore
                          ? 'View Less'
                          : `View More (${filtered.length - 5} more transactions)`
                        }
                      </button>
                    )}
                  </div>
                )}

                {/* Download History Modal */}


              </div>
            )
          })()}

          {/* ── INVITE FRIENDS ── */}
          {page === 'invite' && (
            <div className="page fade-up">
              <div className="page-title">
                <h2>Invite Friends</h2>
                <p>Earn rewards when your friends join Horizon</p>
              </div>

              {/* Hero card */}
              <div className="invite-hero-card">
                <div className="invite-hero-icon"><Icon name="gift" size={36} color="white"/></div>
                <div className="invite-hero-text">
                  <div className="invite-hero-title">Invite friends, earn rewards</div>
                  <div className="invite-hero-sub">
                    Share your referral link. When your friend signs up and sends their first transfer, you both benefit!
                  </div>
                </div>
              </div>

              {/* Rewards */}
              <div className="invite-rewards">
                <div className="invite-reward-card">
                  <span className="ir-icon"><Icon name="wallet" size={28} color="var(--accent)"/></span>
                  <div className="ir-text">
                    <div className="ir-title">You earn</div>
                    <div className="ir-val">0.5 XLM</div>
                    <div className="ir-sub">per successful referral</div>
                  </div>
                </div>
                <div className="invite-reward-card">
                  <span className="ir-icon"><Icon name="gift" size={28} color="#10b981"/></span>
                  <div className="ir-text">
                    <div className="ir-title">Friend gets</div>
                    <div className="ir-val">Free transfer</div>
                    <div className="ir-sub">zero fee on first send</div>
                  </div>
                </div>
              </div>

              {/* Referral link */}
              <div className="card">
                <div className="card-label" style={{display:"flex",alignItems:"center",gap:6}}><Icon name="share" size={14}/>  Your Referral Link</div>
                <div className="invite-link-box">
                  <span className="invite-link-text">
                    {`${window.location.origin}?ref=${user.walletAddress?.slice(0,8)}`}
                  </span>
                  <button className="invite-copy-btn" onClick={() => {
                    const link = `${window.location.origin}?ref=${user.walletAddress?.slice(0,8)}`
                    navigator.clipboard.writeText(link)
                    alert('Referral link copied!')
                  }}>
                    <Icon name="copy" size={14}/> Copy
                  </button>
                </div>

                {/* Share buttons */}
                <div className="invite-share-btns">

                  {/* WhatsApp */}
                  <button className="invite-share-btn whatsapp-share" onClick={() => {
                    const link = `${window.location.origin}?ref=${user.walletAddress?.slice(0,8)}`
                    const text = `Hey! I've been using Horizon to send money home instantly for less than ₹2 fee!

Join using my link and get your first transfer FREE:
${link}

_Powered by Stellar Blockchain_`
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank')
                  }}>
WhatsApp
                  </button>

                  {/* Telegram */}
                  <button className="invite-share-btn telegram-share" onClick={() => {
                    const link = `${window.location.origin}?ref=${user.walletAddress?.slice(0,8)}`
                    const text = `Send money home for less than Rs.2 fee! Join Horizon:`
                    window.open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`, '_blank')
                  }}>
Telegram
                  </button>

                  {/* Twitter/X */}
                  <button className="invite-share-btn twitter-share" onClick={() => {
                    const link = `${window.location.origin}?ref=${user.walletAddress?.slice(0,8)}`
                    const text = `Sending money home for less than ₹2 fee with @Horizon on @StellarOrg blockchain! Join here:`
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(link)}`, '_blank')
                  }}>
Twitter / X
                  </button>

                  {/* Native share */}
                  <button className="invite-share-btn native-share" onClick={async () => {
                    const link = `${window.location.origin}?ref=${user.walletAddress?.slice(0,8)}`
                    const text = `Join Horizon — Send money home for less than ₹2 fee!`
                    if (navigator.share) {
                      await navigator.share({ title: 'Horizon', text, url: link })
                    } else {
                      navigator.clipboard.writeText(`${text}
${link}`)
                      alert('Link copied! Share it anywhere.')
                    }
                  }}>
More
                  </button>

                </div>
              </div>

              {/* How it works */}
              <div className="card">
<div className="card-label" style={{display:"flex",alignItems:"center",gap:6}}><Icon name="info" size={14}/> How It Works</div>
                {[
                  { step:'1', icon:'share',   title:'Share your link', desc:'Send your referral link to friends via WhatsApp, Telegram, or any app' },
                  { step:'2', icon:'profile', title:'Friend signs up', desc:'Your friend creates a Horizon account using your link' },
                  { step:'3', icon:'send',    title:'Friend sends money', desc:'Your friend completes their first transfer on Stellar Testnet' },
                  { step:'4', icon:'gift', title:'Both get rewarded', desc:'You earn 0.5 XLM, your friend gets zero fee on first transfer' },
                ].map(s => (
                  <div key={s.step} className="invite-step">
                    <div className="invite-step-num">{s.step}</div>
                    <span className="invite-step-icon"><Icon name={s.icon} size={18} color="var(--accent)"/></span>
                    <div className="invite-step-text">
                      <div className="invite-step-title">{s.title}</div>
                      <div className="invite-step-desc">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ── METRICS DASHBOARD ── */}
          {page === 'metrics' && (
            <div className="page fade-up">
              <div className="page-title">
                <h2>Metrics</h2>
                <p>Your activity on Stellar Testnet</p>
              </div>

              {metricsLoading ? (
                <div className="card" style={{textAlign:'center',padding:40}}>
                  <Spinner size={32}/><p style={{marginTop:12,color:'var(--ink3)'}}>Loading metrics...</p>
                </div>
              ) : metrics ? (
                <>
                  {/* Stats grid */}
                  <div className="metrics-grid">
                    {[
                      { label:'Total Transactions', value: metrics.totalTransactions,         icon:'history',  color:'#1a56db' },
                      { label:'Total Sent',          value: metrics.totalSent,                 icon:'send',     color:'#e85d04' },
                      { label:'Total Received',      value: metrics.totalReceived,             icon:'receive',  color:'#059669' },
                      { label:'XLM Sent',            value: metrics.totalXLMSent + ' XLM',    icon:'wallet',   color:'#7c3aed' },
                      { label:'XLM Received',        value: metrics.totalXLMReceived + ' XLM',icon:'exchange', color:'#0891b2' },
                      { label:'Last Active',         value: metrics.lastActive ? new Date(metrics.lastActive).toLocaleDateString() : 'N/A', icon:'bell', color:'#d97706' },
                    ].map(s => (
                      <div key={s.label} className="metric-card">
                        <div className="metric-icon" style={{background: s.color + '18'}}>
                          <Icon name={s.icon} size={20} color={s.color}/>
                        </div>
                        <div className="metric-val">{s.value}</div>
                        <div className="metric-label">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Daily activity chart */}
                  <div className="card">
                    <div className="card-label">Daily Activity — Last 7 Days</div>
                    <div className="activity-chart">
                      {Object.entries(metrics.dailyActivity).map(([day, count]) => {
                        const max = Math.max(...Object.values(metrics.dailyActivity), 1)
                        const pct = Math.max((count / max) * 100, 4)
                        return (
                          <div key={day} className="activity-bar-wrap">
                            <div className="activity-count">{count}</div>
                            <div className="activity-bar-bg">
                              <div className="activity-bar-fill" style={{height: pct + '%'}}/>
                            </div>
                            <div className="activity-day">{day}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Security checklist */}
                  <div className="card">
                    <div className="card-label">Security Status</div>
                    {[
                      { label:'KYC Verified',              done: !!user.idNumber },
                      { label:'Wallet Connected',          done: !!addr },
                      { label:'Transactions Signed by Freighter', done: true },
                      { label:'Private Key Never Stored',  done: true },
                      { label:'Fee Sponsorship Available', done: true },
                      { label:'OTP Phone Verification',    done: true },
                    ].map(c => (
                      <div key={c.label} className="security-row">
                        <Icon name={c.done ? 'verified' : 'alert'} size={16} color={c.done ? '#059669' : '#d97706'}/>
                        <span style={{fontSize:'0.85rem', color: c.done ? 'var(--ink)' : 'var(--ink3)'}}>{c.label}</span>
                        <span className={'sec-badge ' + (c.done ? 'sec-pass' : 'sec-warn')}>{c.done ? 'Pass' : 'Pending'}</span>
                      </div>
                    ))}
                  </div>

                  <button className="btn-outline" style={{width:'100%'}} onClick={() => {
                    setMetricsLoading(true)
                    fetchAccountMetrics(addr).then(m => { setMetrics(m); setMetricsLoading(false) })
                  }}>
                    <Icon name="refresh" size={14}/> Refresh Metrics
                  </button>
                </>
              ) : (
                <div className="empty-state">
                  <Icon name="history" size={40} color="var(--ink3)"/>
                  <p>No metrics available yet</p>
                  <p style={{fontSize:'0.78rem',color:'var(--ink3)'}}>Make a transaction first</p>
                </div>
              )}
            </div>
          )}

          {/* ── PROFILE ── */}
          {page === 'profile' && (
            <div className="page fade-up">
              <div className="page-title"><h2>{t.my_profile}</h2><p>{t.profile_subtitle}</p></div>
              <div className="card">
                <div className="profile-header">
                  {/* Profile picture */}
                  <div className="profile-pic-wrap" onClick={() => profilePicRef.current?.click()}>
                    {profilePic
                      ? <img src={profilePic} className="profile-pic-img" alt="Profile"/>
                      : <div className="profile-avatar">{user.name[0].toUpperCase()}</div>
                    }
                    <div className="profile-pic-overlay"><Icon name="camera" size={18} color="white"/></div>
                    <input
                      ref={profilePicRef}
                      type="file"
                      accept="image/*"
                      style={{ display:'none' }}
                      onChange={e => {
                        const file = e.target.files[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = ev => {
                          const pic = ev.target.result
                          setProfilePic(pic)
                          localStorage.setItem('rc_pic_' + user.phone, pic)
                        }
                        reader.readAsDataURL(file)
                      }}
                    />
                  </div>
                  <div>
                    <div className="profile-name">{user.name}</div>
                    <div className="profile-badge"><Icon name="verified" size={13} color="var(--green)"/> {t.kyc_verified}</div>
                    <div className="profile-pic-hint">Tap photo to change</div>
                  </div>
                </div>
                <div className="profile-fields">
                  {[
                    ['Phone', user.phone],
                    ['🌍 Country', user.country],
                    ['🪪 ID Type', user.idType],
                    ['🔢 ID Number', `${'*'.repeat(user.idNumber.length - 4)}${user.idNumber.slice(-4)}`],
                    ['💼 Wallet', shortAddress(user.walletAddress)],
                    ['📅 Joined', new Date(user.createdAt).toLocaleDateString()],
                  ].map(([k, v]) => (
                    <div key={k} className="pf-row">
                      <span className="pf-key">{k}</span>
                      <span className="pf-val">{v}</span>
                    </div>
                  ))}
                </div>
                <div className="profile-wallet-full">
                  <div className="pf-wallet-header">
                    <span className="pf-key">Full Wallet Address</span>
                    <button className="addr-copy-icon" title="Copy address" onClick={() => {
                      navigator.clipboard.writeText(user.walletAddress)
                      setAddrCopied(true)
                      setTimeout(() => setAddrCopied(false), 2000)
                    }}>
                      {addrCopied ? <Icon name='check' size={14} color='var(--green)'/> : <Icon name='copy' size={14}/>}
                    </button>
                  </div>
                  <div className="pf-addr">{user.walletAddress}</div>
                </div>
                <button className="btn-outline danger-btn" onClick={onLogout}><Icon name="logout" size={16}/> {t.logout}</button>
              </div>
            </div>
          )}

        </div>

        {/* Sidebar hidden — content moved to Home Dashboard */}
      </main>

      {/* Incoming Payment Toast Notification */}
      {incomingPayment && newTxCount > 0 && (
        <div className="incoming-toast pop-in">
          <div className="toast-icon"><Icon name="receive" size={24} color="#059669"/></div>
          <div className="toast-body">
            <div className="toast-title">{t.money_received}</div>
            <div className="toast-msg">
              You received <strong>{parseFloat(incomingPayment.amount).toFixed(2)} XLM</strong>
              {' '}from {shortAddress(incomingPayment.from)}
            </div>
            <div className="toast-time">{incomingPayment.time}</div>
          </div>
          <button className="toast-close" onClick={() => {
            setIncoming(null)
            setNewTxCount(0)
          }}>✕</button>
        </div>
      )}

      <footer className="footer">Horizon &bull; Stellar Testnet &bull; Instant &bull; Borderless &bull; Fair</footer>

      {/* Transfer Receipt Modal */}
      {showReceipt && receiptData && (
        <ReceiptModal
          data={receiptData}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  )
}

// ── ROOT APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [authPage, setAuthPage] = useState('login') // login | signup
  const [user, setUser]         = useState(null)
  const [qrPayload, setQrPayload] = useState(null) // from scanned QR URL

  // Check existing session on load + read QR URL params
  useEffect(() => {
    const session = getSession()
    if (session) setUser(session)

    // Read URL params — set when someone scans a Horizon QR code
    const params = new URLSearchParams(window.location.search)
    const toAddr = params.get('to')
    const toName = params.get('name')
    if (toAddr && toAddr.startsWith('G') && toAddr.length === 56) {
      setQrPayload({ address: toAddr, name: toName || '' })
      // Clean URL without reloading
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  function handleLogout() {
    clearSession()
    setUser(null)
    setAuthPage('login')
  }

  if (user) return <MainApp user={user} onLogout={handleLogout} qrPayload={qrPayload} setQrPayload={setQrPayload} />
  if (authPage === 'signup') return <SignupPage onSignup={setUser} onGoLogin={() => setAuthPage('login')} />
  return <LoginPage onLogin={setUser} onGoSignup={() => setAuthPage('signup')} />
}