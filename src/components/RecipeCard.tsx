import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChevronRight, Tag } from 'lucide-react';

/**
 * Updated Recipe Interface
 * This acts as the 'contract' for our data. By adding 'category' here,
 * we resolve the TS2339 errors in App.tsx.
 */
export interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
  category: string; // The new field synced from Firestore
}

interface RecipeCardProps {
  recipe: Recipe;
  onViewPrep: (recipe: Recipe) => void;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onViewPrep }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group relative bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-2xl"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 px-3 py-1 rounded-full flex items-center gap-1.5">
          <Tag size={10} className="text-blue-400" />
          <span className="text-[9px] font-black tracking-widest uppercase text-blue-400">
            {recipe.category || 'Featured'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-400 transition-colors line-clamp-1">
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

        <div className="space-y-2 mb-6">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Core Ingredients</p>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(recipe.ingredients) ? (
              recipe.ingredients.slice(0, 3).map((item, idx) => (
                <span key={idx} className="text-[11px] text-slate-400 bg-white/5 px-2 py-1 rounded-md border border-white/5 whitespace-nowrap">
                  {item}
                </span>
              ))
            ) : (
              <span className="text-[11px] text-red-400/70 italic uppercase tracking-tighter">Data Format Error</span>
            )}
          </div>
        </div>

        <button 
          onClick={() => onViewPrep(recipe)}
          className="w-full bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-400 py-3 rounded-xl flex items-center justify-center gap-2 text-sm font-bold text-white transition-all group/btn shadow-inner"
        >
          VIEW PREP
          <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
};