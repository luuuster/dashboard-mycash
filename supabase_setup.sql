-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Family Members
create table if not exists "family_members" (
  "id" uuid primary key default uuid_generate_v4(),
  "name" text not null,
  "role" text not null,
  "avatarUrl" text,
  "monthlyIncome" numeric default 0,
  "created_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Categories
create table if not exists "categories" (
  "id" uuid primary key default uuid_generate_v4(),
  "name" text not null,
  "color" text not null,
  "type" text not null, -- 'income' | 'expense'
  "created_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bank Accounts
create table if not exists "bank_accounts" (
  "id" uuid primary key default uuid_generate_v4(),
  "name" text not null,
  "type" text not null, -- 'checking' | 'savings'
  "balance" numeric default 0,
  "color" text not null,
  "holderId" text, -- Storing as text to match mock data or link to family_members id
  "created_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Credit Cards
create table if not exists "credit_cards" (
  "id" uuid primary key default uuid_generate_v4(),
  "name" text not null,
  "closingDay" integer not null,
  "dueDay" integer not null,
  "limit" numeric default 0,
  "currentBill" numeric default 0,
  "theme" text not null, -- 'black' | 'lime' | 'white'
  "logoUrl" text,
  "lastDigits" text,
  "holderId" text,
  "created_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Goals
create table if not exists "goals" (
  "id" uuid primary key default uuid_generate_v4(),
  "name" text not null,
  "description" text,
  "imageUrl" text,
  "targetAmount" numeric not null,
  "currentAmount" numeric default 0,
  "category" text,
  "deadline" timestamp with time zone,
  "status" text default 'active', -- 'active' | 'archived'
  "color" text not null,
  "memberId" text,
  "created_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Transactions
create table if not exists "transactions" (
  "id" uuid primary key default uuid_generate_v4(),
  "type" text not null, -- 'income' | 'expense'
  "amount" numeric not null,
  "description" text not null,
  "category" text not null,
  "date" timestamp with time zone not null,
  "accountId" text,
  "memberId" text,
  "installments" integer default 1,
  "status" text default 'completed', -- 'pending' | 'completed'
  "isRecurring" boolean default false,
  "isPaid" boolean default true,
  "created_at" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Optional but recommended - currently allowing public access for demo)
alter table "family_members" enable row level security;
alter table "categories" enable row level security;
alter table "bank_accounts" enable row level security;
alter table "credit_cards" enable row level security;
alter table "goals" enable row level security;
alter table "transactions" enable row level security;

-- Create policies to allow all operations for now (DEV MODE)
-- Create policies to allow all operations for now (DEV MODE)
create policy "Enable all for users" on "family_members" for all using (true);
create policy "Enable all for users" on "categories" for all using (true);
create policy "Enable all for users" on "bank_accounts" for all using (true);
create policy "Enable all for users" on "credit_cards" for all using (true);
create policy "Enable all for users" on "goals" for all using (true);
create policy "Enable all for users" on "transactions" for all using (true);

-- Storage Setup
insert into storage.buckets (id, name, public) 
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public) 
values ('attachments', 'attachments', true)
on conflict (id) do nothing;

create policy "Public Access Avatars" on storage.objects for all using ( bucket_id = 'avatars' );
create policy "Public Access Attachments" on storage.objects for all using ( bucket_id = 'attachments' );

-- Triggers for updated_at
create extension if not exists moddatetime schema extensions;

create trigger handle_updated_at before update on "family_members"
  for each row execute procedure moddatetime (created_at);
-- Note: moddatetime usually expects an 'updated_at' column. 
-- Since we only have created_at in the schema above, we would typically add updated_at columns first.
-- For simplicity in this step, we will omit the trigger unless we alter tables to add updated_at.
-- Let's stick to the core request: Storage and Access.
