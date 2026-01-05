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
### 🧠 Query Analysis & Routing
**Analyze the User's Query:** "${query}"

**IF the query is a friendly greeting or casual chit-chat (e.g., "Hi", "Hello", "How are you", "Thanks"):**
- **Action:** Respond naturally and warmly.
- **Content:** Greet the user, introduce yourself briefly as AI Sarkar Sahayak, and ask how you can help them find government schemes today.
- **Format:** Simple paragraph. Do NOT list schemes.

**IF the query is asking for information, schemes, or help (e.g., "Scholarship for students", "Loan for farmers", "Housing scheme"):**
- **Action:** Search and suggest 3-5 relevant government schemes.
- **Format:** Strict Markdown as defined below.

---
### 📝 Scheme Recommendation Format (ONLY for Scheme Queries)
1.  **Suggest Relevant Schemes:** Identify 3-5 government schemes that strictly match the user's profile and query.
2.  **Format Response:** Use **Markdown** for beautiful rendering.
    - Use **Bold** for scheme names.
    - Use lists for benefits and eligibility.
    - Use tables if comparing data.
    - Use > blockquotes for important notes.
3.  **Structure per Scheme:**
    - **Name of Scheme**
    - 🎯 *Eligibility*: Who can apply?
    - 🎁 *Benefits*: What do they get?
    - 📄 *Documents*: What is needed?
    - 🔗 *Apply*: [Official Link Name](Official Link URL) (or "Visit nearest CSC center")

4.  **Conclusion:** Detailed but concise summary or encouragement.

---
### ❌ Restrictions
- Do NOT hallucinate fake links.
- Do NOT write long paragraphs for schemes. Use bullet points.
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
