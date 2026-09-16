# MIDI Assistant product website

Static site for `midiassistant.rodwilsonmusic.com`. No build step — plain HTML, one stylesheet,
one small script.

- **[PLAN.md](PLAN.md)** — hosting, DNS, email constraints, site map, what is deliberately deferred,
  and the open items. Read it before changing anything infrastructure-related.
- `site.js` — the App Store URLs (one place), nav behaviour, and the home-page hero: scales the 1280×720 video stage, maps the Remote and MainStage screenshots onto the iPad/laptop screens (corner points live here), and loops the clip with a crossfade.
- `_concepts/` — private design explorations (git-ignored). `_parts/` — nav/footer snippets used when assembling pages (git-ignored).
- `downloads/` — files served from the Downloads page. The repo is public: never commit anything meant to be sold.
- `MIDI_ASSISTANT_MUSICIANS_GUIDE.md` / `MIDI_ASSISTANT_TECHNICAL_OVERVIEW.md` — source text for `guide.html` and the PDF.

Deploy: Cloudflare Pages, connected to this repo, build command none, output directory `/`.
