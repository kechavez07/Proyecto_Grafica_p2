
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TransformMode } from "@/pages/Index";
import { Move, RotateCcw, Scale } from "lucide-react";

interface TransformControlsProps {
  transformMode: TransformMode;
  onTransformModeChange: (mode: TransformMode) => void;
  primitiveProps: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  };
  onPrimitivePropsChange: (props: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  }) => void;
}

export const TransformControls = ({
  transformMode,
  onTransformModeChange,
  primitiveProps,
  onPrimitivePropsChange,
}: TransformControlsProps) => {
  const modes = [
    { type: "translate" as TransformMode, icon: Move, label: "Mover" },
    { type: "rotate" as TransformMode, icon: RotateCcw, label: "Rotar" },
    { type: "scale" as TransformMode, icon: Scale, label: "Escalar" },
  ];

  const handleValueChange = (axis: 'x' | 'y' | 'z', value: number[]) => {
    const newValue = value[0];
    const axisIndex = axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
    
    if (transformMode === "translate") {
      const newPosition = [...primitiveProps.position] as [number, number, number];
      newPosition[axisIndex] = newValue;
      onPrimitivePropsChange({
        ...primitiveProps,
        position: newPosition,
      });
    } else if (transformMode === "rotate") {
      const newRotation = [...primitiveProps.rotation] as [number, number, number];
      newRotation[axisIndex] = (newValue * Math.PI) / 180; // Convert to radians
      onPrimitivePropsChange({
        ...primitiveProps,
        rotation: newRotation,
      });
    } else if (transformMode === "scale") {
      const newScale = [...primitiveProps.scale] as [number, number, number];
      newScale[axisIndex] = newValue;
      onPrimitivePropsChange({
        ...primitiveProps,
        scale: newScale,
      });
    }
  };

  const getSliderProps = () => {
    switch (transformMode) {
      case "translate":
        return { min: -5, max: 5, step: 0.1 };
      case "rotate":
        return { min: -180, max: 180, step: 1 };
      case "scale":
        return { min: 0.1, max: 3, step: 0.1 };
      default:
        return { min: -5, max: 5, step: 0.1 };
    }
  };

  const getCurrentValues = () => {
    switch (transformMode) {
      case "translate":
        return primitiveProps.position;
      case "rotate":
        return primitiveProps.rotation.map(r => (r * 180) / Math.PI) as [number, number, number]; // Convert to degrees
      case "scale":
        return primitiveProps.scale;
      default:
        return [0, 0, 0] as [number, number, number];
    }
  };

  const sliderProps = getSliderProps();
  const currentValues = getCurrentValues();

  return (
    <div className="h-24 bg-black/50 backdrop-blur-xl border-b border-white/10 flex items-center px-6 space-x-8">
      {/* Mode Selection */}
      <div className="flex space-x-2">
        {modes.map(({ type, icon: Icon, label }) => (
          <Button
            key={type}
            variant={transformMode === type ? "default" : "ghost"}
            size="sm"
            className={`
              transition-all duration-300 group
              ${transformMode === type 
                ? "bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg shadow-cyan-500/25" 
                : "text-gray-300 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
              }
            `}
            onClick={() => onTransformModeChange(type)}
          >
            <Icon className={`mr-2 h-4 w-4 transition-transform duration-300 ${
              transformMode === type ? "scale-110" : ""
            } group-hover:scale-110`} />
            {label}
          </Button>
        ))}
      </div>

      {/* Axis Controls */}
      <div className="flex space-x-6 flex-1">
        {['x', 'y', 'z'].map((axis, index) => (
          <div key={axis} className="flex items-center space-x-3 min-w-0 flex-1">
            <span className={`text-sm font-medium w-4 ${
              axis === 'x' ? 'text-red-400' : 
              axis === 'y' ? 'text-green-400' : 
              'text-blue-400'
            }`}>
              {axis.toUpperCase()}
            </span>
            <div className="flex-1">
              <Slider
                value={[currentValues[index]]}
                onValueChange={(value) => handleValueChange(axis as 'x' | 'y' | 'z', value)}
                min={sliderProps.min}
                max={sliderProps.max}
                step={sliderProps.step}
                className="w-full"
              />
            </div>
            <span className="text-xs text-gray-400 w-12 text-right">
              {currentValues[index].toFixed(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Reset Button */}
      <Button
        variant="outline"
        size="sm"
        className="text-gray-300 hover:text-white hover:bg-white/10 border-white/20 hover:border-white/40 transition-all duration-300"
        onClick={() => onPrimitivePropsChange({
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          scale: [1, 1, 1],
        })}
      >
        Reset
      </Button>
    </div>
  );
};
