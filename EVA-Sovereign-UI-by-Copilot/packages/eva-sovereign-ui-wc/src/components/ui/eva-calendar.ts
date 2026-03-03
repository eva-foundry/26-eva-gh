/**
 * EVA Calendar Component (Simplified)
 * Basic month calendar for date selection
 * Features: Month navigation, date selection, disabled dates
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
  transitions,
} from '../../tokens';

export class EVACalendar extends EVABaseComponent {
  private currentDate = new Date();
  private selectedDate: Date | null = null;

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback() {
    const value = this.getAttr('value', '');
    if (value) {
      this.selectedDate = new Date(value);
    }
    this.render();
  }

  private previousMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.render();
  }

  private nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.render();
  }

  private selectDate(date: Date) {
    this.selectedDate = date;
    this.setAttribute('value', date.toISOString().split('T')[0]);
    this.emit('change', { date: date.toISOString() });
    this.render();
  }

  private getDaysInMonth(): Date[] {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: Date[] = [];

    // Add previous month's days to fill first week
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add current month's days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-block;
        padding: ${gcSpacing[4]};
        background: ${modernColors.background};
        border: 1px solid ${modernColors.border};
        border-radius: ${gcSpacing[3]};
        box-shadow: ${shadows.md};
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: ${gcSpacing[4]};
      }

      .header-title {
        font-size: 0.875rem;
        font-weight: 600;
      }

      .nav-button {
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid ${modernColors.border};
        border-radius: ${gcSpacing[1]};
        background: transparent;
        cursor: pointer;
        transition: ${transitions.colors};
        color: ${modernColors.foreground};
      }

      .nav-button:hover {
        background: ${modernColors.accent};
      }

      .weekdays {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: ${gcSpacing[1]};
        margin-bottom: ${gcSpacing[2]};
      }

      .weekday {
        text-align: center;
        font-size: 0.75rem;
        font-weight: 500;
        color: ${modernColors.mutedForeground};
        padding: ${gcSpacing[1]};
      }

      .days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: ${gcSpacing[1]};
      }

      .day {
        width: 2.25rem;
        height: 2.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        border-radius: ${gcSpacing[1]};
        font-size: 0.875rem;
        cursor: pointer;
        transition: ${transitions.colors};
        background: transparent;
        color: ${modernColors.foreground};
      }

      .day:hover:not(:disabled) {
        background: ${modernColors.accent};
      }

      .day[data-outside="true"] {
        color: ${modernColors.mutedForeground};
        opacity: 0.5;
      }

      .day[data-selected="true"] {
        background: ${modernColors.primary};
        color: ${modernColors.primaryForeground};
        border-color: ${modernColors.primary};
      }

      .day[data-today="true"]:not([data-selected="true"]) {
        border-color: ${modernColors.ring};
      }

      .day:disabled {
        pointer-events: none;
        opacity: 0.3;
      }
    `));

    const container = document.createElement('div');

    // Header
    const header = document.createElement('div');
    header.className = 'header';

    const prevBtn = document.createElement('button');
    prevBtn.className = 'nav-button';
    prevBtn.textContent = '‹';
    prevBtn.addEventListener('click', () => this.previousMonth());

    const title = document.createElement('div');
    title.className = 'header-title';
    title.textContent = this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    const nextBtn = document.createElement('button');
    nextBtn.className = 'nav-button';
    nextBtn.textContent = '›';
    nextBtn.addEventListener('click', () => this.nextMonth());

    header.appendChild(prevBtn);
    header.appendChild(title);
    header.appendChild(nextBtn);

    // Weekday headers
    const weekdays = document.createElement('div');
    weekdays.className = 'weekdays';
    ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].forEach(day => {
      const weekday = document.createElement('div');
      weekday.className = 'weekday';
      weekday.textContent = day;
      weekdays.appendChild(weekday);
    });

    // Days grid
    const days = document.createElement('div');
    days.className = 'days';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.getDaysInMonth().forEach(date => {
      const button = document.createElement('button');
      button.className = 'day';
      button.textContent = date.getDate().toString();

      const isOutside = date.getMonth() !== this.currentDate.getMonth();
      const isSelected = this.selectedDate && 
        date.getDate() === this.selectedDate.getDate() &&
        date.getMonth() === this.selectedDate.getMonth() &&
        date.getFullYear() === this.selectedDate.getFullYear();
      const isToday = date.getTime() === today.getTime();

      button.setAttribute('data-outside', isOutside.toString());
      button.setAttribute('data-selected', (!!isSelected).toString());
      button.setAttribute('data-today', isToday.toString());

      button.addEventListener('click', () => this.selectDate(date));

      days.appendChild(button);
    });

    container.appendChild(header);
    container.appendChild(weekdays);
    container.appendChild(days);

    this.shadow.appendChild(container);
  }
}

customElements.define('eva-calendar', EVACalendar);
