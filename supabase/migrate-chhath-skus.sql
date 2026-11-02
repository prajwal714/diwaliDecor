-- Tailored from live dump (2026-11-02).
-- Affects:
--   product_overrides: chhath-daura, chhath-soop
--   orders: DK-4TL2AP (chhath-sugarcane, chhath-royal-gala)
-- Toran rows / other orders: unchanged.
-- Run in Supabase SQL editor in the same window as the frontend deploy.

-- Preview
select product_id, price, mrp from product_overrides
where product_id in ('chhath-daura', 'chhath-soop', 'chhath-2001', 'chhath-2002');

select public_id, items from orders where public_id = 'DK-4TL2AP';

begin;

update product_overrides
set product_id = 'chhath-2001'
where product_id = 'chhath-daura';

update product_overrides
set product_id = 'chhath-2002'
where product_id = 'chhath-soop';

update orders
set items = (
  select coalesce(jsonb_agg(
    case elem->>'id'
      when 'chhath-sugarcane' then jsonb_set(elem, '{id}', '"chhath-2059"')
      when 'chhath-royal-gala' then jsonb_set(elem, '{id}', '"chhath-2051"')
      else elem
    end
  ), '[]'::jsonb)
  from jsonb_array_elements(items) as elem
)
where public_id = 'DK-4TL2AP';

commit;

-- Verify
select product_id, price, mrp from product_overrides
where product_id in ('chhath-2001', 'chhath-2002');

select public_id, items from orders where public_id = 'DK-4TL2AP';
