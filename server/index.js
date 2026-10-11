import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { generateLearningContent, getActiveProviderConfig } from './aiService.js';

// Load environment variables from .env if present
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for frontend clients (local Vite, preview, or hosted domains like GitHub Pages)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '2mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  const config = getActiveProviderConfig();
  res.json({
    status: 'ok',
    service: 'Medium.AI Learning Backend',
    configured: Boolean(config.provider && config.key),
    provider: config.provider || 'none',
    model: config.model || 'none',
    timestamp: new Date().toISOString()
  });
});

// Primary AI Learning endpoint
app.post('/api/learn', async (req, res) => {
  try {
    const { action, article, level } = req.body || {};

    const response = await generateLearningContent({ action, article, level });
    res.json(response);
  } catch (error) {
    console.error(`[Medium.AI Error] ${error.message}`);
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      error: error.code || 'AI_GENERATION_FAILED',
      message: error.message || 'An error occurred while communicating with the AI service.',
      status
    });
  }
});

// Start listening
app.listen(PORT, () => {
  const config = getActiveProviderConfig();
  console.log(`\n======================================================`);
  console.log(`🚀 Medium.AI Server running at http://localhost:${PORT}`);
  console.log(`📡 Health Check:  http://localhost:${PORT}/api/health`);
  console.log(`🧠 AI Endpoint:   http://localhost:${PORT}/api/learn`);
  console.log(`🔑 Active Config: ${config.provider ? `${config.provider.toUpperCase()} (${config.model})` : '⚠️ No API key set (Add GEMINI_API_KEY or GROQ_API_KEY to .env)'}`);
  console.log(`======================================================\n`);
});

export default app;
