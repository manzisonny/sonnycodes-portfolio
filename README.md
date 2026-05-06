# Sonny Codes Portfolio OS

A world-class, production-ready personal portfolio built for **Munyurangabo Manzi Sonny**. This system features a real-time GitHub sync engine, a cinematic story-driven landing page, and a private admin dashboard.

## 🚀 Quick Start

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   - Copy `.env.local.example` to `.env.local`.
   - Fill in your Supabase, GitHub, and Resend credentials.

3. **Database Setup:**
   - Run the SQL in `supabase_schema.sql` inside your Supabase SQL Editor.

4. **Run Locally:**
   ```bash
   npm run dev
   ```

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** Supabase (PostgreSQL)
- **Sync Engine:** GitHub REST API (Octokit)
- **Email:** Resend API
- **Deployment:** Vercel (ISR Enabled)

## 📁 Key Features

- **Layer 1 (Public):** Cinematic Landing, Dashboard, Filterable Projects, Skills Visualization, Company Page, Contact/Collab Hub.
- **Layer 2 (Auto-Sync):** Real-time repo fetching from multiple GitHub accounts.
- **Layer 3 (Admin):** Private dashboard to manage messages, collaboration requests, and sync status.

## 🇷🇼 Proudly built in Kigali, Rwanda.
"Do you see someone skilled in their work? They will serve before kings." — Proverbs 22:29
