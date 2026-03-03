import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-multimedia.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-multimedia',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const VideoPlayer: Story = {
  render: () => html`
    <wb-multimedia
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      type="video"
    ></wb-multimedia>
  `
};

export const AudioPlayer: Story = {
  render: () => html`
    <wb-multimedia
      src="https://www.w3schools.com/html/horse.mp3"
      type="audio"
    ></wb-multimedia>
  `
};

export const WithTranscript: Story = {
  render: () => html`
    <wb-multimedia
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      type="video"
      transcript="This is a sample video demonstrating the multimedia player component with accessible controls and transcript support."
      show-transcript
    ></wb-multimedia>
  `
};

export const EventLogging: Story = {
  render: () => html`
    <div>
      <div id="log" style="padding: 1rem; background: #f0f0f0; margin-bottom: 1rem;">
        Event log will appear here
      </div>
      <wb-multimedia
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        type="video"
        @wb-multimedia-play="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Playing: ${e.detail.playing}`;
        }}"
        @wb-multimedia-volume="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Volume: ${e.detail.volume}`;
        }}"
        @wb-multimedia-speed="${(e: CustomEvent) => {
          const log = document.getElementById('log');
          if (log) log.textContent = `Speed: ${e.detail.speed}x`;
        }}"
      ></wb-multimedia>
    </div>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <wb-multimedia
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        type="video"
        transcript="Ceci est un exemple de lecteur multimédia avec des contrôles accessibles et un support de transcription."
      ></wb-multimedia>
    </div>
  `
};
