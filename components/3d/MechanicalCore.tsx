"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Gear({
  radius,
  teeth,
  color,
  speed,
  offset = 0
}: {
  radius: number;
  teeth: number;
  color: string;
  speed: number;
  offset?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const toothAngles = useMemo(() => Array.from({ length: teeth }, (_, index) => (index / teeth) * Math.PI * 2), [teeth]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.z += delta * speed;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.mouse.y * 0.18 + offset, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.mouse.x * 0.22, 0.05);
  });

  return (
    <group ref={group}>
      <mesh castShadow receiveShadow>
        <torusGeometry args={[radius, 0.13, 24, 96]} />
        <meshStandardMaterial color={color} metalness={0.92} roughness={0.18} emissive={color} emissiveIntensity={0.1} />
      </mesh>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[radius * 0.34, radius * 0.34, 0.34, 48]} />
        <meshStandardMaterial color="#14191b" metalness={1} roughness={0.2} />
      </mesh>
      {toothAngles.map((angle) => (
        <mesh
          key={angle}
          castShadow
          receiveShadow
          position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]}
          rotation={[0, 0, angle]}
        >
          <boxGeometry args={[0.28, 0.12, 0.38]} />
          <meshStandardMaterial color="#d7eef6" metalness={1} roughness={0.22} emissive="#00aeef" emissiveIntensity={0.04} />
        </mesh>
      ))}
    </group>
  );
}

function Sparks() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(260 * 3);
    for (let index = 0; index < 260; index += 1) {
      const radius = 1.2 + Math.random() * 3.4;
      const angle = Math.random() * Math.PI * 2;
      array[index * 3] = Math.cos(angle) * radius;
      array[index * 3 + 1] = (Math.random() - 0.5) * 2.8;
      array[index * 3 + 2] = Math.sin(angle) * radius * 0.55;
    }
    return array;
  }, []);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.08;
    points.current.rotation.z -= delta * 0.035;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.026} color="#00c26e" transparent opacity={0.72} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function MachineCore() {
  const core = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!core.current) return;
    core.current.rotation.y += delta * 0.12;
    core.current.position.x = THREE.MathUtils.lerp(core.current.position.x, state.mouse.x * 0.35, 0.05);
    core.current.position.y = THREE.MathUtils.lerp(core.current.position.y, state.mouse.y * 0.2, 0.05);
  });

  return (
    <group ref={core}>
      <group>
        <Gear radius={1.45} teeth={24} color="#8ca4ad" speed={0.45} />
        <group position={[0, 0, 0.44]}>
          <Gear radius={0.9} teeth={18} color="#00aeef" speed={-0.72} offset={0.2} />
        </group>
        <group position={[1.75, -0.54, -0.12]} scale={0.72}>
          <Gear radius={0.9} teeth={18} color="#00c26e" speed={-0.88} offset={-0.12} />
        </group>
        <group position={[-1.75, 0.62, -0.16]} scale={0.68}>
          <Gear radius={0.82} teeth={16} color="#b8c9ce" speed={-0.66} />
        </group>
        <mesh>
          <sphereGeometry args={[0.34, 48, 48]} />
          <meshStandardMaterial color="#e8fbff" metalness={0.7} roughness={0.08} emissive="#00aeef" emissiveIntensity={0.85} />
        </mesh>
      </group>
      <Sparks />
    </group>
  );
}

export default function MechanicalCore() {
  return (
    <div className="h-[72vh] min-h-[520px] w-full">
      <Canvas
        shadows
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 6.2], fov: 48 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#050505"]} />
        <fog attach="fog" args={["#050505", 6.5, 12]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[2.8, 2.2, 2.8]} intensity={4.8} color="#00aeef" castShadow />
        <pointLight position={[-2.8, -1.4, 3]} intensity={2.8} color="#00c26e" />
        <spotLight position={[0, 4.8, 4.4]} angle={0.38} penumbra={0.8} intensity={2.2} color="#ffffff" castShadow />
        <MachineCore />
      </Canvas>
    </div>
  );
}
