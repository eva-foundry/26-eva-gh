import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-postback.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-postback',
  component: 'wb-postback',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
# wb-postback - AJAX Form Submission

WET-BOEW 4.x plugin reimplemented as modern Lit 3.x Web Component.

Submits forms via AJAX without page reload.

## Features
- ✅ AJAX form submission (no page reload)
- ✅ Loading spinner during submission
- ✅ Success/error status messages
- ✅ Prevents double submission
- ✅ Form validation before submit
- ✅ Retry button on error
- ✅ Accessible (ARIA, screen reader announcements)
- ✅ Bilingual (EN-CA/FR-CA)
- ✅ Custom success/error handlers via events
        `
      }
    }
  },
  argTypes: {
    action: {
      control: 'text',
      description: 'Form submission URL',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' }
      }
    },
    method: {
      control: 'select',
      options: ['GET', 'POST', 'PUT', 'DELETE'],
      description: 'HTTP method',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'POST' }
      }
    },
    showStatus: {
      control: 'boolean',
      description: 'Show status messages',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' }
      }
    }
  }
};

export default meta;
type Story = StoryObj;

export const BasicForm: Story = {
  render: () => html`
    <wb-postback
      action="https://httpbin.org/post"
      method="POST"
      success-message="Thank you! Your form has been submitted."
    >
      <form>
        <div style="margin-bottom: 1rem;">
          <label for="name-basic" style="display: block; margin-bottom: 0.5rem;">
            Name <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="text"
            id="name-basic"
            name="name"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="email-basic" style="display: block; margin-bottom: 0.5rem;">
            Email <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="email"
            id="email-basic"
            name="email"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="message-basic" style="display: block; margin-bottom: 0.5rem;">
            Message
          </label>
          <textarea
            id="message-basic"
            name="message"
            rows="4"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          ></textarea>
        </div>

        <button
          type="submit"
          style="background-color: #284162; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;"
        >
          Submit via AJAX
        </button>
      </form>
    </wb-postback>

    <div style="margin-top: 2rem; padding: 1rem; background: #e7f3ff; border-left: 4px solid #2196f3; border-radius: 4px;">
      <strong>💡 Demo:</strong> This form submits to httpbin.org which echoes back the POST data. Try submitting!
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Basic AJAX form submission with success message'
      }
    }
  }
};

export const ContactForm: Story = {
  render: () => html`
    <wb-postback action="https://httpbin.org/post" method="POST">
      <form>
        <h3>Contact Us</h3>
        
        <div style="margin-bottom: 1rem;">
          <label for="fullname" style="display: block; margin-bottom: 0.5rem;">
            Full Name <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="email-contact" style="display: block; margin-bottom: 0.5rem;">
            Email Address <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="email"
            id="email-contact"
            name="email"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="phone-contact" style="display: block; margin-bottom: 0.5rem;">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone-contact"
            name="phone"
            placeholder="613-555-0100"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="subject" style="display: block; margin-bottom: 0.5rem;">
            Subject <span style="color: #d3080c;">*</span>
          </label>
          <select
            id="subject"
            name="subject"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          >
            <option value="">-- Select --</option>
            <option value="general">General Inquiry</option>
            <option value="support">Technical Support</option>
            <option value="feedback">Feedback</option>
          </select>
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="message-contact" style="display: block; margin-bottom: 0.5rem;">
            Your Message <span style="color: #d3080c;">*</span>
          </label>
          <textarea
            id="message-contact"
            name="message"
            required
            rows="5"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          ></textarea>
        </div>

        <button
          type="submit"
          style="background-color: #284162; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;"
        >
          Send Message
        </button>
      </form>
    </wb-postback>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Complete contact form with multiple field types'
      }
    }
  }
};

export const CustomHandlers: Story = {
  render: () => html`
    <wb-postback
      action="https://httpbin.org/post"
      method="POST"
      @wb-postback-submit=${(e: CustomEvent) => {
        console.log('Form submission started:', e.detail);
      }}
      @wb-postback-success=${(e: CustomEvent) => {
        console.log('Form submitted successfully:', e.detail.response);
        alert('Success! Check the console for response data.');
      }}
      @wb-postback-error=${(e: CustomEvent) => {
        console.error('Form submission failed:', e.detail.error);
        alert('Error! Check the console for details.');
      }}
    >
      <form>
        <h3>Custom Event Handlers Demo</h3>
        
        <div style="margin-bottom: 1rem;">
          <label for="username" style="display: block; margin-bottom: 0.5rem;">
            Username <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="text"
            id="username"
            name="username"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="email-custom" style="display: block; margin-bottom: 0.5rem;">
            Email <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="email"
            id="email-custom"
            name="email"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <button
          type="submit"
          style="background-color: #284162; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;"
        >
          Submit
        </button>
      </form>
    </wb-postback>

    <div style="margin-top: 2rem; padding: 1rem; background: #fffbcc; border-left: 4px solid #f0ad4e; border-radius: 4px;">
      <strong>💡 Tip:</strong> Open your browser console and submit the form to see custom event handlers in action!
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Custom event handlers for submit, success, and error events'
      }
    }
  }
};

export const FileUpload: Story = {
  render: () => html`
    <wb-postback
      action="https://httpbin.org/post"
      method="POST"
      success-message="File uploaded successfully!"
    >
      <form>
        <h3>File Upload Form</h3>
        
        <div style="margin-bottom: 1rem;">
          <label for="file-title" style="display: block; margin-bottom: 0.5rem;">
            Document Title <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="text"
            id="file-title"
            name="title"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="file-upload" style="display: block; margin-bottom: 0.5rem;">
            Upload File <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="file"
            id="file-upload"
            name="file"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="file-description" style="display: block; margin-bottom: 0.5rem;">
            Description
          </label>
          <textarea
            id="file-description"
            name="description"
            rows="3"
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          ></textarea>
        </div>

        <button
          type="submit"
          style="background-color: #284162; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;"
        >
          Upload
        </button>
      </form>
    </wb-postback>

    <div style="margin-top: 2rem; padding: 1rem; background: #e7f3ff; border-left: 4px solid #2196f3; border-radius: 4px;">
      <strong>💡 Note:</strong> Supports multipart/form-data for file uploads (FormData automatically handled)
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Form with file upload support (multipart/form-data)'
      }
    }
  }
};

export const BilingualFrench: Story = {
  render: () => html`
    <wb-postback
      locale="fr-CA"
      action="https://httpbin.org/post"
      method="POST"
    >
      <form>
        <h3>Formulaire de contact</h3>
        
        <div style="margin-bottom: 1rem;">
          <label for="nom" style="display: block; margin-bottom: 0.5rem;">
            Nom complet <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <div style="margin-bottom: 1rem;">
          <label for="courriel-fr" style="display: block; margin-bottom: 0.5rem;">
            Adresse courriel <span style="color: #d3080c;">*</span>
          </label>
          <input
            type="email"
            id="courriel-fr"
            name="courriel"
            required
            style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;"
          />
        </div>

        <button
          type="submit"
          style="background-color: #284162; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;"
        >
          Soumettre
        </button>
      </form>
    </wb-postback>
  `,
  parameters: {
    docs: {
      description: {
        story: 'All status messages (loading, success, error) displayed in French (FR-CA)'
      }
    }
  }
};
