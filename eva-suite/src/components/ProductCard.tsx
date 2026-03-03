import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getProductRouteSegment } from '../utils/productRoutes';

export interface EvaProduct {
  id: number;
  name: string;
  icon?: string;
  category: string;
  description: string;
  has_dual_buttons?: boolean;
}

interface ProductCardProps {
  product: EvaProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const routeSegment = getProductRouteSegment(product);
    navigate(`/products/${routeSegment}`);
  };

  return (
    <article className="product-card" onClick={handleClick}>
      <div className="product-card-title-row">
        <div className="product-card-icon" aria-hidden="true">
          {product.icon ?? '🧩'}
        </div>
        <div>
          <div className="product-card-name">{product.name}</div>
          <div className="product-card-category">{product.category}</div>
        </div>
      </div>
      <p className="product-card-description">{product.description}</p>
      {product.has_dual_buttons && (
        <span className="product-badge">Dual-mode demo</span>
      )}
    </article>
  );
};

export default ProductCard;
