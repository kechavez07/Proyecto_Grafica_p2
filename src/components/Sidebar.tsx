
import { Button } from "@/components/ui/button";
import { PrimitiveType } from "@/pages/Index";
import { Box, Circle, Triangle, Cylinder, Pyramid } from "lucide-react";

interface SidebarProps {
  selectedPrimitive: PrimitiveType;
  onPrimitiveSelect: (primitive: PrimitiveType) => void;
}

const primitives = [
  { type: "cube" as PrimitiveType, icon: Box, label: "Cubo" },
  { type: "sphere" as PrimitiveType, icon: Circle, label: "Esfera" },
  { type: "cone" as PrimitiveType, icon: Triangle, label: "Cono" },
  { type: "cylinder" as PrimitiveType, icon: Cylinder, label: "Cilindro" },
  { type: "pyramid" as PrimitiveType, icon: Pyramid, label: "Pirámide" },
];

export const Sidebar = ({ selectedPrimitive, onPrimitiveSelect }: SidebarProps) => {
  return (
    <div className="w-80 bg-black/50 backdrop-blur-xl border-r border-white/10 p-6 space-y-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Prisma 3D</h1>
        <p className="text-gray-400 text-sm">Visualizador de Primitivas</p>
      </div>
      
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-white mb-4">Primitivas</h2>
        {primitives.map(({ type, icon: Icon, label }) => (
          <Button
            key={type}
            variant={selectedPrimitive === type ? "default" : "ghost"}
            className={`
              w-full justify-start h-14 text-left transition-all duration-300 group
              ${selectedPrimitive === type 
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25" 
                : "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
              }
              relative overflow-hidden
            `}
            onClick={() => onPrimitiveSelect(type)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Icon className={`mr-3 h-5 w-5 transition-all duration-300 ${
              selectedPrimitive === type ? "text-white scale-110" : ""
            } group-hover:scale-110`} />
            <span className="relative z-10 font-medium">{label}</span>
            {selectedPrimitive === type && (
              <div className="absolute right-3 w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </Button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 rounded-lg border border-white/10">
        <h3 className="text-white font-medium mb-2">Instrucciones</h3>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• Click para seleccionar primitiva</li>
          <li>• Arrastra para rotar la cámara</li>
          <li>• Scroll para hacer zoom</li>
          <li>• Usa los controles superiores</li>
        </ul>
      </div>
    </div>
  );
};
