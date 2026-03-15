# CLAUDE.md - Portfolio Project

## Project
Personal portfolio for Federico Peralta (federicoperalta.com)

## Stack
- **Framework:** Astro (pure .astro components + vanilla JS `<script>` tags)
- **Styling:** Tailwind CSS v4 + custom dark/light theme via `html.dark`/`html.light` class
- **Animations:** GSAP + ScrollTrigger (imported in bundled `<script>` tags)
- **Backend:** Astro API routes on Cloudflare Workers
- **Email:** Resend (contact form)
- **Deploy:** Cloudflare Workers via `npx wrangler deploy`

## Directory Structure
```
src/
  layouts/Layout.astro     # Base HTML layout (meta tags, splash, scripts)
  pages/
    index.astro            # Homepage
    contact.astro          # Contact page
    api/contact.ts         # POST /api/contact (Resend email, server-side)
  components/
    About.astro            # Pure static (zero JS)
    Experience.astro       # Pure static (zero JS)
    Skills.astro           # Pure static (zero JS)
    Footer.astro           # Pure static (zero JS)
    Hero.astro             # GSAP stagger animations, scrollspy nav, smooth scroll
    ContactCTA.astro       # GSAP letter-by-letter animation on scroll
    ContactForm.astro      # Form with loading/success/error states, company pills
    MouseSpotlight.astro   # Radial gradient following mouse cursor
    ThemeToggle.astro      # Dark/light toggle (localStorage + html class)
  styles/global.css        # Tailwind + dark mode + GSAP initial states
public/
  favicon.svg              # "fp" italic logo
  sitemap.xml              # Sitemap for SEO
```

## Key Concepts

### All Components Are .astro
- Every component is a `.astro` file. No React, no client directives.
- Interactive behavior uses `<script>` tags (bundled by Astro/Vite, supports ES imports).
- Icons are inline SVGs (from Lucide icon set).

### Theme System
- Dark/light via `html` class (`dark`/`light`)
- All components use Tailwind `dark:` variants
- Blocking `<script is:inline>` in Layout.astro reads localStorage before paint
- ThemeToggle.astro toggles the class and saves to localStorage

### Splash Screen
- "fp" in italic, shows on first visit only (sessionStorage flag)
- Managed entirely in Layout.astro with inline scripts

## Rules
- NEVER use em dashes anywhere. Use commas or periods instead.
- Dark mode background: #141414 (not pure black)
- All content text must be in the .astro files or data arrays, not hidden in JS
- Experience data is hardcoded in Experience.astro frontmatter
- Skills data is hardcoded in Skills.astro frontmatter

## Build & Deploy
```bash
pnpm run build          # Astro build (SSG + server)
npx wrangler deploy     # Deploy to Cloudflare Workers
```

## Git Flow
```bash
git add -A
git commit -m "type: description"
git push
```
Commit directly to main. No branches for this project.

## Environment
- RESEND_API_KEY: Wrangler secret (for contact form emails)
- Domain: federicoperalta.com (Cloudflare DNS)
- Repo: https://github.com/peraltafederico/portfolio
