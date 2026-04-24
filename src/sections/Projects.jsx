import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';

const projectCount = myProjects.length;

const DetailModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project.detailedInfo) return null;

  const { detailedInfo } = project;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-80">
      <div
        ref={modalRef}
        className="bg-[#0a0a0a] border border-[#333] rounded-lg p-6 max-w-4xl max-h-[90vh] overflow-y-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{project.title} - Technical Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
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

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-[#4299E1]">Overview</h3>
            <p>{detailedInfo.overview}</p>
          </div>

          {detailedInfo.objectives && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#4299E1]">Core Objectives</h3>
              <ul className="list-disc pl-5 space-y-1">
                {detailedInfo.objectives.map((objective, idx) => (
                  <li key={idx}>{objective}</li>
                ))}
              </ul>
            </div>
          )}

          {detailedInfo.stakeholders && (
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#4299E1]">Key Stakeholders</h3>
              <ul className="list-disc pl-5 space-y-1">
                {detailedInfo.stakeholders.map((stakeholder, idx) => (
                  <li key={idx}>{stakeholder}</li>
                ))}
              </ul>
            </div>
          )}

          {detailedInfo.frontend && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#4299E1]">Frontend Technologies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(detailedInfo.frontend).map(([category, items]) => (
                  <div key={category} className="border border-[#333] rounded-md p-4">
                    <h4 className="text-lg font-medium mb-2 capitalize">{category}</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {items.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {detailedInfo.backend && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-[#4299E1]">Backend Technologies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(detailedInfo.backend).map(([category, items]) => (
                  <div key={category} className="border border-[#333] rounded-md p-4">
                    <h4 className="text-lg font-medium mb-2 capitalize">{category}</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {items.map((item, idx) => (
                        <li key={idx} className="text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#4299E1] hover:bg-[#3182CE] text-white rounded-md transition-colors">
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const handleNavigation = (direction) => {
    const newIndex =
      direction === 'previous'
        ? selectedProjectIndex === 0
          ? projectCount - 1
          : selectedProjectIndex - 1
        : selectedProjectIndex === projectCount - 1
          ? 0
          : selectedProjectIndex + 1;

    setSelectedProjectIndex(newIndex);

    // Track project navigation in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'project_navigation', {
        event_category: 'engagement',
        event_label: direction,
        project_title: myProjects[newIndex].title,
      });
    }
  };

  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
  }, [selectedProjectIndex]);

  const currentProject = myProjects[selectedProjectIndex];

  return (
    <section className="c-space my-20" id="projects">
      <p className="head-text">My Selected Work</p>

      <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
        <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200">
          <div className="absolute top-0 right-0">
            <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
          </div>

          <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
            <img
              className="h-10 w-auto max-w-[160px] object-contain shadow-sm"
              src={currentProject.logo}
              alt="logo"
            />
          </div>

          <div className="flex flex-col gap-5 text-white-600 my-5">
            <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>

            <p className="animatedText">{currentProject.desc}</p>
            <p className="animatedText">{currentProject.subdesc}</p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-5">
            <div className="flex items-center gap-3 flex-wrap">
              {currentProject.tags.map((tag, index) => (
                <div key={index} className="tech-logo">
                  <img src={tag.path} alt={tag.name} />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              {currentProject.detailedInfo && (
                <button
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md text-white transition-colors"
                  onClick={() => setModalOpen(true)}>
                  View Details
                </button>
              )}

              <a
                className="flex items-center gap-2 cursor-pointer text-white-600"
                href={currentProject.href}
                target="_blank"
                rel="noreferrer">
                <p>Check Live Site</p>
                <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="flex justify-between items-center mt-7">
            <button
              className="arrow-btn bg-blue-500 hover:bg-blue-600 p-3 rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl flex items-center justify-center"
              onClick={() => handleNavigation('previous')}
              aria-label="Previous project">
              <img src="/assets/left-arrow.png" alt="left arrow" className="w-5 h-5 filter brightness-0 invert" />
            </button>

            <div className="flex items-center">
              <span className="text-white-600 text-sm">
                {selectedProjectIndex + 1} / {projectCount}
              </span>
            </div>

            <button
              className="arrow-btn bg-blue-500 hover:bg-blue-600 p-3 rounded-full shadow-lg transition-all hover:scale-110 hover:shadow-xl flex items-center justify-center"
              onClick={() => handleNavigation('next')}
              aria-label="Next project">
              <img src="/assets/right-arrow.png" alt="right arrow" className="w-5 h-5 filter brightness-0 invert" />
            </button>
          </div>
        </div>

        <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
          <Canvas>
            <ambientLight intensity={Math.PI} />
            <directionalLight position={[10, 10, 5]} />
            <Center>
              <Suspense fallback={<CanvasLoader />}>
                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                  <DemoComputer
                    texture={currentProject.texture}
                    slides={currentProject.slideshow}
                    slideshowOptions={currentProject.slideshowOptions}
                  />
                </group>
              </Suspense>
            </Center>
            <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
          </Canvas>
        </div>
      </div>

      <DetailModal project={currentProject} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};

export default Projects;