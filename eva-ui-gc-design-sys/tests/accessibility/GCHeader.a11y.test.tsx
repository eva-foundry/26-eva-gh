import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { axe } from './setup'
import { GCHeader } from '@/components/gc/GCHeader'

describe('GCHeader Accessibility Tests', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(<GCHeader />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have proper skip link with correct attributes', () => {
    const { container } = render(<GCHeader />)
    const skipLink = container.querySelector('a[href="#main-content"]')
    
    expect(skipLink).toBeInTheDocument()
    expect(skipLink).toHaveClass('sr-only')
    expect(skipLink).toHaveTextContent(/skip/i)
  })

  it('should have header landmark with banner role', () => {
    const { container } = render(<GCHeader />)
    const header = container.querySelector('header[role="banner"]')
    expect(header).toBeInTheDocument()
  })

  it('should have accessible language toggle buttons', () => {
    const { container } = render(<GCHeader />)
    const englishButton = container.querySelector('[aria-label*="English"]')
    const frenchButton = container.querySelector('[aria-label*="français"]')
    
    expect(englishButton).toBeInTheDocument()
    expect(frenchButton).toBeInTheDocument()
    expect(englishButton).toHaveAttribute('aria-pressed')
    expect(frenchButton).toHaveAttribute('aria-pressed')
  })

  it('should have minimum touch target size for interactive elements (44x44px)', () => {
    const { container } = render(<GCHeader />)
    const buttons = container.querySelectorAll('button')
    
    buttons.forEach(button => {
      const styles = window.getComputedStyle(button)
      const minHeight = parseInt(styles.minHeight || styles.height)
      expect(minHeight).toBeGreaterThanOrEqual(44)
    })
  })

  it('should have Canada flag icon with aria-hidden', () => {
    const { container } = render(<GCHeader />)
    const flag = container.querySelector('svg')
    expect(flag).toHaveAttribute('aria-hidden', 'true')
  })

  it('should support keyboard navigation', () => {
    const { container } = render(<GCHeader />)
    const interactiveElements = container.querySelectorAll('button, a')
    
    interactiveElements.forEach(element => {
      expect(element).not.toHaveAttribute('tabindex', '-1')
    })
  })

  it('should have proper focus management for skip link', () => {
    const { container } = render(<GCHeader />)
    const skipLink = container.querySelector('a[href="#main-content"]')
    
    expect(skipLink).toHaveClass('focus:not-sr-only')
    expect(skipLink).toHaveClass('focus:absolute')
  })

  it('should meet WCAG 2.2 color contrast requirements', async () => {
    const { container } = render(<GCHeader />)
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    })
    expect(results).toHaveNoViolations()
  })
})
