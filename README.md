# DateFlow

A production-ready SaaS for creating personalised date-planning forms. A host creates a session and shares a unique link; a participant fills the form without signing in; the host views the response from their dashboard.

---

## Architecture

```
UI (React / Next.js Server + Client Components)
  ↓
Server Actions  (thin orchestrators, no SQL)
  ↓
Services        (business logic, no SQL)
  ↓
Repositories    (data access only, no logic)
  ↓
Supabase (PostgreSQL + Auth + RLS)
```

```
src/
├── app/               Next.js App Router pages & layouts
│   ├── (auth)/        Login page
│   ├── (protected)/   Authenticated pages (dashboard, create, settings)
│   ├── session/       Public form pages (no auth required)
│   └── auth/          Supabase OAuth callback route
├── actions/           Server Actions
├── repositories/      Database access layer
├── services/          Business logic layer
├── features/          UI feature modules (landing, auth, dashboard, session)
├── components/        Shared UI components + shadcn-style primitives
├── types/             TypeScript types & ActionResult helpers
├── validations/       Zod schemas
├── constants/         Routes, config, templates
├── utils/             Date formatting, session code generation, etc.
└── lib/supabase/      Supabase browser + server clients
```

---

## Getting Started

### 1. Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account

### 2. Clone & install

```bash
git clone https://github.com/singh9718/dating-application.git dateflow
cd dateflow
npm install
```

### 3. Environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Supabase setup

#### Database migration

Paste the contents of `supabase/migrations/001_initial_schema.sql` into the **Supabase SQL Editor** and run it.

#### Auth providers

In your Supabase project → **Authentication → Providers**, enable:

- **Google** — add your Google OAuth client ID & secret
- **GitHub** — add your GitHub OAuth App client ID & secret
- **Email** — enable magic links (OTP)

Set the **redirect URL** for OAuth to:

```
http://localhost:3000/auth/callback
```

(For production, replace with your Vercel URL.)

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Database Schema

| Table       | Description |
|-------------|-------------|
| `users`     | Extended auth profile, synced via trigger on `auth.users` insert |
| `sessions`  | Date-planning sessions created by hosts |
| `responses` | JSONB answers submitted by participants (schema-free) |

**Session statuses:** `draft` → `shared` → `submitted` → `closed` / `expired`

**RLS rules:**
- `sessions`: host can CRUD own; anyone can SELECT (to render public form)
- `responses`: anyone can INSERT; only session owner can SELECT

---

## Deployment on Vercel

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add environment variables in **Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)
4. Set the Supabase OAuth redirect URL to `https://your-app.vercel.app/auth/callback`
5. Deploy

---

## Tech Stack

- **Next.js 15** (App Router, Server Actions)
- **TypeScript** (strict)
- **Tailwind CSS v3** + shadcn/ui design system
- **Framer Motion**
- **React Hook Form** + **Zod**
- **Supabase** (Auth, PostgreSQL, RLS)
- **Lucide React**

---

## Future Roadmap

- Multiple templates
- AI-generated date plans
- Email invitations
- PDF export
- Payments (premium templates)
- Image uploads
- Team collaboration
