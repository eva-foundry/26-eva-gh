/**
 * Auto-generated component metadata
 * Generated: 2025-12-13T02:49:07.050Z
 * Source: packages/web-components/src/components/
 */

export const componentMetadata = {
  "eva-a11y-panel": {
    "category": "eva",
    "title": "A11y Panel",
    "description": "EVA Accessibility Panel Component",
    "props": {
      "showActions": {
        "type": "boolean",
        "default": "true",
        "description": "showActions property"
      },
      "immediate": {
        "type": "boolean",
        "default": "true",
        "description": "immediate property"
      },
      "storageKey": {
        "type": "text",
        "default": "'gc-a11y-settings'",
        "description": "storageKey property"
      }
    },
    "slots": {
      "default": "Component content"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-a11y-panel show-actions>\n  <!-- Accessibility controls -->\n</eva-a11y-panel>",
      "react": "import { EVAA11yPanel } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVAA11yPanel />\n  );\n}",
      "vue": "<template>\n  <eva-a11y-panel show-actions>\n  <!-- Accessibility controls -->\n</eva-a11y-panel>\n</template>",
      "angular": "<eva-a11y-panel show-actions>\n  <!-- Accessibility controls -->\n</eva-a11y-panel>",
      "svelte": "<eva-a11y-panel show-actions>\n  <!-- Accessibility controls -->\n</eva-a11y-panel>"
    }
  },
  "eva-alert": {
    "category": "eva",
    "title": "Alert",
    "description": "EVA Alert Component",
    "props": {
      "type": {
        "type": "text",
        "default": "'success' | 'info' | 'warning' | 'danger' = 'info'",
        "description": "type property"
      },
      "dismissible": {
        "type": "boolean",
        "default": "false",
        "description": "dismissible property"
      },
      "visible": {
        "type": "boolean",
        "default": "true",
        "description": "visible property"
      },
      "live": {
        "type": "text",
        "default": "'polite' | 'assertive' = 'polite'",
        "description": "live property"
      }
    },
    "slots": {
      "default": "Alert message"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-alert type=\"success\" dismissible>\n  <strong>Application submitted successfully!</strong><br>\n  Your reference number is #2025-12345\n</eva-alert>",
      "react": "import { EVAAlert } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVAAlert>\n  <strong>Application submitted successfully!</strong><br>Your reference number is #2025-12345\n</EVAAlert>\n  );\n}",
      "vue": "<template>\n  <eva-alert type=\"success\" dismissible>\n  <strong>Application submitted successfully!</strong><br>\n  Your reference number is #2025-12345\n</eva-alert>\n</template>",
      "angular": "<eva-alert type=\"success\" dismissible>\n  <strong>Application submitted successfully!</strong><br>\n  Your reference number is #2025-12345\n</eva-alert>",
      "svelte": "<eva-alert type=\"success\" dismissible>\n  <strong>Application submitted successfully!</strong><br>\n  Your reference number is #2025-12345\n</eva-alert>"
    }
  },
  "eva-backstage-shell": {
    "category": "eva",
    "title": "Backstage Shell",
    "description": "EVA Backstage Shell Component",
    "props": {
      "open": {
        "type": "boolean",
        "default": "false",
        "description": "open property"
      },
      "position": {
        "type": "text",
        "default": "'right' | 'left' = 'right'",
        "description": "position property"
      },
      "width": {
        "type": "text",
        "default": "'480px'",
        "description": "width property"
      },
      "title": {
        "type": "text",
        "default": "''",
        "description": "title property"
      },
      "showTrigger": {
        "type": "boolean",
        "default": "true",
        "description": "showTrigger property"
      },
      "triggerLabel": {
        "type": "text",
        "default": "''",
        "description": "triggerLabel property"
      }
    },
    "slots": {
      "default": "Component content"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-backstage-shell \n  open \n  position=\"right\"\n  title=\"Settings\"\n>\n  <p>Backstage content goes here</p>\n</eva-backstage-shell>",
      "react": "import { EVABackstageShell } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVABackstageShell />\n  );\n}",
      "vue": "<template>\n  <eva-backstage-shell \n  open \n  position=\"right\"\n  title=\"Settings\"\n>\n  <p>Backstage content goes here</p>\n</eva-backstage-shell>\n</template>",
      "angular": "<eva-backstage-shell \n  open \n  position=\"right\"\n  title=\"Settings\"\n>\n  <p>Backstage content goes here</p>\n</eva-backstage-shell>",
      "svelte": "<eva-backstage-shell \n  open \n  position=\"right\"\n  title=\"Settings\"\n>\n  <p>Backstage content goes here</p>\n</eva-backstage-shell>"
    }
  },
  "eva-button": {
    "category": "eva",
    "title": "Button",
    "description": "EVA Button Component",
    "props": {
      "variant": {
        "type": "text",
        "default": "'supertask' | 'primary' | 'secondary' | 'danger' | 'link' | 'contextual-signin' =\r\n    'primary'",
        "description": "variant property"
      },
      "type": {
        "type": "text",
        "default": "'button' | 'submit' | 'reset' = 'button'",
        "description": "type property"
      },
      "size": {
        "type": "select",
        "default": "'small' | 'medium' | 'large' = 'medium'",
        "description": "size property",
        "options": [
          "small",
          "medium",
          "large"
        ]
      },
      "fullWidth": {
        "type": "boolean",
        "default": "false",
        "description": "fullWidth property"
      }
    },
    "slots": {
      "default": "Button text"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-button variant=\"primary\" size=\"medium\">\n  Submit Application\n</eva-button>",
      "react": "import { EVAButton } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVAButton>\n  Submit Application\n</EVAButton>\n  );\n}",
      "vue": "<template>\n  <eva-button variant=\"primary\" size=\"medium\">\n  Submit Application\n</eva-button>\n</template>",
      "angular": "<eva-button variant=\"primary\" size=\"medium\">\n  Submit Application\n</eva-button>",
      "svelte": "<eva-button variant=\"primary\" size=\"medium\">\n  Submit Application\n</eva-button>"
    }
  },
  "eva-card": {
    "category": "eva",
    "title": "Card",
    "description": "EVA Card Component",
    "props": {
      "variant": {
        "type": "text",
        "default": "'default' | 'bordered' | 'elevated' = 'default'",
        "description": "variant property"
      },
      "padding": {
        "type": "text",
        "default": "'none' | 'small' | 'medium' | 'large' = 'medium'",
        "description": "padding property"
      }
    },
    "slots": {
      "default": "Card content"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-card variant=\"elevated\">\n  <h3>Service Update</h3>\n  <p>Online services will be unavailable on December 25, 2025 for system maintenance.</p>\n</eva-card>",
      "react": "import { EVACard } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVACard>\n  <h3>Service Update</h3><p>Online services will be unavailable on December 25, 2025 for system maintenance.</p>\n</EVACard>\n  );\n}",
      "vue": "<template>\n  <eva-card variant=\"elevated\">\n  <h3>Service Update</h3>\n  <p>Online services will be unavailable on December 25, 2025 for system maintenance.</p>\n</eva-card>\n</template>",
      "angular": "<eva-card variant=\"elevated\">\n  <h3>Service Update</h3>\n  <p>Online services will be unavailable on December 25, 2025 for system maintenance.</p>\n</eva-card>",
      "svelte": "<eva-card variant=\"elevated\">\n  <h3>Service Update</h3>\n  <p>Online services will be unavailable on December 25, 2025 for system maintenance.</p>\n</eva-card>"
    }
  },
  "eva-chat-panel": {
    "category": "eva",
    "title": "Chat Panel",
    "description": "EVA Chat Panel Component",
    "props": {
      "greeting": {
        "type": "text",
        "default": "''",
        "description": "greeting property"
      },
      "isTyping": {
        "type": "boolean",
        "default": "false",
        "description": "isTyping property"
      },
      "messages": {
        "type": "text",
        "default": "ChatMessage[] = []",
        "description": "messages property"
      }
    },
    "slots": {
      "default": "Chat messages"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-chat-panel title=\"EVA Assistant\">\n  <!-- Chat messages will appear here -->\n</eva-chat-panel>",
      "react": "import { EVAChatPanel } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVAChatPanel />\n  );\n}",
      "vue": "<template>\n  <eva-chat-panel title=\"EVA Assistant\">\n  <!-- Chat messages will appear here -->\n</eva-chat-panel>\n</template>",
      "angular": "<eva-chat-panel title=\"EVA Assistant\">\n  <!-- Chat messages will appear here -->\n</eva-chat-panel>",
      "svelte": "<eva-chat-panel title=\"EVA Assistant\">\n  <!-- Chat messages will appear here -->\n</eva-chat-panel>"
    }
  },
  "eva-checkbox": {
    "category": "eva",
    "title": "Checkbox",
    "description": "EVA Checkbox Component",
    "props": {
      "checked": {
        "type": "boolean",
        "default": "false",
        "description": "checked property"
      },
      "indeterminate": {
        "type": "boolean",
        "default": "false",
        "description": "indeterminate property"
      },
      "value": {
        "type": "text",
        "default": "''",
        "description": "value property"
      },
      "name": {
        "type": "text",
        "default": "''",
        "description": "name property"
      }
    },
    "slots": {
      "default": "Component content"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-checkbox \n  label=\"I accept the terms and conditions\"\n  required\n></eva-checkbox>",
      "react": "import { EVACheckbox } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVACheckbox />\n  );\n}",
      "vue": "<template>\n  <eva-checkbox \n  label=\"I accept the terms and conditions\"\n  required\n></eva-checkbox>\n</template>",
      "angular": "<eva-checkbox \n  label=\"I accept the terms and conditions\"\n  required\n></eva-checkbox>",
      "svelte": "<eva-checkbox \n  label=\"I accept the terms and conditions\"\n  required\n></eva-checkbox>"
    }
  },
  "eva-input": {
    "category": "eva",
    "title": "Input",
    "description": "EVA Input Component",
    "props": {
      "label": {
        "type": "text",
        "default": "''",
        "description": "label property"
      },
      "type": {
        "type": "text",
        "default": "'text' | 'email' | 'password' | 'tel' | 'url' | 'number' = 'text'",
        "description": "type property"
      },
      "value": {
        "type": "text",
        "default": "''",
        "description": "value property"
      },
      "placeholder": {
        "type": "text",
        "default": "''",
        "description": "placeholder property"
      },
      "name": {
        "type": "text",
        "default": "''",
        "description": "name property"
      },
      "required": {
        "type": "boolean",
        "default": "false",
        "description": "required property"
      },
      "readonly": {
        "type": "boolean",
        "default": "false",
        "description": "readonly property"
      },
      "error": {
        "type": "text",
        "default": "''",
        "description": "error property"
      },
      "hint": {
        "type": "text",
        "default": "''",
        "description": "hint property"
      },
      "maxlength": {
        "type": "number",
        "default": 0,
        "description": "maxlength property"
      }
    },
    "slots": {
      "default": "Component content"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-input \n  type=\"text\"\n  placeholder=\"Enter your email address\"\n  label=\"Email\"\n  required\n></eva-input>",
      "react": "import { EVAInput } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVAInput />\n  );\n}",
      "vue": "<template>\n  <eva-input \n  type=\"text\"\n  placeholder=\"Enter your email address\"\n  label=\"Email\"\n  required\n></eva-input>\n</template>",
      "angular": "<eva-input \n  type=\"text\"\n  placeholder=\"Enter your email address\"\n  label=\"Email\"\n  required\n></eva-input>",
      "svelte": "<eva-input \n  type=\"text\"\n  placeholder=\"Enter your email address\"\n  label=\"Email\"\n  required\n></eva-input>"
    }
  },
  "eva-live-preview": {
    "category": "eva",
    "title": "Live Preview",
    "description": "EVA Live Preview Component",
    "props": {
      "src": {
        "type": "text",
        "default": "''",
        "description": "src property"
      },
      "iframeTitle": {
        "type": "text",
        "default": "''",
        "description": "iframeTitle property"
      },
      "showLoading": {
        "type": "boolean",
        "default": "true",
        "description": "showLoading property"
      },
      "targetOrigin": {
        "type": "text",
        "default": "window.location.origin",
        "description": "targetOrigin property"
      },
      "syncA11y": {
        "type": "boolean",
        "default": "true",
        "description": "syncA11y property"
      },
      "syncTheme": {
        "type": "boolean",
        "default": "true",
        "description": "syncTheme property"
      },
      "syncI18n": {
        "type": "boolean",
        "default": "true",
        "description": "syncI18n property"
      }
    },
    "slots": {
      "default": "Component content"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-live-preview \n  src=\"/preview.html\"\n  auto-sync\n>\n</eva-live-preview>",
      "react": "import { EVALivePreview } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVALivePreview />\n  );\n}",
      "vue": "<template>\n  <eva-live-preview \n  src=\"/preview.html\"\n  auto-sync\n>\n</eva-live-preview>\n</template>",
      "angular": "<eva-live-preview \n  src=\"/preview.html\"\n  auto-sync\n>\n</eva-live-preview>",
      "svelte": "<eva-live-preview \n  src=\"/preview.html\"\n  auto-sync\n>\n</eva-live-preview>"
    }
  },
  "eva-modal": {
    "category": "eva",
    "title": "Modal",
    "description": "EVA Modal Component",
    "props": {
      "open": {
        "type": "boolean",
        "default": "false",
        "description": "open property"
      },
      "label": {
        "type": "text",
        "default": "''",
        "description": "label property"
      },
      "noCloseOnBackdrop": {
        "type": "boolean",
        "default": "false",
        "description": "noCloseOnBackdrop property"
      },
      "noCloseOnEscape": {
        "type": "boolean",
        "default": "false",
        "description": "noCloseOnEscape property"
      },
      "size": {
        "type": "select",
        "default": "'small' | 'medium' | 'large' = 'medium'",
        "description": "size property",
        "options": [
          "small",
          "medium",
          "large"
        ]
      }
    },
    "slots": {
      "default": "Modal content"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-modal size=\"medium\" open>\n  <h2 slot=\"header\">Confirm Submission</h2>\n  <p>Are you sure you want to submit this application?</p>\n  <eva-button slot=\"footer\" variant=\"primary\">Confirm</eva-button>\n  <eva-button slot=\"footer\" variant=\"secondary\">Cancel</eva-button>\n</eva-modal>",
      "react": "import { EVAModal } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVAModal />\n  );\n}",
      "vue": "<template>\n  <eva-modal size=\"medium\" open>\n  <h2 slot=\"header\">Confirm Submission</h2>\n  <p>Are you sure you want to submit this application?</p>\n  <eva-button slot=\"footer\" variant=\"primary\">Confirm</eva-button>\n  <eva-button slot=\"footer\" variant=\"secondary\">Cancel</eva-button>\n</eva-modal>\n</template>",
      "angular": "<eva-modal size=\"medium\" open>\n  <h2 slot=\"header\">Confirm Submission</h2>\n  <p>Are you sure you want to submit this application?</p>\n  <eva-button slot=\"footer\" variant=\"primary\">Confirm</eva-button>\n  <eva-button slot=\"footer\" variant=\"secondary\">Cancel</eva-button>\n</eva-modal>",
      "svelte": "<eva-modal size=\"medium\" open>\n  <h2 slot=\"header\">Confirm Submission</h2>\n  <p>Are you sure you want to submit this application?</p>\n  <eva-button slot=\"footer\" variant=\"primary\">Confirm</eva-button>\n  <eva-button slot=\"footer\" variant=\"secondary\">Cancel</eva-button>\n</eva-modal>"
    }
  },
  "eva-nav-shell": {
    "category": "eva",
    "title": "Nav Shell",
    "description": "EVA Navigation Shell Component",
    "props": {
      "mode": {
        "type": "select",
        "default": "'sidebar' | 'tabs' = 'sidebar'",
        "description": "mode property",
        "options": [
          "sidebar",
          "tabs"
        ]
      },
      "open": {
        "type": "boolean",
        "default": "false",
        "description": "open property"
      },
      "navLabel": {
        "type": "text",
        "default": "''",
        "description": "navLabel property"
      },
      "collapsed": {
        "type": "boolean",
        "default": "false",
        "description": "collapsed property"
      },
      "items": {
        "type": "text",
        "default": "NavItem[] = []",
        "description": "items property"
      }
    },
    "slots": {
      "default": "Component content"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-nav-shell mode=\"sidebar\">\n  <!-- Navigation items -->\n</eva-nav-shell>",
      "react": "import { EVANavShell } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVANavShell />\n  );\n}",
      "vue": "<template>\n  <eva-nav-shell mode=\"sidebar\">\n  <!-- Navigation items -->\n</eva-nav-shell>\n</template>",
      "angular": "<eva-nav-shell mode=\"sidebar\">\n  <!-- Navigation items -->\n</eva-nav-shell>",
      "svelte": "<eva-nav-shell mode=\"sidebar\">\n  <!-- Navigation items -->\n</eva-nav-shell>"
    }
  },
  "eva-radio": {
    "category": "eva",
    "title": "Radio",
    "description": "EVA Radio Component",
    "props": {
      "checked": {
        "type": "boolean",
        "default": "false",
        "description": "checked property"
      },
      "value": {
        "type": "text",
        "default": "''",
        "description": "value property"
      },
      "name": {
        "type": "text",
        "default": "''",
        "description": "name property"
      },
      "required": {
        "type": "boolean",
        "default": "false",
        "description": "required property"
      }
    },
    "slots": {
      "default": "Component content"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-radio \n  name=\"language\"\n  value=\"en\"\n  label=\"English\"\n  checked\n></eva-radio>",
      "react": "import { EVARadio } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVARadio />\n  );\n}",
      "vue": "<template>\n  <eva-radio \n  name=\"language\"\n  value=\"en\"\n  label=\"English\"\n  checked\n></eva-radio>\n</template>",
      "angular": "<eva-radio \n  name=\"language\"\n  value=\"en\"\n  label=\"English\"\n  checked\n></eva-radio>",
      "svelte": "<eva-radio \n  name=\"language\"\n  value=\"en\"\n  label=\"English\"\n  checked\n></eva-radio>"
    }
  },
  "eva-select": {
    "category": "eva",
    "title": "Select",
    "description": "EVA Select Component",
    "props": {
      "label": {
        "type": "text",
        "default": "''",
        "description": "label property"
      },
      "value": {
        "type": "text",
        "default": "''",
        "description": "value property"
      },
      "placeholder": {
        "type": "text",
        "default": "''",
        "description": "placeholder property"
      },
      "name": {
        "type": "text",
        "default": "''",
        "description": "name property"
      },
      "required": {
        "type": "boolean",
        "default": "false",
        "description": "required property"
      },
      "error": {
        "type": "text",
        "default": "''",
        "description": "error property"
      },
      "hint": {
        "type": "text",
        "default": "''",
        "description": "hint property"
      }
    },
    "slots": {
      "default": "Component content"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-select label=\"Province\" required>\n  <option value=\"\">Select a province</option>\n  <option value=\"ON\">Ontario</option>\n  <option value=\"QC\">Quebec</option>\n  <option value=\"BC\">British Columbia</option>\n</eva-select>",
      "react": "import { EVASelect } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVASelect />\n  );\n}",
      "vue": "<template>\n  <eva-select label=\"Province\" required>\n  <option value=\"\">Select a province</option>\n  <option value=\"ON\">Ontario</option>\n  <option value=\"QC\">Quebec</option>\n  <option value=\"BC\">British Columbia</option>\n</eva-select>\n</template>",
      "angular": "<eva-select label=\"Province\" required>\n  <option value=\"\">Select a province</option>\n  <option value=\"ON\">Ontario</option>\n  <option value=\"QC\">Quebec</option>\n  <option value=\"BC\">British Columbia</option>\n</eva-select>",
      "svelte": "<eva-select label=\"Province\" required>\n  <option value=\"\">Select a province</option>\n  <option value=\"ON\">Ontario</option>\n  <option value=\"QC\">Quebec</option>\n  <option value=\"BC\">British Columbia</option>\n</eva-select>"
    }
  },
  "eva-tabs": {
    "category": "eva",
    "title": "Tabs",
    "description": "EVA Tabs Component",
    "props": {
      "activeIndex": {
        "type": "number",
        "default": "0",
        "description": "activeIndex property"
      },
      "activeTab": {
        "type": "number",
        "default": "0",
        "description": "activeTab property"
      },
      "orientation": {
        "type": "text",
        "default": "'horizontal' | 'vertical' = 'horizontal'",
        "description": "orientation property"
      },
      "label": {
        "type": "text",
        "default": "''",
        "description": "label property"
      },
      "active": {
        "type": "boolean",
        "default": "false",
        "description": "active property"
      }
    },
    "slots": {
      "default": "Tab content"
    },
    "events": {},
    "examples": {
      "webcomponent": "<eva-tabs>\n  <eva-tab label=\"Personal Info\" active>\n    <p>Enter your personal information</p>\n  </eva-tab>\n  <eva-tab label=\"Contact Details\">\n    <p>Enter your contact information</p>\n  </eva-tab>\n</eva-tabs>",
      "react": "import { EVATabs } from '@eva-sovereign/react';\n\nfunction MyComponent() {\n  return (\n    <EVATabs />\n  );\n}",
      "vue": "<template>\n  <eva-tabs>\n  <eva-tab label=\"Personal Info\" active>\n    <p>Enter your personal information</p>\n  </eva-tab>\n  <eva-tab label=\"Contact Details\">\n    <p>Enter your contact information</p>\n  </eva-tab>\n</eva-tabs>\n</template>",
      "angular": "<eva-tabs>\n  <eva-tab label=\"Personal Info\" active>\n    <p>Enter your personal information</p>\n  </eva-tab>\n  <eva-tab label=\"Contact Details\">\n    <p>Enter your contact information</p>\n  </eva-tab>\n</eva-tabs>",
      "svelte": "<eva-tabs>\n  <eva-tab label=\"Personal Info\" active>\n    <p>Enter your personal information</p>\n  </eva-tab>\n  <eva-tab label=\"Contact Details\">\n    <p>Enter your contact information</p>\n  </eva-tab>\n</eva-tabs>"
    }
  }
};
