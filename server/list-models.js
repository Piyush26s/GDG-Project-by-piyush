import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  try {
    const models = await genAI.listModels();
    console.log("✅ AVAILABLE MODELS:");
    models.forEach(m => {
      console.log("-", m.name);
    });
  } catch (err) {
    console.error("❌ ERROR:");
    console.error(err);
  }
}

run();
