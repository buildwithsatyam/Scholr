/**
 * Medium.AI - Supabase Data Layer
 * Handles Articles, Bookmarks, Claps, Profiles, and AI Cache.
 * Gracefully falls back to local data if Supabase credentials are not provided.
 */

import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export const supabaseService = {
  isConfigured: () => isSupabaseConfigured,

  // Fetch all articles from Supabase
  async fetchArticles(fallbackArticles = []) {
    if (!isSupabaseConfigured || !supabase) {
      return fallbackArticles;
    }

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*, author:profiles(name, avatar, headline)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!data || data.length === 0) return fallbackArticles;

      // Transform into app schema
      return data.map(item => ({
        id: item.id,
        publication: item.publication || 'Medium.AI',
        author: item.author?.name || item.author_name || 'Anonymous Student',
        date: new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        title: item.title,
        excerpt: item.excerpt,
        initialClaps: item.claps || 0,
        comments: item.comments_count || 0,
        commentsList: item.comments_list || [],
        image: item.image_url || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop',
        tags: item.tags || ['For you'],
        content: item.content || [item.excerpt]
      }));
    } catch (err) {
      console.warn('[Supabase Error] Failed to load articles, using local fallback:', err.message);
      return fallbackArticles;
    }
  },

  // Publish a new article to Supabase
  async publishArticle(articleData, user) {
    if (!isSupabaseConfigured || !supabase) {
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('articles')
        .insert([
          {
            title: articleData.title,
            excerpt: articleData.description,
            content: [articleData.description],
            tags: articleData.tags || ['For you'],
            author_name: user?.name || 'Satyam',
            publication: 'Self Published',
            image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&auto=format&fit=crop'
          }
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('[Supabase Error] Failed to insert article:', err.message);
      return null;
    }
  },

  // Increment claps for an article in Supabase
  async incrementClaps(articleId) {
    if (!isSupabaseConfigured || !supabase) return;

    try {
      await supabase.rpc('increment_article_claps', { article_id: articleId });
    } catch {
      // Fallback update if RPC isn't created
      try {
        const { data } = await supabase.from('articles').select('claps').eq('id', articleId).single();
        if (data) {
          await supabase.from('articles').update({ claps: (data.claps || 0) + 1 }).eq('id', articleId);
        }
      } catch (e) {
        console.warn('[Supabase Error] incrementClaps:', e.message);
      }
    }
  },

  // Save / Toggle Bookmark in Supabase
  async toggleBookmark(articleId, userEmail) {
    if (!isSupabaseConfigured || !supabase || !userEmail) return;

    try {
      const { data: existing } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('article_id', articleId)
        .eq('user_email', userEmail)
        .maybeSingle();

      if (existing) {
        await supabase.from('bookmarks').delete().eq('id', existing.id);
      } else {
        await supabase.from('bookmarks').insert([{ article_id: articleId, user_email: userEmail }]);
      }
    } catch (err) {
      console.warn('[Supabase Error] toggleBookmark:', err.message);
    }
  },

  // Cache AI Learning Results in Supabase to save tokens & latency
  async getCachedAi(articleId, action, level = 'Beginner') {
    if (!isSupabaseConfigured || !supabase) return null;

    try {
      const { data, error } = await supabase
        .from('ai_learning_cache')
        .select('cached_data')
        .eq('article_id', String(articleId))
        .eq('action', action)
        .eq('level', level)
        .maybeSingle();

      if (error) return null;
      return data?.cached_data || null;
    } catch {
      return null;
    }
  },

  async saveCachedAi(articleId, action, level = 'Beginner', resultData) {
    if (!isSupabaseConfigured || !supabase || !resultData) return;

    try {
      await supabase.from('ai_learning_cache').upsert(
        {
          article_id: String(articleId),
          action,
          level,
          cached_data: resultData,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'article_id, action, level' }
      );
    } catch (err) {
      console.warn('[Supabase Cache Error]', err.message);
    }
  }
};
