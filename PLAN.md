# MIDI Assistant product website — plan and current state

**STATUS:** ACTIVE — written September 16, 2026. This is the single reference for how the product
website is hosted, what it connects to, and what is deliberately deferred. Update it in place.

---

## 1. What exists today (verified September 16, 2026)

### Domain and DNS
| Item | State |
|---|---|
| `RodWilsonMusic.com` | Registered at **GoDaddy**. GoDaddy is the DNS host. |
| Root (`@`) and `www` | **Since Sept 16 2026 evening: the music site moved OFF Bandzoogle.** `www` CNAME → `rodwilsonmusic.pages.dev` (Cloudflare Pages project `rodwilsonmusic`, repo `rodwilsonmusic-sketch/rodwilsonmusic-site`, private). Bare domain → GoDaddy 301 forwarding to `https://www.rodwilsonmusic.com` (root A record is now GoDaddy's forwarders). Mail records verified identical to the snapshot after the change. |
| `midiassistant.rodwilsonmusic.com` | **LIVE since Sept 16 2026.** CNAME → `midiassistant.pages.dev`, added at GoDaddy; Cloudflare verified it and issued HTTPS. Every other record verified identical to the pre-change snapshot (`website-design-ideas/dns-snapshot-rodwilsonmusic.com-2026-09-16.txt`). |

### Email
| Item | State |
|---|---|
| `support@rodwilsonmusic.com` | **Microsoft Exchange.** MX, autodiscover CNAME, SPF/DKIM/DMARC TXT records all live at GoDaddy. |
| Rule | **Never move nameservers off GoDaddy.** Cloudflare will offer to take over DNS during Pages setup — decline. A nameserver move would require re-creating every Exchange record by hand and is where mail breaks. |

### Music site
| Item | State |
|---|---|
| Platform | ~~Bandzoogle Lite~~ — **replaced Sept 16 2026** by a static site (`/Volumes/Music1/GeminiProjects/rodwilsonmusic-site/`), same design family as this one with a gold accent. Bandzoogle content exported to `website-design-ideas/rodwilsonmusic-site/` before the switch. Owner still to cancel the Bandzoogle subscription. |
| What Lite allows | Their templates + Visual Theme Designer + drag-and-drop content blocks. |
| What Lite does not allow | HTML Code block and Custom CSS editor (Standard/Pro only). No plan allows uploading a custom HTML theme. |
| Music hosting | SoundCloud (embedded). |
| Role in this plan | The music site's nav has a "MIDI Assistant" item and a teaser page linking here. |

### Product website (this repo)
| Item | State |
|---|---|
| Source | `/Volumes/Music1/GeminiProjects/midi-assistant-website/` |
| Remote | `https://github.com/rodwilsonmusic-sketch/midi-assistant-website.git` — **public repo**. Anything committed here is world-readable. Never commit anything meant to be sold. |
| Hosting | **Cloudflare Pages**, project `midiassistant` (`midiassistant.pages.dev`), connected to the GitHub repo via the "legacy Pages" flow; every push to `main` auto-deploys. Framework None, no build command, output `/`. Pages serves clean URLs (`/features`), which `site.js` accounts for. |
| Content before this plan | 3 pages (index/support/privacy) written for the TestFlight beta in June 2026; never updated after launch. |
| Content now (Sept 16 2026) | 6 pages rebuilt on the chosen "Concept A" design: live video hero (`assets/stage-loop.mp4`, 10 s locked-off loop of the user's AI-generated stage) with the real Remote and MainStage screenshots mapped in perspective onto the iPad and laptop by `site.js`; animated signal-flow diagram; Sora/Manrope type. |

### The product (facts the site must state correctly)
| Item | State |
|---|---|
| Mac app | **MidiAssistant** 0.2.7 (Build 69), **live on the Mac App Store since September 10, 2026.** Bundle `com.rodwilsonmusic.midiassistant`. Includes two AUv3 plugins (Host FX Mode). Requires macOS 13+. |
| iPad app | **MidiAssistant Remote** 0.2.7 (Build 69), **live on the App Store since September 10, 2026.** Bundle `com.rodwilsonmusic.midiassistantremote`. iPad only. |
| Approved store copy | `MidiAssistantProject/handoffs/App_Store_Metadata.md` §2 — the description that cleared App Review. Site copy should say the same things at a different length, never different things. |
| Long-form docs | `MIDI_ASSISTANT_MUSICIANS_GUIDE.md`, `MIDI_ASSISTANT_TECHNICAL_OVERVIEW.md`, `Musicians Guide for Midi Assistant.pdf` (all in this repo). |
| Icons | `assets/icon-mac.png` ("Bs" — BackStage), `assets/icon-remote.png` (fader trio). Copied from `MidiAssistantProject/design_docs/AppIcons/`. |
| Privacy | No data collection, everything local. Privacy page is required by the App Store and must stay reachable. |

---

## 2. The plan

### Architecture
```
RodWilsonMusic.com  ──────────────  Bandzoogle (music, gigs, mailing list)
        │  nav link "MIDI Assistant"
        ▼
midiassistant.rodwilsonmusic.com ──  Cloudflare Pages ◄── auto-deploy from GitHub repo (main)
```

- **Hosting:** Cloudflare Pages, free tier (unlimited bandwidth, 500 deploys/month, 25 MB per file, no card required). Connected to the GitHub repo; every push to `main` deploys.
- **DNS change (the only one):** at GoDaddy, add `CNAME  midiassistant  →  <project>.pages.dev`. Nothing else changes.
- **Verification step before and after the DNS edit:** screenshot the full GoDaddy DNS record list and confirm the Exchange records (MX, autodiscover, SPF/DKIM/DMARC TXT) are identical afterwards.
- **Why a subdomain and not `rodwilsonmusic.com/midiassistant`:** the path form is impossible — that path is served by Bandzoogle's server. A subdomain also keeps the product site trivially movable to its own domain later (one redirect).

### Site map (phase 1 — building now)
| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, both App Store buttons, feature highlights, how the three pieces fit |
| Features | `features.html` | The full pitch by area: Mixer, Concert Editor, Performance Hub, Host FX, Remote, Routing |
| Downloads | `downloads.html` | Free concerts, SubScreen templates, the Musicians Guide PDF — with version and description per file |
| Guide | `guide.html` | The Musicians Guide as a web page |
| Support | `support.html` | FAQ / troubleshooting, contact |
| Privacy | `privacy.html` | Required by App Store |

Shared: `style.css`, `assets/`, `downloads/` (the actual files).

### Design decisions (Sept 16 2026)
- Three directions were explored privately in `_concepts/` (git-ignored; A = cinematic stage, B = editorial serif, C = warm gear-forward). **A was chosen.**
- Photos carry mood, HTML carries words: the user's AI infographics with baked-in text were retired; the stage photo/video and the Nord photo are the only imagery, plus real app screenshots.
- Hero screens are compositing overlays, not baked into the image: `site.js` holds the four corner points of each screen (measured on the clip's first frame) and maps `assets/remote-full-stage.jpg` and `assets/mac-mainstage.jpg` with a CSS `matrix3d`. Regenerating the clip means re-measuring those corners; swapping which screenshot shows is a one-line change.
- The clip must be **locked-off** (no camera move, no cuts) for the overlays to work. Source is 720p; a 1080p regeneration would sharpen the hero.
- **Screenshots show the owner's real worship setlists ("Glorious Day", "Goodness Of God", …) — deliberately.** The owner is not hiding that he plays Christian worship sets; worship keyboardists are a core MainStage audience and the real setlist reads as proof. Do not replace with a neutral demo Concert. The framing rule: screens say worship, copy says any MainStage keyboardist.
- App Store links live in `site.js` only: Mac `id6769863515` (store name "BackStage - MidiAssistant"), Remote `id6785053481`.

### Downloads
- **Free files only** in phase 1, served as static files from `downloads/`.
- Each entry lists: name, what it is for, MidiAssistant version it was made with, file size.
- Cloudflare's 25 MB per-file cap is far above any concert file seen so far (largest: ~3 MB `.jzml`).
- **Which concerts/templates are free to distribute is still an open question for the owner.** Until answered, the Downloads page carries the Musicians Guide PDF and placeholder slots.

---

## 3. Deliberately deferred (not in phase 1)

| Item | Why deferred | What unlocks it |
|---|---|---|
| **Selling the Mac app direct from the site** | Owner's objective is discount + affiliate codes with payouts, which Apple cannot provide (no codes for paid apps; affiliate program ended 2018; IAP Offer Codes have no attribution/payout). Direct sale is the route, but needs engineering first. | A **Developer ID + notarized** build with a license-key check and an updater (Sparkle). Then a merchant-of-record storefront — Lemon Squeezy first choice (native affiliates, license keys, MoR for tax); Paddle+Rewardful or Gumroad as alternatives. |
| **Buy page and Affiliates page** | Depend on the above. | Same. Slots are reserved in the nav design; pages are not created. |
| **Paid downloads (concert/template packs)** | Same storefront. | Same. |
| **iPad Remote pricing** | Remote cannot be sold outside the App Store, so affiliates can't earn on it. Making it free/nominal and carrying the value in the Mac app is the clean answer. | Owner's pricing decision. |
| **Rule that always applies:** never put "buy cheaper on our site" links or external pricing inside the App Store builds (Guideline 3.1.x). The website is unrestricted; the in-app experience is not. | | |

---

## 4. Open items (owner input needed)
1. ~~App Store URLs~~ — done Sept 16.
2. **Remaining screenshots** — Concert Editor (no capture exists), Remote in Compact and Setlist Only layouts (the four-layouts row shows two placeholders until then).
3. **Which concerts / SubScreen templates are free to give away** — Downloads page shows "coming soon" slots.
4. ~~Cloudflare account~~ — done Sept 16.
5. ~~Bandzoogle nav link~~ — moot; the new music site links here. **Owner to cancel Bandzoogle.**
6. **Mac shot of MainStage + MIDI Assistant windows** for the hero laptop overlay (owner).

~~4. Cloudflare account~~ — create at cloudflare.com (free), then Workers & Pages → Create → Connect to Git → pick this repo. Build command: none. Output directory: `/`.

---

## 5. Change log
- **2026-09-16** — Plan written. Site rebuilt from the 3-page TestFlight version to the phase-1 site map above. Three design concepts explored; Concept A chosen and built with the live video hero. App Store links added. Committed, pushed, deployed to Cloudflare Pages, and live at https://midiassistant.rodwilsonmusic.com the same day; mail records verified unchanged.
