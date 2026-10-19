import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="stories" className="py-24 bg-slate-950 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            Real Flatmate Outcomes
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Built for shared apartments, PGs, and student hostels.
          </h2>
          <p className="mt-3 text-base text-slate-300">
            How roommates across India use Flat Hisab to keep household bills transparent and friendships intact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-7 flex flex-col justify-between transition-colors"
            >
              <div>
                <Quote size={26} className="text-emerald-500/40 mb-4" />
                <p className="text-sm text-slate-200 leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-xs font-bold text-white">{t.author}</div>
                <div className="text-[11px] text-indigo-400 mt-0.5">{t.role}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{t.location}</div>
                <div className="mt-3 font-mono text-xs font-semibold text-emerald-400">
                  {t.metric}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
