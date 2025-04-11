
import { DimensionInfo } from "@/types";

export const dimensions: DimensionInfo[] = [
  {
    id: 'cyber',
    name: 'Neon Overdrive',
    description: 'Tasks in the cyberpunk metropolis. Fast-paced and tech-driven.',
    icon: 'zap',
    bgClass: 'cyber-bg',
  },
  {
    id: 'magic',
    name: 'Arcane Wonders',
    description: 'Tasks in a realm of magic and wonder. Creative and inspiring.',
    icon: 'sparkles',
    bgClass: 'magic-bg',
  },
  {
    id: 'void',
    name: 'Void Runner',
    description: 'Tasks in the cosmic void. Deep focus and profound importance.',
    icon: 'orbit',
    bgClass: 'void-bg',
  }
];

export const getDimension = (id: string): DimensionInfo => {
  return dimensions.find(d => d.id === id) || dimensions[0];
};
