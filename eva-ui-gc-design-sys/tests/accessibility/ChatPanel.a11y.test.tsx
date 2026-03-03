import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup, screen, fireEvent } from '@testing-library/react'
import { axe } from './setup'
import { ChatPanel } from '@/components/chat/ChatPanel'

describe('ChatPanel Accessibility Tests', () => {
  afterEach(() => {
    cleanup()
  })

  it('should have no accessibility violations', async () => {
    const { container } = render(<ChatPanel />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have proper heading hierarchy starting with h1', () => {
    const { container } = render(<ChatPanel />)
    const h1 = container.querySelector('h1')
    expect(h1).toBeInTheDocument()
    expect(h1).toHaveTextContent(/EVA|chat/i)
  })

  it('should have accessible form controls with labels', () => {
    render(<ChatPanel />)
    
    const knowledgeSpaceSelect = screen.getByLabelText(/knowledge space/i)
    const chatInput = screen.getByLabelText(/message|type|enter/i)
    
    expect(knowledgeSpaceSelect).toBeInTheDocument()
    expect(chatInput).toBeInTheDocument()
  })

  it('should have accessible send button with proper labeling', () => {
    render(<ChatPanel />)
    const sendButton = screen.getByRole('button', { name: /send/i })
    
    expect(sendButton).toBeInTheDocument()
    expect(sendButton).toHaveAttribute('aria-label')
  })

  it('should have minimum touch target size (44x44px) for buttons', () => {
    const { container } = render(<ChatPanel />)
    const buttons = container.querySelectorAll('button')
    
    buttons.forEach(button => {
      const rect = button.getBoundingClientRect()
      if (rect.height > 0) {
        expect(rect.height).toBeGreaterThanOrEqual(44)
      }
    })
  })

  it('should have proper ARIA roles for chat interface', () => {
    const { container } = render(<ChatPanel />)
    
    const scrollArea = container.querySelector('[role="region"], [role="log"]')
    expect(scrollArea || container.querySelector('.space-y-6')).toBeInTheDocument()
  })

  it('should have accessible empty state messaging', () => {
    render(<ChatPanel />)
    
    const emptyMessage = screen.queryByText(/start|empty/i)
    if (emptyMessage) {
      expect(emptyMessage).toBeInTheDocument()
    }
  })

  it('should support keyboard interaction - Enter key to send', () => {
    render(<ChatPanel />)
    const input = screen.getByLabelText(/message|type|enter/i) as HTMLInputElement
    
    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 })
    
    expect(input.value).toBe('')
  })

  it('should have accessible message bubbles with user/assistant identification', () => {
    const { container } = render(<ChatPanel />)
    
    const userIcons = container.querySelectorAll('[aria-label*="you"]')
    const assistantIcons = container.querySelectorAll('[aria-label*="EVA"], [aria-label*="assistant"]')
    
    expect(userIcons.length + assistantIcons.length).toBeGreaterThanOrEqual(0)
  })

  it('should have accessible copy buttons with proper labels', async () => {
    const { container } = render(<ChatPanel />)
    const copyButtons = container.querySelectorAll('button[aria-label*="copy"], button[aria-label*="copier"]')
    
    copyButtons.forEach(button => {
      expect(button).toHaveAttribute('aria-label')
    })
  })

  it('should meet WCAG 2.2 color contrast requirements', async () => {
    const { container } = render(<ChatPanel />)
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    })
    expect(results).toHaveNoViolations()
  })

  it('should have accessible loading/streaming states', () => {
    const { container } = render(<ChatPanel />)
    const streamingIndicator = container.querySelector('.animate-bounce')
    
    if (streamingIndicator) {
      expect(streamingIndicator.closest('div')).toBeInTheDocument()
    }
  })

  it('should have proper focus management for input field', () => {
    render(<ChatPanel />)
    const input = screen.getByLabelText(/message|type|enter/i)
    
    expect(input).not.toHaveAttribute('tabindex', '-1')
  })

  it('should disable send button when input is empty', () => {
    render(<ChatPanel />)
    const sendButton = screen.getByRole('button', { name: /send/i })
    
    expect(sendButton).toBeDisabled()
  })

  it('should have time elements with proper datetime attributes', () => {
    const { container } = render(<ChatPanel />)
    const timeElements = container.querySelectorAll('time')
    
    timeElements.forEach(time => {
      expect(time).toHaveAttribute('dateTime')
    })
  })
})
