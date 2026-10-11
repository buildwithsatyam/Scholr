import React from 'react';
import { Lightbulb, Compass, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ExplainTool({ data, currentLevel, onChangeLevel, isLoading }) {
  const levels = [
    { id: 'Beginner', label: 'Beginner', desc: 'Simple terms & everyday analogies' },
    { id: 'Intermediate', label: 'Intermediate', desc: 'Practical mechanisms & use-cases' },
    { id: 'Advanced', label: 'Advanced', desc: 'System tradeoffs & deep theory' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Level Selector */}
      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2.5 px-1">
          Select Explanation Depth:
        </div>
        <div className="grid grid-cols-3 gap-2">
          {levels.map((lvl) => {
            const active = currentLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => onChangeLevel(lvl.id)}
                disabled={isLoading}
                className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl text-center transition-all ${
                  active 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/60'
                } ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
              >
                <span className="text-xs md:text-sm font-bold flex items-center gap-1.5">
                  {lvl.label}
                  {active && <CheckCircle2 size={13} className="text-emerald-400" />}
                </span>
                <span className={`text-[10px] hidden sm:block mt-0.5 ${active ? 'text-slate-300' : 'text-slate-400'}`}>
                  {lvl.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {data && (
        <>
          {/* Real-World Analogy Highlight Card */}
          {data.analogy && (
            <motion.div 
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 md:p-5 text-amber-950 shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                <Lightbulb size={16} className="text-amber-600" />
                <span>The Mental Model Analogy</span>
              </div>
              <p className="text-sm md:text-[15px] italic leading-relaxed text-amber-900 font-serif">
                "{data.analogy}"
              </p>
            </motion.div>
          )}

          {/* Main Plain-English Explanation */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              <Compass size={15} className="text-emerald-600" />
              <span>Core Explanation ({data.level || currentLevel})</span>
            </div>
            <div className="text-slate-800 text-[15px] md:text-[16px] leading-relaxed whitespace-pre-line">
              {data.explanation}
            </div>
          </div>

          {/* Key Concepts Breakdown */}
          {data.keyConcepts && data.keyConcepts.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Layers size={16} className="text-emerald-600" />
                <span>Key Concepts Broken Down</span>
              </div>
              <div className="grid gap-3">
                {data.keyConcepts.map((item, idx) => (
                  <div 
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/70 space-y-1"
                  >
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      {item.concept}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed pl-4">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </motion.div>
  );
}
