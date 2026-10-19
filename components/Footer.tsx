import React from 'react';
import { APP_META } from '../data/mockData';
import { scrollToSection } from '../utils/helpers';

interface FooterProps {
  onOpenGetAppModal: () => void;
  onOpenLegalModal: (doc: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenGetAppModal,
  onOpenLegalModal
}) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-12 border-b border-slate-800/80">
          
          <div className="md:col-span-2 space-y-3">
            <a
              href="#top"
              onClick={(e) => handleNavClick(e, 'top')}
              className="text-white hover:text-emerald-400 font-extrabold text-base tracking-tight inline-block transition-colors cursor-pointer"
            >
              {APP_META.name}
            </a>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              A lightweight, secure shared expense tracker for roommates and flatmates. Split household bills, simplify circular debts, and settle via UPI.
            </p>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
              <span>Version {APP_META.version}</span>
              <span aria-hidden="true">·</span>
              <span>Android &amp; Web</span>
            </div>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-slate-200 font-semibold text-xs">Features</h4>
            <ul className="space-y-2">
              <li>
                <a href="#sandbox" onClick={(e) => handleNavClick(e, 'sandbox')} className="hover:text-white transition-colors cursor-pointer">
                  Interactive Demo
                </a>
              </li>
              <li>
                <a href="#how-it-works" onClick={(e) => handleNavClick(e, 'how-it-works')} className="hover:text-white transition-colors cursor-pointer">
                  6-Digit Room Code
                </a>
              </li>
              <li>
                <a href="#debt-simplifier" onClick={(e) => handleNavClick(e, 'debt-simplifier')} className="hover:text-white transition-colors cursor-pointer">
                  Debt Simplifier
                </a>
              </li>
              <li>
                <a href="#stories" onClick={(e) => handleNavClick(e, 'stories')} className="hover:text-white transition-colors cursor-pointer">
                  Flatmate Stories
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-slate-200 font-semibold text-xs">Help &amp; Legal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onOpenLegalModal('privacy')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenLegalModal('terms')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2.5">
            <h4 className="text-slate-200 font-semibold text-xs">Get the App</h4>
            <p className="text-slate-400 text-xs">
              Available now on Google Play for Android devices.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href={APP_META.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-colors text-center cursor-pointer"
              >
                Get it on Google Play
              </a>
              <button
                onClick={onOpenGetAppModal}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                How to Get Started
              </button>
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {APP_META.name}. Made by {APP_META.author}.
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onOpenLegalModal('privacy')} className="hover:text-slate-300 cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onOpenLegalModal('terms')} className="hover:text-slate-300 cursor-pointer">
              Terms &amp; Conditions
            </button>
            <a href="#sandbox" onClick={(e) => handleNavClick(e, 'sandbox')} className="hover:text-slate-300 cursor-pointer">
              Live Demo
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
