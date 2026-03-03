import type { Meta, StoryObj } from '@storybook/web-components';
import './wb-calendar.js';
import type { CalendarEvent } from './wb-calendar.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-calendar',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

const sampleEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    start: new Date(2025, 0, 15, 10, 0),
    end: new Date(2025, 0, 15, 11, 0),
    description: 'Monthly team sync meeting'
  },
  {
    id: '2',
    title: 'Project Deadline',
    start: new Date(2025, 0, 20, 17, 0),
    description: 'Q1 project deliverable due'
  },
  {
    id: '3',
    title: 'Conference',
    start: new Date(2025, 0, 25, 9, 0),
    end: new Date(2025, 0, 25, 17, 0),
    description: 'Annual tech conference'
  },
  {
    id: '4',
    title: 'Training',
    start: new Date(2025, 0, 28, 14, 0),
    end: new Date(2025, 0, 28, 16, 0),
    description: 'Security awareness training'
  }
];

export const BasicCalendar: Story = {
  render: () => {
    const calendar = document.createElement('wb-calendar');
    calendar.events = sampleEvents;
    calendar.currentDate = new Date(2025, 0, 1);
    return calendar;
  }
};

export const EmptyCalendar: Story = {
  render: () => {
    const calendar = document.createElement('wb-calendar');
    calendar.events = [];
    calendar.currentDate = new Date(2025, 0, 1);
    return calendar;
  }
};

export const CurrentMonth: Story = {
  render: () => {
    const today = new Date();
    const calendar = document.createElement('wb-calendar');
    calendar.events = [
      {
        id: '1',
        title: 'Today\'s Event',
        start: today,
        description: 'Something happening today'
      }
    ];
    return calendar;
  }
};

export const BilingualFrench: Story = {
  render: () => {
    const container = document.createElement('div');
    container.lang = 'fr-CA';
    const calendar = document.createElement('wb-calendar');
    calendar.events = [
      {
        id: '1',
        title: 'Réunion d\'équipe',
        start: new Date(2025, 0, 15, 10, 0),
        description: 'Réunion mensuelle de synchronisation'
      },
      {
        id: '2',
        title: 'Formation',
        start: new Date(2025, 0, 28, 14, 0),
        description: 'Formation sur la sécurité'
      }
    ];
    calendar.currentDate = new Date(2025, 0, 1);
    container.appendChild(calendar);
    return container;
  }
};
