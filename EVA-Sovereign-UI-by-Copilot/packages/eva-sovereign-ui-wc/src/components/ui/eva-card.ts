/**
 * EVA Card Component
 * Content containers with Spark styling
 * Features: header/content/footer slots, action slot, shadow-sm
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  shadows,
} from '../../tokens';

export class EVACard extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .card {
        background: ${modernColors.card};
        color: ${modernColors.cardForeground};
        display: flex;
        flex-direction: column;
        gap: ${gcSpacing[6]};
        border-radius: ${gcSpacing[3]};
        border: 1px solid ${modernColors.border};
        padding: ${gcSpacing[6]};
        box-shadow: ${shadows.sm};
      }
    `));

    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('data-slot', 'card');

    const slot = document.createElement('slot');
    card.appendChild(slot);

    this.shadow.appendChild(card);
  }
}

export class EVACardHeader extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: grid;
        grid-template-rows: auto auto;
        align-items: flex-start;
        gap: ${gcSpacing[2]};
      }

      :host([has-action]) {
        grid-template-columns: 1fr auto;
      }

      .header {
        display: contents;
      }
    `));

    const header = document.createElement('div');
    header.className = 'header';
    header.setAttribute('data-slot', 'card-header');

    const slot = document.createElement('slot');
    header.appendChild(slot);

    this.shadow.appendChild(header);
  }
}

export class EVACardTitle extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        line-height: 1;
        font-weight: 600;
      }

      .title {
        display: contents;
      }
    `));

    const title = document.createElement('div');
    title.className = 'title';
    title.setAttribute('data-slot', 'card-title');

    const slot = document.createElement('slot');
    title.appendChild(slot);

    this.shadow.appendChild(title);
  }
}

export class EVACardDescription extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
        color: ${modernColors.mutedForeground};
        font-size: 0.875rem;
      }

      .description {
        display: contents;
      }
    `));

    const description = document.createElement('div');
    description.className = 'description';
    description.setAttribute('data-slot', 'card-description');

    const slot = document.createElement('slot');
    description.appendChild(slot);

    this.shadow.appendChild(description);
  }
}

export class EVACardContent extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      .content {
        display: contents;
      }
    `));

    const content = document.createElement('div');
    content.className = 'content';
    content.setAttribute('data-slot', 'card-content');

    const slot = document.createElement('slot');
    content.appendChild(slot);

    this.shadow.appendChild(content);
  }
}

export class EVACardFooter extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: flex;
        align-items: center;
      }

      .footer {
        display: contents;
      }
    `));

    const footer = document.createElement('div');
    footer.className = 'footer';
    footer.setAttribute('data-slot', 'card-footer');

    const slot = document.createElement('slot');
    footer.appendChild(slot);

    this.shadow.appendChild(footer);
  }
}

customElements.define('eva-card', EVACard);
customElements.define('eva-card-header', EVACardHeader);
customElements.define('eva-card-title', EVACardTitle);
customElements.define('eva-card-description', EVACardDescription);
customElements.define('eva-card-content', EVACardContent);
customElements.define('eva-card-footer', EVACardFooter);
