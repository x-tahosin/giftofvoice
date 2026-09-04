import React from 'react';
import { Moon, Eye, Sparkles, Layers, BookOpen, Heart } from 'lucide-react';
import GiftOfVoiceLogo from './GiftOfVoiceLogo';

export default function Header({
  currentTheme,
  setTheme,
}) {
  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'contrast' : 'dark');
  };

  return (
    <header className="site-header">
      <div className="site-header-inner">
        {/* Brand Section with Bespoke Premium Logo */}
        <a href="#" className="brand-section" aria-label="GiftOfVoice Home">
          <GiftOfVoiceLogo size={38} />
          <div className="brand-title">
            <span className="brand-name-gift">Gift</span>
            <span className="brand-name-of">Of</span>
            <span className="brand-name-voice">Voice</span>
          </div>
        </a>

        {/* Quick-Jump Section Navigation */}
        <nav className="nav-links" aria-label="Page Navigation">
          <a href="#demo" className="nav-link-btn">
            <Sparkles size={14} color="var(--primary)" />
            <span>Interactive Demo</span>
          </a>

          <a href="#cases" className="nav-link-btn">
            <BookOpen size={14} color="var(--rose)" />
            <span>Case Studies</span>
          </a>

          <a href="#studio" className="nav-link-btn">
            <Layers size={14} color="var(--emerald)" />
            <span>AAC Studio</span>
          </a>

          <a href="#donors" className="nav-link-btn">
            <Heart size={14} color="var(--rose)" />
            <span>Voice Bank</span>
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="header-right">
          <button
            onClick={toggleTheme}
            className="btn-pill theme-toggle-btn"
            title="Toggle Dark Mode / WCAG AAA Contrast"
            aria-label="Toggle Theme"
          >
            {currentTheme === 'dark' ? (
              <>
                <Moon size={14} color="var(--primary)" />
                <span>Dark Mode</span>
              </>
            ) : (
              <>
                <Eye size={14} color="var(--primary)" />
                <span>AAA Contrast</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
