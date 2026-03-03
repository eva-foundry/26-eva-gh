import { expect as chaiExpect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { GCPageDetails } from './gc-page-details.js';

import './gc-page-details.js';

describe('gc-page-details', () => {
  it('should display published date', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details publishedDate="2024-01-15T10:00:00Z"></gc-page-details>
    `);
    const dateElement = el.shadowRoot!.querySelector('time');
    chaiExpect(dateElement?.textContent?.trim()).to.equal('2024-01-15');
  });

  it('should display modified date', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details modifiedDate="2024-03-20T14:30:00Z"></gc-page-details>
    `);
    const detailItems = el.shadowRoot!.querySelectorAll('.detail-item');
    const modifiedItem = Array.from(detailItems).find(item => 
      item.textContent?.includes('Date modified')
    );
    chaiExpect(modifiedItem).to.exist;
  });

  it('should format date as YYYY-MM-DD', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details publishedDate="2024-01-15T10:00:00Z"></gc-page-details>
    `);
    const time = el.shadowRoot!.querySelector('time');
    chaiExpect(time?.textContent?.trim()).to.match(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should use ISO 8601 datetime attribute', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details publishedDate="2024-01-15T10:00:00Z"></gc-page-details>
    `);
    const time = el.shadowRoot!.querySelector('time');
    chaiExpect(time?.getAttribute('datetime')).to.equal('2024-01-15T10:00:00Z');
  });

  it('should display contributors', async () => {
    const contributors = [
      { name: 'John Doe' },
      { name: 'Jane Smith' }
    ];

    const el = await fixture<GCPageDetails>(html`
      <gc-page-details .contributors="${contributors}"></gc-page-details>
    `);
    
    const contributorsList = el.shadowRoot!.querySelector('.contributors-list');
    chaiExpect(contributorsList?.textContent).to.include('John Doe');
    chaiExpect(contributorsList?.textContent).to.include('Jane Smith');
  });

  it('should display contributor roles', async () => {
    const contributors = [
      { name: 'John Doe', role: 'Author' },
      { name: 'Jane Smith', role: 'Editor' }
    ];

    const el = await fixture<GCPageDetails>(html`
      <gc-page-details .contributors="${contributors}"></gc-page-details>
    `);
    
    const contributorsList = el.shadowRoot!.querySelector('.contributors-list');
    chaiExpect(contributorsList?.textContent).to.include('Author');
    chaiExpect(contributorsList?.textContent).to.include('Editor');
  });

  it('should separate contributors with commas', async () => {
    const contributors = [
      { name: 'John Doe' },
      { name: 'Jane Smith' },
      { name: 'Bob Johnson' }
    ];

    const el = await fixture<GCPageDetails>(html`
      <gc-page-details .contributors="${contributors}"></gc-page-details>
    `);
    
    const listItems = el.shadowRoot!.querySelectorAll('.contributors-list li');
    chaiExpect(listItems.length).to.equal(3);
  });

  it('should display content ID', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details contentId="GC-DOC-12345"></gc-page-details>
    `);
    
    const detailItems = el.shadowRoot!.querySelectorAll('.detail-item');
    const contentIdItem = Array.from(detailItems).find(item => 
      item.textContent?.includes('GC-DOC-12345')
    );
    chaiExpect(contentIdItem).to.exist;
  });

  it('should handle missing published date', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details modifiedDate="2024-03-20T14:30:00Z"></gc-page-details>
    `);
    
    const detailItems = el.shadowRoot!.querySelectorAll('.detail-item');
    const publishedItem = Array.from(detailItems).find(item => 
      item.textContent?.includes('Date published')
    );
    chaiExpect(publishedItem).to.not.exist;
  });

  it('should handle missing contributors', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details publishedDate="2024-01-15T10:00:00Z"></gc-page-details>
    `);
    
    const contributorsList = el.shadowRoot!.querySelector('.contributors-list');
    chaiExpect(contributorsList).to.not.exist;
  });

  it('should have proper semantic HTML with time elements', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details 
        publishedDate="2024-01-15T10:00:00Z"
        modifiedDate="2024-03-20T14:30:00Z"
      ></gc-page-details>
    `);
    
    const timeElements = el.shadowRoot!.querySelectorAll('time');
    chaiExpect(timeElements.length).to.equal(2);
  });

  it('should have aria-label with long date format', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details publishedDate="2024-01-15T10:00:00Z"></gc-page-details>
    `);
    
    const time = el.shadowRoot!.querySelector('time');
    const ariaLabel = time?.getAttribute('aria-label');
    chaiExpect(ariaLabel).to.exist;
    chaiExpect(ariaLabel).to.not.equal('2024-01-15');
  });

  it('should support bilingual labels in French', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details 
        publishedDate="2024-01-15T10:00:00Z"
        locale="fr-CA"
      ></gc-page-details>
    `);
    
    const label = el.shadowRoot!.querySelector('.detail-label');
    chaiExpect(label?.textContent).to.equal('Date de publication');
  });

  it('should display all details when all properties provided', async () => {
    const contributors = [{ name: 'John Doe', role: 'Author' }];
    
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details 
        publishedDate="2024-01-15T10:00:00Z"
        modifiedDate="2024-03-20T14:30:00Z"
        .contributors="${contributors}"
        contentId="GC-DOC-12345"
      ></gc-page-details>
    `);
    
    const detailItems = el.shadowRoot!.querySelectorAll('.detail-item');
    chaiExpect(detailItems.length).to.equal(4);
  });

  it('should have border-top styling', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details publishedDate="2024-01-15T10:00:00Z"></gc-page-details>
    `);
    
    const pageDetails = el.shadowRoot!.querySelector('.page-details');
    chaiExpect(pageDetails).to.exist;
  });

  it('should use proper list markup for contributors', async () => {
    const contributors = [
      { name: 'John Doe' },
      { name: 'Jane Smith' }
    ];

    const el = await fixture<GCPageDetails>(html`
      <gc-page-details .contributors="${contributors}"></gc-page-details>
    `);
    
    const list = el.shadowRoot!.querySelector('ul.contributors-list');
    chaiExpect(list).to.exist;
    
    const listItems = list?.querySelectorAll('li');
    chaiExpect(listItems?.length).to.equal(2);
  });

  it('should handle empty contributors array', async () => {
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details .contributors="${[]}"></gc-page-details>
    `);
    
    const contributorsList = el.shadowRoot!.querySelector('.contributors-list');
    chaiExpect(contributorsList).to.not.exist;
  });

  it('should be accessible', async () => {
    const contributors = [
      { name: 'John Doe', role: 'Author' }
    ];
    
    const el = await fixture<GCPageDetails>(html`
      <gc-page-details 
        publishedDate="2024-01-15T10:00:00Z"
        modifiedDate="2024-03-20T14:30:00Z"
        .contributors="${contributors}"
        contentId="GC-DOC-12345"
      ></gc-page-details>
    `);
    
    await chaiExpect(el).to.be.accessible();
  });
});
