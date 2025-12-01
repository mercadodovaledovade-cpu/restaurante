import { GoogleGenAI, Type } from "@google/genai";
import { Recipe } from "../types.ts";

const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

// Helper to ensure we have a valid key (mostly for dev feedback, though app shouldn't ask user)
const checkKey = () => {
  if (!apiKey) {
    console.error("API Key is missing in process.env.API_KEY");
    // We don't throw here to avoid crashing the app immediately if the key is lazy loaded, 
    // but the API call will fail later if it's still missing.
  }
};

export const generateRecipeFromIngredients = async (ingredients: string): Promise<Recipe> => {
  checkKey();

  const prompt = `Crie uma receita deliciosa e detalhada baseada nos seguintes ingredientes ou pedido: "${ingredients}". Responda APENAS com o JSON.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "Você é um chef experiente e criativo. Crie receitas seguras, saborosas e detalhadas em Português.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Nome criativo do prato" },
            description: { type: Type.STRING, description: "Uma breve descrição apetitosa" },
            ingredients: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Lista de ingredientes com quantidades" 
            },
            instructions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "Passo a passo detalhado"
            },
            prepTime: { type: Type.STRING, description: "Tempo de preparo ex: '30 min'" },
            difficulty: { type: Type.STRING, description: "Fácil, Médio ou Difícil" },
            calories: { type: Type.STRING, description: "Estimativa calórica por porção" },
            category: { type: Type.STRING, description: "Tipo de prato (Ex: Jantar, Sobremesa, Vegano)" }
          },
          required: ["title", "description", "ingredients", "instructions", "prepTime", "difficulty"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No data returned");
    
    // Clean up potential markdown formatting (```json ... ```)
    const cleanText = text.replace(/```json\s*|\s*```/g, "").trim();
    
    return JSON.parse(cleanText) as Recipe;

  } catch (error) {
    console.error("Error generating recipe:", error);
    throw error;
  }
};

export const sendChatMessage = async (history: {role: string, parts: {text: string}[]}[], newMessage: string): Promise<string> => {
  checkKey();
  
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      history: history,
      config: {
        systemInstruction: "Você é o Chef SaborIA, um especialista culinário amigável, engraçado e prestativo. Ajude com dúvidas de cozinha, substituições de ingredientes e técnicas. Responda sempre em Português.",
      }
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "Desculpe, não consegui pensar em uma resposta agora.";
  } catch (error) {
    console.error("Error in chat:", error);
    return "Tive um pequeno problema na cozinha (erro de conexão). Tente novamente!";
  }
};