import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ✅ ROOT ROUTE (Cannot GET / FIX) */
app.get("/", (req, res) => {
  res.send("AI Sarkar Sahayak Backend is running 🚀");
});


import { GoogleGenerativeAI } from "@google/generative-ai";

/* ✅ GEMINI CLIENT */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

/* ✅ CHAT API */
app.post("/api/chat", async (req, res) => {
  try {
    const {
      profile,
      lang,
      state,
      age,
      income,
      category,
      query,
    } = req.body;

    const prompt = `
You are **AI Sarkar Sahayak**, an intelligent assistant for Indian government schemes.
**Goal:** Provide accurate, easy-to-read scheme information in strictly formatted Markdown.

---
### 🌍 Language & Tone
- **Input:** "${lang}"
- **Output:** strict "${lang === 'hi' ? 'Hindi (Devanagari)' : 'English'}"
- **Tone:** Professional yet easy to understand. Avoid flowery language.

---
### 🧠 Response Logic
**1. Greetings/Casual:**
- Reply shortly and warmly.
- Example: "Namaste! I am AI Sarkar Sahayak. Ask me about any government scheme."

**2. Scheme Queries:**
- **Search & Filter:** Suggest 3 best-fit schemes for: ${profile}, Age: ${age}, State: ${state}, Income: ${income}.
- **Format:** MUST use the structure below. Do NOT write long paragraphs.

---
### 📋 Scheme Format (Strictly Follow)

Use the following exact structure for EACH scheme.

### [Scheme Name]

**🎯 Eligibility:**
- [Condition 1]
- [Condition 2]

**🎁 Benefits:**
- [Benefit 1]
- [Benefit 2]

**📄 Documents Required:**
- [Document 1]
- [Document 2]

**🔗 Apply Here:**
- [Official Website Name](Official URL)

---
(Add a horizontal line above to separate schemes)

**Important Rules:**
1.  **Use \\\`###\\\`** for Scheme Names.
2.  **Leave an empty line** between every section (Eligibility, Benefits, etc.).
3.  **Use Bullet Points (•)** for all lists.
4.  **Separator:** Always put \\\`---\\\` between two schemes.
5.  **No Paragraphs:** Write straightforward points.
`;


    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({
      reply: text,
    });

  } catch (error) {
    console.error("❌ GEMINI ERROR:", error.message);
    res.status(500).json({
      reply: "❌ Server error (Gemini). Please try again later.",
    });
  }
});

/* ✅ SERVER START */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🔥 Backend running on http://localhost:${PORT}`);
});
