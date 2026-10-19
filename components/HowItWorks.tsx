import React, { useState } from 'react';
import { Users, Coins, Bell, Smartphone, ArrowRight, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [simplifierView, setSimplifierView] = useState<'simplified' | 'raw'>('simplified');

  const steps = [
    {
      number: '01',
      title: 'Create or Join with a 6-Digit Flat Code',
      subtitle: 'Connect your flatmates in under 30 seconds.',
      description: 'One flatmate creates a room (for example, "Flat 302, Green Fields") and gets a unique 6-digit room code and shareable invite link. Roommates tap the link or enter the 6 digits to join the shared flat ledger.',
      points: [
        'One-tap WhatsApp or link sharing for flatmates',
        'No phone contact-book permissions required',
        'Works for apartments, PGs, hostels, and group trips'
      ],
      icon: Users
    },
    {
      number: '02',
      title: 'Split Household Bills in Seconds',
      subtitle: 'Equal or selective roommate splitting.',
      description: 'Enter what the bill was for—Rent, WiFi, Groceries, Electricity, or Maid & Cook—pick who paid, and check which roommates are included. The live calculator shows the exact per-person share in ₹ INR.',
      points: [
        'Uncheck a roommate easily if they are away for the month',
        'Automatic per-person share calculation in ₹ INR',
        'Full bill history so everyone can verify past expenses'
      ],
      icon: Coins
    },
    {
      number: '03',
      title: 'Instant Split Notifications',
      subtitle: 'Every flatmate stays in the loop automatically.',
      description: 'The moment a bill is added, Flat Hisab notifies every included roommate showing who paid, what the expense was for, and their individual share—eliminating end-of-month surprises.',
      points: [
        'Instant alerts whenever a new bill or settlement is logged',
        'Clear activity feed inside the app',
        'Complete transparency across the entire flat'
      ],
      icon: Bell
    },
    {
      number: '04',
      title: 'Easy UPI Settlement & Roommate Score',
      subtitle: 'Keep your flatmate score at 100 / 100.',
      description: 'Each roommate can save their UPI ID (such as Google Pay, PhonePe, or Paytm) in their profile. When settling up, copy their UPI ID with one tap, pay directly, and mark the balance settled.',
      points: [
        'Save your UPI ID once so roommates never have to ask for it',
        'Verified settlement history with date and payment reference',
        'Roommate Score rewards timely settlements'
      ],
      icon: Smartphone
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Part 1: 4-Step Workflow */}
        <div>
          <div className="max-w-3xl mb-14">
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
              Simple 4-Step Flow
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              How Flat Hisab keeps roommate finances crystal clear.
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Designed for flatmates sharing monthly household expenses—from rent and maid salaries to daily groceries and WiFi bills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-3xl p-7 flex flex-col justify-between transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-mono text-2xl font-extrabold text-emerald-400 tabular-nums">
                        {step.number}.
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-200">
                        <Icon size={18} />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-400 mb-3">
                      {step.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                      {step.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 space-y-2">
                    {step.points.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                        <CheckCircle2 size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Part 2: Interactive Debt Simplification Engine Comparison */}
        <div id="debt-simplifier" className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="max-w-2xl">
              <div className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1.5">
                Smart Balance Simplifier
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Fewer payments at the end of the month.
              </h3>
              <p className="text-sm text-slate-300 mt-2">
                When 4 roommates pay for different bills all month, paying each bill separately creates up to 9 back-and-forth transfers. Flat Hisab automatically combines everyone&apos;s bills so you settle the entire month in just 3 direct payments.
              </p>
            </div>

            {/* Interactive Segmented Toggle */}
            <div className="flex items-center gap-1 p-1 bg-slate-950 border border-slate-800 rounded-xl self-start lg:self-center shrink-0">
              <button
                onClick={() => setSimplifierView('simplified')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  simplifierView === 'simplified'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                With Flat Hisab (3 Payments)
              </button>
              <button
                onClick={() => setSimplifierView('raw')}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  simplifierView === 'raw'
                    ? 'bg-rose-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Without Flat Hisab (9 Payments)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 items-center">
            
            {/* Left: Monthly Scenario Inputs */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Sample Month in Flat 302 (Total Spend: ₹10,200)
              </h4>

              <div className="space-y-2.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">Aditya</span> paid Maid &amp; Groceries
                  </div>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">₹6,400 paid</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">Rohan Verma</span> paid BESCOM Electricity
                  </div>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">₹2,400 paid</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">Priya Nair</span> paid ACT Fibernet WiFi
                  </div>
                  <span className="font-mono font-bold text-emerald-400 tabular-nums">₹1,400 paid</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white">Kabir Sharma</span> (Settled ₹800 early)
                  </div>
                  <span className="font-mono font-bold text-slate-300 tabular-nums">₹800 paid</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400">
                Equal share per flatmate: <strong className="text-white font-mono tabular-nums">₹2,550 each</strong>.
              </div>
            </div>

            {/* Right: Resulting Settlement Transfers */}
            <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              {simplifierView === 'simplified' ? (
                <>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-sm font-bold text-emerald-400">
                      Simplified Settlement (Only 3 UPI Payments Needed)
                    </span>
                    <span className="text-xs text-slate-400">Smart Auto-Match</span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">Kabir Sharma</span>
                        <ArrowRight size={14} className="text-emerald-400" />
                        <span className="font-bold text-emerald-400">Aditya</span>
                      </div>
                      <span className="font-mono font-bold text-white text-sm tabular-nums">₹1,750</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">Priya Nair</span>
                        <ArrowRight size={14} className="text-emerald-400" />
                        <span className="font-bold text-emerald-400">Aditya</span>
                      </div>
                      <span className="font-mono font-bold text-white text-sm tabular-nums">₹1,150</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">Rohan Verma</span>
                        <ArrowRight size={14} className="text-emerald-400" />
                        <span className="font-bold text-emerald-400">Aditya</span>
                      </div>
                      <span className="font-mono font-bold text-white text-sm tabular-nums">₹150</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 pt-1">
                    Result: Every roommate makes at most <strong className="text-white">1 UPI transfer</strong> and the entire flat is 100% settled.
                  </p>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-sm font-bold text-rose-400">
                      Bill-by-Bill Transfers (9 Separate Payments)
                    </span>
                    <span className="text-xs text-slate-400">Manual Splitting</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 font-mono">
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">Rohan → Aditya: ₹1,600</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">Priya → Aditya: ₹1,600</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">Kabir → Aditya: ₹800</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">Aditya → Priya: ₹350</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">Rohan → Priya: ₹350</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">Kabir → Priya: ₹350</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">Aditya → Rohan: ₹600</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">Priya → Rohan: ₹600</div>
                    <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">Kabir → Rohan: ₹600</div>
                  </div>

                  <p className="text-xs text-rose-300/90 pt-1">
                    Without simplification, Aditya pays Rohan ₹600 while Rohan also pays Aditya ₹1,600—wasting time with back-and-forth payments.
                  </p>
                </>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
