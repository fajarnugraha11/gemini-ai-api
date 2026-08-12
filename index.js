import 'dotenv/config';
import express from 'express';
import multer from 'multer';
import { GoogleGenAI } from '@google/genai';

const app = express();
const upload = multer();

const genai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODEL = 'gemini-3.5-flash-lite';

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Travel Buddy API!');
});

app.post('/generate-text', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await genai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });
    
    res.status(200).json({ result: response.text });
  } catch (error) { 
    console.error('Error generating text:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/generate-from-doc', upload.single('file'), async (req, res) => {
  const { prompt } = req.body;
  const base64File = req.file.buffer.toString('base64');
  
  try {
    const response = await genai.models.generateContent({
      model: GEMINI_MODEL,
      contents: [
        { text: prompt ?? "Tolong buatkan ringkasan file berikut.", type: "text" },
        { inlineData: { data: base64File, mimeType: req.file.mimetype }  }
      ]
    });
    
    res.status(200).json({ result: response.text });
  } catch (error) {
    console.error('Error generating text from document:', error);
    res.status(500).json({ error: error.message });
  }
});