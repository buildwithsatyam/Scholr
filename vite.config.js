import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { generateLearningContent, getActiveProviderConfig } from './server/aiService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

// Vite Dev Server Plugin: Direct AI middleware
// Allows `npm run dev` to serve the AI endpoints on the same port without needing a separate terminal!
function mediumAiDevPlugin() {
  return {
    name: 'medium-ai-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url ? req.url.split('?')[0] : '';

        // Health check endpoint
        if (url === '/api/health') {
          const config = getActiveProviderConfig();
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              status: 'ok',
              service: 'Medium.AI Integrated Dev Server',
              configured: Boolean(config.provider && config.key),
              provider: config.provider || 'none',
              model: config.model || 'none'
            })
          );
          return;
        }

        // Learning endpoint
        if (url === '/api/learn' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const payload = JSON.parse(body || '{}');
              const result = await generateLearningContent(payload);
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result));
            } catch (err) {
              res.statusCode = err.status || 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(
                JSON.stringify({
                  success: false,
                  error: err.code || 'AI_GENERATION_FAILED',
                  message: err.message
                })
              );
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), mediumAiDevPlugin()],
  base: '/Scholr/',
});
