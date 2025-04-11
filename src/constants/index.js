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
    name: 'Contact',
    href: '#contact',
  },
];

export const clientReviews = [
  {
    id: 1,
    name: 'Emily Johnson',
    position: 'Marketing Director at GreenLeaf',
    img: 'assets/review1.png',
    review:
      'Working with Adrian was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
  },
  {
    id: 2,
    name: 'Mark Rogers',
    position: 'Founder of TechGear Shop',
    img: 'assets/review2.png',
    review:
      "Adrian's expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He's a true professional! Fantastic work.",
  },
  {
    id: 3,
    name: 'John Dohsas',
    position: 'Project Manager at UrbanTech ',
    img: 'assets/review3.png',
    review:
      "I can't say enough good things about Adrian. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
  },
  {
    id: 4,
    name: 'Ether Smith',
    position: 'CEO of BrightStar Enterprises',
    img: 'assets/review4.png',
    review:
      'Adrian was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
  },
];

export const myProjects = [
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
        path: '/assets/next.svg',
      },
      {
        id: 2,
        name: 'NestJS',
        path: '/assets/nest.svg',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Material UI',
        path: '/assets/mui.svg',
      },
      {
        id: 5,
        name: 'MongoDB',
        path: '/assets/mongo.svg',
      },
      {
        id: 6,
        name: 'Azure',
        path: '/assets/azure.svg',
      },
      {
        id: 7,
        name: 'Docker',
        path: '/assets/docker.svg',
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
        path: '/assets/react.svg',
      },
      {
        id: 2,
        name: 'Next.js',
        path: '/assets/next.svg',
      },
      {
        id: 3,
        name: 'TypeScript',
        path: '/assets/typescript.png',
      },
      {
        id: 4,
        name: 'Tailwind CSS',
        path: 'assets/tailwindcss.png',
      },
      {
        id: 5,
        name: 'GSAP',
        path: '/assets/gsap.svg',
      },
      {
        id: 6,
        name: 'Framer Motion',
        path: '/assets/framer.png',
      },
      {
        id: 7,
        name: 'Prismic CMS',
        path: '/assets/prismic.svg',
      },
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
    id: 1,
    name: 'NomadEngenuity',
    pos: 'Project Manager / Full Stack Developer',
    duration: 'April 2024 - Current',
    title:
      'Led full-stack development of Seezy, an eye care plan management platform, and PharmaSee, a healthcare staffing platform. Architected microservice solutions with NextJS and NestJS, implemented GraphQL endpoints, and optimized database queries resulting in 40% faster response times.',
    icon: '/assets/nomad.svg',
    animation: 'victory',
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
  },
  {
    id: 5,
    name: '2GF Innovation Technology',
    pos: 'Software Developer',
    duration: 'October 2021 - October 2022',
    title:
      'Built responsive interfaces with React/TypeScript for cross-border family connection platform supporting 10,000+ monthly users. Implemented WebRTC for real-time video communication and created reusable component libraries reducing development time by 40%.',
    icon: '/assets/2gf.svg',
    animation: 'clapping',
  },
  {
    id: 6,
    name: '2GF Innovation Technology',
    pos: 'Software Developer',
    duration: 'July 2021 - September 2021',
    title:
      'Developed automation solution for AZA operations in Chile. Built Node.js middleware to integrate with SAP enterprise systems, created custom API endpoints for data synchronization, and implemented data validation pipelines to ensure system integrity.',
    icon: '/assets/2gf.svg',
    animation: 'salute',
  },
  {
    id: 7,
    name: 'JB Virtual',
    pos: 'Digital Marketing Consultant',
    duration: 'February 2021 - March 2023',
    title:
      'Co-founded digital marketing agency. Developed custom web analytics dashboard using JavaScript and Google Analytics API, built automated social media tools, and created dynamic content management systems for client campaigns.',
    icon: '/assets/JB.svg',
    animation: 'victory',
  },
];