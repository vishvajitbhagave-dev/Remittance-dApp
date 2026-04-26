// api/users.js — Vercel Serverless Function
// Cloud user storage using JSONBin.io (free, no setup needed)
// All users stored in cloud → searchable across all devices

const BIN_ID  = process.env.JSONBIN_ID
const API_KEY = process.env.JSONBIN_KEY
const BASE    = 'https://api.jsonbin.io/v3'

// CORS headers for all responses
function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  // If JSONBin not configured — return empty (app uses localStorage fallback)
  if (!BIN_ID || !API_KEY) {
    if (req.method === 'GET') return res.status(200).json({ users: [] })
    return res.status(200).json({ success: true, fallback: true })
  }

  const headers = {
    'Content-Type':  'application/json',
    'X-Master-Key':  API_KEY,
    'X-Bin-Versioning': 'false',
  }

  try {
    if (req.method === 'GET') {
      // Get all users from cloud
      const resp = await fetch(`${BASE}/b/${BIN_ID}/latest`, { headers })
      const data = await resp.json()
      const users = data?.record?.users || []
      return res.status(200).json({ users })
    }

    if (req.method === 'POST') {
      const { action, user, query, walletAddress } = req.body

      // GET current data first
      const getResp = await fetch(`${BASE}/b/${BIN_ID}/latest`, { headers })
      const getData = await getResp.json()
      let users = getData?.record?.users || []

      if (action === 'save') {
        // Add or update user
        const idx = users.findIndex(u => u.phone === user.phone)
        if (idx >= 0) {
          users[idx] = { ...users[idx], ...user }
        } else {
          users.push(user)
        }
        // Save back to JSONBin
        await fetch(`${BASE}/b/${BIN_ID}`, {
          method:  'PUT',
          headers,
          body:    JSON.stringify({ users }),
        })
        return res.status(200).json({ success: true })
      }

      if (action === 'search') {
        // Search users by name or phone — exclude current user
        const q   = (query || '').toLowerCase()
        const results = users.filter(u =>
          u.walletAddress !== walletAddress && (
            u.name?.toLowerCase().includes(q) ||
            u.phone?.includes(q)
          )
        )
        return res.status(200).json({ users: results })
      }
    }

    return res.status(400).json({ error: 'Invalid request' })
  } catch (err) {
    console.error('Users API error:', err)
    return res.status(200).json({ users: [], success: true, error: err.message })
  }
}