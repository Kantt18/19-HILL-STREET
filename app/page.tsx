import CourtyardGrid from "@/components/CourtyardGrid";

export default function Home() {
  return (
    <>
      <nav>
        <div className="nav-mark">19 <span>HILL</span> STREET</div>
        <div className="nav-links">
          <a href="#courtyard">Kitchens</a>
          <a href="#vibe">The Vibe</a>
          <a href="#visit">Visit</a>
        </div>
      </nav>

      <section className="hero">
        <div className="wrap hero-top">
          <div>
            <div className="hero-eyebrow">
              <span className="dot"></span>
              <span className="label">Now open · Mussoorie Road, Dehradun</span>
            </div>
            <h1 className="hero-title">Four kitchens.<br /><em>One courtyard.</em></h1>
            <p className="hero-sub">Open seating, real greenery, and no reason to rush. Pick a flavour from four kitchens and stay as long as the conversation lasts.</p>
          </div>
        </div>
        <div className="hero-strip">
          <div>Location<strong>Near DIT College</strong></div>
          <div>Setup<strong>Open-air courtyard</strong></div>
          <div>Kitchens<strong>4 under one roof</strong></div>
          <div>For<strong>Students &amp; first dates alike</strong></div>
        </div>
      </section>

      <section className="section" id="courtyard">
        <div className="wrap">
          <div className="section-head">
            <span className="label">The lineup</span>
            <h2>Pick your kitchen. Keep your seat.</h2>
            <p>No shared queue, no single-brand ceiling. Order from any stall, or all four, and it lands at the same table.</p>
          </div>

          <CourtyardGrid />
        </div>
      </section>

      <section className="section vibe" id="vibe">
        <div className="wrap">
          <div className="section-head">
            <span className="label">The setup</span>
            <h2>Built for staying, not turning tables.</h2>
            <p>Open-air, green, and unhurried — the layout does the inviting so the menu doesn&apos;t have to.</p>
          </div>
          <div className="vibe-grid">
            <div className="vibe-card">
              <span className="num">Open air</span>
              <h3>No walls, no rush</h3>
              <p>Courtyard-style seating under open sky — the kind of space that doesn&apos;t clear your table the moment your cup is empty.</p>
            </div>
            <div className="vibe-card">
              <span className="num">Greenery</span>
              <h3>A hill-town breather</h3>
              <p>Planted corners and casual layout — closer to a break in the hills than a food court in a market.</p>
            </div>
            <div className="vibe-card">
              <span className="num">Easy pricing</span>
              <h3>Built for students</h3>
              <p>Priced for the after-college crowd and the Mussoorie Road detour, not just the special-occasion visit.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="visit">
        <div className="wrap">
          <div className="info">
            <div>
              <h2>Come find the courtyard.</h2>
              <div className="info-detail">
                <div className="info-row"><span className="label">Address</span><div>19 Hill Street, near DIT College, Mussoorie Road, Dehradun</div></div>
                <div className="info-row"><span className="label">Hours</span><div>Open daily · check the board out front for kitchen-specific timings</div></div>
                <div className="info-row"><span className="label">Good for</span><div>College breaks, casual dates, group hangouts, Mussoorie Road stopovers</div></div>
              </div>
              <a className="cta-btn" href="https://maps.google.com/?q=19+Hill+Street+Mussoorie+Road+Dehradun" target="_blank" rel="noopener noreferrer">Get directions →</a>
            </div>
            <div className="map-card">
              <div>
                <span className="label">Price range</span>
                <div className="price-scale">
                  <span className="active">₹</span><span className="active">₹</span><span>₹</span><span>₹</span>
                </div>
                <p style={{ marginTop: 18, fontSize: "0.92rem", lineHeight: 1.55, opacity: 0.8 }}>Easy on the pocket across all four kitchens — built for regular visits, not once-a-month splurges.</p>
              </div>
              <div style={{ marginTop: 24, fontFamily: "'Space Mono',monospace", fontSize: "0.72rem", opacity: 0.6 }}>4 KITCHENS · 1 COURTYARD · 0 QUEUE</div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div>© 2026 19 Hill Street, Dehradun</div>
        <div>Shiro&apos;s · The Dope Truck · Midori Bean · Tokyo Toki</div>
      </footer>
    </>
  );
}
