import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Share2, Bookmark, MessageCircle, MoreHorizontal, Star, Sparkles } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getImagePath } from '../utils/paths';
import AiLearningSection from './ai/AiLearningSection';

// High-fidelity custom SVG for the "Clap" icon (identical to the Medium style)
const ClapIcon = ({ active }) => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill={active ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth="1.8" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={active ? "text-emerald-600" : ""}
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

export default function ArticleDetailView({ 
  homeArticles = [], 
  profileArticles = [], 
  savedArticles = [], 
  toggleSave,
  onAuthorClick,
  currentUser
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Combine lists to locate the current article dynamically
  const allArticles = [...homeArticles, ...profileArticles, ...savedArticles];
  const article = allArticles.find(a => String(a.id) === String(id)) || homeArticles[0] || {};

  const [claps, setClaps] = useState(article.initialClaps || article.claps || 1200);
  const [hasClapped, setHasClapped] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isFollowed, setIsFollowed] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  useEffect(() => {
    if (article && savedArticles) {
      setSaved(savedArticles.some(a => String(a.id) === String(article.id)));
    }
  }, [article, savedArticles]);

  const handleClap = () => {
    if (currentUser && article.author === currentUser) return;
    setClaps(prev => prev + (hasClapped ? -1 : 1));
    setHasClapped(prev => !prev);
  };

  const handleSaveToggle = () => {
    setSaved(!saved);
    if (toggleSave) toggleSave(article);
  };

  const handleShare = () => {
    setShowShareTooltip(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setShowShareTooltip(false);
    }, 2000);
  };

  const parseInlineCode = (text) => {
    if (typeof text !== 'string') return text;
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, index) => {
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={index} className="bg-slate-100 text-pink-600 px-1.5 py-0.5 rounded font-mono text-sm">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  const renderBodyContent = () => {
    const content = article.content;
    if (!content) {
      return (
        <p className="mb-6 leading-relaxed">
          No content is available for this article.
        </p>
      );
    }

    if (Array.isArray(content)) {
      return content.map((paragraph, index) => {
        if (index === 0 && paragraph.includes('Photo by')) {
          return (
            <div key={index} className="text-center text-sm text-slate-500 italic -mt-4 mb-8 font-sans">
              {paragraph}
            </div>
          );
        }
        if (paragraph.startsWith('## ')) {
          return (
            <h2 key={index} className="font-sans font-bold text-2xl md:text-3xl text-slate-900 mt-10 mb-4 leading-snug">
              {paragraph.replace('## ', '')}
            </h2>
          );
        }
        if (paragraph.startsWith('### ')) {
          return (
            <h3 key={index} className="font-sans font-bold text-xl md:text-2xl text-slate-900 mt-8 mb-3 leading-snug">
              {paragraph.replace('### ', '')}
            </h3>
          );
        }
        if (paragraph.startsWith('> ')) {
          return (
            <blockquote key={index} className="pl-6 border-l-4 border-slate-900 italic my-6 text-slate-600 font-serif text-xl">
              {paragraph.replace('> ', '')}
            </blockquote>
          );
        }
        if (paragraph.startsWith('```')) {
          const codeText = paragraph.replace(/```[a-zA-Z]*\n?/, '').replace(/```$/, '');
          return (
            <pre key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 overflow-x-auto my-6 font-mono text-sm leading-relaxed text-slate-800">
              <code>{codeText}</code>
            </pre>
          );
        }
        if (paragraph.startsWith('==')) {
          const text = paragraph.replace(/^==/, '');
          return (
            <div key={index} className="relative group mb-6">
              <p className="bg-emerald-50/60 border-l-2 border-emerald-500 pl-4 py-1 inline text-slate-800 rounded-r">
                {parseInlineCode(text)}
              </p>
              <div className="absolute left-[calc(100%+16px)] top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-slate-400 hover:text-slate-800 cursor-pointer transition text-xs font-sans">
                <MessageCircle size={15} />
                <span>3</span>
              </div>
            </div>
          );
        }
        return (
          <p key={index} className="mb-6 leading-relaxed">
            {parseInlineCode(paragraph)}
          </p>
        );
      });
    }

    return <p className="mb-6 leading-relaxed">{parseInlineCode(content)}</p>;
  };

  const getAuthorAvatar = () => {
    if (article.author === 'Satyam' || (currentUser && article.author === currentUser)) {
      return getImagePath('/images/avatar_user.png');
    }
    return getImagePath(`/images/avatar_${article.author?.toLowerCase().split(' ')[0]}.png`);
  };

  return (
    <article className="max-w-3xl mx-auto px-4 py-8 md:py-12 font-sans text-slate-900">
      
      {/* Back Button */}
      <div className="mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-800 transition"
        >
          <ArrowLeft size={16} />
          <span>Back to Feed</span>
        </button>
      </div>

      {/* Member Badge */}
      <div className="flex items-center gap-1.5 text-xs text-amber-600 font-medium mb-3">
        <Star size={13} fill="currentColor" />
        <span>Member-only story</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-950 mb-3 leading-tight font-serif">
        {article.title}
      </h1>

      {/* Subtitle / Excerpt */}
      <p className="text-lg md:text-xl text-slate-500 mb-6 font-normal leading-relaxed">
        {article.excerpt}
      </p>

      {/* Author Section */}
      <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-5">
        <div className="flex items-center">
          <img 
            src={getAuthorAvatar()} 
            alt={article.author} 
            className="w-12 h-12 rounded-full object-cover mr-3.5 border border-slate-100"
            onError={(e) => { e.target.src = getImagePath('/images/avatar_user.png'); }}
          />
          <div>
            <div className="flex items-center gap-2">
              <span 
                className="font-semibold text-slate-900 cursor-pointer hover:underline"
                onClick={() => onAuthorClick && onAuthorClick(article.author)}
              >
                {article.author}
              </span>
              <span className="text-slate-300">•</span>
              <button 
                onClick={() => setIsFollowed(!isFollowed)}
                className={`text-sm font-medium transition ${isFollowed ? 'text-slate-400' : 'text-emerald-600 hover:text-emerald-700'}`}
              >
                {isFollowed ? 'Following' : 'Follow'}
              </button>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              <span>5 min read</span>
              <span className="mx-1.5">•</span>
              <span>{article.date || 'May 21, 2026'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Engagement Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 py-3 mb-8 text-slate-500">
        <div className="flex items-center gap-4 sm:gap-6">
          <button 
            className={`flex items-center gap-1.5 hover:text-slate-800 transition ${hasClapped ? 'text-slate-900' : ''}`}
            onClick={handleClap}
          >
            <ClapIcon active={hasClapped} />
            <span className="text-sm font-medium">{claps}</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-slate-800 transition">
            <MessageCircle size={19} />
            <span className="text-sm font-medium">{article.comments || 0}</span>
          </button>

          {/* Learn with AI Quick Action */}
          <button 
            onClick={() => {
              const el = document.getElementById('medium-ai-learning-mode');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-950 text-white hover:bg-slate-800 transition shadow-xs"
          >
            <Sparkles size={13} className="text-emerald-400" />
            <span>Learn with AI</span>
          </button>
        </div>

        <div className="flex items-center gap-4 relative">
          <button 
            onClick={handleSaveToggle}
            className={`hover:text-slate-800 transition ${saved ? 'text-emerald-600' : ''}`}
          >
            <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
          </button>
          <button className="hover:text-slate-800 transition">
            <Volume2 size={20} />
          </button>
          <button onClick={handleShare} className="hover:text-slate-800 transition">
            <Share2 size={20} />
          </button>
          <button className="hover:text-slate-800 transition">
            <MoreHorizontal size={20} />
          </button>

          <AnimatePresence>
            {showShareTooltip && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: -35, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="absolute right-0 bg-slate-900 text-white text-xs font-semibold px-2 py-1 rounded shadow-lg z-20 whitespace-nowrap"
              >
                Link copied!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* AI Learning Mode Section */}
      <AiLearningSection article={article} />

      {/* Main Content Area */}
      <div className="font-serif text-[20px] md:text-[21px] leading-relaxed text-slate-800 antialiased article-body-content">
        {renderBodyContent()}
      </div>

      {/* Bottom Section: Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 my-8 border-t border-slate-100 pt-6">
          {article.tags.map((tag, i) => (
            <span 
              key={i} 
              className="px-3.5 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 rounded-full text-xs font-medium hover:bg-slate-100 transition cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bottom Section: Author Card */}
      <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 md:p-8 flex items-start gap-4 md:gap-6 mt-12">
        <img 
          src={getAuthorAvatar()} 
          alt={article.author} 
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border border-slate-100"
          onError={(e) => { e.target.src = getImagePath('/images/avatar_user.png'); }}
        />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold text-lg md:text-xl text-slate-900">{article.author}</h3>
            <button 
              onClick={() => setIsFollowed(!isFollowed)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${isFollowed ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              {isFollowed ? 'Following' : 'Follow'}
            </button>
          </div>
          <p className="text-sm text-slate-500 font-medium mb-2">Student & Technology Creator | Scholr Member</p>
          <p className="text-sm text-slate-600 leading-relaxed">
            A passionate academic contributor interested in learning, writing, and sharing technological insights to help peers grow.
          </p>
        </div>
      </div>

    </article>
  );
}
