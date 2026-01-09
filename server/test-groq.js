import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GROQ_API_KEY;

if (!API_KEY) {
    console.error("❌ Error: GROQ_API_KEY is missing in .env file.");
    process.exit(1);
}

console.log(`🔑 Key loaded: ${API_KEY.substring(0, 4)}...${API_KEY.substring(API_KEY.length - 4)}`);

const groq = new Groq({ apiKey: API_KEY });

async function testGroq() {
    console.log("🔄 Testing Groq (Llama 3 70B)...");
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "user",
                    content: "Explain what a GDG (Google Developer Group) is in one sentence.",
                },
            ],
            model: "llama-3.3-70b-versatile",
        });

        console.log("\n✅ Success! Groq Responded:");
        console.log(chatCompletion.choices[0]?.message?.content || "");
    } catch (error) {
        console.error("\n❌ Groq API Failed:");
        console.error(error.message);
    }
}

testGroq();
