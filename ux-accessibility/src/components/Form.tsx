// src/components/Form.tsx
import React from 'react';

export interface AccessibleFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  ariaLabel?: string;
}

export const AccessibleForm: React.FC<AccessibleFormProps> = ({
  children,
  onSubmit,
  ariaLabel,
}) => (
  <form onSubmit={onSubmit} aria-label={ariaLabel} tabIndex={0}>
    {children}
  </form>
);
