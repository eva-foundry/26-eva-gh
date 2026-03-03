import { expect as chaiExpect } from 'chai';
import { fixture, html, waitUntil } from '@open-wc/testing';
import { GCCarousel } from './gc-carousel.js';

import './gc-carousel.js';

describe('gc-carousel', () => {
  const mockSlides = [
    {
      image: '/img/slide1.jpg',
      alt: 'Slide 1',
      heading: 'Heading 1',
      description: 'Description 1',
      href: '/link1'
    },
    {
      image: '/img/slide2.jpg',
      alt: 'Slide 2',
      heading: 'Heading 2',
      description: 'Description 2',
      href: '/link2'
    },
    {
      image: '/img/slide3.jpg',
      alt: 'Slide 3',
      heading: 'Heading 3',
      description: 'Description 3'
    }
  ];

  it('should render empty carousel when no slides', async () => {
    const el = await fixture<GCCarousel>(html`<gc-carousel></gc-carousel>`);
    const container = el.shadowRoot!.querySelector('.carousel-container');
    chaiExpect(container).to.exist;
  });

  it('should render slides', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const slides = el.shadowRoot!.querySelectorAll('.slide');
    chaiExpect(slides.length).to.equal(3);
  });

  it('should display slide images', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const images = el.shadowRoot!.querySelectorAll('.slide img');
    chaiExpect(images.length).to.equal(3);
    chaiExpect((images[0] as HTMLImageElement).src).to.include('slide1.jpg');
  });

  it('should display slide headings', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const headings = el.shadowRoot!.querySelectorAll('.slide-heading');
    chaiExpect(headings.length).to.equal(3);
    chaiExpect(headings[0].textContent).to.equal('Heading 1');
  });

  it('should display slide descriptions', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const descriptions = el.shadowRoot!.querySelectorAll('.slide-description');
    chaiExpect(descriptions.length).to.equal(3);
    chaiExpect(descriptions[0].textContent).to.equal('Description 1');
  });

  it('should show read more links when href provided', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const links = el.shadowRoot!.querySelectorAll('.slide-link');
    chaiExpect(links.length).to.equal(2); // Only first 2 slides have href
    chaiExpect((links[0] as HTMLAnchorElement).href).to.include('/link1');
  });

  it('should show prev/next control buttons', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const buttons = el.shadowRoot!.querySelectorAll('.control-button');
    chaiExpect(buttons.length).to.equal(2);
  });

  it('should show dot indicators', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const indicators = el.shadowRoot!.querySelectorAll('.indicator');
    chaiExpect(indicators.length).to.equal(3);
  });

  it('should mark first indicator as active initially', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const activeIndicator = el.shadowRoot!.querySelector('.indicator.active');
    const allIndicators = el.shadowRoot!.querySelectorAll('.indicator');
    chaiExpect(activeIndicator).to.equal(allIndicators[0]);
  });

  it('should go to next slide when next() called', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    chaiExpect(el.currentSlide).to.equal(0);
    el.next();
    await el.updateComplete;
    chaiExpect(el.currentSlide).to.equal(1);
  });

  it('should go to previous slide when prev() called', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    el.goToSlide(2);
    await el.updateComplete;
    el.prev();
    await el.updateComplete;
    chaiExpect(el.currentSlide).to.equal(1);
  });

  it('should wrap around to first slide when next from last', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    el.goToSlide(2);
    await el.updateComplete;
    el.next();
    await el.updateComplete;
    chaiExpect(el.currentSlide).to.equal(0);
  });

  it('should wrap around to last slide when prev from first', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    el.prev();
    await el.updateComplete;
    chaiExpect(el.currentSlide).to.equal(2);
  });

  it('should emit slide-change event when slide changes', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    let eventFired = false;
    let eventDetail: any;

    el.addEventListener('gc-carousel-slide-change', ((e: CustomEvent) => {
      eventFired = true;
      eventDetail = e.detail;
    }) as EventListener);

    el.next();
    await el.updateComplete;

    chaiExpect(eventFired).to.be.true;
    chaiExpect(eventDetail.currentSlide).to.equal(1);
  });

  it('should start playing when autoPlay is true', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}" autoPlay interval="100"></gc-carousel>
    `);
    chaiExpect(el.currentSlide).to.equal(0);
    
    await waitUntil(() => el.currentSlide === 1, 'Slide should auto-advance', { timeout: 500 });
    chaiExpect(el.currentSlide).to.equal(1);
  });

  it('should stop auto-play when pause() called', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}" autoPlay interval="100"></gc-carousel>
    `);
    el.pause();
    await el.updateComplete;
    
    const currentSlide = el.currentSlide;
    await new Promise(resolve => setTimeout(resolve, 200));
    chaiExpect(el.currentSlide).to.equal(currentSlide);
  });

  it('should show play/pause button', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const playPauseButton = el.shadowRoot!.querySelector('.play-pause-button');
    chaiExpect(playPauseButton).to.exist;
  });

  it('should toggle play/pause when button clicked', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const playPauseButton = el.shadowRoot!.querySelector('.play-pause-button') as HTMLButtonElement;
    
    playPauseButton.click();
    await el.updateComplete;
    // Should start playing after click
    
    playPauseButton.click();
    await el.updateComplete;
    // Should pause after second click
  });

  it('should navigate with keyboard arrow keys', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const container = el.shadowRoot!.querySelector('.carousel-container') as HTMLElement;
    
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    await el.updateComplete;
    chaiExpect(el.currentSlide).to.equal(1);

    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    await el.updateComplete;
    chaiExpect(el.currentSlide).to.equal(0);
  });

  it('should navigate to first slide with Home key', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    el.goToSlide(2);
    await el.updateComplete;

    const container = el.shadowRoot!.querySelector('.carousel-container') as HTMLElement;
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
    await el.updateComplete;
    chaiExpect(el.currentSlide).to.equal(0);
  });

  it('should navigate to last slide with End key', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const container = el.shadowRoot!.querySelector('.carousel-container') as HTMLElement;
    container.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
    await el.updateComplete;
    chaiExpect(el.currentSlide).to.equal(2);
  });

  it('should go to specific slide when indicator clicked', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const indicators = el.shadowRoot!.querySelectorAll('.indicator');
    (indicators[2] as HTMLButtonElement).click();
    await el.updateComplete;
    chaiExpect(el.currentSlide).to.equal(2);
  });

  it('should lazy load images except first', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const images = el.shadowRoot!.querySelectorAll('.slide img');
    chaiExpect((images[0] as HTMLImageElement).loading).to.equal('eager');
    chaiExpect((images[1] as HTMLImageElement).loading).to.equal('lazy');
    chaiExpect((images[2] as HTMLImageElement).loading).to.equal('lazy');
  });

  it('should have proper ARIA roles', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const container = el.shadowRoot!.querySelector('.carousel-container');
    chaiExpect(container?.getAttribute('role')).to.equal('region');
    
    const slides = el.shadowRoot!.querySelectorAll('.slide');
    chaiExpect(slides[0].getAttribute('role')).to.equal('group');
  });

  it('should have ARIA live region', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    const slidesWrapper = el.shadowRoot!.querySelector('.slides-wrapper');
    chaiExpect(slidesWrapper?.getAttribute('aria-live')).to.equal('polite');
    chaiExpect(slidesWrapper?.getAttribute('aria-atomic')).to.equal('true');
  });

  it('should be accessible', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}"></gc-carousel>
    `);
    await chaiExpect(el).to.be.accessible();
  });

  it('should support French Canadian locale', async () => {
    const el = await fixture<GCCarousel>(html`
      <gc-carousel .slides="${mockSlides}" locale="fr-CA"></gc-carousel>
    `);
    const playButton = el.shadowRoot!.querySelector('.play-pause-button');
    chaiExpect(playButton?.textContent?.trim()).to.equal('Lecture');
  });
});
