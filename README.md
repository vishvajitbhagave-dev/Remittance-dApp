# Horizon — Instant Cross-Border Remittance on Stellar

> Send money home instantly for less than ₹2 fee using Stellar blockchain.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://remittance-d-app.vercel.app)
[![Stellar](https://img.shields.io/badge/Network-Stellar%20Testnet-blue?style=for-the-badge)](https://stellar.org)
[![CI/CD](https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions/workflows/ci.yml/badge.svg)](https://github.com/vishvajitbhagave-dev/Remittance-dApp/actions)

---

## The Problem

Migrant workers send $800 billion/year back home. Traditional services charge 3–7% fees and take 1–3 days.

**Horizon solves this** using Stellar blockchain:
- Less than Rs.2 fee (0.1 XLM)
- 5–10 second settlement
- Live exchange rates for 100+ currencies
- KYC-compliant (SEP-12 protocol)

---

## Live Demo

**https://remittance-d-app.vercel.app**

Demo Video: 

https://drive.google.com/file/d/1Kiv2wedAoCbWgTu8k3fvKrs3VANoJa7V/view?usp=sharing
---

## Testnet Users

| User | Wallet Address | Country |
|------|---------------|---------|
| User 1 | GBPRWZNXA35EIBOVCSNWKHEBRXHG5FQRUNTH4FNL3DKK4TCXRUOBZ6EJ | India |
| User 2 | GCLGE5VJFCZDWSPER46BOHKUZJVGGQFDUGGYR22S3HSKYVRJDRQ4RJVU | UAE |
| User 3 | GCRVRBRQW55PGVAMGPSGPEV6LOABEZNIVT6TLW2FGKUIFX3MBVOZYGXG | Philippines |
| User 4 | GA2VJZ7PMHW2YPEFZTEDXSAWEU57K66N2G7FMSZ3DDLRJZWRL4V3FOEK | Bangladesh |
| User 5 | GA3JCZMJKM42J6Z732RKTQ5LWSDYAD7DCZIISAWR55HPPQ25EPK5N4KW | India |

---

## Features

- Send Money — instant cross-border transfer via XLM
- Receive — QR code generation, scannable by any camera
- History — full transaction history with search, filter, PDF export
- Notifications — real-time incoming payment alerts
- Multi-language — 30 languages including Hindi, Marathi, Arabic
- Live Rates — real-time exchange rates for 100+ currencies
- Transfer Receipt — PDF receipt with WhatsApp share
- QR Scanner — camera-based scanning to auto-fill receiver
- Invite Friends — referral system
- Profile — photo upload, KYC details, wallet address copy

---

## Architecture
Full Architecture Document: [ARCHITECTURE.md](./ARCHITECTURE.md)
```
Horizon Frontend (React + Vite → Vercel)
        |
        |--- Auth / KYC Flow (localStorage)
        |--- Send / Receive (Stellar SDK)
        |--- History / Search (Horizon REST API)
        |
        v
Stellar Testnet
  |-- Horizon API    https://horizon-testnet.stellar.org
  |-- Soroban RPC    https://soroban-testnet.stellar.org
  |-- Freighter Wallet (browser extension)
  |-- Contract ID    CDSVXG7VBBP2IASOP4V4ARRZNVPI2VHX5ARJEY7ZZD6K2WCGFAC54S4V

External Services
  |-- open.er-api.com     (live exchange rates)
  |-- api.qrserver.com    (QR code generation)
  |-- stellar.expert      (transaction explorer)
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5 |
| Blockchain | Stellar Testnet, Soroban Smart Contracts |
| Wallet | Freighter Browser Extension |
| Smart Contract | Rust (Soroban SDK) |
| Deployment | Vercel |
| CI/CD | GitHub Actions |
| Testing | Vitest (38 tests passing) |

---

## Blockchain Details

| Detail | Value |
|--------|-------|
| Network | Stellar Testnet |
| Horizon URL | https://horizon-testnet.stellar.org |
| Soroban RPC | https://soroban-testnet.stellar.org |
| Contract ID | CDSVXG7VBBP2IASOP4V4ARRZNVPI2VHX5ARJEY7ZZD6K2WCGFAC54S4V |
| Fee | 0.1 XLM (approx Rs.1.80) |
| Settlement Time | 5–10 seconds |

---

## Run Locally

```bash
git clone https://github.com/vishvajitbhagave-dev/Remittance-dApp.git
cd Remittance-dApp/remitchain
npm install
npm run dev
```

Requires Node.js 20+ and Freighter Wallet browser extension.

---

## Tests

```bash
npm test
# 38 tests passing
```

---

## User Feedback

Feedback Document: *(add your Google Doc link here)*

---

## Project Structure

```
remitchain/
├── src/
│   ├── App.jsx           Main React app
│   ├── App.css           All styles
│   ├── stellar.js        Blockchain logic + 100+ currencies
│   ├── translations.js   30 language support
│   ├── icons.jsx         Professional SVG icon system
│   └── __tests__/        38 unit tests
├── contract/
│   └── src/lib.rs        Soroban smart contract (Rust)
├── .github/workflows/
│   └── ci.yml            GitHub Actions CI/CD
└── vercel.json           Deployment config
```

