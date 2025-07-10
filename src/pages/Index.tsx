
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Sidebar } from "@/components/Sidebar";
import { Scene3D } from "@/components/Scene3D";
import { TransformControls } from "@/components/TransformControls";
import { useState } from "react";

export type PrimitiveType = "cube" | "sphere" | "cone" | "cylinder" | "pyramid";
export type TransformMode = "translate" | "rotate" | "scale";

const Index = () => {
  const [selectedPrimitive, setSelectedPrimitive] = useState<PrimitiveType>("cube");
  const [transformMode, setTransformMode] = useState<TransformMode>("rotate");
  const [primitiveProps, setPrimitiveProps] = useState({
    position: [0, 0, 0] as [number, number, number],
    rotation: [0, 0, 0] as [number, number, number],
    scale: [1, 1, 1] as [number, number, number],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex">
      {/* Sidebar */}
      <Sidebar
        selectedPrimitive={selectedPrimitive}
        onPrimitiveSelect={setSelectedPrimitive}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Transform Controls */}
        <TransformControls
          transformMode={transformMode}
          onTransformModeChange={setTransformMode}
          primitiveProps={primitiveProps}
          onPrimitivePropsChange={setPrimitiveProps}
        />
        
        {/* 3D Canvas */}
        <div className="flex-1 relative">
          <Canvas className="w-full h-full">
            <PerspectiveCamera makeDefault position={[5, 5, 5]} />
            <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            <Scene3D
              primitiveType={selectedPrimitive}
              primitiveProps={primitiveProps}
            />
          </Canvas>
          
          {/* Gradient Overlay Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-magenta-500/20 to-transparent rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
