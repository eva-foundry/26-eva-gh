import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-accordion';

const meta: Meta = {
  title: 'GC Patterns/gc-accordion',
  component: 'gc-accordion',
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-accordion
      .items="${[
        {
          id: '1',
          heading: 'Section 1',
          content: 'Content for section 1. This accordion allows only one panel to be open at a time.'
        },
        {
          id: '2',
          heading: 'Section 2',
          content: 'Content for section 2. Click to expand this section.'
        },
        {
          id: '3',
          heading: 'Section 3',
          content: 'Content for section 3. Previous sections will collapse automatically.'
        }
      ]}"
    ></gc-accordion>
  `
};

export const AllowMultiple: Story = {
  render: () => html`
    <gc-accordion
      allowMultiple
      .items="${[
        {
          id: '1',
          heading: 'Question 1',
          content: 'Answer to question 1. Multiple panels can be open at the same time.'
        },
        {
          id: '2',
          heading: 'Question 2',
          content: 'Answer to question 2. Opening this does not close other panels.'
        },
        {
          id: '3',
          heading: 'Question 3',
          content: 'Answer to question 3. You can have all panels open simultaneously.'
        }
      ]}"
    ></gc-accordion>
  `
};

export const InitiallyExpanded: Story = {
  render: () => html`
    <gc-accordion
      .items="${[
        {
          id: '1',
          heading: 'Introduction',
          content: 'This section starts expanded by default.',
          expanded: true
        },
        {
          id: '2',
          heading: 'Details',
          content: 'This section starts collapsed.'
        },
        {
          id: '3',
          heading: 'Summary',
          content: 'This section also starts collapsed.'
        }
      ]}"
    ></gc-accordion>
  `
};

export const FAQ: Story = {
  render: () => html`
    <gc-accordion
      .items="${[
        {
          id: 'faq1',
          heading: 'How do I reset my password?',
          content: 'To reset your password, click on the "Forgot Password" link on the login page. Enter your email address and follow the instructions sent to your inbox.'
        },
        {
          id: 'faq2',
          heading: 'What are the system requirements?',
          content: 'The system requires a modern web browser (Chrome, Firefox, Safari, or Edge) and an active internet connection. Mobile devices are also supported.'
        },
        {
          id: 'faq3',
          heading: 'How do I contact support?',
          content: 'You can contact our support team via email at support@example.com or call 1-800-123-4567 during business hours (9 AM - 5 PM EST).'
        },
        {
          id: 'faq4',
          heading: 'Is my data secure?',
          content: 'Yes, we use industry-standard encryption (AES-256) to protect your data both in transit and at rest. We are also compliant with GDPR and SOC 2 Type II standards.'
        }
      ]}"
    ></gc-accordion>
  `
};

export const WithLongContent: Story = {
  render: () => html`
    <gc-accordion
      .items="${[
        {
          id: '1',
          heading: 'Privacy Policy',
          content: `
            <h4>1. Information We Collect</h4>
            <p>We collect information that you provide directly to us, including name, email address, and any other information you choose to provide.</p>
            
            <h4>2. How We Use Your Information</h4>
            <p>We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you.</p>
            
            <h4>3. Information Sharing</h4>
            <p>We do not share your personal information with third parties except as described in this policy or with your consent.</p>
          `
        },
        {
          id: '2',
          heading: 'Terms of Service',
          content: `
            <h4>1. Acceptance of Terms</h4>
            <p>By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h4>2. Use License</h4>
            <p>Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.</p>
          `
        }
      ]}"
    ></gc-accordion>
  `
};

export const ManyItems: Story = {
  render: () => html`
    <gc-accordion
      .items="${[
        { id: '1', heading: 'Item 1', content: 'Content for item 1' },
        { id: '2', heading: 'Item 2', content: 'Content for item 2' },
        { id: '3', heading: 'Item 3', content: 'Content for item 3' },
        { id: '4', heading: 'Item 4', content: 'Content for item 4' },
        { id: '5', heading: 'Item 5', content: 'Content for item 5' },
        { id: '6', heading: 'Item 6', content: 'Content for item 6' },
        { id: '7', heading: 'Item 7', content: 'Content for item 7' },
        { id: '8', heading: 'Item 8', content: 'Content for item 8' }
      ]}"
    ></gc-accordion>
  `
};

export const WithEvents: Story = {
  render: () => {
    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Accordion toggled:', customEvent.detail);
    };

    return html`
      <gc-accordion
        .items="${[
          {
            id: '1',
            heading: 'Section 1',
            content: 'Open the browser console to see event details.'
          },
          {
            id: '2',
            heading: 'Section 2',
            content: 'Events are emitted on every toggle action.'
          }
        ]}"
        @gc-accordion-toggle="${handleToggle}"
      ></gc-accordion>
    `;
  }
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-accordion
      locale="fr-CA"
      .items="${[
        {
          id: '1',
          heading: 'Introduction',
          content: 'Ceci est le contenu de la section d\'introduction.'
        },
        {
          id: '2',
          heading: 'Détails',
          content: 'Voici les détails de cette section.'
        },
        {
          id: '3',
          heading: 'Résumé',
          content: 'Ceci est le résumé final de l\'accordéon.'
        }
      ]}"
    ></gc-accordion>
  `
};

export const NavigationMenu: Story = {
  render: () => html`
    <gc-accordion
      allowMultiple
      .items="${[
        {
          id: 'products',
          heading: 'Products',
          content: `
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Product A</a></li>
              <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Product B</a></li>
              <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Product C</a></li>
            </ul>
          `
        },
        {
          id: 'services',
          heading: 'Services',
          content: `
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Consulting</a></li>
              <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Support</a></li>
              <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Training</a></li>
            </ul>
          `
        },
        {
          id: 'company',
          heading: 'Company',
          content: `
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">About Us</a></li>
              <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Careers</a></li>
              <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Contact</a></li>
            </ul>
          `
        }
      ]}"
    ></gc-accordion>
  `
};

export const HelpDocumentation: Story = {
  render: () => html`
    <gc-accordion
      .items="${[
        {
          id: 'getting-started',
          heading: 'Getting Started',
          content: `
            <p>Welcome to our platform! Here's how to get started:</p>
            <ol>
              <li>Create an account</li>
              <li>Complete your profile</li>
              <li>Explore the dashboard</li>
              <li>Start using the features</li>
            </ol>
          `,
          expanded: true
        },
        {
          id: 'account-setup',
          heading: 'Account Setup',
          content: `
            <p>Setting up your account is easy:</p>
            <ul>
              <li>Provide your basic information</li>
              <li>Choose a strong password</li>
              <li>Verify your email address</li>
              <li>Set up two-factor authentication (recommended)</li>
            </ul>
          `
        },
        {
          id: 'troubleshooting',
          heading: 'Troubleshooting',
          content: `
            <p>Having issues? Try these common solutions:</p>
            <ul>
              <li>Clear your browser cache</li>
              <li>Try a different browser</li>
              <li>Check your internet connection</li>
              <li>Contact support if problems persist</li>
            </ul>
          `
        }
      ]}"
    ></gc-accordion>
  `
};

export const ProductFeatures: Story = {
  render: () => html`
    <gc-accordion
      allowMultiple
      .items="${[
        {
          id: 'security',
          heading: '🔒 Security Features',
          content: 'End-to-end encryption, two-factor authentication, and regular security audits ensure your data is always protected.'
        },
        {
          id: 'performance',
          heading: '⚡ Performance',
          content: 'Lightning-fast load times, optimized backend, and CDN distribution deliver exceptional user experience.'
        },
        {
          id: 'scalability',
          heading: '📈 Scalability',
          content: 'Built to grow with your business, from startups to enterprise-level organizations.'
        },
        {
          id: 'support',
          heading: '💬 24/7 Support',
          content: 'Round-the-clock customer support via chat, email, and phone to help you whenever you need it.'
        }
      ]}"
    ></gc-accordion>
  `
};
