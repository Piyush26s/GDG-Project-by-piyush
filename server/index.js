import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ✅ ROOT ROUTE (Cannot GET / FIX) */
app.get("/", (req, res) => {
  res.send("AI Sarkar Sahayak Backend is running 🚀");
});

/* ✅ GROQ CLIENT */
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
You are **AI Sarkar Sahayak**, an advanced AI assistant dedicated to helping Indian citizens find government schemes.

---
### 🌍 Language Policy
- **Input:** "${lang}"
- **Output:** strict "${lang === 'hi' ? 'Hindi (Devanagari Script)' : 'English'}"
- **Tone:** Professional, Empathetic, Clear, and Encouraging.

---
### 👤 User Profile Analysis
- **Profile:** ${profile || "General Citizen"}
- **State:** ${state || "India (Central)"}
- **Age:** ${age || "Not specified"}
- **Income:** ${income || "Not specified"}
- **Category:** ${category || "General"}

---
### 📝 Instructions
1.  **Analyze the User's Query:** "${query}"
2.  **Suggest Relevant Schemes:** Identify 3-5 government schemes that strictly match the user's profile and query.
3.  **Format Response:** user **Markdown** for beautiful rendering.
    - Use **Bold** for scheme names.
    - Use lists for benefits and eligibility.
    - Use tables if comparing data.
    - Use > blockquotes for important notes.
4.  **Structure per Scheme:**
    - **Name of Scheme**
    - 🎯 *Eligibility*: Who can apply?
    - 🎁 *Benefits*: What do they get?
    - 📄 *Documents*: What is needed?
    - 🔗 *Apply*: [Official Link Name](Official Link URL) (or "Visit nearest CSC center")

5.  **Conclusion:** detailed but concise summary or encouragement.

---
### ❌ Restrictions
- Do NOT hallucinate fake links.
- Do NOT write long paragraphs. Use bullet points.
`;


    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });

  } catch (error) {
    console.error("❌ GROQ ERROR:", error.message);
    res.status(500).json({
      reply: "❌ Server error. Please try again later.",
    });
  }
});

/* ✅ SERVER START */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🔥 Backend running on http://localhost:${PORT}`);
});
