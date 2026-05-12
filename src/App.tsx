import React, { useState, useEffect } from 'react';
import { db } from './lib/firebase'; // Your Firebase config file
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeCard from './components/RecipeCard';

// 1. DATA TYPES
// Defines the shape of our Recipe objects
interface Recipe {
  id: string;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
  category: string;
}

// Defines the shape of our Filter Categories
interface Category {
  id: string;
  name: string;
}

// 2. CONFIGURATION
// These IDs match the .lower() categories from your seed_recipes.py script
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

  // 3. REAL-TIME DATA SYNC
  // Listens to Firestore and updates the UI instantly when Python scripts push data
  useEffect(() => {
    const q = query(collection(db, 'recipes'), orderBy('title', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const recipeData: Recipe[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Recipe[];
      
      setRecipes(recipeData);
      setLoading(setLoading(false) as any || false);
    });

    return () => unsubscribe();
  }, []);

  // 4. FILTERING LOGIC
  const filteredRecipes = activeCategory === 'all'
    ? recipes
    : recipes.filter((recipe) => recipe.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-12">
      {/* HEADER SECTION */}
      <header className="max-w-6xl mx-auto mb-16 text-center">
        <h1 className="text-5xl font-black tracking-tighter mb-4 bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          PIXEL GRID KITCHEN
        </h1>
        <p className="text-slate-400 font-medium">Professional Full-Stack Recipe Management</p>
      </header>

      {/* CATEGORY FILTER BAR */}
      <div className="flex flex-wrap gap-3 mb-12 justify-center max-w-4xl mx-auto">
        {categories.map((cat: Category) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wider transition-all duration-300 border ${
              activeCategory === cat.id
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border-blue-400 scale-105'
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {cat.name.toUpperCase()}
          </button>
        ))}
      </div>

      {/* RECIPE GRID SECTION */}
      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode='popLayout'>
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {!loading && filteredRecipes.length === 0 && (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-slate-500 italic">No recipes found in this category yet.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;