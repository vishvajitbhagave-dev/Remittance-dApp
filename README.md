# Horizon — Instant Cross-Border Remittance on Stellar

> Send money home instantly for less than ₹2 fee using Stellar blockchain.

![Horizon App](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
![Stellar](https://img.shields.io/badge/Network-Stellar%20Testnet-blue?style=flat-square)
![Tests](https://img.shields.io/badge/Tests-38%20Passing-success?style=flat-square)
![CI/CD](https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions/workflows/ci.yml/badge.svg)

---

## What is Horizon?

Horizon solves a real problem. Migrant workers send $800 billion per year back home. Traditional services like Western Union charge 3–7% fees and take 1–3 days. Horizon uses the Stellar blockchain to make it instant and nearly free.

**Example:** Joy works in Dubai and wants to send money to his mother in Mumbai.
- Traditional: Rs.200–500 fee, 1–3 days
- Horizon: Rs.1.80 fee (0.1 XLM), 5–10 seconds

---

## Problem Statement
 
Every month, millions of migrant workers send money home to their families across borders. The current reality:
 
| Problem | Reality |
|---------|---------|
| Bank transfer fee | ₹150–500 per transfer |
| Transfer time | 1–3 business days |
| No bank account access | 1.4 billion people unbanked worldwide |
| Western Union / MoneyGram | 5–8% fee deducted from poor families |
| Hidden exchange rate cuts | Additional 2–3% loss |
 
**Horizon solves this.** Send money in under 10 seconds for less than ₹2 — no bank account required.
 
---
 
## Solution
 
Horizon is a mobile-first cross-border remittance dApp built on Stellar Blockchain:
 
- Sender scans receiver's QR code → sends money in under 10 seconds
- Receiver gets instant in-app notification and sees balance in local currency
- Pay anyone by scanning their QR code
- Withdraw cash from ATM using a 6-digit code
- No bank account needed — no crypto knowledge required
- Fee: Less than ₹2 per transfer

---

## Features

### Core
- **Send Money** — Search contact, scan QR code, or paste wallet address
- **Receive Money** — QR code generation scannable by any phone camera
- **Transaction History** — Full history with search, filter (All/Sent/Received), and sort
- **Real-time Notifications** — Badge + popup when money is received (polls every 8 seconds)
- **KYC Verification** — Aadhaar, PAN Card, Passport, Driving License, Voter ID validation

### User Experience
- **Live Exchange Rates** — Real-time rates for 100+ currencies from open.er-api.com
- **Transfer Receipt** — Download as image or share on WhatsApp
- **QR Scanner** — Camera-based QR scanning with auto-fill
- **Download History** — Export as PDF or CSV with year filter
- **Multi-language** — 30 languages including Hindi, Marathi, Gujarati, Arabic, Spanish
- **Invite Friends** — Referral system with WhatsApp, Telegram, Twitter sharing
- **Profile Photo** — Upload and save profile picture
- **Dark/Light** — Clean professional UI inspired by Wise and Remitly

### Advanced Features 
| Feature | Description |
|---------|-------------|
| Fee Sponsorship | Gasless transactions using Stellar fee bump — receivers pay zero fees |
| Cloud Database | Supabase PostgreSQL — user accounts work across all devices |
| Email OTP | Gmail SMTP via Vercel serverless functions |
| Live Exchange Rates | Fetched from open.er-api.com every hour |
| Cross-device Search | Search any user by name or phone number across all devices |

---

## Screensots

### Home

<img width="1919" height="900" alt="Screenshot 2026-05-01 165533" src="https://github.com/user-attachments/assets/8aa96589-e114-49e5-b7de-3bf374fe24f7" />
<img width="1919" height="948" alt="Screenshot 2026-05-01 165553" src="https://github.com/user-attachments/assets/f42ba39f-f079-4a5a-a47b-633dcde5053a" />

### Send

<img width="1919" height="949" alt="Screenshot 2026-05-01 165609" src="https://github.com/user-attachments/assets/119ef92c-7a36-40b6-8645-279595865e67" />

### Receive

<img width="1919" height="948" alt="Screenshot 2026-05-01 165627" src="https://github.com/user-attachments/assets/86eb75b6-68e3-43b3-bcde-8241f6942176" />
<img width="1919" height="946" alt="Screenshot 2026-05-01 165647" src="https://github.com/user-attachments/assets/0ad27749-e116-4a89-9ff1-fecddde18d6a" />

### History

<img width="1919" height="944" alt="Screenshot 2026-05-01 165721" src="https://github.com/user-attachments/assets/e12451bc-eb6a-41e1-aa0a-11b64debef7b" />

### Invite

<img width="1919" height="953" alt="Screenshot 2026-05-01 165743" src="https://github.com/user-attachments/assets/9179dde8-9890-4a8d-bedb-29c69af75e7d" />
<img width="1919" height="945" alt="Screenshot 2026-05-01 165809" src="https://github.com/user-attachments/assets/f255892b-7157-4c94-b022-1bab3fe33302" />

### Metrics 

<img width="1919" height="952" alt="Screenshot 2026-05-01 164627" src="https://github.com/user-attachments/assets/b323dac7-c3c6-4528-898a-e0346c76746f" />
<img width="1919" height="945" alt="Screenshot 2026-05-01 164735" src="https://github.com/user-attachments/assets/35c67667-aff0-4646-9a93-c74993176d49" />

### Profile

<img width="1919" height="950" alt="Screenshot 2026-05-01 165836" src="https://github.com/user-attachments/assets/a73b3c54-39d1-4b43-bdf9-a850e0d3ea38" />

---

## Important Links

| Resource | Link |
|----------|------|
| **Live Demo Link** | https://remittance-d-app.vercel.app/ |
| **Demo Video Link** | https://drive.google.com/file/d/1Kiv2wedAoCbWgTu8k3fvKrs3VANoJa7V/view?usp=drive_link |
| **User Google Form** | https://docs.google.com/forms/d/10z7W0bSrdaaYPNl4pLfoMzqnFS2j31WEmFXle7lNn8Y/edit |
| **User Feedback Form** | https://docs.google.com/spreadsheets/d/1E2giGbPvbbbbly2iVsqqDkaGcxOZ3u6jZJEAyXJJ3Gs/edit?resourcekey=&gid=700985705#gid=700985705 |
| **Security Checklist** | https://github.com/vishvajitbhagave-dev/Remittance-dApp/blob/master/SECURITY.md |
| **Architecture Document** | https://github.com/vishvajitbhagave-dev/Remittance-dApp/blob/master/ARCHITECTURE.md |

---

## Verified Users (30+)
All 30 users created accounts, connected Freighter wallets, received testnet XLM, and completed transfers. Transactions are verifiable on Stellar Expert.
 
> All transactions verifiable on [Stellar Expert Testnet Explorer](https://stellar.expert/explorer/testnet)
 
| # | Name | Wallet Address |
|---|------|----------------|
| 1  | *Sadiya Mulani*      | *GCCQQTDVHNIB6INPIUS2F2VASHVH4NPWMIVX2LKFGAQY7LEU6EFISVNK* | 
| 2  | *Rohit Labase*       | *GAEHAI64AJE6DIMWXLQVTIK5CJ5CSRUXTVFOV23DIXUXFXF6BMGQ4ASQ* |
| 3  | *Shahin Shaikh*      | *GDBXGKJ6VTWWYA4QF7IJZ3JQ3PCTENVJQZFHXLRGCIJJ3SB374HBKRYT* |
| 4  | *Bhavesh Patil*      | *GADSVJJYMZTCIDB4NVGXKKPNMNGAZRFXIV5534U7QK6R4IYNSWMZDA65* |
| 5  | *Piyush Dixit*       | *GCNZMMC5ENSGABZAH7LH2JBKI4RQMG6DM3YR3FLJ2OZSZI6AGKF7FJPK* |
| 6  | *Shivtej Shelake*    | *GABYESX3AR6S7ATWI7M6HRCNVWU3SNPV43M4GZSUZPVOYHOTRCRCICZ6* |
| 7  | *Pratiksha kalbhor*  | *GCXF754WQZ5ELFJMQTWJDOTUR6MQQXHDVEFEYDQBIQICQ6H7XLRM4VRZ* |
| 8  | *shriram masalge*    | *GAV454GTJ7UUVWNVZXUNIO75LZ5UOKSEIRVU6BH3VOKU6CRPGQXTCOF7* |
| 9  | *Sudhakar sutar*     | *GALULA4PSYS4AVX7AIUDZ5IVUUWJAGT4BECMICA3JQMCO3HICKQEKJXS* |
| 10 | *Payal Babar*        | *GA7IXJAO4NMPRXMQD4MTOZICZCSVK5KWWFGFR3GVQHGC4FNRLHHZMHKG* |
| 11 | *Dnyaneshwari Badhe* | *GDLLRKGBCPUYRJE3HFYUNI46PQQNA5HPP6QR43FDPZJXNVHEW5QJ5LKV* |
| 12 | *Harshal Jagdale*    | *GCATAASNFHODIKA4VTIEZHONZB3BGZJL42FXHHZ3VS6YKX2PCDIJ3LDY* |
| 13 | *Harshal Jagdale*    | *GCATAASNFHODIKA4VTIEZHONZB3BGZJL42FXHHZ3VS6YKX2PCDIJ3LDY* |
| 14 | *Zeel Chauhan*       | *GBHUU5VLLXN75JCIML7RY2EHZU2AIXRWT7X6Q4UUE7GDIPXZSN4TNSLZ* |
| 15 | *shivam*             | *GCKZWX5VBPBANLDDMMCS35UL7ZSD46PSAOBYPNA6O7562SCDO2CNBX43* |
| 16 | *Vedang Bahirat*     | *GAYMWU2VTZC6646FV4M5753ZZUBIXZHSBLBOLTHBHCVFQIOBZH6D5W4H* |
| 17 | *Nandini Jadhav*     | *GCT3E7HUMKYVC2MXFURGRQJF5PMS4V6ZFZQORNW75L2TZIWFF2HM5CMH* |
| 18 | *Nikita Biradar*     | *GAVOLZD4APA2R7LOG5T45OBWGXAXQ57J63L7Z2YUOL2EZ33FY7YMC4PX* |
| 19 | *Shivam Patil*       | *GBKNB5MGFWWRHQWPIBEVJXCBYUWPD7Z5WXOI5ZBRN6U32RDMB3DWH7XP* |
| 20 | *shinde harshwardhan balsaheb* | *GA4NSQ4YM5CEHR6JETBFTFCMLGRNFJHZOV6M76QHEFPNEWZBXUEFXYQN* |
| 21 | *PRANAV PATIL*       | *GCIGDFLUD5QOTNCUFK65GTIIQM5PMISYXN32YYIJR4KXWEYRABUARR47* |
| 22 | *om mane*            | *GDTKMRMD6TDR7X662CWDIK2DMLCKMX3XX3T5C5YP4AIH6ABTQ6YPYYQC* |
| 23 | *Aradhya Bhagave*    | *GBZ3PQMIMFBS4J3XMOT3V7SWCN3ZVY3EXA7Y2ZLFKR6SDZYNW737Y4GS* |
| 24 | *Samruddhi Nevse*    | *GCWHSFPEKYG5OYYQT2M5VRRVM3LSCXACMBNKSZUTH7XCIUGQTGFDAYWD* |
| 25 | *Nikita*             | *GCEGKCDKELBY2QYZCZRPVPX5IKGEDW6T4IT32X6OSYNAICC4JNFQPN2A* |
| 26 | *prem*               | *GDUEJLRSWYZPOZPQRRTT2RP2QK2ZEUOCSQPFTCDZTDP5X2545PZ5GVAF* |
| 27 | *Yash Patil*         | *GB5A7E26DW4RVWPGUNVJCTWAT572Z45UBHP7L5YQOEVULKTNZOAOXAQB* |
| 28 | *yashwant*           | *GCQTUYQC2ZGYZSLW2WIBHDJFWF7IQIUBMIXA2SZ3D36PIJYOXZDPFBGX* |
| 29 | *Rohini Bhagave*     | *GCXE2OJEACVGLUPZ3DFZ6LSJGBSOKVUMHL3ZNH7C74BVQHPPNSHLJQMT* |
| 30 | *Ajay Bhagave*       | *GC7GMNPQRJU2VGJ3WPRUU47BCRNN3PHTSPRSCBVR6TOSPXCP5Z53FQE3* |

---

## User Onboarding & Feedback
 
### Google Form
🔗 **Feedback Form:** *https://docs.google.com/forms/d/10z7W0bSrdaaYPNl4pLfoMzqnFS2j31WEmFXle7lNn8Y/edit *
 
### User Feedback Summary
 
| # | Name              | Email          | Wallet Address | Feedback | Improvement Commit |
|---|------|-------|----------------|----------|--------------------|
| 1 | Sadiya Mulani     | sadiyamulani03@gmail.com        | *GCCQQTDVHNIB6INPIUS2F2VASHVH4NPWMIVX2LKFGAQY7LEU6EFISVNK* | I want to see the exact INR amount before confirming the transfer | **https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions/runs/24584736197** |
| 2 | Rohit Labase      | rohitlabae@gmail.com            | *GAEHAI64AJE6DIMWXLQVTIK5CJ5CSRUXTVFOV23DIXUXFXF6BMGQ4ASQ* | I want to see Notification after receiving money| **https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions/runs/24323752512** |
| 3 | Dnyaneshwari Badhe| dnyaneshwaribadhe2323@gmail.com | *GDLLRKGBCPUYRJE3HFYUNI46PQQNA5HPP6QR43FDPZJXNVHEW5QJ5LKV* | Some more features can be added| **https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions/runs/24827882351** |
| 4 | Shahin Shaikh     | chainwiselearning@gmail.com     | **GDBXGKJ6VTWWYA4QF7IJZ3JQ3PCTENVJQZFHXLRGCIJJ3SB374HBKRYT* | Download history button does not working| **https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions/runs/24522353462** |

### Excel Response Sheet
**Exported Responses:** *https://docs.google.com/spreadsheets/d/1E2giGbPvbbbbly2iVsqqDkaGcxOZ3u6jZJEAyXJJ3Gs/edit?resourcekey=&gid=700985705#gid=700985705*
 
### Improvements Implemented Based on Feedback
 
| Feedback | Improvement Made | Commit |
|----------|-----------------|--------|
|  I want to see the exact INR amount before confirming the transfer | Added all world currencies alphabetically, live exchange rates, search | *https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions/runs/24584736197* |
|  I want to see Notification after receiving money                  | Added real-time incoming payment notification for receiver | *https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions/runs/24323752512* |
|  Some more features can be added| Added Email OTP verification via SMTP | *https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions/runs/24827882351* |
| Download history button does not working | Added history refresh button, view more, and download PDF/CSV | *https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions/runs/24522353462* | 

 
---

**Iterations completed based on feedback:**
- Added all world currencies alphabetically, live exchange rates, search
- Added real-time incoming payment notification for receiver
- Added Email OTP verification via SMTP
- Added history refresh button, view more, and download PDF/CSV

---

## Community Contribution
 
- **Twitter Post:** — Shared Horizon with the Stellar and Web3 communities.
- **Open Source:** Full codebase at [github.com/vishvajitbhagave-dev/Remittance-dApp](https://github.com/vishvajitbhagave-dev/Remittance-dApp)
 
---
 
## Project Structure
 
```
Remittance-dApp/
├── src/
│   ├── App.jsx              # Main app — all UI pages
│   ├── App.css              # Styles — mobile responsive
│   ├── stellar.js           # Blockchain logic
│   ├── icons.jsx            # Professional SVG icons
│   ├── translations.js      # 30 languages
│   └── __tests__/
│       ├── setup.js
│       └── stellar.test.js  # 38 unit tests
├── api/
│   ├── send-otp.js          # Vercel serverless — Gmail OTP
│   ├── verify-otp.js        # Vercel serverless — OTP check
│   └── users.js             # Vercel serverless — Supabase CRUD
├── contract/
│   ├── src/lib.rs           # Soroban smart contract (Rust)
│   └── Cargo.toml
├── .github/workflows/
│   └── ci.yml               # GitHub Actions CI/CD
├── ARCHITECTURE.md
├── SECURITY.md
├── USER_GUIDE.md
├── vercel.json
├── vite.config.js
└── package.json
```
 
---
 
## Technical Architecture

Full architecture: **[ARCHITECTURE.md](./ARCHITECTURE.md)**
 
```
User Device (React PWA)
        ↓
Horizon Frontend (React + Vite)
        ↓
Vercel Serverless Functions (Node.js)
  ├── /api/send-otp.js       → Gmail SMTP OTP
  ├── /api/verify-otp.js     → OTP verification
  └── /api/users.js          → Supabase user management
        ↓
Stellar Blockchain (Testnet)
  ├── Soroban Smart Contract  → Transfer tracking + Fee Sponsorship
  ├── Horizon REST API        → Transaction history + Balance
  └── USDC (stablecoin)       → Currency bridge (AED → USDC → INR)
        ↓
External Services
  ├── Supabase (PostgreSQL)   → Cross-device user database
  ├── open.er-api.com         → Live exchange rates
  └── Gmail SMTP              → Email OTP delivery
```

---

##  Tech Stack
 
| Category | Technology |
|----------|------------|
| Frontend | React 18, Vite, CSS3 |
| Blockchain | Stellar Testnet, Soroban Smart Contracts |
| Wallet | Freighter, LOBSTR, xBull |
| Backend | Vercel Serverless Functions (Node.js) |
| Database | Supabase (PostgreSQL) |
| Email | Nodemailer + Gmail SMTP |
| Exchange Rates | open.er-api.com |
| CI/CD | GitHub Actions |
| Deployment | Vercel |
| Testing | Vitest (38 tests passing) |
 
---

## Smart Contract
 
| Item | Value |
|------|-------|
| **Contract Address** | `CDSVXG7VBBP2IASOP4V4ARRZNVPI2VHX5ARJEY7ZZD6K2WCGFAC54S4V` |
| **Deploy TX Hash** | `41fc8025e30c4a788b2deac516a60cfa761976b185d7b6b61d6c93e5e6043b7d` |
| **Init TX Hash** | `2eaba20d07fab964a757d9b5c957fede094d7009eaa456e4317d537759f41680` |
| **Network** | Stellar Testnet |
| **Explorer** | [View Contract on Stellar Expert](https://stellar.expert/explorer/testnet/contract/CDSVXG7VBBP2IASOP4V4ARRZNVPI2VHX5ARJEY7ZZD6K2WCGFAC54S4V) |
 
| Function | Description |
|----------|-------------|
| `send_remittance(from, to, amount, memo)` | Records and validates cross-border transfer |
| `get_transaction(hash)` | Retrieves transaction details by hash |
| `get_user_transfers(wallet)` | Returns full transfer history for a wallet |

---

## Advanced Features: 

### 1] Fee Sponsorship
 
Horizon implements **Stellar Fee Bump Transactions** for gasless receiving:
 
- Receivers pay **zero XLM fees** when receiving money
- Horizon's fee sponsor account covers all network fees
- Toggle available on the Send page: `Gasless Transfer (Fee Sponsored)`
- Implemented via `StellarSdk.TransactionBuilder.buildFeeBumpTransaction()`
---
 
### 2] Metrics Dashboard
 
Live metrics tracked in-app under the **Metrics** tab:
 
| Metric | Description |
|--------|-------------|
| Daily Active Users (DAU) | Unique users active each day |
| Total Transactions | All on-chain transfers counted |
| User Retention | 7-day and 30-day retention rates |
| Security Status | KYC verified users percentage |
| Transfer Volume | Total XLM/USDC sent through app |
 
**Metrics Screenshot:** 

<img width="1919" height="952" alt="Screenshot 2026-05-01 164627" src="https://github.com/user-attachments/assets/12e96c54-bfed-445a-a896-11ef6d3f22bc" />

<img width="1919" height="945" alt="Screenshot 2026-05-01 164735" src="https://github.com/user-attachments/assets/bbbfbcc5-caed-4772-b63f-3d098dfc04b8" />
 
---
 
### 3] Security
 
Full security checklist: [SECURITY.md](./SECURITY.md)
 
| Check | Status |
|-------|--------|
| Email OTP verification (6-digit, 5-min expiry) | ✅ |
| Max 3 OTP attempts | ✅ |
| KYC document validation (Aadhaar, PAN format) | ✅ |
| Rate limiting on OTP requests | ✅ |
| Environment variables (no secrets in code) | ✅ |
| HTTPS on Vercel deployment | ✅ |
| Stellar Testnet (no real funds at risk) | ✅ |
| PAN card format validation (position by position) | ✅ |
 
---
 
### 4] Data Indexing
 
Horizon uses **Stellar Horizon REST API** for data indexing:
 
| Endpoint | Usage |
|----------|-------|
| `GET /accounts/{address}` | Fetch wallet balance |
| `GET /accounts/{address}/payments` | Transaction history |
| `GET /accounts/{address}/transactions` | Full transaction list |
| `POST /transactions` | Submit signed transaction |
 
Base URL: `https://horizon-testnet.stellar.org`
 
---

## Transaction Flow

```
1. Sender selects receiver
   → Search by name (from registered users)
   → Scan QR code with camera
   → Paste Stellar wallet address

2. Sender enters amount in their local currency
   → e.g., 100 AED

3. App converts using live rates
   → 100 AED = 27.20 USD = 247.27 XLM

4. Sender confirms and clicks Send
   → Freighter wallet signs the transaction
   → Submitted to Stellar Testnet

5. Settlement in 5–10 seconds

6. Receiver gets notified within 8 seconds
   → Red badge on History tab
   → Toast popup: "Money Received! +247.27 XLM"

7. Sender gets receipt
   → Shows all transfer details
   → Save as image or share on WhatsApp
```
---

## Run Locally
## Local Setup

### Prerequisites
- Node.js v18+
- Freighter Wallet browser extension ([freighter.app](https://freighter.app))
- Git

  
### Installation
```bash
# Clone
git clone https://github.com/vishvajitbhagave-dev/Remittance-dApp.git
cd Remittance-dApp/remitchain

# Install
npm install

# Run
npm run dev
# Opens at http://localhost:5173

# Test
npm test
# 38 tests passing

# Build
npm run build
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Environment Variables (for Vercel deployment)
 
| Variable | Description |
|----------|-------------|
| `GMAIL_USER` | Your Gmail address for sending OTP |
| `GMAIL_APP_PASSWORD` | Gmail App Password (16 characters) |
| `OTP_SECRET` | Any random secret string |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_KEY` | Your Supabase anon/public key |
 
---

## Tests

```bash
npm test
```

```
38 tests passing:
  isValidStellarAddress  (6 tests)
  formatBalance          (5 tests)
  shortAddress           (4 tests)
  convertToXLM           (5 tests)
  convertFromXLM         (4 tests)
  calcFee                (2 tests)
  generateOTP            (3 tests)
  CURRENCIES             (5 tests)
  Cache                  (4 tests)
```

---

##  CI/CD Pipeline
 
GitHub Actions runs automatically on every push:
 
1. **Install** — `npm install`
2. **Test** — `npm test` (38 tests, all passing)
3. **Build** — `npm run build`
4. **Deploy** — Auto-deploy to Vercel
**CI/CD Screenshot:**

<img width="959" height="476" alt="image" src="https://github.com/user-attachments/assets/a8a47520-896d-434c-8f47-d9ee522b05e5" />

---

## Roadmap (Next Phase)
 
Based on user feedback, the following improvements are planned:
 
| Priority | Feature | Status |
|----------|---------|--------|
| High     | Dark mode toggle                             | 🔜 Planned |
| High     | Saved contacts / address book                | 🔜 Planned |
| High     | Monthly spending summary on Home             | 🔜 Planned |
| Medium   | Push notifications (PWA)                     | 🔜 Planned |
| Future   | SEP-24 anchor integration (fiat on/off ramp) | 🔜 Future  |
| Future   | Multi-signature support                      | 🔜 Future  |
| Future   | Mainnet launch                               | 🔜 Future  |
 
---
 
## Documentation
 
- [Architecture Document](./ARCHITECTURE.md)
- [Security Checklist](./SECURITY.md)
- [User Guide](./USER_GUIDE.md)
---
 
## Contact
 
**Developer:** Vishvajit Bhagave  
**E-mail:** [vishvajitbhagave@gmail.com](vishvajitbhagave@gmail.com)
**LinkedIn:** [Vishvajit Bhagave](www.linkedin.com/in/vishvajit-bhagave-86b343323)
**Twitter:** [@v_bhagave](@v_bhagave)
**GitHub:** [@vishvajitbhagave-dev](https://github.com/vishvajitbhagave-dev)
 
---
 
## License
 
MIT License — see [LICENSE](LICENSE) for details.
 
---
