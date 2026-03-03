import { expect } from 'vitest'
import { configureAxe, toHaveNoViolations } from 'vitest-axe'
import '@testing-library/jest-dom/vitest'

expect.extend(toHaveNoViolations)

export const axe = configureAxe({
  rules: {
    'color-contrast': { enabled: true },
    'label': { enabled: true },
    'button-name': { enabled: true },
    'link-name': { enabled: true },
    'image-alt': { enabled: true },
    'aria-allowed-attr': { enabled: true },
    'aria-required-children': { enabled: true },
    'aria-required-parent': { enabled: true },
    'aria-roles': { enabled: true },
    'aria-valid-attr': { enabled: true },
    'aria-valid-attr-value': { enabled: true },
    'duplicate-id': { enabled: true },
    'heading-order': { enabled: true },
    'html-has-lang': { enabled: true },
    'landmark-one-main': { enabled: true },
    'page-has-heading-one': { enabled: true },
    'region': { enabled: true },
    'skip-link': { enabled: true },
  }
})
