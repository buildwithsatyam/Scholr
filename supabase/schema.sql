-- ========================================================
-- Medium.AI (Scholr) - Supabase Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ========================================================

-- 1. Profiles Table (Extends Supabase Auth or Custom Students)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar TEXT,
  banner TEXT,
  headline TEXT DEFAULT 'Student & Technology Creator | Medium.AI Member',
  education TEXT,
  branch TEXT,
  grad_year TEXT,
  college_location TEXT,
  skills TEXT,
  areas_of_interest TEXT,
  github TEXT,
  linkedin TEXT,
  portfolio TEXT,
  about TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Articles Table
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  content JSONB NOT NULL DEFAULT '[]'::jsonb,
  publication TEXT DEFAULT 'Medium.AI',
  author_name TEXT NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  claps INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  comments_list JSONB DEFAULT '[]'::jsonb,
  image_url TEXT,
  tags TEXT[] DEFAULT ARRAY['For you'],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bookmarks / Saved Articles Table
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  user_email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(article_id, user_email)
);

-- 4. AI Learning Mode Cache Table
-- Caches generated summaries, quizzes, and revision notes to optimize API usage
CREATE TABLE IF NOT EXISTS public.ai_learning_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id TEXT NOT NULL,
  action TEXT NOT NULL,
  level TEXT DEFAULT 'Beginner',
  cached_data JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(article_id, action, level)
);

-- 5. Helper Function: Atomic Claps Increment
CREATE OR REPLACE FUNCTION increment_article_claps(article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.articles
  SET claps = claps + 1
  WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;

-- 6. Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_learning_cache ENABLE ROW LEVEL SECURITY;

-- 7. Public Read Policies (Allow students to read stories & profiles)
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Public articles are viewable by everyone" 
  ON public.articles FOR SELECT USING (true);

CREATE POLICY "Public can view bookmarks" 
  ON public.bookmarks FOR SELECT USING (true);

CREATE POLICY "Public can view cached AI data" 
  ON public.ai_learning_cache FOR SELECT USING (true);

-- 8. Insert / Update Policies
CREATE POLICY "Anyone can insert articles" 
  ON public.articles FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can insert bookmarks" 
  ON public.bookmarks FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can delete their bookmarks" 
  ON public.bookmarks FOR DELETE USING (true);

CREATE POLICY "Allow upserts on AI cache" 
  ON public.ai_learning_cache FOR ALL USING (true);

-- ========================================================
-- Seed Initial Articles (Matching Scholr Feed)
-- ========================================================
INSERT INTO public.articles (title, excerpt, author_name, publication, claps, tags, image_url, content)
VALUES
(
  'How To Spot Someone Secretly Writing With AI',
  'I’ve spent enough time online to notice people becoming confident about their ability to spot AI writing on sight, which probably explains why every few days somebody publishes a thread exposing fraudsters.',
  'Clive Thompson',
  'The Daily Draft',
  1820,
  ARRAY['For you', 'Featured', 'Writing'],
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&auto=format&fit=crop',
  '["I’ve spent enough time online to notice people becoming confident about their ability to spot AI writing on sight.", "Earlier this morning, I read one of those articles out of curiosity. The examples were all over the place.", "In reality, the search for AI tells is becoming a form of online paranoia. Instead of evaluating writing on its merits, substance, or factual accuracy, we are teaching people to fear good style."]'::jsonb
),
(
  'The Fastest Way To Become an AI Engineer (For Software Engineers)',
  'A comprehensive, engineering-first roadmap to transition into AI Engineering in 2026, focusing on prompt ops, agentic design patterns, and deployment pipelines.',
  'Marina Wyss',
  'Data Science Collective',
  428,
  ARRAY['For you', 'AI/ML'],
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop',
  '["AI Engineering is the fastest-growing field in software development. But you don’t need a PhD in Mathematics or Machine Learning to build AI products.", "## 1. Focus on API Orchestration\nModern AI applications are powered by prompt operations, vector databases, and LLM orchestration frameworks.", "## 2. Master Agentic Patterns\nLearn how to build multi-turn systems that call tools, reflect on results, and collaborate."]'::jsonb
)
ON CONFLICT DO NOTHING;
