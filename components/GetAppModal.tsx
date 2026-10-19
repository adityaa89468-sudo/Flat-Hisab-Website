import React, { useState } from 'react';
import { APP_META } from '../data/mockData';
import { Smartphone, Check, Share2, ExternalLink, CheckCircle2 } from 'lucide-react';
import { copyTextToClipboard } from '../utils/helpers';

interface GetAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToSandbox: () => void;
}

export const GetAppModal: React.FC<GetAppModalProps> = ({
  isOpen,
  onClose,
  onJumpToSandbox
}) => {
  const [copiedPlayLink, setCopiedPlayLink] = useState(false);

  if (!isOpen) return null;

  const handleCopyPlayStoreUrl = async () => {
    await copyTextToClipboard(APP_META.playStoreUrl);
    setCopiedPlayLink(true);
    setTimeout(() => setCopiedPlayLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8 space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#0B4B3D] border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-extrabold text-base shrink-0">
            FH
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{APP_META.name}</h3>
            <p className="text-xs text-slate-400">
              Version {APP_META.version} · Available on Google Play
            </p>
          </div>
        </div>

        {/* Google Play Store Direct Download Banner */}
        <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">Download the Official Android App</div>
            <p className="text-xs text-slate-300">
              Install {APP_META.shortName} for free from the Google Play Store and start splitting bills with your roommates.
            </p>
          </div>
          <a
            href={APP_META.playStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Open Google Play</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* User-Friendly Quick Start Steps */}
        <div className="space-y-3 bg-slate-950 border border-slate-800 rounded-2xl p-5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            How to Get Started with Your Flatmates
          </h4>
          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Step 1:</strong> Download Flat Hisab from Google Play and sign in with Google or Email.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Step 2:</strong> Create your flat room to get a 6-digit code, or enter a roommate&apos;s code to join.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Step 3:</strong> Add shared bills (Rent, WiFi, Groceries, Electricity) and settle simplified balances via UPI.</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <button
            onClick={() => {
              onClose();
              onJumpToSandbox();
            }}
            className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Smartphone size={15} className="text-emerald-400" />
            <span>Try Interactive Demo First</span>
          </button>

          <button
            onClick={handleCopyPlayStoreUrl}
            className="py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            {copiedPlayLink ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
            <span>{copiedPlayLink ? 'Play Store Link Copied!' : 'Share App Link'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
