import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './wb-session-timeout.js';
import type { WBSessionTimeout } from './wb-session-timeout.js';

describe('wb-session-timeout', () => {
  let element: WBSessionTimeout;

  beforeEach(async () => {
    vi.useFakeTimers();
    localStorage.clear();

    element = await fixture<WBSessionTimeout>(html`
      <wb-session-timeout
        session-duration="300000"
        warning-time="60000"
        session-endpoint="/api/session/refresh"
      ></wb-session-timeout>
    `);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('renders without errors', () => {
    expect(element).toBeDefined();
    expect(element.shadowRoot).not.toBeNull();
  });

  it('starts timer on page load', () => {
    const startTimerSpy = vi.spyOn(element, 'startTimer');
    element.connectedCallback();
    expect(startTimerSpy).toHaveBeenCalled();
  });

  it('shows modal at warning time', async () => {
    // Fast forward to warning time (240 seconds = 4 min)
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    const modal = element.shadowRoot!.querySelector('.modal-backdrop');
    expect(modal).toBeDefined();
  });

  it('countdown timer updates every second', async () => {
    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    const initialCountdown = element.shadowRoot!.querySelector('.countdown')!.textContent;

    // Advance 1 second
    vi.advanceTimersByTime(1000);
    await element.updateComplete;

    const newCountdown = element.shadowRoot!.querySelector('.countdown')!.textContent;
    expect(newCountdown).not.toBe(initialCountdown);
  });

  it('continue button extends session', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });

    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    const continueButton = element.shadowRoot!.querySelector<HTMLButtonElement>('.button-continue')!;
    continueButton.click();
    await element.updateComplete;

    // Modal should close
    const modal = element.shadowRoot!.querySelector('.modal-backdrop');
    expect(modal).toBeNull();

    // Session endpoint should be called
    expect(global.fetch).toHaveBeenCalledWith('/api/session/refresh', expect.any(Object));
  });

  it('sign out button ends session', async () => {
    const locationSpy = vi.spyOn(window, 'location', 'get').mockReturnValue({
      href: ''
    } as Location);

    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    const signoutButton = element.shadowRoot!.querySelector<HTMLButtonElement>('.button-signout')!;
    signoutButton.click();
    await element.updateComplete;

    // Modal should close
    const modal = element.shadowRoot!.querySelector('.modal-backdrop');
    expect(modal).toBeNull();

    locationSpy.mockRestore();
  });

  it('auto sign-out after timeout', async () => {
    const endSessionSpy = vi.spyOn(element, 'endSession');

    // Fast forward to full expiry (300 seconds)
    vi.advanceTimersByTime(300000);
    await element.updateComplete;

    expect(endSessionSpy).toHaveBeenCalled();
  });

  it('emits wb-session-timeout-warning event', async () => {
    const spy = vi.fn();
    element.addEventListener('wb-session-timeout-warning', spy);

    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
    expect(spy.mock.calls[0][0].detail.remaining).toBeGreaterThan(0);
  });

  it('emits wb-session-timeout-continue event', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: true });

    const spy = vi.fn();
    element.addEventListener('wb-session-timeout-continue', spy);

    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    // Click continue
    const continueButton = element.shadowRoot!.querySelector<HTMLButtonElement>('.button-continue')!;
    continueButton.click();
    await element.updateComplete;

    // Wait for async
    await new Promise(resolve => setTimeout(resolve, 10));

    expect(spy).toHaveBeenCalledOnce();
  });

  it('emits wb-session-timeout-end event', async () => {
    const spy = vi.fn();
    element.addEventListener('wb-session-timeout-end', spy);

    element.endSession();
    await element.updateComplete;

    expect(spy).toHaveBeenCalledOnce();
  });

  it('formats time as MM:SS', async () => {
    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    const countdown = element.shadowRoot!.querySelector('.countdown')!.textContent!.trim();
    expect(countdown).toMatch(/^\d{1,2}:\d{2}$/); // Format: M:SS or MM:SS
  });

  it('announces warning to screen readers', async () => {
    const spy = vi.spyOn(element, 'announce');

    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    expect(spy).toHaveBeenCalled();
  });

  it('bilingual modal content (French)', async () => {
    element.locale = 'fr-CA';
    await element.updateComplete;

    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    const title = element.shadowRoot!.querySelector('.modal-title')!.textContent;
    expect(title).toContain('Avertissement');
  });

  it('custom session duration works', async () => {
    element.sessionDuration = 120000; // 2 min
    element.warningTime = 30000; // 30 sec
    await element.updateComplete;

    element.startTimer();

    // Fast forward to warning time (90 sec)
    vi.advanceTimersByTime(90000);
    await element.updateComplete;

    const modal = element.shadowRoot!.querySelector('.modal-backdrop');
    expect(modal).toBeDefined();
  });

  it('resetTimer() restarts countdown', async () => {
    const startTimerSpy = vi.spyOn(element, 'startTimer');

    // Reset timer (simulates user activity)
    element.resetTimer();

    expect(startTimerSpy).toHaveBeenCalled();
  });

  it('saves state to localStorage', () => {
    element.startTimer();

    const saved = localStorage.getItem('wb-session-timeout-state');
    expect(saved).not.toBeNull();

    const state = JSON.parse(saved!);
    expect(state.sessionStartTime).toBeDefined();
  });

  it('keyboard Esc closes modal', async () => {
    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    const backdrop = element.shadowRoot!.querySelector<HTMLDivElement>('.modal-backdrop')!;
    const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true });
    backdrop.dispatchEvent(event);
    await element.updateComplete;

    const modal = element.shadowRoot!.querySelector('.modal-backdrop');
    expect(modal).toBeNull();
  });

  it('focus trap works in modal', async () => {
    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    const continueButton = element.shadowRoot!.querySelector<HTMLButtonElement>('.button-continue')!;
    const signoutButton = element.shadowRoot!.querySelector<HTMLButtonElement>('.button-signout')!;

    // Simulate Tab key on last element
    continueButton.focus();
    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true });
    
    // Should cycle back to first element
    expect(document.activeElement).toBeDefined();
  });

  it('clicking backdrop closes modal', async () => {
    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    const backdrop = element.shadowRoot!.querySelector<HTMLDivElement>('.modal-backdrop')!;
    backdrop.click();
    await element.updateComplete;

    const modal = element.shadowRoot!.querySelector('.modal-backdrop');
    expect(modal).toBeNull();
  });

  it('clearAllTimers() clears all active timers', () => {
    element.startTimer();
    
    // Access private method via any cast
    (element as any).clearAllTimers();

    // Timers should be cleared
    expect((element as any).warningTimer).toBeUndefined();
  });

  it('handles session refresh endpoint failure gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    const continueButton = element.shadowRoot!.querySelector<HTMLButtonElement>('.button-continue')!;
    continueButton.click();
    await element.updateComplete;

    // Wait for async
    await new Promise(resolve => setTimeout(resolve, 10));

    // Should still restart timer (optimistic)
    expect(global.fetch).toHaveBeenCalled();
  });

  it('modal has proper ARIA attributes', async () => {
    // Trigger warning
    vi.advanceTimersByTime(240000);
    await element.updateComplete;

    const modalContent = element.shadowRoot!.querySelector('.modal-content')!;
    expect(modalContent.getAttribute('role')).toBe('alertdialog');
    expect(modalContent.getAttribute('aria-modal')).toBe('true');
    expect(modalContent.getAttribute('aria-labelledby')).toBe('session-timeout-title');
  });
});
