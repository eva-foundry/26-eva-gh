# Using EVA-Sovereign-UI with React

This guide shows how to use EVA Web Components in a React application.

## Installation

```bash
npm install @eva-sovereign/web-components
```

## Basic Usage

Import the components and use them as HTML elements:

```tsx
import React from 'react';
import '@eva-sovereign/web-components';

function App() {
  return (
    <div className="App">
      <eva-button variant="primary">Click Me</eva-button>
    </div>
  );
}

export default App;
```

## Handling Events

Web Component events need to be handled using refs:

```tsx
import React, { useEffect, useRef } from 'react';
import '@eva-sovereign/web-components';

function ButtonExample() {
  const buttonRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      const handleClick = (e: Event) => {
        const customEvent = e as CustomEvent;
        console.log('Button clicked:', customEvent.detail);
      };

      button.addEventListener('eva-click', handleClick);
      return () => button.removeEventListener('eva-click', handleClick);
    }
  }, []);

  return <eva-button ref={buttonRef} variant="primary">Click Me</eva-button>;
}
```

## Using with State

Pass React state as attributes/properties:

```tsx
import React, { useState } from 'react';
import '@eva-sovereign/web-components';

function InputExample() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<any>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (input) {
      const handleInput = (e: Event) => {
        const customEvent = e as CustomEvent;
        setValue(customEvent.detail.value);
        
        // Validate
        if (customEvent.detail.value.length < 3) {
          setError('Must be at least 3 characters');
        } else {
          setError('');
        }
      };

      input.addEventListener('eva-input', handleInput);
      return () => input.removeEventListener('eva-input', handleInput);
    }
  }, []);

  return (
    <div>
      <eva-input
        ref={inputRef}
        label="Name"
        value={value}
        error={error}
      />
      <p>Current value: {value}</p>
    </div>
  );
}
```

## Chat Panel Integration

```tsx
import React, { useEffect, useRef, useState } from 'react';
import '@eva-sovereign/web-components';
import type { ChatMessage } from '@eva-sovereign/web-components';

function ChatDemo() {
  const chatRef = useRef<any>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const chat = chatRef.current;
    if (chat) {
      const handleSend = async (e: Event) => {
        const customEvent = e as CustomEvent<{ message: ChatMessage }>;
        const userMessage = customEvent.detail.message;

        setIsTyping(true);

        // Call your RAG backend
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage.content }),
          });

          const data = await response.json();

          setIsTyping(false);
          chat.addMessage({
            sender: 'assistant',
            content: data.response,
            type: 'text',
          });
        } catch (error) {
          setIsTyping(false);
          chat.addMessage({
            sender: 'system',
            content: 'Error: Could not reach server',
            type: 'error',
          });
        }
      };

      chat.addEventListener('eva-message-send', handleSend);
      return () => chat.removeEventListener('eva-message-send', handleSend);
    }
  }, []);

  // Sync isTyping state
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.isTyping = isTyping;
    }
  }, [isTyping]);

  return (
    <eva-chat-panel
      ref={chatRef}
      greeting="Hello! I'm EVA, your assistant."
    />
  );
}
```

## TypeScript Support

Add type declarations for Web Components:

```typescript
// src/global.d.ts
import type { EVAButton, EVAInput, EVAChatPanel } from '@eva-sovereign/web-components';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'eva-button': React.DetailedHTMLProps<React.HTMLAttributes<EVAButton>, EVAButton> & {
        variant?: 'supertask' | 'primary' | 'secondary' | 'danger' | 'link' | 'contextual-signin';
        size?: 'small' | 'medium' | 'large';
        disabled?: boolean;
        loading?: boolean;
      };
      'eva-input': React.DetailedHTMLProps<React.HTMLAttributes<EVAInput>, EVAInput> & {
        label?: string;
        type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
        value?: string;
        placeholder?: string;
        required?: boolean;
        error?: string;
        hint?: string;
        maxlength?: number;
      };
      'eva-chat-panel': React.DetailedHTMLProps<React.HTMLAttributes<EVAChatPanel>, EVAChatPanel> & {
        greeting?: string;
        isTyping?: boolean;
      };
      // Add other components as needed
    }
  }
}
```

## Locale Switching

```tsx
import React from 'react';
import '@eva-sovereign/web-components';
import { setGlobalLocale } from '@eva-sovereign/web-components';

function LocaleSwitcher() {
  return (
    <div>
      <button onClick={() => setGlobalLocale('en-CA')}>English</button>
      <button onClick={() => setGlobalLocale('fr-CA')}>Français</button>
    </div>
  );
}
```

## Complete Example

```tsx
import React, { useState, useEffect, useRef } from 'react';
import '@eva-sovereign/web-components';
import { setGlobalLocale } from '@eva-sovereign/web-components';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<any>(null);

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.open = modalOpen;
    }
  }, [modalOpen]);

  useEffect(() => {
    const modal = modalRef.current;
    if (modal) {
      const handleClose = () => setModalOpen(false);
      modal.addEventListener('eva-close', handleClose);
      return () => modal.removeEventListener('eva-close', handleClose);
    }
  }, []);

  return (
    <div className="App">
      <header>
        <h1>EVA-Sovereign-UI React Demo</h1>
        <eva-button variant="link" onClick={() => setGlobalLocale('fr-CA')}>
          FR
        </eva-button>
      </header>

      <main>
        <eva-button
          variant="primary"
          onClick={() => setModalOpen(true)}
        >
          Open Modal
        </eva-button>

        <eva-modal ref={modalRef} size="medium">
          <h2 slot="header">React Integration</h2>
          <p>This modal is controlled by React state!</p>
          <eva-button
            slot="footer"
            variant="secondary"
            onClick={() => setModalOpen(false)}
          >
            Close
          </eva-button>
        </eva-modal>

        <eva-alert type="success">React integration working!</eva-alert>
      </main>
    </div>
  );
}

export default App;
```
