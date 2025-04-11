
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle, X, Calendar, Zap } from "lucide-react";
import { Dimension } from "@/types";

interface AddTaskFormProps {
  onAddTask: (title: string, dimension: Dimension) => void;
  currentDimension: Dimension;
}

const AddTaskForm = ({ onAddTask, currentDimension }: AddTaskFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAddTask(title.trim(), currentDimension);
      setTitle("");
      setIsOpen(false);
    }
  };
  
  const dimensionColors = {
    cyber: "from-cyber to-cyber-muted border-cyber",
    magic: "from-magic to-magic-muted border-magic",
    void: "from-void to-void-muted border-void"
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-30">
      <AnimatePresence>
        {isOpen && (
          <motion.form
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            onSubmit={handleSubmit}
            className={`glass-card bg-gradient-to-br ${dimensionColors[currentDimension]} p-4 rounded-xl absolute bottom-16 right-0 w-80 backdrop-blur-md border-2`}
          >
            <div className="flex items-center mb-3">
              <h3 className="text-lg font-medium flex-1">Create New Task</h3>
              <motion.button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full hover:bg-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={18} />
              </motion.button>
            </div>
            
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              autoFocus
              className="w-full bg-black/20 text-white p-3 rounded-lg mb-3 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <motion.button
                  type="button"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Calendar size={18} />
                </motion.button>
                <motion.button
                  type="button"
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Zap size={18} />
                </motion.button>
              </div>
              
              <motion.button
                type="submit"
                className={`px-4 py-2 rounded-lg ${
                  currentDimension === 'cyber' ? 'bg-cyber' : 
                  currentDimension === 'magic' ? 'bg-magic' : 
                  'bg-void'
                } text-white font-medium`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!title.trim()}
              >
                Create Task
              </motion.button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full p-4 ${
          currentDimension === 'cyber' ? 'bg-cyber' : 
          currentDimension === 'magic' ? 'bg-magic' : 
          'bg-void'
        } text-white shadow-lg`}
        whileHover={{ scale: 1.1, rotate: isOpen ? 0 : 90 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
      >
        <PlusCircle size={24} />
      </motion.button>
    </div>
  );
};

export default AddTaskForm;
