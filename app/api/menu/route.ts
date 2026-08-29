import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// GET /api/menu — returns all active kitchens with their available items nested.
// This shape is what the customer-facing menu page consumes directly.
export async function GET() {
  const db = supabaseAdmin();

  const { data: kitchens, error: kitchenErr } = await db
    .from("kitchens")
    .select("id, name, slug, accent_color, description")
    .eq("is_active", true);

  if (kitchenErr) {
    return NextResponse.json({ error: kitchenErr.message }, { status: 500 });
  }

  const { data: items, error: itemErr } = await db
    .from("menu_items")
    .select("id, kitchen_id, name, description, price, category, image_url, is_veg")
    .eq("is_available", true);

  if (itemErr) {
    return NextResponse.json({ error: itemErr.message }, { status: 500 });
  }

  const result = kitchens.map((k) => ({
    ...k,
    items: items.filter((i) => i.kitchen_id === k.id),
  }));

  return NextResponse.json(result);
}
