You are an elite frontend designer + React/Tailwind developer building the /whop dashboard page for Growzilla (extending our existing codebase). 

CORE BRANDING & DESIGN SYSTEM (obsess over this):
- Color palette EXACTLY like Whop: 
  - Background: #141212 (deep midnight black)
  - Primary accent/orange: #FA4616 (vibrant Dragon Fire)
  - Text primary: #FFFFFF
  - Text secondary: #A1A1AA
  - Borders/dividers: #27272A
  - Success/green accents: #22C55E (subtle)
  - Danger/red accents: #EF4444 (only for drop-offs)
- Full dark mode, ultra-clean minimal aesthetic. Massive negative space, bold sans-serif typography (Inter or system-ui), subtle hover glows and micro-animations (framer-motion or Tailwind transitions). Every element feels premium, scannable, and mobile-first (stack on mobile).
- Whop-inspired UI principles: sharp cards with slight border glow on hover, orange buttons that pop, clean data tables, no clutter, instant visual hierarchy. Use plenty of whitespace and subtle grid layouts.

PAGE STRUCTURE (build this as a single responsive page component):
- Top navbar: Growzilla logo left, "femboyfit Whop Funnel" title, live sync status, date range picker + source filter.
- Hero stats row: 4 big metric cards (Total Revenue, Total Traffic, Conversion Rate, Whale Revenue %) with orange highlights.
- MAIN VISUALIZATION SECTION (the star of the page):
  - Two funnel visualizations displayed side-by-side on desktop (stack vertically on mobile).
  - LEFT COLUMN (35% width): CLASSIC UPSIDE-DOWN CONE FUNNEL
    - Container takes 35% of the main viz area.
    - Placeholder structure for layers (wide at top → narrow at bottom):
      - Layer 1: Top of Funnel (Traffic Sources)
      - Layer 2: Typeform Starts
      - Layer 3: Typeform Completes
      - Layer 4: Whop Checkout
      - Layer 5: Membership Closed (bottom)
    - Leave the actual chart component as a placeholder div with clear labels and comments for where real data/layers will go later.
    - Add space for hover tooltips and revenue labels on each layer.
  - RIGHT COLUMN (65% width): SANKEY DIAGRAM
    - Container takes 65% of the main viz area.
    - Placeholder structure for nodes and flows:
      - Left nodes: Traffic Sources (Airtable/Meta/Whop)
      - Middle nodes: Typeform Stages + Checkout
      - Right nodes: Membership Tiers + Revenue
    - Leave the actual Sankey component as a placeholder div with clear node labels and comments for where real links/flows will go later.
    - Add space for hover tooltips and click areas.
  - Above the two columns: a simple toggle switch "Full View" vs "Whale-Only" that will control both visualizations later.
- Below the main viz: "Whale Insights" section (3-4 card placeholders) + expandable data table placeholder (sortable).
- Everything must be fully responsive, accessible, and use our existing layout wrappers.

Output format:
1. First: Full Tailwind + component code for the entire page layout (use our existing layout wrappers).
2. Second: Separate code blocks for the two funnel placeholder components (Cone left 35% + Sankey right 65%) with clear comments showing where the actual chart libraries and data will slot in later.
3. Third: Any custom CSS variables or layout tips for perfect 35/65 split on desktop.

Make it production-ready, clean, and obsessed with polish — this needs to feel like a $10k SaaS dashboard. Focus ONLY on layout and structure right now.

Start coding now.
