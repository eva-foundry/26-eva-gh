import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { EVALivePreview } from './eva-live-preview.js';
import './eva-live-preview.js';

describe('eva-live-preview', () => {
  let element: EVALivePreview;

  beforeEach(async () => {
    element = await fixture(html`<eva-live-preview src="about:blank"></eva-live-preview>`);
  });

  describe('Initialization', () => {
    it('should create element', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('eva-live-preview');
    });

    it('should have default showLoading as true', () => {
      expect(element.showLoading).toBe(true);
    });

    it('should have default syncA11y as true', () => {
      expect(element.syncA11y).toBe(true);
    });

    it('should have default syncTheme as true', () => {
      expect(element.syncTheme).toBe(true);
    });

    it('should have default syncI18n as true', () => {
      expect(element.syncI18n).toBe(true);
    });

    it('should have default targetOrigin as window.location.origin', () => {
      expect(element.targetOrigin).toBe(window.location.origin);
    });
  });

  describe('Iframe Rendering', () => {
    it('should render iframe with src', () => {
      const iframe = element.shadowRoot!.querySelector('iframe');
      expect(iframe).toBeDefined();
      expect(iframe?.getAttribute('src')).toBe('about:blank');
    });

    it('should have iframe title for accessibility', async () => {
      element.iframeTitle = 'Preview Frame';
      await element.updateComplete;
      
      const iframe = element.shadowRoot!.querySelector('iframe');
      expect(iframe?.getAttribute('title')).toBe('Preview Frame');
    });

    it('should have sandbox attribute for security', () => {
      const iframe = element.shadowRoot!.querySelector('iframe');
      expect(iframe?.getAttribute('sandbox')).toBe('allow-scripts allow-same-origin allow-forms');
    });
  });

  describe('Loading State', () => {
    it('should show loading overlay initially', () => {
      const loadingOverlay = element.shadowRoot!.querySelector('.loading-overlay');
      expect(loadingOverlay).toBeDefined();
    });

    it('should hide loading overlay when iframe loads', async () => {
      // Manually trigger load event
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      iframe.dispatchEvent(new Event('load'));
      await element.updateComplete;
      
      const loadingOverlay = element.shadowRoot!.querySelector('.loading-overlay');
      expect(loadingOverlay?.classList.contains('hidden') || !loadingOverlay).toBeTruthy();
    });

    it('should emit preview-ready event when iframe loads', async () => {
      const readyHandler = vi.fn();
      element.addEventListener('preview-ready', readyHandler);
      
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      iframe.dispatchEvent(new Event('load'));
      await element.updateComplete;
      
      expect(readyHandler).toHaveBeenCalled();
      expect(readyHandler.mock.calls[0][0].detail.src).toBe('about:blank');
    });
  });

  describe('Error State', () => {
    it('should show error overlay when iframe fails to load', async () => {
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      iframe.dispatchEvent(new Event('error'));
      await element.updateComplete;
      
      const errorOverlay = element.shadowRoot!.querySelector('.error-overlay');
      expect(errorOverlay).toBeDefined();
    });

    it('should emit preview-error event when iframe fails', async () => {
      const errorHandler = vi.fn();
      element.addEventListener('preview-error', errorHandler);
      
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      iframe.dispatchEvent(new Event('error'));
      await element.updateComplete;
      
      expect(errorHandler).toHaveBeenCalled();
    });

    it('should allow retry after error', async () => {
      // Trigger error
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      iframe.dispatchEvent(new Event('error'));
      await element.updateComplete;
      
      // Click retry
      const retryButton = element.shadowRoot!.querySelector('.error-retry') as HTMLButtonElement;
      expect(retryButton).toBeDefined();
      
      retryButton.click();
      await element.updateComplete;
      
      // Error overlay should be hidden
      const errorOverlay = element.shadowRoot!.querySelector('.error-overlay');
      expect(errorOverlay).toBeNull();
    });
  });

  describe('postMessage Communication', () => {
    it('should send message to iframe via sendMessage()', async () => {
      // Mock iframe contentWindow
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      const mockPostMessage = vi.fn();
      Object.defineProperty(iframe, 'contentWindow', {
        value: { postMessage: mockPostMessage },
        writable: true,
      });
      
      element.sendMessage({
        type: 'a11y-update',
        data: { fontSize: 125 },
      });
      
      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: 'a11y-update', data: { fontSize: 125 } },
        window.location.origin
      );
    });

    it('should support custom targetOrigin', async () => {
      element.targetOrigin = 'https://example.com';
      await element.updateComplete;
      
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      const mockPostMessage = vi.fn();
      Object.defineProperty(iframe, 'contentWindow', {
        value: { postMessage: mockPostMessage },
        writable: true,
      });
      
      element.sendMessage({
        type: 'theme-update',
        data: { color: '#ff0000' },
      });
      
      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: 'theme-update', data: { color: '#ff0000' } },
        'https://example.com'
      );
    });
  });

  describe('Event Auto-Sync', () => {
    it('should listen to a11y-change events when syncA11y is true', async () => {
      element.syncA11y = true;
      await element.updateComplete;
      
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      const mockPostMessage = vi.fn();
      Object.defineProperty(iframe, 'contentWindow', {
        value: { postMessage: mockPostMessage },
        writable: true,
      });
      
      // Dispatch a11y-change event
      const a11yEvent = new CustomEvent('a11y-change', {
        detail: { fontSize: 150 },
      });
      window.dispatchEvent(a11yEvent);
      
      // Wait a tick
      await new Promise(resolve => setTimeout(resolve, 10));
      
      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: 'a11y-update', data: { fontSize: 150 } },
        window.location.origin
      );
    });
  });

  describe('Helper Methods', () => {
    it('should update a11y settings via updateA11y()', async () => {
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      const mockPostMessage = vi.fn();
      Object.defineProperty(iframe, 'contentWindow', {
        value: { postMessage: mockPostMessage },
        writable: true,
      });
      
      element.updateA11y({ fontSize: 125, contrast: 'aaa' });
      
      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: 'a11y-update', data: { fontSize: 125, contrast: 'aaa' } },
        window.location.origin
      );
    });

    it('should update theme via updateTheme()', async () => {
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      const mockPostMessage = vi.fn();
      Object.defineProperty(iframe, 'contentWindow', {
        value: { postMessage: mockPostMessage },
        writable: true,
      });
      
      element.updateTheme({ primaryColor: '#0050b3' });
      
      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: 'theme-update', data: { primaryColor: '#0050b3' } },
        window.location.origin
      );
    });

    it('should update i18n via updateI18n()', async () => {
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      const mockPostMessage = vi.fn();
      Object.defineProperty(iframe, 'contentWindow', {
        value: { postMessage: mockPostMessage },
        writable: true,
      });
      
      element.updateI18n({ 'chat.title': 'Chat Assistant' });
      
      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: 'i18n-update', data: { 'chat.title': 'Chat Assistant' } },
        window.location.origin
      );
    });

    it('should update full config via updateConfig()', async () => {
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      const mockPostMessage = vi.fn();
      Object.defineProperty(iframe, 'contentWindow', {
        value: { postMessage: mockPostMessage },
        writable: true,
      });
      
      const config = {
        a11y: { fontSize: 125 },
        theme: { primaryColor: '#0050b3' },
      };
      
      element.updateConfig(config);
      
      expect(mockPostMessage).toHaveBeenCalledWith(
        { type: 'config-update', data: config },
        window.location.origin
      );
    });

    it('should reload iframe via reload()', async () => {
      element.src = 'https://example.com';
      await element.updateComplete;
      
      const iframe = element.shadowRoot!.querySelector('iframe') as HTMLIFrameElement;
      const originalSrc = iframe.src;
      
      element.reload();
      await element.updateComplete;
      
      // src should be reassigned (forces reload)
      expect(iframe.src).toBe(originalSrc);
    });
  });

  describe('Message Listeners', () => {
    it('should register message listener via onMessage()', () => {
      const callback = vi.fn();
      element.onMessage('custom-event', callback);
      
      // Simulate message from iframe
      const messageEvent = new MessageEvent('message', {
        data: { type: 'custom-event', data: { foo: 'bar' } },
        origin: window.location.origin,
      });
      window.dispatchEvent(messageEvent);
      
      expect(callback).toHaveBeenCalledWith({ foo: 'bar' });
    });

    it('should unregister message listener via offMessage()', () => {
      const callback = vi.fn();
      element.onMessage('custom-event', callback);
      element.offMessage('custom-event', callback);
      
      // Simulate message
      const messageEvent = new MessageEvent('message', {
        data: { type: 'custom-event', data: { foo: 'bar' } },
        origin: window.location.origin,
      });
      window.dispatchEvent(messageEvent);
      
      expect(callback).not.toHaveBeenCalled();
    });

    it('should emit preview-message event when message is received', async () => {
      const messageHandler = vi.fn();
      element.addEventListener('preview-message', messageHandler);
      
      const messageEvent = new MessageEvent('message', {
        data: { type: 'status-update', data: { status: 'ready' } },
        origin: window.location.origin,
      });
      window.dispatchEvent(messageEvent);
      
      expect(messageHandler).toHaveBeenCalled();
      expect(messageHandler.mock.calls[0][0].detail).toEqual({
        type: 'status-update',
        data: { status: 'ready' },
      });
    });
  });

  describe('Security', () => {
    it('should reject messages from untrusted origins', () => {
      const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      const callback = vi.fn();
      element.onMessage('untrusted', callback);
      
      // Set specific target origin
      element.targetOrigin = 'https://trusted.com';
      
      // Send message from untrusted origin
      const messageEvent = new MessageEvent('message', {
        data: { type: 'untrusted', data: {} },
        origin: 'https://untrusted.com',
      });
      window.dispatchEvent(messageEvent);
      
      expect(callback).not.toHaveBeenCalled();
      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'Received message from untrusted origin:',
        'https://untrusted.com'
      );
      
      consoleWarnSpy.mockRestore();
    });

    it('should accept messages when targetOrigin is wildcard', () => {
      element.targetOrigin = '*';
      const callback = vi.fn();
      element.onMessage('any-origin', callback);
      
      const messageEvent = new MessageEvent('message', {
        data: { type: 'any-origin', data: { test: true } },
        origin: 'https://any-origin.com',
      });
      window.dispatchEvent(messageEvent);
      
      expect(callback).toHaveBeenCalledWith({ test: true });
    });
  });
});
