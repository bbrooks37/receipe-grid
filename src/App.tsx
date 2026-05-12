import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from './lib/firebase';
import { motion, AnimatePresence } from 'framer-motion';
import { ChefHat } from 'lucide-react';
import { RecipeCard } from './components/RecipeCard';

// Define the shape of our recipe data for TypeScript safety
interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
}

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Establishing a real-time connection to the "recipes" collection
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

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-blue-500/30">
      {/* Header Section */}
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
          <nav className="flex items-center gap-8 text-sm font-medium text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Network</span>
            <span className="hover:text-white cursor-pointer transition-colors">Archive</span>
            <div className="h-4 w-px bg-white/10" />
            <button className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-500 hover:text-white transition-all">
              SUBMIT RECIPE
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-400 mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-2">Featured Selection</h2>
          <p className="text-slate-500 max-w-2xl">
            Real-time culinary intelligence. Explore recipes synced directly from the cloud to your terminal.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500" />
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
          >
            <AnimatePresence>
              {recipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </main>

      {/* DevOps Footer */}
      <footer className="mt-20 border-t border-white/5 py-12 px-6">
        <div className="max-w-400 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-slate-600">
            &copy; 2026 PIXEL GRID // LAKELAND, FL. POWERED BY FIREBASE & TAILWIND V4.
          </p>
          <div className="flex gap-6 text-xs font-mono text-slate-500">
            <span>STATUS: <span className="text-green-500">LIVE</span></span>
            <span>BUILD: v1.0.42</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;