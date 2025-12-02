import { GoogleGenAI, Type, Schema } from "@google/genai";
import { SolarCalculationResult } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const calculatorSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    estimatedSystemSizeKw: { type: Type.NUMBER, description: "Recommended solar system size in kW based on bill and location." },
    estimatedCostINR: { type: Type.NUMBER, description: "Total estimated cost of installation in Indian Rupees before subsidy." },
    subsidyAmountINR: { type: Type.NUMBER, description: "Estimated subsidy amount based on current Indian government schemes (PM Surya Ghar)." },
    monthlySavingsINR: { type: Type.NUMBER, description: "Estimated monthly savings on electricity bill." },
    paybackPeriodYears: { type: Type.NUMBER, description: "ROI period in years." },
    co2OffsetTonsPerYear: { type: Type.NUMBER, description: "Carbon footprint reduction in tons per year." },
    recommendation: { type: Type.STRING, description: "A brief, personalized recommendation sentence (max 20 words)." },
  },
  required: ["estimatedSystemSizeKw", "estimatedCostINR", "subsidyAmountINR", "monthlySavingsINR", "paybackPeriodYears", "co2OffsetTonsPerYear", "recommendation"],
};

export const calculateSolarPotential = async (
  monthlyBill: number,
  city: string,
  roofAreaSqFt: number
): Promise<SolarCalculationResult> => {
  try {
    const prompt = `
      Act as an expert solar engineer in India. 
      User details:
      - Location: ${city}
      - Monthly Electricity Bill: ₹${monthlyBill}
      - Available Roof Area: ${roofAreaSqFt} sq ft.

      Calculate the optimal solar system size, costs, and savings. 
      Consider:
      1. Average insolation in ${city}.
      2. Current benchmark costs in India (approx ₹50k-60k per kW).
      3. PM Surya Ghar: Muft Bijli Yojana subsidy rules (approx ₹30k for 1kW, ₹60k for 2kW, ₹78k for 3kW+).
      4. Typical domestic tariff rates in this region.
      
      Return accurate, realistic estimates.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: calculatorSchema,
        temperature: 0.2, // Low temperature for consistent calculations
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as SolarCalculationResult;
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Solar Calculation Error:", error);
    throw error;
  }
};

export const streamSolarChat = async (
  history: { role: string; parts: { text: string }[] }[],
  message: string
) => {
  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are SuryaMitra, a friendly and knowledgeable Solar Energy Consultant for India. 
      Your goal is to help Indian homeowners and businesses adopt solar energy.
      
      Key Knowledge Areas:
      1. **Indian Challenges**: 
         - **Dust/Pollution**: Explain how dust in cities reduces efficiency and the need for cleaning (automated or manual).
         - **Heat**: Explain the temperature coefficient (panels lose efficiency in extreme Indian summers) and suggest mounting solutions for airflow.
         - **Monsoons**: Managing generation dips during July-Sept.
         - **Grid Instability**: The need for Hybrid inverters in areas with power cuts.
      2. **Policies**: PM Surya Ghar Yojana, Net Metering rules (state-wise nuances if asked).
      3. **Economics**: ROI, financing options in India.

      Tone: Encouraging, practical, and technically accurate but accessible. 
      Format: Use Markdown for clarity (bolding key terms, lists). Keep responses concise.`,
    },
    history: history,
  });

  return chat.sendMessageStream({ message });
};
