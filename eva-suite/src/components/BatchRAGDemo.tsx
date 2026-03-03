import React, { useState } from 'react';

// Simulated batch processing data with variations
const generateBatchData = () => {
  const timestamp = new Date().toLocaleTimeString();
  const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randomFloat = (min: number, max: number) => (Math.random() * (max - min) + min).toFixed(2);

  return {
    timestamp,
    stats: {
      documentsProcessed: randomInt(150, 850),
      chunksGenerated: randomInt(2500, 8500),
      vectorsIndexed: randomInt(2400, 8400),
      avgChunkSize: randomInt(400, 650),
      processingTime: randomFloat(12.5, 45.8),
    },
    batches: [
      {
        id: `batch-${randomInt(1000, 9999)}`,
        status: Math.random() > 0.3 ? 'completed' : 'processing',
        documents: randomInt(25, 85),
        progress: randomInt(85, 100),
        startTime: `${randomInt(1, 12)}:${randomInt(10, 59)} PM`,
      },
      {
        id: `batch-${randomInt(1000, 9999)}`,
        status: Math.random() > 0.5 ? 'completed' : 'queued',
        documents: randomInt(30, 90),
        progress: randomInt(0, 100),
        startTime: `${randomInt(1, 12)}:${randomInt(10, 59)} PM`,
      },
      {
        id: `batch-${randomInt(1000, 9999)}`,
        status: 'queued',
        documents: randomInt(15, 65),
        progress: 0,
        startTime: 'Pending',
      },
    ],
    recentDocuments: [
      `Policy_Brief_${randomInt(100, 999)}.pdf`,
      `Regulation_Update_${randomInt(10, 99)}_${randomInt(2020, 2025)}.docx`,
      `Technical_Spec_v${randomInt(1, 5)}.${randomInt(0, 9)}.pdf`,
      `User_Guide_EN-FR_${randomInt(1, 50)}.pdf`,
    ],
  };
};

const BatchRAGDemo: React.FC = () => {
  const [data, setData] = useState(generateBatchData());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(generateBatchData());
      setIsRefreshing(false);
    }, 600);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#278400';
      case 'processing':
        return '#0535d2';
      case 'queued':
        return '#ee7100';
      default:
        return '#605e5c';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'completed':
        return '#d8eeca';
      case 'processing':
        return '#d7faff';
      case 'queued':
        return '#f9f4d4';
      default:
        return '#f5f5f5';
    }
  };

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '8px',
        padding: '2rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {/* Header with Refresh Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '3px solid #0535d2' }}>
        <div>
          <h2 style={{ margin: 0, color: '#26374a', fontSize: '1.8rem', fontWeight: 700 }}>
            📊 Batch RAG Processing
          </h2>
          <p style={{ margin: '0.5rem 0 0', color: '#605e5c', fontSize: '0.95rem' }}>
            Real-time document ingestion and vectorization pipeline
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          style={{
            background: isRefreshing ? '#f5f5f5' : '#0535d2',
            color: isRefreshing ? '#605e5c' : '#ffffff',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '4px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: isRefreshing ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          onMouseEnter={(e) => {
            if (!isRefreshing) {
              e.currentTarget.style.background = '#26374a';
            }
          }}
          onMouseLeave={(e) => {
            if (!isRefreshing) {
              e.currentTarget.style.background = '#0535d2';
            }
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>{isRefreshing ? '⟳' : '↻'}</span>
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {/* Last Updated */}
      <div style={{ marginBottom: '1.5rem', padding: '0.75rem 1rem', background: '#f5f5f5', borderRadius: '4px', borderLeft: '4px solid #ffbf47' }}>
        <span style={{ color: '#605e5c', fontSize: '0.9rem', fontWeight: 600 }}>
          Last Updated: {data.timestamp}
        </span>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ padding: '1.25rem', background: '#f5f5f5', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <div style={{ fontSize: '0.85rem', color: '#605e5c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Documents Processed
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#0535d2' }}>
            {data.stats.documentsProcessed.toLocaleString()}
          </div>
        </div>

        <div style={{ padding: '1.25rem', background: '#f5f5f5', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <div style={{ fontSize: '0.85rem', color: '#605e5c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Chunks Generated
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#278400' }}>
            {data.stats.chunksGenerated.toLocaleString()}
          </div>
        </div>

        <div style={{ padding: '1.25rem', background: '#f5f5f5', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <div style={{ fontSize: '0.85rem', color: '#605e5c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Vectors Indexed
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#26374a' }}>
            {data.stats.vectorsIndexed.toLocaleString()}
          </div>
        </div>

        <div style={{ padding: '1.25rem', background: '#f5f5f5', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <div style={{ fontSize: '0.85rem', color: '#605e5c', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
            Avg Processing Time
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#ee7100' }}>
            {data.stats.processingTime}s
          </div>
        </div>
      </div>

      {/* Batch Status Table */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ color: '#26374a', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 600 }}>
          Active Batches
        </h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#26374a', color: '#ffffff' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Batch ID</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Documents</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Progress</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Start Time</th>
              </tr>
            </thead>
            <tbody>
              {data.batches.map((batch, idx) => (
                <tr key={batch.id} style={{ borderBottom: '1px solid #e0e0e0', background: idx % 2 === 0 ? '#ffffff' : '#f5f5f5' }}>
                  <td style={{ padding: '0.75rem', fontFamily: 'monospace', color: '#26374a', fontWeight: 600 }}>
                    {batch.id}
                  </td>
                  <td style={{ padding: '0.75rem' }}>
                    <span style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      background: getStatusBg(batch.status),
                      color: getStatusColor(batch.status),
                      textTransform: 'capitalize',
                    }}>
                      {batch.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#605e5c' }}>{batch.documents}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ flex: 1, height: '8px', background: '#e0e0e0', borderRadius: '999px', overflow: 'hidden' }}>
                        <div
                          style={{
                            width: `${batch.progress}%`,
                            height: '100%',
                            background: getStatusColor(batch.status),
                            transition: 'width 0.3s',
                          }}
                        />
                      </div>
                      <span style={{ fontSize: '0.9rem', color: '#605e5c', fontWeight: 600, minWidth: '45px' }}>
                        {batch.progress}%
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '0.75rem', color: '#605e5c' }}>{batch.startTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Documents */}
      <div>
        <h3 style={{ color: '#26374a', fontSize: '1.3rem', marginBottom: '1rem', fontWeight: 600 }}>
          Recently Processed Documents
        </h3>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {data.recentDocuments.map((doc, idx) => (
            <div
              key={idx}
              style={{
                padding: '0.75rem 1rem',
                background: '#f5f5f5',
                borderRadius: '4px',
                borderLeft: '4px solid #278400',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>📄</span>
              <span style={{ color: '#26374a', fontWeight: 500 }}>{doc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BatchRAGDemo;
