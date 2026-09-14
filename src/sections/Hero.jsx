import { Leva } from 'leva';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';

import Button from '../components/Button.jsx';
import CanvasLoader from '../components/Loading.jsx';
import CommandRigScene from '../components/CommandRigScene.jsx';
import TypeOnLoadText from '../components/typeOnLoadText.jsx';
import { getHeroSceneConfig } from '../constants/heroScene.js';

const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 440 });
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const sceneConfig = getHeroSceneConfig({ isSmall, isMobile, isTablet });

  return (
    <section className="hero-section section-anchor" id="home">
      <div className="hero-background">
        <div className="hero-radial"></div>
        <div className="hero-grid-lines"></div>
      </div>

      <div className="hero-scene">
        <Canvas className="w-full h-full" dpr={[1, 1.5]}>
          <Suspense fallback={<CanvasLoader />}>
            <Leva hidden />
            <CommandRigScene config={sceneConfig} isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>

      <div className="hero-shell c-space">
        <div className="hero-copy-column">
          <div className="hero-badge">
            <span className="hero-badge_dot"></span>
            Full-Stack AI Engineer
          </div>

          <TypeOnLoadText
            as="h1"
            className="hero-title"
            text="I ship production AI and live-event systems end-to-end."
            stepMs={58}
          />

          <p className="hero-copy">
            Owned a same-day global WebAR event — ~2,100 participants across 12
            locations in 5 weeks (Dorier).
            <br />
            TypeScript · React · Node · Azure OpenAI · WebAR
          </p>

          <div className="hero-cta_row">
            <Button
              href="#contact"
              name="Build with me"
              isBeam
              containerClass="sm:min-w-[180px] w-full"
            />
            <Button
              href="#projects"
              name="See live work"
              containerClass="sm:min-w-[180px] w-full"
              bgClass="hero-secondary-btn"
            />
          </div>

          <p className="hero-meta">PORTUGAL · REMOTE</p>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-indicator">
          <div className="scroll-indicator-dot"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
