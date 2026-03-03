import React, { useState } from 'react';
import demoData from '../data/eva-impact-analyzer-demo.json';

// TypeScript interfaces
interface Baseline {
  description: string;
  notes: string;
}

interface ScenarioInputs {
  employees: number;
  hours_saved_per_week: number;
  hourly_cost_cad: number;
  weeks_per_year: number;
  annual_platform_cost_cad: number;
}

interface ScenarioOutputs {
  annual_hours_saved: number;
  annual_gross_savings_cad: number;
  annual_net_savings_cad: number;
  roi_pct: number;
  payback_months: number;
}

interface Scenario {
  id: string;
  label: string;
  inputs: ScenarioInputs;
  outputs: ScenarioOutputs;
  narrative: string;
}

interface ImpactAnalyzerData {
  baseline: Baseline;
  scenarios: Scenario[];
  disclaimer: string;
}

const EvaImpactAnalyzerDemo: React.FC = () => {
  const data = demoData as ImpactAnalyzerData;
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('expected');

  const currentScenario = data.scenarios.find(s => s.id === selectedScenarioId) || data.scenarios[1];

  const formatCurrency = (amount: number): string => {
    return `$${amount.toLocaleString('en-CA')}`;
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-CA');
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
            💰 EVA Impact Analyzer – ROI Calculator
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
          {data.baseline.description}
        </p>
        <p style={{ color: '#605e5c', fontSize: '0.8rem', margin: '0.5rem 0 0 0', fontStyle: 'italic' }}>
          {data.baseline.notes}
        </p>
      </div>

      {/* Scenario Selector */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#26374a', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>
          Select Impact Scenario
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {data.scenarios.map(scenario => (
            <button
              key={scenario.id}
              onClick={() => setSelectedScenarioId(scenario.id)}
              style={{
                padding: '0.75rem 1.5rem',
                fontSize: '1rem',
                fontWeight: 600,
                fontFamily: "'Lato', sans-serif",
                borderRadius: '4px',
                border: selectedScenarioId === scenario.id ? '2px solid #0535d2' : '2px solid #e0e0e0',
                background: selectedScenarioId === scenario.id ? '#d7faff' : '#ffffff',
                color: selectedScenarioId === scenario.id ? '#0535d2' : '#605e5c',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedScenarioId === scenario.id ? '0 2px 4px rgba(5, 53, 210, 0.2)' : 'none'
              }}
              onMouseEnter={(e) => {
                if (selectedScenarioId !== scenario.id) {
                  e.currentTarget.style.background = '#f5f5f5';
                  e.currentTarget.style.borderColor = '#0535d2';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedScenarioId !== scenario.id) {
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.borderColor = '#e0e0e0';
                }
              }}
            >
              {scenario.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
        {/* Inputs Panel */}
        <div style={{
          padding: '1.5rem',
          background: '#d7faff',
          borderRadius: '4px',
          border: '2px solid #0535d2',
          borderLeft: '4px solid #0535d2'
        }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#0535d2', borderBottom: '2px solid #0535d2', paddingBottom: '0.5rem', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>
            📊 Inputs
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.25rem' }}>Employees</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#26374a', fontFamily: "'Lato', sans-serif" }}>
                {formatNumber(currentScenario.inputs.employees)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.25rem' }}>Hours saved/week/person</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#26374a', fontFamily: "'Lato', sans-serif" }}>
                {currentScenario.inputs.hours_saved_per_week}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.25rem' }}>Hourly cost (CAD)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#26374a', fontFamily: "'Lato', sans-serif" }}>
                {formatCurrency(currentScenario.inputs.hourly_cost_cad)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.25rem' }}>Weeks per year</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#26374a', fontFamily: "'Lato', sans-serif" }}>
                {currentScenario.inputs.weeks_per_year}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.25rem' }}>Annual platform cost</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ee7100', fontFamily: "'Lato', sans-serif" }}>
                {formatCurrency(currentScenario.inputs.annual_platform_cost_cad)}
              </div>
            </div>
          </div>
        </div>

        {/* Outputs Panel */}
        <div style={{
          padding: '1.5rem',
          background: '#d8eeca',
          borderRadius: '4px',
          border: '2px solid #278400',
          borderLeft: '4px solid #278400'
        }}>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#278400', borderBottom: '2px solid #278400', paddingBottom: '0.5rem', fontFamily: "'Lato', sans-serif", fontWeight: 600 }}>
            📈 Outputs
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.25rem' }}>Annual hours saved</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#278400', fontFamily: "'Lato', sans-serif" }}>
                {formatNumber(currentScenario.outputs.annual_hours_saved)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.25rem' }}>Gross savings (CAD)</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#278400', fontFamily: "'Lato', sans-serif" }}>
                {formatCurrency(currentScenario.outputs.annual_gross_savings_cad)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.25rem' }}>Net savings (CAD)</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#278400', fontFamily: "'Lato', sans-serif" }}>
                {formatCurrency(currentScenario.outputs.annual_net_savings_cad)}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.25rem' }}>ROI</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0535d2', fontFamily: "'Lato', sans-serif" }}>
                {currentScenario.outputs.roi_pct}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: '#605e5c', marginBottom: '0.25rem' }}>Payback period</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#ee7100', fontFamily: "'Lato', sans-serif" }}>
                {currentScenario.outputs.payback_months} months
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Narrator */}
      <div style={{
        background: '#f9f4d4',
        border: '2px solid #ffbf47',
        borderLeft: '4px solid #ee7100',
        borderRadius: '4px',
        padding: '1.5rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem', color: '#ee7100', fontFamily: "'Lato', sans-serif", fontWeight: 700 }}>
            💡 Impact Narrator
          </h3>
          <p style={{ color: '#605e5c', fontSize: '0.85rem', margin: 0 }}>
            Business case summary for {currentScenario.label.toLowerCase()} scenario
          </p>
        </div>

        <div style={{
          padding: '1rem',
          background: '#d7faff',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          borderLeft: '4px solid #0535d2'
        }}>
          <p style={{ margin: 0, color: '#26374a', fontSize: '1rem', lineHeight: 1.6 }}>
            {currentScenario.narrative}
          </p>
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
          <strong style={{ color: '#d3080c' }}>⚠️ Disclaimer:</strong> {data.disclaimer}
        </div>
      </div>
    </div>
  );
};

export default EvaImpactAnalyzerDemo;
