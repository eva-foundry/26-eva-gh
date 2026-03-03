# @eva-suite/sovereign-ui-react

React wrappers for EVA-Sovereign-UI Web Components with TypeScript support, proper event handling, and React-style props.

## Installation

```bash
npm install @eva-suite/sovereign-ui-react @eva-suite/sovereign-ui react react-dom
```

## Usage

### Basic Example

```tsx
import { EVAGCButton, EVAGCHeader, EVAGCFooter } from '@eva-suite/sovereign-ui-react';

function App() {
  return (
    <div>
      <EVAGCHeader profile="canada_gc" app-name="My Application" />
      
      <main>
        <EVAGCButton 
          variant="primary" 
          onClick={() => console.log('Clicked!')}
        >
          Submit Application
        </EVAGCButton>
      </main>
      
      <EVAGCFooter profile="canada_gc" />
    </div>
  );
}
```

### Chat Component

```tsx
import { EVAChatPanel } from '@eva-suite/sovereign-ui-react';
import { useState } from 'react';

function ChatDemo() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content }]);
    
    // Call API
    setLoading(true);
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: content }),
    });
    const data = await response.json();
    
    // Add assistant response
    setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    setLoading(false);
  };

  return (
    <EVAChatPanel
      messages={messages}
      onSendMessage={handleSendMessage}
      loading={loading}
      placeholder="Ask me anything..."
    />
  );
}
```

### Language Switcher

```tsx
import { EVALanguageSwitcher } from '@eva-suite/sovereign-ui-react';

function App() {
  const handleLanguageChange = (locale: string) => {
    console.log('Switched to:', locale);
  };

  return (
    <EVALanguageSwitcher
      current-locale="en-CA"
      onLanguageChange={handleLanguageChange}
    />
  );
}
```

## TypeScript Support

All components include full TypeScript definitions:

```tsx
import type { EVAGCButtonProps, EVAChatPanelRef } from '@eva-suite/sovereign-ui-react';
import { useRef } from 'react';

function Example() {
  const chatRef = useRef<EVAChatPanelRef>(null);

  const clearChat = () => {
    chatRef.current?.clearHistory();
  };

  return (
    <EVAChatPanel ref={chatRef} />
  );
}
```

## Available Components

- `EVAGCButton` - Government of Canada styled button
- `EVAGCHeader` - Government of Canada header
- `EVAGCFooter` - Government of Canada footer
- `EVALanguageSwitcher` - Language selection component
- `EVAChatPanel` - AI chat interface

## Five Eyes Profiles

All components support sovereign profiles:

```tsx
<EVAGCHeader profile="usa_gov" />      {/* US Government */}
<EVAGCHeader profile="uk_gov" />       {/* UK Government */}
<EVAGCHeader profile="australia_gov" /> {/* Australian Government */}
<EVAGCHeader profile="nz_gov" />       {/* New Zealand Government */}
<EVAGCHeader profile="canada_gc" />    {/* Government of Canada (default) */}
```

## License

MIT
