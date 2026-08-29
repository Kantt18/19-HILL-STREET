-- 1. Rename Shanghai Express -> Tokyo Toki (name + slug, so /kitchen/[slug] stays consistent)
update kitchens
set name = 'Tokyo Toki', slug = 'tokyo-toki'
where slug = 'shanghai-express';

-- 2. Menu items, one block per kitchen, looked up by slug so you don't need
--    to know the UUIDs by hand.

insert into menu_items (kitchen_id, name, description, price, category, is_veg) values
  ((select id from kitchens where slug = 'shiros'), 'Chilli Garlic Noodles', 'Wok-tossed noodles, sharp chilli-garlic heat.', 180, 'mains', true),
  ((select id from kitchens where slug = 'shiros'), 'Dragon Chicken', 'Crisp-fried chicken tossed in a sweet-spicy glaze.', 220, 'mains', false),
  ((select id from kitchens where slug = 'shiros'), 'Chicken Dimsum (6 pc)', 'Steamed, served with chilli oil.', 160, 'starters', false),
  ((select id from kitchens where slug = 'shiros'), 'Veg Manchurian', 'Crisp veg balls in a tangy dark sauce.', 150, 'starters', true);

insert into menu_items (kitchen_id, name, description, price, category, is_veg) values
  ((select id from kitchens where slug = 'dope-truck'), 'Classic Cheese Burger', 'Grilled patty, melted cheese, house sauce.', 160, 'mains', false),
  ((select id from kitchens where slug = 'dope-truck'), 'Loaded Fries', 'Fries piled with cheese sauce, jalapeños, and dip.', 140, 'sides', true),
  ((select id from kitchens where slug = 'dope-truck'), 'Paneer Tikka Wrap', 'Smoky paneer, mint chutney, rolled tight.', 150, 'mains', true),
  ((select id from kitchens where slug = 'dope-truck'), 'Chicken Popcorn', 'Bite-sized, crunchy, spiced.', 130, 'sides', false);

insert into menu_items (kitchen_id, name, description, price, category, is_veg) values
  ((select id from kitchens where slug = 'midori-bean'), 'Cold Brew', 'Slow-steeped, smooth, no bitterness.', 130, 'drinks', true),
  ((select id from kitchens where slug = 'midori-bean'), 'Blue Lagoon Mocktail', 'Citrus, mint, a splash of blue curaçao syrup.', 150, 'drinks', true),
  ((select id from kitchens where slug = 'midori-bean'), 'Cappuccino', 'Classic, made properly.', 110, 'drinks', true),
  ((select id from kitchens where slug = 'midori-bean'), 'Belgian Waffle', 'Crisp outside, soft inside, maple syrup.', 170, 'desserts', true);

insert into menu_items (kitchen_id, name, description, price, category, is_veg) values
  ((select id from kitchens where slug = 'tokyo-toki'), 'Chicken Ramen', 'Rich broth, soft-boiled egg, scallions.', 210, 'mains', false),
  ((select id from kitchens where slug = 'tokyo-toki'), 'Veg Hakka Noodles', 'Classic stir-fried street-style noodles.', 150, 'mains', true),
  ((select id from kitchens where slug = 'tokyo-toki'), 'Chicken Momos (8 pc)', 'Steamed, served with a spicy dip.', 150, 'starters', false),
  ((select id from kitchens where slug = 'tokyo-toki'), 'Honey Chilli Potato', 'Crisp potato, sweet-spicy glaze.', 140, 'starters', true);