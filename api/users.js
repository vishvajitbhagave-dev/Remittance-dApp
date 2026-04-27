// api/users.js — Cloud user storage via JSONBin.io

const BIN_ID  = process.env.JSONBIN_ID
const API_KEY = process.env.JSONBIN_KEY
const BASE    = 'https://api.jsonbin.io/v3'

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

export default async function handler(req, res) {
  cors(res)
  if (req.method === 'OPTIONS') return res.status(200).end()

  if (!BIN_ID || !API_KEY) {
    if (req.method === 'GET') return res.status(200).json({ users: [] })
    return res.status(200).json({ success: true, fallback: true })
  }

  const headers = {
    'Content-Type':      'application/json',
    'X-Master-Key':      API_KEY,
    'X-Bin-Versioning':  'false',
  }

  try {
    // Always fetch current data first
    const getResp = await fetch(`${BASE}/b/${BIN_ID}/latest`, { headers })
    if (!getResp.ok) {
      const errText = await getResp.text()
      console.error('JSONBin GET error:', errText)
      return res.status(200).json({ users: [], error: errText })
    }
    const getData = await getResp.json()
    let users = getData?.record?.users || []

    if (req.method === 'GET') {
      return res.status(200).json({ users })
    }

    if (req.method === 'POST') {
      const { action, user, query, walletAddress } = req.body

      if (action === 'save') {
        // Add or update user in cloud
        const idx = users.findIndex(
          u => u.phone === user.phone || u.walletAddress === user.walletAddress
        )
        if (idx >= 0) {
          users[idx] = { ...users[idx], ...user }
        } else {
          // Store only needed fields to keep bin small
          users.push({
            name:          user.name,
            phone:         user.phone,
            email:         user.email || '',
            country:       user.country,
            walletAddress: user.walletAddress,
            kycVerified:   user.kycVerified,
          })
        }
        const putResp = await fetch(`${BASE}/b/${BIN_ID}`, {
          method:  'PUT',
          headers,
          body:    JSON.stringify({ users }),
        })
        if (!putResp.ok) {
          const errText = await putResp.text()
          console.error('JSONBin PUT error:', errText)
          return res.status(200).json({ success: false, error: errText })
        }
        return res.status(200).json({ success: true, total: users.length })
      }

      if (action === 'search') {
        const q = (query || '').toLowerCase().trim()
        if (!q) return res.status(200).json({ users: [] })
        const results = users.filter(u =>
          u.walletAddress !== walletAddress && (
            u.name?.toLowerCase().includes(q) ||
            u.phone?.includes(q) ||
            u.email?.toLowerCase().includes(q)
          )
        )
        return res.status(200).json({ users: results })
      }
    }

    return res.status(400).json({ error: 'Invalid action' })
  } catch (err) {
    console.error('Users API error:', err.message)
    return res.status(200).json({ users: [], success: false, error: err.message })
  }
}