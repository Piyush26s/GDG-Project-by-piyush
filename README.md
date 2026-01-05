# AI Sarkar Sahayak - Government Scheme Finder MVP

A working MVP for discovering government schemes using a conversational AI interface. Built for Hackathons.

## 🚀 Features
- **Conversational Filter**: Asks Age, Income, and State to find eligible schemes.
- **Hinglish Support**: Mock AI logic simulates a natural conversation.
- **Clean UI**: Government-themed blue/white clean interface.
- **Scheme Details**: Shows benefits, eligibility, and direct apply links.

## 🛠 Tech Stack
- **Frontend**: React (Vite) + CSS
- **Backend**: Node.js + Express
- **Data**: In-memory JSON database

## 📦 Project Structure
- `server/`: Backend API and Logic
  - `index.js`: Main server file
  - `schemes.json`: Scheme Database
- `client/`: React Frontend
  - `src/App.jsx`: Main UI Logic
  - `src/App.css`: Styles

## 🏃 How to Run
You need to run the backend and frontend in separate terminals.

### 1. Start Backend
```bash
cd server
npm install
node index.js
```
*Server runs on http://localhost:5000*

### 2. Start Frontend
```bash
cd client
npm install
npm run dev
```
*Client runs on http://localhost:5173*

## 📝 Demo Script for Judges
1.  **Open the App**: Shows a greeting "Namaste! I am your Sarkari Sahayak..."
2.  **Age**: Type "25" -> Bot accepts and asks Income.
3.  **Income**: Type "4 Lakh" or "400000" -> Bot accepts and asks State.
4.  **State**: Type "Maharashtra" (or "MP") -> Bot searches schemes.
5.  **Result**: Shows "Pradhan Mantri Awas Yojana" or "Ayushman Bharat" based on eligibility.
6.  **Details**: Click a card to show "View Details" link.

## 🔍 Future Improvements
- Integrate Real Gemini API for better NLP.
- Add Firebase for saving user history.
- Multilingual toggle (Hindi/English).
