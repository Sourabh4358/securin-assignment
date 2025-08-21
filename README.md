# Recipe Management Application

A full-stack web application to view, search, and manage recipes.  
Backend: Node.js + Express + MongoDB Atlas  
Frontend: React.js + Tailwind CSS  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [API Endpoints](#api-endpoints)  
- [Frontend](#frontend)  
- [Database](#database)  
- [Project Structure](#project-structure)  
- [Notes](#notes)

---

## Features

- View a list of recipes in a paginated table
- Search and filter recipes by title, cuisine, calories, rating, and total time
- Detailed recipe view in a drawer with ingredients, instructions, and nutrients
- Responsive UI with React and Tailwind CSS
- Backend seeding from JSON file into MongoDB Atlas
- Supports large datasets efficiently using pagination and server-side filtering

---

## Tech Stack

**Backend:**  
- Node.js  
- Express.js  
- MongoDB Atlas  
- Mongoose  

**Frontend:**  
- React.js  
- Tailwind CSS  
- Material-UI (optional for table and drawer)  
- Axios (for API requests)  

---

## Getting Started

### Clone Repository
```bash
git clone <repository_url>
cd backend


npm install


Setup Environment Variables

Create a .env file in the backend folder:

PORT=5000
MONGO_URI=<Your MongoDB Atlas Connection String>

Run Backend Server
node server.js

Run Frontend
cd frontend
npm install
npm run dev

Frontend runs on http://localhost:5173.
