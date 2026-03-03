import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  description?: string;
}

/**
 * WB-Calendar - Calendar of Events
 * Display events in month/week/day calendar views
 */
@customElement('wb-calendar')
export class WBCalendar extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--eva-spacing-md, 1rem);
    }

    .calendar-nav {
      display: flex;
      gap: var(--eva-spacing-sm, 0.5rem);
    }

    .nav-btn {
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: var(--eva-colors-background-default, #ffffff);
      cursor: pointer;
    }

    .nav-btn:hover {
      background: var(--eva-colors-background-hover, #f5f5f5);
    }

    .nav-btn:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
    }

    .calendar-title {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .calendar-grid {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 1px;
      background: var(--eva-colors-border-default, #cccccc);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
    }

    .calendar-day-header {
      background: var(--eva-colors-background-secondary, #f5f5f5);
      padding: var(--eva-spacing-sm, 0.5rem);
      text-align: center;
      font-weight: bold;
    }

    .calendar-day {
      background: var(--eva-colors-background-default, #ffffff);
      min-height: 100px;
      padding: var(--eva-spacing-xs, 0.25rem);
      position: relative;
    }

    .calendar-day.other-month {
      background: var(--eva-colors-background-alt, #fafafa);
      color: var(--eva-colors-text-secondary, #666666);
    }

    .calendar-day.today {
      background: var(--eva-colors-background-info, #d9edf7);
    }

    .day-number {
      font-size: 0.9rem;
      padding: var(--eva-spacing-xs, 0.25rem);
    }

    .event {
      background: var(--eva-colors-background-primary, #335075);
      color: #ffffff;
      padding: 2px 4px;
      margin: 2px 0;
      font-size: 0.75rem;
      border-radius: var(--eva-border-radius-sm, 3px);
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .event:hover {
      background: var(--eva-colors-background-primary-hover, #26416d);
    }

    .event-modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 9999;
      display: none;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, 0.5);
    }

    .event-modal.open {
      display: flex;
    }

    .event-dialog {
      background: var(--eva-colors-background-default, #ffffff);
      padding: var(--eva-spacing-lg, 1.5rem);
      border-radius: var(--eva-border-radius-md, 4px);
      max-width: 500px;
      width: 90%;
    }

    .event-dialog h3 {
      margin: 0 0 var(--eva-spacing-md, 1rem) 0;
    }

    .event-close {
      float: right;
      border: none;
      background: transparent;
      font-size: 1.5rem;
      cursor: pointer;
    }

    @media (max-width: 768px) {
      .calendar-grid {
        grid-template-columns: 1fr;
      }

      .calendar-day-header:not(:first-child) {
        display: none;
      }

      .calendar-day {
        display: flex;
        gap: var(--eva-spacing-sm, 0.5rem);
      }

      .day-number::after {
        content: ' - ' attr(data-day-name);
      }
    }
  `;

  @property({ type: Array })
  events: CalendarEvent[] = [];

  @property({ type: Object })
  currentDate = new Date();

  @property({ type: String })
  view: 'month' | 'week' | 'day' = 'month';

  @state()
  private selectedEvent: CalendarEvent | null = null;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-calendar', {
      'en-CA': {
        previous: 'Previous',
        next: 'Next',
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        close: 'Close',
        noEvents: 'No events',
        sunday: 'Sun',
        monday: 'Mon',
        tuesday: 'Tue',
        wednesday: 'Wed',
        thursday: 'Thu',
        friday: 'Fri',
        saturday: 'Sat'
      },
      'fr-CA': {
        previous: 'Précédent',
        next: 'Suivant',
        today: 'Aujourd\'hui',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        close: 'Fermer',
        noEvents: 'Aucun événement',
        sunday: 'Dim',
        monday: 'Lun',
        tuesday: 'Mar',
        wednesday: 'Mer',
        thursday: 'Jeu',
        friday: 'Ven',
        saturday: 'Sam'
      }
    });
  }

  previousMonth(): void {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    this.currentDate = newDate;
    this.emitEvent('wb-calendar-navigate', { date: this.currentDate });
  }

  nextMonth(): void {
    const newDate = new Date(this.currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    this.currentDate = newDate;
    this.emitEvent('wb-calendar-navigate', { date: this.currentDate });
  }

  goToToday(): void {
    this.currentDate = new Date();
    this.emitEvent('wb-calendar-navigate', { date: this.currentDate });
  }

  private getMonthDays(): Date[] {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    
    const days: Date[] = [];
    const current = new Date(startDate);
    
    while (days.length < 42) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    
    return days;
  }

  private getEventsForDay(date: Date): CalendarEvent[] {
    return this.events.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.getFullYear() === date.getFullYear() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getDate() === date.getDate();
    });
  }

  private isToday(date: Date): boolean {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  }

  private isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentDate.getMonth();
  }

  private showEvent(event: CalendarEvent): void {
    this.selectedEvent = event;
    this.emitEvent('wb-calendar-event-select', { event });
  }

  private closeEvent(): void {
    this.selectedEvent = null;
  }

  private getDayName(index: number): string {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return this.getMessage('wb-calendar', days[index]);
  }

  override render() {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthYear = `${monthNames[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    const days = this.getMonthDays();

    return html`
      <div class="calendar-header">
        <div class="calendar-nav">
          <button class="nav-btn" @click="${this.previousMonth}" aria-label="${this.getMessage('wb-calendar', 'previous')}">
            ‹
          </button>
          <button class="nav-btn" @click="${this.goToToday}">
            ${this.getMessage('wb-calendar', 'today')}
          </button>
          <button class="nav-btn" @click="${this.nextMonth}" aria-label="${this.getMessage('wb-calendar', 'next')}">
            ›
          </button>
        </div>
        <h2 class="calendar-title">${monthYear}</h2>
      </div>

      <div class="calendar-grid">
        ${[0, 1, 2, 3, 4, 5, 6].map(i => html`
          <div class="calendar-day-header">${this.getDayName(i)}</div>
        `)}
        ${days.map(day => html`
          <div class="calendar-day ${this.isToday(day) ? 'today' : ''} ${!this.isCurrentMonth(day) ? 'other-month' : ''}">
            <div class="day-number" data-day-name="${this.getDayName(day.getDay())}">${day.getDate()}</div>
            ${this.getEventsForDay(day).map(event => html`
              <div class="event" @click="${() => this.showEvent(event)}">${event.title}</div>
            `)}
          </div>
        `)}
      </div>

      <div class="event-modal ${this.selectedEvent ? 'open' : ''}" @click="${this.closeEvent}">
        ${this.selectedEvent ? html`
          <div class="event-dialog" @click="${(e: Event) => e.stopPropagation()}">
            <button class="event-close" @click="${this.closeEvent}">×</button>
            <h3>${this.selectedEvent.title}</h3>
            <p><strong>Start:</strong> ${this.selectedEvent.start.toLocaleString()}</p>
            ${this.selectedEvent.end ? html`<p><strong>End:</strong> ${this.selectedEvent.end.toLocaleString()}</p>` : ''}
            ${this.selectedEvent.description ? html`<p>${this.selectedEvent.description}</p>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-calendar': WBCalendar;
  }
}
