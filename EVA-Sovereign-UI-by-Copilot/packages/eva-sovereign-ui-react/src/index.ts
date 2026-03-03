// Import Web Components to register them
import '@eva-suite/sovereign-ui';

// Export React wrappers
export { EVAGCButton } from './components/EVAGCButton';
export { EVAGCHeader } from './components/EVAGCHeader';
export { EVAGCFooter } from './components/EVAGCFooter';
export { EVALanguageSwitcher } from './components/EVALanguageSwitcher';
export { EVAChatPanel } from './components/EVAChatPanel';

// Export types
export type { EVAGCButtonProps } from './components/EVAGCButton';
export type { EVAGCHeaderProps } from './components/EVAGCHeader';
export type { EVAGCFooterProps } from './components/EVAGCFooter';
export type { EVALanguageSwitcherProps } from './components/EVALanguageSwitcher';
export type { EVAChatPanelProps, EVAChatPanelRef } from './components/EVAChatPanel';

export type * from './types';
