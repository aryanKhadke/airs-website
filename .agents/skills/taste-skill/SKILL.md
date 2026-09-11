---
name: design-taste-frontend
description: Anti-slop frontend skill for landing pages, portfolios, and redesigns. The agent reads the brief, infers the right design direction, and ships interfaces that do not look templated. Real design systems when applicable, audit-first on redesigns, strict pre-flight check.
---

# tasteskill: Anti-Slop Frontend Skill

> Landing pages, portfolios, and redesigns. Not dashboards, not data tables, not multi-step product UI.
> Every rule below is **contextual**. None of it fires automatically. First read the brief, then pull only what fits.

---

## 0. BRIEF INFERENCE (Read the Room Before Anything Else)

Before touching code or tweaking dials, **infer what the user actually wants**. Most LLM design output is bad because the model jumps to a default aesthetic instead of reading the room.

### 0.A Read these signals first
1. **Page kind** - landing (SaaS / consumer / agency / event), portfolio (dev / designer / creative studio), redesign (preserve vs overhaul), editorial / blog.
2. **Vibe words** the user used - "minimalist", "calm", "Linear-style", "Awwwards", "brutalist", "premium consumer", "Apple-y", "playful", "serious B2B", "editorial", "agency-y", "glassy", "dark tech".
3. **Reference signals** - URLs they linked, screenshots they pasted, products they named, brands they're competing with.
4. **Audience** - B2B procurement panel vs. design-conscious consumer vs. recruiter scanning a portfolio. The audience picks the aesthetic, not your taste.
5. **Brand assets that already exist** - logo, color, type, photography. For redesigns, these are starting material, not optional input.
6. **Quiet constraints** - accessibility-first audiences, public-sector, regulated industries, trust-first commerce, kids' products. These constraints OVERRIDE aesthetic preference.

### 0.B Output a one-line "Design Read" before generating
Before any code, state in one line: **"Reading this as: <page kind> for <audience>, with a <vibe> language, leaning toward <design system or aesthetic family>."**

Example reads:
- *"Reading this as: B2B SaaS landing for technical buyers, with a Linear-style minimalist language, leaning toward Tailwind utilities + Geist + restrained motion."*
- *"Reading this as: solo designer portfolio for hiring managers, with an editorial / kinetic-type language, leaning toward native CSS + scroll-driven animation + custom typography."*
- *"Reading this as: redesign of a public-sector service site, with a trust-first language, leaning toward GOV.UK Frontend or USWDS."*

### 0.C If the brief is ambiguous, ask one question, do not guess
Ask exactly **one** clarifying question - never a multi-question dump - and only when the design read genuinely diverges. Example: *"Should this feel closer to Linear-clean or Awwwards-experimental?"*

If you can confidently infer from context, **do not ask**. Just declare the design read and proceed.

### 0.D Anti-Default Discipline
Do not default to: AI-purple gradients, centered hero over dark mesh, three equal feature cards, generic glassmorphism on everything, infinite-loop micro-animations everywhere, Inter + slate-900. These are the LLM defaults. Reach past them deliberately based on the design read.

---

## 1. THE THREE DIALS (Core Configuration)

After the design read, set three dials. Every layout, motion, and density decision below is gated by these:

* **`DESIGN_VARIANCE: 8`** - 1 = Perfect Symmetry, 10 = Artsy Chaos
* **`MOTION_INTENSITY: 6`** - 1 = Static, 10 = Cinematic / Physics
* **`VISUAL_DENSITY: 4`** - 1 = Art Gallery / Airy, 10 = Cockpit / Packed Data

**Baseline:** `8 / 6 / 4`. Use these unless the design read overrides them.

### 1.A Dial Inference (design read → dial values)
| Signal | VARIANCE | MOTION | DENSITY |
|---|---|---|---|
| "minimalist / clean / calm / editorial / Linear-style" | 5-6 | 3-4 | 2-3 |
| "premium consumer / Apple-y / luxury / brand" | 7-8 | 5-7 | 3-4 |
| "playful / wild / Dribbble / Awwwards / experimental / agency" | 9-10 | 8-10 | 3-4 |
| "landing page / portfolio / marketing site (default)" | 7-9 | 6-8 | 3-5 |
| "trust-first / public-sector / regulated / accessibility-critical" | 3-4 | 2-3 | 4-5 |
| "redesign - preserve" | match existing | +1 | match existing |
| "redesign - overhaul" | +2 | +2 | match existing |

---

## 2. BRIEF → DESIGN SYSTEM MAP

### 2.A When to reach for a real design system (use official packages)
| Brief reads as… | Reach for | Why |
|---|---|---|
| Microsoft / enterprise SaaS / dashboards | `@fluentui/react-components` | Official Fluent UI, Microsoft tokens |
| Google-ish UI, Material-flavored product | `@material/web` + Material 3 tokens | Official, theme-able via Material Theming |
| IBM-style B2B / enterprise analytics | `@carbon/react` + `@carbon/styles` | Official Carbon, mature data-density patterns |
| Modern accessible React foundation | `@radix-ui/themes` | Primitives + polished theme |
| Modern SaaS where you own the components | shadcn/ui (`npx shadcn@latest add ...`) | You own the code; never ship default state |
| Tailwind-based modern SaaS / AI marketing | Tailwind v4 utilities + `dark:` variant | Default for indie + small team builds |

### 2.B When the brief is an aesthetic, not a system
| Aesthetic | Honest implementation |
|---|---|
| Glassmorphism / "frosted glass" | `backdrop-filter`, layered borders, highlight overlays. Provide solid fallback for reduced transparency. |
| Bento (Apple-style tile grids) | CSS Grid with mixed cell sizes. No single library owns this. |
| Brutalism | Native CSS, monospace, raw borders. No library. |
| Editorial / magazine | Serif or refined sans type, asymmetric grid, generous whitespace. |
| Dark tech / hacker | Mono + accent neon, terminal motifs. |
| Aurora / mesh gradients | Layered subtle radial gradients. |

---

## 3. DEFAULT ARCHITECTURE & CONVENTIONS

### 3.A Stack
* **Framework:** React or Next.js. Default to Server Components (RSC).
* **Styling:** **Tailwind v4** (default).
* **Animation:** **Motion** (`import { motion } from "motion/react"`).
* **Icons:** Allowed: `@phosphor-icons/react`, `hugeicons-react`, `@radix-ui/react-icons`, `@tabler/icons-react`. Discourage hand-rolling raw SVGs or default `lucide-react` overload.
* **Viewport Stability:** NEVER use `h-screen` for full-height Hero sections. ALWAYS use `min-h-[100dvh]` to prevent layout jumping on mobile (iOS Safari address bar).

---

## 4. DESIGN ENGINEERING DIRECTIVES (Bias Correction)

### 4.1 Typography
* **Display / Headlines:** Default `text-4xl md:text-6xl tracking-tighter leading-none`.
* **Body / Paragraphs:** Default `text-base text-gray-600 leading-relaxed max-w-[65ch]`.
* **Sans font choice:** Pick `Geist`, `Outfit`, `Cabinet Grotesk`, or `Satoshi` over vanilla Inter default.
* **Serif Discipline:** Serif is only acceptable when the brand brief explicitly asks for luxury/editorial/heritage. Do NOT mix random serif words into sans headlines.
* **Italic Clearance:** When italic is used with descenders (`y g j p q`), use `leading-[1.1]` minimum to avoid clipping.

### 4.2 Color Calibration
* Max 1 primary accent color. Saturation < 80% by default.
* **The Lila Rule:** Ban default AI-purple/violet button glows and gradients unless explicitly requested. Use neutral bases (Zinc/Slate/Stone) with high-contrast singular accents (Emerald, Electric Blue, Deep Rose, Burnt Orange).
* **Consistency Lock:** Once an accent color is chosen, maintain it consistently across all sections.

### 4.3 Layout Diversification
* **Anti-Center Bias:** Centered Hero/H1 is avoided when `DESIGN_VARIANCE > 4`. Force 50/50 split screens, left-aligned content / right-aligned assets, or asymmetric negative space.
* **Zigzag Alternation Cap:** Never stack more than 2 consecutive alternating left-image/right-text rows. Break the rhythm with full-width statements, bento grids, or vertical cards.
* **Eyebrow Restraint:** Max 1 small uppercase tracking eyebrow per 3 sections. Do not slap an eyebrow over every single headline.

### 4.4 Materiality, Shadows, and Cards
* Use cards only when elevation communicates hierarchy. Otherwise group with subtle borders, hairlines, or whitespace.
* Corner radius scale must be locked: all-sharp, all-soft (12-16px), or documented hybrid.
* Tint drop shadows to the background hue—no pitch-black blur on light surfaces.

### 4.5 Interactive States & Forms
* Always include loading skeletons, empty states, and inline error feedback.
* Active states: use tactile feedback (`:active` with `-translate-y-[1px]` or `scale-[0.98]`).
* Contrast Check: Verify WCAG AA minimum 4.5:1 for body and button copy.
* CTA Button Wrap Ban: Button text must fit on one line at desktop.

### 4.6 Layout Hard Rules
* Hero must fit in the initial viewport on standard displays: headline max 2 lines, subtext max 20 words, CTAs immediately visible.
* Top padding cap: max `pt-24` (≈6rem) on desktop.
* Logo wall belongs under the hero, never jammed inside the hero flexbox.
* Bento cell count rule: Exactly as many cells as real content exists. No blank filler cards.

### 4.7 Image & Asset Strategy
* Use real imagery or generative images suited to the exact aspect ratio.
* Never build "fake screenshot" div spam with dummy toggle switches. Use real component previews or editorial imagery.
* Logo walls must use clean SVGs (e.g. Simple Icons) without distracting category tags.

### 4.8 Content Density & Copy
* Default section shape: short punchy headline (≤ 8 words) + short subtext (≤ 25 words) + primary visual or CTA.
* Copy self-audit: Eliminate pseudo-philosophical AI copy ("crafted for the future of tomorrow"). Write direct, functional, and clear prose.

### 4.9 Quotes & Testimonials
* Max 3 lines of quote text per testimonial. Cut longer reviews down to the single strongest sentence.

---

## 5. PRE-FLIGHT CHECKLIST (Run Before Hand-off)

1. [ ] **Design Read Stated:** Is the tone and target audience clearly identified?
2. [ ] **Dials Respected:** Did layout, motion, and density adhere to the inferred dial scores?
3. [ ] **Color Locked:** Is the single accent color consistent without random neon drifts?
4. [ ] **No AI Slop:** Did we avoid purple gradient blobs, centered hero clichés, and card-in-card nesting?
5. [ ] **Contrast & Accessibility:** Do all texts and interactive controls meet WCAG AA standards?
6. [ ] **Mobile Responsive:** Are explicit `< 768px` breakpoints declared on all multi-column sections?
