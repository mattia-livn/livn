import { PDFDocument } from 'pdf-lib';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzePdfContent = async (pdfData: ArrayBuffer) => {
  try {
    const pdfDoc = await PDFDocument.load(pdfData);
    const pages = pdfDoc.getPages();
    let fullText = '';

    // Note: pdf-lib non ha un metodo getTextContent() diretto
    // Questo è un placeholder - potremmo aver bisogno di una libreria diversa come pdf-parse
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      // Placeholder per l'estrazione del testo
      fullText += `Pagina ${i + 1}: [Contenuto della pagina da estrarre]\n`;
    }

    if (!fullText.trim()) {
      throw new Error('Nessun testo estratto dal PDF');
    }

    const response = await openai.completions.create({
      model: 'text-davinci-003',
      prompt: `Analizza il seguente testo estratto da un documento IMU e fornisci un riassunto strutturato con tutti i dati rilevanti per il calcolo dell'IMU:

${fullText}

Fornisci un'analisi che includa:
- Codice fiscale del proprietario
- Comune di ubicazione
- Categoria catastale
- Superficie o vani
- Rendita catastale
- Altri dati rilevanti per l'IMU`,
      max_tokens: 500,
      temperature: 0.2,
    });

    return response.choices[0].text?.trim() || null;
  } catch (error) {
    console.error('Error analyzing PDF:', error);
    return null;
  }
}; 