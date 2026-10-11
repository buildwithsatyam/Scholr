import React, { useState } from 'react';
import { Copy, Check, BookOpen, BookmarkCheck, Lightbulb, FileText, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotesTool({ data, onRegenerate, isLoading }) {
  const [copied, setCopied] = useState(false);

  if (!data) return null;

  const {
    title,
    overview,
    keyConcepts = [],
    importantDefinitions = [],
    revisionPoints = [],
    practicalTakeaway
  } = data;

  const handleCopy = () => {
    let markdown = `# ${title || 'Revision Notes'}\n\n`;
    if (overview) markdown += `## Overview\n${overview}\n\n`;

    if (keyConcepts.length > 0) {
      markdown += `## Key Concepts\n`;
      keyConcepts.forEach(c => {
        markdown += `- **${c.term}**: ${c.detail}\n`;
      });
      markdown += '\n';
    }

    if (importantDefinitions.length > 0) {
      markdown += `## Important Definitions\n`;
      importantDefinitions.forEach(d => {
        markdown += `- **${d.term}**: ${d.definition}\n`;
      });
      markdown += '\n';
    }

    if (revisionPoints.length > 0) {
      markdown += `## Quick Revision Points\n`;
      revisionPoints.forEach(p => {
        markdown += `- ${p}\n`;
      });
      markdown += '\n';
    }

    if (practicalTakeaway) {
      markdown += `## Core Practical Takeaway\n${practicalTakeaway}\n`;
    }

    navigator.clipboard.writeText(markdown);
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
      {/* Header with Copy Button */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-sm md:text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen size={18} className="text-emerald-600" />
            <span>{title || 'Structured Revision Notes'}</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Formatted cheat sheet designed for rapid recall and exam prep
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-lg transition shadow-sm"
          title="Copy markdown notes"
        >
          {copied ? (
            <>
              <Check size={14} className="text-emerald-600" />
              <span className="text-emerald-600">Copied to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy Notes</span>
            </>
          )}
        </button>
      </div>

      {/* High-Level Overview */}
      {overview && (
        <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-200/60 text-slate-700 text-sm leading-relaxed">
          <span className="font-bold text-slate-900 mr-1.5">Overview:</span>
          {overview}
        </div>
      )}

      {/* Key Concepts */}
      {keyConcepts && keyConcepts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <BookmarkCheck size={15} className="text-emerald-600" />
            <span>Key Concepts & Theories</span>
          </div>
          <div className="grid gap-2.5">
            {keyConcepts.map((item, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm"
              >
                <div className="text-sm font-bold text-slate-900 mb-1">
                  {item.term}
                </div>
                <div className="text-sm text-slate-600 leading-relaxed">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Important Definitions */}
      {importantDefinitions && importantDefinitions.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <FileText size={15} className="text-emerald-600" />
            <span>Important Definitions & Jargon</span>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {importantDefinitions.map((def, index) => (
              <div 
                key={index}
                className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70"
              >
                <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide mb-1 font-mono">
                  {def.term}
                </div>
                <div className="text-xs text-slate-700 leading-relaxed">
                  {def.definition}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Revision Bullet Points */}
      {revisionPoints && revisionPoints.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <CheckCircle2 size={15} className="text-emerald-600" />
            <span>Quick Revision Bullet Points</span>
          </div>
          <ul className="space-y-2 bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
            {revisionPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2"></span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Practical Takeaway Card */}
      {practicalTakeaway && (
        <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-xl p-4 text-emerald-950 flex items-start gap-3">
          <Lightbulb size={18} className="text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-0.5">
              Practical Takeaway
            </div>
            <p className="text-sm text-emerald-900 leading-relaxed font-medium">
              {practicalTakeaway}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
