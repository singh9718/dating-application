-- ─────────────────────────────────────────────────────────────
-- DateFlow – Initial Schema
-- ─────────────────────────────────────────────────────────────

-- Users (mirrors auth.users, extended with profile fields)
create table if not exists public.users (
  id          uuid primary key references auth.users (id) on delete cascade,
  email       text not null,
  name        text,
  avatar_url  text,
  created_at  timestamptz default now() not null
);

alter table public.users enable row level security;

create policy "users_select_own" on public.users
  for select using (auth.uid() = id);

create policy "users_update_own" on public.users
  for update using (auth.uid() = id);

-- Auto-create user profile on sign-up
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.users (id, email, name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Sessions
create table if not exists public.sessions (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid not null references public.users (id) on delete cascade,
  code        text not null unique,
  title       text not null,
  description text,
  status      text not null default 'shared'
                check (status in ('draft', 'shared', 'submitted', 'closed', 'expired')),
  expires_at  timestamptz,
  created_at  timestamptz default now() not null
);

create index if not exists sessions_user_id_idx on public.sessions (user_id);
create index if not exists sessions_code_idx     on public.sessions (code);

alter table public.sessions enable row level security;

-- Host can CRUD their own sessions
create policy "sessions_select_own" on public.sessions
  for select using (auth.uid() = user_id);

create policy "sessions_insert_own" on public.sessions
  for insert with check (auth.uid() = user_id);

create policy "sessions_update_own" on public.sessions
  for update using (auth.uid() = user_id);

create policy "sessions_delete_own" on public.sessions
  for delete using (auth.uid() = user_id);

-- Participants can read a session by code (needed to render the public form)
create policy "sessions_select_public" on public.sessions
  for select using (true);

-- Responses (JSONB answers — no schema changes needed for new templates)
create table if not exists public.responses (
  id           uuid default gen_random_uuid() primary key,
  session_id   uuid not null references public.sessions (id) on delete cascade,
  answers      jsonb not null default '{}',
  submitted_at timestamptz default now() not null
);

create index if not exists responses_session_id_idx on public.responses (session_id);

alter table public.responses enable row level security;

-- Anyone can insert a response (guest submission)
create policy "responses_insert_anon" on public.responses
  for insert with check (true);

-- Only the session owner can read responses
create policy "responses_select_owner" on public.responses
  for select using (
    exists (
      select 1 from public.sessions s
      where s.id = responses.session_id
        and s.user_id = auth.uid()
    )
  );
