/**
 * PropertyEditor.js
 * Generates interactive controls for component properties
 * Updates live preview in real-time
 */

export class PropertyEditor {
  constructor(componentId, metadata, onPropertyChange) {
    this.componentId = componentId;
    this.metadata = metadata;
    this.onPropertyChange = onPropertyChange;
    this.debounceTimers = {};
  }

  /**
   * Render property controls based on metadata
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('div');
    container.className = 'property-editor';

    const title = document.createElement('h3');
    title.textContent = 'Properties';
    title.className = 'property-editor-title';
    container.appendChild(title);

    if (!this.metadata.props || Object.keys(this.metadata.props).length === 0) {
      const noProps = document.createElement('p');
      noProps.textContent = 'No configurable properties';
      noProps.className = 'no-props-message';
      container.appendChild(noProps);
      return container;
    }

    const form = document.createElement('form');
    form.className = 'property-form';

    Object.entries(this.metadata.props).forEach(([propName, propConfig]) => {
      const control = this.createControl(propName, propConfig);
      if (control) {
        form.appendChild(control);
      }
    });

    container.appendChild(form);
    return container;
  }

  /**
   * Create appropriate control based on prop type
   */
  createControl(propName, propConfig) {
    const wrapper = document.createElement('div');
    wrapper.className = 'property-control';

    const label = document.createElement('label');
    label.textContent = this.formatLabel(propName);
    label.className = 'property-label';
    label.htmlFor = `prop-${this.componentId}-${propName}`;
    wrapper.appendChild(label);

    let input;

    switch (propConfig.type) {
      case 'select':
        input = this.createSelect(propName, propConfig);
        break;
      case 'boolean':
        input = this.createToggle(propName, propConfig);
        break;
      case 'number':
        input = this.createNumber(propName, propConfig);
        break;
      case 'text':
      default:
        input = this.createText(propName, propConfig);
        break;
    }

    if (input) {
      input.id = `prop-${this.componentId}-${propName}`;
      wrapper.appendChild(input);

      if (propConfig.description) {
        const hint = document.createElement('small');
        hint.className = 'property-hint';
        hint.textContent = propConfig.description;
        wrapper.appendChild(hint);
      }
    }

    return wrapper;
  }

  /**
   * Create select dropdown for enum properties
   */
  createSelect(propName, propConfig) {
    const select = document.createElement('select');
    select.className = 'property-select';
    select.setAttribute('aria-label', this.formatLabel(propName));

    propConfig.options.forEach(option => {
      const optionEl = document.createElement('option');
      optionEl.value = option;
      optionEl.textContent = this.formatLabel(option);
      if (option === propConfig.default) {
        optionEl.selected = true;
      }
      select.appendChild(optionEl);
    });

    select.addEventListener('change', (e) => {
      this.handleChange(propName, e.target.value);
    });

    return select;
  }

  /**
   * Create toggle switch for boolean properties
   */
  createToggle(propName, propConfig) {
    const toggleWrapper = document.createElement('div');
    toggleWrapper.className = 'toggle-wrapper';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'property-toggle';
    checkbox.checked = propConfig.default;
    checkbox.setAttribute('aria-label', this.formatLabel(propName));

    const toggleSlider = document.createElement('span');
    toggleSlider.className = 'toggle-slider';

    checkbox.addEventListener('change', (e) => {
      this.handleChange(propName, e.target.checked);
    });

    toggleWrapper.appendChild(checkbox);
    toggleWrapper.appendChild(toggleSlider);

    return toggleWrapper;
  }

  /**
   * Create number input for numeric properties
   */
  createNumber(propName, propConfig) {
    const input = document.createElement('input');
    input.type = 'number';
    input.className = 'property-number';
    input.value = propConfig.default || 0;
    input.setAttribute('aria-label', this.formatLabel(propName));

    if (propConfig.min !== undefined) input.min = propConfig.min;
    if (propConfig.max !== undefined) input.max = propConfig.max;
    if (propConfig.step !== undefined) input.step = propConfig.step;

    input.addEventListener('input', (e) => {
      this.handleChangeDebounced(propName, parseInt(e.target.value, 10));
    });

    return input;
  }

  /**
   * Create text input for string properties
   */
  createText(propName, propConfig) {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'property-text';
    input.value = propConfig.default || '';
    input.placeholder = propConfig.placeholder || '';
    input.setAttribute('aria-label', this.formatLabel(propName));

    input.addEventListener('input', (e) => {
      this.handleChangeDebounced(propName, e.target.value);
    });

    return input;
  }

  /**
   * Handle property change immediately
   */
  handleChange(propName, value) {
    this.onPropertyChange(propName, value);
  }

  /**
   * Handle property change with debounce (for text/number inputs)
   */
  handleChangeDebounced(propName, value) {
    if (this.debounceTimers[propName]) {
      clearTimeout(this.debounceTimers[propName]);
    }

    this.debounceTimers[propName] = setTimeout(() => {
      this.onPropertyChange(propName, value);
    }, 300);
  }

  /**
   * Format property name for display
   */
  formatLabel(str) {
    return str
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (s) => s.toUpperCase())
      .trim();
  }
}
