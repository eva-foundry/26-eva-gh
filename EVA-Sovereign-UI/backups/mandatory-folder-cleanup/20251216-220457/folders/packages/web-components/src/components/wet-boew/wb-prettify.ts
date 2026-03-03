import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Prettify - Code Syntax Highlighting
 * Syntax highlighting for code blocks (simplified version)
 */
@customElement('wb-prettify')
export class WBPrettify extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .code-container {
      position: relative;
    }

    pre {
      background: var(--eva-colors-background-default, #f5f5f5);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      padding: var(--eva-spacing-md, 1rem);
      overflow-x: auto;
    }

    code {
      font-family: 'Courier New', Courier, monospace;
      font-size: 0.9em;
    }

    .keyword { color: #0000ff; font-weight: bold; }
    .string { color: #a31515; }
    .comment { color: #008000; font-style: italic; }
    .number { color: #098658; }
    .function { color: #795e26; }

    .copy-button {
      position: absolute;
      top: 8px;
      right: 8px;
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: white;
      cursor: pointer;
      font-size: 0.8em;
    }

    .copy-button:hover {
      background: var(--eva-colors-background-hover, #e5e5e5);
    }

    .copy-button:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
    }
  `;

  @property({ type: String })
  language = 'javascript';

  @property({ type: String })
  code = '';

  @property({ type: Boolean, attribute: 'show-copy' })
  showCopy = true;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-prettify', {
      'en-CA': {
        copy: 'Copy code',
        copied: 'Copied!',
        codeCopied: 'Code copied to clipboard'
      },
      'fr-CA': {
        copy: 'Copier le code',
        copied: 'Copié!',
        codeCopied: 'Code copié dans le presse-papiers'
      }
    });
  }

  private async copyCode(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code);
      this.emitEvent('wb-prettify-copy', { code: this.code });
      this.announce(this.getMessage('wb-prettify', 'codeCopied'));
      
      const button = this.shadowRoot?.querySelector('.copy-button');
      if (button) {
        const originalText = button.textContent;
        button.textContent = this.getMessage('wb-prettify', 'copied');
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    } catch (err) {
      this.emitEvent('wb-prettify-error', { error: 'Copy failed' });
    }
  }

  private highlightCode(): string {
    if (!this.code) return '';

    let highlighted = this.code;

    // Simple syntax highlighting (basic patterns)
    if (this.language === 'javascript' || this.language === 'typescript') {
      // Keywords
      highlighted = highlighted.replace(
        /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await)\b/g,
        '<span class="keyword">$1</span>'
      );
      
      // Strings
      highlighted = highlighted.replace(
        /(["'`])(?:(?=(\\?))\2.)*?\1/g,
        '<span class="string">$&</span>'
      );
      
      // Comments
      highlighted = highlighted.replace(
        /\/\/.*/g,
        '<span class="comment">$&</span>'
      );
      
      // Numbers
      highlighted = highlighted.replace(
        /\b(\d+)\b/g,
        '<span class="number">$1</span>'
      );
    }

    return highlighted;
  }

  override render() {
    const highlightedCode = this.highlightCode();

    return html`
      <div class="code-container">
        ${this.showCopy ? html`
          <button 
            class="copy-button" 
            @click="${this.copyCode}"
            aria-label="${this.getMessage('wb-prettify', 'copy')}"
          >
            ${this.getMessage('wb-prettify', 'copy')}
          </button>
        ` : ''}
        <pre><code .innerHTML="${highlightedCode}"></code></pre>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-prettify': WBPrettify;
  }
}
