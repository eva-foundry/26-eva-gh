# Migration Guide: React Components → EVA Web Components

This guide helps you migrate from React-based UI components to EVA-Sovereign-UI Web Components.

## Why Migrate?

**Benefits of Web Components**:
- ✅ **Framework-agnostic**: Works with React, Vue, Angular, Svelte, or plain HTML
- ✅ **Better encapsulation**: Shadow DOM prevents style conflicts
- ✅ **Smaller bundles**: No framework overhead, shared across apps
- ✅ **Native browser support**: No compilation required for production
- ✅ **Future-proof**: Web standards, not tied to framework versions

## Key Differences

### 1. Component Syntax

**React (Before)**:
```tsx
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>
```

**Web Components (After)**:
```html
<eva-button variant="primary">Click Me</eva-button>
```

### 2. Event Handling

**React (Before)**:
```tsx
<Button onClick={handleClick} onChange={handleChange} />
```

**Web Components (After)**:
```tsx
// Use ref + addEventListener
const buttonRef = useRef<HTMLElement>(null);

useEffect(() => {
  const button = buttonRef.current;
  if (button) {
    const handleClick = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(customEvent.detail);
    };
    button.addEventListener('eva-click', handleClick);
    return () => button.removeEventListener('eva-click', handleClick);
  }
}, []);

return <eva-button ref={buttonRef} variant="primary">Click Me</eva-button>;
```

### 3. Props vs Attributes

**React (Before)**:
```tsx
<Input
  value={value}
  onChange={setValue}
  placeholder="Enter name"
  required={true}
  maxLength={50}
/>
```

**Web Components (After)**:
```html
<eva-input
  value={value}
  placeholder="Enter name"
  required
  maxlength="50"
/>
```

**Key differences**:
- `onChange` → Listen to `eva-change` event
- `maxLength` → `maxlength` (lowercase, HTML attribute)
- Boolean props: `required={true}` → `required` (presence = true)

### 4. State Management

**React (Before)**:
```tsx
const [value, setValue] = useState('');

<Input value={value} onChange={(e) => setValue(e.target.value)} />
```

**Web Components (After)**:
```tsx
const [value, setValue] = useState('');
const inputRef = useRef<any>(null);

useEffect(() => {
  const input = inputRef.current;
  if (input) {
    const handleInput = (e: Event) => {
      const customEvent = e as CustomEvent<{ value: string }>;
      setValue(customEvent.detail.value);
    };
    input.addEventListener('eva-input', handleInput);
    return () => input.removeEventListener('eva-input', handleInput);
  }
}, []);

// Update attribute when state changes
useEffect(() => {
  if (inputRef.current) {
    inputRef.current.value = value;
  }
}, [value]);

return <eva-input ref={inputRef} label="Name" />;
```

### 5. Children / Slots

**React (Before)**:
```tsx
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Footer</Card.Footer>
</Card>
```

**Web Components (After)**:
```html
<eva-card variant="bordered">
  <h2 slot="header">Title</h2>
  <p>Content</p>
  <div slot="footer">Footer</div>
</eva-card>
```

**Key difference**: Use `slot="name"` attribute instead of compound components.

### 6. Styling

**React (Before)**:
```tsx
<Button className="my-button" style={{ margin: '1rem' }}>
  Click Me
</Button>
```

**Web Components (After)**:
```html
<!-- Shadow DOM prevents external styles -->
<!-- Use CSS custom properties instead -->
<eva-button style="--button-margin: 1rem;">Click Me</eva-button>

<style>
eva-button {
  margin: 1rem;
  /* Shadow DOM styles can't be overridden directly */
  /* Use provided CSS custom properties */
}
</style>
```

## Component Mapping

| React Component | EVA Component | Notes |
|----------------|---------------|-------|
| `<Button>` | `<eva-button>` | Events: `eva-click` |
| `<Input>` | `<eva-input>` | Events: `eva-input`, `eva-change` |
| `<Select>` | `<eva-select>` | Events: `eva-change` |
| `<Checkbox>` | `<eva-checkbox>` | Events: `eva-change` |
| `<Radio>` | `<eva-radio>` | Events: `eva-change` |
| `<Modal>` | `<eva-modal>` | Events: `eva-close`, control via `.open` property |
| `<Tabs>` | `<eva-tabs>` + `<eva-tab>` | Events: `eva-tab-change` |
| `<Alert>` | `<eva-alert>` | Events: `eva-dismiss` |
| `<Card>` | `<eva-card>` | Use slots: `header`, `footer` |
| `<ChatPanel>` | `<eva-chat-panel>` | Events: `eva-message-send` |

## Migration Checklist

### Phase 1: Setup
- [ ] Install `@eva-sovereign/web-components`
- [ ] Import components in `main.tsx` or `App.tsx`
- [ ] Add TypeScript declarations (see React example)

### Phase 2: Component by Component
For each component:
- [ ] Replace JSX tag with `<eva-*>` tag
- [ ] Convert props to attributes (lowercase, kebab-case)
- [ ] Replace event handlers with `addEventListener`
- [ ] Update state synchronization (ref + useEffect)
- [ ] Replace compound components with slots
- [ ] Test keyboard navigation
- [ ] Test screen reader accessibility

### Phase 3: Validation
- [ ] All components render correctly
- [ ] All events fire correctly
- [ ] State management works
- [ ] Styling matches design
- [ ] Accessibility tests pass (keyboard, screen reader)
- [ ] Bilingual support works (EN-CA/FR-CA)

## Common Pitfalls

### 1. Event Names
❌ **Wrong**: `onClick`, `onChange`  
✅ **Right**: `eva-click`, `eva-change`

### 2. Boolean Attributes
❌ **Wrong**: `<eva-input required={true} />`  
✅ **Right**: `<eva-input required />`

### 3. Attribute Casing
❌ **Wrong**: `<eva-input maxLength="50" />`  
✅ **Right**: `<eva-input maxlength="50" />`

### 4. Direct Style Manipulation
❌ **Wrong**: Trying to override Shadow DOM styles  
✅ **Right**: Use CSS custom properties or wrapper styling

### 5. State Sync
❌ **Wrong**: Expecting automatic two-way binding  
✅ **Right**: Listen to events + update attributes manually

## Example Migration

**Before (React)**:
```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !password) {
      setError('All fields required');
      return;
    }
    // Submit logic
  };

  return (
    <Card>
      <Card.Header>Login</Card.Header>
      <Card.Body>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {error && <Alert type="danger">{error}</Alert>}
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Sign In
        </Button>
      </Card.Footer>
    </Card>
  );
}
```

**After (Web Components)**:
```tsx
import { useState, useEffect, useRef } from 'react';
import '@eva-sovereign/web-components';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const buttonRef = useRef<any>(null);

  useEffect(() => {
    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;
    const button = buttonRef.current;

    const handleEmailInput = (e: Event) => {
      const ce = e as CustomEvent<{ value: string }>;
      setEmail(ce.detail.value);
    };

    const handlePasswordInput = (e: Event) => {
      const ce = e as CustomEvent<{ value: string }>;
      setPassword(ce.detail.value);
    };

    const handleSubmit = () => {
      if (!email || !password) {
        setError('All fields required');
        return;
      }
      setError('');
      // Submit logic
    };

    emailInput?.addEventListener('eva-input', handleEmailInput);
    passwordInput?.addEventListener('eva-input', handlePasswordInput);
    button?.addEventListener('eva-click', handleSubmit);

    return () => {
      emailInput?.removeEventListener('eva-input', handleEmailInput);
      passwordInput?.removeEventListener('eva-input', handlePasswordInput);
      button?.removeEventListener('eva-click', handleSubmit);
    };
  }, [email, password]);

  return (
    <eva-card variant="bordered">
      <h2 slot="header">Login</h2>
      <eva-input
        ref={emailRef}
        label="Email"
        type="email"
        placeholder="Email"
        required
      />
      <eva-input
        ref={passwordRef}
        label="Password"
        type="password"
        placeholder="Password"
        required
      />
      {error && <eva-alert type="danger">{error}</eva-alert>}
      <div slot="footer">
        <eva-button ref={buttonRef} variant="primary">
          Sign In
        </eva-button>
      </div>
    </eva-card>
  );
}
```

## Need Help?

- **Documentation**: See `docs/api/` for full API reference
- **Examples**: Check `docs/examples/` for framework-specific guides
- **Storybook**: Run `npm run storybook` for interactive demos
- **Issues**: Open a GitHub issue for bugs or questions
