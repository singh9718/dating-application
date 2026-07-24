-- Create date_preferences table
create table if not exists public.date_preferences (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  preferred_date date not null,
  preferred_time text not null,
  date_type text not null,
  cuisine text not null,
  budget integer not null check (budget >= 500 and budget <= 5000),
  mood text not null,
  outfit text not null,
  note text,
  created_at timestamptz default now() not null
);

-- Enable Row Level Security
alter table public.date_preferences enable row level security;

-- Allow anonymous inserts only (no reads via anon key)
create policy "allow_anon_insert"
  on public.date_preferences
  for insert
  to anon
  with check (true);
