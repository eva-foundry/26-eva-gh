import { expect as chaiExpect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { GCTopicMenu } from './gc-topic-menu.js';

import './gc-topic-menu.js';

describe('gc-topic-menu', () => {
  const mockTopics = [
    {
      icon: '💼',
      heading: 'Jobs and workplace',
      description: 'Find a job, training, hiring programs',
      href: '/jobs'
    },
    {
      icon: '✈️',
      heading: 'Immigration and citizenship',
      description: 'Visit, work, study or immigrate to Canada',
      href: '/immigration'
    },
    {
      icon: '💰',
      heading: 'Taxes',
      description: 'File taxes, get benefits, check credits',
      href: '/taxes'
    }
  ];

  it('should render topic cards', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    const cards = el.shadowRoot!.querySelectorAll('.topic-card');
    chaiExpect(cards.length).to.equal(3);
  });

  it('should display topic icons', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    const icons = el.shadowRoot!.querySelectorAll('.topic-icon');
    chaiExpect(icons.length).to.equal(3);
    chaiExpect(icons[0].textContent).to.equal('💼');
  });

  it('should display topic headings', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    const headings = el.shadowRoot!.querySelectorAll('.topic-heading');
    chaiExpect(headings.length).to.equal(3);
    chaiExpect(headings[0].textContent).to.equal('Jobs and workplace');
  });

  it('should display topic descriptions', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    const descriptions = el.shadowRoot!.querySelectorAll('.topic-description');
    chaiExpect(descriptions.length).to.equal(3);
    chaiExpect(descriptions[0].textContent).to.equal('Find a job, training, hiring programs');
  });

  it('should link to topic pages', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    const links = el.shadowRoot!.querySelectorAll('.topic-card');
    chaiExpect((links[0] as HTMLAnchorElement).href).to.include('/jobs');
  });

  it('should emit topic-click event', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    let eventFired = false;
    let eventDetail: any;

    el.addEventListener('gc-topic-click', ((e: CustomEvent) => {
      eventFired = true;
      eventDetail = e.detail;
    }) as EventListener);

    const card = el.shadowRoot!.querySelector('.topic-card') as HTMLElement;
    card.click();
    await el.updateComplete;

    chaiExpect(eventFired).to.be.true;
    chaiExpect(eventDetail.heading).to.equal('Jobs and workplace');
  });

  it('should support 2-column layout', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}" columns="2"></gc-topic-menu>
    `);
    chaiExpect(el.columns).to.equal(2);
  });

  it('should support 3-column layout', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}" columns="3"></gc-topic-menu>
    `);
    chaiExpect(el.columns).to.equal(3);
  });

  it('should update CSS custom property for columns', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}" columns="2"></gc-topic-menu>
    `);
    const computedStyle = getComputedStyle(el);
    chaiExpect(computedStyle.getPropertyValue('--gc-topic-columns')).to.equal('2');
  });

  it('should render as navigation with role', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    const nav = el.shadowRoot!.querySelector('nav');
    chaiExpect(nav?.getAttribute('role')).to.equal('navigation');
  });

  it('should have aria-label on nav', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    const nav = el.shadowRoot!.querySelector('nav');
    chaiExpect(nav?.getAttribute('aria-label')).to.exist;
  });

  it('should be keyboard accessible', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    const cards = el.shadowRoot!.querySelectorAll('.topic-card');
    cards.forEach(card => {
      chaiExpect(card.tagName.toLowerCase()).to.equal('a');
    });
  });

  it('should handle empty topics array', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${[]}"></gc-topic-menu>
    `);
    const cards = el.shadowRoot!.querySelectorAll('.topic-card');
    chaiExpect(cards.length).to.equal(0);
  });

  it('should update columns when property changes', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}" columns="3"></gc-topic-menu>
    `);
    el.columns = 2;
    await el.updateComplete;
    const computedStyle = getComputedStyle(el);
    chaiExpect(computedStyle.getPropertyValue('--gc-topic-columns')).to.equal('2');
  });

  it('should be accessible', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    await chaiExpect(el).to.be.accessible();
  });

  it('should support French Canadian locale', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}" locale="fr-CA"></gc-topic-menu>
    `);
    const nav = el.shadowRoot!.querySelector('nav');
    chaiExpect(nav?.getAttribute('aria-label')).to.equal('Menu des sujets');
  });

  it('should display topic icons with aria-hidden', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    const icons = el.shadowRoot!.querySelectorAll('.topic-icon');
    icons.forEach(icon => {
      chaiExpect(icon.getAttribute('aria-hidden')).to.equal('true');
    });
  });

  it('should have proper heading elements', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    const headings = el.shadowRoot!.querySelectorAll('.topic-heading');
    headings.forEach(heading => {
      chaiExpect(heading.tagName.toLowerCase()).to.equal('h2');
    });
  });

  it('should apply grid layout', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${mockTopics}"></gc-topic-menu>
    `);
    const grid = el.shadowRoot!.querySelector('.topics-grid');
    chaiExpect(grid).to.exist;
  });

  it('should handle single topic', async () => {
    const el = await fixture<GCTopicMenu>(html`
      <gc-topic-menu .topics="${[mockTopics[0]]}"></gc-topic-menu>
    `);
    const cards = el.shadowRoot!.querySelectorAll('.topic-card');
    chaiExpect(cards.length).to.equal(1);
  });
});
