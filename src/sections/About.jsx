import { useState, useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

import Button from '../components/Button.jsx';
import GitHubContributions from '../components/GitHubContributions.jsx';

// Comprehensive technical skills data organized by categories
const technicalSkills = {
  frontend: {
    title: 'Frontend Development',
    skills: [
      { name: 'React', proficiency: 95, icon: '/assets/skills/react.svg' },
      { name: 'Next.js', proficiency: 92, icon: '/assets/skills/next.svg' },
      { name: 'TypeScript', proficiency: 90, icon: '/assets/skills/typescript.svg' },
      { name: 'JavaScript', proficiency: 95, icon: '/assets/skills/javascript.svg' },
      { name: 'HTML5/CSS3', proficiency: 95, icon: '/assets/skills/html.svg' },
    ],
  },
  ui: {
    title: 'UI Libraries',
    skills: [
      { name: 'Material UI', proficiency: 88, icon: '/assets/skills/mui.svg' },
      { name: 'Tailwind CSS', proficiency: 95, icon: '/assets/skills/tailwind.svg' },
      { name: 'Bootstrap', proficiency: 85, icon: '/assets/skills/bootstrap.svg' },
      { name: 'Sass', proficiency: 88, icon: '/assets/skills/sass.svg' },
    ],
  },
  state: {
    title: 'State Management',
    skills: [
      { name: 'Redux', proficiency: 85, icon: '/assets/skills/redux.svg' },
      { name: 'Context API', proficiency: 90, icon: '/assets/skills/react.svg' },
      { name: 'Recoil', proficiency: 85, icon: '/assets/skills/recoil.svg' },
    ],
  },
  mobile: {
    title: 'Mobile Development',
    skills: [
      { name: 'Flutter', proficiency: 82, icon: '/assets/skills/flutter.svg' },
      { name: 'Dart', proficiency: 80, icon: '/assets/skills/dart.svg' },
      { name: 'React Native', proficiency: 85, icon: '/assets/skills/react.svg' },
    ],
  },
  testing: {
    title: 'Testing',
    skills: [
      { name: 'Jest', proficiency: 88, icon: '/assets/skills/jest.svg' },
      { name: 'React Testing Library', proficiency: 85, icon: '/assets/skills/reacttestinglibrary.svg' },
      { name: 'Cypress', proficiency: 82, icon: '/assets/skills/cypress.svg' },
    ],
  },
  backend: {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', proficiency: 88, icon: '/assets/skills/nodejs.svg' },
      { name: 'NestJS', proficiency: 90, icon: '/assets/skills/nestjs.svg' },
      { name: 'Express', proficiency: 88, icon: '/assets/skills/express.svg' },
      { name: 'GraphQL', proficiency: 85, icon: '/assets/skills/graphql.svg' },
      { name: 'Python', proficiency: 80, icon: '/assets/skills/python.svg' },
      { name: 'FastAPI', proficiency: 78, icon: '/assets/skills/fastapi.svg' },
    ],
  },
  database: {
    title: 'Database & Storage',
    skills: [
      { name: 'PostgreSQL', proficiency: 85, icon: '/assets/skills/postgresql.svg' },
      { name: 'MySQL', proficiency: 85, icon: '/assets/skills/mysql.svg' },
      { name: 'MongoDB', proficiency: 92, icon: '/assets/skills/mongodb.svg' },
      { name: 'Firebase', proficiency: 88, icon: '/assets/skills/firebase.svg' },
      { name: 'Prisma', proficiency: 90, icon: '/assets/skills/prisma.svg' },
      { name: 'Redis', proficiency: 82, icon: '/assets/skills/redis.svg' },
    ],
  },
  devops: {
    title: 'DevOps & Infrastructure',
    skills: [
      { name: 'AWS', proficiency: 83, icon: '/assets/skills/aws.svg' },
      { name: 'Azure', proficiency: 85, icon: '/assets/skills/azure.svg' },
      { name: 'Vercel', proficiency: 90, icon: '/assets/skills/vercel.svg' },
      { name: 'Docker', proficiency: 85, icon: '/assets/skills/docker.svg' },
      { name: 'GitHub Actions', proficiency: 88, icon: '/assets/skills/github.svg' },
    ],
  },
  methodologies: {
    title: 'Methodologies & Tools',
    skills: [
      { name: 'Agile/Scrum', proficiency: 90, icon: '/assets/skills/framer.svg' },
      { name: 'Git/GitHub', proficiency: 95, icon: '/assets/skills/github.svg' },
      { name: 'Microservices', proficiency: 88, icon: '/assets/skills/kubernetes.svg' },
      { name: 'Code Reviews', proficiency: 95, icon: '/assets/skills/git.svg' },
    ],
  },
};

// Simple tech stack data for condensed view
const techStack = [
  { name: 'React', proficiency: 95, icon: '/assets/skills/react.svg' },
  { name: 'Next.js', proficiency: 92, icon: '/assets/skills/next.svg' },
  { name: 'TypeScript', proficiency: 90, icon: '/assets/skills/typescript.svg' },
  { name: 'GraphQL', proficiency: 85, icon: '/assets/skills/graphql.svg' },
  { name: 'NestJS', proficiency: 90, icon: '/assets/skills/nestjs.svg' },
  { name: 'AWS', proficiency: 83, icon: '/assets/skills/aws.svg' },
  { name: 'Docker', proficiency: 85, icon: '/assets/skills/docker.svg' },
];

// Achievement data
const achievements = [
  { value: 4, label: 'Years Experience', symbol: '+' },
  { value: 15, label: 'Projects Completed', symbol: '+' },
  { value: 12, label: 'Happy Clients', symbol: '+' },
  { value: 2, label: 'Design Awards', symbol: '' },
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

// SkillBar component for tech stack visualization
const SkillBar = ({ name, proficiency, icon }) => {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <img src={icon} alt={name} className="w-5 h-5" />
          <span className="text-white text-sm">{name}</span>
        </div>
        <span className="text-white-600 text-sm">{proficiency}%</span>
      </div>
      <div className="h-1.5 w-full bg-black-300 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full skill-bar-animation"
          style={{ width: `${proficiency}%` }}></div>
      </div>
    </div>
  );
};

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
            <div className="space-y-4">
              {technicalSkills[activeCategory].skills.map((skill, index) => (
                <SkillBar key={index} name={skill.name} proficiency={skill.proficiency} icon={skill.icon} />
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
                    {technicalSkills[category].skills.slice(0, 3).map((skill, index) => (
                      <div key={index} className="flex items-center gap-2 mb-2">
                        <img src={skill.icon} alt={skill.name} className="w-4 h-4" />
                        <span className="text-white text-xs">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">Skill Distribution</h3>
              <div className="grid grid-cols-3 gap-2">
                {Object.keys(technicalSkills).map((category) => {
                  const avgProficiency =
                    technicalSkills[category].skills.reduce((sum, skill) => sum + skill.proficiency, 0) /
                    technicalSkills[category].skills.length;

                  return (
                    <div
                      key={category}
                      className={`relative cursor-pointer ${category === activeCategory ? 'z-10' : ''}`}
                      onMouseEnter={() => setActiveCategory(category)}>
                      <div className="text-xs text-white-600 mb-1 truncate">
                        {technicalSkills[category].title.split(' ')[0]}
                      </div>
                      <div
                        className="h-6 rounded transition-all duration-300"
                        style={{
                          backgroundColor: category === activeCategory ? '#3b82f6' : '#1f2937',
                          width: '100%',
                          opacity: category === activeCategory ? 1 : 0.7,
                        }}></div>
                    </div>
                  );
                })}
              </div>
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
    { lat: 38.7223, lng: -9.1393, text: 'Lisbon, Portugal', description: 'Current Location' },
    { lat: -8.8383, lng: 13.2344, text: 'Luanda, Angola', description: 'Previous Project' },
    { lat: -22.5609, lng: 17.0658, text: 'Windhoek, Namibia', description: 'Previous Project' },
    { lat: 28.6139, lng: 77.209, text: 'New Delhi, India', description: 'Previous Project' },
    { lat: -33.4489, lng: -70.6693, text: 'Santiago, Chile', description: 'Previous Project' },
    { lat: 37.7749, lng: -122.4194, text: 'San Francisco, USA', description: 'Previous Project' },
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
          <div className="grid-container">
            <img src="assets/grid1.png" alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />

            <div>
              <p className="grid-headtext">Hi, I'm Hermenegildo Santos</p>
              <p className="grid-subtext">
                With 4+ years of experience, I have honed my skills in both frontend and backend development, creating
                dynamic and responsive websites that deliver exceptional user experiences.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <div className="p-3">
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

              <div className="skill-bars-container">
                {techStack.map((tech, index) => (
                  <SkillBar key={index} name={tech.name} proficiency={tech.proficiency} icon={tech.icon} />
                ))}
              </div>

              <div className="tech-tags mt-4 flex flex-wrap gap-2">
                {[
                  'Microservices',
                  'CI/CD',
                  'Redux',
                  'Kubernetes',
                  'Azure',
                  'PostgreSQL',
                  'React Native',
                  'Jest',
                  'MongoDB',
                ].map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-black-300 text-white-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack Modal */}
          <TechStackModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
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
              <p className="grid-headtext">I'm very flexible with time zone communications & locations</p>
              <p className="grid-subtext">
                I&apos;m based in Covilhã, Portugal and open to remote work worldwide. Click on the globe to explore
                locations where I have worked.
              </p>
              <div className="flex gap-4 mt-10">
                <a href="#contact" className="flex-1">
                  <Button name="Contact Me" isBeam containerClass="w-full" />
                </a>
                <a href="/assets/hermenegildo-santos-resume.pdf" download className="flex-1">
                  <Button
                    name="Download CV"
                    containerClass="w-full"
                    bgClass="bg-black-300 hover:bg-black-500"
                    icon={{
                      src: 'assets/download.svg',
                      alt: 'download',
                      position: 'right',
                    }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
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

            <div>
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving complex problems and building things through code. Programming isn&apos;t just my
                profession—it&apos;s my passion. I enjoy exploring new technologies, contributing to open-source
                projects, and continually enhancing my skills to stay at the cutting edge of web development.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src="assets/grid4.png"
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <img src={hasCopied ? 'assets/tick.svg' : 'assets/copy.svg'} alt="copy" />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">hermeny7@hotmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Contributions Section */}
      <div className="mt-16">
        <h2 className="head-text mb-8">Open Source Contributions</h2>
        <GitHubContributions username="HermenySantos" />
      </div>
    </section>
  );
};

export default About;
