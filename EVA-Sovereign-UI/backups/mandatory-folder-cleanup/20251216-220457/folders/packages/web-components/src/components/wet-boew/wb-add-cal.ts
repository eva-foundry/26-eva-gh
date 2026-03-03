import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Add-Cal - Add to Calendar
 * Generate and download .ics calendar files for events
 */
@customElement('wb-add-cal')
export class WBAddCal extends EVAElement {
  static override styles = css`
    :host {
      display: inline-block;
    }

    .add-cal-button {
      padding: var(--eva-spacing-sm, 0.5rem) var(--eva-spacing-md, 1rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: var(--eva-colors-background-primary, #26374a);
      color: white;
      cursor: pointer;
      font-size: 1em;
    }

    .add-cal-button:hover {
      background: var(--eva-colors-background-primary-hover, #1c2934);
    }

    .add-cal-button:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
      outline-offset: 2px;
    }

    .icon {
      margin-right: var(--eva-spacing-xs, 0.25rem);
    }
  `;

  @property({ type: String })
  override title = '';

  @property({ type: String })
  description = '';

  @property({ type: String })
  location = '';

  @property({ type: String })
  startDate = '';

  @property({ type: String })
  endDate = '';

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-add-cal', {
      'en-CA': {
        addToCalendar: 'Add to Calendar',
        eventAdded: 'Event added to calendar',
        invalidDate: 'Invalid date format'
      },
      'fr-CA': {
        addToCalendar: 'Ajouter au calendrier',
        eventAdded: 'Événement ajouté au calendrier',
        invalidDate: 'Format de date invalide'
      }
    });
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error(this.getMessage('wb-add-cal', 'invalidDate'));
    }
    
    // Format: YYYYMMDDTHHMMSSZ
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
  }

  private generateICS(): string {
    try {
      const start = this.formatDate(this.startDate);
      const end = this.formatDate(this.endDate);

      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//EVA Suite//wb-add-cal//EN',
        'BEGIN:VEVENT',
        `DTSTART:${start}`,
        `DTEND:${end}`,
        `SUMMARY:${this.title}`,
        `DESCRIPTION:${this.description}`,
        `LOCATION:${this.location}`,
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      return icsContent;
    } catch (error) {
      this.emitEvent('wb-add-cal-error', { error: String(error) });
      throw error;
    }
  }

  private downloadICS(): void {
    try {
      const icsContent = this.generateICS();
      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${this.title || 'event'}.ics`;
      link.click();
      URL.revokeObjectURL(url);

      this.emitEvent('wb-add-cal-added', { 
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate
      });
      this.announce(this.getMessage('wb-add-cal', 'eventAdded'));
    } catch (error) {
      this.emitEvent('wb-add-cal-error', { error: String(error) });
    }
  }

  override render() {
    return html`
      <button 
        class="add-cal-button"
        @click="${this.downloadICS}"
        aria-label="${this.getMessage('wb-add-cal', 'addToCalendar')}"
      >
        <span class="icon">📅</span>
        ${this.getMessage('wb-add-cal', 'addToCalendar')}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-add-cal': WBAddCal;
  }
}
