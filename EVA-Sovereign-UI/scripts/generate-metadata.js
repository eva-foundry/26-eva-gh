/**
 * Auto-generate component metadata from TypeScript source files
 * Reads @property decorators to generate prop definitions
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../packages/web-components/src/components');
const outputFile = path.join(__dirname, '../demos/gc-design-lab/component-metadata.generated.js');

// Map TypeScript types to control types
const typeMap = {
  'string': 'text',
  'number': 'number',
  'boolean': 'boolean',
  "'primary' | 'secondary' | 'danger' | 'link' | 'supertask' | 'contextual-signin'": { type: 'select', options: ['primary', 'secondary', 'danger', 'link', 'supertask', 'contextual-signin'] },
  "'small' | 'medium' | 'large'": { type: 'select', options: ['small', 'medium', 'large'] },
  "'elevated' | 'outlined' | 'filled'": { type: 'select', options: ['elevated', 'outlined', 'filled'] },
  "'success' | 'warning' | 'error' | 'info'": { type: 'select', options: ['success', 'warning', 'error', 'info'] },
  "'sidebar' | 'tabs'": { type: 'select', options: ['sidebar', 'tabs'] }
};

function parseComponent(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath, '.ts');
  const componentName = fileName.replace('.ts', '');
  
  // Extract class name
  const classMatch = content.match(/export class (\w+) extends/);
  if (!classMatch) return null;
  
  const className = classMatch[1];
  
  // Extract properties
  const propRegex = /@property\(\{[^}]*type:\s*(\w+)[^}]*\}\)\s*(\w+)(?:\s*[:=]\s*([^;]+))?/g;
  const props = {};
  let match;
  
  while ((match = propRegex.exec(content)) !== null) {
    const [, type, propName, defaultValue] = match;
    const tsType = type.toLowerCase();
    
    // Extract full property definition for union types
    const propDefMatch = content.match(new RegExp(`@property\\([^)]+\\)\\s*${propName}[?]?:\\s*([^;=]+)`));
    const fullType = propDefMatch ? propDefMatch[1].trim() : tsType;
    
    props[propName] = {
      type: typeMap[fullType] || typeMap[tsType] || 'text',
      default: defaultValue ? defaultValue.trim() : getDefaultForType(tsType),
      description: `${propName} property`
    };
    
    // Handle select types
    if (typeof props[propName].type === 'object') {
      const selectInfo = props[propName].type;
      props[propName].type = 'select';
      props[propName].options = selectInfo.options;
    }
  }
  
  // Extract JSD OC comment for description
  const jsdocMatch = content.match(/\/\*\*\s*\n\s*\*\s*([^\n]+)/);
  const description = jsdocMatch ? jsdocMatch[1].trim() : `${className} component`;
  
  // Determine category
  const category = componentName.startsWith('eva-') ? 'eva' : 'gc';
  
  // Generate title
  const title = className.replace('EVA', '').replace(/([A-Z])/g, ' $1').trim();
  
  // Generate realistic examples based on component type
  const examples = generateRealisticExamples(componentName, className, props);
  
  return {
    id: componentName,
    metadata: {
      category,
      title,
      description,
      props,
      slots: {
        default: getDefaultSlotContent(componentName)
      },
      events: {},
      examples
    }
  };
}

function generateRealisticExamples(componentId, className, props) {
  // Generate realistic example content based on component type
  let wcExample = '';
  let reactExample = '';
  let slotContent = '';
  
  // Determine realistic props and content
  switch (componentId) {
    case 'eva-button':
      wcExample = `<eva-button variant="primary" size="medium">
  Submit Application
</eva-button>`;
      slotContent = 'Submit Application';
      break;
      
    case 'eva-input':
      wcExample = `<eva-input 
  type="text"
  placeholder="Enter your email address"
  label="Email"
  required
></eva-input>`;
      break;
      
    case 'eva-select':
      wcExample = `<eva-select label="Province" required>
  <option value="">Select a province</option>
  <option value="ON">Ontario</option>
  <option value="QC">Quebec</option>
  <option value="BC">British Columbia</option>
</eva-select>`;
      break;
      
    case 'eva-checkbox':
      wcExample = `<eva-checkbox 
  label="I accept the terms and conditions"
  required
></eva-checkbox>`;
      break;
      
    case 'eva-radio':
      wcExample = `<eva-radio 
  name="language"
  value="en"
  label="English"
  checked
></eva-radio>`;
      break;
      
    case 'eva-alert':
      wcExample = `<eva-alert type="success" dismissible>
  <strong>Application submitted successfully!</strong><br>
  Your reference number is #2025-12345
</eva-alert>`;
      slotContent = '<strong>Application submitted successfully!</strong><br>Your reference number is #2025-12345';
      break;
      
    case 'eva-card':
      wcExample = `<eva-card variant="elevated">
  <h3>Service Update</h3>
  <p>Online services will be unavailable on December 25, 2025 for system maintenance.</p>
</eva-card>`;
      slotContent = '<h3>Service Update</h3><p>Online services will be unavailable on December 25, 2025 for system maintenance.</p>';
      break;
      
    case 'eva-modal':
      wcExample = `<eva-modal size="medium" open>
  <h2 slot="header">Confirm Submission</h2>
  <p>Are you sure you want to submit this application?</p>
  <eva-button slot="footer" variant="primary">Confirm</eva-button>
  <eva-button slot="footer" variant="secondary">Cancel</eva-button>
</eva-modal>`;
      break;
      
    case 'eva-tabs':
      wcExample = `<eva-tabs>
  <eva-tab label="Personal Info" active>
    <p>Enter your personal information</p>
  </eva-tab>
  <eva-tab label="Contact Details">
    <p>Enter your contact information</p>
  </eva-tab>
</eva-tabs>`;
      break;
      
    case 'eva-chat-panel':
      wcExample = `<eva-chat-panel title="EVA Assistant">
  <!-- Chat messages will appear here -->
</eva-chat-panel>`;
      break;
      
    case 'eva-nav-shell':
      wcExample = `<eva-nav-shell mode="sidebar">
  <!-- Navigation items -->
</eva-nav-shell>`;
      break;
      
    case 'eva-backstage-shell':
      wcExample = `<eva-backstage-shell 
  open 
  position="right"
  title="Settings"
>
  <p>Backstage content goes here</p>
</eva-backstage-shell>`;
      break;
      
    case 'eva-a11y-panel':
      wcExample = `<eva-a11y-panel show-actions>
  <!-- Accessibility controls -->
</eva-a11y-panel>`;
      break;
      
    case 'eva-live-preview':
      wcExample = `<eva-live-preview 
  src="/preview.html"
  auto-sync
>
</eva-live-preview>`;
      break;
      
    default:
      wcExample = `<${componentId}>\n  ${slotContent || 'Component content'}\n</${componentId}>`;
  }
  
  // Generate React example
  const reactSlot = slotContent ? `\n  ${slotContent}\n` : '';
  reactExample = `import { ${className} } from '@eva-sovereign/react';

function MyComponent() {
  return (
    <${className}${reactSlot ? `>${reactSlot}</${className}>` : ' />'}
  );
}`;
  
  return {
    webcomponent: wcExample,
    react: reactExample,
    vue: `<template>\n  ${wcExample}\n</template>`,
    angular: wcExample,
    svelte: wcExample
  };
}

function getDefaultSlotContent(componentId) {
  const slotDefaults = {
    'eva-button': 'Button text',
    'eva-alert': 'Alert message',
    'eva-card': 'Card content',
    'eva-modal': 'Modal content',
    'eva-chat-panel': 'Chat messages',
    'eva-tabs': 'Tab content'
  };
  
  return slotDefaults[componentId] || 'Component content';
}

function getDefaultForType(type) {
  switch (type) {
    case 'string': return '';
    case 'number': return 0;
    case 'boolean': return false;
    default: return '';
  }
}

// Main execution
const components = {};
const files = fs.readdirSync(componentsDir)
  .filter(f => f.startsWith('eva-') && f.endsWith('.ts') && !f.includes('.test.') && !f.includes('.stories.'));

files.forEach(file => {
  const filePath = path.join(componentsDir, file);
  const result = parseComponent(filePath);
  if (result) {
    components[result.id] = result.metadata;
    console.log(`✅ Parsed: ${result.id}`);
  }
});

// Generate output
const output = `/**
 * Auto-generated component metadata
 * Generated: ${new Date().toISOString()}
 * Source: packages/web-components/src/components/
 */

export const componentMetadata = ${JSON.stringify(components, null, 2)};
`;

fs.writeFileSync(outputFile, output);
console.log(`\n✅ Generated metadata for ${Object.keys(components).length} components`);
console.log(`📁 Output: ${outputFile}`);
