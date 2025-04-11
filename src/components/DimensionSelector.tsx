
import { useState } from "react";
import { motion } from "framer-motion";
import { dimensions } from "@/data/dimensions";
import { Dimension } from "@/types";
import { Zap, Sparkles, Orbit } from "lucide-react";

interface DimensionSelectorProps {
  activeDimension: Dimension;
  onDimensionChange: (dimension: Dimension) => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'zap':
      return <Zap className="w-6 h-6" />;
    case 'sparkles':
      return <Sparkles className="w-6 h-6" />;
    case 'orbit':
      return <Orbit className="w-6 h-6" />;
    default:
      return null;
  }
};

const DimensionSelector = ({ activeDimension, onDimensionChange }: DimensionSelectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDimensionClick = (dimension: Dimension) => {
    if (dimension !== activeDimension) {
      onDimensionChange(dimension);
    }
    setIsExpanded(false);
  };

  return (
    <motion.div 
      className="fixed left-6 top-6 z-30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`glass-card rounded-full p-3 flex items-center justify-center text-white ${
          activeDimension === 'cyber' ? 'bg-cyber/50' :
          activeDimension === 'magic' ? 'bg-magic/50' : 'bg-void/50'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {getIcon(dimensions.find(d => d.id === activeDimension)?.icon || 'zap')}
      </motion.button>

      {isExpanded && (
        <motion.div 
          className="absolute top-16 left-0 glass-card p-2 rounded-lg w-48"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          {dimensions.map((dimension) => (
            <motion.button
              key={dimension.id}
              onClick={() => handleDimensionClick(dimension.id as Dimension)}
              className={`w-full flex items-center gap-3 p-2 my-1 rounded-md ${
                dimension.id === activeDimension ? 
                  (dimension.id === 'cyber' ? 'bg-cyber/30' : 
                   dimension.id === 'magic' ? 'bg-magic/30' : 
                   'bg-void/30') : 
                  'hover:bg-white/10'
              }`}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex-shrink-0">{getIcon(dimension.icon)}</span>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{dimension.name}</span>
                <span className="text-xs opacity-70">{dimension.description.split('.')[0]}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DimensionSelector;
