# DESIGN.md — Bayu Ariyadi Portfolio

## Identity
**Product:** Personal portfolio of Bayu Ariyadi — CS Graduate, Homelab Builder, AI Enthusiast
**Audience:** Technical recruiters, fellow engineers, AI/homelab community, potential collaborators
**Personality:** Technical depth, honest, experimental, slightly playful (wibu), no marketing fluff

## Visual Language
**Style:** Terminal/Hacker aesthetic with purpose — monospace for code/data, sans-serif for reading. Dark default (developer tool context). Green/cyan accent for "live/system OK" signals.

## Palette
- **Core 1 (BG):** `#090a0f` — near-black, terminal base
- **Core 2 (Card):** `#12131c` — elevated surface
- **Core 3 (Border):** `#1e2030` — subtle separation
- **Accent:** `#10b981` (emerald) — success, live, active, "system OK"
- **Accent Dim:** `#059669` — hover/pressed
- **Muted:** `#94a3b8` — secondary text, comments
- **Text:** `#f1f5f9` — primary reading

Neutral greys don't count toward core palette (R-29).

## Typography
- **Sans:** `Plus Jakarta Sans` — geometric, readable, technical but human. Weights 400/500/600/700/800.
- **Mono:** `Fira Code` — ligatures for code, terminal output, specs. Weights 400/500/700.
- **Reason:** Sans for narrative comfort; Mono for data density & terminal identity. Not "terminal aesthetic" everywhere (R-06).

## Dials
- **ENERGY: 2** — Balanced. Says hello with live terminal widget + matrix rain, not screaming.
- **RHYTHM: 3** — Varied sections. Hero (split), About (2 cards), Projects (3 cards), Homelab (specs grid), Skills (tag cloud), Experience (timeline), Terminal Playground (interactive), Contact (CTA). Each section composition differs.
- **MOTION: 2** — Scroll-reveal + hover transitions + terminal typing + live uptick. No parallax/pin.

## Identity Motif
- **Terminal prompt `$`** as recurring glyph: appears in hero terminal, section headers, interactive terminal.
- **Green dot indicator** (●) for "live/active" status — hero badge, uptime, service health.
- **Monospace inline** for technical terms (commands, specs, model names).

## What This Is Not
- No fake terminal window as hero visual (R-05) — the terminal in hero is a **live widget** showing real uptime + system info.
- No glassmorphism everywhere (R-10) — only navbar has subtle backdrop-blur for sticky context.
- No generic gradients (R-01) — solid colors, accent only on interactive focus.
- No em dashes (R-02) — commas, periods, colons only.
- No "AI Powered" badges (R-09) — real tech tags only.
- No fabricated stats/testimonials (R-17, R-18, R-36, R-38).

## Components Map
| Component | Purpose | Interactive? |
|-----------|---------|--------------|
| Header/Nav | Sticky context, scroll-reveal | Links anchor to real sections |
| Hero | Identity + live terminal widget | Terminal shows real uptime counter |
| About | Background + Philosophy | No |
| Projects | 3 featured cards with real links | External links to GitHub/live |
| Skills | Categorized tag cloud | Filter by category (keyboard accessible) |
| Experience | Vertical timeline | No |
| Homelab | Specs grid (mono) | No |
| Terminal Playground | Real interactive terminal | **Yes** — user types commands |
| Contact | CTA with real mailto/links | External actions |
| Footer | Copyright + deploy info | No |

## Dial Check
- ENERGY 2: Live terminal + matrix rain subtle = balanced hello
- RHYTHM 3: 9 sections, each different layout = varied
- MOTION 2: Scroll reveal + hover + typing + live counter = meaningful