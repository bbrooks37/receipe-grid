import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <>
      {/* STANDARD CARD (The Grid Item) */}
      <motion.div
        layout
        className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-xl cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="relative h-56 overflow-hidden bg-slate-900">
          <img
            src={recipe.image || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={recipe.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600/80 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white rounded-full">
            {recipe.category}
          </span>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold leading-tight group-hover:text-blue-400 transition-colors">
            {recipe.title}
          </h3>
          <p className="text-xs text-slate-500 mt-2 uppercase tracking-widest font-bold">Tap to View Recipe</p>
        </div>
      </motion.div>

      {/* MODAL OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors"
              >
                ✕
              </button>

              {/* Scrollable Area */}
              <div className="overflow-y-auto p-6 md:p-8 custom-scrollbar">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-64 object-cover rounded-2xl mb-6 shadow-lg"
                />
                
                <h2 className="text-3xl font-black tracking-tighter text-white mb-2">{recipe.title}</h2>
                <span className="inline-block px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
                  {recipe.category}
                </span>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xs font-black uppercase text-blue-400 mb-4 tracking-widest">Ingredients</h4>
                    <ul className="space-y-2">
                      {recipe.ingredients.map((ing, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span> {ing}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-black uppercase text-blue-400 mb-4 tracking-widest">Instructions</h4>
                    <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                      {recipe.instructions}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};