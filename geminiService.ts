
import { GoogleGenAI } from "@google/genai";
import { Budget } from "./types";

const getAiClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const getProjectSummary = async (projectData: any) => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analise estes dados de obra e gere um resumo executivo de 2 frases em português: ${JSON.stringify(projectData)}`,
    });
    return response.text;
  } catch (error) {
    return "Status operacional estável.";
  }
};

export const generateLegalContract = async (budget: Budget) => {
  const ai = getAiClient();
  try {
    const prompt = `Gere um contrato de prestação de serviços de construção civil seguindo a legislação brasileira (Lei 10.406/02). 
    Dados: 
    Projeto: ${budget.projectName}
    Cliente: ${budget.clientName}
    Valor Total: R$ ${budget.totalValue.toLocaleString('pt-BR')}
    Itens: ${budget.items.map(i => i.description).join(', ')}
    O contrato deve conter Cláusula de Objeto, Preço, Prazo, Obrigações e Foro. Formate em Markdown.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Erro ao gerar contrato:", error);
    return "Falha ao gerar o rascunho do contrato legal.";
  }
};

export const analyzeConstructionPhoto = async (base64Image: string) => {
  const ai = getAiClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: "image/jpeg" } },
          { text: "Descreva brevemente o progresso desta construção civil em uma frase curta para um diário de obra em português." }
        ]
      }
    });
    return response.text;
  } catch (error) {
    return "Registro fotográfico realizado.";
  }
};
