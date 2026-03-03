import React, { type ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  title?: string;
  style?: React.CSSProperties;
}

const Card: React.FC<CardProps> = ({ children, title, style }) => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        padding: '2rem',
        borderRadius: '12px',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        ...style,
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: '1.8rem',
            marginBottom: '1.5rem',
            fontWeight: 600,
          }}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card;
