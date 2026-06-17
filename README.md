# 💪 GymAI Planner

Gymai Planner is a modern, AI-powered full-stack application designed to generate personalized workout routines.
It allows users to create highly customized training plans based on specific target muscle groups, available training days per week, workout duration, and accessible equipment (home workouts vs. fully-equipped gym).

<br>

## 🔗 Live Preview
  👉 [View Live](https://gymai-planner.vercel.app/)

<br>

## 🛠 Technologies Used

### Core
  - React 19 — Modern UI library
  - Vite — Next-generation frontend tooling
  - TypeScript — Static type safety for both frontend and backend
  - Node.js & Express 5 — Fast and minimalist web framework for the backend

### UI/UX & Interactivity
  - Tailwind CSS v4 — Utility-first styling for modern and responsive design
  - Radix UI (@radix-ui/react-select) — Accessible, unstyled & fully customized UI components
  - React Router v7 — Seamless application routing and navigation
  - Lucide React — Beautiful and consistent modern iconography

### Backend, Database & AI
  - PostgreSQL & Prisma — Relational database and modern next-generation ORM
  - Neon Database — Serverless Postgres platform
  - OpenAI SDK (via OpenRouter) — AI engine for generating smart, personalized workout plans

<br>

## 🚀 Getting Started
To run the project locally, follow these steps:

### 1️⃣ Clone the repository
```bash
git clone [https://github.com/your-username/gym-planner.git](https://github.com/your-username/gym-planner.git)
cd gym-planner
```
### 2️⃣ Install dependencies
You will need to install dependencies for both the frontend and the backend.
```bash
# Install frontend dependencies
npm install

# Navigate to the server directory and install backend dependencies
cd server
npm install
cd ..
```

### 3️⃣ Configure environment variables
You need to create two separate environment files.

Create a .env file in the frontend (root) directory:
```bash
VITE_API_URL=http://localhost:3001
VITE_NEON_AUTH_URL=your_neon_auth_url
```
Create a .env file in the backend (server) directory:
```bash
PORT=3001
BASE_URL=http://localhost:3001
DATABASE_URL="postgresql://neondb_owner..."
OPEN_ROUTER_KEY=your_open_router_api_key
```

### 4️⃣ Setup the Database
Navigate to the server directory and generate the Prisma client based on your schema:
```bash
cd server
npm run build
```

### 5️⃣ Run the project locally
Open two terminal windows to run both the frontend and backend servers simultaneously.

Terminal 1 (Backend):
```bash
cd server
npm run dev:server
```
Terminal 2 (Frontend):
```bash
npm run dev
```

<br>

## ✨ Features
  - **AI-Powered Workout Generation:** Leverages OpenRouter/OpenAI to instantly build logical, effective workout splits tailored to your specific needs.
  - **Customizable Muscle Targeting:** Select exactly which muscle groups you want to focus on (e.g., Push/Pull/Legs, Upper/Lower, or specific isolations).
  - **Flexible Scheduling:** Input how many days a week you can train and the maximum time you have per session to get a perfectly time-boxed routine.
  - **Environment Adaptive:** Automatically adjusts exercise selection based on your available equipment—whether you have a full gym membership or just bodyweight/dumbbells at home.
  - **Modern & Responsive UI:** Built with Tailwind CSS v4 and Radix UI for a buttery smooth, accessible, and mobile-friendly user experience.
  - **Robust Backend:** Secure and fast API handling using Express v5, PostgreSQL, and Prisma ORM for reliable data management.

<br>

## 📄 License
This project is open-source and available under the MIT License.
