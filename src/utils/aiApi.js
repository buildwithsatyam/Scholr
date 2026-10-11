/**
 * Medium.AI - Client API Service
 * Securely communicates with the server-side AI proxy.
 * Zero secrets are exposed in the client-side bundle.
 */

export const getAiApiBaseUrl = () => {
  if (import.meta.env.VITE_AI_API_BASE_URL) {
    return import.meta.env.VITE_AI_API_BASE_URL.replace(/\/+$/, '');
  }
  // When running locally, Vite's dev server handles /api directly on the same origin
  return '';
};

export async function checkAiHealth() {
  const baseUrl = getAiApiBaseUrl();
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
      error: 'Backend server is not reachable. Run `npm run server` to start the local backend proxy.',
      detail: err.message 
    };
  }
}

export async function requestAiLearning({ action, article, level = 'Beginner' }) {
  const baseUrl = getAiApiBaseUrl();
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
    // Detect connection refused or offline server
    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      const connErr = new Error(
        `Unable to reach the Medium.AI backend server at ${baseUrl}. Please ensure the server is running with 'npm run server'.`
      );
      connErr.status = 503;
      connErr.code = 'SERVER_OFFLINE';
      throw connErr;
    }
    throw err;
  }
}
