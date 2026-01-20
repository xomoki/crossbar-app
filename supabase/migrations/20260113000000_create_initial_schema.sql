-- ============================================
-- Migration: 初期スキーマ作成
-- Purpose: CrossBar の基本テーブル構造を作成 (Clerk Auth連携)
-- Tables: companies, users, location_logs, matches, venues
-- ============================================

-- 1. Companies Table
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  domain text not null unique,
  created_at timestamptz default now() not null
);
comment on table public.companies is '企業情報を管理';

-- 2. Users Table
create table public.users (
  id uuid primary key default gen_random_uuid(), -- ClerkのIDではなく内部IDとしても使えるが、連携の簡易さからClerk IDをここに保存するか、別カラムにするか検討。今回はClerk IDを主キーにはせず、clerk_user_idカラムを持たせる一般的な構成にするか、あるいはSupabase Authを使わないのであれば任意のIDでよいが、紐付けのためにclerk_user_idは必須。
  -- ここではプロンプトのベストプラクティスに従い、clerk_user_id を持つ形にする。
  clerk_user_id text unique not null,
  email text not null,
  full_name text,
  company_id uuid references public.companies(id),
  role text check (role in ('Executive', 'Employee')),
  tags text[],
  preferences jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);
comment on table public.users is 'ユーザープロファイル (Clerkと連携)';

-- 3. Location Logs Table
create table public.location_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade not null,
  location geography(POINT, 4326) not null,
  recorded_at timestamptz default now() not null
);
comment on table public.location_logs is 'ユーザーの位置情報履歴';

-- 4. Venues Table
create table public.venues (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  location geography(POINT, 4326),
  category text,
  created_at timestamptz default now() not null
);
comment on table public.venues is '提携店舗情報';

-- 5. Matches Table
create table public.matches (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.users(id) not null,
  receiver_id uuid references public.users(id) not null,
  status text default 'pending' check (status in ('pending', 'accepted', 'ignored')),
  venue_id uuid references public.venues(id),
  created_at timestamptz default now() not null
);
comment on table public.matches is 'マッチング状態管理';


-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS
alter table public.companies enable row level security;
alter table public.users enable row level security;
alter table public.location_logs enable row level security;
alter table public.venues enable row level security;
alter table public.matches enable row level security;

-- Policies

-- Users: 
-- 自分のデータは読み書き可
-- 他人のデータは読み取りのみ可（詳細な制御は後ほど）
create policy "Users can view all users" on public.users
  for select using (true);

create policy "Users can update own data" on public.users
  for update using (clerk_user_id = auth.jwt() ->> 'sub'); -- 注意: Supabase Authを使っていない場合、auth.jwt() は機能しない可能性があるが、Clerk連携のベストプラクティスではSupabaseにもJWTを渡すか、Service Roleで書き込む。
  -- 今回の構成では、フロントエンドから直接書き込むならカスタムJWTが必要だが、
  -- プロンプトの指示通り「Service Roleクライアント経由のupsertによりusersテーブルへ自動反映」するため、
  -- ユーザー自身による直接のINSERT/UPDATEは基本的に発生しない、またはServer Action経由(Service Role)で行う前提とするのが安全。
  -- ただし、SELECTはauthenticatedで通したい。
  -- ここでは一旦、Service Role経由での操作を主とし、SELECTのみ開放する。
  
-- Location Logs:
-- 自分のログは見れる
create policy "Users can view own location logs" on public.location_logs
  for select using (user_id in (select id from public.users where clerk_user_id = auth.jwt() ->> 'sub'));

-- Companies:
-- 誰でも見れる
create policy "Public companies view" on public.companies
  for select using (true);

-- Venues:
-- 誰でも見れる
create policy "Public venues view" on public.venues
  for select using (true);

-- Matches:
-- 自分に関係するマッチのみ見れる
create policy "Users can view own matches" on public.matches
  for select using (
    sender_id in (select id from public.users where clerk_user_id = auth.jwt() ->> 'sub') or
    receiver_id in (select id from public.users where clerk_user_id = auth.jwt() ->> 'sub')
  );

-- ============================================
-- Indexes
-- ============================================
create index idx_users_clerk_id on public.users(clerk_user_id);
create index idx_location_logs_user_id on public.location_logs(user_id);
create index idx_location_logs_location on public.location_logs using GIST (location);
create index idx_venues_location on public.venues using GIST (location);
create index idx_matches_sender on public.matches(sender_id);
create index idx_matches_receiver on public.matches(receiver_id);

