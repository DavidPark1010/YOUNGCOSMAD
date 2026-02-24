# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Young Cosmed — B2B wholesale platform for Korean medical aesthetic products (fillers, skin boosters, botox, lipolytics). React SPA with Express backend and Anthropic Claude AI chatbot integration. Bilingual (English/Korean).

## Commands

- `npm run dev` — Start Vite dev server (port 5173)
- `npm run server` — Start Express backend (port 3001)
- `npm run dev:all` — Run both frontend and backend concurrently
- `npm run build` — Production build via Vite
- `npm run preview` — Preview production build

No test runner or linter is configured.

## Architecture

### Frontend (React 18 + Vite)

**Single-page app with modal-based navigation** — no React Router. Views (Admin, Auth, Chat, Dashboard, ProductDetail, OrderLookup) render as full-screen modals controlled by boolean state in `App.jsx`. Browser back button supported via `window.history.pushState()`.

**State management** — local component state only (useState/useEffect). No Redux/Context. User data persisted to localStorage under key `beautylab_user`.

**i18n** — embedded `content = { en: {...}, ko: {...} }` objects inside components. Language toggled via `lang` state in App.jsx. No i18n library.

**Product categories** — dual-key system: `categoryKey` (machine key like `'filler'`) and `category` (display label like `'Fillers'`). Categories defined in both `en` and `ko` content blocks in App.jsx, plus `validCategories` array for URL param filtering.

### Backend (server.js)

Single Express server file. Main endpoint: `POST /api/chat` — proxies to Anthropic Claude API with product context and conversation history. Requires `ANTHROPIC_API_KEY` in `.env`.

### Key File Locations

- `src/App.jsx` — Main app component, landing page, i18n content, category filtering
- `server.js` — Express backend with AI chat endpoint and product knowledge base
- `src/components/Admin/` — Admin dashboard (products, orders, inquiries, invoices, settings)
- `src/components/Admin/data/adminData.js` — Sample data for admin (inquiries, orders, products)
- `src/components/Admin/data/adminI18n.js` — Admin UI translations
- `src/components/Auth/AuthPage.jsx` — OTP-based email authentication
- `src/components/Chat/ChatRoom.jsx` — AI chatbot for product inquiries
- `src/components/Buyer/BuyerDashboard.jsx` — Buyer dashboard (orders, inquiries, profile)
- `src/components/Product/ProductDetail.jsx` — Product detail modal

## Conventions

- **Components**: PascalCase filenames, functional components with hooks
- **CSS**: One CSS file per component, colocated in same folder. kebab-case class names. Custom CSS variables for theming (no Tailwind/CSS-in-JS)
- **File organization**: Feature-based folders under `src/components/` (Admin, Auth, Chat, Product, Order, Buyer)
- **Product data**: Hardcoded in App.jsx (landing page), adminData.js (admin), and server.js (chat context) — no database
- **Fonts**: Manrope (headings), Inter (body) for English; Pretendard for Korean. Loaded via CDN in index.html
