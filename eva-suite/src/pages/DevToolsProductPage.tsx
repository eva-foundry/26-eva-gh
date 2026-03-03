import React from 'react';
import { useI18n } from '../i18n/i18n';
import AuditTrailDashboard from '../components/AuditTrailDashboard';

const DevToolsProductPage: React.FC = () => {
    const { t } = useI18n();

    return (
        <div className="container">
            {/* Hero Section */}
            <section className="card" style={{ marginBottom: '2rem', background: '#ffffff', borderLeft: '4px solid #284162' }}>
                <div style={{ textAlign: 'left', padding: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#284162', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                        ⚙️ {t('devtools.hero.title')}
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#555555', maxWidth: '800px', marginBottom: '1rem', lineHeight: 1.6 }}>
                        {t('devtools.hero.subtitle')}
                    </p>
                    <p style={{ fontSize: '1rem', color: '#605e5c', maxWidth: '700px', lineHeight: 1.6 }}>
                        {t('devtools.hero.description')}
                    </p>
                </div>
            </section>

            {/* Highlight Cards */}
            <section style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    <div className="card" style={{ padding: '1.5rem', background: '#ffffff', borderLeft: '4px solid #284162' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔎</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#284162', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>{t('devtools.highlights.audit.title')}</h3>
                        <p style={{ color: '#605e5c', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('devtools.highlights.audit.description')}</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', background: '#ffffff', borderLeft: '4px solid #278400' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>⚙️</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#284162', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>{t('devtools.highlights.automate.title')}</h3>
                        <p style={{ color: '#605e5c', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('devtools.highlights.automate.description')}</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', background: '#ffffff', borderLeft: '4px solid #af3c43' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💸</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#284162', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>{t('devtools.highlights.measure.title')}</h3>
                        <p style={{ color: '#605e5c', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('devtools.highlights.measure.description')}</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', background: '#ffffff', borderLeft: '4px solid #284162' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📊</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#284162', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>{t('devtools.highlights.liveops.title')}</h3>
                        <p style={{ color: '#605e5c', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('devtools.highlights.liveops.description')}</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', background: '#ffffff', borderLeft: '4px solid #278400' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🔄</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#284162', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>{t('devtools.highlights.multirepo.title')}</h3>
                        <p style={{ color: '#605e5c', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('devtools.highlights.multirepo.description')}</p>
                    </div>
                    <div className="card" style={{ padding: '1.5rem', background: '#ffffff', borderLeft: '4px solid #af3c43' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🧪</div>
                        <h3 style={{ marginBottom: '0.75rem', color: '#284162', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>{t('devtools.highlights.experiments.title')}</h3>
                        <p style={{ color: '#605e5c', fontSize: '0.95rem', lineHeight: 1.6 }}>{t('devtools.highlights.experiments.description')}</p>
                    </div>
                </div>
            </section>

            {/* EVA Audit Trail Section */}
            <section className="card" style={{ marginBottom: '2rem', background: '#ffffff', borderLeft: '4px solid #284162' }}>
                <h2 style={{ color: '#284162', marginBottom: '1rem', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                    📋 {t('devtools.auditTrail.title')}
                </h2>
                <p style={{ color: '#605e5c', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {t('devtools.auditTrail.description')}
                </p>
                <div style={{ background: 'rgba(40, 65, 98, 0.05)', padding: '1.5rem', borderRadius: '4px', marginBottom: '1.5rem', border: '1px solid #dee2e6' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#284162', fontWeight: 600 }}>
                        {t('devtools.auditTrail.features.title')}
                    </h3>
                    <ul style={{ color: '#605e5c', lineHeight: '1.8' }}>
                        <li><strong>{t('devtools.auditTrail.features.jsonl')}</strong> – {t('devtools.auditTrail.features.jsonlDesc')}</li>
                        <li><strong>{t('devtools.auditTrail.features.map')}</strong> – {t('devtools.auditTrail.features.mapDesc')}</li>
                        <li><strong>{t('devtools.auditTrail.features.queries')}</strong> – {t('devtools.auditTrail.features.queriesDesc')}</li>
                        <li><strong>{t('devtools.auditTrail.features.sessions')}</strong> – {t('devtools.auditTrail.features.sessionsDesc')}</li>
                    </ul>
                </div>

                {/* Live Dashboard */}
                <h3 style={{ marginBottom: '1rem', color: '#284162', fontWeight: 600 }}>{t('devtools.auditTrail.liveDashboard')}</h3>
                <AuditTrailDashboard />
            </section>

            {/* P02 Requirements Engine & Power BI Analytics */}
            <section className="card" style={{ marginBottom: '2rem', background: '#ffffff', borderLeft: '4px solid #af3c43' }}>
                <h2 style={{ color: '#284162', marginBottom: '1rem', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                    🤖 {t('devtools.p02.title')}
                </h2>
                <p style={{ color: '#605e5c', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {t('devtools.p02.description')}
                </p>

                {/* Power BI Integration Callout */}
                <div style={{
                    background: 'rgba(40, 65, 98, 0.05)',
                    border: '2px solid #284162',
                    padding: '1.5rem',
                    borderRadius: '4px',
                    marginBottom: '1.5rem'
                }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#284162', fontWeight: 600 }}>
                        📊 {t('devtools.p02.powerbi.title')}
                    </h3>
                    <p style={{ color: '#605e5c', marginBottom: '1rem', lineHeight: 1.6 }}>
                        {t('devtools.p02.powerbi.description')}
                    </p>
                    <div style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #dee2e6' }}>
                        <code style={{ color: '#278400', fontSize: '0.9rem' }}>
                            .\scripts\p02-usage-report.ps1 -AsCsv
                        </code>
                    </div>
                    <p style={{ color: '#605e5c', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                        <strong>{t('devtools.p02.powerbi.output')}</strong> docs\_audit\P02-Usage-Report.csv
                    </p>
                    <p style={{ color: '#605e5c', fontSize: '0.9rem' }}>
                        <strong>{t('devtools.p02.powerbi.columns')}</strong> {t('devtools.p02.powerbi.columnsDesc')}
                    </p>

                    <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #dee2e6' }}>
                        <p style={{ color: '#605e5c', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                            <strong>{t('devtools.p02.powerbi.separation.title')}</strong>
                        </p>
                        <ul style={{ color: '#605e5c', fontSize: '0.85rem', lineHeight: '1.6', marginLeft: '1.5rem' }}>
                            <li>{t('devtools.p02.powerbi.separation.devtools')}</li>
                            <li>{t('devtools.p02.powerbi.separation.liveops')}</li>
                        </ul>
                    </div>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#284162', fontWeight: 600 }}>
                    {t('devtools.p02.capabilities.title')}
                </h3>
                <ul style={{ color: '#605e5c', lineHeight: '1.8' }}>
                    <li>{t('devtools.p02.capabilities.usage')}</li>
                    <li>{t('devtools.p02.capabilities.breakdown')}</li>
                    <li>{t('devtools.p02.capabilities.filters')}</li>
                    <li>{t('devtools.p02.capabilities.export')}</li>
                </ul>
            </section>

            {/* FinOps Integration */}
            <section className="card" style={{ marginBottom: '2rem', background: '#ffffff', borderLeft: '4px solid #278400' }}>
                <h2 style={{ color: '#284162', marginBottom: '1rem', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                    💰 {t('devtools.finops.title')}
                </h2>
                <p style={{ color: '#605e5c', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {t('devtools.finops.description')}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(40, 65, 98, 0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                        <h4 style={{ color: '#284162', marginBottom: '0.5rem', fontWeight: 600 }}>{t('devtools.finops.metrics.perFile')}</h4>
                        <p style={{ color: '#605e5c', fontSize: '0.9rem', lineHeight: 1.6 }}>{t('devtools.finops.metrics.perFileDesc')}</p>
                    </div>
                    <div style={{ background: 'rgba(40, 65, 98, 0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                        <h4 style={{ color: '#284162', marginBottom: '0.5rem', fontWeight: 600 }}>{t('devtools.finops.metrics.perFeature')}</h4>
                        <p style={{ color: '#605e5c', fontSize: '0.9rem', lineHeight: 1.6 }}>{t('devtools.finops.metrics.perFeatureDesc')}</p>
                    </div>
                    <div style={{ background: 'rgba(40, 65, 98, 0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                        <h4 style={{ color: '#284162', marginBottom: '0.5rem', fontWeight: 600 }}>{t('devtools.finops.metrics.perSprint')}</h4>
                        <p style={{ color: '#605e5c', fontSize: '0.9rem', lineHeight: 1.6 }}>{t('devtools.finops.metrics.perSprintDesc')}</p>
                    </div>
                </div>
            </section>

            {/* LiveOps Dashboards */}
            <section className="card" style={{ marginBottom: '2rem', background: '#ffffff', borderLeft: '4px solid #284162' }}>
                <h2 style={{ color: '#284162', marginBottom: '1rem', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                    📊 {t('devtools.liveops.title')}
                </h2>
                <p style={{ color: '#605e5c', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {t('devtools.liveops.description')}
                </p>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#284162', fontWeight: 600 }}>
                    {t('devtools.liveops.dashboards.title')}
                </h3>
                <ul style={{ color: '#605e5c', lineHeight: '1.8' }}>
                    <li><strong>{t('devtools.liveops.dashboards.activity')}</strong> – {t('devtools.liveops.dashboards.activityDesc')}</li>
                    <li><strong>{t('devtools.liveops.dashboards.hotspots')}</strong> – {t('devtools.liveops.dashboards.hotspotsDesc')}</li>
                    <li><strong>{t('devtools.liveops.dashboards.velocity')}</strong> – {t('devtools.liveops.dashboards.velocityDesc')}</li>
                    <li><strong>{t('devtools.liveops.dashboards.sessions')}</strong> – {t('devtools.liveops.dashboards.sessionsDesc')}</li>
                </ul>
            </section>

            {/* Multi-Repo Pattern */}
            <section className="card" style={{ marginBottom: '2rem', background: '#ffffff', borderLeft: '4px solid #278400' }}>
                <h2 style={{ color: '#284162', marginBottom: '1rem', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                    🔄 {t('devtools.multirepo.title')}
                </h2>
                <p style={{ color: '#605e5c', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {t('devtools.multirepo.description')}
                </p>
                <div style={{ background: 'rgba(40, 65, 98, 0.05)', padding: '1.5rem', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#284162', fontWeight: 600 }}>
                        {t('devtools.multirepo.bootstrap.title')}
                    </h3>
                    <ol style={{ color: '#605e5c', lineHeight: '1.8' }}>
                        <li>{t('devtools.multirepo.bootstrap.step1')}</li>
                        <li>{t('devtools.multirepo.bootstrap.step2')}</li>
                        <li>{t('devtools.multirepo.bootstrap.step3')}</li>
                        <li>{t('devtools.multirepo.bootstrap.step4')}</li>
                        <li>{t('devtools.multirepo.bootstrap.step5')}</li>
                    </ol>
                </div>
            </section>

            {/* GitHub Actions Automation */}
            <section className="card" style={{ marginBottom: '2rem', background: '#ffffff', borderLeft: '4px solid #af3c43' }}>
                <h2 style={{ color: '#284162', marginBottom: '1rem', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                    🤖 {t('devtools.automation.title')}
                </h2>
                <p style={{ color: '#605e5c', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                    {t('devtools.automation.description')}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                    <div style={{ background: 'rgba(40, 65, 98, 0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🌙</div>
                        <h4 style={{ color: '#284162', marginBottom: '0.5rem', fontWeight: 600 }}>{t('devtools.automation.triggers.nightly')}</h4>
                        <p style={{ color: '#605e5c', fontSize: '0.85rem', lineHeight: 1.6 }}>{t('devtools.automation.triggers.nightlyDesc')}</p>
                    </div>
                    <div style={{ background: 'rgba(40, 65, 98, 0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📝</div>
                        <h4 style={{ color: '#284162', marginBottom: '0.5rem', fontWeight: 600 }}>{t('devtools.automation.triggers.push')}</h4>
                        <p style={{ color: '#605e5c', fontSize: '0.85rem', lineHeight: 1.6 }}>{t('devtools.automation.triggers.pushDesc')}</p>
                    </div>
                    <div style={{ background: 'rgba(40, 65, 98, 0.05)', padding: '1rem', borderRadius: '4px', border: '1px solid #dee2e6' }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🎯</div>
                        <h4 style={{ color: '#284162', marginBottom: '0.5rem', fontWeight: 600 }}>{t('devtools.automation.triggers.manual')}</h4>
                        <p style={{ color: '#605e5c', fontSize: '0.85rem', lineHeight: 1.6 }}>{t('devtools.automation.triggers.manualDesc')}</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="card" style={{ textAlign: 'center', padding: '3rem 2rem', background: '#ffffff', borderTop: '4px solid #af3c43' }}>
                <h2 style={{ color: '#284162', marginBottom: '1rem', fontSize: '1.8rem', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
                    {t('devtools.cta.title')}
                </h2>
                <p style={{ color: '#555555', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
                    {t('devtools.cta.subtitle')}
                </p>
                <p style={{ color: '#605e5c', fontSize: '0.95rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                    {t('devtools.cta.description')}
                </p>
            </section>
        </div>
    );
};

export default DevToolsProductPage;
