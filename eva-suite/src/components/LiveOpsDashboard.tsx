import React, { useState } from 'react';
import metricsData from '../data/liveops-demo.json';
import insightsData from '../data/liveops-ai-insights.json';

interface KPIs {
  total_sessions: number;
  error_rate_pct: number;
  p95_latency_ms: number;
  apim_cost_cad: number;
}

interface TimeSeriesEntry {
  hour_label: string;
  sessions: number;
  errors: number;
}

interface MetricsData {
  timeframe: string;
  updated_at: string;
  kpis: KPIs;
  timeseries: TimeSeriesEntry[];
}

interface Insight {
  viewpoint: string;
  label: string;
  summary: string;
  findings: string[];
  recommendations: string[];
}

interface InsightsData {
  insights: Insight[];
}

const LiveOpsDashboard: React.FC = () => {
  const metrics = metricsData as MetricsData;
  const insights = insightsData as InsightsData;
  
  const [selectedViewpoint, setSelectedViewpoint] = useState('overview');
  
  const currentInsight = insights.insights.find(
    (i) => i.viewpoint === selectedViewpoint
  ) || insights.insights[0];

  const maxSessions = Math.max(...metrics.timeseries.map(t => t.sessions));

  const formatTimestamp = (iso: string) => {
    const date = new Date(iso);
    return date.toLocaleString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div style={{
      background: '#ffffff',
      padding: '2rem',
      borderRadius: '8px',
      color: '#26374a',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      {/* Header - GC Styled */}
      <div style={{
        marginBottom: '2rem',
        paddingBottom: '1rem',
        borderBottom: '3px solid #0535d2'
      }}>
        <h2 style={{
          fontSize: '1.8rem',
          marginBottom: '0.5rem',
          color: '#26374a',
          fontWeight: 700,
          fontFamily: "'Lato', sans-serif",
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span style={{ fontSize: '2rem' }}>📊</span>
          EVA LiveOps Dashboard
        </h2>
        <p style={{
          color: '#605e5c',
          fontSize: '0.9rem',
          margin: 0
        }}>
          Timeframe: {metrics.timeframe.replace('_', ' ')} • 
          Last updated: {formatTimestamp(metrics.updated_at)}
        </p>
      </div>

      {/* KPI Tiles - GC Styled */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: '#d7faff',
          border: '2px solid #0535d2',
          borderLeft: '4px solid #0535d2',
          padding: '1.5rem',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: '#605e5c',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            Total Sessions
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#0535d2',
            fontFamily: "'Lato', sans-serif"
          }}>
            {metrics.kpis.total_sessions.toLocaleString()}
          </div>
        </div>

        <div style={{
          background: '#d8eeca',
          border: '2px solid #278400',
          borderLeft: '4px solid #278400',
          padding: '1.5rem',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: '#605e5c',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            Error Rate
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#278400',
            fontFamily: "'Lato', sans-serif"
          }}>
            {metrics.kpis.error_rate_pct}%
          </div>
        </div>

        <div style={{
          background: '#f9f4d4',
          border: '2px solid #ffbf47',
          borderLeft: '4px solid #ffbf47',
          padding: '1.5rem',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: '#605e5c',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            p95 Latency
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#ee7100',
            fontFamily: "'Lato', sans-serif"
          }}>
            {metrics.kpis.p95_latency_ms}ms
          </div>
        </div>

        <div style={{
          background: '#f9d8d6',
          border: '2px solid #d3080c',
          borderLeft: '4px solid #d3080c',
          padding: '1.5rem',
          borderRadius: '8px'
        }}>
          <div style={{
            fontSize: '0.85rem',
            color: '#605e5c',
            marginBottom: '0.5rem',
            textTransform: 'uppercase',
            fontWeight: 600,
            letterSpacing: '0.5px'
          }}>
            APIM Cost (24h)
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: '#d3080c',
            fontFamily: "'Lato', sans-serif"
          }}>
            ${metrics.kpis.apim_cost_cad.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Sessions Chart - GC Styled */}
      <div style={{
        background: '#f5f5f5',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        marginBottom: '2rem'
      }}>
        <h3 style={{
          fontSize: '1.2rem',
          marginBottom: '1rem',
          color: '#26374a',
          fontWeight: 600,
          fontFamily: "'Lato', sans-serif"
        }}>
          Sessions by Hour
        </h3>
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'flex-end', 
            gap: '0.5rem',
            height: '150px'
          }}
          role="img"
          aria-label="Bar chart showing sessions per hour over the last 24 hours"
        >
          {metrics.timeseries.map((entry, idx) => {
            const heightPercent = (entry.sessions / maxSessions) * 100;
            return (
              <div 
                key={idx}
                style={{ 
                  flex: 1, 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  height: '100%'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: `${heightPercent}%`,
                    background: 'linear-gradient(180deg, #0535d2, #26374a)',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  title={`${entry.hour_label}: ${entry.sessions} sessions, ${entry.errors} errors`}
                >
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '0.7rem',
                    color: '#605e5c',
                    fontWeight: 600,
                    whiteSpace: 'nowrap'
                  }}>
                    {entry.sessions}
                  </div>
                </div>
                <div style={{ 
                  fontSize: '0.7rem', 
                  color: '#605e5c',
                  marginTop: '0.5rem',
                  transform: 'rotate(-45deg)',
                  transformOrigin: 'center',
                  whiteSpace: 'nowrap'
                }}>
                  {entry.hour_label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EVA LiveOps Copilot Panel - GC Styled */}
      <div style={{
        background: '#ffffff',
        border: '2px solid #ffbf47',
        borderLeft: '4px solid #ffbf47',
        padding: '1.5rem',
        borderRadius: '8px'
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          marginBottom: '1rem',
          color: '#ee7100',
          fontWeight: 700,
          fontFamily: "'Lato', sans-serif",
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <span>🤖</span> EVA LiveOps Copilot
        </h3>

        {/* Viewpoint Selector */}
        <div 
          style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
          }}
          role="tablist"
          aria-label="Select AI viewpoint"
        >
          {insights.insights.map((insight) => (
            <button
              key={insight.viewpoint}
              onClick={() => setSelectedViewpoint(insight.viewpoint)}
              role="tab"
              aria-selected={selectedViewpoint === insight.viewpoint}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '4px',
                border: selectedViewpoint === insight.viewpoint 
                  ? '2px solid #ffbf47'
                  : '1px solid #e0e0e0',
                background: selectedViewpoint === insight.viewpoint 
                  ? '#ffbf47' 
                  : '#ffffff',
                color: selectedViewpoint === insight.viewpoint 
                  ? '#26374a' 
                  : '#605e5c',
                fontWeight: selectedViewpoint === insight.viewpoint 
                  ? 700 
                  : 500,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '0.9rem'
              }}
            >
              {insight.label}
            </button>
          ))}
        </div>

        {/* Insight Content */}
        <div role="tabpanel" aria-labelledby={`${selectedViewpoint}-tab`}>
          <div style={{
            background: '#f9f4d4',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #ffbf47',
            borderLeft: '4px solid #ee7100'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#26374a',
              fontWeight: 600,
              fontFamily: "'Lato', sans-serif"
            }}>
              Summary
            </h4>
            <p style={{ lineHeight: 1.6, color: '#26374a', margin: 0 }}>
              {currentInsight.summary}
            </p>
          </div>

          <div style={{
            background: '#f5f5f5',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            border: '1px solid #e0e0e0'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#26374a',
              fontWeight: 600,
              fontFamily: "'Lato', sans-serif"
            }}>
              Findings
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 1.8 }}>
              {currentInsight.findings.map((finding, idx) => (
                <li key={idx} style={{ color: '#605e5c', marginBottom: '0.5rem' }}>
                  {finding}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: '#d8eeca',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #278400',
            borderLeft: '4px solid #278400'
          }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#26374a',
              fontWeight: 600,
              fontFamily: "'Lato', sans-serif"
            }}>
              Recommendations
            </h4>
            <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: 1.8 }}>
              {currentInsight.recommendations.map((rec, idx) => (
                <li key={idx} style={{ color: '#26374a', marginBottom: '0.5rem', fontWeight: 500 }}>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveOpsDashboard;
