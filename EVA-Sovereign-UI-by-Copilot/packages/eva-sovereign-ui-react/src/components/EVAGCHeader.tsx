import React, { forwardRef } from 'react';
import type { EVAGCHeaderElement } from '../types';

export interface EVAGCHeaderProps extends Omit<EVAGCHeaderElement, 'ref'> {}

export const EVAGCHeader = forwardRef<HTMLElement, EVAGCHeaderProps>(
  ({ children, ...props }, ref) => {
    return (
      <eva-gc-header ref={ref as any} {...props}>
        {children}
      </eva-gc-header>
    );
  }
);

EVAGCHeader.displayName = 'EVAGCHeader';
