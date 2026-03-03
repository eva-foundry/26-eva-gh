/**
 * ComponentPlayground.js
 * Main playground component integrating PropertyEditor, LivePreview, and CodeGenerator
 */

import { PropertyEditor } from './PropertyEditor.js';
import { CodeGenerator } from './CodeGenerator.js';
import { componentMetadata } from './component-metadata.js';
import { parseComponentExample } from './example-parser.js';

export class ComponentPlayground {
  constructor(componentId) {
    this.componentId = componentId;
    this.metadata = componentMetadata[componentId];
    this.parsedExample = this.parseExample();
    this.currentProps = this.getDefaultProps();
    this.slotContent = this.parsedExample.slotContent;
    this.previewElement = null;
  }

  /**
   * Parse the webcomponent example to get realistic defaults
   */
  parseExample() {
    if (this.metadata && this.metadata.examples && this.metadata.examples.webcomponent) {
      return parseComponentExample(this.metadata.examples.webcomponent);
    }
    return { props: {}, slotContent: '' };
  }

  /**
   * Get default prop values from parsed example, fallback to metadata
   */
  getDefaultProps() {
    const props = {};
    
    // Start with metadata defaults
    if (this.metadata && this.metadata.props) {
      Object.entries(this.metadata.props).forEach(([propName, propConfig]) => {
        props[propName] = propConfig.default;
      });
    }
    
    // Override with parsed example values (more realistic)
    Object.entries(this.parsedExample.props).forEach(([propName, value]) => {
      props[propName] = value;
    });
    
    return props;
  }

  /**
   * Render complete playground
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('div');
    container.className = 'component-playground';
    container.setAttribute('role', 'region');
    container.setAttribute('aria-label', `${this.metadata.title} Playground`);

    // Header
    const header = this.createHeader();
    container.appendChild(header);

    // Main content area (2-column layout)
    const mainContent = document.createElement('div');
    mainContent.className = 'playground-content';

    // Left column: PropertyEditor + CodeGenerator
    const leftColumn = document.createElement('div');
    leftColumn.className = 'playground-left';

    const propertyEditor = new PropertyEditor(
      this.componentId,
      this.metadata,
      this.handlePropertyChange.bind(this)
    );
    leftColumn.appendChild(propertyEditor.render());

    const codeGenerator = new CodeGenerator(
      this.componentId,
      this.metadata,
      this.currentProps
    );
    this.codeGenerator = codeGenerator; // Store reference
    leftColumn.appendChild(codeGenerator.render());

    mainContent.appendChild(leftColumn);

    // Right column: Live Preview
    const rightColumn = document.createElement('div');
    rightColumn.className = 'playground-right';

    const livePreview = this.createLivePreview();
    rightColumn.appendChild(livePreview);

    mainContent.appendChild(rightColumn);
    container.appendChild(mainContent);

    return container;
  }

  /**
   * Create playground header
   */
  createHeader() {
    const header = document.createElement('div');
    header.className = 'playground-header';

    const title = document.createElement('h2');
    title.textContent = this.metadata.title;
    title.className = 'playground-title';
    header.appendChild(title);

    const description = document.createElement('p');
    description.textContent = this.metadata.description;
    description.className = 'playground-description';
    header.appendChild(description);

    // Category badge
    const badge = document.createElement('span');
    badge.className = `category-badge category-${this.metadata.category}`;
    badge.textContent = this.metadata.category.toUpperCase();
    header.appendChild(badge);

    return header;
  }

  /**
   * Create live preview panel
   */
  createLivePreview() {
    const container = document.createElement('div');
    container.className = 'live-preview';

    const title = document.createElement('h3');
    title.textContent = 'Live Preview';
    title.className = 'live-preview-title';
    container.appendChild(title);

    const previewArea = document.createElement('div');
    previewArea.className = 'preview-area';
    previewArea.id = `preview-${this.componentId}`;

    // Create component element
    this.previewElement = document.createElement(this.componentId);
    this.updatePreviewProps();

    // Use slot content from parsed example
    if (this.slotContent) {
      this.previewElement.innerHTML = this.slotContent;
    } else if (this.metadata.slots && this.metadata.slots.default) {
      // Fallback to metadata default slot
      this.previewElement.textContent = this.metadata.slots.default;
    }

    previewArea.appendChild(this.previewElement);
    container.appendChild(previewArea);

    return container;
  }

  /**
   * Handle property change from PropertyEditor
   */
  handlePropertyChange(propName, value) {
    this.currentProps[propName] = value;
    this.updatePreviewProps();
    
    // Update code generator
    if (this.codeGenerator) {
      this.codeGenerator.updateProps(this.currentProps);
    }
  }

  /**
   * Update preview element props
   */
  updatePreviewProps() {
    if (!this.previewElement) return;

    Object.entries(this.currentProps).forEach(([propName, value]) => {
      const propConfig = this.metadata.props[propName];
      if (!propConfig) return;

      // Convert camelCase to kebab-case for attributes
      const attrName = this.camelToKebab(propName);

      if (propConfig.type === 'boolean') {
        if (value) {
          this.previewElement.setAttribute(attrName, '');
        } else {
          this.previewElement.removeAttribute(attrName);
        }
      } else {
        this.previewElement.setAttribute(attrName, value);
      }
    });
  }

  /**
   * Convert camelCase to kebab-case
   */
  camelToKebab(str) {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }
}

/**
 * Create and show playground in modal
 */
export function showPlayground(componentId) {
  // Check if component metadata exists
  if (!componentMetadata[componentId]) {
    console.error(`No metadata found for component: ${componentId}`);
    return;
  }

  // Create modal
  const modal = document.createElement('div');
  modal.className = 'playground-modal';
  modal.id = 'playground-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'playground-title');

  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.addEventListener('click', closePlayground);
  modal.appendChild(backdrop);

  // Modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Close button
  const closeButton = document.createElement('button');
  closeButton.className = 'modal-close';
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('aria-label', 'Close playground');
  closeButton.addEventListener('click', closePlayground);
  modalContent.appendChild(closeButton);

  // Playground
  const playground = new ComponentPlayground(componentId);
  modalContent.appendChild(playground.render());

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  // Focus trap
  modal.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePlayground();
    }
  });

  // Focus first interactive element
  setTimeout(() => {
    const firstFocusable = modal.querySelector('button, input, select, textarea');
    if (firstFocusable) {
      firstFocusable.focus();
    }
  }, 100);
}

/**
 * Close playground modal
 */
export function closePlayground() {
  const modal = document.getElementById('playground-modal');
  if (modal) {
    modal.remove();
  }
}
