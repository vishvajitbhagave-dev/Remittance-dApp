// api/users.js — Supabase Database (Free, Reliable, Works across all devices)

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY

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
        // Upsert user — insert or update if phone already exists
        const resp = await fetch(`${SUPABASE_URL}/rest/v1/horizon_users`, {
          method:  'POST',
          headers: {
            ...headers,
            'Prefer': 'resolution=merge-duplicates',
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

        // Search by name OR phone — exclude current user's wallet
        const url = `${SUPABASE_URL}/rest/v1/horizon_users?or=(name.ilike.*${encodeURIComponent(q)}*,phone.ilike.*${encodeURIComponent(q)}*)&wallet_address=neq.${encodeURIComponent(walletAddress || '')}&select=name,phone,email,country,wallet_address,kyc_verified`

        const resp = await fetch(url, { headers })
        if (!resp.ok) {
          const err = await resp.text()
          console.error('Supabase search error:', err)
          return res.status(200).json({ users: [] })
        }
        const rows = await resp.json()

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