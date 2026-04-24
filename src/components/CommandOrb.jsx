import { Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

const CommandOrb = ({ position, accent = '#4cc9f0' }) => {
  const groupRef = useRef();
  const ringRefs = useRef([]);
  const basePosition = useMemo(() => [...position], [position]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const elapsed = clock.elapsedTime;
    groupRef.current.position.y = basePosition[1] + Math.sin(elapsed * 0.9) * 0.22;
    groupRef.current.rotation.y = elapsed * 0.35;

    ringRefs.current.forEach((ring, index) => {
      if (!ring) return;
      ring.rotation.x = elapsed * (0.25 + index * 0.12);
      ring.rotation.y = elapsed * (0.45 + index * 0.1);
    });
  });

  return (
    <Float speed={1.5} rotationIntensity={0.16} floatIntensity={0.35}>
      <group ref={groupRef} position={position}>
        <pointLight color={accent} intensity={16} distance={14} decay={2} />

        <mesh>
          <icosahedronGeometry args={[0.95, 1]} />
          <meshStandardMaterial color="#081120" emissive={accent} emissiveIntensity={0.55} metalness={0.5} roughness={0.16} />
        </mesh>

        {[1.6, 2.1, 2.55].map((radius, index) => (
          <mesh
            key={radius}
            ref={(mesh) => {
              ringRefs.current[index] = mesh;
            }}
            rotation={[index * 0.7, index * 0.4, index * 0.35]}>
            <torusGeometry args={[radius, 0.045, 16, 80]} />
            <meshStandardMaterial
              color={index === 1 ? '#ffffff' : accent}
              emissive={accent}
              emissiveIntensity={0.28}
              transparent
              opacity={0.78}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

export default CommandOrb;
