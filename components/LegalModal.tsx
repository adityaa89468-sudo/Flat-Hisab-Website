import React from 'react';
import { ShieldCheck, FileText } from 'lucide-react';
import { APP_META } from '../data/mockData';

interface LegalModalProps {
  activeDoc: 'privacy' | 'terms' | null;
  onClose: () => void;
  onSwitchDoc: (doc: 'privacy' | 'terms') => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  activeDoc,
  onClose,
  onSwitchDoc
}) => {
  if (!activeDoc) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white text-lg font-bold p-1 cursor-pointer"
        >
          ✕
        </button>

        {/* Segmented Document Switcher */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 border border-slate-800 rounded-xl w-fit">
          <button
            onClick={() => onSwitchDoc('privacy')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeDoc === 'privacy'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck size={14} />
            <span>Privacy Policy</span>
          </button>
          <button
            onClick={() => onSwitchDoc('terms')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeDoc === 'terms'
                ? 'bg-emerald-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText size={14} />
            <span>Terms &amp; Conditions</span>
          </button>
        </div>

        {activeDoc === 'privacy' ? (
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
            <h3 className="text-xl font-bold text-white">
              Privacy Policy — {APP_META.name}
            </h3>
            <p className="text-slate-400">
              Effective Date: October 2026 · Version {APP_META.version}
            </p>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">1. Data We Collect</h4>
              <p>
                {APP_META.name} collects only the minimum information required to synchronize shared household expenses across flatmates: your display name, email address (via Firebase Authentication), optional UPI handle for peer-to-peer settlement convenience, and the expense/settlement records created inside your flat group.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">2. Room Isolation &amp; Account Security</h4>
              <p>
                All flat data is privately scoped to your room group and protected by secure authentication. We do not scrape your phone contacts or read SMS messages. Roommates join strictly via your explicit 6-digit flat code or invitation link.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">3. UPI &amp; Financial Information</h4>
              <p>
                {APP_META.name} does not process or hold funds directly. UPI IDs stored in user profiles are used solely to help roommates initiate direct peer-to-peer transfers in their preferred UPI app and log transaction references.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
            <h3 className="text-xl font-bold text-white">
              Terms &amp; Conditions — {APP_META.name}
            </h3>
            <p className="text-slate-400">
              Last Updated: October 2026 · Created by {APP_META.author}
            </p>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">1. Purpose of the Service</h4>
              <p>
                {APP_META.name} provides a shared bookkeeping and debt-simplification ledger for roommates, flatmates, and shared households. All calculations are based on entries logged by members of your room.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">2. Accuracy of Split Records</h4>
              <p>
                Any member of an active flat group may log expenses, mark settlements, or perform corrections via the History tab. All changes are broadcast to group members via real-time notifications.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-white">3. Account &amp; Room Disconnection</h4>
              <p>
                Users can disconnect from a flat group or sign out at any time from the Profile &amp; Room tab, and rejoin later using the 6-digit flat invitation code.
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close Document
          </button>
        </div>

      </div>
    </div>
  );
};
