import requests
from bs4 import BeautifulSoup

def scrape_recipe(url):
    # 1. Fetch the page
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # 2. Extract Data (Selectors vary by site, these are examples)
    title = soup.find('h1').text.strip()
    
    # Extract ingredients into a list
    ingredients = [li.text.strip() for li in soup.find_all('li', class_='ingredient')]
    
    # Extract instructions as a single string
    instructions = soup.find('div', class_='instructions').text.strip()

    # 3. Format into our "Recipe" Object
    recipe_data = {
        "title": title,
        "ingredients": ingredients,
        "instructions": instructions,
        "category": "Lunch",  # You can manually set this or parse it
        "image": "https://images.unsplash.com/photo-example" # Placeholder
    }

    return recipe_data

# Example Use:
target_url = "https://example-cooking-blog.com/tasty-lunch"
print(scrape_recipe(target_url))
