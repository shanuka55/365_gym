create table if not exists public.freelance_trainer_agreements (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text not null,
  date_of_birth date not null,
  emirates_id text not null,
  address text not null,
  emergency_contact_name text not null,
  emergency_contact_phone text not null,
  bank_name text not null,
  account_holder_name text not null,
  iban text not null,
  specializations text not null, -- JSON array as text
  experience_years integer not null,
  available_times text, -- JSON object as text
  bio text,
  qualifications text, -- JSON array as text
  rate_per_session numeric(10, 2),
  signature text not null,
  accepts_terms boolean not null default false,
  accepts_confidentiality boolean not null default false,
  accepts_liability boolean not null default false,
  user_agent text,
  created_at timestamptz not null default now()
);

alter table public.freelance_trainer_agreements enable row level security;

create policy "Anyone can submit trainer agreements"
on public.freelance_trainer_agreements
for insert
to anon, authenticated
with check (accepts_terms = true and accepts_confidentiality = true and accepts_liability = true);
