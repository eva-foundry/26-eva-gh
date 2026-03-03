import React from 'react';
import type { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useI18n } from '../i18n/i18n';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { lang, toggleLanguage, t } = useI18n();

  return (
    <div className="app-shell" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header - Authentic Canada.ca Style: WHITE with signature RED bar */}
      <header className="app-header" style={{
        background: '#ffffff',
        borderBottom: '4px solid #af3c43', /* Signature red */
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div className="app-header-inner" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Link to="/" className="app-title" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: '#333333',
            textDecoration: 'none'
          }}>
            {/* Canadian Flag Symbol - Professional */}
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Government of Canada">
              <rect x="0" y="0" width="10" height="24" fill="#af3c43"/>
              <rect x="10" y="0" width="12" height="24" fill="#ffffff"/>
              <path d="M16 8l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3l1-3z" fill="#af3c43"/>
              <rect x="22" y="0" width="10" height="24" fill="#af3c43"/>
            </svg>
            <div>
              <div className="app-title-main" style={{
                fontSize: '18px',
                fontWeight: 400,
                fontFamily: "'Noto Sans', sans-serif",
                color: '#333333'
              }}>
                {t('appTitle')}
              </div>
              <div className="app-title-sub" style={{
                fontSize: '13px',
                color: '#555555',
                fontWeight: 400,
                marginTop: '2px'
              }}>
                {t('heroTagline')}
              </div>
            </div>
          </Link>
          <nav className="app-nav" aria-label="Main navigation" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'app-nav-link--active' : undefined
              }
              style={({ isActive }) => ({
                color: isActive ? '#1c2d46' : '#284162',
                textDecoration: isActive ? 'underline' : 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'background 0.2s ease',
                background: isActive ? '#f5f5f5' : 'transparent',
                fontWeight: isActive ? 600 : 400,
                fontSize: '15px'
              })}
            >
              {t('navProducts')}
            </NavLink>
            <NavLink
              to="/devtools"
              className={({ isActive }) =>
                isActive ? 'app-nav-link--active' : undefined
              }
              style={({ isActive }) => ({
                color: isActive ? '#1c2d46' : '#284162',
                textDecoration: isActive ? 'underline' : 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'background 0.2s ease',
                background: isActive ? '#f5f5f5' : 'transparent',
                fontWeight: isActive ? 600 : 400,
                fontSize: '15px'
              })}
            >
              {t('navDevTools')}
            </NavLink>
            <a
              href="/eva-suite/library/"
              style={{
                color: '#284162',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'background 0.2s ease',
                fontWeight: 400,
                fontSize: '15px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#f5f5f5';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              📚 {lang === 'en' ? 'Library' : 'Bibliothèque'}
            </a>
            <NavLink
              to="/project-stats"
              className={({ isActive }) =>
                isActive ? 'app-nav-link--active' : undefined
              }
              style={({ isActive }) => ({
                color: isActive ? '#1c2d46' : '#284162',
                textDecoration: isActive ? 'underline' : 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'background 0.2s ease',
                background: isActive ? '#f5f5f5' : 'transparent',
                fontWeight: isActive ? 600 : 400,
                fontSize: '15px'
              })}
            >
              📊 {lang === 'en' ? 'Stats' : 'Statistiques'}
            </NavLink>
            <NavLink
              to="/gc-demo"
              className={({ isActive }) =>
                isActive ? 'app-nav-link--active' : undefined
              }
              style={({ isActive }) => ({
                color: '#ffffff',
                background: isActive ? '#1c2d46' : '#284162',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '4px',
                transition: 'background 0.2s ease',
                fontWeight: 500,
                fontSize: '15px'
              })}
            >
              {t('navGCDemo')}
            </NavLink>
            <span style={{
              width: '1px',
              height: '20px',
              background: '#dee2e6',
              margin: '0 4px'
            }} />
            <button
              type="button"
              className="app-lang-toggle"
              onClick={toggleLanguage}
              aria-label={
                lang === 'en'
                  ? 'Basculer l\'interface en français'
                  : 'Switch interface to English'
              }
              style={{
                background: 'transparent',
                border: '2px solid #284162',
                color: '#284162',
                padding: '6px 14px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#284162';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#284162';
              }}
            >
              {lang === 'en' ? 'Français' : 'English'}
            </button>
          </nav>
        </div>
      </header>

      <main className="app-main" style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer - Authentic Canada.ca Style: WHITE with signature RED bar */}
      <footer className="app-footer" style={{
        background: '#ffffff',
        color: '#555555',
        padding: '32px 24px',
        marginTop: '64px',
        borderTop: '4px solid #af3c43', /* Signature red */
        boxShadow: '0 -2px 4px rgba(0,0,0,0.05)'
      }}>
        <div className="app-footer-inner" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          fontSize: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          textAlign: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <svg width="24" height="18" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Government of Canada">
              <rect x="0" y="0" width="10" height="24" fill="#af3c43"/>
              <rect x="10" y="0" width="12" height="24" fill="#cccccc"/>
              <path d="M16 8l1 3h3l-2.5 2 1 3-2.5-2-2.5 2 1-3-2.5-2h3l1-3z" fill="#af3c43"/>
              <rect x="22" y="0" width="10" height="24" fill="#af3c43"/>
            </svg>
            <span style={{ color: '#333333', fontWeight: 500 }}>© {new Date().getFullYear()} EVA Suite Lab</span>
          </div>
          <div style={{ color: '#6c6c6c', fontSize: '13px' }}>
            {t('footerCompliance')}
          </div>
          <div style={{ fontSize: '13px', color: '#6c6c6c' }}>
            Protected B · WCAG 2.1 AA · Official Languages Act · Privacy Act
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
