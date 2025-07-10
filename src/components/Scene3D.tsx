
import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";
import { PrimitiveType } from "@/pages/Index";

interface Scene3DProps {
  primitiveType: PrimitiveType;
  primitiveProps: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  };
}

export const Scene3D = ({ primitiveType, primitiveProps }: Scene3DProps) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Subtle automatic rotation for visual appeal
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  const renderPrimitive = () => {
    const commonProps = {
      ref: meshRef,
      position: primitiveProps.position,
      rotation: primitiveProps.rotation,
      scale: primitiveProps.scale,
    };

    switch (primitiveType) {
      case "cube":
        return (
          <mesh {...commonProps}>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial
              color="#00d4ff"
              emissive="#001a33"
              emissiveIntensity={0.1}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        );
      case "sphere":
        return (
          <mesh {...commonProps}>
            <sphereGeometry args={[1.5, 32, 32]} />
            <meshStandardMaterial
              color="#ff0080"
              emissive="#330011"
              emissiveIntensity={0.1}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        );
      case "cone":
        return (
          <mesh {...commonProps}>
            <coneGeometry args={[1.5, 3, 32]} />
            <meshStandardMaterial
              color="#00ff80"
              emissive="#003311"
              emissiveIntensity={0.1}
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
        );
      case "cylinder":
        return (
          <mesh {...commonProps}>
            <cylinderGeometry args={[1.5, 1.5, 3, 32]} />
            <meshStandardMaterial
              color="#8000ff"
              emissive="#110033"
              emissiveIntensity={0.1}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        );
      case "pyramid":
        return (
          <mesh {...commonProps}>
            <coneGeometry args={[2, 3, 4]} />
            <meshStandardMaterial
              color="#ff8000"
              emissive="#331100"
              emissiveIntensity={0.1}
              roughness={0.4}
              metalness={0.6}
            />
          </mesh>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#4a90e2" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
        castShadow
      />
      <pointLight position={[-10, 0, -20]} intensity={0.5} color="#ff0080" />
      <pointLight position={[10, 0, -20]} intensity={0.5} color="#00d4ff" />
      
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#111111"
          transparent
          opacity={0.8}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
      
      {/* Grid */}
      <gridHelper args={[20, 20, "#333333", "#222222"]} position={[0, -1.99, 0]} />
      
      {/* Main primitive */}
      {renderPrimitive()}
    </>
  );
};
