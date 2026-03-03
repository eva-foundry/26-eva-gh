import React, { forwardRef } from 'react';
import type { EVAGCFooterElement } from '../types';

export interface EVAGCFooterProps extends Omit<EVAGCFooterElement, 'ref'> {}

export const EVAGCFooter = forwardRef<HTMLElement, EVAGCFooterProps>(
  ({ children, ...props }, ref) => {
    return (
      <eva-gc-footer ref={ref as any} {...props}>
        {children}
      </eva-gc-footer>
    );
  }
);

EVAGCFooter.displayName = 'EVAGCFooter';
