export const navLinks = [
  {
    id: 1,
    name: 'Home',
    href: '#home',
  },
  {
    id: 2,
    name: 'About',
    href: '#about',
  },
  {
    id: 3,
    name: 'Work',
    href: '#work',
  },
  {
    id: 4,
    name: 'AI Agent',
    href: '#ai-agent',
  },
  {
    id: 5,
    name: 'Contact',
    href: '#contact',
  },
];

export const clientReviews = [];

export const myProjects = [
  {
    title: 'PMI AI Moderator — Live Event AI',
    desc: 'A human-in-the-loop AI moderator built for live PMI panels. Generates contextual responses with Azure OpenAI GPT-4o, voices them in real-time via gpt-4o-mini-tts, and broadcasts to a live audience through WebSockets — all running on Azure App Service.',
    subdesc:
      'FastAPI backend + React (Vite/TypeScript/Tailwind) frontend + Three.js visualiser. WebRTC relay for the OpenAI Realtime API, Docker multi-stage build, abstract provider interface supporting both Azure OpenAI and standard OpenAI. Deployed live at pmi-ai-moderator.azurewebsites.net.',
    href: 'https://pmi-ai-moderator.azurewebsites.net',
    texture: '/textures/project/project1.mp4',
    slideshow: [
      {
        src: '/assets/projects/pmi-ai-moderator/01-home.png',
        title: 'Mode launcher',
        subtitle: 'One entry point — Conversation, Panel Talk, Workshop, Audience Q&A, and more.',
      },
      {
        src: '/assets/projects/pmi-ai-moderator/02-conversation.png',
        title: 'Conversation mode',
        subtitle: 'Operator console with push-to-talk, live transcript, and Realtime voice relay.',
      },
      {
        src: '/assets/projects/pmi-ai-moderator/04-panel-talk.png',
        title: 'Panel Talk',
        subtitle: 'Listen, label, and direct a live panel from a single moderator surface.',
      },
      {
        src: '/assets/projects/pmi-ai-moderator/05-workshop.png',
        title: 'Workshop summaries',
        subtitle: 'Timed prompts, AI-generated summary playback, and audience narration.',
      },
      {
        src: '/assets/projects/pmi-ai-moderator/06-audience-qa.png',
        title: 'Audience Q&A',
        subtitle: 'Collect questions, recommend the next one, and present it with the AI voice.',
      },
      {
        src: '/assets/projects/pmi-ai-moderator/09-moderator-preview.png',
        title: 'Moderator preview',
        subtitle: 'Rehearse scripts with the AI voice and stage visualiser before going live.',
      },
      {
        src: '/assets/projects/pmi-ai-moderator/03-stage-visualiser.png',
        title: 'Stage visualiser',
        subtitle: 'Three.js orb that reacts to the AI voice on the audience-facing screen.',
      },
      {
        src: '/assets/projects/pmi-ai-moderator/07-persistent-memory.png',
        title: 'Persistent memory',
        subtitle: 'Import session logs and browse retrieval chunks per event or series.',
      },
      {
        src: '/assets/projects/pmi-ai-moderator/08-all-in.png',
        title: '“I am all in” moment',
        subtitle: 'Audience commitment screen designed to feel like a real call to action.',
      },
    ],
    logo: '/assets/pmi-logo.png',
    logoStyle: {
      backgroundColor: '#0a1340',
      border: '0.2px solid #1f2d70',
      boxShadow: '0px 0px 60px 0px #1f2d7066',
    },
    spotlight: '/assets/spotlight2.png',
    tags: [
      { id: 1, name: 'FastAPI', path: '/assets/skills/fastapi.svg' },
      { id: 2, name: 'React', path: '/assets/skills/react.svg' },
      { id: 3, name: 'TypeScript', path: '/assets/skills/typescript.svg' },
      { id: 4, name: 'Azure', path: '/assets/skills/azure.svg' },
      { id: 5, name: 'Docker', path: '/assets/skills/docker.svg' },
      { id: 6, name: 'Python', path: '/assets/skills/python.svg' },
    ],
  },
  {
    title: 'Scopely Global Event — WebAR Backend',
    desc: 'Helped architect, with the Dorier team, an Azure Functions + Cosmos DB backend serving 2,100 concurrent users across 12 global locations — delivered in 5 weeks on an unfamiliar stack. Shipped on time with zero incidents.',
    subdesc:
      'Includes rate limiting, anti-abuse controls, GDPR-aligned data handling, and a React admin dashboard. First time on Azure Functions and Cosmos DB — ramped up quickly and helped design the architecture under a hard event deadline.',
    href: 'https://github.com/HermenySantos',
    texture: '/textures/project/project2.mp4',
    slideshow: [
      {
        src: '/assets/projects/scopely-character-hunt/01-monopoly.png',
        title: 'Spawn — Mr. Monopoly',
        subtitle: 'Live AR character hunt running on the Azure Functions backend.',
      },
      {
        src: '/assets/projects/scopely-character-hunt/video1-02.png',
        title: 'Movement energy meter',
        subtitle: 'Anti-abuse / penalty system enforced server-side per session.',
      },
      {
        src: '/assets/projects/scopely-character-hunt/02-spock.png',
        title: 'Character unlocked — Spock',
        subtitle: 'Cosmos DB tracks per-user progress across 12 global locations.',
      },
      {
        src: '/assets/projects/scopely-character-hunt/04-spiderman.png',
        title: 'Character unlocked — Spider-Man',
        subtitle: '2,100 concurrent users sustained without incident.',
      },
      {
        src: '/assets/projects/scopely-character-hunt/03-captain-america.png',
        title: 'Character unlocked — Captain America',
        subtitle: 'Rate limiting and GDPR-aligned data handling baked in.',
      },
      {
        src: '/assets/projects/scopely-character-hunt/video2-02.png',
        title: 'Mini-game challenge',
        subtitle: '“What does this character want?” — quiz served from event config.',
      },
    ],
    slideshowOptions: {
      fit: 'contain',
      backgroundColor: '#f5c419',
      intervalMs: 3600,
      showCaption: false,
    },
    logo: '/assets/scopely-character-hunt-logo.png',
    logoStyle: {
      backgroundColor: '#1a0b2e',
      border: '0.2px solid #ff3d7f',
      boxShadow: '0px 0px 60px 0px #ff3d7f55',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      { id: 1, name: 'Azure', path: '/assets/skills/azure.svg' },
      { id: 2, name: 'TypeScript', path: '/assets/skills/typescript.svg' },
      { id: 3, name: 'React', path: '/assets/skills/react.svg' },
      { id: 4, name: 'Node.js', path: '/assets/skills/nodejs.svg' },
    ],
  },
  {
    title: 'UN Geneva Visitor Center — FPDN Experience',
    desc: 'Contributor with the Dorier team to the institutional experience platform at the United Nations Visitor Center in Geneva. Built a proximity-flash component used simultaneously on all visitor devices during the "Gathering" exhibition moment.',
    subdesc:
      'TypeScript monorepo spanning Audio Guide app, Docent Controller, CMS, and cloud services. Go microservices for backend processing, MQTT for real-time messaging, Quuppa indoor positioning for location awareness, React Native Reanimated with 40 automated tests.',
    href: 'https://github.com/HermenySantos/totem-proximity-flash',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/dorier.svg',
    logoStyle: {
      backgroundColor: '#1A2E4A',
      border: '0.2px solid #2A4E7A',
      boxShadow: '0px 0px 60px 0px #2A6DB54D',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      { id: 1, name: 'TypeScript', path: '/assets/skills/typescript.svg' },
      { id: 2, name: 'Go', path: '/assets/skills/go.svg' },
      { id: 3, name: 'React', path: '/assets/skills/react.svg' },
      { id: 4, name: 'Docker', path: '/assets/skills/docker.svg' },
    ],
  },
  {
    title: 'InvoFlow — Invoice Management SaaS',
    desc: 'Full-stack invoice and receipt management SaaS built for Portuguese SMBs. OCR-powered data extraction via Azure Document Intelligence, real-time IVA (VAT) tracking, and accountant-ready export — all in one dashboard.',
    subdesc:
      'FastAPI + Next.js 14 + PostgreSQL + Cloudflare R2 for storage + Clerk for auth. Docker Compose deployment with a mock mode for local dev without cloud credentials. Built to solve a real pain point for small business accounting.',
    href: 'https://github.com/HermenySantos/invoflow',
    texture: '/textures/project/project4.mp4',
    logo: '/assets/next.svg',
    logoStyle: {
      backgroundColor: '#000000',
      border: '0.2px solid #333333',
      boxShadow: '0px 0px 60px 0px #FFFFFF1A',
    },
    spotlight: '/assets/spotlight4.png',
    tags: [
      { id: 1, name: 'FastAPI', path: '/assets/skills/fastapi.svg' },
      { id: 2, name: 'Next.js', path: '/assets/skills/next.svg' },
      { id: 3, name: 'Python', path: '/assets/skills/python.svg' },
      { id: 4, name: 'Azure', path: '/assets/skills/azure.svg' },
      { id: 5, name: 'Docker', path: '/assets/skills/docker.svg' },
    ],
  },
  {
    title: 'NexTool API — Developer Utilities at the Edge',
    desc: '13+ developer utility endpoints deployed globally on Cloudflare Workers — sub-millisecond latency at the edge. QR codes, meta scraping, text analytics, hashing, IP geolocation, colour conversion, JSON tools and more. Monetized on RapidAPI marketplace.',
    subdesc:
      'Built with TypeScript, Hono framework, and Vitest (30 tests). Cloudflare Workers architecture means zero cold starts, global distribution, and zero server management. A side project that turned into a real revenue stream.',
    href: 'https://github.com/HermenySantos/nextool-api',
    texture: '/textures/project/project5.mp4',
    logo: '/assets/skills/vercel.svg',
    logoStyle: {
      backgroundColor: '#1A1A2E',
      border: '0.2px solid #2D2D4E',
      boxShadow: '0px 0px 60px 0px #6366F14D',
    },
    spotlight: '/assets/spotlight5.png',
    tags: [
      { id: 1, name: 'TypeScript', path: '/assets/skills/typescript.svg' },
      { id: 2, name: 'Node.js', path: '/assets/skills/nodejs.svg' },
      { id: 3, name: 'Vercel', path: '/assets/skills/vercel.svg' },
    ],
  },
  {
    title: 'Seezy - Comprehensive Eye Health Care Platform',
    desc: 'A sophisticated healthcare ecosystem that integrates optical stores, insurance companies, financial institutions, and sales entities into a unified workflow. Seezy centralizes management of eye health plans while enabling multi-partner collaboration with secure data handling and process automation.',
    subdesc:
      'Built with a powerful microservice architecture using Next.js 14 and NestJS. The frontend leverages React 18, TypeScript, Material-UI, and Tailwind CSS, while the backend implements MongoDB, Redis caching, and AWS SNS for notifications. The platform supports multi-partner integration with a focus on security and scalability.',
    href: 'https://www.seezy.care',
    texture: '/textures/project/project2.mp4',
    logo: '/assets/seezy.svg',
    logoStyle: {
      backgroundColor: '#1A365D',
      border: '0.2px solid #2D4A7A',
      boxShadow: '0px 0px 60px 0px #4299E14D',
    },
    spotlight: '/assets/spotlight1.png',
    detailedInfo: {
      overview:
        'Seezy is a comprehensive digital solution designed to manage eye health care plans through multiple partners. The system integrates optical stores, insurance companies, financial institutions, and sales entities into a unified workflow.',
      objectives: [
        'Centralized management of eye health plans',
        'Multi-partner integration and collaboration',
        'Secure data management',
        'Process automation and tracking',
        'Partner-specific customization',
      ],
      stakeholders: [
        'Commercial Partners (Sales)',
        'Optical Partners (Service Providers)',
        'Lab Partners (Manufacturing)',
        'Administrative Users',
        'End Clients',
      ],
      frontend: {
        core: ['Next.js 14.2.5 (React framework)', 'React 18.3.1', 'TypeScript', 'Node.js 20'],
        ui: [
          'Material-UI (MUI) v5.16.7',
          'Ant Design (antd) v5.20.0',
          'Radix UI components',
          'Tailwind CSS v3.4.1',
          'Framer Motion v11.5.4',
          'Recharts v2.12.7',
        ],
        auth: ['Auth0 (@auth0/nextjs-auth0 v3.5.0)', 'JWT (jsonwebtoken v9.0.2)', 'JWKS-RSA'],
        state: ['Axios v1.7.7', 'Dexie v4.0.8', 'Class Transformer & Validator'],
        utilities: [
          'date-fns v4.1.0',
          'UUID v10.0.0',
          'js-cookie v3.0.5',
          'html2canvas v1.4.1',
          'jsPDF v2.5.2',
          'React Hot Toast v2.5.2',
          'React Toastify v10.0.6',
        ],
      },
      backend: {
        framework: ['NestJS with TypeScript', 'Microservices architecture'],
        database: ['MongoDB (via Mongoose)', 'Redis for caching'],
        auth: ['Passport.js', 'JWT (JSON Web Tokens)', 'JWKS-RSA'],
        communication: ['AWS SNS for notifications', 'Twilio for SMS', 'Nodemailer for email'],
        deployment: [
          'Backend deployed on Azure',
          'Frontend deployed on Vercel',
          'Docker containerization',
          'CI/CD pipelines',
        ],
      },
    },
    tags: [
      {
        id: 1,
        name: 'Next.js',
        path: '/assets/skills/next.svg',
      },
      {
        id: 2,
        name: 'NestJS',
        path: '/assets/skills/nestjs.svg',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/skills/typescript.svg',
      },
      {
        id: 4,
        name: 'Material UI',
        path: '/assets/skills/mui.svg',
      },
      {
        id: 5,
        name: 'MongoDB',
        path: '/assets/skills/mongodb.svg',
      },
      {
        id: 6,
        name: 'Azure',
        path: '/assets/skills/azure.svg',
      },
      {
        id: 7,
        name: 'Docker',
        path: '/assets/skills/docker.svg',
      },
    ],
  },
  {
    title: 'Nomad Engenuity - Modern Startup Digital Presence',
    desc: "A dynamic startup platform that elegantly showcases the company's identity, services, and client relationships. This polished corporate website serves as both a brand statement and a lead generation tool, featuring captivating animations with GSAP and Framer Motion.",
    subdesc:
      'Built with Next.js 14, React 18, TypeScript, and Tailwind CSS with Prismic CMS integration. The architecture leverages Next.js App Router for optimal SEO and React Server Components for enhanced loading speeds.',
    href: 'https://www.nomadengenuity.eu',
    texture: '/textures/project/project1.mp4',
    logo: '/assets/nomad.svg',
    logoStyle: {
      backgroundColor: '#2A2D36',
      border: '0.2px solid #3A3D46',
      boxShadow: '0px 0px 60px 0px #4A6CC34D',
    },
    spotlight: '/assets/spotlight1.png',
    tags: [
      {
        id: 1,
        name: 'React.js',
        path: '/assets/skills/react.svg',
      },
      {
        id: 2,
        name: 'Next.js',
        path: '/assets/skills/next.svg',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/skills/typescript.svg',
      },
      {
        id: 4,
        name: 'Tailwind CSS',
        path: '/assets/skills/tailwind.svg',
      },
      {
        id: 5,
        name: 'GSAP',
        path: '/assets/gsap.svg',
      },
      {
        id: 6,
        name: 'Framer Motion',
        path: '/assets/skills/framer.svg',
      },
      {
        id: 7,
        name: 'Prismic CMS',
        path: '/assets/prismic.svg',
      },
    ],
  },
  {
    title: 'NomadEngenuity — Company Website',
    desc: "The public-facing site for NomadEngenuity, a digital innovation agency specializing in healthcare solutions. A polished corporate presence with captivating animations, fast performance, and CMS-driven content management.",
    subdesc:
      'Built with Next.js 14, React 18, TypeScript, and Tailwind CSS. Prismic CMS integration for content flexibility. Next.js App Router for optimal SEO and React Server Components for fast loading. GSAP + Framer Motion animations.',
    href: 'https://www.nomadengenuity.eu',
    texture: '/textures/project/projectNull.mp4',
    logo: '/assets/nomad.svg',
    logoStyle: {
      backgroundColor: '#2A2D36',
      border: '0.2px solid #3A3D46',
      boxShadow: '0px 0px 60px 0px #4A6CC34D',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [
      { id: 1, name: 'Next.js', path: '/assets/skills/next.svg' },
      { id: 2, name: 'TypeScript', path: '/assets/skills/typescript.svg' },
      { id: 3, name: 'React', path: '/assets/skills/react.svg' },
    ],
  },
  // {
  //   title: 'Podcastr - AI Podcast Platform',
  //   desc: 'Podcastr is a revolutionary Software-as-a-Service platform that transforms the way podcasts are created. With advanced AI-powered features like text-to-multiple-voices functionality, it allows creators to generate diverse voiceovers from a single text input.',
  //   subdesc:
  //     'Built as a unique Software-as-a-Service app with Next.js 14, Tailwind CSS, TypeScript, Framer Motion and Convex, Podcastr is designed for optimal performance and scalability.',
  //   href: 'https://www.youtube.com/watch?v=zfAb95tJvZQ',
  //   texture: '/textures/project/project2.mp4',
  //   logo: '/assets/project-logo2.png',
  //   logoStyle: {
  //     backgroundColor: '#13202F',
  //     border: '0.2px solid #17293E',
  //     boxShadow: '0px 0px 60px 0px #2F6DB54D',
  //   },
  //   spotlight: '/assets/spotlight2.png',
  //   tags: [
  //     {
  //       id: 1,
  //       name: 'React.js',
  //       path: '/assets/react.svg',
  //     },
  //     {
  //       id: 2,
  //       name: 'Next.js',
  //       path: '/assets/next.svg',
  //     },
  //     {
  //       id: 3,
  //       name: 'TailwindCSS',
  //       path: 'assets/tailwindcss.png',
  //     },
  //     {
  //       id: 4,
  //       name: 'TypeScript',
  //       path: '/assets/typescript.png',
  //     },
  //     {
  //       id: 5,
  //       name: 'Framer Motion',
  //       path: '/assets/framer.png',
  //     },
  //     {
  //       id: 6,
  //       name: 'Convex',
  //       path: '/assets/convex.svg',
  //     },
  //     {
  //       id: 7,
  //       name: 'AI APIs',
  //       path: '/assets/ai.svg',
  //     },
  //   ],
  // },
  // {
  //   title: 'LiveDoc - Real-Time Google Docs Clone',
  //   desc: 'LiveDoc is a powerful collaborative app that elevates the capabilities of real-time document editing. As an enhanced version of Google Docs, It supports millions of collaborators simultaneously, ensuring that every change is captured instantly and accurately.',
  //   subdesc:
  //     'With LiveDoc, users can experience the future of collaboration, where multiple contributors work together in real time without any lag, by using Next.js and Liveblocks newest features.',
  //   href: 'https://www.youtube.com/watch?v=y5vE8y_f_OM',
  //   texture: '/textures/project/project3.mp4',
  //   logo: '/assets/project-logo3.png',
  //   logoStyle: {
  //     backgroundColor: '#60f5a1',
  //     background:
  //       'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
  //     border: '0.2px solid rgba(208, 213, 221, 1)',
  //     boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
  //   },
  //   spotlight: '/assets/spotlight3.png',
  //   tags: [
  //     {
  //       id: 1,
  //       name: 'React.js',
  //       path: '/assets/react.svg',
  //     },
  //     {
  //       id: 2,
  //       name: 'Next.js',
  //       path: '/assets/next.svg',
  //     },
  //     {
  //       id: 3,
  //       name: 'TailwindCSS',
  //       path: 'assets/tailwindcss.png',
  //     },
  //     {
  //       id: 4,
  //       name: 'TypeScript',
  //       path: '/assets/typescript.png',
  //     },
  //     {
  //       id: 5,
  //       name: 'Framer Motion',
  //       path: '/assets/framer.png',
  //     },
  //     {
  //       id: 6,
  //       name: 'Liveblocks',
  //       path: '/assets/liveblocks.svg',
  //     },
  //     {
  //       id: 7,
  //       name: 'Blocknote',
  //       path: '/assets/blocknote.svg',
  //     },
  //   ],
  // },
  // {
  //   title: 'CarePulse - Health Management System',
  //   desc: 'An innovative healthcare platform designed to streamline essential medical processes. It simplifies patient registration, appointment scheduling, and medical record management, providing a seamless experience for both healthcare providers and patients.',
  //   subdesc:
  //     'With a focus on efficiency, CarePulse integrantes complex forms and SMS notifications, by using Next.js, Appwrite, Twillio and Sentry that enhance operational workflows.',
  //   href: 'https://www.youtube.com/watch?v=lEflo_sc82g',
  //   texture: '/textures/project/project4.mp4',
  //   logo: '/assets/project-logo4.png',
  //   logoStyle: {
  //     backgroundColor: '#60f5a1',
  //     background:
  //       'linear-gradient(0deg, #60F5A150, #60F5A150), linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(208, 213, 221, 0.8) 100%)',
  //     border: '0.2px solid rgba(208, 213, 221, 1)',
  //     boxShadow: '0px 0px 60px 0px rgba(35, 131, 96, 0.3)',
  //   },
  //   spotlight: '/assets/spotlight4.png',
  //   tags: [
  //     {
  //       id: 1,
  //       name: 'React.js',
  //       path: '/assets/react.svg',
  //     },
  //     {
  //       id: 2,
  //       name: 'Next.js',
  //       path: '/assets/next.svg',
  //     },
  //     {
  //       id: 3,
  //       name: 'TailwindCSS',
  //       path: 'assets/tailwindcss.png',
  //     },
  //     {
  //       id: 4,
  //       name: 'TypeScript',
  //       path: '/assets/typescript.png',
  //     },
  //     {
  //       id: 5,
  //       name: 'Appwrite',
  //       path: '/assets/appwrite.svg',
  //     },
  //     {
  //       id: 6,
  //       name: 'Twilio',
  //       path: '/assets/twilio.svg',
  //     },
  //     {
  //       id: 7,
  //       name: 'Sentry',
  //       path: '/assets/sentry.svg',
  //     },
  //   ],
  // },
  // {
  //   title: 'Horizon - Online Banking Platform',
  //   desc: 'Horizon is a comprehensive online banking platform that offers users a centralized finance management dashboard. It allows users to connect multiple bank accounts, monitor real-time transactions, and seamlessly transfer money to other users.',
  //   subdesc:
  //     'Built with Next.js 14 Appwrite, Dwolla and Plaid, Horizon ensures a smooth and secure banking experience, tailored to meet the needs of modern consumers.',
  //   href: 'https://www.youtube.com/watch?v=PuOVqP_cjkE',
  //   texture: '/textures/project/project5.mp4',
  //   logo: '/assets/project-logo5.png',
  //   logoStyle: {
  //     backgroundColor: '#0E1F38',
  //     border: '0.2px solid #0E2D58',
  //     boxShadow: '0px 0px 60px 0px #2F67B64D',
  //   },
  //   spotlight: '/assets/spotlight5.png',
  //   tags: [
  //     {
  //       id: 1,
  //       name: 'React.js',
  //       path: '/assets/react.svg',
  //     },
  //     {
  //       id: 2,
  //       name: 'TailwindCSS',
  //       path: 'assets/tailwindcss.png',
  //     },
  //     {
  //       id: 3,
  //       name: 'TypeScript',
  //       path: '/assets/typescript.png',
  //     },
  //     {
  //       id: 4,
  //       name: 'Framer Motion',
  //       path: '/assets/framer.png',
  //     },
  //   ],
  // },
  // {
  //   title: 'Imaginify - AI Photo Manipulation App',
  //   desc: 'Imaginify is a groundbreaking Software-as-a-Service application that empowers users to create stunning photo manipulations using AI technology. With features like AI-driven image editing, a payments system, and a credits-based model.',
  //   subdesc:
  //     'Built with Next.js 14, Cloudinary AI, Clerk, and Stripe, Imaginify combines cutting-edge technology with a user-centric approach. It can be turned into a side income or even a full-fledged business.',
  //   href: 'https://www.youtube.com/watch?v=Ahwoks_dawU',
  //   texture: '/textures/project/project6.mp4',
  //   logo: '/assets/project-logo6.png',
  //   logoStyle: {
  //     backgroundColor: '#1C1A43',
  //     border: '0.2px solid #252262',
  //     boxShadow: '0px 0px 60px 0px #635BFF4D',
  //   },
  //   spotlight: '/assets/spotlight6.png',
  //   tags: [
  //     {
  //       id: 1,
  //       name: 'React.js',
  //       path: '/assets/react.svg',
  //     },
  //     {
  //       id: 2,
  //       name: 'TailwindCSS',
  //       path: 'assets/tailwindcss.png',
  //     },
  //     {
  //       id: 3,
  //       name: 'TypeScript',
  //       path: '/assets/typescript.png',
  //     },
  //     {
  //       id: 4,
  //       name: 'Framer Motion',
  //       path: '/assets/framer.png',
  //     },
  //   ],
  // },
];

export const calculateSizes = (isSmall, isMobile, isTablet) => {
  return {
    deskScale: isSmall ? 0.05 : isMobile ? 0.06 : 0.065,
    deskPosition: isMobile ? [0.5, -4.5, 0] : [0.25, -5.5, 0],
    cubePosition: isSmall ? [4, -5, 0] : isMobile ? [5, -5, 0] : isTablet ? [5, -5, 0] : [9, -5.5, 0],
    reactLogoPosition: isSmall ? [3, 4, 0] : isMobile ? [5, 4, 0] : isTablet ? [5, 4, 0] : [12, 3, 0],
    ringPosition: isSmall ? [-5, 7, 0] : isMobile ? [-10, 10, 0] : isTablet ? [-12, 10, 0] : [-24, 10, 0],
    targetPosition: isSmall ? [-5, -10, -10] : isMobile ? [-9, -10, -10] : isTablet ? [-11, -7, -10] : [-13, -13, -10],
  };
};

export const workExperiences = [
  {
    id: 0,
    name: 'Dorier',
    pos: 'Full Stack Engineer',
    duration: 'Jun 2025 – Present',
    title:
      'Building production systems for global live events and institutional experiences at Dorier, a Geneva-based event technology company. Helped architect, with the team, a backend serving 2,100 concurrent users across 12 global locations in 5 weeks — first time on the stack.',
    icon: '/assets/dorier.svg',
    animation: 'victory',
    companyDescription:
      'Dorier is a Geneva-based event technology and live experience company, delivering large-scale digital installations and immersive experiences for global organizations.',
    projects: [
      {
        name: 'Scopely Global Event — WebAR Backend',
        description: 'Azure Functions + Cosmos DB backend for a global AR game event:',
        achievements: [
          'Helped architect backend serving 2,100 concurrent users across 12 global locations in 5 weeks',
          'Built on Azure Functions + Cosmos DB — first time on that stack',
          'Rate limiting, anti-abuse controls, and GDPR-aligned data handling',
          'React admin dashboard for event management',
          'Shipped on time with zero incidents',
        ],
      },
      {
        name: 'PMI AI Moderator',
        description: 'Human-in-the-loop AI moderator for live PMI panels (pmi-ai-moderator.azurewebsites.net):',
        achievements: [
          'FastAPI backend + React (Vite/TypeScript/Tailwind) + Three.js visualiser',
          'Azure OpenAI GPT-4o for generation, gpt-4o-mini-tts for voice synthesis',
          'WebRTC relay for OpenAI Realtime API, WebSockets for audience broadcast',
          'Abstract provider interface supporting Azure OpenAI and standard OpenAI',
          'Docker multi-stage build, Azure App Service deployment',
        ],
      },
      {
        name: 'UN Geneva Visitor Center — FPDN',
        description: 'Institutional experience platform for the United Nations Visitor Center:',
        achievements: [
          'Contributor to the TypeScript monorepo with the Dorier team',
          'Audio Guide app, Docent Controller, CMS, and back-of-house cloud services',
          'Go microservices, MQTT real-time messaging, Quuppa indoor positioning',
          'Built proximity-flash React Native Reanimated component (40 automated tests)',
          'Component used simultaneously across all visitor devices during the Gathering exhibition',
        ],
      },
      {
        name: 'Enterprise Automation — Galderma / Lightcraft',
        description: 'Python automation tooling for enterprise video-processing workflows:',
        achievements: [
          'Python CLI/GUI tool with Dropbox integration and Gmail notifications',
          'OAuth2 authentication and secure credential handling',
          'Cross-platform GitHub Actions CI/CD producing standalone executables',
          'In production for enterprise recording workflows',
        ],
      },
    ],
    achievements: [
      'Helped architect Azure Functions + Cosmos DB backend serving 2,100 concurrent users across 12 global locations in 5 weeks',
      'Co-built and deployed live AI moderator for PMI panels using Azure OpenAI GPT-4o + WebRTC Realtime API',
      'Contributor to UN Geneva institutional experience platform (TypeScript monorepo + Go microservices)',
      'Built proximity-based React Native Reanimated component (40 tests) used in production at the UN Visitor Center',
    ],
    skills: [
      'TypeScript', 'React', 'FastAPI', 'Python', 'Go', 'Azure Functions',
      'Cosmos DB', 'Azure OpenAI', 'WebRTC', 'WebSockets', 'React Native',
      'MQTT', 'Docker', 'Three.js', 'Node.js',
    ],
    certificates: [],
  },
  {
    id: 1,
    name: 'NomadEngenuity',
    pos: 'Project Manager / Full Stack Developer',
    duration: 'April 2024 - April 2025',
    title:
      'Led full-stack development of healthcare platforms including Seezy (eye care plan management) and PharmaSee (healthcare staffing). Managed multiple development teams while architecting scalable microservice solutions with modern tech stack.',
    icon: '/assets/nomad.svg',
    animation: 'victory',
    companyDescription:
      'A digital innovation agency specializing in healthcare solutions and enterprise software development.',
    projects: [
      {
        name: 'Seezy Project',
        description: 'Led full-stack development of Seezy, an eye care plan management platform:',
        achievements: [
          'Architected a scalable microservice solution using NextJS and NestJS with TypeScript that improved data processing speeds by 35%',
          'Implemented efficient RESTful APIs and GraphQL endpoints handling 1000+ daily transactions',
          'Optimized database queries and implemented caching strategies, reducing response times by 40%',
          'Configured CI/CD pipeline on Azure, enabling automated testing and zero-downtime deployments',
          'Created reusable component libraries that accelerated UI development across multiple projects',
        ],
      },
      {
        name: 'PharmaSee Project',
        description: 'Successfully developed PharmaSee, a healthcare staffing platform:',
        achievements: [
          'Built responsive front-end with React, implementing advanced filtering and matching algorithms',
          'Designed and implemented real-time notification system using WebSockets',
          'Created secure authentication system with role-based access control',
          'Optimized mobile experience resulting in 65% of platform usage coming from mobile devices',
          'Implemented automated testing achieving 85% code coverage',
        ],
      },
    ],
    achievements: [
      'Led development teams to deliver two major healthcare platforms on time and within budget',
      'Architected a scalable microservice solution using NextJS and NestJS with TypeScript that improved data processing speeds by 35%',
      'Implemented efficient RESTful APIs and GraphQL endpoints handling 1000+ daily transactions',
      'Optimized database queries and implemented caching strategies, reducing response times by 40%',
      'Configured CI/CD pipeline on Azure, enabling automated testing and zero-downtime deployments',
    ],
    skills: [
      'React',
      'Next.js',
      'NestJS',
      'TypeScript',
      'GraphQL',
      'MongoDB',
      'Docker',
      'AWS',
      'Azure',
      'CI/CD',
      'WebSockets',
      'Authentication Systems',
      'Mobile Optimization',
      'Automated Testing',
    ],
    certificates: [],
  },
  {
    id: 2,
    name: 'UIO Languages',
    pos: 'English - Portuguese Interpreter',
    duration: 'December 2023 - March 2024',
    title:
      'Facilitated critical medical communications in healthcare settings. Applied strong communication skills valuable for technical documentation and client interactions. Gained domain expertise in healthcare terminology and workflows relevant to medical software development.',
    icon: '/assets/UIO.svg',
    animation: 'clapping',
    companyDescription:
      'A professional language services provider specializing in medical and technical interpretation and translation.',
    achievements: [
      'Facilitated critical medical communications in healthcare settings',
      'Applied strong communication skills valuable for technical documentation and client interactions',
      'Gained domain expertise in healthcare terminology and workflows relevant to medical software development',
      'Managed high-pressure communication scenarios requiring precision and attention to detail',
    ],
    skills: [
      'Medical Terminology',
      'Technical Documentation',
      'Cross-cultural Communication',
      'Healthcare Workflows',
      'Precision Communication',
    ],
    certificates: [],
  },
  {
    id: 3,
    name: 'DC Tech',
    pos: 'Software Developer',
    duration: 'March 2023 - June 2023',
    title:
      'Developed award-winning prototype for environmental disaster prevention. Architected full-stack solution for flood and wildfire prevention, integrated machine learning models for predictive analysis, and successfully secured incubator support in Porto through competitive pitch.',
    icon: '/assets/DC.svg',
    animation: 'salute',
    companyDescription:
      'An environmental technology startup focused on using data analytics to prevent and mitigate natural disasters.',
    achievements: [
      'Developed award-winning prototype for environmental disaster prevention',
      'Architected and implemented full-stack solution for flood and wildfire prevention',
      'Integrated machine learning models for predictive analysis',
      'Successfully secured incubator support in Porto through competitive pitch',
    ],
    skills: ['Python', 'TensorFlow', 'React', 'Node.js', 'GIS', 'Data Visualization', 'AWS', 'Machine Learning'],
    certificates: [],
  },
  {
    id: 4,
    name: 'School Conservatorio Da Musica',
    pos: 'Programming Teacher',
    duration: 'October 2022 - June 2023',
    title:
      'Designed and delivered programming curriculum for 100+ students. Created progressive coding exercises utilizing Scratch, HTML/CSS, and JavaScript. Developed browser-based code editor with real-time preview, resulting in 85% student engagement rate.',
    icon: '/assets/conservatorio.svg',
    animation: 'victory',
    companyDescription:
      'A prestigious music and arts institution that expanded its curriculum to include digital skills and programming.',
    achievements: [
      'Designed and delivered programming curriculum for 100+ students across grade levels',
      'Created progressive coding exercises utilizing Scratch, HTML/CSS, and JavaScript',
      'Developed browser-based code editor with real-time preview for student practice',
      'Implemented gamification elements resulting in 85% student engagement rate',
      'Built automated assessment system to provide immediate feedback on student code',
      'Applied teaching experience to improve documentation skills and code clarity',
    ],
    skills: [
      'JavaScript',
      'HTML/CSS',
      'Scratch',
      'Teaching',
      'Curriculum Development',
      'Educational Technology',
      'Gamification',
    ],
    certificates: [],
  },
  {
    id: 5,
    name: '2GF Innovation Systems',
    pos: 'Software Developer',
    duration: 'October 2021 - October 2022',
    title:
      'Participated in frontend development for cross-border family connection platform supporting 10,000+ monthly active users. Built responsive interfaces with React and TypeScript, implemented WebRTC for real-time video communication, and created reusable component libraries.',
    icon: '/assets/2gf.svg',
    animation: 'clapping',
    companyDescription:
      '2GF Innovation Systems is a technology firm that specializes in digital transformation, smart industry solutions, and smart cities projects. They provide comprehensive software development services, ERP integration, IoT solutions, and business intelligence tools that help organizations become more competitive, efficient, and sustainable in their operations.',
    achievements: [
      'Built responsive interfaces with React and TypeScript, supporting 10,000+ monthly active users',
      'Implemented WebRTC for real-time video communication features',
      'Created reusable component library reducing new feature development time by 40%',
      'Developed cross-platform mobile application using Flutter and Dart',
      'Integrated Firebase for authentication and real-time database functionality',
      'Implemented offline-first architecture allowing users to maintain functionality with intermittent connectivity',
      'Collaborated with a distributed team across three time zones using agile methodology',
    ],
    skills: [
      'React',
      'TypeScript',
      'WebRTC',
      'Flutter',
      'Dart',
      'Firebase',
      'Offline-First Architecture',
      'CSS/SASS',
      'Component Libraries',
      'Responsive Design',
      'Performance Optimization',
      'Agile',
    ],
    certificates: [
      // {
      //   name: 'React Advanced Certification',
      //   url: '/assets/certificates/react-advanced.pdf',
      // },
    ],
  },
  {
    id: 6,
    name: '2GF Innovation Systems',
    pos: 'Software Developer',
    duration: 'July 2021 - September 2021',
    title:
      'Developed automation solution for AZA operations in Chile. Built Node.js middleware to integrate with SAP enterprise systems, created custom API endpoints for data synchronization, and implemented data validation pipelines to ensure system integrity.',
    icon: '/assets/2gf.svg',
    animation: 'salute',
    companyDescription:
      '2GF Innovation Systems specializes in smart industry solutions and digital transformation services. The company focuses on implementing tools that support decision-making through ERP integration, big data analytics, sensors, and business intelligence. Their software engineering and automation services help clients achieve operational excellence and sustainability in their business models.',
    achievements: [
      'Built Node.js middleware to integrate with SAP enterprise systems',
      'Created custom API endpoints for data synchronization between web platform and legacy systems',
      'Implemented data validation and transformation pipelines to ensure system integrity',
      'Developed interactive dashboards with ReactJS to visualize operational metrics',
      'Configured MongoDB schemas optimized for reporting and analytics',
      'Contributed to daily stand-ups and sprint planning with remote team of 7 developers',
    ],
    skills: [
      'Node.js',
      'Express',
      'SAP Integration',
      'API Development',
      'Data Validation',
      'ReactJS',
      'MongoDB',
      'Automation',
      'Documentation',
      'Agile',
    ],
    certificates: [
      // {
      //   name: 'SAP Integration Specialist',
      //   url: '/assets/certificates/sap-integration.pdf',
      // },
    ],
  },
  {
    id: 7,
    name: 'JB Virtual',
    pos: 'Digital Marketing Consultant',
    duration: 'February 2021 - March 2023',
    title:
      'Co-founded and scaled digital marketing agency. Developed custom web analytics dashboard using JavaScript and Google Analytics API, built automated social media scheduling and reporting tools, and created dynamic content management systems for client campaigns.',
    icon: '/assets/JB.svg',
    animation: 'victory',
    companyDescription:
      'A digital marketing agency co-founded by me, focusing on data-driven marketing strategies and custom analytics solutions.',
    achievements: [
      'Co-founded and scaled digital marketing agency',
      'Developed custom web analytics dashboard using JavaScript and Google Analytics API',
      'Built automated social media scheduling and reporting tools',
      'Created dynamic content management system for client campaign materials',
      'Applied analytical skills to measure and optimize campaign performance',
      'Gained valuable client communication experience applicable to developer-client interactions',
    ],
    skills: [
      'JavaScript',
      'Google Analytics API',
      'Social Media Integration',
      'CMS Development',
      'Business Development',
      'Digital Marketing',
      'Client Communication',
      'Analytics',
    ],
    certificates: [],
  },
];