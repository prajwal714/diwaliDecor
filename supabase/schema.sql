-- Run once in the Supabase SQL editor.
-- The shop stays on Vercel. This database only stores orders.
-- Create one email/password user in Authentication and disable public sign-up.

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  public_id text unique not null,
  name text not null,
  mobile text not null,
  email text,
  address1 text not null,
  address2 text,
  city text not null,
  state text not null,
  pin text not null,
  payment text not null check (payment in ('COD', 'UPI')),
  items jsonb not null,
  subtotal integer not null check (subtotal >= 0),
  status text not null default 'placed' check (
    status in ('placed', 'confirmed', 'packed', 'shipped', 'delivered', 'cancelled')
  ),
  tracking_url text,
  tracking_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

revoke all on table public.orders from public, anon, authenticated;
grant select on table public.orders to authenticated;
grant update (status, tracking_url, tracking_note) on table public.orders to authenticated;

alter table public.orders enable row level security;

create policy "admin read orders"
  on public.orders
  for select
  to authenticated
  using (true);

create policy "admin update orders"
  on public.orders
  for update
  to authenticated
  using (true)
  with check (true);

create or replace function public.touch_order()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger orders_touch
  before update on public.orders
  for each row
  execute function public.touch_order();

create or replace function public.generate_public_id()
returns text
language plpgsql
set search_path = public
as $$
declare
  alphabet text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result text := 'DK-';
  i int;
begin
  for i in 1..6 loop
    result := result || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
  end loop;
  return result;
end;
$$;

revoke all on function public.generate_public_id() from public, anon, authenticated;

create or replace function public.create_order(
  p_name text,
  p_mobile text,
  p_email text,
  p_address1 text,
  p_address2 text,
  p_city text,
  p_state text,
  p_pin text,
  p_payment text,
  p_items jsonb,
  p_subtotal integer
)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_mobile text := regexp_replace(coalesce(p_mobile, ''), '\D', '', 'g');
  v_pin text := regexp_replace(coalesce(p_pin, ''), '\D', '', 'g');
  v_items jsonb;
  v_id text;
  attempt int;
begin
  if length(btrim(coalesce(p_name, ''))) = 0
    or length(btrim(coalesce(p_address1, ''))) = 0
    or length(btrim(coalesce(p_city, ''))) = 0
    or length(btrim(coalesce(p_state, ''))) = 0 then
    raise exception 'Missing order details';
  end if;

  if v_mobile !~ '^[6-9][0-9]{9}$' then
    raise exception 'Invalid mobile number';
  end if;

  if v_pin !~ '^[1-9][0-9]{5}$' then
    raise exception 'Invalid PIN code';
  end if;

  if p_payment not in ('COD', 'UPI') then
    raise exception 'Invalid payment method';
  end if;

  if p_subtotal is null or p_subtotal < 0 then
    raise exception 'Invalid total';
  end if;

  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'Order needs at least one item';
  end if;

  select jsonb_agg(
    jsonb_build_object(
      'name', left(btrim(item->>'name'), 200),
      'qty', least(greatest((item->>'qty')::int, 1), 99),
      'price', greatest((item->>'price')::int, 0)
    )
  )
  into v_items
  from jsonb_array_elements(p_items) as item;

  if v_items is null or exists (
    select 1
    from jsonb_array_elements(v_items) as item
    where length(item->>'name') = 0
  ) then
    raise exception 'Each item needs a name';
  end if;

  for attempt in 1..8 loop
    v_id := public.generate_public_id();
    begin
      insert into public.orders (
        public_id, name, mobile, email, address1, address2,
        city, state, pin, payment, items, subtotal
      ) values (
        v_id,
        left(btrim(p_name), 120),
        v_mobile,
        nullif(left(btrim(coalesce(p_email, '')), 200), ''),
        left(btrim(p_address1), 240),
        nullif(left(btrim(coalesce(p_address2, '')), 240), ''),
        left(btrim(p_city), 80),
        left(btrim(p_state), 80),
        v_pin,
        p_payment,
        v_items,
        p_subtotal
      );
      return v_id;
    exception
      when unique_violation then
        null;
    end;
  end loop;

  raise exception 'Could not assign an order id';
end;
$$;

revoke all on function public.create_order(
  text, text, text, text, text, text, text, text, text, jsonb, integer
) from public;
grant execute on function public.create_order(
  text, text, text, text, text, text, text, text, text, jsonb, integer
) to anon, authenticated;

create or replace function public.track_order(p_public_id text, p_mobile text)
returns table (
  public_id text,
  status text,
  city text,
  created_at timestamptz,
  updated_at timestamptz,
  tracking_url text,
  tracking_note text,
  items jsonb
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_mobile text := regexp_replace(coalesce(p_mobile, ''), '\D', '', 'g');
  v_id text := upper(btrim(coalesce(p_public_id, '')));
begin
  if v_mobile !~ '^[6-9][0-9]{9}$' or v_id !~ '^DK-[A-Z2-9]{6}$' then
    return;
  end if;

  return query
  select
    o.public_id,
    o.status,
    o.city,
    o.created_at,
    o.updated_at,
    o.tracking_url,
    o.tracking_note,
    (
      select jsonb_agg(jsonb_build_object('name', item->>'name', 'qty', (item->>'qty')::int))
      from jsonb_array_elements(o.items) as item
    )
  from public.orders o
  where o.public_id = v_id
    and o.mobile = v_mobile;
end;
$$;

revoke all on function public.track_order(text, text) from public;
grant execute on function public.track_order(text, text) to anon, authenticated;
