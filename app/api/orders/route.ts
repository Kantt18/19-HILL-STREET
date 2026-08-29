import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

// Expected request body:
// {
//   tableId: string,
//   items: [{ menuItemId: string, kitchenId: string, quantity: number, notes?: string }]
// }
//
// This is the endpoint that makes "one bill, four kitchens" real: a single
// order row, with order_items fanned out across however many kitchens
// the table ordered from.
export async function POST(req: Request) {
  const db = supabaseAdmin();
  const body = await req.json();
  const { tableId, items } = body;

  if (!tableId || !items?.length) {
    return NextResponse.json(
      { error: "tableId and at least one item are required" },
      { status: 400 }
    );
  }

  // 1. Create the parent order
  const { data: order, error: orderErr } = await db
    .from("orders")
    .insert({ table_id: tableId, status: "placed" })
    .select()
    .single();

  if (orderErr) {
    return NextResponse.json({ error: orderErr.message }, { status: 500 });
  }

  // 2. Fan out order_items, each tagged with its own kitchen_id
  const rows = items.map((it: any) => ({
    order_id: order.id,
    menu_item_id: it.menuItemId,
    kitchen_id: it.kitchenId,
    quantity: it.quantity ?? 1,
    notes: it.notes ?? null,
    status: "placed",
  }));

  const { error: itemsErr } = await db.from("order_items").insert(rows);

  if (itemsErr) {
    return NextResponse.json({ error: itemsErr.message }, { status: 500 });
  }

  return NextResponse.json({ orderId: order.id }, { status: 201 });
}

// GET /api/orders?kitchenId=xxx — used by each kitchen's display dashboard
// to pull only ITS queue, filtered by the denormalized kitchen_id.
export async function GET(req: Request) {
  const db = supabaseAdmin();
  const { searchParams } = new URL(req.url);
  const kitchenId = searchParams.get("kitchenId");

  let query = db
    .from("order_items")
    .select("id, order_id, quantity, notes, status, menu_items(name), orders(table_id, created_at)")
    .neq("status", "served")
    .order("id", { ascending: true });

  if (kitchenId) query = query.eq("kitchen_id", kitchenId);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
