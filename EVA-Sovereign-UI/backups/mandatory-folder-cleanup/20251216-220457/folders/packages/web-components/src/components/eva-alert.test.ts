import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import { EVAAlert } from './eva-alert.js';
import './eva-alert.js';
import { waitForUpdate, queryShadow, hasAttribute, clickShadow, waitForEvent } from '../../test/helpers.js';

describe('eva-alert', () => {
  let element: EVAAlert;

  beforeEach(async () => {
    element = await fixture(html`<eva-alert>Test alert message</eva-alert>`);
  });

  describe('Initialization', () => {
    it('should create alert element', () => {
      expect(element).toBeDefined();
      expect(element.tagName.toLowerCase()).toBe('eva-alert');
    });

    it('should default to info type', () => {
      expect(element.type).toBe('info');
      expect(hasAttribute(element, 'type', 'info')).toBe(true);
    });

    it('should not be dismissible by default', () => {
      expect(element.dismissible).toBe(false);
    });
  });

  describe('Types', () => {
    it('should support success type', async () => {
      element.type = 'success';
      await waitForUpdate(element);
      expect(element.type).toBe('success');
      expect(hasAttribute(element, 'type', 'success')).toBe(true);
    });

    it('should support info type', async () => {
      element.type = 'info';
      await waitForUpdate(element);
      expect(element.type).toBe('info');
      expect(hasAttribute(element, 'type', 'info')).toBe(true);
    });

    it('should support warning type', async () => {
      element.type = 'warning';
      await waitForUpdate(element);
      expect(element.type).toBe('warning');
      expect(hasAttribute(element, 'type', 'warning')).toBe(true);
    });

    it('should support danger type', async () => {
      element.type = 'danger';
      await waitForUpdate(element);
      expect(element.type).toBe('danger');
      expect(hasAttribute(element, 'type', 'danger')).toBe(true);
    });
  });

  describe('Dismissible Alerts', () => {
    it('should show dismiss button when dismissible', async () => {
      element.dismissible = true;
      await waitForUpdate(element);

      const dismissButton = queryShadow(element, '.alert-dismiss');
      expect(dismissButton).toBeDefined();
    });

    it('should emit dismiss event and hide alert', async () => {
      element.dismissible = true;
      element.visible = true; // Ensure starting visible
      await waitForUpdate(element);

      expect(element.visible).toBe(true);
      
      const eventPromise = waitForEvent(element, 'eva-dismiss');
      await clickShadow(element, '.alert-dismiss');
      await waitForUpdate(element);
      
      const event = await eventPromise;
      expect(event).toBeDefined();
      expect(element.visible).toBe(false);
    });
  });

  describe('Accessibility', () => {
    it('should have alert role', async () => {
      const container = queryShadow(element, '[role="alert"]');
      expect(container).toBeDefined();
    });

    it('should support polite live region', async () => {
      element.live = 'polite';
      await waitForUpdate(element);

      const container = queryShadow(element, '[aria-live="polite"]');
      expect(container).toBeDefined();
    });

    it('should support assertive live region', async () => {
      element.live = 'assertive';
      await waitForUpdate(element);

      const container = queryShadow(element, '[aria-live="assertive"]');
      expect(container).toBeDefined();
    });
  });
});
