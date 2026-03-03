import React, { useMemo, useState } from 'react';
import { useI18n } from '../i18n/i18n';

const cardIds = ['copilot', 'imagination', 'evaAtGoC'] as const;
type CardId = typeof cardIds[number];

type VoiceLocale = 'en' | 'fr';

const InfoAssistantDemo: React.FC = () => {
  const { t } = useI18n();
  const [activeCard, setActiveCard] = useState<CardId>('copilot');
  const [voiceLocale, setVoiceLocale] = useState<VoiceLocale>('en');

  const cards = useMemo(
    () => ([
      {
        id: 'copilot' as const,
        emoji: '⚡',
        title: t('home.cards.copilotLove.title'),
        summary: t('home.cards.copilotLove.summary'),
        details: t('infoAssistant.cards.copilot.details'),
      },
      {
        id: 'imagination' as const,
        emoji: '🎨',
        title: t('home.cards.imaginationOverKnowledge.title'),
        summary: t('home.cards.imaginationOverKnowledge.summary'),
        details: t('infoAssistant.cards.imagination.details'),
      },
      {
        id: 'evaAtGoC' as const,
        emoji: '🏛️',
        title: t('home.cards.evaAtGoC.title'),
        summary: t('home.cards.evaAtGoC.summary'),
        details: t('infoAssistant.cards.evaAtGoC.details'),
      },
    ]),
    [t]
  );

  const activeDetails = cards.find((card) => card.id === activeCard)?.details;

  const voiceSamples: Record<VoiceLocale, { prompt: string; response: string }> = {
    en: {
      prompt: t('infoAssistant.voice.sample.en.prompt'),
      response: t('infoAssistant.voice.sample.en.response'),
    },
    fr: {
      prompt: t('infoAssistant.voice.sample.fr.prompt'),
      response: t('infoAssistant.voice.sample.fr.response'),
    },
  };

  const editorRows = useMemo(
    () => ([
      {
        id: 'hero',
        label: t('infoAssistant.editor.rows.hero.label'),
        value: t('infoAssistant.editor.rows.hero.value'),
      },
      {
        id: 'copilotCard',
        label: t('infoAssistant.editor.rows.copilot.label'),
        value: t('home.cards.copilotLove.summary'),
      },
      {
        id: 'voiceHelper',
        label: t('infoAssistant.editor.rows.voice.label'),
        value: t('home.voice.helper'),
      },
    ]),
    [t]
  );

  const currentVoiceSample = voiceSamples[voiceLocale];

  return (
    <div
      className="info-assistant-demo"
      style={{
        background: 'linear-gradient(135deg, rgba(80, 230, 255, 0.08) 0%, rgba(74, 222, 128, 0.08) 100%)',
        borderRadius: '16px',
        padding: '2rem',
        border: '1px solid rgba(80, 230, 255, 0.2)',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: 0, color: '#50e6ff', fontSize: '1.8rem' }}>{t('infoAssistant.hero.heading')}</h2>
          <p style={{ margin: '0.5rem 0 0', color: '#d1d5db' }}>{t('infoAssistant.hero.subheading')}</p>
        </div>
        <span
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            background: 'rgba(34, 197, 94, 0.15)',
            color: '#22c55e',
            fontWeight: 600,
            marginLeft: 'auto',
          }}
        >
          {t('infoAssistant.hero.badge')}
        </span>
      </div>

      {/* Card explorer */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            {t('infoAssistant.cards.label')}
          </span>
          <div role="tablist" aria-label={t('infoAssistant.cards.label')} style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {cards.map((card) => (
              <button
                key={card.id}
                role="tab"
                type="button"
                aria-selected={activeCard === card.id}
                aria-controls={`info-card-panel-${card.id}`}
                className="info-card-tab"
                onClick={() => setActiveCard(card.id)}
                style={{
                  textAlign: 'left',
                  padding: '1rem',
                  borderRadius: '12px',
                  border: activeCard === card.id ? '2px solid rgba(80, 230, 255, 0.6)' : '1px solid rgba(255, 255, 255, 0.1)',
                  background: 'rgba(0, 0, 0, 0.3)',
                  color: '#e5e7eb',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{card.emoji}</div>
                <div style={{ fontWeight: 600 }}>{card.title}</div>
                <p style={{ margin: '0.25rem 0 0', color: '#a1a1aa', fontSize: '0.9rem' }}>{card.summary}</p>
              </button>
            ))}
          </div>
        </div>

        <div
          id={`info-card-panel-${activeCard}`}
          role="tabpanel"
          aria-live="polite"
          aria-label={t('infoAssistant.cards.detailsLabel')}
          style={{
            background: 'rgba(15, 23, 42, 0.65)',
            borderRadius: '12px',
            padding: '1.25rem',
            border: '1px solid rgba(80, 230, 255, 0.15)',
            minHeight: '220px',
          }}
        >
          <p style={{ color: '#f9fafb', fontSize: '1rem', lineHeight: 1.6 }}>{activeDetails}</p>
        </div>
      </div>

      {/* Voice preview */}
      <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <section style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(80, 230, 255, 0.2)', background: 'rgba(2, 6, 23, 0.7)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ margin: 0, color: '#50e6ff' }}>{t('home.voice.caption')}</h3>
              <p style={{ margin: '0.25rem 0 0', color: '#9ca3af', fontSize: '0.9rem' }}>{t('home.voice.helper')}</p>
            </div>
            <div role="group" aria-label={t('infoAssistant.voice.localeSwitcher')}>
              {(['en', 'fr'] as VoiceLocale[]).map((locale) => (
                <button
                  key={locale}
                  type="button"
                  onClick={() => setVoiceLocale(locale)}
                  aria-pressed={voiceLocale === locale}
                  style={{
                    marginLeft: locale === 'fr' ? '0.5rem' : 0,
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    border: voiceLocale === locale ? '2px solid #50e6ff' : '1px solid rgba(255,255,255,0.2)',
                    background: 'transparent',
                    color: '#f3f4f6',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {locale.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('infoAssistant.voice.promptLabel')}</p>
            <p style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)', color: '#e5e7eb' }}>
              {currentVoiceSample.prompt}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '1rem' }}>{t('infoAssistant.voice.responseLabel')}</p>
            <p
              style={{
                background: 'rgba(34, 197, 94, 0.1)',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                color: '#dcfce7',
                minHeight: '96px',
              }}
              aria-live="polite"
            >
              {currentVoiceSample.response}
            </p>
          </div>
        </section>

        <section style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(74, 222, 128, 0.2)', background: 'rgba(2, 6, 23, 0.7)' }}>
          <h3 style={{ margin: 0, color: '#4ade80' }}>{t('infoAssistant.editor.title')}</h3>
          <p style={{ margin: '0.25rem 0 1rem', color: '#94a3b8', fontSize: '0.9rem' }}>{t('infoAssistant.editor.description')}</p>
          <div role="table" aria-label={t('infoAssistant.editor.title')} style={{ display: 'grid', gap: '0.75rem' }}>
            {editorRows.map((row) => (
              <div
                role="row"
                key={row.id}
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  padding: '0.75rem',
                  background: 'rgba(15, 23, 42, 0.4)',
                }}
              >
                <div role="cell" style={{ fontSize: '0.75rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {row.label}
                </div>
                <div role="cell" style={{ color: '#f3f4f6', marginTop: '0.35rem' }}>{row.value}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#94a3b8' }}>{t('infoAssistant.disclaimer')}</p>
    </div>
  );
};

export default InfoAssistantDemo;
