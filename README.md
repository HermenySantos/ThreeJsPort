<h1 align="center">Hermenegildo Santos — Developer Portfolio</h1>

<p align="center">
  An interactive <b>3D portfolio</b> built with React Three Fiber (Three.js), GSAP, and Framer Motion —
  featuring a live command-rig hero scene, an interactive globe, a 3D project showcase, and an AI agent section.
</p>

<p align="center">
  <a href="https://three-js-port-hermenysantos-projects.vercel.app"><b>🌐 Live Site → three-js-port-hermenysantos-projects.vercel.app</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Three.js-000000?logo=threedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Three_Fiber-black?logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?logo=greensock&logoColor=black" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?logo=framer&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white" />
</p>

---

## ✨ Highlights

- **3D command-rig hero** — an interactive Three.js scene rendered with React Three Fiber + Drei, animated with GSAP.
- **Interactive globe** — clickable work locations (Geneva, Warsaw, Luanda, Windhoek, New Delhi, Santiago, Covilhã) via `react-globe.gl`.
- **3D project showcase** — a rendered computer that plays per-project slideshows/videos with smooth transitions.
- **AI agent section** — a conversational representative embedded in the page.
- **Live GitHub contributions** — pulled through serverless functions (`/api/github`) using the GitHub REST + GraphQL APIs.
- **Contact form** — EmailJS-powered, with validation and inline alerts.
- **Responsive + performance-conscious** — adaptive canvas DPR scaling, `Suspense` lazy-loading, and multiple breakpoints.

## 🧱 Tech Stack

| Layer | Tools |
| --- | --- |
| **Core** | React 18, Vite 5 |
| **3D / Animation** | Three.js, React Three Fiber, Drei, GSAP, Framer Motion, Maath, Leva |
| **UI** | Tailwind CSS, react-globe.gl, react-responsive |
| **Services** | EmailJS (contact), Octokit REST + GraphQL (GitHub stats) |
| **Deploy** | Vercel (SPA rewrites via `vercel.json`) |

## 📂 Structure

```
src/
├── sections/      # Hero, About, Projects, Experience, AIAgentSection, Contact, Navbar, Footer
├── components/    # 3D components — HackerRoom, CommandRigScene, DemoComputer, GitHubContributions…
├── constants/     # Content data (projects, skills, experience)
├── hooks/         # useAlert
└── App.jsx
api/github/        # Serverless endpoints: contributions.js, stats.js
public/assets/     # Images, icons, fonts, models
```

## 🚀 Run Locally

```bash
git clone https://github.com/HermenySantos/ThreeJsPort.git
cd ThreeJsPort
npm install
cp .env.example .env   # then fill in the values below
npm run dev            # http://localhost:5173
```

**Build & preview**

```bash
npm run build
npm run preview
```

## 🔑 Environment Variables

Create a `.env` from `.env.example`:

```bash
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
GITHUB_TOKEN=your_github_token   # optional — powers the live GitHub contributions widget
```

The GitHub contributions widget falls back to the public API (public repos only) if the serverless endpoints or token aren't configured. Analytics: replace the Google Analytics ID in `index.html` with your own if you fork this.

## 🙌 Credits

3D models sourced from Sketchfab, [ReadyPlayerMe](https://readyplayer.me/), and [Mixamo](https://www.mixamo.com/); GLTF components generated with [gltfjsx](https://gltf.pmnd.rs/). Initial 3D scene scaffolding inspired by a JS Mastery tutorial, then extended substantially with custom sections (AI agent, project slideshows, live GitHub stats) and original content.

## 📫 Contact

**Hermenegildo Santos** — Full-Stack AI Engineer
[Portfolio](https://three-js-port-hermenysantos-projects.vercel.app) · [LinkedIn](https://www.linkedin.com/in/hermenegildosantos) · [Email](mailto:hermeny7@hotmail.com)
