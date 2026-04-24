import { Sparkles, ContactShadows, PerspectiveCamera } from '@react-three/drei';

import HeroCamera from './HeroCamera.jsx';
import { HackerRoom } from './HackerRoom.jsx';

const CommandRigScene = ({ config, isMobile }) => {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <fog attach="fog" args={['#020611', 18, 38]} />

      <ambientLight intensity={0.5} />
      <hemisphereLight groundColor="#020611" intensity={0.35} color="#9fdcff" />
      <directionalLight position={[10, 12, 8]} intensity={0.8} color="#dff6ff" />
      <pointLight position={[-6, 3, 6]} intensity={5} distance={16} color="#38bdf8" />
      <spotLight
        position={[2, 14, 10]}
        angle={0.32}
        penumbra={0.8}
        intensity={14}
        color="#67e8f9"
      />

      <HeroCamera isMobile={isMobile}>
        <group>
          <HackerRoom
            scale={config.deskScale}
            position={config.deskPosition}
            rotation={[0.1, -Math.PI, 0]}
          />
        </group>
      </HeroCamera>

      <Sparkles
        count={config.sparklesCount}
        scale={[18, 12, 8]}
        size={1.2}
        speed={0.2}
        opacity={0.22}
        color="#67e8f9"
      />

      <ContactShadows
        position={[0, -6.2, 0]}
        opacity={0.35}
        scale={26}
        blur={2.6}
        far={12}
      />
    </>
  );
};

export default CommandRigScene;
