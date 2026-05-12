🍳 Pixel Grid Kitchen A Real-Time, High-Performance Recipe Management Engine

Pixel Grid Kitchen is a professional-grade web application built to manage and display extensive recipe libraries. This project demonstrates a full-stack integration of React, TypeScript, and Firebase, with a heavy focus on performance optimization and mobile-first UX.

🚀 Live Demo View the Project: [Insert Your Vercel **URL** Here]

🛠️ Technical Stack Frontend: React 18 with TypeScript

Styling: Tailwind **CSS** (Utility-first, responsive design)

Animations: Framer Motion (Hardware-accelerated transitions)

Backend/Database: Google Firebase Firestore (NoSQL real-time data)

Deployment: Vercel (CI/CD Pipeline)

✨ Key Features & DevOps Implementation ## Real-Time Data Syncing The application utilizes Firestore onSnapshot listeners to ensure the UI updates instantly when the database changes. This allows for a seamless *live* experience without manual refreshes.

## Performance-First Image Handling

To manage a library of **200**+ high-resolution recipes without browser lag, I implemented Native Lazy Loading. This ensures images are only fetched as they enter the viewport, drastically reducing initial bandwidth usage.

## Mobile-Optimized UX (The Modal Pattern)

To solve the *scroll trap* issue common on mobile devices, recipe details are rendered in a focused Modal Pop-up.

Scroll Locking: Implemented React useEffect hooks to prevent background scrolling when a recipe is open.

Responsive Scaling: Dynamic layouts that adapt from ultra-wide monitors to handheld devices.

## Strict Type Safety

The project utilizes TypeScript interfaces to define the Recipe data structure. This ensures consistent data handling between the Firestore backend and the React frontend, catching potential bugs during the build process.

📁 Project Structure Plaintext src/ ├── components/ │   └── RecipeCard.tsx    # Optimized modal & card logic ├── lib/ │   └── firebase.ts       # Database configuration ├── App.tsx               # Main logic & case-insensitive filtering └── main.tsx              # Entry point 🔧 Installation & Local Development Clone the Repo

Bash git clone [https://github.com/bbrooks37/recipe-grid.git](https://github.com/bbrooks37/recipe-grid.git) ### Install Dependencies

Bash npm install ### Environment Setup Create a .env file and add your Firebase configuration credentials.

### Run Development Server

Bash
    npm run dev
    ```

---

## 📓 Lessons Learned

- **CI/CD Troubleshooting**: Resolved complex TypeScript build errors in the Vercel environment regarding default vs. named exports and `verbatimModuleSyntax`.
- **Data Normalization**: Implemented case-insensitive string filtering to ensure UI reliability regardless of database entry casing.

---

### **How to use this in your Repo:**

## Open your project in VS Code.
## Create a new file named `README.md` in the root folder.
## Paste the content above into it.
4. **Important**: Replace the bracketed links like `[(https://receipe-grid.vercel.app/)]` with your actual project links.
## Save, then:
    
```bash
    git add **README**.md
    git commit -m "Docs: Added professional **README** with technical breakdown"
    git push origin main
    ```

**This **README** proves you’re not just building apps, you’re engineering them.
