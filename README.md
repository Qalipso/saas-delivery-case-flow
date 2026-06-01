# B2B Underwriting Portal — Delivery Case Study

An interactive, page-flip "book" case study of a B2B insurance underwriting platform: legacy migration, delivery leadership, and a parent/child portal build that cut a three-portal delivery from ~6 to ~4 months.

**Live:** https://shatalov.dev/case-studies/underwriting-portal
**C4 architecture:** https://shatalov.dev/c4

> Anonymized ("Wonderland Inc."). Architecture is described as *influenced/advocated*; delivery and configuration as *owned*; people work as *coordinated*. Quantitative figures are directional.

---

## What this is

A single-page, keyboard-navigable case study rendered as an 11-page horizontal flip-book. It documents a senior delivery role on a fintech underwriting platform — the problem, the role split, the key delivery decision, the C4 architecture, the risk-record user flow, hiring/cadence, outcomes, and an embedded interactive onboarding hub.

It is a portfolio artifact, not a running product: a static export served as a section of [shatalov.dev](https://shatalov.dev).

## Highlights

| | |
|---|---|
| Config team | 3 → 10+ (grown and led) |
| Cross-functional contributors | ~30 (coordinated) |
| Three portals to production | ~4 months (vs ~6 estimated) |
| Architecture | C4 model, levels L1–L3 (Structurizr DSL) |

**Key decision — parent/child parallel build:** two of three requested portals were structurally the same product. Restructured as a parent plus one independent portal, then built the child on the parent's base — collapsing ~6 months sequential into ~4 months parallel.

## Tech stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4**
- **motion** (page-flip transitions) · **mermaid** (diagrams) · **lucide-react** (icons)
- **Static export** (`output: "export"`) under a `basePath`, hosted on a static site
- **C4 site** generated from `structurizr/workspace.dsl` via [structurizr-site-generatr](https://github.com/avisi-cloud/structurizr-site-generatr)

## Project structure

```
app/
  page.tsx          # renders the book at the deploy root
  layout.tsx        # metadata + theme bootstrap (system font stack)
  globals.css       # tokens + book-viewer styles
components/
  BookApp.tsx       # page definitions (content → pages)
  BookViewer.tsx    # flip viewer (keyboard / arrows / dots)
  C4Tabs.tsx        # 3-level C4 viewer (L1/L2/L3 via Mermaid)
  MermaidDiagram.tsx, Zoomable.tsx
  DeliveryTimeline.tsx, OwnershipMatrix.tsx
  OnboardingDemo.tsx, ResourcesBlock.tsx
content/
  underwriting-portal.ts   # single source of truth for all copy/metrics/diagrams
lib/
  base.ts           # BASE_PATH + asset() helper (base-path-aware public URLs)
structurizr/
  workspace.dsl     # C4 model (architecture as code)
public/
  onboarding-hub.html      # embedded interactive onboarding guide
  resources/               # downloadable deck, DSL, architecture appendix
```

## Local development

```bash
pnpm install
pnpm dev            # http://localhost:3020
```

> The app sets `basePath: "/case-studies/underwriting-portal"`, so in dev the book is served at
> `http://localhost:3020/case-studies/underwriting-portal` — the bare root (`/`) returns 404. This is expected.

## Build (static export)

```bash
pnpm build          # emits a fully static site to ./out
```

`out/` is self-contained: all routes, `_next` assets, the onboarding hub, and downloadable resources are prefixed with the base path, so the folder can be dropped under any static host at `…/case-studies/underwriting-portal/`.

## Deployment

The case study is hosted as a static section of [shatalov.dev](https://shatalov.dev):

1. `pnpm build` → `out/`
2. Copy `out/` into the portfolio site at `case-studies/underwriting-portal/`
3. Deploy the portfolio site

The C4 site under `/c4` is generated separately:

```bash
docker run --rm -v "$PWD/structurizr":/var/model -w /var/model \
  ghcr.io/avisi-cloud/structurizr-site-generatr generate-site -w workspace.dsl
```

(The generated site uses relative paths, so it is safe to host under a subdirectory.)

## Architecture

The platform is modeled as C4 (Structurizr DSL). The isolated **Admin & Security** container authorizes every API request and owns its own security schema — a smaller blast radius than touching the full database.

- **L1 — Context:** 3 personas, 2 external edges (bank settlement, one-way legacy migration)
- **L2 — Containers:** the .NET API service as hub; focused containers for documents, billing, reporting; isolated Admin & Security
- **L3 — Components:** Authorization API as the single entry point; Role manager as the only writer; per-environment config resolver; isolated security schema

See [`Architecture-Appendix-C4.md`](./Architecture-Appendix-C4.md) and [`structurizr/workspace.dsl`](./structurizr/workspace.dsl).

## Resources

- Executive deck (PDF, 12 slides) — `public/resources/underwriting-case-deck.pdf`
- C4 model (Structurizr DSL) — `structurizr/workspace.dsl`
- Architecture appendix (Markdown) — `Architecture-Appendix-C4.md`
- Full case write-up — `B2B-Case-Study-Underwriting-Portal.md`
