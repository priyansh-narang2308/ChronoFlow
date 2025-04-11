
import { motion } from "framer-motion";
import { Dimension } from "@/types";

interface DimensionBackgroundProps {
  dimension: Dimension;
}

const DimensionBackground = ({ dimension }: DimensionBackgroundProps) => {
  // Different particle counts and properties based on dimension
  const particles = {
    cyber: { count: 50, size: "2px", opacity: 0.6, speed: 8 },
    magic: { count: 30, size: "3px", opacity: 0.7, speed: 5 },
    void: { count: 20, size: "4px", opacity: 0.4, speed: 3 }
  };
  
  const { count, size, opacity, speed } = particles[dimension];
  
  // Generate particles with random positions
  const renderParticles = () => {
    const particleElements = [];
    for (let i = 0; i < count; i++) {
      const randX = Math.random() * 100;
      const randY = Math.random() * 100;
      const randDelay = Math.random() * 5;
      
      particleElements.push(
        <motion.div
          key={i}
          className="particle"
          style={{
            width: size,
            height: size,
            left: `${randX}%`,
            top: `${randY}%`,
            opacity: opacity,
            backgroundColor: dimension === 'cyber' ? '#0EA5E9' : 
                             dimension === 'magic' ? '#8B5CF6' : 
                             '#FFFFFF'
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, 50, 0, -50, 0],
            opacity: [opacity, opacity / 2, opacity]
          }}
          transition={{
            duration: speed + (Math.random() * 10),
            delay: randDelay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      );
    }
    return particleElements;
  };
  
  return (
    <motion.div 
      className={`dimension-bg ${dimension}-bg`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {renderParticles()}
      
      {/* Grid overlay - different for each dimension */}
      {dimension === 'cyber' && (
        <div className="absolute inset-0 bg-[radial-gradient(#0EA5E9_1px,transparent_1px)] opacity-20 [background-size:40px_40px]" />
      )}
      
      {dimension === 'magic' && (
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_90deg_at_50%_50%,#8B5CF6_0%,#10B981_50%,#8B5CF6_100%)] opacity-30 blur-3xl" />
        </div>
      )}
      
      {dimension === 'void' && (
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-[radial-gradient(circle,#F43F5E_0%,transparent_70%)] opacity-10 blur-2xl" />
        </div>
      )}
    </motion.div>
  );
};

export default DimensionBackground;
