import React from 'react';
import { ArrowRight, Coins, Smartphone } from 'lucide-react';
import { APP_META } from '../data/mockData';
import { SandboxTab } from './InteractiveSandbox';

interface HeroProps {
  onScrollToSandbox: (tab?: SandboxTab) => void;
  onOpenGetAppModal: () => void;
  netBalance: number;
  totalExpensesCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  onScrollToSandbox,
  onOpenGetAppModal,
  netBalance,
  totalExpensesCount
}) => {
  return (
    <section id="top" className="relative pt-14 pb-20 md:pt-20 md:pb-28 overflow-hidden">
      {/* Subtle emerald and indigo ambient glow matching #0B4B3D and indigo-600 */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[420px] bg-emerald-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-1/4 w-[420px] h-[320px] bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-stretch mb-16">
          
          {/* Left Column: Proposition & Primary Action */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Clean unboxed metadata with typographic separators */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-400 font-medium">
              <span>{APP_META.name}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono tabular-nums">v{APP_META.version}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>Android &amp; Web PWA</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>By {APP_META.author}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
              Roommate bills and flat expenses, settled without awkward reminders.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Connect your flatmates in seconds with a 6-digit room code. Split rent, WiFi, groceries, maid salaries, and electricity bills equally or selectively, let the debt simplification engine minimize circular transfers, and settle up directly via UPI.
            </p>

            {/* Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={APP_META.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2.5 whitespace-nowrap cursor-pointer"
              >
                <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <span>Get it on Google Play</span>
                <ArrowRight size={16} />
              </a>

              <button
                onClick={() => onScrollToSandbox('dashboard')}
                className="px-6 py-3.5 text-sm font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-800 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <Smartphone size={16} className="text-emerald-400" />
                <span>Try Interactive Flat Sandbox</span>
              </button>
            </div>

            {/* Quiet unboxed feature highlights */}
            <div className="pt-3 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <span>6-Digit Room Invite Code</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>Real-Time Cloud Firestore Sync</span>
              <span aria-hidden="true" className="text-slate-700">·</span>
              <span>Direct UPI ID &amp; QR Support</span>
            </div>

          </div>

          {/* Right Column: Live App Interface Preview Card */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl flex flex-col justify-between space-y-5">
              
              {/* Top App Bar Replica */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B4B3D] border border-emerald-500/30 flex items-center justify-center text-emerald-300 font-extrabold text-sm">
                    FH
                  </div>
                  <div>
                    <div className="text-[11px] font-mono text-slate-400 uppercase">Active Flat</div>
                    <div className="text-sm font-bold text-white">{APP_META.defaultFlatName}</div>
                  </div>
                </div>
                <button
                  onClick={() => onScrollToSandbox('room')}
                  className="text-right font-mono text-xs text-slate-400 hover:text-white tabular-nums cursor-pointer"
                >
                  Code: <span className="text-indigo-400 font-bold">{APP_META.defaultFlatCode}</span>
                </button>
              </div>

              {/* Balance Ledger Summary Card Replica */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Balance Ledger Summary</span>
                  <Coins size={15} className="text-indigo-400" />
                </div>
                <div className="flex items-baseline gap-2.5">
                  <span className={`text-3xl font-extrabold font-mono tabular-nums ${
                    netBalance >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    ₹{Math.abs(Math.round(netBalance)).toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {netBalance > 0 ? 'Owed to you overall' : netBalance < 0 ? 'You owe overall' : 'All balances settled'}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-400">
                    Across {totalExpensesCount} shared bills
                  </span>
                  <button
                    onClick={() => onScrollToSandbox('split')}
                    className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 cursor-pointer"
                  >
                    + Add Bill →
                  </button>
                </div>
              </div>

              {/* Mini Peer Roommate Standing */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span className="font-semibold text-slate-300">Roommate Debt Network</span>
                  <button
                    onClick={() => onScrollToSandbox('settle')}
                    className="text-indigo-400 hover:underline cursor-pointer"
                  >
                    Settle Debts →
                  </button>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => onScrollToSandbox('settle')}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800/80 text-xs transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-300">
                        R
                      </div>
                      <div>
                        <div className="font-semibold text-white">Rohan Verma</div>
                        <div className="text-[11px] text-slate-500 font-mono">rohanv@okicici</div>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-emerald-400 tabular-nums">
                      owes you ₹150
                    </span>
                  </button>

                  <button
                    onClick={() => onScrollToSandbox('settle')}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800/80 text-xs transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-300">
                        P
                      </div>
                      <div>
                        <div className="font-semibold text-white">Priya Nair</div>
                        <div className="text-[11px] text-slate-500 font-mono">priyanair@ybl</div>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-emerald-400 tabular-nums">
                      owes you ₹1,150
                    </span>
                  </button>

                  <button
                    onClick={() => onScrollToSandbox('settle')}
                    className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800/80 text-xs transition-colors cursor-pointer text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-slate-300">
                        K
                      </div>
                      <div>
                        <div className="font-semibold text-white">Kabir Sharma</div>
                        <div className="text-[11px] text-slate-500 font-mono">kabir@paytm</div>
                      </div>
                    </div>
                    <span className="font-mono font-semibold text-emerald-400 tabular-nums">
                      owes you ₹1,750
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom Interactive Trigger */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Flatmate Score: <strong className="text-emerald-400 font-mono tabular-nums">100 / 100</strong>
                </span>
                <button
                  onClick={() => onScrollToSandbox('dashboard')}
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Open Interactive App</span>
                  <ArrowRight size={13} />
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Full-Width 4-Column Quantitative Proof Strip Below Hero Split */}
        <div className="border-t border-slate-800 pt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            
            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                6-Digit Code
              </div>
              <div className="text-xs font-semibold text-emerald-400">
                Instant Flat Onboarding
              </div>
              <p className="text-xs text-slate-400">
                Roommates join via a 6-digit access code or auto-join URL link (`?join=564903`).
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                Up to 70%
              </div>
              <div className="text-xs font-semibold text-emerald-400">
                Fewer UPI Transfers
              </div>
              <p className="text-xs text-slate-400">
                Debt simplification collapses circular roommate IOUs into minimum direct payments.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                100 / 100
              </div>
              <div className="text-xs font-semibold text-emerald-400">
                Roommate Trust Score
              </div>
              <p className="text-xs text-slate-400">
                Tracks timely settlements and transparent expense logging across the flat.
              </p>
            </div>

            <div className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                Instant Sync
              </div>
              <div className="text-xs font-semibold text-emerald-400">
                Android &amp; Web Access
              </div>
              <p className="text-xs text-slate-400">
                Available on the Google Play Store and any mobile or desktop browser.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
