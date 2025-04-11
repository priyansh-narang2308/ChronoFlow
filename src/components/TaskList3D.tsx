
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Task, Dimension } from "@/types";
import Task3DCard from "./Task3DCard";
import { useThree } from "@react-three/fiber";

interface TaskList3DProps {
  tasks: Task[];
  currentDimension: Dimension;
  timeFilter: "today" | "tomorrow" | "upcoming" | "archived";
  onComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleRecurring: (id: string) => void;
}

const TaskList3D = ({ 
  tasks, 
  currentDimension, 
  timeFilter,
  onComplete,
  onDelete,
  onToggleRecurring
}: TaskList3DProps) => {
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);
  
  // Filter tasks based on dimension and time filter
  const filteredTasks = tasks.filter(task => {
    if (task.dimension !== currentDimension) return false;
    
    if (!task.dueDate) return timeFilter === "today";
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    
    if (timeFilter === "today") {
      return taskDate.getTime() === today.getTime();
    } else if (timeFilter === "tomorrow") {
      return taskDate.getTime() === tomorrow.getTime();
    } else if (timeFilter === "upcoming") {
      return taskDate.getTime() > tomorrow.getTime();
    } else {
      return task.completed;
    }
  });
  
  const emptyStateMessages = {
    today: "No tasks for today in this dimension. Add one!",
    tomorrow: "Tomorrow looks clear in this dimension. Plan ahead?",
    upcoming: "No upcoming tasks in this dimension. The future is unwritten.",
    archived: "No completed tasks in this dimension. Get to work!"
  };
  
  return (
    <motion.div 
      className="task-list-container w-full max-w-md mx-auto my-8 perspective px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-xl font-bold mb-4 text-center">
        {timeFilter === "today" && "Today's Tasks"}
        {timeFilter === "tomorrow" && "Tomorrow's Tasks"}
        {timeFilter === "upcoming" && "Upcoming Tasks"}
        {timeFilter === "archived" && "Completed Tasks"}
      </h2>
      
      <AnimatePresence>
        {filteredTasks.length > 0 ? (
          <motion.div 
            className="task-grid grid gap-4"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            initial="hidden"
            animate="show"
          >
            {filteredTasks.map(task => (
              <div 
                key={task.id} 
                onMouseEnter={() => setHoveredTask(task.id)}
                onMouseLeave={() => setHoveredTask(null)}
              >
                <Task3DCard
                  task={task}
                  onComplete={onComplete}
                  onDelete={onDelete}
                  onToggleRecurring={onToggleRecurring}
                />
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="empty-state text-center p-8 glass-card bg-white/5 rounded-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
          >
            <p className="text-lg opacity-70">{emptyStateMessages[timeFilter]}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TaskList3D;
