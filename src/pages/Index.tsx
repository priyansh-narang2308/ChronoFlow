
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import DimensionSelector from "@/components/DimensionSelector";
import DimensionBackground from "@/components/DimensionBackground";
import ThreeDBackground from "@/components/ThreeDBackground";
import TaskList3D from "@/components/TaskList3D";
import AddTaskForm from "@/components/AddTaskForm";
import TimelineSlider from "@/components/TimelineSlider";
import AchievementModal from "@/components/AchievementModal";
import DimensionPortal from "@/components/DimensionPortal";
import { Task, Dimension } from "@/types";
import { useToast } from "@/hooks/use-toast";

// Demo tasks
const initialTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Hack into the mainframe",
    completed: false,
    dimension: "cyber",
    dueDate: new Date(),
    recurring: false,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Update neural interface",
    completed: false,
    dimension: "cyber",
    dueDate: new Date(Date.now() + 86400000), // Tomorrow
    recurring: true,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Study ancient spellbook",
    completed: false,
    dimension: "magic",
    dueDate: new Date(),
    recurring: false,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Mix potion ingredients",
    completed: false,
    dimension: "magic",
    dueDate: new Date(Date.now() + 86400000), // Tomorrow
    recurring: true,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Meditate in the void",
    completed: false,
    dimension: "void",
    dueDate: new Date(),
    recurring: false,
    createdAt: new Date(),
  },
  {
    id: uuidv4(),
    title: "Contemplate cosmic entropy",
    completed: false,
    dimension: "void",
    dueDate: new Date(Date.now() + 86400000), // Tomorrow
    recurring: true,
    createdAt: new Date(),
  },
];

const Index = () => {
  const [activeDimension, setActiveDimension] = useState<Dimension>("cyber");
  const [timeFilter, setTimeFilter] = useState<"today" | "tomorrow" | "upcoming" | "archived">("today");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showAchievement, setShowAchievement] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionTarget, setTransitionTarget] = useState<Dimension | null>(null);
  const { toast } = useToast();
  
  // Handle dimension change with transition
  const handleDimensionChange = (dimension: Dimension) => {
    if (dimension === activeDimension) return;
    
    setTransitionTarget(dimension);
    setIsTransitioning(true);
  };
  
  // Complete dimension transition
  const handleTransitionComplete = () => {
    if (transitionTarget) {
      setActiveDimension(transitionTarget);
      setTransitionTarget(null);
      setIsTransitioning(false);
      
      toast({
        title: "Dimension Changed",
        description: `You've entered the ${transitionTarget === 'cyber' ? 'Neon Overdrive' : transitionTarget === 'magic' ? 'Arcane Wonders' : 'Void Runner'} dimension`,
        duration: 3000,
      });
    }
  };
  
  // Add new task
  const handleAddTask = (title: string, dimension: Dimension) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      completed: false,
      dimension,
      createdAt: new Date(),
      dueDate: new Date(),
    };
    
    setTasks([...tasks, newTask]);
    
    toast({
      title: "Task Created",
      description: `"${title}" added to your tasks`,
      duration: 3000,
    });
  };
  
  // Complete task
  const handleCompleteTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const completed = !task.completed;
        
        // If task is being completed (not uncompleted), increment counter
        if (completed && task.dimension === activeDimension) {
          setCompletedCount(prev => prev + 1);
        }
        
        return { ...task, completed };
      }
      return task;
    }));
  };
  
  // Delete task
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
    
    toast({
      title: "Task Deleted",
      description: "Task has been removed",
      duration: 3000,
    });
  };
  
  // Toggle recurring
  const handleToggleRecurring = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, recurring: !task.recurring };
      }
      return task;
    }));
  };
  
  // Check for achievement
  useEffect(() => {
    if (completedCount >= 5) {
      setShowAchievement(true);
      setCompletedCount(0);
    }
  }, [completedCount]);
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        <DimensionBackground key={activeDimension} dimension={activeDimension} />
      </AnimatePresence>
      
      {/* 3D Background */}
      <ThreeDBackground dimension={activeDimension} />
      
      {/* Dimension transition portal */}
      <AnimatePresence>
        {isTransitioning && (
          <DimensionPortal 
            activeDimension={transitionTarget || activeDimension} 
            isTransitioning={isTransitioning}
            onTransitionComplete={handleTransitionComplete}
          />
        )}
      </AnimatePresence>
      
      <div className="min-h-screen flex flex-col items-center justify-center relative z-10">
        <motion.header
          className="w-full text-center py-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold mb-2 text-glow">ChronoTasks</h1>
          <p className="text-lg opacity-70">The Interdimensional Task Manager</p>
        </motion.header>
        
        <TaskList3D 
          tasks={tasks}
          currentDimension={activeDimension}
          timeFilter={timeFilter}
          onComplete={handleCompleteTask}
          onDelete={handleDeleteTask}
          onToggleRecurring={handleToggleRecurring}
        />
      </div>
      
      <DimensionSelector 
        activeDimension={activeDimension} 
        onDimensionChange={handleDimensionChange} 
      />
      
      <TimelineSlider 
        currentDimension={activeDimension}
        onTimeFilterChange={setTimeFilter}
        currentFilter={timeFilter}
      />
      
      <AddTaskForm 
        onAddTask={handleAddTask}
        currentDimension={activeDimension}
      />
      
      <AchievementModal 
        isOpen={showAchievement}
        onClose={() => setShowAchievement(false)}
        currentDimension={activeDimension}
        completedCount={5}
      />
    </div>
  );
};

export default Index;
