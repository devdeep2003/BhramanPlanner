🌍 Bhraman Planner

Bhraman Planner is a smart travel planning web app that helps users explore destinations, create itineraries, and get AI-powered travel recommendations.
It combines Firebase for authentication & data storage with Google Gemini API for personalized travel suggestions, built on a modern React + Vite frontend.

✨ Features

🔐 Authentication – Secure login/signup with Firebase Auth.

🗺️ Destination Explorer – Browse and search destinations.

📅 Itinerary Builder – Create, edit, and manage personalized trip plans.

🤖 AI Travel Assistant – Integrated Gemini API for smart recommendations and itinerary suggestions.

🧳 Trip Organizer – Track accommodations, dates, and activities.

📱 Responsive Design – Optimized for mobile and desktop.

🛠️ Tech Stack

Frontend: React + Vite

Backend Services: Firebase (Auth, Firestore, Storage)

AI Integration: Google Gemini API

Styling: Tailwind CSS (if used) / CSS

Deployment: Vercel

🚀 Installation & Setup
# Clone the repo
git clone https://github.com/your-username/bhraman-planner.git
cd bhraman-planner

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Add your Firebase config keys and Gemini API key

# Run development server
npm run dev

📂 Project Structure
bhraman-planner/
│── public/            # Static assets
│── src/               # Source code
│   ├── components/    # Reusable UI components
│   ├── pages/         # App pages (Home, Planner, etc.)
│   ├── services/      # Firebase + Gemini API integration
│   └── ...            
│── package.json       
│── vite.config.js     
│── vercel.json        # Deployment config
│── README.md


📌 Future Enhancements

💳 Integration with hotel/flight booking APIs.

👥 Collaborative trip planning with friends/family.

🔔 Push notifications/reminders for upcoming trips.

📊 Expense tracker for planned trips.

⚡ Built with ❤️ using Firebase + Gemini AI to make travel planning smarter.
