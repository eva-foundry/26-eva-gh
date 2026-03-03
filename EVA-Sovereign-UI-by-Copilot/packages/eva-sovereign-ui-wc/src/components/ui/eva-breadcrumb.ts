/**
 * EVA Breadcrumb Component
 * Navigation breadcrumbs with Spark styling
 * Features: separator support, ellipsis, responsive
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
  gcSpacing,
  transitions,
} from '../../tokens';

export class EVABreadcrumb extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: block;
      }

      nav {
        display: contents;
      }
    `));

    const nav = document.createElement('nav');
    nav.setAttribute('aria-label', 'breadcrumb');
    
    const slot = document.createElement('slot');
    nav.appendChild(slot);

    this.shadow.appendChild(nav);
  }
}

export class EVABreadcrumbList extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: flex;
      }

      .list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: ${gcSpacing[2]};
        font-size: 0.875rem;
        color: ${modernColors.mutedForeground};
        word-break: break-word;
      }

      @media (min-width: 640px) {
        .list {
          gap: ${gcSpacing[3]};
        }
      }
    `));

    const ol = document.createElement('ol');
    ol.className = 'list';
    
    const slot = document.createElement('slot');
    ol.appendChild(slot);

    this.shadow.appendChild(ol);
  }
}

export class EVABreadcrumbItem extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .item {
        display: inline-flex;
        align-items: center;
        gap: ${gcSpacing[2]};
      }
    `));

    const li = document.createElement('li');
    li.className = 'item';
    
    const slot = document.createElement('slot');
    li.appendChild(slot);

    this.shadow.appendChild(li);
  }
}

export class EVABreadcrumbLink extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .link {
        transition: ${transitions.colors};
        color: ${modernColors.mutedForeground};
        text-decoration: none;
      }

      .link:hover {
        color: ${modernColors.foreground};
      }
    `));

    const link = document.createElement('a');
    link.className = 'link';
    
    const href = this.getAttribute('href');
    if (href) link.href = href;
    
    const slot = document.createElement('slot');
    link.appendChild(slot);

    this.shadow.appendChild(link);
  }
}

export class EVABreadcrumbPage extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .page {
        font-weight: 400;
        color: ${modernColors.foreground};
      }
    `));

    const span = document.createElement('span');
    span.className = 'page';
    span.setAttribute('role', 'link');
    span.setAttribute('aria-disabled', 'true');
    span.setAttribute('aria-current', 'page');
    
    const slot = document.createElement('slot');
    span.appendChild(slot);

    this.shadow.appendChild(span);
  }
}

export class EVABreadcrumbSeparator extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: inline-flex;
      }

      .separator {
        display: contents;
      }

      .separator ::slotted(svg) {
        width: 0.875rem;
        height: 0.875rem;
      }
    `));

    const li = document.createElement('li');
    li.className = 'separator';
    li.setAttribute('role', 'presentation');
    li.setAttribute('aria-hidden', 'true');
    
    const slot = document.createElement('slot');
    li.appendChild(slot);
    
    // Default chevron if no content
    if (!this.textContent?.trim()) {
      li.textContent = '›';
    }

    this.shadow.appendChild(li);
  }
}

customElements.define('eva-breadcrumb', EVABreadcrumb);
customElements.define('eva-breadcrumb-list', EVABreadcrumbList);
customElements.define('eva-breadcrumb-item', EVABreadcrumbItem);
customElements.define('eva-breadcrumb-link', EVABreadcrumbLink);
customElements.define('eva-breadcrumb-page', EVABreadcrumbPage);
customElements.define('eva-breadcrumb-separator', EVABreadcrumbSeparator);
