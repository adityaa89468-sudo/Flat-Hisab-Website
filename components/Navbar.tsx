import React from 'react';
import { scrollToSection } from '../utils/helpers';

interface NavbarProps {
  onOpenGetAppModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenGetAppModal }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="text-lg font-extrabold tracking-tight text-white hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Flat Hisab
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <a
            href="#sandbox"
            onClick={(e) => handleNavClick(e, 'sandbox')}
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Interactive Demo
          </a>
          <a
            href="#how-it-works"
            onClick={(e) => handleNavClick(e, 'how-it-works')}
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            How It Works
          </a>
          <a
            href="#debt-simplifier"
            onClick={(e) => handleNavClick(e, 'debt-simplifier')}
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Debt Simplifier
          </a>
          <a
            href="#stories"
            onClick={(e) => handleNavClick(e, 'stories')}
            className="hover:text-white hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Flatmate Stories
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onOpenGetAppModal}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            Get Flat Hisab
          </button>
        </div>

      </div>
    </header>
  );
};
