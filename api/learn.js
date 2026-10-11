import { generateLearningContent } from '../server/aiService.js';

export default async function handler(req, res) {
  // Set CORS headers for Vercel serverless functions
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method === 'GET') {
    res.status(200).json({ status: 'ok', service: 'Medium.AI Serverless Endpoint' });
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }

  try {
    const { action, article, level } = req.body || {};
    const response = await generateLearningContent({ action, article, level });
    res.status(200).json(response);
  } catch (error) {
    console.error(`[Serverless Medium.AI Error] ${error.message}`);
    const status = error.status || 500;
    res.status(status).json({
      success: false,
      error: error.code || 'AI_GENERATION_FAILED',
      message: error.message || 'An error occurred while communicating with the AI service.',
      status
    });
  }
}
