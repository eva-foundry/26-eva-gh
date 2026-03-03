import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import './wb-slideout.js';

const meta: Meta = {
  title: 'WET-BOEW/wb-slideout',
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

export const RightPanel: Story = {
  render: () => html`
    <button onclick="document.getElementById('right-panel').showPanel()">Open Right Panel</button>
    <wb-slideout id="right-panel" position="right">
      <h2 slot="header">Navigation</h2>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </wb-slideout>
  `
};

export const LeftPanel: Story = {
  render: () => html`
    <button onclick="document.getElementById('left-panel').showPanel()">Open Left Panel</button>
    <wb-slideout id="left-panel" position="left">
      <h2 slot="header">Menu</h2>
      <p>Panel content from left</p>
    </wb-slideout>
  `
};

export const TopPanel: Story = {
  render: () => html`
    <button onclick="document.getElementById('top-panel').showPanel()">Open Top Panel</button>
    <wb-slideout id="top-panel" position="top">
      <h2 slot="header">Notification</h2>
      <p>Panel slides from top</p>
    </wb-slideout>
  `
};

export const BottomPanel: Story = {
  render: () => html`
    <button onclick="document.getElementById('bottom-panel').showPanel()">Open Bottom Panel</button>
    <wb-slideout id="bottom-panel" position="bottom">
      <h2 slot="header">Details</h2>
      <p>Panel slides from bottom</p>
    </wb-slideout>
  `
};

export const BilingualFrench: Story = {
  render: () => html`
    <div lang="fr-CA">
      <button onclick="document.getElementById('fr-panel').showPanel()">Ouvrir le panneau</button>
      <wb-slideout id="fr-panel">
        <h2 slot="header">Menu</h2>
        <p>Contenu du panneau</p>
      </wb-slideout>
    </div>
  `
};
