import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-tabs';

const meta: Meta = {
  title: 'GC Patterns/gc-tabs',
  component: 'gc-tabs',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => html`
    <gc-tabs
      .tabs="${[
        {
          id: 'tab1',
          label: 'Tab 1',
          content: 'Content for the first tab. This is a simple tabbed interface following GC Design System patterns.'
        },
        {
          id: 'tab2',
          label: 'Tab 2',
          content: 'Content for the second tab. Click tabs to switch between different content panels.'
        },
        {
          id: 'tab3',
          label: 'Tab 3',
          content: 'Content for the third tab. Keyboard navigation is supported with arrow keys.'
        }
      ]}"
    ></gc-tabs>
  `
};

export const TwoTabs: Story = {
  render: () => html`
    <gc-tabs
      .tabs="${[
        {
          id: 'overview',
          label: 'Overview',
          content: 'Overview content goes here. This demonstrates a simple two-tab interface.'
        },
        {
          id: 'details',
          label: 'Details',
          content: 'Detailed information goes here. Two tabs are commonly used for simple interfaces.'
        }
      ]}"
    ></gc-tabs>
  `
};

export const ManyTabs: Story = {
  render: () => html`
    <gc-tabs
      .tabs="${[
        { id: '1', label: 'Tab 1', content: 'Content 1' },
        { id: '2', label: 'Tab 2', content: 'Content 2' },
        { id: '3', label: 'Tab 3', content: 'Content 3' },
        { id: '4', label: 'Tab 4', content: 'Content 4' },
        { id: '5', label: 'Tab 5', content: 'Content 5' },
        { id: '6', label: 'Tab 6', content: 'Content 6' }
      ]}"
    ></gc-tabs>
  `
};

export const WithRichContent: Story = {
  render: () => html`
    <gc-tabs
      .tabs="${[
        {
          id: 'description',
          label: 'Description',
          content: `
            <h3>Product Description</h3>
            <p>This is a high-quality product with the following features:</p>
            <ul>
              <li>Feature 1: Advanced functionality</li>
              <li>Feature 2: User-friendly interface</li>
              <li>Feature 3: Excellent performance</li>
            </ul>
          `
        },
        {
          id: 'specifications',
          label: 'Specifications',
          content: `
            <h3>Technical Specifications</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 0.5rem; font-weight: 600;">Dimension</td>
                <td style="padding: 0.5rem;">10 x 5 x 3 inches</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 0.5rem; font-weight: 600;">Weight</td>
                <td style="padding: 0.5rem;">2.5 lbs</td>
              </tr>
              <tr>
                <td style="padding: 0.5rem; font-weight: 600;">Material</td>
                <td style="padding: 0.5rem;">Premium grade plastic</td>
              </tr>
            </table>
          `
        },
        {
          id: 'reviews',
          label: 'Reviews',
          content: `
            <h3>Customer Reviews</h3>
            <div style="margin-bottom: 1rem;">
              <strong>⭐⭐⭐⭐⭐ Great product!</strong>
              <p>Exactly what I needed. Highly recommended.</p>
            </div>
            <div>
              <strong>⭐⭐⭐⭐ Very good</strong>
              <p>Good quality and fast shipping.</p>
            </div>
          `
        }
      ]}"
    ></gc-tabs>
  `
};

export const WithEvents: Story = {
  render: () => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Tab changed:', customEvent.detail);
    };

    return html`
      <gc-tabs
        .tabs="${[
          { id: '1', label: 'Tab 1', content: 'Open browser console to see events.' },
          { id: '2', label: 'Tab 2', content: 'Events are emitted on tab change.' },
          { id: '3', label: 'Tab 3', content: 'Check the console for details.' }
        ]}"
        @gc-tab-change="${handleTabChange}"
      ></gc-tabs>
    `;
  }
};

export const FrenchCanadian: Story = {
  render: () => html`
    <gc-tabs
      locale="fr-CA"
      .tabs="${[
        {
          id: 'apercu',
          label: 'Aperçu',
          content: 'Contenu de l\'aperçu. Ceci est une interface à onglets en français canadien.'
        },
        {
          id: 'details',
          label: 'Détails',
          content: 'Informations détaillées. Cliquez sur les onglets pour changer de contenu.'
        },
        {
          id: 'contact',
          label: 'Contact',
          content: 'Informations de contact. La navigation au clavier est supportée.'
        }
      ]}"
    ></gc-tabs>
  `
};

export const ServiceCategories: Story = {
  render: () => html`
    <gc-tabs
      .tabs="${[
        {
          id: 'individuals',
          label: 'For Individuals',
          content: `
            <h3>Individual Services</h3>
            <p>We offer a range of services for individual clients:</p>
            <ul>
              <li>Personal tax filing</li>
              <li>Financial planning</li>
              <li>Investment advice</li>
              <li>Retirement planning</li>
            </ul>
            <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-top: 1rem;">
              Learn More
            </button>
          `
        },
        {
          id: 'businesses',
          label: 'For Businesses',
          content: `
            <h3>Business Services</h3>
            <p>Comprehensive solutions for businesses of all sizes:</p>
            <ul>
              <li>Corporate tax services</li>
              <li>Payroll management</li>
              <li>Business consulting</li>
              <li>Audit and assurance</li>
            </ul>
            <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-top: 1rem;">
              Get Started
            </button>
          `
        },
        {
          id: 'government',
          label: 'For Government',
          content: `
            <h3>Government Services</h3>
            <p>Specialized services for government agencies:</p>
            <ul>
              <li>Public sector consulting</li>
              <li>Compliance and regulations</li>
              <li>Program evaluation</li>
              <li>Strategic planning</li>
            </ul>
            <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer; margin-top: 1rem;">
              Contact Us
            </button>
          `
        }
      ]}"
    ></gc-tabs>
  `
};

export const AccountSettings: Story = {
  render: () => html`
    <gc-tabs
      .tabs="${[
        {
          id: 'profile',
          label: 'Profile',
          content: `
            <h3>Profile Settings</h3>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Name</label>
              <input type="text" value="John Doe" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email</label>
              <input type="email" value="john@example.com" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
            <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
              Save Changes
            </button>
          `
        },
        {
          id: 'security',
          label: 'Security',
          content: `
            <h3>Security Settings</h3>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Current Password</label>
              <input type="password" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">New Password</label>
              <input type="password" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
            </div>
            <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
              Update Password
            </button>
          `
        },
        {
          id: 'notifications',
          label: 'Notifications',
          content: `
            <h3>Notification Preferences</h3>
            <div style="margin-bottom: 1rem;">
              <label style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" checked />
                <span>Email notifications</span>
              </label>
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" checked />
                <span>Push notifications</span>
              </label>
            </div>
            <div style="margin-bottom: 1rem;">
              <label style="display: flex; align-items: center; gap: 0.5rem;">
                <input type="checkbox" />
                <span>SMS notifications</span>
              </label>
            </div>
            <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
              Save Preferences
            </button>
          `
        }
      ]}"
    ></gc-tabs>
  `
};

export const Documentation: Story = {
  render: () => html`
    <gc-tabs
      .tabs="${[
        {
          id: 'quickstart',
          label: 'Quick Start',
          content: `
            <h3>Quick Start Guide</h3>
            <p>Get started in 3 easy steps:</p>
            <ol>
              <li><strong>Install:</strong> Download and install the application</li>
              <li><strong>Configure:</strong> Set up your preferences and account</li>
              <li><strong>Start:</strong> Begin using the features</li>
            </ol>
            <p>For more detailed instructions, see the full documentation in other tabs.</p>
          `
        },
        {
          id: 'installation',
          label: 'Installation',
          content: `
            <h3>Installation Instructions</h3>
            <h4>System Requirements</h4>
            <ul>
              <li>Windows 10 or later / macOS 10.15 or later</li>
              <li>4GB RAM minimum (8GB recommended)</li>
              <li>500MB available disk space</li>
            </ul>
            <h4>Installation Steps</h4>
            <ol>
              <li>Download the installer from our website</li>
              <li>Run the installer with administrator privileges</li>
              <li>Follow the on-screen instructions</li>
              <li>Restart your computer when prompted</li>
            </ol>
          `
        },
        {
          id: 'api',
          label: 'API Reference',
          content: `
            <h3>API Documentation</h3>
            <h4>Authentication</h4>
            <p>All API requests require authentication using an API key.</p>
            <pre style="background: #f5f5f5; padding: 1rem; border-radius: 4px; overflow-x: auto;">
Authorization: Bearer YOUR_API_KEY
            </pre>
            <h4>Endpoints</h4>
            <p><code>GET /api/users</code> - Retrieve user list</p>
            <p><code>POST /api/users</code> - Create a new user</p>
            <p><code>PUT /api/users/:id</code> - Update user</p>
          `
        },
        {
          id: 'faq',
          label: 'FAQ',
          content: `
            <h3>Frequently Asked Questions</h3>
            <p><strong>Q: How do I reset my password?</strong></p>
            <p>A: Click "Forgot Password" on the login page.</p>
            
            <p><strong>Q: Is there a mobile app?</strong></p>
            <p>A: Yes, available on iOS and Android.</p>
            
            <p><strong>Q: What payment methods do you accept?</strong></p>
            <p>A: We accept credit cards, PayPal, and bank transfers.</p>
          `
        }
      ]}"
    ></gc-tabs>
  `
};

export const DashboardData: Story = {
  render: () => html`
    <gc-tabs
      .tabs="${[
        {
          id: 'overview',
          label: 'Overview',
          content: `
            <h3>Dashboard Overview</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-top: 1rem;">
              <div style="padding: 1.5rem; background: #f5f5f5; border-radius: 4px;">
                <h4 style="margin: 0 0 0.5rem 0; color: #666;">Total Users</h4>
                <p style="margin: 0; font-size: 2rem; font-weight: 700; color: #26374a;">1,247</p>
              </div>
              <div style="padding: 1.5rem; background: #f5f5f5; border-radius: 4px;">
                <h4 style="margin: 0 0 0.5rem 0; color: #666;">Revenue</h4>
                <p style="margin: 0; font-size: 2rem; font-weight: 700; color: #278400;">$52,340</p>
              </div>
              <div style="padding: 1.5rem; background: #f5f5f5; border-radius: 4px;">
                <h4 style="margin: 0 0 0.5rem 0; color: #666;">Active Sessions</h4>
                <p style="margin: 0; font-size: 2rem; font-weight: 700; color: #269abc;">387</p>
              </div>
            </div>
          `
        },
        {
          id: 'analytics',
          label: 'Analytics',
          content: `
            <h3>Analytics</h3>
            <p>Detailed analytics and metrics will be displayed here.</p>
            <p style="padding: 2rem; background: #f5f5f5; text-align: center; border-radius: 4px;">
              Chart placeholder - Analytics visualization
            </p>
          `
        },
        {
          id: 'reports',
          label: 'Reports',
          content: `
            <h3>Reports</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 1rem; background: #f5f5f5; margin-bottom: 0.5rem; border-radius: 4px;">
                <strong>Monthly Report - November 2025</strong>
                <button style="float: right; padding: 0.5rem 1rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Download</button>
              </li>
              <li style="padding: 1rem; background: #f5f5f5; margin-bottom: 0.5rem; border-radius: 4px;">
                <strong>Quarterly Report - Q4 2025</strong>
                <button style="float: right; padding: 0.5rem 1rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Download</button>
              </li>
            </ul>
          `
        }
      ]}"
    ></gc-tabs>
  `
};
