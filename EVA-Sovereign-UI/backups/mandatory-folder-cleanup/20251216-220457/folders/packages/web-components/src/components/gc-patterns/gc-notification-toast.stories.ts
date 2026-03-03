import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-notification-toast';
import type { GCNotificationToast } from './gc-notification-toast';

const meta: Meta = {
  title: 'GC Patterns/gc-notification-toast',
  component: 'gc-notification-toast',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const handleClick = (variant: 'info' | 'success' | 'warning' | 'error') => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      const messages = {
        info: 'This is an informational message',
        success: 'Your changes have been saved successfully',
        warning: 'Please review your information before submitting',
        error: 'An error occurred while processing your request'
      };
      toast?.show(messages[variant], variant);
    };

    return html`
      <gc-notification-toast></gc-notification-toast>
      
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button @click="${() => handleClick('info')}" style="padding: 0.75rem 1.5rem; background: #269abc; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          Show Info
        </button>
        <button @click="${() => handleClick('success')}" style="padding: 0.75rem 1.5rem; background: #278400; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          Show Success
        </button>
        <button @click="${() => handleClick('warning')}" style="padding: 0.75rem 1.5rem; background: #ee7100; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          Show Warning
        </button>
        <button @click="${() => handleClick('error')}" style="padding: 0.75rem 1.5rem; background: #d3080c; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          Show Error
        </button>
      </div>
    `;
  }
};

export const AutoDismiss: Story = {
  render: () => {
    const handleClick = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.show('This notification will auto-dismiss in 3 seconds', 'info', { duration: 3000 });
    };

    return html`
      <gc-notification-toast></gc-notification-toast>
      
      <button @click="${handleClick}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Show Auto-Dismiss Toast (3s)
      </button>
    `;
  }
};

export const Persistent: Story = {
  render: () => {
    const handleClick = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.show('This notification stays until manually dismissed', 'warning', { duration: 0 });
    };

    return html`
      <gc-notification-toast></gc-notification-toast>
      
      <button @click="${handleClick}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Show Persistent Toast
      </button>
    `;
  }
};

export const NonDismissible: Story = {
  render: () => {
    const handleClick = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.show('This notification cannot be dismissed manually', 'info', { 
        duration: 5000, 
        dismissible: false 
      });
    };

    return html`
      <gc-notification-toast></gc-notification-toast>
      
      <button @click="${handleClick}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Show Non-Dismissible Toast
      </button>
      <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
        Note: Will auto-dismiss after 5 seconds
      </p>
    `;
  }
};

export const MultipleNotifications: Story = {
  render: () => {
    const handleClick = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.info('Processing your request...');
      setTimeout(() => toast?.success('Step 1 complete'), 1000);
      setTimeout(() => toast?.success('Step 2 complete'), 2000);
      setTimeout(() => toast?.success('All steps completed!'), 3000);
    };

    return html`
      <gc-notification-toast></gc-notification-toast>
      
      <button @click="${handleClick}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Show Multiple Toasts
      </button>
    `;
  }
};

export const ConvenienceMethods: Story = {
  render: () => {
    const handleInfo = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.info('Using info() method');
    };

    const handleSuccess = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.success('Using success() method');
    };

    const handleWarning = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.warning('Using warning() method');
    };

    const handleError = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.error('Using error() method');
    };

    return html`
      <gc-notification-toast></gc-notification-toast>
      
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button @click="${handleInfo}" style="padding: 0.75rem 1.5rem; background: #269abc; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          info()
        </button>
        <button @click="${handleSuccess}" style="padding: 0.75rem 1.5rem; background: #278400; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          success()
        </button>
        <button @click="${handleWarning}" style="padding: 0.75rem 1.5rem; background: #ee7100; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          warning()
        </button>
        <button @click="${handleError}" style="padding: 0.75rem 1.5rem; background: #d3080c; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          error()
        </button>
      </div>
    `;
  }
};

export const WithEvents: Story = {
  render: () => {
    const handleClick = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.show('Check the console for events', 'info');
    };

    return html`
      <gc-notification-toast
        @gc-toast-show="${(e: CustomEvent) => console.log('Toast shown:', e.detail)}"
        @gc-toast-dismiss="${(e: CustomEvent) => console.log('Toast dismissed:', e.detail)}"
      ></gc-notification-toast>
      
      <button @click="${handleClick}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Show Toast
      </button>
      <p style="margin-top: 1rem; color: #666; font-size: 0.875rem;">
        Open browser console to see event logs
      </p>
    `;
  }
};

export const DismissAll: Story = {
  render: () => {
    const handleShowMultiple = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.info('Notification 1', { duration: 0 });
      toast?.success('Notification 2', { duration: 0 });
      toast?.warning('Notification 3', { duration: 0 });
      toast?.error('Notification 4', { duration: 0 });
    };

    const handleDismissAll = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.dismissAll();
    };

    return html`
      <gc-notification-toast></gc-notification-toast>
      
      <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
        <button @click="${handleShowMultiple}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          Show 4 Persistent Toasts
        </button>
        <button @click="${handleDismissAll}" style="padding: 0.75rem 1.5rem; background: #d3080c; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
          Dismiss All
        </button>
      </div>
    `;
  }
};

export const FrenchCanadian: Story = {
  render: () => {
    const handleClick = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.success('Vos modifications ont été enregistrées avec succès');
    };

    return html`
      <gc-notification-toast locale="fr-CA"></gc-notification-toast>
      
      <button @click="${handleClick}" style="padding: 0.75rem 1.5rem; background: #278400; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Afficher la notification
      </button>
    `;
  }
};

export const RealWorldExample: Story = {
  render: () => {
    const handleSave = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.info('Saving changes...');
      
      setTimeout(() => {
        toast?.success('Changes saved successfully');
      }, 1500);
    };

    const handleSubmit = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.warning('Please review all fields before submitting');
    };

    const handleDelete = () => {
      const toast = document.querySelector('gc-notification-toast') as GCNotificationToast;
      toast?.error('You do not have permission to delete this item');
    };

    return html`
      <gc-notification-toast></gc-notification-toast>
      
      <div style="max-width: 800px; margin: 0 auto; padding: 2rem; background: #f5f5f5; border-radius: 8px;">
        <h2 style="margin: 0 0 1rem 0;">Application Form</h2>
        
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Name</label>
          <input type="text" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email</label>
          <input type="email" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>

        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
          <button @click="${handleSave}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Save Draft
          </button>
          <button @click="${handleSubmit}" style="padding: 0.75rem 1.5rem; background: #278400; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Submit
          </button>
          <button @click="${handleDelete}" style="padding: 0.75rem 1.5rem; background: #d3080c; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Delete
          </button>
        </div>
      </div>
    `;
  }
};
