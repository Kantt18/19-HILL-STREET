-- 19 Hill Street — core schema
-- Run this in Supabase SQL editor, or via psql against any Postgres instance.

create extension if not exists "uuid-ossp";

-- ---------- KITCHENS ----------
create table kitchens (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  accent_color text not null,          -- hex, matches the site's stall accent
  description text,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- ---------- MENU ITEMS ----------
create table menu_items (
  id uuid primary key default uuid_generate_v4(),
  kitchen_id uuid references kitchens(id) on delete cascade,
  name text not null,
  description text,
  price numeric(8,2) not null,
  category text,                        -- e.g. 'mains', 'drinks', 'starters'
  image_url text,
  is_veg boolean default true,
  is_available boolean default true,
  created_at timestamptz default now()
);

-- ---------- TABLES (physical seating) ----------
create table tables (
  id uuid primary key default uuid_generate_v4(),
  table_number int unique not null,
  capacity int not null default 4,
  zone text                              -- e.g. 'courtyard', 'covered'
);

-- ---------- ORDERS ----------
-- One order per table visit. Line items can point to ANY kitchen —
-- this is the one decision that encodes "one bill, four kitchens."
create table orders (
  id uuid primary key default uuid_generate_v4(),
  table_id uuid references tables(id),
  status text not null default 'placed', -- placed | preparing | ready | served | paid
  total numeric(8,2) default 0,
  created_at timestamptz default now()
);

create table order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references orders(id) on delete cascade,
  menu_item_id uuid references menu_items(id),
  kitchen_id uuid references kitchens(id),   -- denormalized on purpose: lets each
                                              -- kitchen's dashboard filter fast
                                              -- without a join through menu_items
  quantity int not null default 1,
  notes text,
  status text not null default 'placed'      -- per-item status, since Shiro's might
                                              -- finish before Midori Bean does
);

-- ---------- RESERVATIONS ----------
create table reservations (
  id uuid primary key default uuid_generate_v4(),
  customer_name text not null,
  phone text not null,
  party_size int not null,
  time_slot timestamptz not null,
  status text default 'requested',       -- requested | confirmed | cancelled
  created_at timestamptz default now()
);

-- ---------- REVIEWS ----------
create table reviews (
  id uuid primary key default uuid_generate_v4(),
  kitchen_id uuid references kitchens(id),
  customer_name text,
  rating int check (rating between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

-- ---------- Seed the four kitchens ----------
insert into kitchens (name, slug, accent_color, description) values
  ('Shiro''s', 'shiros', '#A6432D', 'Bold, spice-heavy Asian plates.'),
  ('The Dope Truck', 'dope-truck', '#1B2B1C', 'Truck-style street food, no frills.'),
  ('Midori Bean', 'midori-bean', '#52633D', 'Coffee and creative mocktails.'),
  ('Shanghai Express', 'shanghai-express', '#D89530', 'Crowd-pleasing comfort food.');

-- Helpful index for the kitchen-display dashboard (Layer 3 from the plan):
create index idx_order_items_kitchen_status on order_items(kitchen_id, status);
