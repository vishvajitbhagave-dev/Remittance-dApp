// api/send-otp.js — Vercel Serverless Function
// Sends OTP via Gmail SMTP using NodeMailer
// Stateless: encodes OTP + expiry + email into a signed token returned to client

import nodemailer from 'nodemailer'
import crypto from 'crypto'

// Secret for signing tokens — set in Vercel env vars
const SECRET = process.env.OTP_SECRET || 'horizon_otp_secret_2026'

// Rate limiting — simple in-memory store (resets on cold start)
const rateLimitMap = {}

function rateLimit(email) {
  const now = Date.now()
  const key  = email.toLowerCase()
  if (!rateLimitMap[key]) rateLimitMap[key] = []
  // Keep only requests in last 10 minutes
  rateLimitMap[key] = rateLimitMap[key].filter(t => now - t < 600000)
  if (rateLimitMap[key].length >= 3) return false // max 3 per 10 min
  rateLimitMap[key].push(now)
  return true
}

// Create signed token: base64(email|otp|expiry|attempts)|hmac
function createToken(email, otp) {
  const expiry  = Date.now() + 5 * 60 * 1000 // 5 minutes
  const payload = Buffer.from(JSON.stringify({ email: email.toLowerCase(), otp, expiry, attempts: 0 })).toString('base64')
  const hmac    = crypto.createHmac('sha256', SECRET).update(payload).digest('hex').slice(0, 16)
  return payload + '.' + hmac
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { email } = req.body
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email address is required.' })
  }

  // Rate limiting check
  if (!rateLimit(email)) {
    return res.status(429).json({ error: 'Too many OTP requests. Please wait 10 minutes before trying again.' })
  }

  // Generate 6-digit OTP
  const otp = String(Math.floor(100000 + Math.random() * 900000))

  // Gmail SMTP credentials from Vercel env vars
  const gmailUser = process.env.GMAIL_USER
  const gmailPass = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailPass) {
    // Test mode — return OTP in response (only in development)
    const token = createToken(email, otp)
    console.log('TEST MODE OTP for', email, ':', otp)
    return res.status(200).json({
      success:  true,
      testMode: true,
      token,
      message:  'Test mode: Gmail credentials not configured. OTP: ' + otp
    })
  }

  try {
    // Create Gmail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailPass, // Gmail App Password (not your regular password)
      },
    })

    // Send email
    await transporter.sendMail({
      from:    `"Horizon App" <${gmailUser}>`,
      to:      email,
      subject: 'Your Horizon Verification Code',
      html: `
        <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #f8fafc; padding: 32px 24px; border-radius: 16px;">
          <div style="text-align: center; margin-bottom: 28px;">
            <div style="background: #1a56db; width: 48px; height: 48px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 12px;">
              <span style="color: white; font-size: 22px;">H</span>
            </div>
            <h2 style="color: #0f172a; margin: 0; font-size: 22px;">Horizon</h2>
            <p style="color: #64748b; margin: 4px 0 0 0; font-size: 14px;">Cross-Border Remittance</p>
          </div>

          <div style="background: white; border-radius: 12px; padding: 28px 24px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.06);">
            <p style="color: #334155; font-size: 15px; margin: 0 0 20px 0;">Your verification code is:</p>
            <div style="background: #f1f5f9; border-radius: 12px; padding: 20px; margin: 0 auto 20px auto; display: inline-block; min-width: 200px;">
              <span style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #1a56db; font-family: monospace;">${otp}</span>
            </div>
            <p style="color: #64748b; font-size: 13px; margin: 0 0 8px 0;">This code expires in <strong>5 minutes</strong>.</p>
            <p style="color: #64748b; font-size: 13px; margin: 0;">Do not share this code with anyone.</p>
          </div>

          <div style="text-align: center; margin-top: 24px;">
            <p style="color: #94a3b8; font-size: 12px; margin: 0;">If you did not request this, please ignore this email.</p>
            <p style="color: #94a3b8; font-size: 12px; margin: 4px 0 0 0;">Horizon · Instant Cross-Border Remittance · Stellar Testnet</p>
          </div>
        </div>
      `,
    })

    const token = createToken(email, otp)
    return res.status(200).json({
      success:  true,
      testMode: false,
      token,
      message:  'OTP sent to ' + email,
    })
  } catch (err) {
    console.error('Email send error:', err)
    // Fallback to test mode
    const token = createToken(email, otp)
    return res.status(200).json({
      success:  true,
      testMode: true,
      token,
      message:  'Email failed. Test mode OTP: ' + otp,
    })
  }
}