import { Leva } from 'leva';
import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { PerspectiveCamera } from '@react-three/drei';

import Cube from '../components/Cube.jsx';
import Rings from '../components/Rings.jsx';
import ReactLogo from '../components/ReactLogo.jsx';
import Button from '../components/Button.jsx';
import Target from '../components/Target.jsx';
import CanvasLoader from '../components/Loading.jsx';
import HeroCamera from '../components/HeroCamera.jsx';
import { calculateSizes } from '../constants/index.js';
import { HackerRoom } from '../components/HackerRoom.jsx';

// MouseParallaxGroup component to add subtle movement to 3D objects
const MouseParallaxGroup = ({ children, strength = 0.5 }) => {
  const group = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Calculate mouse position relative to the center of the screen
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  useFrame(() => {
    if (group.current) {
      // Apply smooth transition to the group's rotation
      group.current.rotation.y = mousePosition.x * Math.PI * 0.1;
      group.current.rotation.x = -mousePosition.y * Math.PI * 0.1;
    }
  });

  return <group ref={group}>{children}</group>;
};

const TypewriterEffect = () => {
  const phrases = [
    'Building Products & Brands',
    'Creating Digital Experiences',
    'Solving Complex Problems',
    'Transforming Ideas into Reality',
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));

        // If we've typed the full phrase, start deleting after a pause
        if (displayText === currentPhrase) {
          setIsDeleting(true);
          setTypingSpeed(100); // Slightly faster when deleting
          setTimeout(() => {
            setTypingSpeed(50);
          }, 1500); // Pause before deleting
        }
      } else {
        // Deleting
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));

        // If we've deleted the full phrase, move to the next one
        if (displayText === '') {
          setIsDeleting(false);
          setTypingSpeed(80);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, currentPhraseIndex, isDeleting, typingSpeed]);

  return (
    <span className="hero_tag text-gray_gradient">
      {displayText}
      <span className="typing-cursor">|</span>
    </span>
  );
};

const Hero = () => {
  // Use media queries to determine screen size
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sizes = calculateSizes(isSmall, isMobile, isTablet);

  return (
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="hero-gradient"></div>
      </div>

      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3 z-10">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-generalsans">
          Hi, I am Hermenegildo <span className="waving-hand">👋</span>
        </p>
        <div className="text-center">
          <TypewriterEffect />
        </div>
      </div>

      <div className="w-full h-full absolute inset-0 z-5">
        <Canvas className="w-full h-full">
          <Suspense fallback={<CanvasLoader />}>
            {/* To hide controller */}
            <Leva hidden />
            <PerspectiveCamera makeDefault position={[0, 0, 30]} />

            <HeroCamera isMobile={isMobile}>
              <HackerRoom scale={sizes.deskScale} position={sizes.deskPosition} rotation={[0.1, -Math.PI, 0]} />
            </HeroCamera>

            <MouseParallaxGroup strength={0.8}>
              <group>
                <Target position={sizes.targetPosition} />
                <ReactLogo position={sizes.reactLogoPosition} />
                <Rings position={sizes.ringPosition} />
                <Cube position={sizes.cubePosition} />
              </group>
            </MouseParallaxGroup>

            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>

      <div className="absolute bottom-7 left-0 right-0 w-full z-10 c-space">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#about" className="w-fit">
            <Button name="Let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-[180px]" />
          </a>
          <a href="#projects" className="w-fit">
            <Button name="View my projects" containerClass="sm:w-fit w-full sm:min-w-[180px]" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-[-70px] left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
          <span className="text-white text-xs mb-2">Scroll Down</span>
          <div className="scroll-indicator">
            <div className="scroll-indicator-dot"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;