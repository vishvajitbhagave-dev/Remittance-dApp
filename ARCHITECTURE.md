# Horizon — Architecture Document

**Project:** Horizon Cross-Border Remittance dApp  
**Network:** Stellar Testnet  
**Level:** Blue Belt (Level 5) — Stellar Journey to Mastery  
**Developer:** Vishvajit Bhagave  
**Live URL:** https://remittance-d-app.vercel.app

---

## 1. Overview

Horizon is a cross-border remittance web application built on the Stellar blockchain. It allows migrant workers to send money home instantly for less than Rs.2 fee, compared to Rs.200–500 charged by traditional services.

**Real-world use case:**
Joy works in Dubai and wants to send money to his mother in Mumbai. Using Horizon, he sends 100 AED which converts to XLM on the Stellar network and arrives in his mother's wallet in under 10 seconds, with a fee of 0.1 XLM (approximately Rs.1.80).

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                              │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐   │
│   │              Horizon React Frontend (Vite)              │   │
│   │                                                         │   │
│   │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐  │   │
│   │  │  Auth /  │ │  Send /  │ │ History  │ │ Profile  │  │   │
│   │  │  KYC     │ │ Receive  │ │ Search   │ │ Settings │  │   │
│   │  └──────────┘ └──────────┘ └──────────┘ └──────────┘  │   │
│   │                                                         │   │
│   │  ┌─────────────────────────────────────────────────┐   │   │
│   │  │              stellar.js (Core Logic)            │   │   │
│   │  │  - Wallet connect    - Send payment             │   │   │
│   │  │  - Fetch balance     - Fetch transactions       │   │   │
│   │  │  - Currency convert  - Live exchange rates      │   │   │
│   │  └─────────────────────────────────────────────────┘   │   │
│   └─────────────────────────────────────────────────────────┘   │
│                         │                │                       │
│              ┌──────────┘                └──────────┐            │
│              ▼                                      ▼            │
│   ┌─────────────────────┐            ┌──────────────────────┐   │
│   │  localStorage       │            │  Freighter Wallet    │   │
│   │  - User accounts    │            │  Browser Extension   │   │
│   │  - KYC data         │            │  - Keypair storage   │   │
│   │  - Session token    │            │  - Transaction sign  │   │
│   │  - Profile photo    │            └──────────────────────┘   │
│   └─────────────────────┘                        │              │
└──────────────────────────────────────────────────│──────────────┘
                                                   │
                            ┌──────────────────────┘
                            ▼
┌──────────────────────────────────────────────────────────────────┐
│                      STELLAR TESTNET                              │
│                                                                   │
│   ┌─────────────────────────┐   ┌───────────────────────────┐   │
│   │   Horizon REST API      │   │     Soroban RPC           │   │
│   │   (horizon-testnet      │   │     (soroban-testnet      │   │
│   │    .stellar.org)        │   │      .stellar.org)        │   │
│   │                         │   │                           │   │
│   │   - Account balances    │   │   - Smart contract calls  │   │
│   │   - Transaction submit  │   │   - Contract: CDSVXG7V... │   │
│   │   - Payment history     │   │                           │   │
│   └─────────────────────────┘   └───────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                              │
│                                                                   │
│  open.er-api.com       → Live exchange rates (100+ currencies)   │
│  api.qrserver.com      → QR code image generation                │
│  stellar.expert        → Transaction explorer (view links)       │
│  friendbot.stellar.org → Fund testnet accounts with free XLM     │
│  wa.me                 → WhatsApp share integration              │
└──────────────────────────────────────────────────────────────────┘
```

---

## 3. Technology Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend Framework | React 18 | UI components and state management |
| Build Tool | Vite 5 | Fast development and production builds |
| Blockchain SDK | @stellar/stellar-sdk | Stellar network interactions |
| Wallet | Freighter (browser extension) | Keypair management and signing |
| Smart Contract | Rust + Soroban SDK | On-chain transaction logic |
| Styling | Custom CSS (no library) | Full design control |
| Testing | Vitest | 38 unit tests |
| CI/CD | GitHub Actions | Auto test and build on push |
| Hosting | Vercel | Production deployment |
| Language Support | 30 languages | translations.js with proxy fallback |

---

## 4. Key Components

### 4.1 stellar.js — Blockchain Core
All blockchain interactions are isolated in `stellar.js`:

```
fetchBalance(publicKey)          → Get XLM balance from Horizon
fetchTransactions(publicKey)     → Get payment history
sendRemittance(from, to, xlm)    → Build, sign, submit transaction
connectFreighter()               → Connect browser wallet
fetchLiveRates()                 → Get live USD exchange rates
convertToXLM(amount, currency)   → Convert any currency to XLM
fetchLatestIncomingPayment()     → Poll for new received payments
```

### 4.2 App.jsx — Frontend Application
Single-page application with 6 pages:

```
Home      → Dashboard with balance and quick actions
Send      → 3 options: search contact, scan QR, paste address
Receive   → QR code display with download/share options
History   → Transaction list with search, filter, sort, export
Invite    → Referral system with social sharing
Profile   → KYC details, profile photo, wallet address
```

### 4.3 Soroban Smart Contract (Rust)
Location: `contract/src/lib.rs`

The contract handles:
- Transfer validation
- Memo recording
- Event emission for transaction tracking

Contract ID: `CDSVXG7VBBP2IASOP4V4ARRZNVPI2VHX5ARJEY7ZZD6K2WCGFAC54S4V`

---

## 5. Transaction Flow

```
Step 1: User selects receiver
        → Search by name (localStorage)
        → Scan QR code (jsQR library + camera)
        → Paste wallet address manually

Step 2: User enters amount in their currency (e.g., 100 AED)
        → convertToXLM(100, 'AED')
        → Uses live rate: 100 AED × 0.272 = 27.2 USD ÷ 0.11 = 247 XLM

Step 3: User confirms transfer summary
        → You Send: 100 AED
        → On Stellar: 247 XLM
        → Fee: 0.1 XLM
        → They Receive: 9,057 INR

Step 4: Freighter signs and submits transaction
        → Stellar network confirms in 5–10 seconds

Step 5: Receipt generated
        → Shows transfer details
        → Save as image or share on WhatsApp

Step 6: Receiver gets notification
        → App polls Horizon API every 8 seconds
        → If new incoming payment < 2 min old → show notification badge + toast
```

---

## 6. KYC Flow (SEP-12 Compliant)

```
Step 1: Basic Info → Name, Phone, Country
Step 2: KYC       → ID Type + Number validation
        - Aadhaar: 12 digits, auto-formats XXXX XXXX XXXX
        - PAN Card: 10 chars, validates each position
        - Passport: 8 chars
        - Driving License: 15 chars
        - Voter ID: 10 chars
Step 3: Wallet    → Connect Freighter + get Stellar address
Step 4: Verify    → OTP via phone (testnet: shown in alert)
```

---

## 7. Data Storage

For Level 5 (testnet MVP), user data is stored in `localStorage`:

| Key | Contents |
|-----|---------|
| `remitchain_users` | All registered user accounts |
| `remitchain_session` | Current logged-in user |
| `rc_pic_<phone>` | Profile photo (base64) |
| `rc_lang` | Selected language code |

**Note for Production (Level 6):** localStorage will be replaced with a MongoDB Atlas database and Node.js backend with JWT authentication. This enables cross-device access.

---

## 8. Currency Conversion Logic

```
User Input: 100 AED → INR

Step 1: AED to USD
        100 AED × 0.272 (AED rate) = 27.20 USD

Step 2: USD to XLM
        27.20 USD ÷ 0.11 (XLM price) = 247.27 XLM

Step 3: XLM to INR
        247.27 XLM × 0.11 × 83.45 (INR rate) = 2,270 INR

Exchange rates sourced live from: open.er-api.com/v6/latest/USD
Cached for 1 hour to reduce API calls.
```

---

## 9. CI/CD Pipeline

```yaml
Trigger: Push to main or master branch

Jobs:
  1. Checkout code
  2. Setup Node.js 20
  3. Install dependencies (npm install)
  4. Run tests (npm test) — 38 tests must pass
  5. Build (npm run build) — must produce dist/

If any step fails → deployment blocked
```

---

## 10. Security Considerations

| Area | Approach |
|------|---------|
| Private keys | Never stored in app — managed by Freighter wallet |
| KYC data | Encrypted in localStorage, never sent to server |
| Transactions | Signed client-side by Freighter before broadcast |
| OTP | 6-digit random code (testnet: displayed in alert) |
| PAN validation | Structural validation only, not actual NSDL lookup |

---

## 11. Future Improvements (Level 6+)

1. **Real database** — MongoDB Atlas for cross-device user data
2. **Backend API** — Node.js + Express with JWT authentication
3. **Real OTP** — Twilio SMS integration
4. **Mobile app** — React Native version
5. **Mainnet** — Deploy to Stellar Mainnet with real XLM
6. **SEP-24** — Full KYC with document upload and verification
7. **Push notifications** — Firebase FCM for mobile alerts

---

## 12. Smart Contract Details

**Location:** `contract/src/lib.rs`  
**Language:** Rust  
**SDK:** Soroban SDK  
**Network:** Stellar Testnet  
**Contract ID:** `CDSVXG7VBBP2IASOP4V4ARRZNVPI2VHX5ARJEY7ZZD6K2WCGFAC54S4V`

The contract validates and records remittance transactions on-chain, emitting events for transaction tracking.

---

*Document prepared for Stellar Journey to Mastery — Level 5 (Blue Belt) submission*  
*Vishvajit Bhagave — April 2026*