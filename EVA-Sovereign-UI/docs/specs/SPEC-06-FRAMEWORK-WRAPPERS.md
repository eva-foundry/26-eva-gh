# SPEC-06: Framework Wrappers Implementation
# React, Vue, Angular, Svelte, CLI - Complete Specification

**Version**: 1.0.0  
**Date**: December 10, 2025  
**Category**: Framework Integration Packages  
**Status**: All 5 packages TO BE IMPLEMENTED (directories exist but empty)

---

## 🎯 Overview

**Purpose**: Create framework-specific wrapper packages for all 130 Web Components

**Target Frameworks**:
1. React 18+ (`@eva-sovereign/react`)
2. Vue 3+ (`@eva-sovereign/vue`)
3. Angular 17+ (`@eva-sovereign/angular`)
4. Svelte 5+ (`@eva-sovereign/svelte`)
5. CLI Tool (`@eva-sovereign/cli`)

**Current Status**: Directories exist in `packages/` but contain only empty `src/` folders

---

## 📦 Package 1: @eva-sovereign/react

### Package Structure

```
packages/react/
├── src/
│   ├── components/
│   │   ├── eva/          # 10 EVA components
│   │   ├── gc-patterns/  # 10 GC mandatory patterns
│   │   ├── wet-boew/     # 43 WET-BOEW plugins
│   │   ├── gc-design/    # 40 GC design patterns
│   │   └── gc-templates/ # 25 page templates
│   ├── hooks/
│   │   ├── useEVAComponent.ts
│   │   ├── useI18n.ts
│   │   └── useA11y.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### package.json

```json
{
  "name": "@eva-sovereign/react",
  "version": "1.0.0",
  "description": "React 18+ wrappers for EVA Sovereign UI Web Components",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.mjs",
      "require": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "vite build && tsc --emitDeclarationOnly",
    "test": "vitest",
    "lint": "eslint src"
  },
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@eva-sovereign/web-components": "^1.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.7.2",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  },
  "keywords": [
    "react",
    "web-components",
    "gc-design-system",
    "canada",
    "accessibility",
    "wcag",
    "bilingual"
  ],
  "author": "EVA Suite",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/MarcoPolo483/EVA-Sovereign-UI"
  }
}
```

### Wrapper Component Pattern

**Auto-Generated Template** (for ALL 130 components):

```typescript
// packages/react/src/components/eva/EvaButton.tsx
import React, { useRef, useEffect } from 'react';
import type { EvaButton as EvaButtonElement } from '@eva-sovereign/web-components';

export interface EvaButtonProps {
  variant?: 'supertask' | 'primary' | 'secondary' | 'danger' | 'link' | 'contextual-signin';
  disabled?: boolean;
  onClick?: (e: CustomEvent) => void;
  children?: React.ReactNode;
}

export const EvaButton = React.forwardRef<EvaButtonElement, EvaButtonProps>(
  ({ variant = 'primary', disabled = false, onClick, children }, ref) => {
    const internalRef = useRef<EvaButtonElement>(null);
    const buttonRef = (ref as React.MutableRefObject<EvaButtonElement>) || internalRef;

    useEffect(() => {
      const element = buttonRef.current;
      if (!element) return;

      const handleClick = (e: Event) => {
        if (onClick) onClick(e as CustomEvent);
      };

      element.addEventListener('eva-button-click', handleClick);
      return () => element.removeEventListener('eva-button-click', handleClick);
    }, [onClick]);

    return (
      <eva-button
        ref={buttonRef}
        variant={variant}
        disabled={disabled}
      >
        {children}
      </eva-button>
    );
  }
);

EvaButton.displayName = 'EvaButton';
```

### Custom Hooks

```typescript
// packages/react/src/hooks/useEVAComponent.ts
import { useEffect, useRef } from 'react';

export function useEVAComponent<T extends HTMLElement>(
  componentName: string,
  props: object
): React.RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (ref.current) {
      Object.entries(props).forEach(([key, value]) => {
        (ref.current as any)[key] = value;
      });
    }
  }, [props]);

  return ref;
}
```

### Tests

```typescript
// packages/react/src/components/eva/EvaButton.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { EvaButton } from './EvaButton';

describe('EvaButton', () => {
  it('renders children', () => {
    render(<EvaButton>Click Me</EvaButton>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<EvaButton onClick={handleClick}>Click Me</EvaButton>);
    
    fireEvent.click(screen.getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies variant prop', () => {
    const { container } = render(<EvaButton variant="danger">Delete</EvaButton>);
    const button = container.querySelector('eva-button');
    expect(button).toHaveAttribute('variant', 'danger');
  });

  it('disables button', () => {
    const { container } = render(<EvaButton disabled>Disabled</EvaButton>);
    const button = container.querySelector('eva-button');
    expect(button).toHaveAttribute('disabled');
  });
});
```

### README.md

```markdown
# @eva-sovereign/react

React 18+ wrappers for EVA Sovereign UI Web Components.

## Installation

\`\`\`bash
npm install @eva-sovereign/react
\`\`\`

## Usage

\`\`\`tsx
import { EvaButton, EvaInput, GCGlobalHeader } from '@eva-sovereign/react';

function App() {
  const handleClick = (e) => {
    console.log('Button clicked!', e.detail);
  };

  return (
    <>
      <GCGlobalHeader />
      <main>
        <EvaInput label="Email" type="email" required />
        <EvaButton variant="primary" onClick={handleClick}>
          Submit
        </EvaButton>
      </main>
    </>
  );
}
\`\`\`

## Components

All 130 Web Components available:
- 10 EVA Custom Components
- 10 GC Mandatory Patterns
- 43 WET-BOEW Plugins
- 40 GC Design Patterns
- 25 GC Page Templates (as composition examples)

See [Storybook](https://marcopolo483.github.io/EVA-Sovereign-UI/) for full documentation.
```

### Acceptance Criteria

- ✅ package.json with correct React peer dependencies
- ✅ All 130 components wrapped with TypeScript types
- ✅ Event handling via props (onClick, onChange, etc.)
- ✅ Ref forwarding works
- ✅ Custom hooks for common patterns
- ✅ Unit tests for all wrappers
- ✅ Build succeeds (`npm run build`)
- ✅ TypeScript types generated
- ✅ Published to npm
- ✅ README with examples

---

## 📦 Package 2: @eva-sovereign/vue

### Package Structure

```
packages/vue/
├── src/
│   ├── components/     # 130 Vue wrapper components
│   ├── composables/    # useI18n, useA11y composables
│   └── index.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### package.json

```json
{
  "name": "@eva-sovereign/vue",
  "version": "1.0.0",
  "description": "Vue 3+ wrappers for EVA Sovereign UI Web Components",
  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",
  "peerDependencies": {
    "vue": ">=3.3.0"
  },
  "dependencies": {
    "@eva-sovereign/web-components": "^1.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.7.2",
    "vite": "^5.0.0",
    "vitest": "^1.0.0"
  }
}
```

### Wrapper Component Pattern

```vue
<!-- packages/vue/src/components/eva/EvaButton.vue -->
<template>
  <eva-button
    :variant="variant"
    :disabled="disabled"
    @eva-button-click="handleClick"
  >
    <slot></slot>
  </eva-button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

interface Props {
  variant?: 'supertask' | 'primary' | 'secondary' | 'danger' | 'link' | 'contextual-signin';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false
});

const emit = defineEmits<{
  (e: 'click', event: CustomEvent): void
}>();

const handleClick = (event: CustomEvent) => {
  emit('click', event);
};
</script>
```

### Vite Configuration (CRITICAL)

```typescript
// packages/vue/vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Treat all tags starting with 'eva-' or 'gc-' or 'wb-' as custom elements
          isCustomElement: (tag) => tag.startsWith('eva-') || tag.startsWith('gc-') || tag.startsWith('wb-')
        }
      }
    })
  ]
});
```

### Composables

```typescript
// packages/vue/src/composables/useI18n.ts
import { ref, computed } from 'vue';
import { setGlobalLocale } from '@eva-sovereign/web-components';

export function useI18n() {
  const locale = ref<'en' | 'fr'>('en');

  const toggleLocale = () => {
    locale.value = locale.value === 'en' ? 'fr' : 'en';
    setGlobalLocale(locale.value);
  };

  return {
    locale: computed(() => locale.value),
    toggleLocale
  };
}
```

### Acceptance Criteria

- ✅ package.json with Vue 3+ peer dependency
- ✅ All 130 components as .vue SFCs
- ✅ v-model binding works for form components
- ✅ Event handling via @event-name
- ✅ Vite config includes isCustomElement
- ✅ Composables for common patterns
- ✅ TypeScript support
- ✅ Unit tests (Vitest + Vue Test Utils)
- ✅ Build succeeds
- ✅ Published to npm

---

## 📦 Package 3: @eva-sovereign/angular

### Package Structure

```
packages/angular/
├── src/
│   ├── lib/
│   │   ├── components/  # 130 Angular wrapper components
│   │   ├── services/    # I18nService, A11yService
│   │   └── directives/
│   ├── public-api.ts
│   └── index.ts
├── package.json
├── tsconfig.json
├── ng-package.json
└── README.md
```

### package.json

```json
{
  "name": "@eva-sovereign/angular",
  "version": "1.0.0",
  "description": "Angular 17+ wrappers for EVA Sovereign UI Web Components",
  "peerDependencies": {
    "@angular/common": ">=17.0.0",
    "@angular/core": ">=17.0.0"
  },
  "dependencies": {
    "@eva-sovereign/web-components": "^1.0.0"
  },
  "devDependencies": {
    "@angular/compiler": "^17.0.0",
    "@angular/compiler-cli": "^17.0.0",
    "ng-packagr": "^17.0.0",
    "typescript": "^5.7.2"
  }
}
```

### Module Definition

```typescript
// packages/angular/src/lib/eva-sovereign.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaButtonComponent } from './components/eva/eva-button.component';
// ... import all 130 components

@NgModule({
  declarations: [
    EvaButtonComponent,
    // ... all 130 components
  ],
  imports: [CommonModule],
  exports: [
    EvaButtonComponent,
    // ... all 130 components
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Required for Web Components
})
export class EvaSovereignModule {}
```

### Wrapper Component Pattern

```typescript
// packages/angular/src/lib/components/eva/eva-button.component.ts
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import type { EvaButton as EvaButtonElement } from '@eva-sovereign/web-components';

@Component({
  selector: 'app-eva-button',
  template: `
    <eva-button
      #button
      [attr.variant]="variant"
      [attr.disabled]="disabled || null"
    >
      <ng-content></ng-content>
    </eva-button>
  `,
  standalone: true
})
export class EvaButtonComponent implements AfterViewInit {
  @Input() variant: 'supertask' | 'primary' | 'secondary' | 'danger' | 'link' | 'contextual-signin' = 'primary';
  @Input() disabled = false;
  @Output() buttonClick = new EventEmitter<CustomEvent>();

  @ViewChild('button', { static: false }) buttonRef!: ElementRef<EvaButtonElement>;

  ngAfterViewInit() {
    this.buttonRef.nativeElement.addEventListener('eva-button-click', (e) => {
      this.buttonClick.emit(e as CustomEvent);
    });
  }
}
```

### Acceptance Criteria

- ✅ package.json with Angular 17+ peer dependencies
- ✅ All 130 components as standalone Angular components
- ✅ CUSTOM_ELEMENTS_SCHEMA in module
- ✅ Event binding via @Output
- ✅ Services for i18n, a11y
- ✅ TypeScript support
- ✅ Unit tests (Jasmine + Karma)
- ✅ Build succeeds (ng-packagr)
- ✅ Published to npm

---

## 📦 Package 4: @eva-sovereign/svelte

### Package Structure

```
packages/svelte/
├── src/
│   ├── lib/
│   │   ├── components/  # 130 Svelte wrapper components
│   │   └── stores/      # i18nStore, a11yStore
│   └── index.ts
├── package.json
├── svelte.config.js
├── tsconfig.json
└── README.md
```

### package.json

```json
{
  "name": "@eva-sovereign/svelte",
  "version": "1.0.0",
  "description": "Svelte 5+ wrappers for EVA Sovereign UI Web Components",
  "svelte": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "type": "module",
  "peerDependencies": {
    "svelte": ">=5.0.0"
  },
  "dependencies": {
    "@eva-sovereign/web-components": "^1.0.0"
  },
  "devDependencies": {
    "@sveltejs/package": "^2.0.0",
    "@sveltejs/vite-plugin-svelte": "^3.0.0",
    "svelte": "^5.0.0",
    "typescript": "^5.7.2",
    "vite": "^5.0.0"
  }
}
```

### Wrapper Component Pattern

```svelte
<!-- packages/svelte/src/lib/components/eva/EvaButton.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    variant?: 'supertask' | 'primary' | 'secondary' | 'danger' | 'link' | 'contextual-signin';
    disabled?: boolean;
    onclick?: (e: CustomEvent) => void;
  }

  let {
    variant = 'primary',
    disabled = false,
    onclick = () => {},
    children
  }: Props = $props();

  let buttonElement: HTMLElement;

  onMount(() => {
    buttonElement.addEventListener('eva-button-click', (e) => {
      onclick(e as CustomEvent);
    });
  });
</script>

<eva-button bind:this={buttonElement} {variant} {disabled}>
  {@render children?.()}
</eva-button>
```

### Stores

```typescript
// packages/svelte/src/lib/stores/i18n.ts
import { writable } from 'svelte/store';
import { setGlobalLocale } from '@eva-sovereign/web-components';

export const locale = writable<'en' | 'fr'>('en');

export function toggleLocale() {
  locale.update(current => {
    const newLocale = current === 'en' ? 'fr' : 'en';
    setGlobalLocale(newLocale);
    return newLocale;
  });
}
```

### Acceptance Criteria

- ✅ package.json with Svelte 5+ peer dependency
- ✅ All 130 components as .svelte files
- ✅ Runes support ($props, $state)
- ✅ Event binding via onclick, onchange, etc.
- ✅ Stores for state management
- ✅ TypeScript support
- ✅ Unit tests (Vitest + Testing Library)
- ✅ Build succeeds (@sveltejs/package)
- ✅ Published to npm

---

## 📦 Package 5: @eva-sovereign/cli

### Package Structure

```
packages/cli/
├── src/
│   ├── commands/
│   │   ├── init.ts
│   │   ├── add.ts
│   │   ├── theme.ts
│   │   └── generate.ts
│   ├── templates/
│   │   ├── react/
│   │   ├── vue/
│   │   ├── angular/
│   │   ├── svelte/
│   │   └── html/
│   ├── utils/
│   │   ├── installer.ts
│   │   ├── prompter.ts
│   │   └── generator.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

### package.json

```json
{
  "name": "@eva-sovereign/cli",
  "version": "1.0.0",
  "description": "CLI tool for EVA Sovereign UI project initialization",
  "bin": {
    "eva-sovereign": "./dist/index.js"
  },
  "type": "module",
  "dependencies": {
    "commander": "^12.0.0",
    "inquirer": "^9.2.0",
    "chalk": "^5.3.0",
    "ora": "^7.0.0",
    "fs-extra": "^11.0.0",
    "execa": "^8.0.0"
  },
  "devDependencies": {
    "@types/inquirer": "^9.0.0",
    "@types/fs-extra": "^11.0.0",
    "typescript": "^5.7.2",
    "tsx": "^4.0.0"
  }
}
```

### CLI Commands

```typescript
// packages/cli/src/index.ts
#!/usr/bin/env node
import { Command } from 'commander';
import { init } from './commands/init';
import { add } from './commands/add';
import { theme } from './commands/theme';

const program = new Command();

program
  .name('eva-sovereign')
  .description('CLI tool for EVA Sovereign UI')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize a new project')
  .argument('[framework]', 'Framework (react|vue|angular|svelte|html)')
  .option('-n, --name <name>', 'Project name')
  .option('-t, --template <template>', 'Template name')
  .action(init);

program
  .command('add')
  .description('Add a component to existing project')
  .argument('<component>', 'Component name (eva-button, gc-global-header, etc.)')
  .action(add);

program
  .command('theme')
  .description('Apply a theme')
  .argument('<name>', 'Theme name (canada-gc, default)')
  .action(theme);

program.parse();
```

```typescript
// packages/cli/src/commands/init.ts
import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';
import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';

export async function init(framework?: string, options: any = {}) {
  console.log(chalk.blue.bold('\n🚀 EVA Sovereign UI - Project Initializer\n'));

  // Prompt for framework if not provided
  if (!framework) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'framework',
        message: 'Choose your framework:',
        choices: ['react', 'vue', 'angular', 'svelte', 'html']
      }
    ]);
    framework = answers.framework;
  }

  // Prompt for project name if not provided
  const projectName = options.name || (await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      default: 'my-eva-project'
    }
  ])).projectName;

  const spinner = ora(`Creating ${framework} project...`).start();

  try {
    // Create project directory
    const projectPath = path.join(process.cwd(), projectName);
    await fs.ensureDir(projectPath);

    // Copy template files
    const templatePath = path.join(__dirname, '../../templates', framework);
    await fs.copy(templatePath, projectPath);

    // Install dependencies
    spinner.text = 'Installing dependencies...';
    await execa('npm', ['install'], { cwd: projectPath });

    spinner.succeed(chalk.green(`✅ Project created successfully!\n`));

    console.log(chalk.blue(`\nNext steps:\n`));
    console.log(chalk.gray(`  cd ${projectName}`));
    console.log(chalk.gray(`  npm run dev`));
    console.log(chalk.gray(`\n  Open http://localhost:5173\n`));

  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    console.error(error);
    process.exit(1);
  }
}
```

### Project Templates

**React Template** (`packages/cli/src/templates/react/`):

```json
// package.json
{
  "name": "my-eva-project",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@eva-sovereign/react": "^1.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.7.2",
    "vite": "^5.0.0"
  }
}
```

```tsx
// src/App.tsx
import { EvaButton, GCGlobalHeader, GCGlobalFooter } from '@eva-sovereign/react';

function App() {
  return (
    <>
      <GCGlobalHeader />
      <main style={{ padding: '2rem', minHeight: '60vh' }}>
        <h1>Welcome to EVA Sovereign UI</h1>
        <p>Your GC Design System project is ready!</p>
        <EvaButton variant="primary">Get Started</EvaButton>
      </main>
      <GCGlobalFooter />
    </>
  );
}

export default App;
```

### Acceptance Criteria

- ✅ package.json with CLI bin entry
- ✅ `eva-sovereign init` command works
- ✅ `eva-sovereign add <component>` command works
- ✅ `eva-sovereign theme <name>` command works
- ✅ Templates for all 5 frameworks
- ✅ Interactive prompts (inquirer)
- ✅ Loading spinners (ora)
- ✅ Colored output (chalk)
- ✅ npm/yarn/pnpm detection
- ✅ TypeScript support
- ✅ Published to npm
- ✅ Installs globally: `npm install -g @eva-sovereign/cli`

---

## ✅ Summary Acceptance Criteria (All 5 Packages)

Each package must:

1. ✅ package.json with correct metadata
2. ✅ All 130 components wrapped (or templates for CLI)
3. ✅ TypeScript types complete
4. ✅ Build succeeds without errors
5. ✅ Unit tests pass (≥80% coverage)
6. ✅ Published to npm registry
7. ✅ README with examples
8. ✅ Installation works: `npm install @eva-sovereign/<package>`
9. ✅ Usage examples verified in demo apps
10. ✅ Semantic versioning (1.0.0)

---

## 🚀 Implementation Timeline

### Week 1-2: React Package
- Generate all 130 wrappers
- Write tests
- Build and publish

### Week 3-4: Vue Package
- Generate all 130 wrappers
- Configure Vite with isCustomElement
- Write tests
- Build and publish

### Week 5-6: Angular Package
- Generate all 130 wrappers
- Configure CUSTOM_ELEMENTS_SCHEMA
- Write tests
- Build and publish

### Week 7-8: Svelte Package
- Generate all 130 wrappers with runes
- Write tests
- Build and publish

### Week 9-10: CLI Tool
- Create templates for all 5 frameworks
- Implement all commands
- Test on fresh installs
- Publish

---

**END OF SPEC-06**

**Next**: Integrate with SPEC-07 (Testing & Quality)
