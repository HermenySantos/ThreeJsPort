import { Float, RoundedBox, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';

const CommandPanel = ({ panel }) => {
  const groupRef = useRef();
  const basePosition = useMemo(() => [...panel.position], [panel.position]);
  const baseRotation = useMemo(() => [...panel.rotation], [panel.rotation]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const elapsed = clock.elapsedTime;
    groupRef.current.position.y = basePosition[1] + Math.sin(elapsed * 0.8 + panel.scale) * 0.18;
    groupRef.current.rotation.z = baseRotation[2] + Math.sin(elapsed * 0.45 + panel.scale) * 0.04;
  });

  return (
    <Float speed={1.3} rotationIntensity={0.08} floatIntensity={0.18}>
      <group
        ref={groupRef}
        position={panel.position}
        rotation={panel.rotation}
        scale={panel.scale}>
        <RoundedBox args={[3.6, 2.15, 0.14]} radius={0.18} smoothness={5}>
          <meshStandardMaterial
            color="#050d18"
            roughness={0.18}
            metalness={0.62}
            emissive={panel.accent}
            emissiveIntensity={0.14}
          />
        </RoundedBox>

        <mesh position={[0, 0, 0.075]}>
          <planeGeometry args={[3.2, 1.78]} />
          <meshBasicMaterial color="#091423" transparent opacity={0.9} />
        </mesh>

        <mesh position={[-0.95, 0.68, 0.08]}>
          <planeGeometry args={[1.5, 0.08]} />
          <meshBasicMaterial color={panel.accent} toneMapped={false} />
        </mesh>

        <mesh position={[-0.95, 0.46, 0.08]}>
          <planeGeometry args={[1.15, 0.04]} />
          <meshBasicMaterial color="#4b5b7a" transparent opacity={0.65} />
        </mesh>

        {[0.85, 0.55, 0.35].map((height, index) => (
          <mesh
            key={height}
            position={[-1.1 + index * 0.42, -0.48 + height / 2, 0.08]}>
            <boxGeometry args={[0.18, height, 0.04]} />
            <meshStandardMaterial
              color={index === 1 ? panel.accent : '#132033'}
              emissive={panel.accent}
              emissiveIntensity={index === 1 ? 0.3 : 0.08}
            />
          </mesh>
        ))}

        <Text
          position={[-1.1, 0.82, 0.09]}
          anchorX="left"
          anchorY="middle"
          fontSize={0.22}
          color="#d8f5ff">
          {panel.title.toUpperCase()}
        </Text>

        <Text
          position={[-1.1, 0.15, 0.09]}
          anchorX="left"
          anchorY="middle"
          fontSize={0.56}
          fontWeight={700}
          color="#ffffff">
          {panel.value}
        </Text>

        <Text
          position={[-1.1, -0.58, 0.09]}
          anchorX="left"
          anchorY="middle"
          fontSize={0.19}
          color="#7dd3fc">
          {panel.detail}
        </Text>
      </group>
    </Float>
  );
};

export default CommandPanel;
