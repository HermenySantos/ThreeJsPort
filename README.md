# Hermenegildo Santos

Black case-study shop-window for [hermenegildosantos.com](https://www.hermenegildosantos.com) — Next.js layout from the original recruiter shop-window, with V4.1 copy and case order.

**Hermenegildo Santos** — Full-stack engineer · AI products & real-time systems · Portugal  
[Portfolio](https://www.hermenegildosantos.com) · [LinkedIn](https://www.linkedin.com/in/hermenegildosantos) · [GitHub](https://github.com/HermenySantos) · [Email](mailto:hermeny7@hotmail.com)

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Vercel

## Product direction

[Portfolio north star](docs/north-star.md) governs copy, assets, and project selection. The live visual is the black shop-window shell (large rounded case cards, two-column hero with delivery-proof metrics).

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm test
npm run build
```

## Site

Home: two-column hero, stacked case cards (AI → visitor → WebAR → Concierge), about, experience, and contact. Case routes at `/cases/ai`, `/cases/visitor`, `/cases/webar`, and `/cases/concierge`. Client identities and internal operational details are omitted. Production deploys from `main`.
