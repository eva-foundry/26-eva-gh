import type { ReactNode, CSSProperties, HTMLAttributes } from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'eva-gc-button': EVAGCButtonElement;
      'eva-gc-header': EVAGCHeaderElement;
      'eva-gc-footer': EVAGCFooterElement;
      'eva-language-switcher': EVALanguageSwitcherElement;
      'eva-chat-panel': EVAChatPanelElement;
      'eva-chat-message': EVAChatMessageElement;
      'eva-hero-banner': EVAHeroBannerElement;
      'eva-program-card': EVAProgramCardElement;
      'eva-breadcrumbs': EVABreadcrumbsElement;
      'eva-skip-links': EVASkipLinksElement;
      'eva-pagination': EVAPaginationElement;
      'eva-container': EVAContainerElement;
      'eva-page-shell': EVAPageShellElement;
    }
  }
}

interface BaseWebComponentProps extends HTMLAttributes<HTMLElement> {
  ref?: any;
  children?: ReactNode;
  class?: string;
  style?: CSSProperties;
}

export interface EVAGCButtonElement extends BaseWebComponentProps {
  variant?: 'primary' | 'secondary' | 'supertask' | 'danger' | 'link' | 'contextual-signin';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  'aria-label'?: string;
}

export interface EVAGCHeaderElement extends BaseWebComponentProps {
  profile?: 'canada_gc' | 'usa_gov' | 'uk_gov' | 'australia_gov' | 'nz_gov';
  'app-name-key'?: string;
  'app-name'?: string;
}

export interface EVAGCFooterElement extends BaseWebComponentProps {
  profile?: 'canada_gc' | 'usa_gov' | 'uk_gov' | 'australia_gov' | 'nz_gov';
}

export interface EVALanguageSwitcherElement extends BaseWebComponentProps {
  'current-locale'?: string;
}

export interface EVAChatPanelElement extends BaseWebComponentProps {
  'welcome-message'?: string;
  placeholder?: string;
}

export interface EVAChatMessageElement extends BaseWebComponentProps {
  role?: 'user' | 'assistant' | 'system';
  timestamp?: string;
  avatar?: string;
}

export interface EVAHeroBannerElement extends BaseWebComponentProps {
  'title-key'?: string;
  'description-key'?: string;
  title?: string;
  description?: string;
  'background-image'?: string;
}

export interface EVAProgramCardElement extends BaseWebComponentProps {
  'title-key'?: string;
  'description-key'?: string;
  title?: string;
  description?: string;
  icon?: string;
  href?: string;
}

export interface EVABreadcrumbsElement extends BaseWebComponentProps {
  'aria-label'?: string;
}

export interface EVASkipLinksElement extends BaseWebComponentProps {}

export interface EVAPaginationElement extends BaseWebComponentProps {
  'current-page'?: number;
  'total-pages'?: number;
  'aria-label'?: string;
}

export interface EVAContainerElement extends BaseWebComponentProps {
  'max-width'?: string;
}

export interface EVAPageShellElement extends BaseWebComponentProps {
  profile?: 'canada_gc' | 'usa_gov' | 'uk_gov' | 'australia_gov' | 'nz_gov';
}

export interface EVACustomEvent<T = any> extends CustomEvent<T> {
  detail: T;
}
