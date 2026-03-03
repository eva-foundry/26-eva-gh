import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-modal';

const meta: Meta = {
  title: 'GC Patterns/gc-modal',
  component: 'gc-modal',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'fullscreen']
    },
    dismissible: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('gc-modal');
      if (modal) {
        (modal as any).open = true;
      }
    };

    return html`
      <button @click="${openModal}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Modal
      </button>

      <gc-modal heading="Welcome">
        <p>This is a simple modal dialog. You can close it by clicking the close button or pressing Escape.</p>
        <div slot="footer">
          <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Confirm
          </button>
        </div>
      </gc-modal>
    `;
  }
};

export const Small: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('gc-modal[size="small"]');
      if (modal) {
        (modal as any).open = true;
      }
    };

    return html`
      <button @click="${openModal}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Small Modal
      </button>

      <gc-modal heading="Confirmation" size="small">
        <p>Are you sure you want to delete this item?</p>
        <div slot="footer">
          <button style="padding: 0.5rem 1rem; background: #f5f5f5; color: #333; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
            Cancel
          </button>
          <button style="padding: 0.5rem 1rem; background: #d3080c; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Delete
          </button>
        </div>
      </gc-modal>
    `;
  }
};

export const Large: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('gc-modal[size="large"]');
      if (modal) {
        (modal as any).open = true;
      }
    };

    return html`
      <button @click="${openModal}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Large Modal
      </button>

      <gc-modal heading="Terms and Conditions" size="large">
        <h3>1. Introduction</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        
        <h3>2. User Agreement</h3>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        
        <h3>3. Privacy Policy</h3>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

        <div slot="footer">
          <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Accept
          </button>
        </div>
      </gc-modal>
    `;
  }
};

export const NonDismissible: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('gc-modal[heading="Processing"]');
      if (modal) {
        (modal as any).open = true;
      }
    };

    const closeModal = () => {
      const modal = document.querySelector('gc-modal[heading="Processing"]');
      if (modal) {
        (modal as any).open = false;
      }
    };

    return html`
      <button @click="${openModal}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Non-Dismissible Modal
      </button>

      <gc-modal heading="Processing" dismissible="false" closeOnOverlayClick="false">
        <p>Please wait while we process your request...</p>
        <gc-loading-spinner></gc-loading-spinner>
        <div slot="footer">
          <button @click="${closeModal}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Cancel
          </button>
        </div>
      </gc-modal>
    `;
  }
};

export const FormModal: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('gc-modal[heading="Contact Us"]');
      if (modal) {
        (modal as any).open = true;
      }
    };

    const handleSubmit = (e: Event) => {
      e.preventDefault();
      const modal = document.querySelector('gc-modal[heading="Contact Us"]');
      if (modal) {
        (modal as any).open = false;
      }
    };

    return html`
      <button @click="${openModal}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Form Modal
      </button>

      <gc-modal heading="Contact Us">
        <form @submit="${handleSubmit}">
          <div style="margin-bottom: 1rem;">
            <label for="name" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Name</label>
            <input id="name" type="text" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
          </div>

          <div style="margin-bottom: 1rem;">
            <label for="email" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email</label>
            <input id="email" type="email" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
          </div>

          <div style="margin-bottom: 1rem;">
            <label for="message" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Message</label>
            <textarea id="message" required style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; min-height: 100px;"></textarea>
          </div>

          <div slot="footer">
            <button type="submit" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
              Send Message
            </button>
          </div>
        </form>
      </gc-modal>
    `;
  }
};

export const WithEvents: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('gc-modal[heading="Event Demo"]');
      if (modal) {
        (modal as any).open = true;
      }
    };

    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Modal opened:', customEvent.detail);
    };

    const handleClose = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Modal closed:', customEvent.detail);
    };

    return html`
      <button @click="${openModal}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Modal
      </button>

      <gc-modal
        heading="Event Demo"
        @gc-modal-open="${handleOpen}"
        @gc-modal-close="${handleClose}"
      >
        <p>Open the browser console to see event details when opening and closing this modal.</p>
        <div slot="footer">
          <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            OK
          </button>
        </div>
      </gc-modal>
    `;
  }
};

export const FrenchCanadian: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('gc-modal[locale="fr-CA"]');
      if (modal) {
        (modal as any).open = true;
      }
    };

    return html`
      <button @click="${openModal}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Ouvrir la fenêtre modale
      </button>

      <gc-modal heading="Bienvenue" locale="fr-CA">
        <p>Ceci est une fenêtre modale en français canadien.</p>
        <div slot="footer">
          <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Confirmer
          </button>
        </div>
      </gc-modal>
    `;
  }
};

export const MultipleModals: Story = {
  render: () => {
    const openFirst = () => {
      const modal = document.querySelector('gc-modal#first');
      if (modal) {
        (modal as any).open = true;
      }
    };

    const openSecond = () => {
      const modal = document.querySelector('gc-modal#second');
      if (modal) {
        (modal as any).open = true;
      }
    };

    return html`
      <button @click="${openFirst}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-right: 1rem;">
        Open First Modal
      </button>
      <button @click="${openSecond}" style="padding: 0.75rem 1.5rem; background: #278400; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Second Modal
      </button>

      <gc-modal id="first" heading="First Modal">
        <p>This is the first modal.</p>
        <div slot="footer">
          <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            OK
          </button>
        </div>
      </gc-modal>

      <gc-modal id="second" heading="Second Modal">
        <p>This is the second modal with different content.</p>
        <div slot="footer">
          <button style="padding: 0.75rem 1.5rem; background: #278400; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Continue
          </button>
        </div>
      </gc-modal>
    `;
  }
};

export const LongContent: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('gc-modal[heading="Privacy Policy"]');
      if (modal) {
        (modal as any).open = true;
      }
    };

    return html`
      <button @click="${openModal}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Long Content Modal
      </button>

      <gc-modal heading="Privacy Policy">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <div slot="footer">
          <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Accept
          </button>
        </div>
      </gc-modal>
    `;
  }
};

export const NestedContent: Story = {
  render: () => {
    const openModal = () => {
      const modal = document.querySelector('gc-modal[heading="Product Details"]');
      if (modal) {
        (modal as any).open = true;
      }
    };

    return html`
      <button @click="${openModal}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        View Product
      </button>

      <gc-modal heading="Product Details">
        <h3 style="margin: 0 0 1rem 0;">Premium Widget</h3>
        <p><strong>Price:</strong> $99.99</p>
        <p><strong>Availability:</strong> In Stock</p>
        
        <h4 style="margin: 1.5rem 0 0.5rem 0;">Features</h4>
        <ul>
          <li>High quality materials</li>
          <li>Durable construction</li>
          <li>1-year warranty</li>
          <li>Free shipping</li>
        </ul>

        <h4 style="margin: 1.5rem 0 0.5rem 0;">Specifications</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 0.5rem;">Dimensions</td>
            <td style="padding: 0.5rem;">10 x 5 x 3 inches</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 0.5rem;">Weight</td>
            <td style="padding: 0.5rem;">2.5 lbs</td>
          </tr>
          <tr style="border-bottom: 1px solid #ddd;">
            <td style="padding: 0.5rem;">Color</td>
            <td style="padding: 0.5rem;">Blue</td>
          </tr>
        </table>

        <div slot="footer">
          <button style="padding: 0.75rem 1.5rem; background: #278400; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Add to Cart
          </button>
        </div>
      </gc-modal>
    `;
  }
};
