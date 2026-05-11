# Pixel.Grid // Professional Recipe Network

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

**Pixel.Grid** is a high-end, dark-themed recipe discovery platform designed with a modern "Entrepreneur Network" aesthetic. Built with a focus on performance and clean UI/UX, it serves as a foundation for a full-stack self-hosted deployment lab.

## 🚀 Key Features

- **Professional Grid Layout:** A responsive 5-column grid optimized for high-density information display.
- **Interactive 3D Components:** Custom Recipe Cards featuring smooth `framer-motion` flip animations for ingredient discovery.
- **Modern Tech Stack:** Utilizes Tailwind CSS v4 and the latest Vite build tools for near-instant HMR (Hot Module Replacement).
- **DevOps Ready:** Architected for self-hosting via Coolify and Docker environments.

## 🛠️ Tech Stack

- **Frontend:** React 19 (TypeScript)
- **Styling:** Tailwind CSS v4 (PostCSS)
- **Icons:** Lucide-React
- **Animations:** Framer Motion
- **Deployment Strategy:** GitHub -> Coolify -> Self-hosted Ubuntu Server

## 📂 Project Structure

```text
src/
├── components/       # Reusable UI components (RecipeCard, etc.)
├── data/             # Mock API and static data structures
├── App.tsx           # Main application shell and grid logic
├── main.tsx          # Application entry point
└── index.css         # Tailwind v4 configuration and global styles
