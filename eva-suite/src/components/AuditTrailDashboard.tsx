import React, { useState, useEffect } from 'react';

/**
 * EVA Audit Trail - Public LiveOps Dashboard
 * 
 * Demonstrates real-time operational transparency for EVA Suite.
 * Shows file change activity, features in development, hotspots, and workload index.
 * 
 * For IT shops & research labs evaluating EVA Suite as their DevTools platform.
 * 
 * Data flow:
 *   EVA Audit Trail → EVA-Audit-Log.jsonl → eva-audit-public-dashboard.ps1 
 *     → EVA-Audit-Public-Widgets.md → This component
 * 
 * Future: Replace static data with real-time API calls to audit endpoint
 */

interface TopFile {
    path: string;
    changes: number;
}

interface Feature {
    name: string;
    fileCount: number;
}

interface AuditWidgets {
    lastUpdated: string;
    totalEvents: number;
    filesChanged24h: number;
    topFiles24h: TopFile[];
    featuresTouched24h: number;
    features24h: Feature[];
    hotspots7d: TopFile[];
    workloadIndex: number;
    workloadStatus: string;
}

// Sample data for demonstration (replace with API call in production)
const sampleData: AuditWidgets = {
    lastUpdated: new Date().toISOString(),
    totalEvents: 6351,
    filesChanged24h: 47,
    topFiles24h: [
        { path: 'docs/features/eva-audit-trail/tests.md', changes: 3 },
        { path: 'scripts/eva-audit-public-dashboard.ps1', changes: 2 },
        { path: 'docs/features/eva-audit-trail/README.md', changes: 2 },
        { path: '.github/workflows/eva-audit-update.yml', changes: 1 },
        { path: 'scripts/eva-audit-session-gaps.ps1', changes: 1 }
    ],
    featuresTouched24h: 2,
    features24h: [
        { name: 'eva-audit-trail', fileCount: 8 },
        { name: 'eva-finops', fileCount: 3 }
    ],
    hotspots7d: [
        { path: 'scripts/eva-audit-update.ps1', changes: 12 },
        { path: 'docs/features/eva-audit-trail/backlog.md', changes: 8 },
        { path: 'docs/features/eva-audit-trail/tests.md', changes: 6 },
        { path: 'scripts/eva-audit-query.ps1', changes: 4 },
        { path: 'docs/_audit/EVA-Audit-Log.jsonl', changes: 3 }
    ],
    workloadIndex: 0.5,
    workloadStatus: '🟡 Normal'
};

const AuditTrailDashboard: React.FC = () => {
    const [data, setData] = useState<AuditWidgets>(sampleData);

    // Future: Fetch real data from API
    useEffect(() => {
        // TODO: Replace with actual API call
        // fetch('/api/audit-widgets').then(res => res.json()).then(setData);
        setData(sampleData);
    }, []);

    const formatTimestamp = (iso: string) => {
        const date = new Date(iso);
        return date.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const maxHotspotChanges = data.hotspots7d[0]?.changes || 1;

    return (
        <div style={{
            background: 'linear-gradient(135deg, #0f1419 0%, #1a2332 100%)',
            padding: '2rem',
            borderRadius: '12px',
            color: '#fff',
            border: '1px solid rgba(100, 149, 237, 0.2)'
        }}>
            {/* Header */}
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#6495ed' }}>
                    📊 EVA Audit Trail LiveOps
                </h2>
                <p style={{ color: '#aaa', fontSize: '0.9rem' }}>
                    Real-time repository activity tracking • Last updated: {formatTimestamp(data.lastUpdated)}
                </p>
                <p style={{ color: '#888', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                    Total events tracked: {data.totalEvents.toLocaleString()}
                </p>
            </div>

            {/* Widget Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2rem'
            }}>
                {/* Widget A: Files Changed (24h) */}
                <div style={{
                    background: 'rgba(100, 149, 237, 0.1)',
                    border: '1px solid rgba(100, 149, 237, 0.3)',
                    padding: '1.5rem',
                    borderRadius: '8px'
                }}>
                    <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
                        Files Changed (24h)
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#6495ed', marginBottom: '1rem' }}>
                        {data.filesChanged24h}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '0.75rem' }}>
                        <strong>Top 5 Most Active:</strong>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#ddd' }}>
                        {data.topFiles24h.length > 0 ? (
                            data.topFiles24h.map((file, idx) => (
                                <div key={idx} style={{ marginBottom: '0.4rem', paddingLeft: '0.5rem' }}>
                                    <span style={{ color: '#6495ed' }}>•</span> {file.path.split('/').slice(-2).join('/')}
                                    <span style={{ color: '#888' }}> ({file.changes}x)</span>
                                </div>
                            ))
                        ) : (
                            <div style={{ color: '#888' }}>No changes in last 24h</div>
                        )}
                    </div>
                </div>

                {/* Widget B: Features Detected */}
                <div style={{
                    background: 'rgba(76, 175, 80, 0.1)',
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    padding: '1.5rem',
                    borderRadius: '8px'
                }}>
                    <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
                        Features in Development (24h)
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4caf50', marginBottom: '1rem' }}>
                        {data.featuresTouched24h}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#ccc', marginBottom: '0.75rem' }}>
                        <strong>Features Touched:</strong>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#ddd' }}>
                        {data.features24h.length > 0 ? (
                            data.features24h.map((feature, idx) => (
                                <div key={idx} style={{ marginBottom: '0.4rem', paddingLeft: '0.5rem' }}>
                                    <span style={{ color: '#4caf50' }}>•</span> {feature.name}
                                    <span style={{ color: '#888' }}> ({feature.fileCount} files)</span>
                                </div>
                            ))
                        ) : (
                            <div style={{ color: '#888' }}>No feature changes detected</div>
                        )}
                    </div>
                </div>

                {/* Widget D: Workload Index */}
                <div style={{
                    background: 'rgba(255, 193, 7, 0.1)',
                    border: '1px solid rgba(255, 193, 7, 0.3)',
                    padding: '1.5rem',
                    borderRadius: '8px'
                }}>
                    <div style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '0.5rem' }}>
                        Autonomous Workload Index
                    </div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffc107', marginBottom: '1rem' }}>
                        {data.workloadIndex}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#ddd' }}>
                        <strong>Status:</strong> {data.workloadStatus}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#aaa', marginTop: '0.75rem' }}>
                        Measures repository activity intensity. Calculated as (file changes in 24h) / 100.
                    </div>
                </div>
            </div>

            {/* Widget C: Hotspots (Full Width) */}
            <div style={{
                background: 'rgba(220, 53, 69, 0.1)',
                border: '1px solid rgba(220, 53, 69, 0.3)',
                padding: '1.5rem',
                borderRadius: '8px'
            }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#dc3545' }}>
                    🔥 Hotspots (Last 7 Days)
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#aaa', marginBottom: '1rem' }}>
                    Top 5 files by change frequency
                </p>

                {data.hotspots7d.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {data.hotspots7d.map((hotspot, idx) => {
                            const barPercent = (hotspot.changes / maxHotspotChanges) * 100;
                            return (
                                <div key={idx}>
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.3rem',
                                        fontSize: '0.85rem',
                                        color: '#ddd'
                                    }}>
                                        <span style={{ fontFamily: 'monospace' }}>
                                            {hotspot.path.split('/').slice(-2).join('/')}
                                        </span>
                                        <span style={{ color: '#dc3545', fontWeight: 'bold' }}>
                                            {hotspot.changes} changes
                                        </span>
                                    </div>
                                    <div style={{
                                        width: '100%',
                                        height: '8px',
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '4px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${barPercent}%`,
                                            height: '100%',
                                            background: 'linear-gradient(90deg, #dc3545, #ff6b7a)',
                                            transition: 'width 0.5s ease'
                                        }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div style={{ color: '#888', textAlign: 'center', padding: '2rem' }}>
                        No changes in last 7 days
                    </div>
                )}
            </div>

            {/* Footer - Integration Notes */}
            <div style={{
                marginTop: '2rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '6px',
                fontSize: '0.8rem',
                color: '#888'
            }}>
                <p style={{ marginBottom: '0.5rem' }}>
                    <strong style={{ color: '#aaa' }}>For IT shops & research labs:</strong>
                </p>
                <p style={{ marginBottom: '0' }}>
                    This dashboard demonstrates operational transparency for autonomous AI platforms.
                    Adapt this pattern to track your own repository activity, deployments, and feature velocity.
                    Data source: <code style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 6px', borderRadius: '3px' }}>
                        EVA-Audit-Log.jsonl
                    </code>
                </p>
            </div>
        </div>
    );
};

export default AuditTrailDashboard;
