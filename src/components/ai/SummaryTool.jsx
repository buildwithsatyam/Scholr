import React, { useState } from 'react';
import { Copy, Check, Sparkles, Clock, ListChecks } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SummaryTool({ data, onRegenerate, isLoading }) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const { summary, takeaways = [], readingTimeEstimate } = data;

  const handleCopy = () => {
    const textToCopy = `SUMMARY:\n${summary}\n\nKEY TAKEAWAYS:\n${takeaways.map((t, i) => `${i + 1}. ${t}`).join('\n')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      {/* Action Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          <Sparkles size={13} />
          <span>AI Executive Summary</span>
          {readingTimeEstimate && (
            <>
              <span className="text-emerald-300">•</span>
              <span className="flex items-center gap-1 font-normal text-emerald-600">
                <Clock size={12} /> {readingTimeEstimate}
              </span>
            </>
          )}
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition shadow-sm"
          title="Copy summary & takeaways"
        >
          {copied ? (
            <>
              <Check size={13} className="text-emerald-600" />
              <span className="text-emerald-600 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={13} />
              <span>Copy Summary</span>
            </>
          )}
        </button>
      </div>

      {/* Main Summary Text */}
      <div className="text-slate-800 text-[15px] md:text-[16px] leading-relaxed whitespace-pre-line bg-slate-50/60 p-5 rounded-xl border border-slate-100">
        {summary}
      </div>

      {/* Key Takeaways */}
      {takeaways && takeaways.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
            <ListChecks size={16} className="text-emerald-600" />
            <span>Key Takeaways for Students</span>
          </div>
          <div className="grid gap-2.5">
            {takeaways.map((takeaway, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-sm"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold shrink-0 mt-0.5">
                  {index + 1}
                </span>
                <p className="text-sm text-slate-700 leading-snug font-medium">
                  {takeaway}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
