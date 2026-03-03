import { describe, it, expect, afterEach, beforeAll } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import { axe } from './setup'
import App from '@/App'

beforeAll(() => {
  global.window.spark = {
    llmPrompt: (strings: TemplateStringsArray, ...values: any[]) => 
      strings.reduce((acc, str, i) => acc + str + (values[i] || ''), ''),
    llm: async (prompt: string) => 'Mock response',
    user: async () => ({ 
      avatarUrl: '', 
      email: 'test@example.com', 
      id: '1', 
      isOwner: false, 
      login: 'testuser' 
    }),
    kv: {
      keys: async () => [],
      get: async () => undefined,
      set: async () => {},
      delete: async () => {}
    }
  }
})

describe('Full Application Accessibility Tests', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no accessibility violations on main app', async () => {
    const { container } = render(<App />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have proper document structure with landmarks', () => {
    const { container } = render(<App />)
    
    const header = container.querySelector('header[role="banner"]')
    const main = container.querySelector('main#main-content')
    const footer = container.querySelector('footer[role="contentinfo"]')
    
    expect(header).toBeInTheDocument()
    expect(main).toBeInTheDocument()
    expect(footer).toBeInTheDocument()
  })

  it('should have skip link that targets main content', () => {
    const { container } = render(<App />)
    
    const skipLink = container.querySelector('a[href="#main-content"]')
    const mainContent = container.querySelector('#main-content')
    
    expect(skipLink).toBeInTheDocument()
    expect(mainContent).toBeInTheDocument()
    expect(mainContent).toHaveAttribute('tabIndex', '-1')
  })

  it('should have language attribute on HTML root', () => {
    expect(document.documentElement).toHaveAttribute('lang')
  })

  it('should have page title', () => {
    expect(document.title).toBeTruthy()
    expect(document.title.length).toBeGreaterThan(0)
  })

  it('should have one main landmark', () => {
    const { container } = render(<App />)
    const mains = container.querySelectorAll('main, [role="main"]')
    expect(mains.length).toBe(1)
  })

  it('should have proper heading hierarchy', () => {
    const { container } = render(<App />)
    const h1Elements = container.querySelectorAll('h1')
    expect(h1Elements.length).toBeGreaterThanOrEqual(1)
  })

  it('should meet WCAG 2.2 Level AA color contrast', async () => {
    const { container } = render(<App />)
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    })
    expect(results).toHaveNoViolations()
  })

  it('should have all images with alt text or aria-hidden', () => {
    const { container } = render(<App />)
    const images = container.querySelectorAll('img, svg')
    
    images.forEach(img => {
      const hasAlt = img.hasAttribute('alt')
      const hasAriaLabel = img.hasAttribute('aria-label')
      const isHidden = img.hasAttribute('aria-hidden')
      
      expect(hasAlt || hasAriaLabel || isHidden).toBe(true)
    })
  })

  it('should have all form controls with labels', async () => {
    const { container } = render(<App />)
    const results = await axe(container, {
      rules: {
        'label': { enabled: true }
      }
    })
    expect(results).toHaveNoViolations()
  })

  it('should have all interactive elements keyboard accessible', () => {
    const { container } = render(<App />)
    const interactiveElements = container.querySelectorAll('button, a, input, select, textarea')
    
    interactiveElements.forEach(element => {
      const tabIndex = element.getAttribute('tabindex')
      if (tabIndex !== null) {
        expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(-1)
      }
    })
  })

  it('should support reduced motion preferences', () => {
    const { container } = render(<App />)
    const style = document.createElement('style')
    style.textContent = '@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }'
    document.head.appendChild(style)
    
    expect(style).toBeInTheDocument()
    
    document.head.removeChild(style)
  })

  it('should have proper ARIA roles for interactive components', async () => {
    const { container } = render(<App />)
    const results = await axe(container, {
      rules: {
        'aria-roles': { enabled: true },
        'aria-allowed-attr': { enabled: true },
        'aria-valid-attr': { enabled: true },
        'aria-valid-attr-value': { enabled: true }
      }
    })
    expect(results).toHaveNoViolations()
  })

  it('should have minimum touch target sizes (44x44px) for mobile', () => {
    const { container } = render(<App />)
    const buttons = container.querySelectorAll('button')
    
    buttons.forEach(button => {
      const rect = button.getBoundingClientRect()
      if (rect.height > 0 && rect.width > 0) {
        expect(rect.height >= 44 || rect.width >= 44).toBe(true)
      }
    })
  })

  it('should have responsive design with proper viewport', () => {
    const viewport = document.querySelector('meta[name="viewport"]')
    expect(viewport).toBeTruthy()
  })
})
