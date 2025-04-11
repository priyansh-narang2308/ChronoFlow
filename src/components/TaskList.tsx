
import { motion, AnimatePresence } from "framer-motion";
import { Task, Dimension } from "@/types";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
  currentDimension: Dimension;
  timeFilter: string;
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleRecurring: (id: string) => void;
}

const TaskList = ({ 
  tasks, 
  currentDimension, 
  timeFilter, 
  onComplete, 
  onDelete, 
  onToggleRecurring 
}: TaskListProps) => {
  // Filter tasks based on current dimension and time filter
  const filteredTasks = tasks.filter(task => {
    // Always respect dimension filter
    if (task.dimension !== currentDimension) return false;
    
    // Apply time filters
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const upcoming = new Date(today);
    upcoming.setDate(upcoming.getDate() + 2); // 2+ days in future
    
    if (timeFilter === 'archived') {
      return task.completed;
    }
    
    // Non-archived tasks should be incomplete
    if (task.completed) return false;
    
    // If no due date, show in today's tasks
    if (!task.dueDate) return timeFilter === 'today';
    
    const dueDate = new Date(task.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    
    if (timeFilter === 'today') {
      return dueDate.getTime() === today.getTime();
    } else if (timeFilter === 'tomorrow') {
      return dueDate.getTime() === tomorrow.getTime();
    } else if (timeFilter === 'upcoming') {
      return dueDate.getTime() >= upcoming.getTime();
    }
    
    return true;
  });
  
  // Get appropriate title based on filter
  const getFilterTitle = () => {
    switch(timeFilter) {
      case 'today': return 'Today\'s Tasks';
      case 'tomorrow': return 'Tomorrow\'s Tasks';
      case 'upcoming': return 'Upcoming Tasks';
      case 'archived': return 'Completed Tasks';
      default: return 'Tasks';
    }
  };
  
  return (
    <motion.div 
      className="w-full max-w-2xl mx-auto px-6 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-center"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {getFilterTitle()}
      </motion.h2>
      
      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={onComplete}
                onDelete={onDelete}
                onToggleRecurring={onToggleRecurring}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-10 glass-card rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <p className="text-lg opacity-70">No tasks found in this dimension</p>
            <p className="text-sm opacity-50 mt-2">Create a new task or change filters</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList;
