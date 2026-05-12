import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat, X } from 'lucide-react';
import { RecipeCard, type Recipe } from './components/RecipeCard';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "recipes"), (snapshot) => {
      const recipeData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Recipe[];
      
      setRecipes(recipeData);
      setLoading(false);
    }, (error) => {
      console.error("Firebase connection error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-blue-500/30 font-sans">
      <header className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
              <ChefHat className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">
              Pixel<span className="text-blue-500">.</span>Grid
            </h1>
          </div>
          <nav className="flex items-center gap-8 text-sm font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Archive</span>
            <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-500 hover:text-white transition-all">
              SUBMIT RECIPE
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2 font-display tracking-tight">Featured Selection</h2>
          <p className="text-slate-500 max-w-2xl">
            Real-time culinary intelligence. Explore recipes synced directly from the cloud.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            <AnimatePresence mode="popLayout">
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} onViewPrep={setSelectedRecipe} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* Modal View for Instructions */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRecipe(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="relative bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl max-w-2xl w-full shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white tracking-tight">{selectedRecipe.title}</h2>
                <button onClick={() => setSelectedRecipe(null)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X className="text-slate-400" />
                </button>
              </div>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-4">Detailed Prep</h4>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                    {selectedRecipe.instructions}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Full Ingredient List</h4>
                  <ul className="grid grid-cols-2 gap-3">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="text-slate-400 text-sm flex items-center gap-2">
                        <div className="w-1 h-1 bg-blue-500 rounded-full" /> {ing}
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