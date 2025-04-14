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

export const clientReviews = [
  {
    id: 1,
    name: 'Emily Johnson',
    position: 'Marketing Director at GreenLeaf',
    img: 'assets/review1.png',
    review:
      'Working with Hermenegildo was a fantastic experience. He transformed our outdated website into a modern, user-friendly platform. His attention to detail and commitment to quality are unmatched. Highly recommend him for any web dev projects.',
  },
  {
    id: 2,
    name: 'Mark Rogers',
    position: 'Founder of TechGear Shop',
    img: 'assets/review2.png',
    review:
      "Hermenegildo's expertise in web development is truly impressive. He delivered a robust and scalable solution for our e-commerce site, and our online sales have significantly increased since the launch. He's a true professional! Fantastic work.",
  },
  {
    id: 3,
    name: 'John Dohsas',
    position: 'Project Manager at UrbanTech ',
    img: 'assets/review3.png',
    review:
      "I can't say enough good things about Hermenegildo. He was able to take our complex project requirements and turn them into a seamless, functional website. His problem-solving abilities are outstanding.",
  },
  {
    id: 4,
    name: 'Ether Smith',
    position: 'CEO of BrightStar Enterprises',
    img: 'assets/review4.png',
    review:
      'Hermenegildo was a pleasure to work with. He understood our requirements perfectly and delivered a website that exceeded our expectations. His skills in both frontend backend dev are top-notch.',
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
    title: 'Coming Soon - More Projects Being Added',
    desc: "I'm currently developing exciting new projects that demonstrate my evolving skills and expertise. This section will soon feature additional work across various domains and technologies.",
    subdesc:
      'These upcoming projects will showcase advanced implementations in areas like AI integration, real-time applications, and innovative user experiences. Check back soon to see the latest additions to my portfolio.',
    // href: '#projects',
    texture: '/textures/project/project3.mp4',
    logo: '/assets/project-logo3.png',
    logoStyle: {
      backgroundColor: '#1F2235',
      border: '0.2px solid #2D2F45',
      boxShadow: '0px 0px 60px 0px #8B5CF64D',
    },
    spotlight: '/assets/spotlight3.png',
    tags: [],
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