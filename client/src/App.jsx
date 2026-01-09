import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import ErrorBoundary from "./components/ErrorBoundary";

// 🌍 Translations Dictionary
const translations = {
  en: {
    title: "AI Sarkar Sahayak",
    langName: "English (EN)",
    profileHeader: "Tell Us About Yourself",
    lblProfile: "Profile Type",
    lblState: "State",
    lblAge: "Age",
    lblIncome: "Annual Income (₹)",
    lblCaste: "Social Category",
    lblGender: "Gender",
    lblInterest: "Scheme Category (Select First)",
    btnSubmit: "Find Schemes ✨",
    chatHeader: "AI Assistant",
    welcomeTitle: "👋 Hello! I am your AI assistant.",
    welcomeSub: "Fill form details or ask me anything.",
    phState: "e.g. Maharashtra, UP",
    phAge: "e.g. 25",
    phIncome: "e.g. 100000",
    phInput: "Ask specific questions...",
    errServer: "**Error:** Server unreachable. Please ensure the backend is running.",
    selectProfile: "Select Profile",
    selectCaste: "Select Category",
    selectGender: "Select Gender",
    profiles: {
      Student: "Student",
      Farmer: "Farmer",
      Worker: "Worker",
      "Senior Citizen": "Senior Citizen",
      Entrepreneur: "Entrepreneur",
      "Woman / Homemaker": "Woman / Homemaker"
    },
    castes: {
      General: "General",
      OBC: "OBC",
      SC: "SC",
      ST: "ST",
      EWS: "EWS"
    },
    genders: {
      Male: "Male",
      Female: "Female",
      Apsara: "Sundar Mahila (Apsara) 🧚‍♀️",
      Other: "Other"
    },
    dynamic: {
      locationType: "Location Type",
      rural: "Rural",
      urban: "Urban",
      landSize: "Land Holding (Acres)",
      disability: "Disability % (if any)",
      educationLevel: "Current Education Level",
    },
    categories: ["Education", "Agriculture", "Housing", "Health", "Employment", "Pension"],
    aiQuery: "Suggest the best government schemes based on my profile"
  },
  hi: {
    title: "एआई सरकार सहायक",
    langName: "हिंदी (HI)",
    profileHeader: "हमें अपने बारे में बताएं",
    lblProfile: "प्रोफ़ाइल प्रकार",
    lblState: "राज्य",
    lblAge: "आयु",
    lblIncome: "वार्षिक आय (₹)",
    lblCaste: "सामाजिक वर्ग (Caste)",
    lblGender: "लिंग",
    lblInterest: "योजना श्रेणी (पहले चुनें)",
    btnSubmit: "योजनाएं खोजें ✨",
    chatHeader: "एआई सहायक",
    welcomeTitle: "👋 नमस्ते! मैं आपका एआई सहायक हूं।",
    welcomeSub: "फ़ॉर्म भरें या मुझसे कुछ भी पूछें।",
    phState: "जैसे महाराष्ट्र, यूपी",
    phAge: "जैसे 25",
    phIncome: "जैसे 100000",
    phInput: "कुछ भी पूछें...",
    errServer: "**त्रुटि:** सर्वर स्टार्ट नहीं है। कृपया बैकएंड चेक करें।",
    selectProfile: "प्रोफ़ाइल चुनें",
    selectCaste: "वर्ग चुनें",
    selectGender: "लिंग चुनें",
    profiles: {
      Student: "छात्र",
      Farmer: "किसान",
      Worker: "मजदूर",
      "Senior Citizen": "वरिष्ठ नागरिक",
      Entrepreneur: "उद्यमी",
      "Woman / Homemaker": "गृहिणी / महिला"
    },
    castes: {
      General: "सामान्य (General)",
      OBC: "अन्य पिछड़ा वर्ग (OBC)",
      SC: "अनुसूचित जाति (SC)",
      ST: "अनुसूचित जनजाति (ST)",
      EWS: "आर्थिक रूप से कमजोर (EWS)"
    },
    genders: {
      Male: "पुरुष",
      Female: "महिला",
      Apsara: "सुंदर महिला (अप्सरा) 🧚‍♀️",
      Other: "अन्य"
    },
    dynamic: {
      locationType: "क्षेत्र का प्रकार",
      rural: "ग्रामीण",
      urban: "शहरी",
      landSize: "भूमि का आकार (एकड़)",
      disability: "दिव्यांगता % (यदि हो)",
      educationLevel: "वर्तमान शिक्षा स्तर",
    },
    categories: ["शिक्षा", "कृषि", "आवास", "स्वास्थ्य", "रोजगार", "पेंशन"],
    aiQuery: "मेरे प्रोफ़ाइल के हिसाब से सबसे अच्छी सरकारी योजनाएं बताएं"
  }
};

export default function App() {
  const [lang, setLang] = useState("en");
  const t = translations[lang];

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar lang={lang} setLang={setLang} t={t} />

        <main className="page-content">
          {/* Top Right Language Toggle */}
          <div className="content-header">
            <div className="lang-toggle-top">
              <button
                className={lang === 'en' ? 'active' : ''}
                onClick={() => setLang('en')}
              >
                English
              </button>
              <button
                className={lang === 'hi' ? 'active' : ''}
                onClick={() => setLang('hi')}
              >
                हिंदी
              </button>
            </div>
          </div>

          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<Home t={t} />} />
              <Route path="/dashboard" element={<Dashboard t={t} lang={lang} />} />
              <Route path="/history" element={<History t={t} />} />
            </Routes>
          </ErrorBoundary>
        </main>
      </div>
    </BrowserRouter>
  );
}
