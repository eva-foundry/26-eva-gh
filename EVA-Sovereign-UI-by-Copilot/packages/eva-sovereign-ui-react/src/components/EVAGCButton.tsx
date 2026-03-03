import React, { forwardRef } from 'react';
import type { EVAGCButtonElement } from '../types';

export interface EVAGCButtonProps extends Omit<EVAGCButtonElement, 'ref'> {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export const EVAGCButton = forwardRef<HTMLElement, EVAGCButtonProps>(
  ({ children, onClick, ...props }, ref) => {
    const handleClick = (e: any) => {
      onClick?.(e);
    };

    return (
      <eva-gc-button ref={ref as any} {...props} onClick={handleClick}>
        {children}
      </eva-gc-button>
    );
  }
);

EVAGCButton.displayName = 'EVAGCButton';
