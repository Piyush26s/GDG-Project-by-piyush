import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ Error: GEMINI_API_KEY is missing in .env file.");
  process.exit(1);
}

// debug: print first few chars
console.log(`🔑 Key loaded: ${API_KEY.substring(0, 4)}...${API_KEY.substring(API_KEY.length - 4)}`);

const genAI = new GoogleGenerativeAI(API_KEY);
// Trying a different model alias
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function testGemini() {
  console.log("🔄 Testing Gemini Flash Latest...");
  try {
    const prompt = "Explain what a GDG (Google Developer Group) is in one sentence.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log("\n✅ Success! Gemini Responded:");
    console.log(response.text());
  } catch (error) {
    console.error("\n❌ Gemini API Failed:");
    console.error(error.message);
  }
}

testGemini();
