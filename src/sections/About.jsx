import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

import Button from '../components/Button.jsx';
import GitHubContributions from '../components/GitHubContributions.jsx';

// Technical skills by category — names and icons only, no invented proficiency %
const technicalSkills = {
  frontend: {
    title: 'Frontend',
    skills: [
      { name: 'TypeScript', icon: '/assets/skills/typescript.svg' },
      { name: 'React', icon: '/assets/skills/react.svg' },
      { name: 'Next.js', icon: '/assets/skills/next.svg' },
      { name: 'JavaScript', icon: '/assets/skills/javascript.svg' },
      { name: 'HTML5/CSS3', icon: '/assets/skills/html.svg' },
      { name: 'Tailwind CSS', icon: '/assets/skills/tailwind.svg' },
      { name: 'Material UI', icon: '/assets/skills/mui.svg' },
      { name: 'Three.js', icon: '/assets/skills/threejs.svg' },
      { name: 'Redux', icon: '/assets/skills/redux.svg' },
    ],
  },
  backend: {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: '/assets/skills/nodejs.svg' },
      { name: 'Python', icon: '/assets/skills/python.svg' },
      { name: 'FastAPI', icon: '/assets/skills/fastapi.svg' },
      { name: 'Go', icon: '/assets/skills/go.svg' },
      { name: 'NestJS', icon: '/assets/skills/nestjs.svg' },
      { name: 'Express', icon: '/assets/skills/express.svg' },
      { name: 'GraphQL', icon: '/assets/skills/graphql.svg' },
    ],
  },
  cloud: {
    title: 'Cloud & Infra',
    skills: [
      { name: 'Azure', icon: '/assets/skills/azure.svg' },
      { name: 'Azure OpenAI', icon: '/assets/skills/azure.svg' },
      { name: 'Docker', icon: '/assets/skills/docker.svg' },
      { name: 'GitHub Actions', icon: '/assets/skills/github.svg' },
      { name: 'AWS', icon: '/assets/skills/aws.svg' },
      { name: 'Vercel', icon: '/assets/skills/vercel.svg' },
    ],
  },
  database: {
    title: 'Data',
    skills: [
      { name: 'PostgreSQL', icon: '/assets/skills/postgresql.svg' },
      { name: 'MongoDB', icon: '/assets/skills/mongodb.svg' },
      { name: 'Redis', icon: '/assets/skills/redis.svg' },
      { name: 'Prisma', icon: '/assets/skills/prisma.svg' },
      { name: 'Firebase', icon: '/assets/skills/firebase.svg' },
    ],
  },
  realtime: {
    title: 'Realtime',
    skills: [{ name: 'WebRTC' }, { name: 'WebSockets' }],
  },
  mobile: {
    title: 'Mobile',
    skills: [
      { name: 'React Native', icon: '/assets/skills/react.svg' },
      { name: 'Flutter', icon: '/assets/skills/flutter.svg' },
      { name: 'Dart', icon: '/assets/skills/dart.svg' },
    ],
  },
  testing: {
    title: 'Testing',
    skills: [
      { name: 'Jest', icon: '/assets/skills/jest.svg' },
      { name: 'Cypress', icon: '/assets/skills/cypress.svg' },
    ],
  },
  tools: {
    title: 'Tools',
    skills: [
      { name: 'Git/GitHub', icon: '/assets/skills/github.svg' },
      { name: 'Sass', icon: '/assets/skills/sass.svg' },
    ],
  },
};

// Condensed, ceiling-relevant stack (aligned with LinkedIn / shipped work)
const techStack = [
  { name: 'TypeScript', icon: '/assets/skills/typescript.svg' },
  { name: 'React', icon: '/assets/skills/react.svg' },
  { name: 'Node.js', icon: '/assets/skills/nodejs.svg' },
  { name: 'Next.js', icon: '/assets/skills/next.svg' },
  { name: 'Azure', icon: '/assets/skills/azure.svg' },
  { name: 'Azure OpenAI', icon: '/assets/skills/azure.svg' },
  { name: 'Python', icon: '/assets/skills/python.svg' },
  { name: 'FastAPI', icon: '/assets/skills/fastapi.svg' },
  { name: 'Docker', icon: '/assets/skills/docker.svg' },
  { name: 'Go', icon: '/assets/skills/go.svg' },
  { name: 'PostgreSQL', icon: '/assets/skills/postgresql.svg' },
  { name: 'WebRTC' },
];

const secondaryTags = ['NestJS', 'GraphQL', 'React Native', 'Three.js', 'Jest', 'Flutter'];

// ORCID information
const orcidInfo = {
  id: '0009-0004-3865-7072',
  link: 'https://orcid.org/0009-0004-3865-7072',
  logo: '/assets/ORCID_iD.svg.png',
  works: [
    {
      title: "Lessons Learned from the Development of a Computerised Badge-based Reward Tool for Student Engagement in Learning Activities",
      type: "Journal Article",
      year: "2023",
      journal: "IEEE World Engineering Education Conference, Edunine",
      doi: "10.1109/EDUNINE57531.2023.10102849",
      url: "https://orcid.org/0009-0004-3865-7072/work"
    }
  ]
};

// Achievement data
const achievements = [
  { value: 5, label: 'Years Experience', symbol: '+' },
  { value: 15, label: 'Projects Shipped', symbol: '+' },
  { value: 12, label: 'Global Locations', symbol: '+' },
  { value: 2100, label: 'Event participants', symbol: '' },
];

// AnimatedCounter component for statistics
const AnimatedCounter = ({ value, duration = 2000, symbol = '' }) => {
  const [count, setCount] = useState(0);
  const counterRef = useRef(null);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);

    // Early return if no valid value
    if (!end) return;

    // Calculate duration per increment
    const incrementTime = (duration / end) * 1000;

    // Only animate if element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Start animation when element is in view
          let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, incrementTime);

          // Cleanup
          return () => {
            clearInterval(timer);
          };
        }
      },
      { threshold: 0.5 },
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [value, duration]);

  return (
    <div ref={counterRef} className="flex items-baseline justify-center">
      <span className="text-4xl font-bold text-white">{count}</span>
      <span className="text-2xl font-bold text-white">{symbol}</span>
    </div>
  );
};

const SkillChip = ({ name, icon }) => (
  <span className="skill-chip inline-flex items-center gap-2 px-3 py-1.5 bg-black-300 rounded-full">
    {icon ? <img src={icon} alt="" className="w-4 h-4" /> : null}
    <span className="text-white text-sm">{name}</span>
  </span>
);

// Tech Stack Modal Component
const TechStackModal = ({ isOpen, onClose }) => {
  const modalRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('frontend');

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="bg-black-200 border border-black-300 rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto w-[90%] tech-modal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Complete Technical Skill Set</h2>
          <button onClick={onClose} className="text-white-600 hover:text-white transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {Object.keys(technicalSkills).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 py-1 rounded-full text-sm ${
                activeCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-black-300 text-white-600 hover:bg-black-500 hover:text-white'
              } transition-colors`}>
              {technicalSkills[category].title}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black-300 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-4">{technicalSkills[activeCategory].title}</h3>
            <div className="flex flex-wrap gap-2">
              {technicalSkills[activeCategory].skills.map((skill) => (
                <SkillChip key={skill.name} name={skill.name} icon={skill.icon} />
              ))}
            </div>
          </div>

          <div className="bg-black-300 rounded-lg p-5">
            <h3 className="text-xl font-semibold text-white mb-4">Related Skills</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(technicalSkills)
                .filter((category) => category !== activeCategory)
                .slice(0, 2)
                .map((category) => (
                  <div key={category} className="bg-black-200 rounded-lg p-3">
                    <h4 className="text-sm font-medium text-white-600 mb-2">{technicalSkills[category].title}</h4>
                    <div className="flex flex-wrap gap-2">
                      {technicalSkills[category].skills.map((skill) => (
                        <SkillChip key={skill.name} name={skill.name} icon={skill.icon} />
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);
  const [activeLocation, setActiveLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFullJourney, setShowFullJourney] = useState(false);

  // Locations where I've worked or am willing to work
  const locations = [
    { lat: 40.2806, lng: -7.5039, text: 'Covilhã, Portugal', description: 'Current Location' },
    { lat: 46.2044, lng: 6.1432, text: 'Geneva, Switzerland', description: 'Dorier · Remote' },
    { lat: 52.2297, lng: 21.0122, text: 'Warsaw, Poland', description: 'Project Region' },
    { lat: -8.8383, lng: 13.2344, text: 'Luanda, Angola', description: 'Earlier Chapter' },
    { lat: -22.5609, lng: 17.0658, text: 'Windhoek, Namibia', description: 'Earlier Chapter' },
    { lat: 28.6139, lng: 77.209, text: 'New Delhi, India', description: 'Earlier Chapter' },
    { lat: -33.4489, lng: -70.6693, text: 'Santiago, Chile', description: 'Project Region' },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText('hermeny7@hotmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const handleLocationClick = (location) => {
    setActiveLocation(location);
  };

  return (
    <section className="c-space my-20" id="about">
      <h2 className="head-text mb-8 text-center">About Me</h2>

      {/* Achievement counters */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {achievements.map((item, index) => (
          <div key={index} className="bg-black-200 border border-black-300 rounded-lg p-4 text-center">
            <AnimatedCounter value={item.value} symbol={item.symbol} />
            <p className="text-white-600 mt-2">{item.label}</p>
          </div>
        ))}
      </div> */}

      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container h-full">
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Hi, I'm Hermenegildo Santos</p>
              <p className="grid-subtext">
                Full Stack Engineer with 5+ years shipping production systems across healthcare, enterprise, and
                live-event domains. Works across backend, frontend, mobile, cloud, and AI integration — from same-day
                WebAR events to healthcare platforms.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container h-full">
            <div className="p-3 h-full flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <p className="grid-headtext mb-0">Tech Stack</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="text-blue-500 hover:text-blue-400 text-sm transition-colors flex items-center gap-1">
                  <span>View all</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>

              <div className="skill-chips-container flex-grow">
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <SkillChip key={tech.name} name={tech.name} icon={tech.icon} />
                  ))}
                </div>
              </div>

              <div className="mt-auto">
                <div className="tech-tags mt-4 flex flex-wrap gap-2">
                  {secondaryTags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-black-300 text-white-600 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack Modal */}
          <TechStackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container h-full">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center relative">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={locations}
                labelLat={(d) => d.lat}
                labelLng={(d) => d.lng}
                labelText={(d) => d.text}
                labelSize={1.5}
                labelDotRadius={0.4}
                labelColor={() => 'rgba(255, 255, 255, 0.8)'}
                onLabelClick={handleLocationClick}
                labelResolution={2}
                initialScale={1.8}
                minScale={1}
                maxScale={3}
              />

              {/* Location info popup */}
              {activeLocation && (
                <div className="absolute bottom-2 left-0 right-0 mx-auto w-[80%] bg-black-300 bg-opacity-90 backdrop-filter backdrop-blur-sm p-3 rounded-lg text-center">
                  <p className="text-white font-medium">{activeLocation.text}</p>
                  <p className="text-white-600 text-sm">{activeLocation.description}</p>
                </div>
              )}
            </div>
            <div>
              <p className="grid-headtext">Used to collaborating across time zones with distributed teams</p>
              <p className="grid-subtext">
                Based in Covilhã, Portugal — experienced working remotely with distributed teams. Click on the globe to
                explore locations where I have worked.
              </p>
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex gap-4">
                  <Button href="#contact" name="Contact Me" isBeam containerClass="w-full flex-1" />
                </div>

                {/* ORCID ID Credential - moved here */}
                <a
                  href={orcidInfo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col p-2 bg-gradient-to-r from-[#A6CE39] to-[#A6CE39]/80 rounded-md hover:opacity-90 transition-opacity">
                  <div className="flex items-center">
                    <img src={orcidInfo.logo} alt="ORCID" className="w-4 h-4 mr-2 border border-black rounded-full" />
                    <div>
                      <span className="text-xs text-white font-medium block">ORCID ID</span>
                      <span className="text-xs text-white">{orcidInfo.id}</span>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-auto text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </div>

                  {orcidInfo.works && orcidInfo.works.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-white/20">
                      <div className="text-white text-xs font-medium mb-1">Validated Work:</div>
                      {orcidInfo.works.map((work, index) => (
                        <a
                          key={index}
                          href={work.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-white/90 hover:text-white block">
                          <div className="flex items-start">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 mr-1 mt-0.5 flex-shrink-0"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                            </svg>
                            <span>
                              {work.title} ({work.year})
                            </span>
                          </div>
                          <div className="text-[10px] ml-4 text-white/70">{work.journal}</div>
                          {work.doi && (
                            <div className="text-[10px] ml-4 text-white/70 mt-1">
                              DOI: <span className="text-blue-300 hover:underline">{work.doi}</span>
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container h-full">
            <div className="personal-journey p-5 border-l-4 border-blue-500 rounded-l-none rounded-r-lg bg-black-300 bg-opacity-30 mb-4">
              <h3 className="text-xl font-bold text-white mb-2">My Journey Into Development</h3>
              <div className={`space-y-3 ${!showFullJourney ? 'line-clamp-3' : ''}`}>
                <p className="text-white-600 leading-relaxed">
                  My path to becoming a developer began in Angola, where as a teenager, I first discovered the
                  transformative power of technology. Growing up in a region where digital solutions were scarce, I
                  witnessed firsthand how software could bridge gaps and solve real problems in people's lives.
                </p>
                <p className="text-white-600 leading-relaxed">
                  After completing my informatics studies in Angola, my curiosity led me across continents – from
                  Namibia to India and finally to Portugal, where I earned my Computer Science degree. This
                  international perspective shaped my approach to development: I don't just build applications; I create
                  solutions that work across cultural and geographic boundaries.
                </p>
                <p className="text-white-600 leading-relaxed">
                  My career evolution from initial coding projects to leading healthcare platforms and industrial
                  automation systems has been driven by a consistent principle: technology should simplify complexity.
                  Whether developing a microservice architecture for an eye care management system or digitizing
                  operations for a scrapyard, I focus on creating elegant solutions to messy real-world problems.
                </p>
                <p className="text-white-600 leading-relaxed">
                  What truly excites me as a developer is seeing how my code transforms workflows, enhances
                  accessibility, and ultimately improves lives. This satisfaction came full circle when I returned to
                  teach programming to students in Portugal, sharing the same spark that ignited my own journey.
                </p>
                <p className="text-white-600 leading-relaxed">
                  Today, I bring both technical expertise and a global perspective to every project, combining clean,
                  efficient code with a deep understanding of the human needs behind the technology. My international
                  background enables me to create solutions that transcend cultural boundaries and make a real impact.
                </p>
              </div>
              <button
                onClick={() => setShowFullJourney(!showFullJourney)}
                className="mt-2 text-blue-500 hover:text-blue-400 transition-colors flex items-center gap-1 text-sm">
                <span>{showFullJourney ? 'View Less' : 'View More'}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transform transition-transform ${showFullJourney ? 'rotate-180' : ''}`}>
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
            </div>

            <div className="flex-grow">
              <p className="grid-headtext">What I ship</p>
              <p className="grid-subtext">
                Production systems end-to-end: live-event AI (Azure OpenAI + WebRTC), same-day WebAR for ~2,100
                participants across 12 locations, healthcare platforms, and UN institutional software. Day-to-day stack
                is TypeScript, React, Node.js, Python/FastAPI, Azure, and Go.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container h-full">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2 flex-grow">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">hermeny7@hotmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
