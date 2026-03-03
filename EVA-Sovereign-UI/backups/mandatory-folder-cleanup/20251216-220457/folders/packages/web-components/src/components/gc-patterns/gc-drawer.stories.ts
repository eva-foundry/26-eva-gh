import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './gc-drawer';

const meta: Meta = {
  title: 'GC Patterns/gc-drawer',
  component: 'gc-drawer',
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'full']
    },
    dismissible: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => {
    const openDrawer = () => {
      const drawer = document.querySelector('gc-drawer');
      if (drawer) {
        (drawer as any).open = true;
      }
    };

    return html`
      <button @click="${openDrawer}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Drawer
      </button>

      <gc-drawer heading="Navigation">
        <p>This is a drawer panel that slides in from the right side.</p>
        <ul style="list-style: none; padding: 0;">
          <li style="padding: 0.5rem 0;"><a href="#home" style="color: #26374a; text-decoration: none;">Home</a></li>
          <li style="padding: 0.5rem 0;"><a href="#about" style="color: #26374a; text-decoration: none;">About</a></li>
          <li style="padding: 0.5rem 0;"><a href="#services" style="color: #26374a; text-decoration: none;">Services</a></li>
          <li style="padding: 0.5rem 0;"><a href="#contact" style="color: #26374a; text-decoration: none;">Contact</a></li>
        </ul>
      </gc-drawer>
    `;
  }
};

export const LeftPosition: Story = {
  render: () => {
    const openDrawer = () => {
      const drawer = document.querySelector('gc-drawer[position="left"]');
      if (drawer) {
        (drawer as any).open = true;
      }
    };

    return html`
      <button @click="${openDrawer}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Left Drawer
      </button>

      <gc-drawer heading="Menu" position="left">
        <nav>
          <ul style="list-style: none; padding: 0;">
            <li style="padding: 0.75rem 0; border-bottom: 1px solid #eee;"><a href="#" style="color: #26374a; text-decoration: none;">Dashboard</a></li>
            <li style="padding: 0.75rem 0; border-bottom: 1px solid #eee;"><a href="#" style="color: #26374a; text-decoration: none;">Profile</a></li>
            <li style="padding: 0.75rem 0; border-bottom: 1px solid #eee;"><a href="#" style="color: #26374a; text-decoration: none;">Settings</a></li>
            <li style="padding: 0.75rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Logout</a></li>
          </ul>
        </nav>
      </gc-drawer>
    `;
  }
};

export const TopPosition: Story = {
  render: () => {
    const openDrawer = () => {
      const drawer = document.querySelector('gc-drawer[position="top"]');
      if (drawer) {
        (drawer as any).open = true;
      }
    };

    return html`
      <button @click="${openDrawer}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Top Drawer
      </button>

      <gc-drawer heading="Notifications" position="top">
        <p>You have 3 new notifications.</p>
        <ul style="list-style: none; padding: 0;">
          <li style="padding: 0.75rem; background: #f5f5f5; margin-bottom: 0.5rem; border-radius: 4px;">New message from John</li>
          <li style="padding: 0.75rem; background: #f5f5f5; margin-bottom: 0.5rem; border-radius: 4px;">Your report is ready</li>
          <li style="padding: 0.75rem; background: #f5f5f5; border-radius: 4px;">System update available</li>
        </ul>
      </gc-drawer>
    `;
  }
};

export const BottomPosition: Story = {
  render: () => {
    const openDrawer = () => {
      const drawer = document.querySelector('gc-drawer[position="bottom"]');
      if (drawer) {
        (drawer as any).open = true;
      }
    };

    return html`
      <button @click="${openDrawer}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Bottom Drawer
      </button>

      <gc-drawer heading="More Options" position="bottom">
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <button style="padding: 0.75rem 1.5rem; background: #f5f5f5; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">Share</button>
          <button style="padding: 0.75rem 1.5rem; background: #f5f5f5; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">Download</button>
          <button style="padding: 0.75rem 1.5rem; background: #f5f5f5; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">Print</button>
          <button style="padding: 0.75rem 1.5rem; background: #f5f5f5; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">Delete</button>
        </div>
      </gc-drawer>
    `;
  }
};

export const SmallSize: Story = {
  render: () => {
    const openDrawer = () => {
      const drawer = document.querySelector('gc-drawer[size="small"]');
      if (drawer) {
        (drawer as any).open = true;
      }
    };

    return html`
      <button @click="${openDrawer}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Small Drawer
      </button>

      <gc-drawer heading="Quick Actions" size="small">
        <p>Choose an action:</p>
        <button style="display: block; width: 100%; padding: 0.75rem; margin-bottom: 0.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Edit</button>
        <button style="display: block; width: 100%; padding: 0.75rem; margin-bottom: 0.5rem; background: #278400; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Save</button>
        <button style="display: block; width: 100%; padding: 0.75rem; background: #d3080c; color: #fff; border: none; border-radius: 4px; cursor: pointer;">Delete</button>
      </gc-drawer>
    `;
  }
};

export const LargeSize: Story = {
  render: () => {
    const openDrawer = () => {
      const drawer = document.querySelector('gc-drawer[size="large"]');
      if (drawer) {
        (drawer as any).open = true;
      }
    };

    return html`
      <button @click="${openDrawer}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Large Drawer
      </button>

      <gc-drawer heading="Settings" size="large">
        <h3 style="margin-top: 0;">Account Settings</h3>
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Email</label>
          <input type="email" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" />
        </div>
        
        <h3>Preferences</h3>
        <div style="margin-bottom: 1rem;">
          <label style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" />
            <span>Email notifications</span>
          </label>
          <label style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" />
            <span>Push notifications</span>
          </label>
        </div>

        <div slot="footer">
          <button style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Save Changes
          </button>
        </div>
      </gc-drawer>
    `;
  }
};

export const WithFooter: Story = {
  render: () => {
    const openDrawer = () => {
      const drawer = document.querySelector('gc-drawer[heading="Filters"]');
      if (drawer) {
        (drawer as any).open = true;
      }
    };

    return html`
      <button @click="${openDrawer}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Drawer with Footer
      </button>

      <gc-drawer heading="Filters">
        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Category</label>
          <select style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;">
            <option>All</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
          </select>
        </div>

        <div style="margin-bottom: 1rem;">
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Price Range</label>
          <input type="range" style="width: 100%;" />
        </div>

        <div slot="footer">
          <button style="padding: 0.5rem 1rem; background: #f5f5f5; color: #333; border: 1px solid #ccc; border-radius: 4px; cursor: pointer;">
            Reset
          </button>
          <button style="padding: 0.5rem 1rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
            Apply
          </button>
        </div>
      </gc-drawer>
    `;
  }
};

export const WithEvents: Story = {
  render: () => {
    const openDrawer = () => {
      const drawer = document.querySelector('gc-drawer[heading="Event Demo"]');
      if (drawer) {
        (drawer as any).open = true;
      }
    };

    const handleOpen = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Drawer opened:', customEvent.detail);
    };

    const handleClose = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('Drawer closed:', customEvent.detail);
    };

    return html`
      <button @click="${openDrawer}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Open Drawer
      </button>

      <gc-drawer
        heading="Event Demo"
        @gc-drawer-open="${handleOpen}"
        @gc-drawer-close="${handleClose}"
      >
        <p>Open the browser console to see event details when opening and closing this drawer.</p>
      </gc-drawer>
    `;
  }
};

export const FrenchCanadian: Story = {
  render: () => {
    const openDrawer = () => {
      const drawer = document.querySelector('gc-drawer[locale="fr-CA"]');
      if (drawer) {
        (drawer as any).open = true;
      }
    };

    return html`
      <button @click="${openDrawer}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        Ouvrir le panneau
      </button>

      <gc-drawer heading="Menu" locale="fr-CA">
        <p>Contenu du panneau en français canadien.</p>
        <ul style="list-style: none; padding: 0;">
          <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Accueil</a></li>
          <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">À propos</a></li>
          <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Services</a></li>
          <li style="padding: 0.5rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Contact</a></li>
        </ul>
      </gc-drawer>
    `;
  }
};

export const NavigationMenu: Story = {
  render: () => {
    const openDrawer = () => {
      const drawer = document.querySelector('gc-drawer#nav-menu');
      if (drawer) {
        (drawer as any).open = true;
      }
    };

    return html`
      <button @click="${openDrawer}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        ☰ Menu
      </button>

      <gc-drawer id="nav-menu" heading="Site Navigation" position="left">
        <nav>
          <h3 style="margin-top: 0; padding-bottom: 0.5rem; border-bottom: 1px solid #eee;">Main Menu</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="padding: 0.75rem 0;"><a href="#" style="color: #26374a; text-decoration: none; font-weight: 600;">Home</a></li>
            <li style="padding: 0.75rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">About Us</a></li>
            <li style="padding: 0.75rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Services</a></li>
            <li style="padding: 0.75rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Products</a></li>
            <li style="padding: 0.75rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Contact</a></li>
          </ul>

          <h3 style="padding-bottom: 0.5rem; border-bottom: 1px solid #eee;">Account</h3>
          <ul style="list-style: none; padding: 0;">
            <li style="padding: 0.75rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Profile</a></li>
            <li style="padding: 0.75rem 0;"><a href="#" style="color: #26374a; text-decoration: none;">Settings</a></li>
            <li style="padding: 0.75rem 0;"><a href="#" style="color: #d3080c; text-decoration: none;">Logout</a></li>
          </ul>
        </nav>
      </gc-drawer>
    `;
  }
};

export const ShoppingCart: Story = {
  render: () => {
    const openDrawer = () => {
      const drawer = document.querySelector('gc-drawer#cart');
      if (drawer) {
        (drawer as any).open = true;
      }
    };

    return html`
      <button @click="${openDrawer}" style="padding: 0.75rem 1.5rem; background: #26374a; color: #fff; border: none; border-radius: 4px; cursor: pointer;">
        🛒 Cart (2)
      </button>

      <gc-drawer id="cart" heading="Shopping Cart" size="large">
        <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
          <div style="display: flex; gap: 1rem;">
            <div style="width: 80px; height: 80px; background: #f5f5f5; border-radius: 4px;"></div>
            <div style="flex: 1;">
              <h4 style="margin: 0 0 0.5rem 0;">Product Name</h4>
              <p style="margin: 0; color: #666;">$29.99</p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid #eee;">
          <div style="display: flex; gap: 1rem;">
            <div style="width: 80px; height: 80px; background: #f5f5f5; border-radius: 4px;"></div>
            <div style="flex: 1;">
              <h4 style="margin: 0 0 0.5rem 0;">Another Product</h4>
              <p style="margin: 0; color: #666;">$49.99</p>
            </div>
          </div>
        </div>

        <div slot="footer" style="width: 100%;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; font-size: 1.125rem; font-weight: 700;">
            <span>Total:</span>
            <span>$79.98</span>
          </div>
          <button style="width: 100%; padding: 0.75rem; background: #278400; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 1rem; font-weight: 600;">
            Checkout
          </button>
        </div>
      </gc-drawer>
    `;
  }
};
