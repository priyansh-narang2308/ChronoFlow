
import { useState } from "react";
import { motion } from "framer-motion";
import { Task, Dimension } from "@/types";
import { CheckCircle, Clock, Repeat, Trash2, Undo2 } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleRecurring: (id: string) => void;
}

const TaskCard = ({ task, onComplete, onDelete, onToggleRecurring }: TaskCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const dimensionColors = {
    cyber: "from-cyber/30 to-cyber-muted/30 border-cyber/50",
    magic: "from-magic/30 to-magic-muted/30 border-magic/50",
    void: "from-void/30 to-void-muted/30 border-void/50"
  };
  
  const colorClass = dimensionColors[task.dimension];
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: 0,
        y: isDragging ? -10 : 0,
        zIndex: isDragging ? 10 : 1
      }}
      exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      className={`glass-card bg-gradient-to-br ${colorClass} backdrop-blur-md p-4 mb-4 rounded-xl border-2 ${
        task.completed ? 'opacity-70' : ''
      }`}
      style={{
        boxShadow: isDragging 
          ? `0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px ${
              task.dimension === 'cyber' ? 'rgba(14, 165, 233, 0.5)' : 
              task.dimension === 'magic' ? 'rgba(139, 92, 246, 0.5)' : 
              'rgba(30, 41, 59, 0.5)'
            }`
          : `0 4px 15px rgba(0, 0, 0, 0.2), 0 0 5px ${
              task.dimension === 'cyber' ? 'rgba(14, 165, 233, 0.2)' : 
              task.dimension === 'magic' ? 'rgba(139, 92, 246, 0.2)' : 
              'rgba(30, 41, 59, 0.2)'
            }`
      }}
    >
      <div className="flex justify-between items-start">
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
            onClick={() => onComplete(task.id)}
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
    </motion.div>
  );
};

export default TaskCard;
