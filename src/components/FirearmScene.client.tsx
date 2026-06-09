import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  ContactShadows,
  Html,
  Float,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";

export type ModelKey = "rifle" | "pistol" | "sniper";

const steel = new THREE.MeshStandardMaterial({ color: "#3a3f45", metalness: 0.9, roughness: 0.35 });
const darkSteel = new THREE.MeshStandardMaterial({ color: "#1f2226", metalness: 0.85, roughness: 0.5 });
const brass = new THREE.MeshStandardMaterial({ color: "#b8862a", metalness: 1, roughness: 0.3, emissive: "#3a2606", emissiveIntensity: 0.2 });
const wood = new THREE.MeshStandardMaterial({ color: "#5a3a22", metalness: 0.1, roughness: 0.7 });
const polymer = new THREE.MeshStandardMaterial({ color: "#15181b", metalness: 0.2, roughness: 0.6 });

export default function FirearmScene({
  model,
  autoRotate,
  exploded,
}: {
  model: ModelKey;
  autoRotate: boolean;
  exploded: boolean;
}) {
  return (
    <Canvas shadows dpr={[1, 2]} gl={{ antialias: true, alpha: true }} className="!absolute inset-0">
      <PerspectiveCamera makeDefault position={[3.5, 1.5, 4]} fov={42} />
      <color attach="background" args={["#0a0d10"]} />
      <fog attach="fog" args={["#0a0d10", 8, 18]} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 8, 5]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 3, -5]} intensity={0.5} color="#c9a24a" />
      <spotLight position={[0, 6, 0]} angle={0.4} intensity={0.6} penumbra={1} />

      <Suspense fallback={<Html center><span className="text-[10px] uppercase tracking-[0.3em] text-brass animate-pulse">Loading…</span></Html>}>
        <Float speed={autoRotate ? 1.2 : 0} rotationIntensity={autoRotate ? 0.2 : 0} floatIntensity={autoRotate ? 0.3 : 0}>
          <FirearmModel model={model} exploded={exploded} />
        </Float>
      </Suspense>

      <ContactShadows position={[0, -1.2, 0]} opacity={0.55} scale={10} blur={2.4} far={3} />
      <gridHelper args={[20, 20, "#1a1f25", "#13171b"]} position={[0, -1.2, 0]} />

      <OrbitControls
        enablePan
        enableZoom
        autoRotate={autoRotate}
        autoRotateSpeed={0.8}
        minDistance={2.5}
        maxDistance={9}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  );
}

function FirearmModel({ model, exploded }: { model: ModelKey; exploded: boolean }) {
  const group = useRef<THREE.Group>(null);
  const t = useRef(0);

  useFrame((_, delta) => {
    t.current = THREE.MathUtils.damp(t.current, exploded ? 1 : 0, 4, delta);
    if (group.current) {
      group.current.traverse((obj) => {
        const o = obj as THREE.Object3D & { userData: { explodeOffset?: THREE.Vector3; basePos?: THREE.Vector3 } };
        if (o.userData?.explodeOffset && o.userData?.basePos) {
          o.position.copy(o.userData.basePos).addScaledVector(o.userData.explodeOffset, t.current);
        }
      });
    }
  });

  return (
    <group ref={group}>
      {model === "rifle" && <RifleModel />}
      {model === "pistol" && <PistolModel />}
      {model === "sniper" && <SniperModel />}
    </group>
  );
}

function Part({
  position,
  explode = [0, 0, 0],
  children,
}: {
  position: [number, number, number];
  explode?: [number, number, number];
  children: React.ReactNode;
}) {
  return (
    <group
      ref={(g) => {
        if (g) {
          g.userData.basePos = new THREE.Vector3(...position);
          g.userData.explodeOffset = new THREE.Vector3(...explode);
          g.position.set(...position);
        }
      }}
    >
      {children}
    </group>
  );
}

function RifleModel() {
  return (
    <group>
      <Part position={[0, 0, 0]}>
        <mesh material={steel} castShadow><boxGeometry args={[1.4, 0.35, 0.35]} /></mesh>
      </Part>
      <Part position={[1.4, 0.05, 0]} explode={[0.5, 0, 0]}>
        <mesh material={darkSteel} castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 1.6, 24]} />
        </mesh>
        <mesh material={darkSteel} position={[0.9, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.12, 0.1, 0.18, 16]} />
        </mesh>
      </Part>
      <Part position={[0, -0.45, 0]} explode={[0, -0.4, 0]}>
        <mesh material={polymer} castShadow><boxGeometry args={[0.3, 0.55, 0.22]} /></mesh>
      </Part>
      <Part position={[-0.45, -0.4, 0]} explode={[-0.3, -0.3, 0]}>
        <mesh material={polymer} castShadow rotation={[0, 0, 0.25]}>
          <boxGeometry args={[0.22, 0.5, 0.22]} />
        </mesh>
      </Part>
      <Part position={[-1.1, 0.05, 0]} explode={[-0.5, 0, 0]}>
        <mesh material={polymer} castShadow><boxGeometry args={[0.9, 0.3, 0.18]} /></mesh>
        <mesh material={polymer} position={[-0.45, -0.05, 0]} castShadow>
          <boxGeometry args={[0.18, 0.45, 0.2]} />
        </mesh>
      </Part>
      <Part position={[0.1, 0.28, 0]} explode={[0, 0.4, 0]}>
        <mesh material={darkSteel} castShadow><boxGeometry args={[0.7, 0.06, 0.12]} /></mesh>
        <mesh material={brass} position={[0, 0.08, 0]} castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.06, 0.06, 0.5, 16]} />
        </mesh>
      </Part>
      <Part position={[-0.1, -0.22, 0]} explode={[0, -0.2, 0]}>
        <mesh material={darkSteel} castShadow>
          <torusGeometry args={[0.1, 0.02, 8, 24, Math.PI]} />
        </mesh>
      </Part>
    </group>
  );
}

function PistolModel() {
  return (
    <group scale={1.2}>
      <Part position={[0, 0.15, 0]} explode={[0, 0.5, 0]}>
        <mesh material={steel} castShadow><boxGeometry args={[1.1, 0.25, 0.25]} /></mesh>
      </Part>
      <Part position={[0, -0.1, 0]}>
        <mesh material={polymer} castShadow><boxGeometry args={[1.0, 0.2, 0.22]} /></mesh>
      </Part>
      <Part position={[-0.25, -0.55, 0]} explode={[0, -0.4, 0]}>
        <mesh material={polymer} castShadow rotation={[0, 0, 0.15]}>
          <boxGeometry args={[0.3, 0.7, 0.25]} />
        </mesh>
      </Part>
      <Part position={[0.6, 0.15, 0]} explode={[0.4, 0, 0]}>
        <mesh material={darkSteel} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 0.2, 16]} />
        </mesh>
      </Part>
      <Part position={[-0.05, -0.3, 0]}>
        <mesh material={brass} castShadow>
          <torusGeometry args={[0.06, 0.012, 8, 16, Math.PI]} />
        </mesh>
      </Part>
    </group>
  );
}

function SniperModel() {
  return (
    <group>
      <Part position={[1.6, 0.1, 0]} explode={[0.6, 0, 0]}>
        <mesh material={darkSteel} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.07, 0.07, 2.2, 24]} />
        </mesh>
        <mesh material={darkSteel} position={[1.15, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.11, 0.09, 0.25, 16]} />
        </mesh>
      </Part>
      <Part position={[0, 0, 0]}>
        <mesh material={steel} castShadow><boxGeometry args={[1.2, 0.32, 0.3]} /></mesh>
      </Part>
      <Part position={[0.2, 0.2, 0.2]} explode={[0, 0.3, 0.3]}>
        <mesh material={brass} castShadow><sphereGeometry args={[0.06, 12, 12]} /></mesh>
        <mesh material={darkSteel} position={[0, -0.08, -0.08]}>
          <cylinderGeometry args={[0.025, 0.025, 0.18, 12]} />
        </mesh>
      </Part>
      <Part position={[0.1, 0.4, 0]} explode={[0, 0.5, 0]}>
        <mesh material={darkSteel} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.11, 0.11, 1.0, 24]} />
        </mesh>
        <mesh material={brass} position={[0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.13, 0.13, 0.08, 24]} />
        </mesh>
        <mesh material={brass} position={[-0.55, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.13, 0.13, 0.08, 24]} />
        </mesh>
      </Part>
      <Part position={[-1.1, 0, 0]} explode={[-0.6, 0, 0]}>
        <mesh material={wood} castShadow><boxGeometry args={[1.0, 0.3, 0.2]} /></mesh>
        <mesh material={wood} position={[-0.5, -0.1, 0]} castShadow>
          <boxGeometry args={[0.2, 0.5, 0.22]} />
        </mesh>
      </Part>
      <Part position={[1.2, -0.3, 0]} explode={[0, -0.4, 0]}>
        <mesh material={darkSteel} position={[0, -0.1, 0.15]} rotation={[0.4, 0, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
        </mesh>
        <mesh material={darkSteel} position={[0, -0.1, -0.15]} rotation={[-0.4, 0, 0]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.4, 8]} />
        </mesh>
      </Part>
    </group>
  );
}
