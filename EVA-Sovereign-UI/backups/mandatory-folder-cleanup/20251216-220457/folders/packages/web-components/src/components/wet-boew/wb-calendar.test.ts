import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-calendar.js';
import type { WBCalendar, CalendarEvent } from './wb-calendar.js';

describe('WBCalendar', () => {
  let calendar: WBCalendar;
  const sampleEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Meeting',
      start: new Date(2025, 0, 15, 10, 0),
      end: new Date(2025, 0, 15, 11, 0),
      description: 'Team meeting'
    },
    {
      id: '2',
      title: 'Lunch',
      start: new Date(2025, 0, 15, 12, 0)
    }
  ];

  beforeEach(async () => {
    calendar = await fixture<WBCalendar>(html`<wb-calendar></wb-calendar>`);
    calendar.events = sampleEvents;
    calendar.currentDate = new Date(2025, 0, 1);
    await calendar.updateComplete;
  });

  it('renders', () => {
    expect(calendar).to.exist;
  });

  it('displays calendar grid', () => {
    const grid = calendar.shadowRoot!.querySelector('.calendar-grid');
    expect(grid).to.exist;
  });

  it('displays day headers', () => {
    const headers = calendar.shadowRoot!.querySelectorAll('.calendar-day-header');
    expect(headers.length).to.equal(7);
  });

  it('displays 42 day cells', () => {
    const days = calendar.shadowRoot!.querySelectorAll('.calendar-day');
    expect(days.length).to.equal(42);
  });

  it('displays month and year in title', () => {
    const title = calendar.shadowRoot!.querySelector('.calendar-title');
    expect(title?.textContent).to.include('January');
    expect(title?.textContent).to.include('2025');
  });

  it('navigates to previous month', async () => {
    calendar.previousMonth();
    await calendar.updateComplete;
    const title = calendar.shadowRoot!.querySelector('.calendar-title');
    expect(title?.textContent).to.include('December');
    expect(title?.textContent).to.include('2024');
  });

  it('navigates to next month', async () => {
    calendar.nextMonth();
    await calendar.updateComplete;
    const title = calendar.shadowRoot!.querySelector('.calendar-title');
    expect(title?.textContent).to.include('February');
  });

  it('navigates to today', async () => {
    const today = new Date();
    calendar.goToToday();
    await calendar.updateComplete;
    expect(calendar.currentDate.getMonth()).to.equal(today.getMonth());
    expect(calendar.currentDate.getFullYear()).to.equal(today.getFullYear());
  });

  it('shows previous button', () => {
    const prevBtn = calendar.shadowRoot!.querySelector('.nav-btn');
    expect(prevBtn).to.exist;
  });

  it('shows next button', () => {
    const navBtns = calendar.shadowRoot!.querySelectorAll('.nav-btn');
    expect(navBtns.length).to.be.greaterThan(1);
  });

  it('shows today button', () => {
    const todayBtn = calendar.shadowRoot!.querySelectorAll('.nav-btn')[1];
    expect(todayBtn).to.exist;
  });

  it('displays events on correct day', () => {
    const events = calendar.shadowRoot!.querySelectorAll('.event');
    expect(events.length).to.equal(2);
  });

  it('event shows title', () => {
    const event = calendar.shadowRoot!.querySelector('.event');
    expect(event?.textContent).to.equal('Meeting');
  });

  it('highlights today', () => {
    const today = new Date();
    calendar.currentDate = today;
    calendar.requestUpdate();
    setTimeout(() => {
      const todayCell = calendar.shadowRoot!.querySelector('.calendar-day.today');
      expect(todayCell).to.exist;
    }, 100);
  });

  it('marks other month days', () => {
    const otherMonth = calendar.shadowRoot!.querySelectorAll('.calendar-day.other-month');
    expect(otherMonth.length).to.be.greaterThan(0);
  });

  it('opens event modal on click', async () => {
    const event = calendar.shadowRoot!.querySelector('.event') as HTMLElement;
    event.click();
    await calendar.updateComplete;
    const modal = calendar.shadowRoot!.querySelector('.event-modal.open');
    expect(modal).to.exist;
  });

  it('displays event details in modal', async () => {
    const event = calendar.shadowRoot!.querySelector('.event') as HTMLElement;
    event.click();
    await calendar.updateComplete;
    const dialog = calendar.shadowRoot!.querySelector('.event-dialog');
    expect(dialog?.textContent).to.include('Meeting');
    expect(dialog?.textContent).to.include('Team meeting');
  });

  it('closes modal on close button', async () => {
    const event = calendar.shadowRoot!.querySelector('.event') as HTMLElement;
    event.click();
    await calendar.updateComplete;
    const closeBtn = calendar.shadowRoot!.querySelector('.event-close') as HTMLButtonElement;
    closeBtn.click();
    await calendar.updateComplete;
    const modal = calendar.shadowRoot!.querySelector('.event-modal.open');
    expect(modal).to.be.null;
  });

  it('closes modal on backdrop click', async () => {
    const event = calendar.shadowRoot!.querySelector('.event') as HTMLElement;
    event.click();
    await calendar.updateComplete;
    const modal = calendar.shadowRoot!.querySelector('.event-modal') as HTMLElement;
    modal.click();
    await calendar.updateComplete;
    const openModal = calendar.shadowRoot!.querySelector('.event-modal.open');
    expect(openModal).to.be.null;
  });

  it('emits wb-calendar-navigate event on previous', async () => {
    let eventFired = false;
    calendar.addEventListener('wb-calendar-navigate', () => { eventFired = true; });
    calendar.previousMonth();
    await calendar.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('emits wb-calendar-navigate event on next', async () => {
    let eventFired = false;
    calendar.addEventListener('wb-calendar-navigate', () => { eventFired = true; });
    calendar.nextMonth();
    await calendar.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('emits wb-calendar-event-select on event click', async () => {
    let eventFired = false;
    calendar.addEventListener('wb-calendar-event-select', () => { eventFired = true; });
    const event = calendar.shadowRoot!.querySelector('.event') as HTMLElement;
    event.click();
    await calendar.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('handles empty events array', async () => {
    calendar.events = [];
    await calendar.updateComplete;
    const events = calendar.shadowRoot!.querySelectorAll('.event');
    expect(events.length).to.equal(0);
  });

  it('defaults to month view', () => {
    expect(calendar.view).to.equal('month');
  });

  it('displays event without end time', async () => {
    const event = sampleEvents[1];
    expect(event.end).to.be.undefined;
    const eventEl = calendar.shadowRoot!.querySelectorAll('.event')[1];
    eventEl.dispatchEvent(new Event('click'));
    await calendar.updateComplete;
    const dialog = calendar.shadowRoot!.querySelector('.event-dialog');
    expect(dialog).to.exist;
  });

  it('has navigation buttons with aria-labels', () => {
    const prevBtn = calendar.shadowRoot!.querySelector('.nav-btn');
    expect(prevBtn?.getAttribute('aria-label')).to.exist;
  });
});
