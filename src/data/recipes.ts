export interface Recipe {
  id: number;
  title: string;
  image: string;
  ingredients: string[];
  instructions: string;
}

export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Honey Beeswax Balm",
    image: "https://images.unsplash.com/photo-1605264964521-357530acf132",
    ingredients: ["Beeswax", "Coconut Oil", "Castor Oil"],
    instructions: "Melt ingredients together, rub between fingers to soften, and apply."
  },
  // Add more recipes here
];
