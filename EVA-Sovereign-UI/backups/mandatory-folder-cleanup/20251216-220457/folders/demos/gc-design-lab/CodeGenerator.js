/**
 * CodeGenerator.js
 * Generates framework-specific code examples with syntax highlighting
 */

export class CodeGenerator {
  constructor(componentId, metadata, currentProps) {
    this.componentId = componentId;
    this.metadata = metadata;
    this.currentProps = currentProps;
  }

  /**
   * Render tabbed code view with syntax highlighting
   * @returns {HTMLElement}
   */
  render() {
    const container = document.createElement('div');
    container.className = 'code-generator';

    const title = document.createElement('h3');
    title.textContent = 'Code Examples';
    title.className = 'code-generator-title';
    container.appendChild(title);

    // Framework tabs
    const tabs = this.createTabs();
    container.appendChild(tabs);

    // Code display area
    const codeDisplay = document.createElement('div');
    codeDisplay.className = 'code-display';
    codeDisplay.id = `code-display-${this.componentId}`;
    container.appendChild(codeDisplay);

    // Show default framework (Web Components)
    this.showFramework('webcomponent', codeDisplay);

    return container;
  }

  /**
   * Create framework tabs
   */
  createTabs() {
    const tabContainer = document.createElement('div');
    tabContainer.className = 'code-tabs';
    tabContainer.setAttribute('role', 'tablist');

    const frameworks = [
      { id: 'webcomponent', label: 'Web Components' },
      { id: 'react', label: 'React' },
      { id: 'vue', label: 'Vue' },
      { id: 'angular', label: 'Angular' },
      { id: 'svelte', label: 'Svelte' }
    ];

    frameworks.forEach((framework, index) => {
      const tab = document.createElement('button');
      tab.className = 'code-tab';
      tab.textContent = framework.label;
      tab.setAttribute('role', 'tab');
      tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      tab.setAttribute('aria-controls', `code-display-${this.componentId}`);
      
      if (index === 0) {
        tab.classList.add('active');
      }

      tab.addEventListener('click', () => {
        // Update active tab
        tabContainer.querySelectorAll('.code-tab').forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        // Show framework code
        const codeDisplay = document.getElementById(`code-display-${this.componentId}`);
        this.showFramework(framework.id, codeDisplay);
      });

      tabContainer.appendChild(tab);
    });

    return tabContainer;
  }

  /**
   * Show code for specific framework
   */
  showFramework(frameworkId, container) {
    container.innerHTML = '';

    const codeWrapper = document.createElement('div');
    codeWrapper.className = 'code-wrapper';

    const pre = document.createElement('pre');
    const code = document.createElement('code');
    code.className = `language-${this.getLanguageClass(frameworkId)}`;
    
    const codeText = this.generateCode(frameworkId);
    code.textContent = codeText;
    
    pre.appendChild(code);
    codeWrapper.appendChild(pre);

    // Copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = '📋 Copy Code';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    copyButton.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(codeText);
        copyButton.textContent = '✅ Copied!';
        copyButton.classList.add('success');
        
        setTimeout(() => {
          copyButton.textContent = '📋 Copy Code';
          copyButton.classList.remove('success');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        copyButton.textContent = '❌ Failed';
        setTimeout(() => {
          copyButton.textContent = '📋 Copy Code';
        }, 2000);
      }
    });

    codeWrapper.appendChild(copyButton);
    container.appendChild(codeWrapper);

    // Apply syntax highlighting if available
    if (window.Prism) {
      Prism.highlightElement(code);
    } else if (window.hljs) {
      window.hljs.highlightElement(code);
    }
  }

  /**
   * Get language class for syntax highlighter
   */
  getLanguageClass(frameworkId) {
    const languageMap = {
      'webcomponent': 'html',
      'react': 'jsx',
      'vue': 'html',
      'angular': 'typescript',
      'svelte': 'html'
    };
    return languageMap[frameworkId] || 'html';
  }

  /**
   * Generate code snippet for framework
   */
  generateCode(frameworkId) {
    // Start with template from metadata
    let template = this.metadata.examples[frameworkId] || '';

    // Replace placeholder values with current props
    Object.entries(this.currentProps).forEach(([propName, value]) => {
      const metadata = this.metadata.props[propName];
      if (!metadata) return;

      // Skip default values (don't clutter the code)
      if (value === metadata.default) return;

      // Build prop string based on type
      let propString = '';
      
      if (metadata.type === 'boolean') {
        if (value === true) {
          propString = this.formatBooleanProp(frameworkId, propName, value);
        }
        // Skip false boolean props (not needed in markup)
      } else if (metadata.type === 'number') {
        propString = this.formatNumberProp(frameworkId, propName, value);
      } else {
        propString = this.formatStringProp(frameworkId, propName, value);
      }

      // Find component tag in template and inject prop
      template = this.injectProp(template, this.componentId, propString);
    });

    return template;
  }

  /**
   * Format boolean prop for framework
   */
  formatBooleanProp(frameworkId, propName, value) {
    if (frameworkId === 'react') {
      return `${propName}={${value}}`;
    } else if (frameworkId === 'vue') {
      return `:${propName}="${value}"`;
    } else if (frameworkId === 'angular') {
      return `[${propName}]="${value}"`;
    } else {
      // Web Components, Svelte - boolean attribute
      return value ? propName : '';
    }
  }

  /**
   * Format number prop for framework
   */
  formatNumberProp(frameworkId, propName, value) {
    if (frameworkId === 'react') {
      return `${propName}={${value}}`;
    } else if (frameworkId === 'vue') {
      return `:${propName}="${value}"`;
    } else if (frameworkId === 'angular') {
      return `[${propName}]="${value}"`;
    } else {
      return `${propName}="${value}"`;
    }
  }

  /**
   * Format string prop for framework
   */
  formatStringProp(frameworkId, propName, value) {
    // Escape quotes
    const escapedValue = value.replace(/"/g, '&quot;');
    return `${propName}="${escapedValue}"`;
  }

  /**
   * Inject prop into component tag
   * Simple implementation - finds component tag and adds prop
   */
  injectProp(template, componentId, propString) {
    if (!propString) return template;

    // Find component tag (case-insensitive)
    const tagRegex = new RegExp(`(<${componentId}[^>]*)(>)`, 'i');
    const match = template.match(tagRegex);
    
    if (match) {
      // Check if prop already exists
      if (!match[1].includes(propString.split('=')[0])) {
        return template.replace(tagRegex, `$1\n  ${propString}$2`);
      }
    }
    
    return template;
  }

  /**
   * Update code display when props change
   */
  updateProps(newProps) {
    this.currentProps = newProps;
    
    // Re-render current framework
    const codeDisplay = document.getElementById(`code-display-${this.componentId}`);
    if (codeDisplay) {
      const activeTab = document.querySelector('.code-tab.active');
      if (activeTab) {
        const frameworkId = this.getFrameworkId(activeTab.textContent);
        this.showFramework(frameworkId, codeDisplay);
      }
    }
  }

  /**
   * Get framework ID from tab label
   */
  getFrameworkId(label) {
    const map = {
      'Web Components': 'webcomponent',
      'React': 'react',
      'Vue': 'vue',
      'Angular': 'angular',
      'Svelte': 'svelte'
    };
    return map[label] || 'webcomponent';
  }
}
