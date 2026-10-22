import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const pool = new Pool({
  // Unit tests must explicitly opt in to a dedicated database.
  connectionString: process.env.NODE_TEST_CONTEXT
    ? (process.env.TEST_DATABASE_URL || "postgres://test:test@127.0.0.1:1/test")
    : process.env.DATABASE_URL
});

export function query(text, params = []) {
  return pool.query(text, params);
}

export async function migrate() {
  await query(`
    create table if not exists admins (
      id serial primary key,
      name text not null default 'مدير النظام',
      email text not null unique,
      password_hash text not null,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );

    create table if not exists admin_sessions (
      token_hash text primary key,
      admin_id integer not null references admins(id) on delete cascade,
      csrf_token text not null,
      expires_at timestamptz not null,
      created_at timestamptz not null default now()
    );

    create index if not exists admin_sessions_expires_idx on admin_sessions (expires_at);

    alter table admin_sessions add column if not exists last_activity_at timestamptz;
    update admin_sessions set last_activity_at = created_at where last_activity_at is null;
    alter table admin_sessions alter column last_activity_at set default now();
    alter table admin_sessions alter column last_activity_at set not null;

    create table if not exists auth_login_limits (
      scope text not null check (scope in ('ip', 'account')),
      subject_hash text not null,
      attempts integer not null default 0,
      window_started_at timestamptz not null default now(),
      blocked_until timestamptz,
      updated_at timestamptz not null default now(),
      primary key (scope, subject_hash)
    );

    create index if not exists auth_login_limits_updated_idx on auth_login_limits (updated_at);

    create table if not exists admin_upload_limits (
      admin_id integer primary key references admins(id) on delete cascade,
      requests integer not null default 0,
      window_started_at timestamptz not null default now()
    );

    create table if not exists admin_audit_events (
      id bigserial primary key,
      occurred_at timestamptz not null default now(),
      request_id uuid not null,
      action text not null,
      outcome text not null check (outcome in ('success', 'failure', 'blocked')),
      actor_admin_id integer references admins(id) on delete set null,
      subject_hash text,
      target_type text,
      target_id text,
      ip_address text,
      http_status integer not null,
      details jsonb not null default '{}'::jsonb
    );

    create index if not exists admin_audit_events_occurred_idx
      on admin_audit_events (occurred_at desc, id desc);
    create index if not exists admin_audit_events_actor_idx
      on admin_audit_events (actor_admin_id, occurred_at desc);

    create table if not exists products (
      id serial primary key,
      name text not null,
      model text not null unique,
      category text not null,
      brand text not null,
      description text not null,
      features text[] not null default '{}',
      specifications text[] not null default '{}',
      image text not null default '',
      images text[] not null default '{}',
      datasheet_url text not null default '',
      datasheet_urls text[] not null default '{}',
      featured boolean not null default false,
      status text not null default 'available' check (status in ('available', 'unavailable', 'draft')),
      revision integer not null default 1,
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );

    create table if not exists contact_messages (
      id serial primary key,
      name text not null,
      phone text not null,
      email text not null default '',
      subject text not null default '',
      message text not null,
      status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
      whatsapp_number text not null default '',
      created_at timestamptz not null default now(),
      updated_at timestamptz not null default now()
    );

    create table if not exists orders (
      id bigserial primary key,
      request_key uuid not null unique,
      customer_name text not null,
      phone text not null,
      email text not null default '',
      notes text not null default '',
      language text not null check (language in ('ar', 'en', 'fr')),
      status text not null default 'pending_whatsapp' check (status in ('pending_whatsapp', 'confirmed', 'archived')),
      whatsapp_number text not null,
      created_at timestamptz not null default now()
    );

    create table if not exists order_items (
      id bigserial primary key,
      order_id bigint not null references orders(id) on delete cascade,
      product_id integer references products(id) on delete set null,
      product_name text not null,
      model text not null,
      brand text not null,
      category text not null,
      quantity integer not null check (quantity between 1 and 99)
    );

    create index if not exists order_items_order_idx on order_items (order_id);
    create index if not exists orders_created_idx on orders (created_at desc);
    create index if not exists orders_status_created_idx on orders (status, created_at desc, id desc);

    do $$
    begin
      if exists (
        select 1 from pg_constraint
        where conrelid = 'orders'::regclass and conname = 'orders_status_check'
          and pg_get_constraintdef(oid) like '%''sent_whatsapp''%'
      ) then
        if exists (select 1 from orders where status = 'sent_whatsapp') then
          raise exception 'Cannot remove sent_whatsapp status while orders still use it';
        end if;
        alter table orders drop constraint orders_status_check;
      end if;
      if not exists (
        select 1 from pg_constraint
        where conrelid = 'orders'::regclass and conname = 'orders_status_check'
      ) then
        alter table orders add constraint orders_status_check
          check (status in ('pending_whatsapp', 'confirmed', 'archived'));
      end if;
    end $$;

    create index if not exists products_search_idx
      on products using gin (
        to_tsvector('simple', coalesce(name,'') || ' ' || coalesce(model,'') || ' ' || coalesce(brand,'') || ' ' || coalesce(category,''))
      );

    alter table products add column if not exists images text[] not null default '{}';
    alter table products add column if not exists datasheet_urls text[] not null default '{}';
    alter table products add column if not exists revision integer not null default 1;
    update products set images = array[image] where image <> '' and cardinality(images) = 0;
    update products set datasheet_urls = array[datasheet_url] where datasheet_url <> '' and cardinality(datasheet_urls) = 0;

    update products set brand = 'Hikvision', revision = revision + 1 where lower(btrim(brand)) = 'hikvision' and brand <> 'Hikvision';
    update products set brand = 'Ruijie | Reyee', revision = revision + 1 where lower(btrim(brand)) in ('reyee', 'ruijie | reyee') and brand <> 'Ruijie | Reyee';
    update products set category = 'Digital Cameras', revision = revision + 1 where model = 'DS-2CD1343G2-LIU' and category = 'كاميرات المراقبة';
    update products set category = 'Network Switches', revision = revision + 1 where model = 'RG-ES218GC-P' and category = 'الشبكات والسويتشات';
    update products set category = 'NVR/DVR', revision = revision + 1 where model = 'DS-7608NXI-K2' and category = 'أجهزة التسجيل';
    update products set category = 'Network Access Points', revision = revision + 1 where model = 'RG-RAP2260-G' and category = 'نقاط الوصول';
  `);
}

export function mapProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    model: row.model,
    category: row.category,
    brand: row.brand,
    description: row.description,
    features: row.features || [],
    specifications: row.specifications || [],
    image: row.image || row.images?.[0] || "",
    images: row.images?.length ? row.images : (row.image ? [row.image] : []),
    datasheetUrl: row.datasheet_url || row.datasheet_urls?.[0] || "",
    datasheetUrls: row.datasheet_urls?.length ? row.datasheet_urls : (row.datasheet_url ? [row.datasheet_url] : []),
    featured: row.featured,
    status: row.status,
    revision: row.revision,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}
