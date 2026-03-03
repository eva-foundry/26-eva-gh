import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './eva-chat-panel.js';

const meta: Meta = {
  title: 'Components/Chat Panel',
  component: 'eva-chat-panel',
  tags: ['autodocs'],
  argTypes: {
    greeting: {
      control: 'text',
      description: 'Welcome message shown when no messages',
    },
    isTyping: {
      control: 'boolean',
      description: 'Show typing indicator',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Empty: Story = {
  render: () => html`
    <eva-chat-panel
      greeting="Hello! I'm EVA, your Government of Canada assistant. How can I help you today?"
    ></eva-chat-panel>
  `,
};

export const WithMessages: Story = {
  render: () => {
    const chatPanel = document.createElement('eva-chat-panel');
    chatPanel.greeting = "Hello! I'm EVA.";
    chatPanel.messages = [
      {
        id: '1',
        sender: 'assistant',
        content: 'Welcome! How can I assist you today?',
        timestamp: new Date(Date.now() - 60000),
        type: 'text',
      },
      {
        id: '2',
        sender: 'user',
        content: 'Can you help me with my tax return?',
        timestamp: new Date(Date.now() - 30000),
        type: 'text',
      },
      {
        id: '3',
        sender: 'assistant',
        content: 'Of course! I can help you with tax-related questions. What would you like to know?',
        timestamp: new Date(Date.now() - 10000),
        type: 'text',
      },
    ];
    return chatPanel;
  },
};

export const Typing: Story = {
  render: () => {
    const chatPanel = document.createElement('eva-chat-panel');
    chatPanel.isTyping = true;
    chatPanel.messages = [
      {
        id: '1',
        sender: 'user',
        content: 'Hello, are you there?',
        timestamp: new Date(),
        type: 'text',
      },
    ];
    return chatPanel;
  },
};

export const SystemMessage: Story = {
  render: () => {
    const chatPanel = document.createElement('eva-chat-panel');
    chatPanel.messages = [
      {
        id: '1',
        sender: 'system',
        content: 'Conversation started',
        timestamp: new Date(Date.now() - 120000),
        type: 'info',
      },
      {
        id: '2',
        sender: 'assistant',
        content: 'Hello! How can I help?',
        timestamp: new Date(Date.now() - 60000),
        type: 'text',
      },
      {
        id: '3',
        sender: 'user',
        content: 'I need assistance',
        timestamp: new Date(Date.now() - 30000),
        type: 'text',
      },
    ];
    return chatPanel;
  },
};
