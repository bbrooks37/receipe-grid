import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Utensils, CheckCircle2 } from 'lucide-react';

interface Recipe {
  id: number;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
}

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="group h-[320px] [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full rounded-[2rem] overflow-hidden [backface-visibility:hidden] border border-zinc-800/50 bg-zinc-900 shadow-2xl">
          <img 
            src={recipe.image} 
            alt={recipe.title}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-1">
              <Utensils className="w-3 h-3 text-blue-500" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-blue-500 font-bold">Featured Recipe</span>
            </div>
            <h3 className="text-xl font-black text-white tracking-tighter leading-tight uppercase italic">
              {recipe.title}
            </h3>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 w-full h-full rounded-[2rem] bg-[#080808] border-2 border-blue-600/20 p-6 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col shadow-[0_0_40px_rgba(37,99,235,0.07)]">
          <div className="flex items-center justify-between mb-4 border-b border-zinc-800/80 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <h3 className="text-[11px] font-bold text-white uppercase tracking-widest truncate max-w-[140px]">
                {recipe.title}
              </h3>
            </div>
            <CheckCircle2 className="w-4 h-4 text-zinc-800" />
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-5 pr-1">
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-blue-500 font-black mb-2">Ingredients</p>
              <ul className="space-y-1.5">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="text-[12px] text-zinc-400 flex items-start gap-2 leading-tight">
                    <span className="w-1 h-1 bg-blue-600 rounded-full mt-1.5 shrink-0" />
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.2em] text-blue-500 font-black mb-2">Method</p>
              <p className="text-[12px] text-zinc-300 leading-relaxed italic font-medium">
                {recipe.instructions}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-center text-[8px] text-zinc-700 uppercase tracking-widest font-bold">
            <span>Pixel.Grid // Network</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-zinc-800 rounded-full" />
              <div className="w-1 h-1 bg-blue-600 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};