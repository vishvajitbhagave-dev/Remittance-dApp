// api/verify-otp.js — Vercel Serverless Function
// Verifies OTP from token — stateless, no database needed
// Max 3 attempts per token, 5-minute expiry

import crypto from 'crypto'

const SECRET = process.env.OTP_SECRET || 'horizon_otp_secret_2026'

function verifyToken(token) {
  try {
    const [payload, hmac] = token.split('.')
    if (!payload || !hmac) return { valid: false, error: 'Invalid token format.' }

    // Verify signature
    const expected = crypto.createHmac('sha256', SECRET).update(payload).digest('hex').slice(0, 16)
    if (expected !== hmac) return { valid: false, error: 'Invalid or tampered token.' }

    // Decode payload
    const data = JSON.parse(Buffer.from(payload, 'base64').toString())
    return { valid: true, data }
  } catch {
    return { valid: false, error: 'Could not decode token.' }
  }
}

function updateToken(data) {
  const payload = Buffer.from(JSON.stringify(data)).toString('base64')
  const hmac    = crypto.createHmac('sha256', SECRET).update(payload).digest('hex').slice(0, 16)
  return payload + '.' + hmac
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { token, otp, email } = req.body

  if (!token || !otp) {
    return res.status(400).json({ error: 'Token and OTP are required.' })
  }

  // Verify token signature
  const result = verifyToken(token)
  if (!result.valid) {
    return res.status(400).json({ error: result.error })
  }

  const data = result.data

  // Check expiry — 5 minutes
  if (Date.now() > data.expiry) {
    return res.status(400).json({
      error:   'OTP has expired. Please request a new one.',
      expired: true,
    })
  }

  // Check attempts — max 3
  if (data.attempts >= 3) {
    return res.status(400).json({
      error:       'Maximum attempts exceeded. Please request a new OTP.',
      maxAttempts: true,
    })
  }

  // Check email matches (extra security)
  if (email && data.email !== email.toLowerCase()) {
    return res.status(400).json({ error: 'Email does not match.' })
  }

  // Check OTP
  if (otp.trim() !== data.otp) {
    // Increment attempts
    data.attempts += 1
    const newToken       = updateToken(data)
    const attemptsLeft   = 3 - data.attempts
    return res.status(400).json({
      error:        attemptsLeft > 0
        ? `Incorrect OTP. ${attemptsLeft} attempt${attemptsLeft === 1 ? '' : 's'} remaining.`
        : 'Maximum attempts exceeded. Please request a new OTP.',
      token:        newToken, // return updated token with incremented attempts
      attemptsLeft,
    })
  }

  // OTP correct
  return res.status(200).json({
    success: true,
    message: 'OTP verified successfully.',
    email:   data.email,
  })
}