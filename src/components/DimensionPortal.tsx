
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Dimension } from "@/types";

interface DimensionPortalProps {
  activeDimension: Dimension;
  isTransitioning: boolean;
  onTransitionComplete: () => void;
}

const DimensionPortal = ({ 
  activeDimension, 
  isTransitioning, 
  onTransitionComplete 
}: DimensionPortalProps) => {
  const portalRef = useRef<HTMLDivElement>(null);
  
  const dimensionColors = {
    cyber: "from-cyber to-cyber-muted",
    magic: "from-magic to-magic-muted",
    void: "from-void to-void-muted"
  };
  
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        onTransitionComplete();
      }, 1500); // Match with animation duration
      
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, onTransitionComplete]);
  
  if (!isTransitioning) return null;
  
  return (
    <motion.div 
      ref={portalRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`portal-ring bg-gradient-to-r ${dimensionColors[activeDimension]} rounded-full absolute`}
        initial={{ width: 0, height: 0, opacity: 0 }}
        animate={{ 
          width: ["0vh", "150vh", "0vh"], 
          height: ["0vh", "150vh", "0vh"],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 1.5,
          times: [0, 0.5, 1],
          ease: "easeInOut"
        }}
      />
      
      {/* Particles that fly out from portal */}
      <div className="particles-container">
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * 360;
          const delay = i * 0.02;
          
          return (
            <motion.div
              key={i}
              className={`absolute w-2 h-2 rounded-full bg-${activeDimension}`}
              initial={{ x: 0, y: 0, opacity: 0 }}
              animate={{ 
                x: Math.cos(angle * Math.PI / 180) * 500,
                y: Math.sin(angle * Math.PI / 180) * 500,
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 1,
                delay,
                ease: "easeOut"
              }}
            />
          );
        })}
      </div>
      
      <motion.div
        className="text-glow text-4xl font-bold text-white"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: [0, 1.5, 0],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 1.5,
          times: [0, 0.5, 1],
          ease: "easeInOut"
        }}
      >
        {activeDimension === 'cyber' ? 'Neon Overdrive' : 
         activeDimension === 'magic' ? 'Arcane Wonders' : 
         'Void Runner'}
      </motion.div>
    </motion.div>
  );
};

export default DimensionPortal;
