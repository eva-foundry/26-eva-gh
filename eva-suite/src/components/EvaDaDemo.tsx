import React, { useState, useEffect } from 'react';
import demoData from '../data/eva-da-demo.json';

// TypeScript interfaces
interface Domain {
  id: string;
  label: string;
}

interface Answer {
  decision: string;
  explanation: string;
  conditions: string[];
  sources: string[];
  notes: string;
}

interface Scenario {
  id: string;
  domain: string;
  question: string;
  answer: Answer;
}

interface EvaDaDemoData {
  default_domain: string;
  domains: Domain[];
  scenarios: Scenario[];
  generic_disclaimer: string;
}

const EvaDaDemo: React.FC = () => {
  const data = demoData as EvaDaDemoData;
  
  const [selectedDomainId, setSelectedDomainId] = useState<string>(data.default_domain);
  const [questionText, setQuestionText] = useState<string>('');
  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [isQuestionEdited, setIsQuestionEdited] = useState<boolean>(false);

  // When domain changes, update question and reset answer
  useEffect(() => {
    const scenario = data.scenarios.find(s => s.domain === selectedDomainId);
    if (scenario) {
      setQuestionText(scenario.question);
      setActiveScenario(scenario);
      setIsQuestionEdited(false);
    }
    setShowAnswer(false);
  }, [selectedDomainId, data.scenarios]);

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDomainId(e.target.value);
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionText(e.target.value);
    if (activeScenario && e.target.value !== activeScenario.question) {
      setIsQuestionEdited(true);
    } else {
      setIsQuestionEdited(false);
    }
  };

  const handleAskClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeScenario) {
      setShowAnswer(true);
    }
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '8px',
      padding: '2rem',
      color: '#26374a',
      maxWidth: '900px',
      margin: '0 auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
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
          <span style={{ fontSize: '2rem' }}>🔍</span>
          EVA DA – Decision Support Assistant
        </h2>
        <p style={{ color: '#605e5c', fontSize: '0.9rem', margin: 0 }}>
          Mock demo: Ask a question about CPP-D or EI eligibility and see decision reasoning.
        </p>
      </div>

      <form onSubmit={handleAskClick}>
        {/* Domain Selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="domain-selector" 
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#26374a',
              fontFamily: "'Lato', sans-serif"
            }}
          >
            Select Domain:
          </label>
          <select
            id="domain-selector"
            value={selectedDomainId}
            onChange={handleDomainChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              borderRadius: '4px',
              border: '2px solid #e0e0e0',
              background: '#ffffff',
              color: '#26374a',
              cursor: 'pointer',
              fontFamily: "'Noto Sans', sans-serif"
            }}
          >
            {data.domains.map(domain => (
              <option key={domain.id} value={domain.id}>
                {domain.label}
              </option>
            ))}
          </select>
        </div>

        {/* Question Textarea */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label 
            htmlFor="question-input" 
            style={{ 
              display: 'block', 
              marginBottom: '0.5rem', 
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#26374a',
              fontFamily: "'Lato', sans-serif"
            }}
          >
            Your Question:
          </label>
          <textarea
            id="question-input"
            value={questionText}
            onChange={handleQuestionChange}
            rows={4}
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '1rem',
              borderRadius: '4px',
              border: '2px solid #e0e0e0',
              background: '#ffffff',
              color: '#26374a',
              fontFamily: "'Noto Sans', sans-serif",
              resize: 'vertical'
            }}
          />
        </div>

        {/* Ask Button */}
        <button
          type="submit"
          style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: 700,
            borderRadius: '4px',
            border: 'none',
            background: '#0535d2',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 6px rgba(5, 53, 210, 0.3)',
            fontFamily: "'Lato', sans-serif"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#26374a';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(38, 55, 74, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#0535d2';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 6px rgba(5, 53, 210, 0.3)';
          }}
        >
          Ask EVA DA
        </button>
      </form>

      {/* Answer Panel */}
      {showAnswer && activeScenario && (
        <div 
          aria-live="polite"
          style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#d7faff',
            border: '2px solid #0535d2',
            borderLeft: '4px solid #0535d2',
            borderRadius: '8px'
          }}
        >
          {isQuestionEdited && (
            <div style={{
              marginBottom: '1rem',
              padding: '0.75rem',
              background: '#f9f4d4',
              border: '2px solid #ffbf47',
              borderLeft: '4px solid #ee7100',
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: '#26374a'
            }}>
              ℹ️ This is a static demo – answer is based on a canned scenario for this domain.
            </div>
          )}

          {/* Decision */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ 
              fontSize: '1.3rem', 
              marginBottom: '0.5rem',
              color: '#26374a',
              fontWeight: 700,
              fontFamily: "'Lato', sans-serif"
            }}>
              Decision
            </h3>
            <div style={{
              padding: '1rem',
              background: '#d8eeca',
              border: '2px solid #278400',
              borderLeft: '4px solid #278400',
              borderRadius: '4px',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: '#278400',
              fontFamily: "'Lato', sans-serif"
            }}>
              {activeScenario.answer.decision}
            </div>
          </div>

          {/* Explanation */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#26374a',
              fontWeight: 600,
              borderBottom: '2px solid #e0e0e0',
              paddingBottom: '0.5rem',
              fontFamily: "'Lato', sans-serif"
            }}>
              Explanation
            </h4>
            <p style={{ 
              lineHeight: 1.6, 
              color: '#605e5c',
              fontSize: '0.95rem',
              margin: 0
            }}>
              {activeScenario.answer.explanation}
            </p>
          </div>

          {/* Conditions */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#26374a',
              fontWeight: 600,
              borderBottom: '2px solid #e0e0e0',
              paddingBottom: '0.5rem',
              fontFamily: "'Lato', sans-serif"
            }}>
              Key Conditions
            </h4>
            <ul style={{ 
              margin: 0,
              paddingLeft: '1.5rem',
              color: '#605e5c',
              lineHeight: 1.8
            }}>
              {activeScenario.answer.conditions.map((condition, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {condition}
                </li>
              ))}
            </ul>
          </div>

          {/* Sources */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ 
              fontSize: '1.1rem', 
              marginBottom: '0.75rem',
              color: '#26374a',
              fontWeight: 600,
              borderBottom: '2px solid #e0e0e0',
              paddingBottom: '0.5rem',
              fontFamily: "'Lato', sans-serif"
            }}>
              Sources Referenced (Demo)
            </h4>
            <ul style={{ 
              margin: 0,
              paddingLeft: '1.5rem',
              color: '#605e5c',
              lineHeight: 1.8,
              fontSize: '0.9rem'
            }}>
              {activeScenario.answer.sources.map((source, idx) => (
                <li key={idx} style={{ marginBottom: '0.5rem' }}>
                  {source}
                </li>
              ))}
            </ul>
          </div>

          {/* Notes */}
          {activeScenario.answer.notes && (
            <div style={{
              padding: '0.75rem',
              background: '#d7faff',
              border: '2px solid #0535d2',
              borderLeft: '4px solid #0535d2',
              borderRadius: '4px',
              fontSize: '0.85rem',
              color: '#26374a',
              marginBottom: '1rem'
            }}>
              <strong style={{ color: '#0535d2' }}>Note:</strong> {activeScenario.answer.notes}
            </div>
          )}

          {/* Generic Disclaimer */}
          <div style={{
            padding: '1rem',
            background: '#f9d8d6',
            border: '2px solid #eb2d37',
            borderLeft: '4px solid #d3080c',
            borderRadius: '4px',
            fontSize: '0.85rem',
            color: '#26374a'
          }}>
            <strong style={{ color: '#d3080c' }}>⚠️ Disclaimer:</strong> {data.generic_disclaimer}
          </div>
        </div>
      )}
    </div>
  );
};

export default EvaDaDemo;
