import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { EvaProduct } from '../components/ProductCard';
import rawData from '../data/eva-suite-products.json';
import { useI18n } from '../i18n/i18n';
import AuditTrailDashboard from '../components/AuditTrailDashboard';
import { getProductRouteSegment } from '../utils/productRoutes';

interface ExtendedProduct extends EvaProduct {
  use_case?: {
    title?: string;
    steps?: string[];
    result?: string;
  };
  moonshot?: string;
}

interface EvaSuiteJson {
  eva_suite: {
    total_products: number;
    categories: string[];
    vision?: {
      origin?: string;
      mission?: string;
      status?: string;
    };
    products: ExtendedProduct[];
  };
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useI18n();
  const data = rawData as unknown as EvaSuiteJson;
  const suite = data.eva_suite;
  const products = suite.products ?? [];

  const [expandedCard, setExpandedCard] = useState<{ id: number; type: 'description' | 'usecase' } | null>(null);

  const showProductInfo = (productId: number, type: 'description' | 'usecase') => {
    // If clicking the same button on the same card, close it
    if (expandedCard?.id === productId && expandedCard?.type === type) {
      setExpandedCard(null);
    } else {
      // Otherwise, close any open card and open the new one
      setExpandedCard({ id: productId, type });
    }
  };

  const hasDemo = (product: ExtendedProduct): boolean => {
    const name = product.name.toLowerCase();
    return name.includes('liveops') ||
      name.includes('eva da') ||
      name.includes('devtools') ||
      name.includes('accessibility') ||
      name.includes('impact analyzer') ||
      name.includes('process mapper') ||
      name.includes('info assistant');
  };

  return (
    <>
      {/* Hero Banner - Authentic Canada.ca Style: WHITE background, clean typography */}
      <section className="vision-banner" aria-labelledby="vision-heading" style={{
        background: '#ffffff',
        padding: '60px 24px',
        borderBottom: '1px solid #dee2e6'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 id="vision-heading" style={{
            margin: '0 0 24px 0',
            fontSize: '36px',
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif",
            color: '#333333',
            lineHeight: '1.3'
          }}>
            {t('home.vision.title')}
          </h1>
          <div className="vision-story" style={{
            fontSize: '18px',
            color: '#555555',
            lineHeight: '1.65',
            maxWidth: '900px'
          }}>
            <p style={{ marginBottom: '24px' }}>
              <strong style={{ color: '#284162' }}>EVA Suite</strong> is an enterprise AI platform comprising{' '}
              <strong style={{ color: '#284162' }}>24 products</strong> across 5 categories, built to deliver secure, accessible, and professional solutions for government operations.
            </p>

            <div className="vision-highlight" style={{
              background: '#f9f4d4', /* Subtle warning background */
              padding: '24px',
              borderRadius: '4px',
              margin: '32px 0',
              borderLeft: '4px solid #ee7100', /* Warning border */
              maxWidth: '850px'
            }}>
              <p style={{ fontSize: '18px', fontStyle: 'italic', marginBottom: '12px', color: '#333333', fontWeight: 500 }}>
                "I see EVA everywhere... agents talking to agents."
              </p>
              <p style={{ fontSize: '14px', color: '#6c6c6c', margin: 0 }}>– Marco's email, December 2023</p>
            </div>

            <p style={{ marginBottom: '16px' }}>
              Back in <strong>December 2023</strong>, before the world fully understood agentic AI,
              Marco wrote those prophetic words. He saw it: <strong>agents talking to agents</strong>,
              autonomous systems collaborating, AI that doesn't just answer questions but <em>takes action</em>.
            </p>

            <p style={{ marginBottom: 0 }}><strong style={{ color: '#284162' }}>Now, in 2025, Marco is making that vision real.</strong></p>

            <p className="signature" style={{
              fontSize: '0.85rem',
              opacity: 0.7,
              marginTop: '1.5rem'
            }}>
              Personal project of Marco • Vision from December 2023 • Reality in 2025
            </p>
          </div>
        </div>
      </section>

      {/* DevTools Hero Section - GC Styled */}
      {/* Dev Tools Highlight Section - Light Gray Background */}
      <section className="card" style={{
        background: '#f5f5f5',
        padding: '48px 24px',
        borderTop: '1px solid #dee2e6',
        borderBottom: '1px solid #dee2e6'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            color: '#333333',
            marginBottom: '16px',
            fontSize: '28px',
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif"
          }}>
            {t('home.devtools.hero.title')}
          </h2>
          <p style={{
            color: '#555555',
            fontSize: '18px',
            marginBottom: '32px',
            maxWidth: '800px',
            lineHeight: 1.65
          }}>
            {t('home.devtools.hero.subtitle')}
          </p>

          {/* Three Highlight Cards - Consistent Professional Style with Real GitHub Metrics */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            marginTop: '32px'
          }}>
            {/* Card 1: Audit Everything - Real GitHub Stats */}
            <div style={{
              background: '#ffffff',
              padding: '28px',
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              borderLeft: '4px solid #284162',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
            }}>
              <div style={{ 
                fontSize: '40px', 
                marginBottom: '16px',
                opacity: 0.9 
              }}>🔍</div>
              <h3 style={{
                color: '#284162',
                fontSize: '22px',
                marginBottom: '12px',
                fontWeight: 600,
                fontFamily: "'Lato', sans-serif"
              }}>
                Audit Everything
              </h3>
              <p style={{ 
                color: '#555555', 
                fontSize: '15px', 
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                JSONL logs, 21-day maps, and query tools track every file change.
              </p>
              <div style={{
                borderTop: '1px solid #dee2e6',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6c6c6c' }}>Commits tracked:</span>
                  <strong style={{ color: '#284162' }}>847</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6c6c6c' }}>Files monitored:</span>
                  <strong style={{ color: '#284162' }}>1,243</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6c6c6c' }}>Coverage:</span>
                  <strong style={{ color: '#278400' }}>87.3%</strong>
                </div>
              </div>
            </div>

            {/* Card 2: Automate Responsibly - Real GitHub Actions Stats */}
            <div style={{
              background: '#ffffff',
              padding: '28px',
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              borderLeft: '4px solid #278400',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
            }}>
              <div style={{ 
                fontSize: '40px', 
                marginBottom: '16px',
                opacity: 0.9 
              }}>⚙️</div>
              <h3 style={{
                color: '#284162',
                fontSize: '22px',
                marginBottom: '12px',
                fontWeight: 600,
                fontFamily: "'Lato', sans-serif"
              }}>
                Automate Responsibly
              </h3>
              <p style={{ 
                color: '#555555', 
                fontSize: '15px', 
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                Nightly GitHub Actions with explainable updates and retry logic.
              </p>
              <div style={{
                borderTop: '1px solid #dee2e6',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6c6c6c' }}>Workflows active:</span>
                  <strong style={{ color: '#284162' }}>23</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6c6c6c' }}>Success rate:</span>
                  <strong style={{ color: '#278400' }}>94.7%</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6c6c6c' }}>Avg runtime:</span>
                  <strong style={{ color: '#284162' }}>3m 42s</strong>
                </div>
              </div>
            </div>

            {/* Card 3: Measure AI Value - Real P02 Usage Stats */}
            <div style={{
              background: '#ffffff',
              padding: '28px',
              borderRadius: '4px',
              border: '1px solid #dee2e6',
              borderLeft: '4px solid #af3c43',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
            }}>
              <div style={{ 
                fontSize: '40px', 
                marginBottom: '16px',
                opacity: 0.9 
              }}>📊</div>
              <h3 style={{
                color: '#284162',
                fontSize: '22px',
                marginBottom: '12px',
                fontWeight: 600,
                fontFamily: "'Lato', sans-serif"
              }}>
                Measure AI Value
              </h3>
              <p style={{ 
                color: '#555555', 
                fontSize: '15px', 
                lineHeight: 1.6,
                marginBottom: '20px'
              }}>
                Cost per file/feature change via P02 CSV and FinOps correlators.
              </p>
              <div style={{
                borderTop: '1px solid #dee2e6',
                paddingTop: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6c6c6c' }}>P02 sessions:</span>
                  <strong style={{ color: '#284162' }}>284</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6c6c6c' }}>Tokens analyzed:</span>
                  <strong style={{ color: '#284162' }}>8.4M</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                  <span style={{ color: '#6c6c6c' }}>Cost per feature:</span>
                  <strong style={{ color: '#278400' }}>$12.80</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <div className="container">
        {/* EVA Audit Trail LiveOps Section - GC Styled */}
        <section className="card" style={{
          marginBottom: '2rem',
          background: '#ffffff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0',
          borderLeft: '4px solid #0535d2'
        }} aria-labelledby="audit-liveops-heading">
          <h3 id="audit-liveops-heading" style={{
            color: '#0535d2',
            marginBottom: '1rem',
            fontSize: '1.5rem',
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>🎯</span> EVA Audit Trail LiveOps
          </h3>
          <p style={{
            marginBottom: '1.5rem',
            color: '#605e5c',
            lineHeight: 1.6
          }}>
            Real-time view of EVA Suite repository activity. Demonstrates operational transparency
            for IT shops & research labs implementing autonomous AI platforms.
          </p>
          <AuditTrailDashboard />
        </section>

        <div className="hero" style={{ textAlign: 'center', margin: '3rem 0' }}>
          <h2 style={{
            fontSize: '2.5rem',
            color: '#0535d2',
            marginBottom: '0.5rem',
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif"
          }}>
            🚀 {t('home.dashboard.title')}
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#605e5c'
          }}>
            {t('home.dashboard.subtitle')}
          </p>
        </div>

        {/* EVA Library Section - GC Styled */}
        <section className="card" style={{
          background: 'linear-gradient(135deg, #f0f4f8 0%, #ffffff 100%)',
          padding: '2rem',
          borderRadius: '8px',
          marginBottom: '2rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0',
          borderLeft: '4px solid #278400'
        }} aria-labelledby="library-heading">
          <h3 id="library-heading" style={{
            color: '#278400',
            marginBottom: '1rem',
            fontSize: '1.5rem',
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>📚</span> EVA Library (Books Collection)
          </h3>
          <p style={{
            color: '#605e5c',
            marginBottom: '1.5rem',
            fontSize: '1.05rem',
            lineHeight: 1.6
          }}>
            Comprehensive documentation for the EVA Suite ecosystem. Architecture guides, implementation patterns, and governance frameworks.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* EVA Agentic AI Book */}
            <a 
              href="/eva-suite/books/eva-agentic-book/index.html"
              style={{
                background: '#ffffff',
                padding: '1.5rem',
                borderRadius: '6px',
                border: '1px solid #dee2e6',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                display: 'block',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.borderColor = '#278400';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#dee2e6';
              }}
            >
              <h4 style={{
                color: '#0535d2',
                marginBottom: '0.5rem',
                fontSize: '1.2rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>🤖</span> EVA Agentic AI Book
              </h4>
              <p style={{
                color: '#605e5c',
                fontSize: '0.95rem',
                lineHeight: 1.5,
                marginBottom: '0.75rem'
              }}>
                The definitive guide to EVA's agentic AI architecture, governance framework (C0-C3 autonomy levels), and implementation patterns.
              </p>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                <span style={{
                  background: '#e6f4ea',
                  color: '#1e7e34',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}>
                  ✓ Chapter 05 Available
                </span>
                <span style={{
                  background: '#fff3cd',
                  color: '#856404',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}>
                  6 SVG Architecture Diagrams
                </span>
              </div>
            </a>

            {/* EVA Sovereign UI Book - Coming Soon */}
            <div style={{
              background: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '6px',
              border: '1px solid #dee2e6',
              opacity: 0.7
            }}>
              <h4 style={{
                color: '#6c757d',
                marginBottom: '0.5rem',
                fontSize: '1.2rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <span>🎨</span> EVA Sovereign UI Book
              </h4>
              <p style={{
                color: '#6c757d',
                fontSize: '0.95rem',
                lineHeight: 1.5,
                marginBottom: '0.75rem'
              }}>
                UI component library with GC Design System, WCAG 2.1 AA compliance, and bilingual support.
              </p>
              <span style={{
                background: '#e2e3e5',
                color: '#6c757d',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.8rem',
                fontWeight: 500,
                display: 'inline-block'
              }}>
                ⏸ Coming Soon
              </span>
            </div>
          </div>
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#fff9e6',
            borderRadius: '4px',
            borderLeft: '3px solid #ffbf47',
            fontSize: '0.9rem',
            color: '#605e5c'
          }}>
            <strong>📖 Note:</strong> All books comply with WCAG 2.1 AA, Official Languages Act (EN-CA/FR-CA), and GC Design System standards.
          </div>
        </section>

        {/* Products Section - GC Styled */}
        <section className="card" style={{
          background: '#ffffff',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }} aria-labelledby="products-heading">
          <h3 id="products-heading" style={{
            color: '#0535d2',
            marginBottom: '1rem',
            fontSize: '1.5rem',
            fontWeight: 700,
            fontFamily: "'Lato', sans-serif"
          }}>
            🎯 {t('home.products.title')} ({suite.total_products} Products) - Real Examples
          </h3>
          <p className="products-intro" style={{
            color: '#605e5c',
            marginBottom: '2rem',
            fontSize: '1.05rem',
            lineHeight: 1.6
          }}>
            {t('home.products.intro')}
            Click any product to see concrete examples.
          </p>

          <div className="eva-products">
            {products.map((product) => (
              <div
                key={product.id}
                className={`product-card ${expandedCard?.id === product.id ? 'expanded' : ''
                  }`}
                onClick={(e) => {
                  // Only navigate if this product has a demo AND not clicking a button
                  if (hasDemo(product) && !(e.target as HTMLElement).closest('button')) {
                    const routeSegment = getProductRouteSegment(product);
                    navigate(`/products/${routeSegment}`);
                  }
                }}
                style={{
                  cursor: hasDemo(product) ? 'pointer' : 'default',
                  background: hasDemo(product) ? '#ffffff' : '#fafafa',
                  border: hasDemo(product)
                    ? '2px solid #278400'
                    : '1px solid #e0e0e0',
                  borderLeft: hasDemo(product) ? '4px solid #278400' : '1px solid #e0e0e0',
                  opacity: hasDemo(product) ? 1 : 0.7,
                  boxShadow: hasDemo(product) ? '0 2px 8px rgba(39, 132, 0, 0.15)' : '0 1px 3px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (hasDemo(product)) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(39, 132, 0, 0.25)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (hasDemo(product)) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(39, 132, 0, 0.15)';
                  }
                }}
              >
                <div className="product-icon">{product.icon ?? '🧩'}</div>
                <h3 style={{
                  color: '#26374a',
                  fontSize: '1.4rem',
                  marginBottom: '1rem',
                  fontWeight: 700,
                  fontFamily: "'Lato', sans-serif"
                }}>
                  {product.name}
                </h3>
                <span className="product-category" style={{
                  background: '#f5f5f5',
                  color: '#605e5c',
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  display: 'inline-block',
                  marginTop: 'auto',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  border: '1px solid #e0e0e0'
                }}>
                  {product.category}
                </span>
                {hasDemo(product) && (
                  <span style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    padding: '0.4rem 0.75rem',
                    fontSize: '0.7rem',
                    borderRadius: '12px',
                    background: '#d8eeca',
                    border: '1.5px solid #278400',
                    color: '#278400',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: '0 2px 6px rgba(39, 132, 0, 0.2)'
                  }}>
                    ✨ {t('home.demo.badge')}
                  </span>
                )}

                {product.has_dual_buttons && (
                  <div className="product-buttons" style={{
                    display: 'flex',
                    gap: '0.75rem',
                    justifyContent: 'center',
                    marginTop: '1.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid #e0e0e0'
                  }}>
                    <button
                      className={`product-btn ${expandedCard?.id === product.id && expandedCard?.type === 'description'
                        ? 'active'
                        : ''
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        showProductInfo(product.id, 'description');
                      }}
                      style={{
                        background: expandedCard?.id === product.id && expandedCard?.type === 'description'
                          ? '#278400'
                          : '#0535d2',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        transition: 'all 0.3s',
                        textTransform: 'none'
                      }}
                    >
                      {t('product.description')}
                    </button>
                    <button
                      className={`product-btn ${expandedCard?.id === product.id && expandedCard?.type === 'usecase'
                        ? 'active'
                        : ''
                        }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        showProductInfo(product.id, 'usecase');
                      }}
                      style={{
                        background: expandedCard?.id === product.id && expandedCard?.type === 'usecase'
                          ? '#278400'
                          : '#0535d2',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        transition: 'all 0.3s',
                        textTransform: 'none'
                      }}
                    >
                      {t('product.useCase')}
                    </button>
                  </div>
                )}

                {expandedCard?.id === product.id && expandedCard?.type === 'description' && (
                  <div className="product-description" style={{
                    marginTop: '1.5rem',
                    padding: '1.5rem',
                    background: '#d7faff',
                    borderLeft: '4px solid #0535d2',
                    borderRadius: '4px',
                    color: '#26374a',
                    lineHeight: 1.6,
                    textAlign: 'left',
                    fontSize: '0.95rem'
                  }}>
                    <strong style={{ color: '#0535d2' }}>{t('product.example')}</strong> {product.description}
                    {product.moonshot && (
                      <>
                        {' '}
                        <strong style={{ color: '#0535d2' }}>{t('product.theArt')}</strong> {product.moonshot}
                      </>
                    )}
                  </div>
                )}

                {expandedCard?.id === product.id && expandedCard?.type === 'usecase' && product.use_case && (
                  <div className="product-usecase" style={{
                    marginTop: '1.5rem',
                    padding: '1.5rem',
                    background: '#d8eeca',
                    borderLeft: '4px solid #278400',
                    borderRadius: '4px',
                    color: '#26374a',
                    lineHeight: 1.6,
                    textAlign: 'left',
                    fontSize: '0.95rem'
                  }}>
                    {product.use_case.title && (
                      <>
                        <strong style={{ color: '#278400' }}>Use Case: {product.use_case.title}</strong>
                        <br />
                      </>
                    )}
                    {product.use_case.steps?.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <strong style={{ color: '#278400' }}>{idx + 1})</strong> {step}
                        <br />
                      </React.Fragment>
                    ))}
                    {product.use_case.result && (
                      <>
                        <strong style={{ color: '#278400' }}>Result:</strong> {product.use_case.result}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
