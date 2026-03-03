import type { Preview } from '@storybook/web-components';
import '../src/index.js';

// Apply GC Design System tokens
import '../src/tokens/gc-tokens.css';

// Import locale manager for bilingual support
import { setGlobalLocale, type SupportedLocale } from '../src/i18n/locale-manager.js';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'dark',
          value: '#26374A',
        },
        {
          name: 'gc-grey',
          value: '#f9f9f9',
        },
      ],
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'button-name',
            enabled: true,
          },
          {
            id: 'aria-allowed-attr',
            enabled: true,
          },
        ],
      },
    },
  },
  globalTypes: {
    locale: {
      name: 'Locale',
      description: 'Internationalization locale',
      defaultValue: 'en-CA',
      toolbar: {
        icon: 'globe',
        items: [
          { value: 'en-CA', right: '🇨🇦', title: 'English (Canada)' },
          { value: 'fr-CA', right: '🇨🇦', title: 'Français (Canada)' },
        ],
        showName: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      // Update global locale when toolbar changes
      const locale = context.globals.locale as SupportedLocale;
      setGlobalLocale(locale);
      return story();
    },
  ],
};

export default preview;
