export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
    const announcer = document.createElement('div')
    announcer.setAttribute('role', 'status')
    announcer.setAttribute('aria-live', priority)
    announcer.setAttribute('aria-atomic', 'true')
    announcer.className = 'sr-only'
    announcer.textContent = message
    
    document.body.appendChild(announcer)
    
    setTimeout(() => {
        document.body.removeChild(announcer)
    }, 1000)
}

export function trapFocus(element: HTMLElement) {
    const focusableElements = element.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    const firstFocusable = focusableElements[0]
    const lastFocusable = focusableElements[focusableElements.length - 1]
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                e.preventDefault()
                lastFocusable.focus()
            }
        } else {
            if (document.activeElement === lastFocusable) {
                e.preventDefault()
                firstFocusable.focus()
            }
        }
    }
    
    element.addEventListener('keydown', handleKeyDown)
    
    return () => {
        element.removeEventListener('keydown', handleKeyDown)
    }
}

export function getContrastRatio(color1: string, color2: string): number {
    const getLuminance = (color: string): number => {
        const rgb = color.match(/\d+/g)?.map(Number) || [0, 0, 0]
        const [r, g, b] = rgb.map(val => {
            const sRGB = val / 255
            return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4)
        })
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    
    const lum1 = getLuminance(color1)
    const lum2 = getLuminance(color2)
    const lighter = Math.max(lum1, lum2)
    const darker = Math.min(lum1, lum2)
    
    return (lighter + 0.05) / (darker + 0.05)
}

export function isReducedMotion(): boolean {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function manageFocus(callback: () => void) {
    const previousActiveElement = document.activeElement as HTMLElement
    
    callback()
    
    return () => {
        previousActiveElement?.focus()
    }
}
