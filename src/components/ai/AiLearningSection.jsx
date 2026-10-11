import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  HelpCircle, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  AlertCircle, 
  RotateCcw, 
  Loader2, 
  GraduationCap,
  Info,
  Terminal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { requestAiLearning, checkAiHealth } from '../../utils/aiApi';
import SummaryTool from './SummaryTool';
import ExplainTool from './ExplainTool';
import QuizTool from './QuizTool';
import NotesTool from './NotesTool';

export default function AiLearningSection({ article }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'explain' | 'quiz' | 'notes'
  const [explanationLevel, setExplanationLevel] = useState('Beginner');

  // Cache for generated results
  const [toolData, setToolData] = useState({
    summary: null,
    explain: {}, // keyed by level, e.g. { Beginner: ..., Intermediate: ... }
    quiz: null,
    notes: null
  });

  const [loadingAction, setLoadingAction] = useState(null);
  const [errors, setErrors] = useState({});
  const [serverStatus, setServerStatus] = useState(null);

  // Check backend status on mount
  useEffect(() => {
    checkAiHealth().then(status => {
      setServerStatus(status);
    });
  }, []);

  // When article changes, reset cache
  useEffect(() => {
    setToolData({
      summary: null,
      explain: {},
      quiz: null,
      notes: null
    });
    setErrors({});
  }, [article?.id]);

  const tabs = [
    { id: 'summary', label: 'Summarize', icon: Sparkles, badge: 'Key Points' },
    { id: 'explain', label: 'Explain Simply', icon: Lightbulb, badge: 'Analogies' },
    { id: 'quiz', label: 'Practice Quiz', icon: HelpCircle, badge: '5 MCQs' },
    { id: 'notes', label: 'Revision Notes', icon: BookOpen, badge: 'Exam Prep' }
  ];

  const handleFetchAction = async (action, level = explanationLevel) => {
    if (!article) return;
    setLoadingAction(action);
    setErrors(prev => ({ ...prev, [action]: null }));

    try {
      const result = await requestAiLearning({ action, article, level });

      setToolData(prev => {
        if (action === 'explain') {
          return {
            ...prev,
            explain: {
              ...prev.explain,
              [level]: result
            }
          };
        }
        return {
          ...prev,
          [action]: result
        };
      });
    } catch (err) {
      console.error(`AI Learning Error (${action}):`, err);
      setErrors(prev => ({
        ...prev,
        [action]: {
          message: err.message,
          code: err.code,
          status: err.status
        }
      }));
    } finally {
      setLoadingAction(null);
    }
  };

  const handleChangeExplainLevel = (newLevel) => {
    setExplanationLevel(newLevel);
    // If we haven't fetched this level yet, trigger fetch
    if (!toolData.explain[newLevel]) {
      handleFetchAction('explain', newLevel);
    }
  };

  const currentExplainData = toolData.explain[explanationLevel];
  const currentActionData = activeTab === 'explain' ? currentExplainData : toolData[activeTab];
  const currentError = errors[activeTab];
  const isLoading = loadingAction === activeTab;

  return (
    <section 
      id="medium-ai-learning-mode" 
      className="my-10 bg-gradient-to-b from-slate-50/80 to-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm transition-all"
    >
      {/* Header bar */}
      <div className="bg-slate-950 text-white px-5 py-4 md:px-7 md:py-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <GraduationCap size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base md:text-lg tracking-tight font-sans">
                Medium.AI
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Learning Mode
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Transform this story into actionable academic comprehension
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {serverStatus?.provider && serverStatus.provider !== 'none' && (
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-300 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Model: {serverStatus.provider.toUpperCase()}</span>
            </div>
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 transition"
          >
            <span>{isOpen ? 'Minimize' : 'Expand'}</span>
            {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="p-5 md:p-7 space-y-6"
          >
            {/* Tool Navigation Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200/80 pb-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                const hasData = tab.id === 'explain' 
                  ? Boolean(currentExplainData) 
                  : Boolean(toolData[tab.id]);

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      // Auto-trigger if empty
                      if (!hasData && !isLoading) {
                        handleFetchAction(tab.id, explanationLevel);
                      }
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/80'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon size={16} className={isActive ? 'text-emerald-400' : 'text-slate-500'} />
                      <div className="truncate">
                        <div className="text-xs md:text-sm font-bold truncate">
                          {tab.label}
                        </div>
                      </div>
                    </div>
                    {hasData && (
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? 'bg-emerald-400' : 'bg-emerald-600'}`}></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Error Message Card */}
            {currentError && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-50 border border-rose-200/80 rounded-2xl p-4 md:p-5 text-rose-950 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-rose-900">
                      {currentError.code === 'SERVER_OFFLINE'
                        ? 'Backend Server Not Running'
                        : currentError.code === 'API_KEY_NOT_CONFIGURED'
                          ? 'AI API Key Required'
                          : currentError.status === 429
                            ? 'Rate Limit Reached (Free Tier)'
                            : 'Could Not Complete AI Request'}
                    </h4>
                    <p className="text-xs md:text-sm text-rose-800 leading-relaxed">
                      {currentError.message}
                    </p>
                  </div>
                </div>

                {/* Helpful troubleshooting tips */}
                {currentError.code === 'SERVER_OFFLINE' && (
                  <div className="bg-white/80 p-3 rounded-xl border border-rose-100 text-xs font-mono text-slate-800 space-y-1">
                    <div className="text-slate-500 font-sans font-semibold">To start your local backend:</div>
                    <div className="flex items-center gap-2 bg-slate-900 text-emerald-400 p-2 rounded-lg">
                      <Terminal size={14} />
                      <code>npm run server</code>
                    </div>
                  </div>
                )}

                {currentError.code === 'API_KEY_NOT_CONFIGURED' && (
                  <div className="bg-white/80 p-3 rounded-xl border border-rose-100 text-xs text-slate-700 space-y-1">
                    <div className="font-semibold text-slate-900">Recommended Free-Tier Setup:</div>
                    <div>1. Obtain a free key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-emerald-700 underline font-medium">Google AI Studio</a>.</div>
                    <div>2. Create a <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">.env</code> file in the project root with <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">GEMINI_API_KEY=your_key</code>.</div>
                    <div>3. Restart the server with <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">npm run server</code>.</div>
                  </div>
                )}

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => handleFetchAction(activeTab, explanationLevel)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white px-3.5 py-1.5 rounded-lg transition shadow-sm"
                  >
                    <RotateCcw size={13} />
                    <span>Try Again</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="py-12 px-4 text-center space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 animate-pulse">
                  <Loader2 size={24} className="animate-spin" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    Generating {tabs.find(t => t.id === activeTab)?.label}...
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                    Analyzing "{article.title?.slice(0, 45)}..." with real-time academic AI reasoning
                  </p>
                </div>
                {/* Shimmer skeleton */}
                <div className="max-w-md mx-auto space-y-2 pt-2">
                  <div className="h-3 bg-slate-200/70 rounded-full animate-pulse w-5/6 mx-auto"></div>
                  <div className="h-3 bg-slate-200/70 rounded-full animate-pulse w-full mx-auto"></div>
                  <div className="h-3 bg-slate-200/70 rounded-full animate-pulse w-4/6 mx-auto"></div>
                </div>
              </div>
            )}

            {/* Empty State (Tool not generated yet) */}
            {!isLoading && !currentActionData && !currentError && (
              <div className="py-10 px-4 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-sm border border-slate-200 text-emerald-600">
                  {React.createElement(tabs.find(t => t.id === activeTab)?.icon || Sparkles, { size: 22 })}
                </div>
                <div className="max-w-md mx-auto space-y-1">
                  <h4 className="text-base font-bold text-slate-900">
                    Ready to explore with {tabs.find(t => t.id === activeTab)?.label}
                  </h4>
                  <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                    Use our AI academic assistant to extract insights, create interactive quizzes, or generate revision notes directly from this story.
                  </p>
                </div>
                <button
                  onClick={() => handleFetchAction(activeTab, explanationLevel)}
                  className="inline-flex items-center gap-2 bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs md:text-sm px-5 py-2.5 rounded-xl transition shadow-sm"
                >
                  <Sparkles size={15} className="text-emerald-400" />
                  <span>Generate {tabs.find(t => t.id === activeTab)?.label}</span>
                </button>
              </div>
            )}

            {/* Active Tool Content */}
            {!isLoading && currentActionData && (
              <div>
                {currentActionData._isDemo && (
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-amber-50 border border-amber-200 text-amber-900 text-xs px-3.5 py-2 rounded-xl mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                      <span className="font-bold">Interactive Preview</span>
                      <span className="text-amber-700 hidden sm:inline">
                        • Formulated for this article. Add <code className="bg-amber-100/80 px-1 rounded font-mono">GEMINI_API_KEY</code> to your <code className="bg-amber-100/80 px-1 rounded font-mono">.env</code> to activate live Google Gemini AI.
                      </span>
                    </div>
                  </div>
                )}

                {activeTab === 'summary' && (
                  <SummaryTool 
                    data={currentActionData} 
                    onRegenerate={() => handleFetchAction('summary')} 
                    isLoading={isLoading} 
                  />
                )}
                {activeTab === 'explain' && (
                  <ExplainTool 
                    data={currentActionData} 
                    currentLevel={explanationLevel}
                    onChangeLevel={handleChangeExplainLevel}
                    isLoading={isLoading}
                  />
                )}
                {activeTab === 'quiz' && (
                  <QuizTool 
                    data={currentActionData} 
                    onRegenerate={() => handleFetchAction('quiz')} 
                    isLoading={isLoading} 
                  />
                )}
                {activeTab === 'notes' && (
                  <NotesTool 
                    data={currentActionData} 
                    onRegenerate={() => handleFetchAction('notes')} 
                    isLoading={isLoading} 
                  />
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
