import React from 'react';
import demoData from '../data/eva-accessibility-demo.json';

// TypeScript interfaces
interface ScanTarget {
  name: string;
  url: string;
  timestamp: string;
}

interface Summary {
  overall_grade: string;
  issues_count: number;
  warnings_count: number;
  passes_count: number;
}

interface Issue {
  id: string;
  wcag_ref: string;
  severity: string;
  area: string;
  description: string;
  suggested_fix: string;
  demo_only: boolean;
}

interface AccessibilityData {
  scan_target: ScanTarget;
  summary: Summary;
  issues: Issue[];
  quick_fixes: string[];
  disclaimer: string;
}

const EvaAccessibilityDemo: React.FC = () => {
  const data = demoData as AccessibilityData;

  const getSeverityColor = (severity: string): string => {
    const sev = severity.toLowerCase();
    if (sev === 'high' || sev === 'critical') return '#dc3545';
    if (sev === 'medium') return '#ffc107';
    if (sev === 'low') return '#17a2b8';
    return '#6c757d';
  };

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-CA', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '8px',
      padding: '2rem',
      color: '#26374a',
      maxWidth: '1000px',
      margin: '0 auto',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e0e0e0',
      borderBottom: '3px solid #0535d2'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', borderBottom: '3px solid #0535d2', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#26374a', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
            ♿ EVA Accessibility – AI WCAG Scanner
          </h2>
          <span style={{
            padding: '0.25rem 0.75rem',
            fontSize: '0.75rem',
            borderRadius: '4px',
            background: '#f9f4d4',
            border: '2px solid #ffbf47',
            color: '#26374a',
            fontWeight: 600
          }}>
            Demo · Mock data only
          </span>
        </div>
        <p style={{ color: '#605e5c', fontSize: '0.9rem', margin: 0 }}>
          AI-powered accessibility scanning with WCAG compliance insights
        </p>
      </div>

      {/* Scan Target Info */}
      <div style={{
        marginBottom: '2rem',
        padding: '1rem',
        background: '#d7faff',
        border: '2px solid #0535d2',
        borderLeft: '4px solid #0535d2',
        borderRadius: '4px'
      }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#0535d2', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
          Scan Target
        </h3>
        <p style={{ margin: '0.25rem 0', color: '#26374a', fontSize: '0.95rem' }}>
          <strong>Site:</strong> {data.scan_target.name}
        </p>
        <p style={{ margin: '0.25rem 0', color: '#605e5c', fontSize: '0.85rem' }}>
          <strong>URL:</strong> <a href={data.scan_target.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0535d2' }}>{data.scan_target.url}</a>
        </p>
        <p style={{ margin: '0.25rem 0', color: '#605e5c', fontSize: '0.85rem' }}>
          <strong>Scanned:</strong> {formatTimestamp(data.scan_target.timestamp)}
        </p>
      </div>

      {/* Summary Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          padding: '1rem',
          background: '#f9f4d4',
          borderRadius: '4px',
          border: '2px solid #ffbf47',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.5rem', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>Overall Grade</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ee7100', fontFamily: "'Lato', sans-serif" }}>
            {data.summary.overall_grade}
          </div>
        </div>
        <div style={{
          padding: '1rem',
          background: '#f9d8d6',
          borderRadius: '4px',
          border: '2px solid #eb2d37',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.5rem', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>Issues</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#d3080c', fontFamily: "'Lato', sans-serif" }}>
            {data.summary.issues_count}
          </div>
        </div>
        <div style={{
          padding: '1rem',
          background: '#f9f4d4',
          borderRadius: '4px',
          border: '2px solid #ffbf47',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.5rem', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>Warnings</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#ee7100', fontFamily: "'Lato', sans-serif" }}>
            {data.summary.warnings_count}
          </div>
        </div>
        <div style={{
          padding: '1rem',
          background: '#d8eeca',
          borderRadius: '4px',
          border: '2px solid #278400',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.5rem', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>Passes</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#278400', fontFamily: "'Lato', sans-serif" }}>
            {data.summary.passes_count}
          </div>
        </div>
      </div>

      {/* Issues List */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#26374a', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>
          🔍 Accessibility Issues
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {data.issues.map((issue) => (
            <div key={issue.id} style={{
              padding: '1.25rem',
              background: '#ffffff',
              borderRadius: '4px',
              border: `1px solid #e0e0e0`,
              borderLeft: `4px solid ${getSeverityColor(issue.severity)}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                <span style={{ 
                  fontSize: '0.85rem', 
                  fontWeight: 600, 
                  color: '#0535d2',
                  fontFamily: 'monospace'
                }}>
                  {issue.id}
                </span>
                <span style={{
                  padding: '0.25rem 0.75rem',
                  fontSize: '0.7rem',
                  borderRadius: '4px',
                  background: `${getSeverityColor(issue.severity)}15`,
                  border: `1px solid ${getSeverityColor(issue.severity)}`,
                  color: getSeverityColor(issue.severity),
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}>
                  {issue.severity}
                </span>
                <span style={{
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.7rem',
                  borderRadius: '4px',
                  background: '#f5f5f5',
                  color: '#605e5c',
                  fontWeight: 600
                }}>
                  WCAG {issue.wcag_ref}
                </span>
                <span style={{ color: '#605e5c', fontSize: '0.9rem', fontWeight: 600 }}>
                  {issue.area}
                </span>
              </div>
              <p style={{ margin: '0.5rem 0', color: '#26374a', fontSize: '0.95rem' }}>
                {issue.description}
              </p>
              <div style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                background: '#d7faff',
                borderRadius: '4px',
                borderLeft: '3px solid #0535d2'
              }}>
                <strong style={{ color: '#0535d2', fontSize: '0.85rem', fontFamily: "'Lato', sans-serif" }}>Suggested Fix:</strong>
                <span style={{ color: '#605e5c', fontSize: '0.9rem', marginLeft: '0.5rem' }}>
                  {issue.suggested_fix}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Accessibility Coach */}
      <div style={{
        background: '#d8eeca',
        border: '2px solid #278400',
        borderLeft: '4px solid #278400',
        borderRadius: '4px',
        padding: '1.5rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: '#278400', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
            🧠 AI Accessibility Coach
          </h3>
          <p style={{ color: '#605e5c', fontSize: '0.85rem', margin: 0 }}>
            Static EVA Accessibility demo
          </p>
        </div>

        {/* Quick Fixes */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{
            fontSize: '1rem',
            marginBottom: '0.75rem',
            color: '#26374a',
            fontWeight: 600,
            fontFamily: "'Lato', sans-serif",
            borderBottom: '2px solid #278400',
            paddingBottom: '0.5rem'
          }}>
            🎯 Quick Fixes Recommended
          </h4>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#605e5c',
            lineHeight: 1.8
          }}>
            {data.quick_fixes.map((fix, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                {fix}
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div style={{
          padding: '1rem',
          background: '#f9f4d4',
          border: '2px solid #ffbf47',
          borderRadius: '4px',
          fontSize: '0.85rem',
          color: '#26374a'
        }}>
          <strong style={{ color: '#ee7100' }}>⚠️ Disclaimer:</strong> {data.disclaimer}
        </div>
      </div>
    </div>
  );
};

export default EvaAccessibilityDemo;
