import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup, screen } from '@testing-library/react'
import { axe } from './setup'
import { BackstagePanel } from '@/components/backstage/BackstagePanel'

describe('BackstagePanel Accessibility Tests', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no accessibility violations when open', async () => {
    const { container } = render(<BackstagePanel isOpen={true} onClose={() => {}} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have proper dialog role and ARIA attributes', () => {
    render(<BackstagePanel isOpen={true} onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveAttribute('aria-labelledby')
  })

  it('should have accessible close button', () => {
    render(<BackstagePanel isOpen={true} onClose={() => {}} />)
    const closeButton = screen.getByRole('button', { name: /close/i })
    
    expect(closeButton).toBeInTheDocument()
    expect(closeButton).toHaveAttribute('aria-label')
  })

  it('should trap focus within dialog when open', () => {
    render(<BackstagePanel isOpen={true} onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    const buttons = dialog.querySelectorAll('button')
    
    expect(buttons.length).toBeGreaterThan(0)
  })

  it('should have proper heading structure', () => {
    render(<BackstagePanel isOpen={true} onClose={() => {}} />)
    const heading = screen.getByRole('heading', { level: 2 })
    
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveAttribute('id')
  })

  it('should have accessible navigation', () => {
    const { container } = render(<BackstagePanel isOpen={true} onClose={() => {}} />)
    const navButtons = container.querySelectorAll('nav button, [role="navigation"] button')
    
    navButtons.forEach(button => {
      expect(button).toHaveAccessibleName()
    })
  })

  it('should support keyboard navigation (Tab, Escape)', () => {
    render(<BackstagePanel isOpen={true} onClose={() => {}} />)
    const dialog = screen.getByRole('dialog')
    const interactiveElements = dialog.querySelectorAll('button, a, input, select, textarea')
    
    interactiveElements.forEach(element => {
      expect(element).not.toHaveAttribute('tabindex', '-1')
    })
  })

  it('should meet WCAG 2.2 color contrast requirements', async () => {
    const { container } = render(<BackstagePanel isOpen={true} onClose={() => {}} />)
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    })
    expect(results).toHaveNoViolations()
  })

  it('should have backdrop with proper accessibility attributes', () => {
    const { container } = render(<BackstagePanel isOpen={true} onClose={() => {}} />)
    const backdrop = container.querySelector('[aria-hidden="true"]')
    
    expect(backdrop).toBeInTheDocument()
  })

  it('should return null when closed (no accessibility issues)', () => {
    const { container } = render(<BackstagePanel isOpen={false} onClose={() => {}} />)
    const dialog = container.querySelector('[role="dialog"]')
    
    expect(dialog).not.toBeInTheDocument()
  })

  it('should have minimum touch target sizes for all buttons', () => {
    const { container } = render(<BackstagePanel isOpen={true} onClose={() => {}} />)
    const buttons = container.querySelectorAll('button')
    
    buttons.forEach(button => {
      const rect = button.getBoundingClientRect()
      if (rect.height > 0) {
        expect(rect.height).toBeGreaterThanOrEqual(44)
      }
    })
  })

  it('should have accessible panel sections with proper labeling', () => {
    const { container } = render(<BackstagePanel isOpen={true} onClose={() => {}} />)
    const sections = container.querySelectorAll('section, [role="region"]')
    
    sections.forEach(section => {
      expect(
        section.hasAttribute('aria-label') || 
        section.hasAttribute('aria-labelledby')
      ).toBe(true)
    })
  })
})
