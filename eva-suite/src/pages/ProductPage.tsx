import React from 'react';
import { useParams, Link } from 'react-router-dom';
import rawData from '../data/eva-suite-products.json';
import type { EvaProduct } from '../components/ProductCard';
import { useI18n } from '../i18n/i18n';
import LiveOpsDashboard from '../components/LiveOpsDashboard';
import EvaDaDemo from '../components/EvaDaDemo';
import EvaDevCrewDemo from '../components/EvaDevCrewDemo';
import EvaAccessibilityDemo from '../components/EvaAccessibilityDemo';
import EvaImpactAnalyzerDemo from '../components/EvaImpactAnalyzerDemo';
import EvaProcessMapperDemo from '../components/EvaProcessMapperDemo';
import InfoAssistantDemo from '../components/InfoAssistantDemo';
import { findProductByRouteParam } from '../utils/productRoutes';

interface EvaSuiteJson {
  eva_suite: {
    products: (EvaProduct & {
      use_case?: {
        title?: string;
        steps?: string[];
        result?: string;
      } | null;
      moonshot?: string;
    })[];
  };
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const { t } = useI18n();
  const data = rawData as unknown as EvaSuiteJson;
  const products = data.eva_suite.products || [];
  const product = findProductByRouteParam(products, id);

  if (!product) {
    return (
      <div>
        <p style={{ fontSize: '0.9rem' }}>Product not found.</p>
        <p>
          <Link to="/">← Back to all products</Link>
        </p>
      </div>
    );
  }

  const isLiveOps = product.name.toLowerCase().includes('liveops');
  const isEvaDa = product.name.toLowerCase().includes('eva da');
  const isDevTools = product.name.toLowerCase().includes('devtools');
  const isAccessibility = product.name.toLowerCase().includes('accessibility');
  const isImpactAnalyzer = product.name.toLowerCase().includes('impact analyzer');
  const isProcessMapper = product.name.toLowerCase().includes('process mapper');
  const isInfoAssistant = product.name.toLowerCase().includes('info assistant');

  return (
    <div className="product-layout">
      <p style={{ fontSize: '0.75rem' }}>
        <Link to="/">← {t('productPage.back')}</Link>
      </p>

      <header className="product-header">
        <span className="product-header-icon" aria-hidden="true">
          {product.icon ?? '🧩'}
        </span>
        <div>
          <h1 className="product-header-title">{product.name}</h1>
          <div className="product-header-category">{product.category}</div>
        </div>
      </header>

      <section>
        <h2 className="product-section-title">{t('productPage.overview')}</h2>
        <p className="product-section-body">{product.description}</p>
      </section>

      {product.use_case && (
        <section>
          <h2 className="product-section-title">{t('productPage.sampleUseCase')}</h2>
          {product.use_case.title && (
            <p className="product-section-body">
              <strong>{product.use_case.title}</strong>
            </p>
          )}
          {product.use_case.steps && product.use_case.steps.length > 0 && (
            <ol className="product-usecase-steps">
              {product.use_case.steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          )}
          {product.use_case.result && (
            <p className="product-section-body">{product.use_case.result}</p>
          )}
        </section>
      )}

      {product.moonshot && (
        <section>
          <h2 className="product-section-title">{t('productPage.moonshot')}</h2>
          <p className="product-section-body">{product.moonshot}</p>
        </section>
      )}

      {/* Placeholder where hero demos will plug in */}
      {isLiveOps && (
        <section style={{ marginTop: '1rem' }}>
          <LiveOpsDashboard />
        </section>
      )}

      {isEvaDa && (
        <section style={{ marginTop: '1rem' }}>
          <EvaDaDemo />
        </section>
      )}

      {isDevTools && (
        <section style={{ marginTop: '1rem' }}>
          <EvaDevCrewDemo />
        </section>
      )}

      {isAccessibility && (
        <section style={{ marginTop: '1rem' }}>
          <EvaAccessibilityDemo />
        </section>
      )}

      {isImpactAnalyzer && (
        <section style={{ marginTop: '1rem' }}>
          <EvaImpactAnalyzerDemo />
        </section>
      )}

      {isProcessMapper && (
        <section style={{ marginTop: '1rem' }}>
          <EvaProcessMapperDemo />
        </section>
      )}

      {isInfoAssistant && (
        <section style={{ marginTop: '1rem' }}>
          <InfoAssistantDemo />
        </section>
      )}
    </div>
  );
};

export default ProductPage;
