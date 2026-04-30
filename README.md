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

## 👥 Verified Users (30+)
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
📊 **Exported Responses:** *https://docs.google.com/spreadsheets/d/1E2giGbPvbbbbly2iVsqqDkaGcxOZ3u6jZJEAyXJJ3Gs/edit?resourcekey=&gid=700985705#gid=700985705*
 
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
## Architecture

```
Horizon Frontend (React + Vite)
Deployed on Vercel
        |
        |-- src/App.jsx          Main application (2400+ lines)
        |-- src/stellar.js       All blockchain logic
        |-- src/translations.js  30 language support
        |-- src/icons.jsx        Professional SVG icon system
        |-- src/App.css          All styling
        |-- contract/lib.rs      Soroban smart contract (Rust)
        |
        v
Stellar Testnet
        |
        |-- Horizon API     https://horizon-testnet.stellar.org
        |   Balances, transactions, payments
        |
        |-- Soroban RPC     https://soroban-testnet.stellar.org
        |   Smart contract calls
        |
        |-- Freighter Wallet (browser extension)
            Keypair storage and transaction signing

External APIs
        |-- open.er-api.com      Live exchange rates
        |-- api.qrserver.com     QR code image generation
        |-- stellar.expert       Transaction explorer
        |-- friendbot.stellar.org Fund testnet accounts
```

---

## Blockchain Details

| Detail | Value |
|--------|-------|
| Network | Stellar Testnet |
| Horizon URL | https://horizon-testnet.stellar.org |
| Soroban RPC | https://soroban-testnet.stellar.org |
| Contract ID | `CDSVXG7VBBP2IASOP4V4ARRZNVPI2VHX5ARJEY7ZZD6K2WCGFAC54S4V` |
| Fee per transfer | 0.1 XLM (approximately Rs.1.80) |
| Settlement time | 5–10 seconds |
| Native asset | XLM (Lumens) as bridge currency |

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

## Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18 | Frontend UI framework |
| Vite | 5 | Build tool |
| @stellar/stellar-sdk | latest | Blockchain interactions |
| Freighter API | latest | Browser wallet |
| Rust + Soroban SDK | latest | Smart contract |
| Vitest | 1.6 | Unit testing |
| GitHub Actions | — | CI/CD pipeline |
| Vercel | — | Deployment |

---

## Smart Contract

**File:** `contract/src/lib.rs`  
**Language:** Rust  
**SDK:** Soroban SDK  
**Contract ID:** `CDSVXG7VBBP2IASOP4V4ARRZNVPI2VHX5ARJEY7ZZD6K2WCGFAC54S4V`

The contract validates remittance transactions and emits events for on-chain tracking.

---

## Run Locally

**Requirements:** Node.js 20+, Freighter Wallet browser extension

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

## CI/CD Pipeline

Every push to `master` or `main` branch automatically:

1. Installs dependencies
2. Runs all 38 tests
3. Builds the production app

Pipeline fails if any test fails or build breaks.

**GitHub Actions:** https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions

---

## Project Structure

```
remitchain/
├── src/
│   ├── App.jsx              Main React application
│   ├── App.css              All styles
│   ├── stellar.js           Blockchain logic + 100+ currencies
│   ├── translations.js      30 language support
│   ├── icons.jsx            Professional SVG icon system
│   ├── main.jsx             Entry point
│   └── __tests__/
│       ├── stellar.test.js  38 unit tests
│       └── setup.js         Test setup
├── contract/
│   └── src/lib.rs           Soroban smart contract (Rust)
├── .github/
│   └── workflows/ci.yml     GitHub Actions CI/CD
├── public/
├── vercel.json              Vercel deployment config
├── vite.config.js           Vite + Vitest config
├── package.json
├── README.md                This file
└── ARCHITECTURE.md          Detailed architecture document
```

---

## Submission Checklist

- [x] MVP fully functional and deployed
- [x] Live demo link (Vercel)
- [x] Demo video
- [x] 5+ real testnet users with verifiable wallet addresses
- [x] User feedback documented with iterations
- [x] Architecture document (ARCHITECTURE.md)
- [x] CI/CD pipeline (GitHub Actions)
- [x] 10+ meaningful commits
- [x] Smart contract deployed on Stellar Testnet
- [x] README with all required documentation

---

## Level Progression

| Level | Belt | Status |
|-------|------|--------|
| 1 | White Belt | Done |
| 2 | Yellow Belt | Done |
| 3 | Orange Belt | Done |
| 4 | Green Belt | Done |
| 5 | Blue Belt | **Submitting now** |
| 6 | Red Belt | Next |

---

## Developer

**Vishvajit Bhagave**
Stellar Journey to Mastery — Level 5 Blue Belt
GitHub: https://github.com/vishvajitbhagave-dev
