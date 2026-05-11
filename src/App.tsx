import { Plus, LayoutGrid, Utensils } from 'lucide-react';
import { RecipeCard } from './components/RecipeCard';

// --- Professional Food Data ---
const recipes = [
  {
    id: 1,
    title: "Signature Truffle Risotto",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=1200",
    ingredients: ["Arborio Rice", "Fresh Porcini", "Black Truffle Oil", "Pecorino Romano"],
    instructions: "Toast rice until translucent. Slowly ladle warm stock, stirring until creamy. Finish with cold butter and truffle oil."
  },
  {
    id: 2,
    title: "Pan-Seared Sea Scallops",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=1200",
    ingredients: ["U-10 Scallops", "Sweet Pea Purée", "Crispy Pancetta", "Micro-Mint"],
    instructions: "Dry scallops thoroughly. Sear in a high-smoke point oil for 90 seconds per side until a golden crust forms."
  },
  {
    id: 3,
    title: "Ahi Tuna Sashimi Bowl",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200",
    ingredients: ["Grade AAA Tuna", "Pickled Ginger", "Edamame", "Wasabi Aioli", "Sushi Rice"],
    instructions: "Slice tuna against the grain. Layer over seasoned rice and top with house-made wasabi aioli and toasted sesame."
  },
  {
    id: 4,
    title: "Wagyu Beef Sliders",
    image: "https://images.unsplash.com/photo-1550317144-b38c5720a75b?q=80&w=1200",
    ingredients: ["Wagyu Beef", "Brioche Buns", "Truffle Aioli", "Caramelized Onions"],
    instructions: "Grill mini patties to medium-rare. Assemble on toasted brioche with truffle aioli and sweet onions."
  },
  {
    id: 5,
    title: "Herbed Lamb Rack",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200",
    ingredients: ["Lamb Rack", "Dijon Mustard", "Herbes de Provence", "Garlic Mash"],
    instructions: "Sear the lamb, coat with mustard and herbs. Roast at 400°F until internal temperature reaches 135°F."
  }
];

export default function App() {
  return (
    <div className="min-h-screen bg-[#020202] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Subtle Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        
        {/* Navigation / Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-20 gap-8">
          <div className="flex items-center gap-4">
            <div className="bg-blue-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <LayoutGrid className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">
                Pixel<span className="text-blue-600">.</span>Grid
              </h1>
              <p className="text-zinc-600 text-[10px] uppercase tracking-[0.4em] font-bold">Recipe Network</p>
            </div>
          </div>
          
          <button className="group flex items-center gap-2 bg-white hover:bg-blue-600 hover:text-white text-black px-8 py-3 rounded-2xl font-bold transition-all duration-300 transform hover:-translate-y-1 shadow-xl shadow-blue-500/5">
            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            JOIN THE GRID
          </button>
        </header>

        {/* Recipe Grid Area */}
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {recipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
          
          {/* Decorative Grid Fillers */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="h-[320px] border border-zinc-900/50 bg-zinc-900/5 rounded-[2rem] flex items-center justify-center group hover:border-zinc-800 transition-all duration-500">
              <Plus className="w-6 h-6 text-zinc-900 group-hover:text-zinc-700" />
            </div>
          ))}
        </main>

        {/* Interaction Section */}
        <section className="mt-40 max-w-2xl mx-auto">
          <div className="bg-zinc-900/20 border border-zinc-800/40 p-10 rounded-[3rem] backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/10 blur-[100px]" />
            
            <div className="flex items-center gap-3 mb-8 relative">
              <Utensils className="text-blue-500 w-6 h-6" />
              <h2 className="text-2xl font-bold text-white tracking-tight uppercase italic">Post to the Grid</h2>
            </div>
            
            <div className="relative">
              <textarea 
                className="w-full bg-black/40 border border-zinc-800 rounded-2xl p-5 mb-6 focus:ring-1 focus:ring-blue-600 focus:border-transparent focus:outline-none transition-all placeholder:text-zinc-700 text-sm"
                rows={3}
                placeholder="Suggest a high-end dish or request a specific recipe..."
              />
              <button className="w-full bg-zinc-100 hover:bg-white text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-black/20 active:scale-[0.98]">
                Submit Request
              </button>
            </div>
          </div>
          
          <footer className="mt-16 text-center text-zinc-700 text-[10px] uppercase tracking-[0.5em] font-bold">
            &copy; 2026 Pixel Grid Network &bull; Lakeland, FL
          </footer>
        </section>

      </div>
    </div>
  );
}