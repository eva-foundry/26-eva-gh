import React from 'react';
import demoData from '../data/eva-process-mapper-demo.json';

// TypeScript interfaces
interface Actor {
  id: string;
  label: string;
}

interface Step {
  id: string;
  order: number;
  label: string;
  type: string;
  assisted_by_eva: boolean;
  notes: string;
}

interface Lane {
  actor_id: string;
  steps: Step[];
}

interface Summary {
  highlights: string[];
  opportunities: string[];
  disclaimer: string;
}

interface Process {
  id: string;
  name: string;
  description: string;
  scenario: string;
  actors: Actor[];
  lanes: Lane[];
  summary: Summary;
}

interface ProcessMapperData {
  process: Process;
}

const EvaProcessMapperDemo: React.FC = () => {
  const data = demoData as ProcessMapperData;
  const process = data.process;

  // Get type color
  const getTypeColor = (type: string): string => {
    const typeMap: Record<string, string> = {
      'action': '#17a2b8',
      'interaction': '#6c757d',
      'outcome': '#28a745',
      'system': '#6f42c1',
      'routing': '#fd7e14',
      'knowledge_capture': '#ffc107',
      'explanation': '#50e6ff',
      'knowledge': '#20c997',
      'rules': '#e83e8c'
    };
    return typeMap[type] || '#6c757d';
  };

  // Sort lanes by actor order
  const orderedLanes = process.actors.map(actor => {
    const lane = process.lanes.find(l => l.actor_id === actor.id);
    return {
      actor,
      steps: lane ? lane.steps.sort((a, b) => a.order - b.order) : []
    };
  });

  return (
    <div 
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '2rem',
        color: '#26374a',
        maxWidth: '1200px',
        margin: '0 auto',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e0e0e0',
        borderBottom: '3px solid #0535d2'
      }}
      aria-label="EVA Process Mapper Demo"
    >
      {/* Header */}
      <div style={{ marginBottom: '2rem', borderBottom: '3px solid #0535d2', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#26374a', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
            🧩 EVA Process Mapper
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
            Demo · Mock process map
          </span>
        </div>
        <h3 style={{ fontSize: '1.3rem', margin: '0.5rem 0', color: '#26374a', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>
          {process.name}
        </h3>
        <p style={{ color: '#605e5c', fontSize: '0.95rem', margin: '0.5rem 0' }}>
          {process.description}
        </p>
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: '#d7faff',
          border: '2px solid #0535d2',
          borderLeft: '4px solid #0535d2',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#0535d2', fontSize: '0.9rem', fontFamily: "'Lato', sans-serif" }}>Scenario:</strong>
          <span style={{ color: '#26374a', fontSize: '0.95rem', marginLeft: '0.5rem' }}>
            {process.scenario}
          </span>
        </div>
      </div>

      {/* Process Flow - Swimlanes */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ 
          fontSize: '1.3rem', 
          marginBottom: '1.5rem', 
          color: '#26374a', 
          borderBottom: '2px solid #e0e0e0', 
          paddingBottom: '0.5rem',
          fontFamily: "'Lato', sans-serif",
          fontWeight: 600
        }}>
          🔄 Process Flow
        </h3>

        {/* Swimlanes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {orderedLanes.map(({ actor, steps }) => (
            <div 
              key={actor.id}
              style={{
                background: '#ffffff',
                borderRadius: '4px',
                border: '1px solid #e0e0e0',
                overflow: 'hidden'
              }}
            >
              {/* Lane Header */}
              <div style={{
                background: actor.id === 'eva' 
                  ? '#d8eeca'
                  : '#f5f5f5',
                padding: '1rem 1.5rem',
                borderBottom: '2px solid #e0e0e0'
              }}>
                <h4 style={{ 
                  fontSize: '1.1rem', 
                  margin: 0, 
                  color: actor.id === 'eva' ? '#278400' : '#26374a',
                  fontWeight: 600,
                  fontFamily: "'Lato', sans-serif"
                }}>
                  {actor.label}
                  {actor.id === 'eva' && (
                    <span style={{
                      marginLeft: '0.75rem',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.6rem',
                      background: '#ffffff',
                      borderRadius: '4px',
                      border: '1px solid #278400',
                      color: '#278400'
                    }}>
                      AI-Powered
                    </span>
                  )}
                </h4>
              </div>

              {/* Lane Steps */}
              <div style={{ padding: '1.5rem' }}>
                {steps.length === 0 ? (
                  <p style={{ color: '#777', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    No steps in this lane
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {steps.map(step => (
                      <div 
                        key={step.id}
                        style={{
                          padding: '1rem',
                          background: step.assisted_by_eva 
                            ? '#d7faff' 
                            : '#f5f5f5',
                          borderRadius: '4px',
                          border: step.assisted_by_eva 
                            ? '2px solid #0535d2' 
                            : '1px solid #e0e0e0',
                          borderLeft: `4px solid ${getTypeColor(step.type)}`
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                          {/* Step Order */}
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '1.75rem',
                            height: '1.75rem',
                            borderRadius: '50%',
                            background: '#0535d2',
                            color: '#ffffff',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            fontFamily: "'Lato', sans-serif"
                          }}>
                            {step.order}
                          </span>

                          {/* Step ID */}
                          <span style={{
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            color: '#0535d2',
                            fontFamily: 'monospace'
                          }}>
                            {step.id}
                          </span>

                          {/* Type Badge */}
                          <span style={{
                            padding: '0.2rem 0.6rem',
                            fontSize: '0.7rem',
                            borderRadius: '4px',
                            background: `${getTypeColor(step.type)}15`,
                            border: `1px solid ${getTypeColor(step.type)}`,
                            color: getTypeColor(step.type),
                            fontWeight: 600,
                            textTransform: 'capitalize'
                          }}>
                            {step.type.replace('_', ' ')}
                          </span>

                          {/* EVA-Assisted Badge */}
                          {step.assisted_by_eva && (
                            <span style={{
                              padding: '0.2rem 0.6rem',
                              fontSize: '0.7rem',
                              borderRadius: '4px',
                              background: '#d8eeca',
                              border: '1px solid #278400',
                              color: '#278400',
                              fontWeight: 600
                            }}>
                              ⚡ EVA-assisted
                            </span>
                          )}
                        </div>

                        {/* Step Label */}
                        <p style={{ 
                          margin: '0.5rem 0', 
                          color: '#26374a', 
                          fontSize: '1rem',
                          fontWeight: 500
                        }}>
                          {step.label}
                        </p>

                        {/* Step Notes */}
                        <p style={{ 
                          margin: '0.5rem 0 0 0', 
                          color: '#605e5c', 
                          fontSize: '0.85rem',
                          fontStyle: 'italic'
                        }}>
                          {step.notes}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EVA Process Coach */}
      <div style={{
        background: '#f9f4d4',
        border: '2px solid #ffbf47',
        borderLeft: '4px solid #ee7100',
        borderRadius: '4px',
        padding: '1.5rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: '#ee7100', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
            🧠 EVA Process Coach
          </h3>
          <p style={{ color: '#605e5c', fontSize: '0.85rem', margin: 0 }}>
            AI insights into your process design
          </p>
        </div>

        {/* What this map shows */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{
            fontSize: '1rem',
            marginBottom: '0.75rem',
            color: '#26374a',
            fontWeight: 600,
            fontFamily: "'Lato', sans-serif",
            borderBottom: '2px solid #0535d2',
            paddingBottom: '0.5rem'
          }}>
            📊 What this map shows
          </h4>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#605e5c',
            lineHeight: 1.8
          }}>
            {process.summary.highlights.map((highlight, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        {/* Where EVA can help more */}
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
            🎯 Where EVA can help more
          </h4>
          <ul style={{
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#278400',
            lineHeight: 1.8
          }}>
            {process.summary.opportunities.map((opportunity, idx) => (
              <li key={idx} style={{ marginBottom: '0.5rem' }}>
                {opportunity}
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div style={{
          padding: '1rem',
          background: '#f9d8d6',
          border: '2px solid #eb2d37',
          borderRadius: '4px',
          fontSize: '0.85rem',
          color: '#26374a'
        }}>
          <strong style={{ color: '#d3080c' }}>⚠️ Disclaimer:</strong> {process.summary.disclaimer}
        </div>
      </div>
    </div>
  );
};

export default EvaProcessMapperDemo;
