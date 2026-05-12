import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Define the shape of a single recipe to match Firestore data
export interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
  category: string;
}

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 hover:bg-white/10 transition-all duration-500 shadow-xl"
    >
      {/* IMAGE SECTION WITH LAZY LOADING */}
      <div className="relative h-56 overflow-hidden bg-slate-900">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          src={recipe.image || 'https://via.placeholder.com/400x300?text=No+Image'}
          alt={recipe.title}
          // Native Lazy Loading to prevent lag
          loading="lazy" 
          width="400"
          height="300"
          onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found' }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-transparent opacity-60" />
        
        {/* CATEGORY BADGE */}
        <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white rounded-full">
          {recipe.category}
        </span>
      </div>

      {/* CONTENT SECTION */}
      <div className="p-6">
        <h3 className="text-xl font-bold leading-tight mb-4 group-hover:text-blue-400 transition-colors">
          {recipe.title}
        </h3>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
          >
            {isOpen ? 'Close Details' : 'View Recipe'}
          </button>

          {/* EXPANDABLE DETAILS */}
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="space-y-4 pt-4 border-t border-white/10"
            >
              <div>
                <h4 className="text-[10px] font-black uppercase text-blue-400 mb-2">Ingredients</h4>
                <ul className="text-sm text-slate-400 space-y-1 list-disc list-inside">
                  {recipe.ingredients.slice(0, 8).map((ing, i) => (
                    <li key={i}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase text-blue-400 mb-2">Instructions</h4>
                <p className="text-xs text-slate-400 leading-relaxed line-clamp-4">
                  {recipe.instructions}
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};