create extension if not exists pgcrypto;

create table if not exists public.membership_agreements (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  date_of_birth date not null,
  emirates_id text not null,
  address text not null,
  emergency_contact_name text not null,
  emergency_contact_phone text not null,
  branch text not null,
  membership_type text not null,
  start_date date not null,
  medical_notes text,
  signature text not null,
  accepts_terms boolean not null default false,
  accepts_health_declaration boolean not null default false,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.membership_agreements enable row level security;

create policy "Anyone can submit membership agreements"
on public.membership_agreements
for insert
to anon, authenticated
with check (accepts_terms = true and accepts_health_declaration = true);
