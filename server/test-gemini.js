import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function run() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "Reply with OK only",
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("❌ Gemini Error:", data.error);
    } else {
      console.log("✅ SUCCESS:");
      console.log(data.candidates[0].content.parts[0].text);
    }
  } catch (err) {
    console.error("❌ Fatal Error:", err);
  }
}

run();
