/**
 * Component Metadata Registry
 * Defines props, events, slots, and code examples for all 100 components
 * Used by the interactive playground to generate controls and code snippets
 */

export const componentMetadata = {
  'eva-button': {
    category: 'eva',
    title: 'Button',
    description: 'GC Design System compliant button with 6 variants, WCAG AAA accessible',
    props: {
      variant: {
        type: 'select',
        default: 'primary',
        options: ['supertask', 'primary', 'secondary', 'danger', 'link', 'contextual-signin'],
        description: 'Button visual style variant'
      },
      size: {
        type: 'select',
        default: 'medium',
        options: ['small', 'medium', 'large'],
        description: 'Button size'
      },
      disabled: {
        type: 'boolean',
        default: false,
        description: 'Disabled state'
      },
      ariaLabel: {
        type: 'text',
        default: '',
        description: 'Accessible label for screen readers'
      }
    },
    slots: {
      default: 'Button text'
    },
    events: {
      'eva-click': 'Fired when button is clicked'
    },
    examples: {
      webcomponent: `<eva-button variant="primary" size="medium">
  Submit Application
</eva-button>`,
      react: `import { EvaButton } from '@eva-sovereign/react';

function MyComponent() {
  return (
    <EvaButton 
      variant="primary" 
      size="medium"
      onClick={() => console.log('clicked')}
    >
      Submit Application
    </EvaButton>
  );
}`,
      vue: `<template>
  <eva-button 
    variant="primary" 
    size="medium"
    @eva-click="handleClick"
  >
    Submit Application
  </eva-button>
</template>

<script setup>
import { EvaButton } from '@eva-sovereign/vue';

const handleClick = () => {
  console.log('clicked');
};
</script>`,
      angular: `import { Component } from '@angular/core';
import { EvaButtonModule } from '@eva-sovereign/angular';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [EvaButtonModule],
  template: \`
    <eva-button 
      variant="primary" 
      size="medium"
      (evaClick)="handleClick()"
    >
      Submit Application
    </eva-button>
  \`
})
export class MyComponent {
  handleClick() {
    console.log('clicked');
  }
}`,
      svelte: `<script>
  import { EvaButton } from '@eva-sovereign/svelte';
  
  function handleClick() {
    console.log('clicked');
  }
</script>

<EvaButton 
  variant="primary" 
  size="medium"
  on:eva-click={handleClick}
>
  Submit Application
</EvaButton>`
    }
  },

  'eva-input': {
    category: 'eva',
    title: 'Input',
    description: 'Accessible text input with validation, character counting, and bilingual support',
    props: {
      type: {
        type: 'select',
        default: 'text',
        options: ['text', 'email', 'password', 'tel', 'url', 'search', 'number'],
        description: 'HTML input type'
      },
      placeholder: {
        type: 'text',
        default: '',
        description: 'Placeholder text'
      },
      disabled: {
        type: 'boolean',
        default: false,
        description: 'Disabled state'
      },
      required: {
        type: 'boolean',
        default: false,
        description: 'Required field'
      },
      maxLength: {
        type: 'number',
        default: null,
        description: 'Maximum character length'
      }
    },
    slots: {},
    events: {
      'eva-input': 'Fired on value change',
      'eva-blur': 'Fired on blur',
      'eva-focus': 'Fired on focus'
    },
    examples: {
      webcomponent: `<eva-input 
  type="email" 
  placeholder="Enter your email"
  required
></eva-input>`,
      react: `import { EvaInput } from '@eva-sovereign/react';

function MyForm() {
  const [email, setEmail] = useState('');
  
  return (
    <EvaInput 
      type="email" 
      placeholder="Enter your email"
      value={email}
      onEvaInput={(e) => setEmail(e.detail.value)}
      required
    />
  );
}`,
      vue: `<template>
  <eva-input 
    type="email" 
    placeholder="Enter your email"
    v-model="email"
    required
  />
</template>

<script setup>
import { ref } from 'vue';
import { EvaInput } from '@eva-sovereign/vue';

const email = ref('');
</script>`,
      angular: `import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EvaInputModule } from '@eva-sovereign/angular';

@Component({
  selector: 'app-my-form',
  standalone: true,
  imports: [FormsModule, EvaInputModule],
  template: \`
    <eva-input 
      type="email" 
      placeholder="Enter your email"
      [(ngModel)]="email"
      required
    ></eva-input>
  \`
})
export class MyForm {
  email = '';
}`,
      svelte: `<script>
  import { EvaInput } from '@eva-sovereign/svelte';
  
  let email = '';
</script>

<EvaInput 
  type="email" 
  placeholder="Enter your email"
  bind:value={email}
  required
/>`
    }
  },

  'eva-chat-panel': {
    category: 'eva',
    title: 'Chat Panel',
    description: 'Bilingual AI assistant chat interface with RAG integration, citations, and accessibility',
    props: {
      locale: {
        type: 'select',
        default: 'en-CA',
        options: ['en-CA', 'fr-CA'],
        description: 'Interface language'
      },
      placeholder: {
        type: 'text',
        default: 'Type your message...',
        description: 'Input placeholder text'
      },
      isTyping: {
        type: 'boolean',
        default: false,
        description: 'Show typing indicator'
      }
    },
    slots: {},
    events: {
      'eva-message-send': 'Fired when user sends a message'
    },
    examples: {
      webcomponent: `<eva-chat-panel 
  locale="en-CA"
  placeholder="Ask a question..."
></eva-chat-panel>

<script>
  const chat = document.querySelector('eva-chat-panel');
  
  chat.addEventListener('eva-message-send', async (e) => {
    const userMessage = e.detail.message;
    
    // Show typing indicator
    chat.setAttribute('is-typing', 'true');
    
    // Call your RAG backend
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    
    // Add AI response
    chat.addMessage({
      role: 'assistant',
      content: data.answer,
      timestamp: new Date().toISOString()
    });
    
    chat.setAttribute('is-typing', 'false');
  });
</script>`,
      react: `import { EvaChatPanel } from '@eva-sovereign/react';
import { useState } from 'react';

function ChatApp() {
  const [locale, setLocale] = useState('en-CA');
  
  const handleMessage = async (e) => {
    const userMessage = e.detail.message;
    
    // Call your RAG backend
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    
    // Add AI response using ref
    chatRef.current.addMessage({
      role: 'assistant',
      content: data.answer,
      timestamp: new Date().toISOString()
    });
  };
  
  const chatRef = useRef(null);
  
  return (
    <EvaChatPanel 
      ref={chatRef}
      locale={locale}
      placeholder="Ask a question..."
      onEvaMessageSend={handleMessage}
    />
  );
}`,
      vue: `<template>
  <eva-chat-panel 
    :locale="locale"
    placeholder="Ask a question..."
    ref="chatPanel"
    @eva-message-send="handleMessage"
  />
</template>

<script setup>
import { ref } from 'vue';
import { EvaChatPanel } from '@eva-sovereign/vue';

const locale = ref('en-CA');
const chatPanel = ref(null);

const handleMessage = async (e) => {
  const userMessage = e.detail.message;
  
  // Call your RAG backend
  const response = await fetch('/api/chat', {
    method: 'POST',
    body: JSON.stringify({ message: userMessage })
  });
  const data = await response.json();
  
  // Add AI response
  chatPanel.value.addMessage({
    role: 'assistant',
    content: data.answer,
    timestamp: new Date().toISOString()
  });
};
</script>`,
      angular: `import { Component, ViewChild } from '@angular/core';
import { EvaChatPanelModule } from '@eva-sovereign/angular';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [EvaChatPanelModule],
  template: \`
    <eva-chat-panel 
      #chatPanel
      [locale]="locale"
      placeholder="Ask a question..."
      (evaMessageSend)="handleMessage($event)"
    ></eva-chat-panel>
  \`
})
export class ChatApp {
  @ViewChild('chatPanel') chatPanel!: any;
  locale = 'en-CA';
  
  async handleMessage(e: CustomEvent) {
    const userMessage = e.detail.message;
    
    // Call your RAG backend
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    
    // Add AI response
    this.chatPanel.addMessage({
      role: 'assistant',
      content: data.answer,
      timestamp: new Date().toISOString()
    });
  }
}`,
      svelte: `<script>
  import { EvaChatPanel } from '@eva-sovereign/svelte';
  
  let locale = 'en-CA';
  let chatPanel;
  
  async function handleMessage(e) {
    const userMessage = e.detail.message;
    
    // Call your RAG backend
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: userMessage })
    });
    const data = await response.json();
    
    // Add AI response
    chatPanel.addMessage({
      role: 'assistant',
      content: data.answer,
      timestamp: new Date().toISOString()
    });
  }
</script>

<EvaChatPanel 
  bind:this={chatPanel}
  {locale}
  placeholder="Ask a question..."
  on:eva-message-send={handleMessage}
/>`
    }
  }

  // TODO: Add metadata for remaining 97 components
  // This is the extensible pattern - each component gets full metadata
};
