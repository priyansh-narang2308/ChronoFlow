
import { motion, AnimatePresence } from "framer-motion";
import { Award, X } from "lucide-react";
import { Dimension } from "@/types";

interface AchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDimension: Dimension;
  completedCount: number;
}

const AchievementModal = ({ 
  isOpen, 
  onClose, 
  currentDimension,
  completedCount
}: AchievementModalProps) => {
  if (!isOpen) return null;
  
  // Generate particle explosion elements
  const renderParticles = () => {
    const particleElements = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * 360;
      const distance = 100 + Math.random() * 100;
      const delay = Math.random() * 0.2;
      const size = 5 + Math.random() * 8;
      
      // Calculate x and y based on angle and distance
      const x = Math.cos(angle * (Math.PI / 180)) * distance;
      const y = Math.sin(angle * (Math.PI / 180)) * distance;
      
      particleElements.push(
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: currentDimension === 'cyber' ? '#0EA5E9' : 
                             currentDimension === 'magic' ? '#8B5CF6' : 
                             '#F43F5E',
            width: size,
            height: size,
            top: '50%',
            left: '50%',
            '--x': `${x}px`,
            '--y': `${y}px`
          } as React.CSSProperties}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{ 
            x, 
            y, 
            opacity: 0,
            scale: 0 
          }}
          transition={{
            duration: 1.5,
            delay,
            ease: [0.23, 1, 0.32, 1]
          }}
        />
      );
    }
    
    return particleElements;
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={`relative glass-card p-8 rounded-xl max-w-md w-full text-center overflow-hidden bg-gradient-to-br ${
              currentDimension === 'cyber' ? 'from-cyber/40 to-cyber-muted/40 border-cyber/50' : 
              currentDimension === 'magic' ? 'from-magic/40 to-magic-muted/40 border-magic/50' : 
              'from-void/40 to-void-muted/40 border-void/50'
            } border-2`}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0.4 }}
          >
            <motion.button
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/20"
              onClick={onClose}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X size={20} />
            </motion.button>
            
            <div className="flex flex-col items-center">
              <motion.div
                className={`rounded-full p-6 ${
                  currentDimension === 'cyber' ? 'bg-cyber/30' : 
                  currentDimension === 'magic' ? 'bg-magic/30' : 
                  'bg-void/30'
                } mb-6`}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  delay: 0.2,
                  type: "spring",
                  bounce: 0.5
                }}
              >
                <Award size={48} className="text-glow" />
              </motion.div>
              
              <motion.h2
                className="text-2xl font-bold mb-2"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Interdimensional Achiever!
              </motion.h2>
              
              <motion.p
                className="text-lg mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                You've completed {completedCount} tasks in the {" "}
                {currentDimension === 'cyber' ? 'Neon Overdrive' : 
                 currentDimension === 'magic' ? 'Arcane Wonders' : 
                 'Void Runner'} dimension!
              </motion.p>
              
              <motion.p
                className="text-sm opacity-70 mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.7 }}
                transition={{ delay: 0.5 }}
              >
                Your interdimensional productivity is off the charts!
              </motion.p>
              
              <motion.button
                className={`px-6 py-3 rounded-lg ${
                  currentDimension === 'cyber' ? 'bg-cyber' : 
                  currentDimension === 'magic' ? 'bg-magic' : 
                  'bg-void'
                } text-white font-medium`}
                onClick={onClose}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                Continue Your Journey
              </motion.button>
            </div>
            
            {/* Particle explosion effect */}
            {renderParticles()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementModal;
