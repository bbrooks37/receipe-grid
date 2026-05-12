import requests
import firebase_admin
from firebase_admin import credentials, firestore

# 1. INITIALIZE FIREBASE ADMIN SDK
# Ensure serviceAccountKey.json is in your /recipe-scraper directory
try:
    cred = credentials.Certificate("serviceAccountKey.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print("🚀 Connected to Firestore successfully.")
except Exception as e:
    print(f"❌ Error connecting to Firebase: {e}")
    exit()

def fetch_and_seed(category_name):
    print(f"\n--- Starting Seed for Category: {category_name} ---")
    
    # 2. FETCH LIST FROM API
    # We use the filter method to get all meals in a specific category
    api_url = f"https://www.themealdb.com/api/json/v1/1/filter.php?c={category_name}"
    
    try:
        response = requests.get(api_url)
        data = response.json()
        
        if not data or 'meals' not in data or data['meals'] is None:
            print(f"⚠️ No recipes found for {category_name}.")
            return

        meals = data['meals']
        print(f"Found {len(meals)} recipes. Starting detailed fetch...")

        for meal in meals:
            # 3. FETCH DETAILED DATA
            # The filter API only gives ID/Title; we need the full details for instructions/ingredients
            meal_id = meal['idMeal']
            detail_url = f"https://www.themealdb.com/api/json/v1/1/lookup.php?i={meal_id}"
            detail_resp = requests.get(detail_url).json()
            
            if 'meals' in detail_resp and detail_resp['meals']:
                full_meal = detail_resp['meals'][0]

                # 4. DATA NORMALIZATION (Mapping to your Recipe Interface)
                # TheMealDB uses strIngredient1...strIngredient20
                ingredients = []
                for i in range(1, 21):
                    ingredient = full_meal.get(f'strIngredient{i}')
                    measure = full_meal.get(f'strMeasure{i}')
                    
                    # Clean up empty strings or None values
                    if ingredient and ingredient.strip():
                        # We combine measurement and ingredient for a better UI experience
                        full_ing = f"{measure.strip()} {ingredient.strip()}" if measure else ingredient.strip()
                        ingredients.append(full_ing)

                # Matching your App.tsx interface: id, title, image, ingredients, instructions, category
                new_recipe = {
                    "title": full_meal['strMeal'],
                    "image": full_meal['strMealThumb'],
                    "ingredients": ingredients,
                    "instructions": full_meal['strInstructions'],
                    "category": category_name.lower() # To match your filter buttons in Lakeland
                }

                # 5. PUSH TO FIRESTORE
                # Using .add() creates a unique document ID automatically
                db.collection("recipes").add(new_recipe)
                print(f"✅ Added: {new_recipe['title']}")

    except Exception as e:
        print(f"❌ Critical error during seeding: {e}")

# MAIN EXECUTION
if __name__ == "__main__":
    # You can add or remove categories here based on your App.tsx filter bar
    target_categories = ["Breakfast", "Dessert", "Seafood"]
    
    for category in target_categories:
        fetch_and_seed(category)
        
    print("\n✨ Database seeding complete. Check your Vercel site!")
