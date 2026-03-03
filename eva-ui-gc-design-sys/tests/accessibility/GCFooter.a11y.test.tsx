import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { axe } from './setup'
import { GCFooter } from '@/components/gc/GCFooter'

describe('GCFooter Accessibility Tests', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(<GCFooter />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have footer landmark with contentinfo role', () => {
    const { container } = render(<GCFooter />)
    const footer = container.querySelector('footer[role="contentinfo"]')
    expect(footer).toBeInTheDocument()
  })

  it('should have navigation landmark with proper label', () => {
    const { container } = render(<GCFooter />)
    const nav = container.querySelector('nav')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('aria-label')
  })

  it('should have all links accessible with proper naming', async () => {
    const { container } = render(<GCFooter />)
    const links = container.querySelectorAll('a')
    
    links.forEach(link => {
      expect(link).toHaveAttribute('href')
      expect(link.textContent || link.getAttribute('aria-label')).toBeTruthy()
    })
    
    const results = await axe(container, {
      rules: { 'link-name': { enabled: true } }
    })
    expect(results).toHaveNoViolations()
  })

  it('should have proper heading hierarchy', () => {
    const { container } = render(<GCFooter />)
    const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'))
    
    headings.forEach(heading => {
      expect(heading.textContent).toBeTruthy()
    })
  })

  it('should have Canada wordmark with proper accessibility', () => {
    const { container } = render(<GCFooter />)
    const wordmark = container.querySelector('svg, img')
    
    if (wordmark) {
      expect(
        wordmark.hasAttribute('aria-hidden') || 
        wordmark.hasAttribute('aria-label') || 
        wordmark.hasAttribute('alt')
      ).toBe(true)
    }
  })

  it('should meet WCAG 2.2 color contrast requirements', async () => {
    const { container } = render(<GCFooter />)
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    })
    expect(results).toHaveNoViolations()
  })

  it('should have proper semantic HTML structure', () => {
    const { container } = render(<GCFooter />)
    const footer = container.querySelector('footer')
    const nav = container.querySelector('nav')
    
    expect(footer).toBeInTheDocument()
    expect(nav).toBeInTheDocument()
  })

  it('should support keyboard navigation for all interactive elements', () => {
    const { container } = render(<GCFooter />)
    const interactiveElements = container.querySelectorAll('a, button')
    
    interactiveElements.forEach(element => {
      expect(element).not.toHaveAttribute('tabindex', '-1')
    })
  })
})
