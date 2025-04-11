
import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar, Clock, Archive } from "lucide-react";
import { Dimension } from "@/types";

type TimeFilter = "today" | "tomorrow" | "upcoming" | "archived";

interface TimelineSliderProps {
  currentDimension: Dimension;
  onTimeFilterChange: (filter: TimeFilter) => void;
  currentFilter: TimeFilter;
}

const TimelineSlider = ({ currentDimension, onTimeFilterChange, currentFilter }: TimelineSliderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const timeFilters: Array<{ id: TimeFilter; label: string; icon: JSX.Element }> = [
    { id: "today", label: "Today", icon: <Clock size={16} /> },
    { id: "tomorrow", label: "Tomorrow", icon: <Calendar size={16} /> },
    { id: "upcoming", label: "Upcoming", icon: <ChevronRight size={16} /> },
    { id: "archived", label: "Archived", icon: <Archive size={16} /> }
  ];
  
  const dimensionColors = {
    cyber: "bg-cyber text-cyber-foreground",
    magic: "bg-magic text-magic-foreground",
    void: "bg-void text-void-foreground"
  };
  
  const activeColor = dimensionColors[currentDimension];
  
  return (
    <motion.div 
      className="fixed top-6 right-6 z-30"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="glass-card rounded-full p-3 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Calendar className="w-6 h-6" />
      </motion.button>

      {isExpanded && (
        <motion.div 
          className="absolute top-16 right-0 glass-card p-2 rounded-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="flex flex-col w-40">
            {timeFilters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => {
                  onTimeFilterChange(filter.id);
                  setIsExpanded(false);
                }}
                className={`flex items-center gap-2 p-2 my-1 rounded-md ${
                  filter.id === currentFilter ? 
                    (currentDimension === 'cyber' ? 'bg-cyber/30' : 
                     currentDimension === 'magic' ? 'bg-magic/30' : 
                     'bg-void/30') : 
                    'hover:bg-white/10'
                }`}
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>{filter.icon}</span>
                <span>{filter.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default TimelineSlider;
