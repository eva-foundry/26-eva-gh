import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-add-cal.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-add-cal',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const SingleEvent: Story = {
  render: () => html`
    <wb-add-cal
      title="Team Meeting"
      description="Quarterly review and planning session"
      location="Conference Room A"
      startDate="2025-02-15T10:00:00Z"
      endDate="2025-02-15T11:00:00Z"
    ></wb-add-cal>
  `
};

export const AllDayEvent: Story = {
  render: () => html`
    <wb-add-cal
      title="Company Retreat"
      description="Annual company retreat and team building"
      location="Mountain Resort"
      startDate="2025-03-10T00:00:00Z"
      endDate="2025-03-10T23:59:59Z"
    ></wb-add-cal>
  `
};

export const MultipleEvents: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <wb-add-cal
        title="Project Kickoff"
        description="New project launch meeting"
        location="Office"
        startDate="2025-02-20T09:00:00Z"
        endDate="2025-02-20T10:00:00Z"
      ></wb-add-cal>
      
      <wb-add-cal
        title="Client Presentation"
        description="Q1 results presentation"
        location="Client Office"
        startDate="2025-02-25T14:00:00Z"
        endDate="2025-02-25T15:30:00Z"
      ></wb-add-cal>
      
      <wb-add-cal
        title="Team Lunch"
        description="Monthly team lunch"
        location="Downtown Restaurant"
        startDate="2025-03-01T12:00:00Z"
        endDate="2025-03-01T13:00:00Z"
      ></wb-add-cal>
    </div>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-add-cal
        title="Training Workshop"
        description="Professional development workshop"
        location="Training Center"
        startDate="2025-03-05T09:00:00Z"
        endDate="2025-03-05T17:00:00Z"
        @wb-add-cal-added="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Event added: ${e.detail.title}`;
        }}"
        @wb-add-cal-error="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Error: ${e.detail.error}`;
        }}"
      ></wb-add-cal>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-add-cal
        title="Réunion d'équipe"
        description="Révision trimestrielle"
        location="Bureau"
        startDate="2025-02-15T10:00:00Z"
        endDate="2025-02-15T11:00:00Z"
      ></wb-add-cal>
    </div>
  `
};
