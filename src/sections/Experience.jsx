import { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import Developer from '../components/Developer.jsx';
import CanvasLoader from '../components/Loading.jsx';
import { workExperiences } from '../constants/index.js';

const WorkExperience = () => {
  const [animationName, setAnimationName] = useState('idle');
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [viewMode, setViewMode] = useState('carousel'); // 'carousel' or 'timeline'
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const workCanvasRef = useRef(null);
  const workContentRef = useRef(null);

  // Calculate total number of pages based on showing 3 items per page
  const totalPages = Math.ceil(workExperiences.length / 3);

  // Get current experiences to display (3 at a time in carousel mode)
  const currentExperiences = workExperiences.slice(currentPage * 3, currentPage * 3 + 3);

  // Handle navigation with animation control
  const handlePrevPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNextPage = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  // Toggle between detailed and summary view for an experience
  const toggleExpandExperience = (id) => {
    // If currently expanded, we're collapsing, so add a small delay
    // to allow the animation to complete before removing the expanded state
    if (expandedExperience === id) {
      setIsCollapsing(true);
      // First set a class to trigger the collapse animation
      const container = document.querySelector(`[data-experience-id="${id}"]`);
      if (container) {
        container.classList.add('collapsing');

        // After animation completes, remove the expanded state
        setTimeout(() => {
          setExpandedExperience(null);
          // Add a small additional delay before completely resetting state
          setTimeout(() => {
            setIsCollapsing(false);
            // Reset any collapsed items
            document.querySelectorAll('.collapsing').forEach((el) => {
              el.classList.remove('collapsing');
            });
          }, 100);
        }, 300); // Match with transition duration
      } else {
        setExpandedExperience(null);
        setIsCollapsing(false);
      }
    } else {
      // Expanding is immediate
      setExpandedExperience(id);
    }
  };

  // Reset animation flag after transition completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 500); // Match this with the CSS transition duration

    return () => clearTimeout(timer);
  }, [currentPage]);

  // Effect to handle container size changes
  useEffect(() => {
    // When no experience is expanded or in collapsing state, reset the container
    if (!expandedExperience && !isCollapsing) {
      const workContainer = document.querySelector('.work-container');
      if (workContainer) {
        workContainer.style.height = '';
        const workCanvas = document.querySelector('.work-canvas');
        if (workCanvas) {
          workCanvas.style.height = '';
        }
      }
    }
  }, [expandedExperience, isCollapsing]);

  // Effect to synchronize heights between canvas and content
  useEffect(() => {
    // Function to match heights
    const syncHeights = () => {
      if (workCanvasRef.current && workContentRef.current && viewMode === 'carousel') {
        const contentHeight = workContentRef.current.offsetHeight;
        workCanvasRef.current.style.height = `${contentHeight}px`;
      }
    };

    // Run once on mount and whenever relevant state changes
    syncHeights();

    // Run again after a slight delay to account for content rendering
    const timer = setTimeout(syncHeights, 100);

    // Also set up a resize event listener
    window.addEventListener('resize', syncHeights);

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', syncHeights);
    };
  }, [expandedExperience, viewMode, currentPage]);

  // Timeline experience card component
  const TimelineExperienceCard = ({ experience, index }) => {
    const isExpanded = expandedExperience === experience.id;

    return (
      <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'} mb-10`} key={experience.id}>
        <div
          className={`bg-black-200 p-5 rounded-lg border border-black-300 transition-all duration-300 cursor-pointer ${
            isExpanded ? 'shadow-lg shadow-blue-500/20' : 'hover:shadow-sm hover:shadow-blue-500/10'
          }`}
          onClick={() => toggleExpandExperience(experience.id)}>
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-black-300 p-2 mr-4 flex-shrink-0">
              <img src={experience.icon} alt={experience.name} className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{experience.name}</h3>
              <p className="text-sm text-white-600">
                {experience.pos} — {experience.duration}
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpandExperience(experience.id);
              }}
              className="text-blue-500 hover:text-blue-400 transition-colors ml-auto">
              {isExpanded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </button>
          </div>

          <p className="text-white-600 mb-3">{experience.title}</p>

          {isExpanded && (
            <div className="mt-4 space-y-4 animate-fadeIn">
              <div>
                <h4 className="text-sm font-semibold text-white-800 mb-1">About the Company</h4>
                <p className="text-sm text-white-600">{experience.companyDescription}</p>
              </div>

              {experience.projects ? (
                <div className="space-y-4">
                  {experience.projects.map((project, i) => (
                    <div key={i} className="bg-black-300 bg-opacity-30 p-3 rounded-lg">
                      <h4 className="text-sm font-semibold text-white-800 mb-1">{project.name}</h4>
                      <p className="text-sm text-white-600 mb-2">{project.description}</p>
                      <ul className="list-disc list-inside space-y-1 pl-1">
                        {project.achievements.map((achievement, j) => (
                          <li key={j} className="text-sm text-white-600">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <h4 className="text-sm font-semibold text-white-800 mb-1">Key Achievements</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {experience.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm text-white-600">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h4 className="text-sm font-semibold text-white-800 mb-1">Skills & Technologies</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {experience.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-black-300 text-white-600 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {experience.certificates && experience.certificates.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-white-800 mb-1">Certifications</h4>
                  <div className="space-y-1">
                    {experience.certificates.map((cert, i) => (
                      <a
                        key={i}
                        href={cert.url}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm text-blue-500 hover:text-blue-400 transition-colors flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        {cert.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Carousel experience card component
  const CarouselExperienceCard = ({ item }) => {
    const isExpanded = expandedExperience === item.id;

    return (
      <div
        key={item.id}
        data-experience-id={item.id}
        className={`work-content_container group cursor-pointer ${isExpanded ? 'expanded' : ''}`}
        onClick={() => toggleExpandExperience(item.id)}
        onMouseEnter={() => setAnimationName(item.animation.toLowerCase())}
        onMouseLeave={() => setAnimationName('idle')}>
        <div
          className="flex flex-col h-full justify-start items-center py-2"
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <div className="work-content_logo">
            <img className="w-full h-full" src={item.icon} alt="" />
          </div>
          <div className="work-content_bar" />
        </div>

        <div className="sm:p-5 px-2.5 py-5">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-bold text-white-800">{item.name}</p>
              <p className="text-sm mb-2">
                {item.pos} -- <span>{item.duration}</span>
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpandExperience(item.id);
              }}
              className="text-blue-500 hover:text-blue-400 transition-colors">
              {isExpanded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              )}
            </button>
          </div>

          <div
            className={`transition-all duration-300 ${isExpanded ? 'max-h-[800px] opacity-100 overflow-y-auto' : 'max-h-20 overflow-hidden'}`}>
            <p className="group-hover:text-white transition-all ease-in-out duration-500">{item.title}</p>

            {isExpanded && (
              <div className="mt-4 space-y-3 animate-fadeIn">
                <div>
                  <h4 className="text-xs font-semibold text-white-800 mb-1">About {item.name}</h4>
                  <p className="text-xs text-white-600">{item.companyDescription}</p>
                </div>

                {item.projects ? (
                  <div className="space-y-3">
                    {item.projects.map((project, i) => (
                      <div key={i} className="bg-black-300 bg-opacity-30 p-3 rounded-lg">
                        <h4 className="text-xs font-semibold text-white-800 mb-1">{project.name}</h4>
                        <p className="text-xs text-white-600 mb-1">{project.description}</p>
                        <ul className="list-disc list-inside text-xs space-y-1">
                          {project.achievements.map((achievement, j) => (
                            <li key={j} className="text-white-600">
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    <h4 className="text-xs font-semibold text-white-800 mb-1">Key Achievements</h4>
                    <ul className="list-disc list-inside text-xs space-y-1 pl-1">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="text-white-600">
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-semibold text-white-800 mb-1">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {item.skills.map((skill, i) => (
                      <span key={i} className="px-2 py-0.5 bg-black-300 text-white-600 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {item.certificates?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-white-800 mb-1">Certifications</h4>
                    {item.certificates.map((cert, i) => (
                      <a
                        key={i}
                        href={cert.url}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-blue-500 hover:text-blue-400 transition-colors flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mr-1">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                        </svg>
                        {cert.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="c-space my-20" id="work">
      <div className="w-full text-white-600">
        <div className="flex justify-between items-center mb-8">
          <p className="head-text">My Work Experience</p>

          <div className="flex bg-black-300 rounded-full p-1">
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                viewMode === 'carousel' ? 'bg-blue-500 text-white' : 'text-white-600 hover:text-white'
              }`}>
              Carousel
            </button>
            <button
              onClick={() => setViewMode('timeline')}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                viewMode === 'timeline' ? 'bg-blue-500 text-white' : 'text-white-600 hover:text-white'
              }`}>
              Timeline
            </button>
          </div>
        </div>

        {viewMode === 'carousel' ? (
          <div className="work-container">
            <div className="work-canvas" ref={workCanvasRef}>
              <Canvas>
                <ambientLight intensity={7} />
                <spotLight position={[5, 8, 5]} angle={0.4} penumbra={1} intensity={3} />
                <directionalLight position={[0, 5, 5]} intensity={1} />
                <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#ffeedd" />
                <spotLight
                  position={[0, 1, 5]}
                  angle={0.5}
                  penumbra={0.8}
                  intensity={2}
                  color="#ffffff"
                  distance={10}
                  target-position={[0, 0, 0]}
                />
                <OrbitControls
                  enableZoom={false}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 3}
                  minAzimuthAngle={-Math.PI / 6}
                  maxAzimuthAngle={Math.PI / 6}
                  target={[0, 0, 0]}
                />

                <Suspense fallback={<CanvasLoader />}>
                  <Developer position-y={-2} position-x={0} scale={1.8} animationName={animationName} />
                </Suspense>
              </Canvas>
            </div>

            <div className="work-content" ref={workContentRef}>
              <div className="sm:py-10 py-5 sm:px-5 px-2.5 relative overflow-hidden">
                <div
                  className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 transform translate-x-10' : 'opacity-100 transform translate-x-0'}`}>
                  {currentExperiences.map((item) => (
                    <CarouselExperienceCard key={item.id} item={item} />
                  ))}
                </div>

                {/* Navigation arrows */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={handlePrevPage}
                    className="arrow-btn"
                    aria-label="Previous experiences"
                    disabled={isAnimating}>
                    <img src="/assets/left-arrow.png" alt="Previous" className="w-full h-full object-contain" />
                  </button>

                  <div className="flex gap-2 items-center">
                    {Array.from({ length: totalPages }).map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === index ? 'bg-white' : 'bg-white-500'}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNextPage}
                    className="arrow-btn"
                    aria-label="Next experiences"
                    disabled={isAnimating}>
                    <img src="/assets/right-arrow.png" alt="Next" className="w-full h-full object-contain" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="timeline-container relative pb-10">
            {/* Timeline center line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-black-300"></div>

            {/* Timeline items */}
            <div className="relative">
              {workExperiences.map((experience, index) => (
                <TimelineExperienceCard key={experience.id} experience={experience} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WorkExperience;
