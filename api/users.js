// api/users.js — Supabase Database (Free, Reliable, Works across all devices)

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const SUPABASE_BASE = (SUPABASE_URL || '').replace(/\/+$/, '')
const REST_BASE = SUPABASE_BASE.endsWith('/rest/v1')
  ? SUPABASE_BASE
  : `${SUPABASE_BASE}/rest/v1`

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  // Fallback if Supabase not configured
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    console.log('Supabase not configured — using fallback')
    return res.status(200).json({ users: [], fallback: true })
  }

  const headers = {
    'Content-Type':  'application/json',
    'apikey':        SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
  }

  try {
    if (req.method === 'POST') {
      const { action, user, query, walletAddress } = req.body

      // ── SAVE USER ─────────────────────────────────────────────────────────
      if (action === 'save') {
        // Upsert user by phone so updates are deterministic across devices
        const resp = await fetch(`${REST_BASE}/horizon_users?on_conflict=phone`, {
          method:  'POST',
          headers: {
            ...headers,
            'Prefer': 'resolution=merge-duplicates,return=representation',
          },
          body: JSON.stringify({
            name:           user.name          || '',
            phone:          user.phone         || '',
            email:          user.email         || '',
            country:        user.country       || '',
            wallet_address: user.walletAddress || '',
            kyc_verified:   user.kycVerified   || false,
          }),
        })
        if (!resp.ok) {
          const err = await resp.text()
          console.error('Supabase save error:', err)
          return res.status(200).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true })
      }

      // ── SEARCH USERS ──────────────────────────────────────────────────────
      if (action === 'search') {
        const q = (query || '').trim()
        if (!q) return res.status(200).json({ users: [] })

        // Search name and phone separately; this avoids fragile OR parsing issues.
        const selectCols = 'name,phone,email,country,wallet_address,kyc_verified'
        const walletFilter = walletAddress ? `&wallet_address=neq.${encodeURIComponent(walletAddress)}` : ''

        const byNameUrl  = `${REST_BASE}/horizon_users?name=ilike.*${encodeURIComponent(q)}*&select=${selectCols}${walletFilter}`
        const byPhoneUrl = `${REST_BASE}/horizon_users?phone=ilike.*${encodeURIComponent(q)}*&select=${selectCols}${walletFilter}`

        const [nameResp, phoneResp] = await Promise.all([
          fetch(byNameUrl, { headers }),
          fetch(byPhoneUrl, { headers }),
        ])

        if (!nameResp.ok || !phoneResp.ok) {
          const nameErr = nameResp.ok ? '' : await nameResp.text()
          const phoneErr = phoneResp.ok ? '' : await phoneResp.text()
          console.error('Supabase search error:', { nameErr, phoneErr })
          return res.status(200).json({ users: [] })
        }

        const [nameRows, phoneRows] = await Promise.all([
          nameResp.json(),
          phoneResp.json(),
        ])
        const rowMap = new Map()
        ;[...(nameRows || []), ...(phoneRows || [])].forEach((r) => {
          const key = r.wallet_address || `${r.phone || ''}:${r.name || ''}`
          if (!rowMap.has(key)) rowMap.set(key, r)
        })
        const rows = Array.from(rowMap.values())

        // Convert DB column names back to app format
        const users = (rows || []).map(r => ({
          name:          r.name,
          phone:         r.phone,
          email:         r.email,
          country:       r.country,
          walletAddress: r.wallet_address,
          kycVerified:   r.kyc_verified,
        }))

        return res.status(200).json({ users })
      }
    }

    return res.status(400).json({ error: 'Invalid request' })
  } catch (err) {
    console.error('Users API error:', err.message)
    return res.status(200).json({ users: [], error: err.message })
  }
}