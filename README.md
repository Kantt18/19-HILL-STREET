# 19 Hill Street — project setup

A Next.js + Supabase project: marketing site, menu API, and multi-kitchen
order API in one repo. This is the MVP scope — single venue, no multi-tenancy.

## 1. Open in VS Code
```
code 19-hill-street
```
Install the recommended extensions if prompted (ES7+ React snippets, Tailwind
IntelliSense not required here since this uses plain CSS).

## 2. Install dependencies
```
npm install
```

## 3. Set up Supabase (free tier is fine)
1. Create a project at https://supabase.com
2. Go to the SQL Editor, paste the contents of `supabase/schema.sql`, run it.
   This creates all tables and seeds the four kitchens.
3. Go to Settings > API, copy your Project URL and anon/service_role keys.

## 4. Environment variables
```
cp .env.local.example .env.local
```
Fill in the three values from step 3.

## 5. Run it
```
npm run dev
```
Visit http://localhost:3000

## What's wired up vs. what's still a stub
| Piece | Status |
|---|---|
| Marketing/courtyard page | Live, static copy |
| `GET /api/menu` | Live — reads from Supabase |
| `POST /api/orders` | Live — creates order + fanned-out order_items |
| `GET /api/orders?kitchenId=` | Live — powers a future kitchen-display dashboard (not built yet) |
| QR code per table | Not built — generate a URL like `/order?table=4` and point a QR generator at it |
| Kitchen display UI | Not built — the API is ready, needs a `/kitchen/[slug]` page that polls it |
| Reservations form | Schema exists, no UI/API route yet |
| Auth (staff/owner) | Not started — add before exposing the kitchen dashboard publicly |

## Next build priorities (in order)
1. `/order?table=X` page — customer-facing menu + cart, posts to `/api/orders`
2. `/kitchen/[slug]` — staff view polling `GET /api/orders?kitchenId=`
3. Supabase Row Level Security policies (currently the anon key has open
   read access — fine for dev, not for production)
4. Admin page for the owner to edit menu items without touching the DB directly
