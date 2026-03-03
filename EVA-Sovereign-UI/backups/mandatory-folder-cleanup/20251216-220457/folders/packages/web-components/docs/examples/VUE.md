# Using EVA-Sovereign-UI with Vue 3

This guide shows how to use EVA Web Components in a Vue 3 application.

## Installation

```bash
npm install @eva-sovereign/web-components
```

## Vue 3 Configuration

Tell Vue to ignore custom elements:

```typescript
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import '@eva-sovereign/web-components';

const app = createApp(App);

// Configure Vue to ignore EVA custom elements
app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('eva-');

app.mount('#app');
```

Or in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('eva-'),
        },
      },
    }),
  ],
});
```

## Basic Usage

```vue
<template>
  <div>
    <eva-button variant="primary">Click Me</eva-button>
  </div>
</template>

<script setup lang="ts">
import '@eva-sovereign/web-components';
</script>
```

## Handling Events

```vue
<template>
  <div>
    <eva-button
      ref="buttonRef"
      variant="primary"
      @eva-click="handleClick"
    >
      Click Me
    </eva-button>
    <p>Clicked: {{ clickCount }} times</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import '@eva-sovereign/web-components';

const buttonRef = ref<HTMLElement | null>(null);
const clickCount = ref(0);

const handleClick = (event: Event) => {
  const customEvent = event as CustomEvent;
  console.log('Button clicked:', customEvent.detail);
  clickCount.value++;
};

onMounted(() => {
  if (buttonRef.value) {
    buttonRef.value.addEventListener('eva-click', handleClick);
  }
});

onUnmounted(() => {
  if (buttonRef.value) {
    buttonRef.value.removeEventListener('eva-click', handleClick);
  }
});
</script>
```

## Two-Way Binding

```vue
<template>
  <div>
    <eva-input
      ref="inputRef"
      label="Name"
      :value="name"
      :error="error"
      @eva-input="handleInput"
    />
    <p>Current value: {{ name }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import '@eva-sovereign/web-components';

const inputRef = ref<any>(null);
const name = ref('');
const error = ref('');

const handleInput = (event: Event) => {
  const customEvent = event as CustomEvent<{ value: string }>;
  name.value = customEvent.detail.value;

  // Validate
  if (customEvent.detail.value.length < 3) {
    error.value = 'Must be at least 3 characters';
  } else {
    error.value = '';
  }
};

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.addEventListener('eva-input', handleInput);
  }
});

onUnmounted(() => {
  if (inputRef.value) {
    inputRef.value.removeEventListener('eva-input', handleInput);
  }
});
</script>
```

## Chat Panel Integration

```vue
<template>
  <div>
    <eva-chat-panel
      ref="chatRef"
      greeting="Hello! I'm EVA, your assistant."
      :isTyping="isTyping"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import '@eva-sovereign/web-components';
import type { ChatMessage } from '@eva-sovereign/web-components';

const chatRef = ref<any>(null);
const isTyping = ref(false);

const handleMessageSend = async (event: Event) => {
  const customEvent = event as CustomEvent<{ message: ChatMessage }>;
  const userMessage = customEvent.detail.message;

  isTyping.value = true;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage.content }),
    });

    const data = await response.json();

    isTyping.value = false;
    chatRef.value?.addMessage({
      sender: 'assistant',
      content: data.response,
      type: 'text',
    });
  } catch (error) {
    isTyping.value = false;
    chatRef.value?.addMessage({
      sender: 'system',
      content: 'Error: Could not reach server',
      type: 'error',
    });
  }
};

watch(isTyping, (newVal) => {
  if (chatRef.value) {
    chatRef.value.isTyping = newVal;
  }
});

onMounted(() => {
  if (chatRef.value) {
    chatRef.value.addEventListener('eva-message-send', handleMessageSend);
  }
});

onUnmounted(() => {
  if (chatRef.value) {
    chatRef.value.removeEventListener('eva-message-send', handleMessageSend);
  }
});
</script>
```

## Modal Control

```vue
<template>
  <div>
    <eva-button variant="primary" @click="openModal">
      Open Modal
    </eva-button>

    <eva-modal ref="modalRef" size="medium" @eva-close="handleClose">
      <h2 slot="header">Vue 3 Integration</h2>
      <p>This modal is controlled by Vue!</p>
      <eva-button slot="footer" variant="secondary" @click="closeModal">
        Close
      </eva-button>
    </eva-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import '@eva-sovereign/web-components';

const modalRef = ref<any>(null);
const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
};

const handleClose = () => {
  isOpen.value = false;
};

watch(isOpen, (newVal) => {
  if (modalRef.value) {
    modalRef.value.open = newVal;
  }
});
</script>
```

## Locale Switching

```vue
<template>
  <div>
    <eva-button variant="link" @click="setLocale('en-CA')">
      English
    </eva-button>
    <eva-button variant="link" @click="setLocale('fr-CA')">
      Français
    </eva-button>
  </div>
</template>

<script setup lang="ts">
import { setGlobalLocale } from '@eva-sovereign/web-components';

const setLocale = (locale: 'en-CA' | 'fr-CA') => {
  setGlobalLocale(locale);
};
</script>
```

## Complete Example

```vue
<template>
  <div class="app">
    <header>
      <h1>EVA-Sovereign-UI Vue 3 Demo</h1>
      <eva-button variant="link" @click="toggleLocale">
        {{ locale === 'en-CA' ? 'FR' : 'EN' }}
      </eva-button>
    </header>

    <main>
      <section>
        <h2>Buttons</h2>
        <eva-button variant="supertask">Supertask</eva-button>
        <eva-button variant="primary">Primary</eva-button>
        <eva-button variant="secondary">Secondary</eva-button>
      </section>

      <section>
        <h2>Form</h2>
        <eva-input
          ref="nameInput"
          label="Name"
          :value="formData.name"
          @eva-input="handleNameInput"
        />
        <eva-select
          ref="provinceSelect"
          label="Province"
          @eva-change="handleProvinceChange"
        >
          <option value="ON">Ontario</option>
          <option value="QC">Quebec</option>
          <option value="BC">British Columbia</option>
        </eva-select>
      </section>

      <section>
        <h2>Alerts</h2>
        <eva-alert type="success">Form saved successfully!</eva-alert>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import '@eva-sovereign/web-components';
import { setGlobalLocale } from '@eva-sovereign/web-components';

const locale = ref<'en-CA' | 'fr-CA'>('en-CA');
const formData = reactive({
  name: '',
  province: '',
});

const toggleLocale = () => {
  locale.value = locale.value === 'en-CA' ? 'fr-CA' : 'en-CA';
  setGlobalLocale(locale.value);
};

const handleNameInput = (event: Event) => {
  const customEvent = event as CustomEvent<{ value: string }>;
  formData.name = customEvent.detail.value;
};

const handleProvinceChange = (event: Event) => {
  const customEvent = event as CustomEvent<{ value: string }>;
  formData.province = customEvent.detail.value;
};
</script>

<style scoped>
.app {
  padding: 2rem;
}

section {
  margin-bottom: 2rem;
}
</style>
```
