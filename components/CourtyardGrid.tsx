"use client";

import { useEffect, useState } from "react";
import type { Kitchen } from "@/lib/types";

const stalls = [
  { id: "shiro", slug: "shiros", no: "01 · CORNER STALL", name: "Shiro's", tag: "Asian, flavour-forward", desc: "Bold, spice-heavy Asian plates for the table that wants a kick — built for sharing, not solo bowls." },
  { id: "dope", slug: "dope-truck", no: "02 · THE TRUCK", name: "The Dope Truck", tag: "Street food, no frills", desc: "Truck-style comfort food for whoever showed up hungry and doesn't want to wait for it." },
  { id: "midori", slug: "midori-bean", no: "03 · THE CAFÉ", name: "Midori Bean", tag: "Coffee & mocktails", desc: "The slow-down counter — coffee, creative mocktails, and the one drink order that turns into two hours." },
  { id: "shanghai", slug: "tokyo-toki", no: "04 · THE CROWD-PLEASER", name: "Tokyo Toki", tag: "Comfort food", desc: "The stall nobody vetoes — familiar comfort food built to please a table that can't agree on anything else." },
];

export default function CourtyardGrid() {
  const [menu, setMenu] = useState<Kitchen[]>([]);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then(setMenu)
      .catch(() => setMenu([]));
  }, []);

  function toggle(slug: string) {
    if (openSlug === slug) {
      setOpenSlug(null);
      return;
    }
    setOpenSlug(slug);
  }

  const openKitchen = menu.find((k) => k.slug === openSlug);

  const grouped: { category: string; items: any[] }[] = [];
  if (openKitchen) {
    for (const item of openKitchen.items) {
      const cat = item.category ?? "menu";
      let group = grouped.find((g) => g.category === cat);
      if (!group) {
        group = { category: cat, items: [] };
        grouped.push(group);
      }
      group.items.push(item);
    }
  }

  return (
    <div className="courtyard">
      {stalls.map((s) => (
        <button
          key={s.id}
          className="stall"
          id={s.id}
          data-open={openSlug === s.slug}
          onClick={() => toggle(s.slug)}
        >
          <div>
            <span className="stall-no">{s.no}</span>
            <h3 className="stall-name">{s.name}</h3>
            <span className="stall-tag">{s.tag}</span>
          </div>
          <p className="stall-desc">{s.desc}</p>
          <span className="stall-toggle-hint">
            {openSlug === s.slug ? "Close menu ▲" : "View menu ▼"}
          </span>
        </button>
      ))}

      <div className="seating">
        <span className="label">Open Seating</span>
        <p>"pick a table, not a queue"</p>
      </div>

      {openSlug && (
        <div className="menu-expand">
          {!openKitchen ? (
            <p style={{ opacity: 0.6 }}>Loading menu…</p>
          ) : (
            <>
              <div className="menu-expand-head">
                <h4>{openKitchen.name} — full menu</h4>
                <a className="cta-btn" href={"/order?table=1&kitchen=" + openKitchen.slug}>
                  Order from here →
                </a>
              </div>
              {grouped.map((g) => (
                <div key={g.category} className="menu-expand-group">
                  <span className="label menu-expand-category">{g.category}</span>
                  {g.items.map((item: any) => (
                    <div className="menu-expand-line" key={item.id}>
                      <div>
                        <div className="menu-line-name">{item.name}</div>
                        {item.description && (
                          <div className="menu-line-desc">{item.description}</div>
                        )}
                      </div>
                      <div className="menu-line-price">₹{item.price}</div>
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}