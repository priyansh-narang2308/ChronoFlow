
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Task } from "@/types";
import { CheckCircle, Clock, Repeat, Trash2, Undo2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleRecurring: (id: string) => void;
}

const Task3DCard = ({ task, onComplete, onDelete, onToggleRecurring }: TaskCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const dimensionColors = {
    cyber: "from-cyber/30 to-cyber-muted/30 border-cyber/50",
    magic: "from-magic/30 to-magic-muted/30 border-magic/50",
    void: "from-void/30 to-void-muted/30 border-void/50"
  };
  
  const dimensionGlows = {
    cyber: "0 0 20px rgba(14, 165, 233, 0.5)",
    magic: "0 0 20px rgba(139, 92, 246, 0.5)",
    void: "0 0 20px rgba(30, 41, 59, 0.5)"
  };
  
  const colorClass = dimensionColors[task.dimension];
  
  // 3D tilt effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateXValue = (y - centerY) / 10;
      const rotateYValue = (centerX - x) / 10;
      
      setRotateX(rotateXValue);
      setRotateY(rotateYValue);
    };
    
    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
    };
    
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDragging]);
  
  // Animation for task completion
  const completeTask = () => {
    onComplete(task.id);
  };
  
  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        y: isDragging ? -10 : 0,
        zIndex: isDragging ? 10 : 1,
        rotateX,
        rotateY
      }}
      exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={`glass-card bg-gradient-to-br ${colorClass} backdrop-blur-md p-4 mb-4 rounded-xl border-2 transform-gpu preserve-3d ${
        task.completed ? 'opacity-70' : ''
      }`}
      style={{
        boxShadow: isDragging 
          ? `0 20px 40px rgba(0, 0, 0, 0.4), ${dimensionGlows[task.dimension]}`
          : `0 10px 30px rgba(0, 0, 0, 0.2), ${dimensionGlows[task.dimension]}`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out'
      }}
    >
      <div className="relative">
        {/* 3D elements floating above card */}
        <div 
          className="absolute w-full h-full pointer-events-none"
          style={{ transform: 'translateZ(20px)' }}
        >
          <div className={`absolute top-1 right-1 w-2 h-2 rounded-full bg-${task.dimension} opacity-80`} />
          <div className={`absolute bottom-1 left-1 w-2 h-2 rounded-full bg-${task.dimension} opacity-80`} />
        </div>

        <div className="flex justify-between items-start" style={{ transform: 'translateZ(10px)' }}>
          <div className="flex-1">
            <h3 className={`text-lg font-medium mb-1 ${task.completed ? 'line-through opacity-70' : ''}`}>
              {task.title}
            </h3>
            <div className="flex items-center text-xs opacity-70 space-x-2">
              <Clock size={14} />
              <span>
                {task.dueDate 
                  ? new Date(task.dueDate).toLocaleDateString() 
                  : 'No due date'}
              </span>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onToggleRecurring(task.id)}
              className={`p-1.5 rounded-full ${
                task.recurring 
                  ? (task.dimension === 'cyber' ? 'bg-cyber/50' : 
                    task.dimension === 'magic' ? 'bg-magic/50' : 
                    'bg-void/50')
                  : 'bg-white/10'
              }`}
            >
              <Repeat size={16} />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={completeTask}
              className={`p-1.5 rounded-full ${
                task.completed 
                  ? (task.dimension === 'cyber' ? 'bg-cyber/50' : 
                    task.dimension === 'magic' ? 'bg-magic/50' : 
                    'bg-void/50')
                  : 'bg-white/10'
              }`}
            >
              {task.completed ? <Undo2 size={16} /> : <CheckCircle size={16} />}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(task.id)}
              className="p-1.5 rounded-full bg-white/10 text-destructive"
            >
              <Trash2 size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Task3DCard;
