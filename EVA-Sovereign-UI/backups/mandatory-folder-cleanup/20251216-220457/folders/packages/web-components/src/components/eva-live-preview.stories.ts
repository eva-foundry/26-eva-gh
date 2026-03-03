import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-live-preview.js';

const meta: Meta = {
  title: 'Components/Backstage/LivePreview',
  component: 'eva-live-preview',
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
      description: 'Preview page URL (iframe src)',
    },
    iframeTitle: {
      control: 'text',
      description: 'Iframe title for accessibility',
    },
    showLoading: {
      control: 'boolean',
      description: 'Show loading indicator',
    },
    syncA11y: {
      control: 'boolean',
      description: 'Auto-sync a11y-change events',
    },
    syncTheme: {
      control: 'boolean',
      description: 'Auto-sync theme-change events',
    },
    syncI18n: {
      control: 'boolean',
      description: 'Auto-sync i18n-change events',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <h2 style="margin: 0 0 1rem 0; color: #26374A;">Live Preview Component</h2>
      <p style="color: #666666; line-height: 1.6; margin-bottom: 1.5rem;">
        The live preview embeds an iframe and provides real-time postMessage communication.
        This example uses about:blank for simplicity.
      </p>
      
      <div style="height: 500px; border: 2px solid #e5e5e5; border-radius: 0.5rem; overflow: hidden;">
        <eva-live-preview 
          src="about:blank" 
          iframeTitle="Preview frame">
        </eva-live-preview>
      </div>
    </div>
  `,
};

export const WithLoadingState: Story = {
  render: () => html`
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <h2 style="margin: 0 0 1rem 0; color: #26374A;">Loading State</h2>
      <p style="color: #666666; line-height: 1.6; margin-bottom: 1.5rem;">
        Shows a loading spinner while the iframe is loading.
        The spinner automatically hides when the iframe's <code>load</code> event fires.
      </p>
      
      <div style="height: 500px; border: 2px solid #e5e5e5; border-radius: 0.5rem; overflow: hidden;">
        <eva-live-preview 
          src="https://example.com" 
          iframeTitle="Example website"
          showLoading>
        </eva-live-preview>
      </div>
    </div>
  `,
};

export const ErrorHandling: Story = {
  render: () => {
    const handleError = (e: CustomEvent) => {
      console.error('Preview error:', e.detail);
      alert(`Preview failed to load: ${e.detail.src}`);
    };
    
    setTimeout(() => {
      const preview = document.querySelector('eva-live-preview');
      if (preview) {
        preview.addEventListener('preview-error', handleError as EventListener);
      }
    }, 100);
    
    return html`
      <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
        <h2 style="margin: 0 0 1rem 0; color: #26374A;">Error Handling</h2>
        <p style="color: #666666; line-height: 1.6; margin-bottom: 1.5rem;">
          When the iframe fails to load, an error state is shown with a retry button.
          This example intentionally loads an invalid URL.
        </p>
        
        <div style="height: 500px; border: 2px solid #e5e5e5; border-radius: 0.5rem; overflow: hidden;">
          <eva-live-preview 
            src="https://invalid-domain-that-does-not-exist.com" 
            iframeTitle="Invalid page">
          </eva-live-preview>
        </div>
      </div>
    `;
  },
};

export const PostMessageCommunication: Story = {
  render: () => {
    const sendTestMessage = () => {
      const preview = document.querySelector('eva-live-preview') as any;
      if (preview) {
        preview.sendMessage({
          type: 'a11y-update',
          data: { fontSize: 125, contrast: 'aaa' },
        });
        alert('Message sent! Check console for details.');
        console.log('Sent:', { type: 'a11y-update', data: { fontSize: 125, contrast: 'aaa' } });
      }
    };
    
    return html`
      <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
        <h2 style="margin: 0 0 1rem 0; color: #26374A;">postMessage Communication</h2>
        <p style="color: #666666; line-height: 1.6; margin-bottom: 1rem;">
          Send messages to the iframe using the <code>sendMessage()</code> method.
          The iframe can listen for these messages and update its UI accordingly.
        </p>
        
        <button 
          @click="${sendTestMessage}"
          style="padding: 0.75rem 1.5rem; background: #284162; color: #ffffff; border: none; border-radius: 0.25rem; cursor: pointer; margin-bottom: 1.5rem;">
          Send Test Message
        </button>
        
        <div style="height: 500px; border: 2px solid #e5e5e5; border-radius: 0.5rem; overflow: hidden;">
          <eva-live-preview 
            src="about:blank" 
            iframeTitle="Communication test">
          </eva-live-preview>
        </div>
        
        <div style="margin-top: 1.5rem; padding: 1.5rem; background: #f0f7fb; border-left: 4px solid #1C578A; border-radius: 0.25rem;">
          <strong style="display: block; margin-bottom: 0.5rem; color: #284162;">Message API:</strong>
          <pre style="margin: 0; font-family: monospace; font-size: 0.875rem; color: #284162; overflow-x: auto;">
preview.sendMessage({
  type: 'a11y-update',
  data: { fontSize: 125 }
});</pre>
        </div>
      </div>
    `;
  },
};

export const HelperMethods: Story = {
  render: () => {
    const updateFontSize = () => {
      const preview = document.querySelector('eva-live-preview') as any;
      if (preview) {
        preview.updateA11y({ fontSize: 150 });
        console.log('Updated a11y settings');
      }
    };
    
    const updateTheme = () => {
      const preview = document.querySelector('eva-live-preview') as any;
      if (preview) {
        preview.updateTheme({ primaryColor: '#ff0000', mode: 'dark' });
        console.log('Updated theme');
      }
    };
    
    const updateI18n = () => {
      const preview = document.querySelector('eva-live-preview') as any;
      if (preview) {
        preview.updateI18n({ 'app.title': 'Titre de l\'application' });
        console.log('Updated i18n');
      }
    };
    
    const reloadPreview = () => {
      const preview = document.querySelector('eva-live-preview') as any;
      if (preview) {
        preview.reload();
        console.log('Reloaded preview');
      }
    };
    
    return html`
      <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
        <h2 style="margin: 0 0 1rem 0; color: #26374A;">Helper Methods</h2>
        <p style="color: #666666; line-height: 1.6; margin-bottom: 1rem;">
          The component provides convenience methods for common update types:
        </p>
        
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
          <button @click="${updateFontSize}" style="padding: 0.75rem 1rem; background: #284162; color: #ffffff; border: none; border-radius: 0.25rem; cursor: pointer;">
            updateA11y()
          </button>
          <button @click="${updateTheme}" style="padding: 0.75rem 1rem; background: #284162; color: #ffffff; border: none; border-radius: 0.25rem; cursor: pointer;">
            updateTheme()
          </button>
          <button @click="${updateI18n}" style="padding: 0.75rem 1rem; background: #284162; color: #ffffff; border: none; border-radius: 0.25rem; cursor: pointer;">
            updateI18n()
          </button>
          <button @click="${reloadPreview}" style="padding: 0.75rem 1rem; background: #af3c43; color: #ffffff; border: none; border-radius: 0.25rem; cursor: pointer;">
            reload()
          </button>
        </div>
        
        <div style="height: 500px; border: 2px solid #e5e5e5; border-radius: 0.5rem; overflow: hidden;">
          <eva-live-preview 
            src="about:blank" 
            iframeTitle="Helper methods demo">
          </eva-live-preview>
        </div>
      </div>
    `;
  },
};

export const AutoSync: Story = {
  render: () => {
    const dispatchA11yEvent = () => {
      window.dispatchEvent(new CustomEvent('a11y-change', {
        detail: { fontSize: 125, contrast: 'aaa' },
      }));
      console.log('Dispatched a11y-change event');
      alert('a11y-change event dispatched! The preview will receive it automatically.');
    };
    
    const dispatchThemeEvent = () => {
      window.dispatchEvent(new CustomEvent('theme-change', {
        detail: { primaryColor: '#0050b3', mode: 'dark' },
      }));
      console.log('Dispatched theme-change event');
      alert('theme-change event dispatched!');
    };
    
    return html`
      <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
        <h2 style="margin: 0 0 1rem 0; color: #26374A;">Auto-Sync Events</h2>
        <p style="color: #666666; line-height: 1.6; margin-bottom: 1rem;">
          When <code>syncA11y</code>, <code>syncTheme</code>, or <code>syncI18n</code> are true (default),
          the preview automatically listens to global events and forwards them to the iframe.
        </p>
        
        <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
          <button @click="${dispatchA11yEvent}" style="padding: 0.75rem 1rem; background: #284162; color: #ffffff; border: none; border-radius: 0.25rem; cursor: pointer;">
            Dispatch a11y-change
          </button>
          <button @click="${dispatchThemeEvent}" style="padding: 0.75rem 1rem; background: #284162; color: #ffffff; border: none; border-radius: 0.25rem; cursor: pointer;">
            Dispatch theme-change
          </button>
        </div>
        
        <div style="height: 500px; border: 2px solid #e5e5e5; border-radius: 0.5rem; overflow: hidden;">
          <eva-live-preview 
            src="about:blank" 
            syncA11y
            syncTheme
            syncI18n>
          </eva-live-preview>
        </div>
        
        <div style="margin-top: 1.5rem; padding: 1.5rem; background: #f0f7fb; border-left: 4px solid #1C578A; border-radius: 0.25rem;">
          <strong style="display: block; margin-bottom: 0.5rem; color: #284162;">How it works:</strong>
          <p style="margin: 0; font-size: 0.875rem; color: #284162; line-height: 1.6;">
            1. Component listens to <code>a11y-change</code>, <code>theme-change</code>, <code>i18n-change</code> on window<br>
            2. When event fires, automatically calls <code>sendMessage()</code> to iframe<br>
            3. Iframe receives message via <code>window.addEventListener('message', ...)</code>
          </p>
        </div>
      </div>
    `;
  },
};

export const MessageListeners: Story = {
  render: () => {
    let messageLog: string[] = [];
    
    const updateLog = () => {
      const logElement = document.getElementById('message-log');
      if (logElement) {
        logElement.innerHTML = messageLog.slice(-10).reverse().join('<br>');
      }
    };
    
    setTimeout(() => {
      const preview = document.querySelector('eva-live-preview') as any;
      if (preview) {
        // Register message listener
        preview.onMessage('custom-event', (data: any) => {
          messageLog.push(`Received: ${JSON.stringify(data)}`);
          updateLog();
        });
        
        // Listen to preview-message event
        preview.addEventListener('preview-message', (e: CustomEvent) => {
          messageLog.push(`Event: ${e.detail.type} - ${JSON.stringify(e.detail.data)}`);
          updateLog();
        });
      }
    }, 100);
    
    const sendCustomMessage = () => {
      const preview = document.querySelector('eva-live-preview') as any;
      if (preview) {
        preview.sendMessage({
          type: 'custom-event',
          data: { timestamp: Date.now(), message: 'Hello from parent!' },
        });
      }
    };
    
    return html`
      <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
        <h2 style="margin: 0 0 1rem 0; color: #26374A;">Message Listeners</h2>
        <p style="color: #666666; line-height: 1.6; margin-bottom: 1rem;">
          Register listeners for specific message types using <code>onMessage()</code>.
          The component also emits a <code>preview-message</code> event for all received messages.
        </p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 1.5rem;">
          <div>
            <button @click="${sendCustomMessage}" style="padding: 0.75rem 1.5rem; background: #284162; color: #ffffff; border: none; border-radius: 0.25rem; cursor: pointer; width: 100%;">
              Send Custom Message
            </button>
          </div>
          
          <div style="background: #f9f9f9; padding: 1rem; border-radius: 0.5rem;">
            <strong style="display: block; margin-bottom: 0.5rem; color: #26374A; font-size: 0.875rem;">Message Log:</strong>
            <div id="message-log" style="font-family: monospace; font-size: 0.75rem; color: #284162; max-height: 150px; overflow-y: auto;">
              (Messages will appear here)
            </div>
          </div>
        </div>
        
        <div style="height: 400px; border: 2px solid #e5e5e5; border-radius: 0.5rem; overflow: hidden;">
          <eva-live-preview 
            src="about:blank" 
            iframeTitle="Message listeners demo">
          </eva-live-preview>
        </div>
      </div>
    `;
  },
};

export const SecurityDemo: Story = {
  render: () => html`
    <div style="max-width: 1200px; margin: 0 auto; padding: 2rem;">
      <h2 style="margin: 0 0 1rem 0; color: #26374A;">Security Features</h2>
      <p style="color: #666666; line-height: 1.6; margin-bottom: 1.5rem;">
        The component includes security measures for cross-origin communication:
      </p>
      
      <ul style="color: #666666; line-height: 1.8; margin-bottom: 1.5rem;">
        <li><strong>Origin validation:</strong> Messages from untrusted origins are rejected</li>
        <li><strong>Sandbox attribute:</strong> Iframe has restricted permissions</li>
        <li><strong>targetOrigin:</strong> postMessage uses specific origin (not wildcard)</li>
        <li><strong>Message verification:</strong> Received messages are validated before processing</li>
      </ul>
      
      <div style="height: 400px; border: 2px solid #e5e5e5; border-radius: 0.5rem; overflow: hidden;">
        <eva-live-preview 
          src="about:blank" 
          targetOrigin="${window.location.origin}"
          iframeTitle="Secure preview">
        </eva-live-preview>
      </div>
      
      <div style="margin-top: 1.5rem; padding: 1.5rem; background: #fff3cd; border-left: 4px solid #ffc107; border-radius: 0.25rem;">
        <strong style="display: block; margin-bottom: 0.5rem; color: #856404;">⚠️ Security Best Practices:</strong>
        <ul style="margin: 0.5rem 0 0 1.25rem; color: #856404; line-height: 1.6; font-size: 0.875rem;">
          <li>Always set <code>targetOrigin</code> to specific domain (never "*" in production)</li>
          <li>Validate message structure before processing</li>
          <li>Use same-origin iframes when possible</li>
          <li>Enable CORS only for trusted domains</li>
        </ul>
      </div>
    </div>
  `,
};

export const IntegrationExample: Story = {
  render: () => html`
    <div style="max-width: 1400px; margin: 0 auto; padding: 2rem;">
      <h2 style="margin: 0 0 1rem 0; color: #26374A;">Full Integration Example</h2>
      <p style="color: #666666; line-height: 1.6; margin-bottom: 1.5rem;">
        This shows how eva-live-preview works with eva-a11y-panel and eva-backstage-shell.
        Adjust accessibility settings on the left to see changes reflected in the preview.
      </p>
      
      <div style="display: grid; grid-template-columns: 400px 1fr; gap: 2rem; height: 600px;">
        <div style="background: #ffffff; padding: 1.5rem; border-radius: 0.5rem; overflow-y: auto;">
          <h3 style="margin: 0 0 1rem 0; color: #26374A; font-size: 1.125rem;">Settings Panel</h3>
          <eva-a11y-panel></eva-a11y-panel>
        </div>
        
        <div style="border: 2px solid #e5e5e5; border-radius: 0.5rem; overflow: hidden;">
          <eva-live-preview 
            src="about:blank" 
            iframeTitle="Live preview of changes"
            syncA11y>
          </eva-live-preview>
        </div>
      </div>
      
      <div style="margin-top: 1.5rem; padding: 1.5rem; background: #f0f7fb; border-left: 4px solid #1C578A; border-radius: 0.25rem;">
        <strong style="display: block; margin-bottom: 0.5rem; color: #284162;">💡 Try this:</strong>
        <p style="margin: 0; font-size: 0.875rem; color: #284162; line-height: 1.6;">
          1. Adjust font size, contrast, or spacing settings<br>
          2. Changes are sent to the preview via postMessage<br>
          3. Preview updates in <100ms (no page reload needed)<br>
          4. This enables real-time customization for all 40+ EVA products
        </p>
      </div>
    </div>
  `,
};
