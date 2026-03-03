import React, { useState } from 'react';
import demoData from '../data/eva-devcrew-demo.json';

// TypeScript interfaces
interface Agent {
  id: string;
  name: string;
  role: string;
  status: string;
  focus: string;
  capacity_pct: number;
}

interface Task {
  id: string;
  title: string;
  type: string;
  assignee: string;
  status: string;
  confidence: string;
}

interface SprintSummary {
  status: string;
  highlights: string[];
  risks: string[];
  next_steps: string[];
}

interface Sprint {
  id: number;
  name: string;
  goal: string;
  agents: Agent[];
  tasks: Task[];
  summary: SprintSummary;
}

interface DevCrewData {
  current_sprint: number;
  sprints: Sprint[];
}

const EvaDevCrewDemo: React.FC = () => {
  const data = demoData as DevCrewData;
  const [selectedSprintId, setSelectedSprintId] = useState<number>(data.current_sprint);
  
  const currentSprint = data.sprints.find(s => s.id === selectedSprintId) || data.sprints[0];

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase();
    if (statusLower === 'done') return '#28a745';
    if (statusLower === 'in progress' || statusLower === 'working') return '#ffc107';
    if (statusLower === 'reviewing') return '#17a2b8';
    if (statusLower === 'planned' || statusLower === 'not started') return '#6c757d';
    if (statusLower === 'idle') return '#aaa';
    return '#6c757d';
  };

  const getConfidenceColor = (confidence: string): string => {
    const confLower = confidence.toLowerCase();
    if (confLower === 'high') return '#28a745';
    if (confLower === 'medium') return '#ffc107';
    if (confLower === 'low') return '#dc3545';
    return '#6c757d';
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '8px',
      padding: '2rem',
      color: '#26374a',
      maxWidth: '1100px',
      margin: '0 auto',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e0e0e0',
      borderBottom: '3px solid #0535d2'
    }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem', borderBottom: '3px solid #0535d2', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <h2 style={{ fontSize: '1.8rem', margin: 0, color: '#26374a', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
            🤖 EVA DevTools – AI Agile Crew
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
          AI agents working together on EVA Suite development sprints
        </p>
      </div>

      {/* Sprint Selector */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {data.sprints.map(sprint => (
            <button
              key={sprint.id}
              onClick={() => setSelectedSprintId(sprint.id)}
              style={{
                padding: '0.5rem 1.25rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                fontFamily: "'Lato', sans-serif",
                borderRadius: '4px',
                border: selectedSprintId === sprint.id ? '2px solid #0535d2' : '2px solid #e0e0e0',
                background: selectedSprintId === sprint.id ? '#d7faff' : '#ffffff',
                color: selectedSprintId === sprint.id ? '#0535d2' : '#605e5c',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedSprintId === sprint.id ? '0 2px 4px rgba(5, 53, 210, 0.2)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedSprintId !== sprint.id) {
                  e.currentTarget.style.background = '#f5f5f5';
                  e.currentTarget.style.borderColor = '#0535d2';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedSprintId !== sprint.id) {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }
              }}
            >
              Sprint {sprint.id}
            </button>
          ))}
        </div>
      </div>

      {/* Sprint Goal */}
      <div style={{
        marginBottom: '2rem',
        padding: '1rem',
        background: '#d7faff',
        border: '2px solid #0535d2',
        borderLeft: '4px solid #0535d2',
        borderRadius: '4px'
      }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#0535d2', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
          {currentSprint.name}
        </h3>
        <p style={{ margin: 0, color: '#26374a', fontSize: '0.95rem' }}>
          <strong>Goal:</strong> {currentSprint.goal}
        </p>
      </div>

      {/* Agents Panel */}
      {currentSprint.agents.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#26374a', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>
            🤖 AI Agents ({currentSprint.agents.length})
          </h3>
          <div style={{
            background: '#ffffff',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid #e0e0e0'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#605e5c', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>Agent</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#605e5c', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>Role</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#605e5c', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#605e5c', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>Focus</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', color: '#605e5c', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {currentSprint.agents.map((agent, idx) => (
                  <tr key={agent.id} style={{ borderTop: idx > 0 ? '1px solid #e0e0e0' : 'none' }}>
                    <td style={{ padding: '0.75rem', color: '#26374a', fontWeight: 600 }}>{agent.name}</td>
                    <td style={{ padding: '0.75rem', color: '#605e5c', fontSize: '0.9rem' }}>{agent.role}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        background: `${getStatusColor(agent.status)}15`,
                        border: `1px solid ${getStatusColor(agent.status)}`,
                        color: getStatusColor(agent.status),
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        {agent.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: '#605e5c', fontSize: '0.9rem' }}>{agent.focus}</td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <div style={{ display: 'inline-block', position: 'relative', width: '60px' }}>
                        <div style={{
                          height: '8px',
                          background: '#e0e0e0',
                          borderRadius: '4px',
                          overflow: 'hidden'
                        }}>
                          <div style={{
                            height: '100%',
                            width: `${agent.capacity_pct}%`,
                            background: agent.capacity_pct > 70 ? '#28a745' : agent.capacity_pct > 40 ? '#ffc107' : '#dc3545',
                            transition: 'width 0.3s'
                          }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: '#605e5c', marginTop: '0.25rem', display: 'block' }}>
                          {agent.capacity_pct}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tasks Panel */}
      {currentSprint.tasks.length > 0 && (
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', color: '#26374a', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>
            📋 Sprint Tasks ({currentSprint.tasks.length})
          </h3>
          <div style={{
            background: '#ffffff',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid #e0e0e0'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#605e5c', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>ID</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#605e5c', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>Title</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#605e5c', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>Type</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#605e5c', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>Assignee</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', color: '#605e5c', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'center', color: '#605e5c', fontSize: '0.85rem', fontWeight: 600, fontFamily: "'Lato', sans-serif" }}>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {currentSprint.tasks.map((task, idx) => (
                  <tr key={task.id} style={{ borderTop: idx > 0 ? '1px solid #e0e0e0' : 'none' }}>
                    <td style={{ padding: '0.75rem', color: '#0535d2', fontWeight: 600, fontSize: '0.85rem' }}>{task.id}</td>
                    <td style={{ padding: '0.75rem', color: '#26374a' }}>{task.title}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.2rem 0.6rem',
                        fontSize: '0.7rem',
                        borderRadius: '4px',
                        background: '#f5f5f5',
                        color: '#605e5c',
                        textTransform: 'uppercase',
                        fontWeight: 600
                      }}>
                        {task.type}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', color: '#605e5c', fontSize: '0.9rem' }}>{task.assignee}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        background: `${getStatusColor(task.status)}15`,
                        border: `1px solid ${getStatusColor(task.status)}`,
                        color: getStatusColor(task.status),
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        {task.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.6rem',
                        fontSize: '0.75rem',
                        borderRadius: '4px',
                        background: `${getConfidenceColor(task.confidence)}15`,
                        border: `1px solid ${getConfidenceColor(task.confidence)}`,
                        color: getConfidenceColor(task.confidence),
                        fontWeight: 600
                      }}>
                        {task.confidence}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Sprint Coach Summary */}
      <div style={{
        background: '#f9f4d4',
        border: '2px solid #ffbf47',
        borderLeft: '4px solid #ee7100',
        borderRadius: '4px',
        padding: '1.5rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: '#ee7100', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
            🧠 AI Sprint Coach
          </h3>
          <p style={{ color: '#605e5c', fontSize: '0.85rem', margin: 0 }}>
            Mock AI sprint summary
          </p>
        </div>

        {/* Status */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{
            padding: '0.75rem 1rem',
            background: '#d8eeca',
            border: '2px solid #278400',
            borderRadius: '4px',
            color: '#278400',
            fontWeight: 600,
            fontSize: '1rem'
          }}>
            Status: {currentSprint.summary.status}
          </div>
        </div>

        {/* Highlights */}
        {currentSprint.summary.highlights.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{
              fontSize: '1rem',
              marginBottom: '0.75rem',
              color: '#26374a',
              fontWeight: 600,
              fontFamily: "'Lato', sans-serif",
              borderBottom: '2px solid #ffbf47',
              paddingBottom: '0.5rem'
            }}>
              ✨ Highlights
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: '1.5rem',
              color: '#605e5c',
              lineHeight: 1.8
            }}>
              {currentSprint.summary.highlights.map((highlight, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Risks */}
        {currentSprint.summary.risks.length > 0 && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{
              fontSize: '1rem',
              marginBottom: '0.75rem',
              color: '#26374a',
              fontWeight: 600,
              fontFamily: "'Lato', sans-serif",
              borderBottom: '2px solid #ffbf47',
              paddingBottom: '0.5rem'
            }}>
              ⚠️ Risks
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: '1.5rem',
              color: '#ee7100',
              lineHeight: 1.8
            }}>
              {currentSprint.summary.risks.map((risk, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {risk}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Next Steps */}
        {currentSprint.summary.next_steps.length > 0 && (
          <div>
            <h4 style={{
              fontSize: '1rem',
              marginBottom: '0.75rem',
              color: '#26374a',
              fontWeight: 600,
              fontFamily: "'Lato', sans-serif",
              borderBottom: '2px solid #ffbf47',
              paddingBottom: '0.5rem'
            }}>
              🎯 Next Steps
            </h4>
            <ul style={{
              margin: 0,
              paddingLeft: '1.5rem',
              color: '#0535d2',
              lineHeight: 1.8
            }}>
              {currentSprint.summary.next_steps.map((step, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaDevCrewDemo;
