
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateChristmasWish = async (name: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, heartwarming, 1-sentence Christmas wish for ${name}. Keep it magical and include some emojis. Use English.`,
      config: {
        temperature: 0.8,
        topP: 0.95,
      },
    });
    return response.text?.trim() || `Merry Christmas, ${name}! May your days be merry and bright! 🎄✨`;
  } catch (error) {
    console.error("AI Wish Error:", error);
    return `Merry Christmas, ${name}! Sending you warmth and magic! 🎅✨`;
  }
};
