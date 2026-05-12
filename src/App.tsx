import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase'; // Ensure your path is correct
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
// Use 'type' for Recipe to comply with verbatimModuleSyntax
import { RecipeCard, type Recipe } from './components/RecipeCard';

interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: 'all', name: 'All Recipes' },
  { id: 'breakfast', name: 'Breakfast' },
  { id: 'seafood', name: 'Seafood' },
  { id: 'dessert', name: 'Dessert' },
  { id: 'dinner', name: 'Dinner' }
];

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const q = query(collection(db, 'recipes'), orderBy('title', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const recipeData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Recipe[];
      
      setRecipes(recipeData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Normalizing casing to ensure "Dinner" matches "DINNER"
  const filteredRecipes = activeCategory === 'all'
    ? recipes
    : recipes.filter((recipe) => 
        recipe.category.toLowerCase() === activeCategory.toLowerCase()
      );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-black tracking-tighter mb-4 bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          PIXEL GRID KITCHEN
        </h1>
        <p className="text-slate-400 font-medium">Real-time Full-Stack Recipe Management</p>
      </header>

      {/* CATEGORY NAV */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center max-w-4xl mx-auto">
        {categories.map((cat: Category) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 border ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40 border-blue-500 scale-105'
                : 'bg-white/5 text-slate-500 border-white/10 hover:border-white/30'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode='popLayout'>
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {!loading && filteredRecipes.length === 0 && (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-slate-500 italic">No recipes found in this category yet.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;