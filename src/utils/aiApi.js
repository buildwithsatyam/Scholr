/**
 * Medium.AI - Client API Service
 * Securely communicates with the server-side AI proxy.
 * On static hosts like GitHub Pages without an active backend URL,
 * it automatically runs the client-side interactive simulation so requests never fail with 405.
 */

import { generateSimulatedContent } from './aiSimulator';

export const getAiApiBaseUrl = () => {
  if (import.meta.env.VITE_AI_API_BASE_URL) {
    return import.meta.env.VITE_AI_API_BASE_URL.replace(/\/+$/, '');
  }
  // When running locally, Vite's dev server handles /api directly on the same origin
  return '';
};

export async function checkAiHealth() {
  const baseUrl = getAiApiBaseUrl();

  // If on GitHub Pages without a remote backend, report static preview mode
  if (typeof window !== 'undefined' && window.location.hostname.includes('github.io') && !baseUrl) {
    return {
      online: true,
      status: 'ok',
      service: 'Medium.AI Static Host Mode (GitHub Pages)',
      provider: 'demo-preview',
      model: 'Interactive Client Simulation'
    };
  }

  try {
    const res = await fetch(`${baseUrl}/api/health`, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!res.ok) {
      return { online: false, error: `Server returned status ${res.status}` };
    }
    const data = await res.json();
    return { online: true, ...data };
  } catch (err) {
    return { 
      online: false, 
      error: 'Backend server is not reachable.',
      detail: err.message 
    };
  }
}

export async function requestAiLearning({ action, article, level = 'Beginner' }) {
  const baseUrl = getAiApiBaseUrl();

  // If deployed on GitHub Pages and no custom backend URL is configured,
  // execute interactive simulation directly to prevent HTTP 405 (Method Not Allowed)
  const isStaticHost = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
  if (isStaticHost && !baseUrl) {
    const simulated = generateSimulatedContent(action, article, level);
    return {
      ...simulated,
      _isDemo: true,
      _provider: 'demo-preview',
      _model: 'GitHub Pages Interactive Mode'
    };
  }

  const endpoint = `${baseUrl}/api/learn`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        action,
        article: {
          title: article.title,
          excerpt: article.excerpt,
          content: article.content
        },
        level
      })
    });

    // If static host or server returns 405 (Method Not Allowed) or 404 (Not Found)
    if (res.status === 405 || res.status === 404) {
      console.warn(`[Medium.AI] Endpoint returned ${res.status}. Falling back to browser simulation.`);
      const simulated = generateSimulatedContent(action, article, level);
      return {
        ...simulated,
        _isDemo: true,
        _provider: 'demo-preview',
        _model: 'Interactive Client Simulation'
      };
    }

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      const errorMessage = data?.message || `AI request failed with status ${res.status}`;
      const errorObj = new Error(errorMessage);
      errorObj.status = res.status;
      errorObj.code = data?.error;
      throw errorObj;
    }

    if (!data || !data.success || !data.data) {
      throw new Error('Received an unexpected response structure from the AI service.');
    }

    return {
      ...data.data,
      _isDemo: Boolean(data.isDemo),
      _provider: data.provider,
      _model: data.model
    };
  } catch (err) {
    // If network fetch fails on a static host, fallback gracefully
    if (isStaticHost) {
      const simulated = generateSimulatedContent(action, article, level);
      return {
        ...simulated,
        _isDemo: true,
        _provider: 'demo-preview',
        _model: 'Interactive Client Simulation'
      };
    }

    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      const connErr = new Error(
        `Unable to reach the Medium.AI backend server at ${baseUrl || 'local'}. Running 'npm run dev' serves the backend automatically.`
      );
      connErr.status = 503;
      connErr.code = 'SERVER_OFFLINE';
      throw connErr;
    }
    throw err;
  }
}
