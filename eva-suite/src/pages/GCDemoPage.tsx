import React from 'react';
import { useI18n } from '../i18n/i18n';
import BatchRAGDemo from '../components/BatchRAGDemo';
import GCChatFrame from '../components/GCChatFrame';

const GCDemoPage: React.FC = () => {
  const { lang } = useI18n();

  return (
    <div style={{ background: '#f5f5f5', minHeight: '100vh', padding: '2rem 0' }}>
      {/* GC Header Banner */}
      <div
        style={{
          background: '#26374a',
          color: '#ffffff',
          padding: '2rem 0',
          marginBottom: '2rem',
          borderBottom: '4px solid #ffbf47',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ fontSize: '4rem' }}>🍁</div>
            <div>
              <h1 style={{ margin: 0, fontSize: '2.5rem', fontWeight: 600 }}>
                {lang === 'fr' ? 'Suite EVA - Démo du système de conception du GC' : 'EVA Suite - GC Design System Demo'}
              </h1>
              <p style={{ margin: '0.5rem 0 0', fontSize: '1.1rem', opacity: 0.9 }}>
                {lang === 'fr'
                  ? 'Composants de qualité entreprise conformes au Programme de coordination de l\'image de marque'
                  : 'Enterprise-grade components compliant with Federal Identity Program'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Compliance Badge */}
        <div
          style={{
            background: '#d8eeca',
            border: '2px solid #278400',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <div style={{ fontSize: '3rem' }}>✓</div>
          <div>
            <h3 style={{ margin: 0, color: '#278400', fontSize: '1.3rem', fontWeight: 700 }}>
              {lang === 'fr' ? 'Conformité validée' : 'Validated Compliance'}
            </h3>
            <p style={{ margin: '0.25rem 0 0', color: '#26374a', fontSize: '0.95rem' }}>
              {lang === 'fr'
                ? 'WCAG 2.1 AA • Programme de coordination de l\'image de marque • Loi sur les langues officielles'
                : 'WCAG 2.1 AA • Federal Identity Program • Official Languages Act'}
            </p>
          </div>
        </div>

        {/* Chat Frame Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div
            style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid #e0e0e0',
            }}
          >
            <h2 style={{ margin: '0 0 0.75rem 0', color: '#26374a', fontSize: '1.8rem', fontWeight: 700 }}>
              💬 {lang === 'fr' ? 'Cadre de conversation IA bilingue' : 'Bilingual AI Chat Frame'}
            </h2>
            <p style={{ margin: 0, color: '#605e5c', fontSize: '1rem', lineHeight: 1.6 }}>
              {lang === 'fr'
                ? 'Interface de conversation accessible avec basculement de langue, messages contextuels et indicateurs d\'état en temps réel. Entièrement conforme aux normes d\'accessibilité WCAG 2.1 AA.'
                : 'Accessible chat interface with language toggle, contextual messages, and real-time status indicators. Fully compliant with WCAG 2.1 AA accessibility standards.'}
            </p>
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                background: '#f5f5f5',
                borderRadius: '4px',
                borderLeft: '4px solid #0535d2',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: '#605e5c' }}>
                <strong style={{ color: '#0535d2' }}>
                  {lang === 'fr' ? 'Fonctionnalités:' : 'Features:'}
                </strong>{' '}
                {lang === 'fr'
                  ? 'Basculement EN/FR en direct • Messages simulés • Questions suggérées • Défilement automatique'
                  : 'Live EN/FR toggle • Simulated responses • Suggested questions • Auto-scroll'}
              </span>
            </div>
          </div>
          <GCChatFrame />
        </section>

        {/* Batch RAG Section */}
        <section style={{ marginBottom: '3rem' }}>
          <div
            style={{
              background: '#ffffff',
              padding: '1.5rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              border: '1px solid #e0e0e0',
            }}
          >
            <h2 style={{ margin: '0 0 0.75rem 0', color: '#26374a', fontSize: '1.8rem', fontWeight: 700 }}>
              📊 {lang === 'fr' ? 'Tableau de bord de traitement RAG par lots' : 'Batch RAG Processing Dashboard'}
            </h2>
            <p style={{ margin: 0, color: '#605e5c', fontSize: '1rem', lineHeight: 1.6 }}>
              {lang === 'fr'
                ? 'Pipeline d\'ingestion de documents en temps réel avec vectorisation, traitement par lots et suivi de progression. Cliquez sur "Actualiser" pour voir les données dynamiques en action.'
                : 'Real-time document ingestion pipeline with vectorization, batch processing, and progress tracking. Click "Refresh Data" to see dynamic data in action.'}
            </p>
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                background: '#f5f5f5',
                borderRadius: '4px',
                borderLeft: '4px solid #278400',
              }}
            >
              <span style={{ fontSize: '0.9rem', color: '#605e5c' }}>
                <strong style={{ color: '#278400' }}>
                  {lang === 'fr' ? 'Fonctionnalités:' : 'Features:'}
                </strong>{' '}
                {lang === 'fr'
                  ? 'Actualisation dynamique des données • Statistiques en temps réel • État des lots • Indicateurs de progression'
                  : 'Dynamic data refresh • Real-time statistics • Batch status • Progress indicators'}
              </span>
            </div>
          </div>
          <BatchRAGDemo />
        </section>

        {/* Design System Info */}
        <section
          style={{
            background: '#ffffff',
            padding: '2rem',
            borderRadius: '8px',
            border: '2px solid #0535d2',
          }}
        >
          <h2 style={{ margin: '0 0 1.5rem 0', color: '#0535d2', fontSize: '1.8rem', fontWeight: 700 }}>
            🎨 {lang === 'fr' ? 'À propos du système de conception' : 'About the Design System'}
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div
              style={{
                padding: '1.5rem',
                background: '#f5f5f5',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎨</div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#26374a', fontSize: '1.2rem', fontWeight: 600 }}>
                {lang === 'fr' ? 'Couleurs du PCIM' : 'FIP Colors'}
              </h3>
              <p style={{ margin: 0, color: '#605e5c', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {lang === 'fr'
                  ? 'Rouge #eb2d37, Bleu #0535d2, Bleu foncé #26374a, Jaune #ffbf47. Rapports de contraste WCAG conformes.'
                  : 'Red #eb2d37, Blue #0535d2, Dark Blue #26374a, Yellow #ffbf47. WCAG compliant contrast ratios.'}
              </p>
            </div>

            <div
              style={{
                padding: '1.5rem',
                background: '#f5f5f5',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📝</div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#26374a', fontSize: '1.2rem', fontWeight: 600 }}>
                {lang === 'fr' ? 'Typographie' : 'Typography'}
              </h3>
              <p style={{ margin: 0, color: '#605e5c', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {lang === 'fr'
                  ? 'Titres Lato, corps Noto Sans. Tailles réactives 41px/37px (h1), 20px/18px (corps).'
                  : 'Lato headings, Noto Sans body. Responsive sizes 41px/37px (h1), 20px/18px (body).'}
              </p>
            </div>

            <div
              style={{
                padding: '1.5rem',
                background: '#f5f5f5',
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>♿</div>
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#26374a', fontSize: '1.2rem', fontWeight: 600 }}>
                {lang === 'fr' ? 'Accessibilité' : 'Accessibility'}
              </h3>
              <p style={{ margin: 0, color: '#605e5c', fontSize: '0.9rem', lineHeight: 1.6 }}>
                {lang === 'fr'
                  ? 'Rôles ARIA, régions en direct, navigation au clavier, lecteurs d\'écran. WCAG 2.1 AA vérifié.'
                  : 'ARIA roles, live regions, keyboard navigation, screen readers. WCAG 2.1 AA verified.'}
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: '#d7faff',
              borderRadius: '8px',
              border: '2px solid #269abc',
            }}
          >
            <h4 style={{ margin: '0 0 0.75rem 0', color: '#26374a', fontSize: '1.1rem', fontWeight: 600 }}>
              📦 {lang === 'fr' ? 'Bibliothèque disponible' : 'Available as Library'}
            </h4>
            <p style={{ margin: '0 0 1rem 0', color: '#605e5c', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {lang === 'fr'
                ? 'Tous ces composants sont disponibles dans le package @eva/gc-look-n-feel. Installation facile via NPM pour d\'autres ministères et agences du GC.'
                : 'All these components are available in the @eva/gc-look-n-feel package. Easy installation via NPM for other GC departments and agencies.'}
            </p>
            <code
              style={{
                display: 'block',
                padding: '0.75rem 1rem',
                background: '#26374a',
                color: '#50e6ff',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
              }}
            >
              npm install @eva/gc-look-n-feel
            </code>
          </div>
        </section>

        {/* Footer */}
        <div
          style={{
            marginTop: '3rem',
            padding: '1.5rem',
            textAlign: 'center',
            color: '#605e5c',
            fontSize: '0.9rem',
          }}
        >
          <p>
            {lang === 'fr'
              ? '🍁 Construit avec les normes du gouvernement du Canada • EVA Suite 2025'
              : '🍁 Built with Government of Canada standards • EVA Suite 2025'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GCDemoPage;
