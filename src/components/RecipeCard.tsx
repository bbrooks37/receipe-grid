import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChevronRight } from 'lucide-react';

// Exporting the interface so App.tsx can import and use the exact same type
export interface Recipe {
  id: string; // Firebase IDs are always strings
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group relative bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-2xl"
    >
      {/* Image Container with Overlay */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
        
        {/* Subtle Badge */}
        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-blue-400">
          Chef Selection
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors">
          {recipe.title}
        </h3>
        
        <div className="flex items-center gap-4 mb-6 text-slate-500 text-xs font-medium">
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-blue-500" />
            <span>25 MIN</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={14} className="text-blue-500" />
            <span>SERVES 2</span>
          </div>
        </div>

        {/* Ingredients Preview */}
        <div className="space-y-2 mb-6">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Ingredients</p>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.slice(0, 3).map((item, idx) => (
              <span key={idx} className="text-[11px] text-slate-400 bg-white/5 px-2 py-1 rounded-md border border-white/5">
                {item}
              </span>
            ))}
            {recipe.ingredients.length > 3 && (
              <span className="text-[11px] text-blue-500 font-bold">+{recipe.ingredients.length - 3} MORE</span>
            )}
          </div>
        </div>

        <button className="w-full bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-400 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-white transition-all group/btn">
          VIEW PREP
          <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};