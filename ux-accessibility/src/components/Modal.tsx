// src/components/Modal.tsx
import React from 'react';

export interface AccessibleModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  ariaLabel?: string;
}

export const AccessibleModal: React.FC<AccessibleModalProps> = ({
  children,
  isOpen,
  onClose,
  ariaLabel,
}) => (
  isOpen ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      tabIndex={-1}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: '#0008', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 300 }}>
        {children}
        <button onClick={onClose} aria-label="Close modal">Close</button>
      </div>
    </div>
  ) : null
);
