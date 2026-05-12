import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, X, Filter } from 'lucide-react';
import { RecipeCard, type Recipe } from './components/RecipeCard';

// Define our available occasions for the filter bar
const CATEGORIES = ['all', 'breakfast', 'brunch', 'lunch', 'dinner', 'sides', 'desserts', 'snacks'];

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    // Real-time listener for your Firestore 'recipes' collection
    const unsubscribe = onSnapshot(collection(db, "recipes"), (snapshot) => {
      const recipeData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Recipe[];
      
      setRecipes(recipeData);
      setLoading(false);
    }, (error) => {
      console.error("Firebase sync error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Professional filtering logic: Happens in-memory for instant UI response
  const filteredRecipes = activeCategory === 'all' 
    ? recipes 
    : recipes.filter(r => r.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-blue-500/30 font-sans">
      {/* HEADER SECTION */}
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-400 mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <ChefHat className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">
              Pixel<span className="text-blue-500">.</span>Grid
            </h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors uppercase tracking-widest text-[10px]">Network</span>
            <span className="hover:text-white cursor-pointer transition-colors uppercase tracking-widest text-[10px]">Archive</span>
            <button className="bg-white text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase hover:bg-blue-500 hover:text-white transition-all">
              SUBMIT RECIPE
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-400 mx-auto px-6 py-12">
        {/* HERO SECTION */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2">
             <Filter size={14} className="text-blue-500" />
             <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em]">Curated Intelligence</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-2 font-display tracking-tight">Featured Selection</h2>
          <p className="text-slate-500 max-w-2xl text-sm">
            Real-time culinary intelligence synced directly from the cloud to your terminal. 
            Filter by occasion to explore optimized prep.
          </p>
        </div>

        {/* DYNAMIC CATEGORY FILTER BAR */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-900/40 scale-105' 
                  : 'bg-white/5 border-white/10 text-slate-500 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID SECTION */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
          </div>
        ) : (
          <>
            {filteredRecipes.length > 0 ? (
              <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} onViewPrep={setSelectedRecipe} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
                <p className="text-slate-500 uppercase tracking-widest text-xs">No recipes found for "{activeCategory}"</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* PREP MODAL */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative bg-[#0A0A0A] border border-white/10 p-8 md:p-12 rounded-4xl max-w-3xl w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-10">
                <div>
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-2 block">
                    {selectedRecipe.category || 'Featured'}
                  </span>
                  <h2 className="text-4xl font-bold text-white tracking-tighter">{selectedRecipe.title}</h2>
                </div>
                <button onClick={() => setSelectedRecipe(null)} className="p-3 hover:bg-white/5 rounded-full transition-colors border border-white/5">
                  <X className="text-slate-400" />
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                   <div>
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Detailed Prep</h4>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg font-medium">
                      {selectedRecipe.instructions}
                    </p>
                  </div>
                </div>

                <div className="bg-white/2 border border-white/5 p-6 rounded-2xl h-fit">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6">Ingredient Manifest</h4>
                  <ul className="space-y-4">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="text-slate-400 text-sm flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]" /> 
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;