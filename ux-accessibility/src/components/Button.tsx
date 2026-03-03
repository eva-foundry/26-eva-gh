// src/components/Button.tsx
import React from 'react';

export interface AccessibleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
  disabled?: boolean;
}

export const AccessibleButton: React.FC<AccessibleButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  disabled = false,
}) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    disabled={disabled}
    tabIndex={0}
    style={{ minWidth: 120, minHeight: 40 }}
  >
    {children}
  </button>
);
