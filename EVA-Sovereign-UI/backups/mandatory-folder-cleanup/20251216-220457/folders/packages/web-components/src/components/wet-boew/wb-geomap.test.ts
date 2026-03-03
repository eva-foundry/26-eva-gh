import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, vi } from 'vitest';
import './wb-geomap.js';
import type { WBGeomap } from './wb-geomap.js';

describe('WBGeomap', () => {
  let geomap: WBGeomap;

  beforeEach(async () => {
    geomap = await fixture<WBGeomap>(html`
      <wb-geomap 
        .markers="${[
          { id: '1', lat: 45.4215, lng: -75.6972, label: 'Ottawa' },
          { id: '2', lat: 43.6532, lng: -79.3832, label: 'Toronto', description: 'Largest city' }
        ]}"
      ></wb-geomap>
    `);
  });

  it('renders', () => {
    expect(geomap).to.exist;
  });

  it('displays map container', () => {
    const container = geomap.shadowRoot!.querySelector('.map-container');
    expect(container).to.exist;
  });

  it('map container has role=application', () => {
    const container = geomap.shadowRoot!.querySelector('.map-container');
    expect(container?.getAttribute('role')).to.equal('application');
  });

  it('map container has aria-label', () => {
    const container = geomap.shadowRoot!.querySelector('.map-container');
    expect(container?.getAttribute('aria-label')).to.exist;
  });

  it('displays zoom controls', () => {
    const controls = geomap.shadowRoot!.querySelector('.map-controls');
    expect(controls).to.exist;
  });

  it('has zoom in button', () => {
    const buttons = geomap.shadowRoot!.querySelectorAll('.map-button');
    expect(buttons[0].textContent?.trim()).to.equal('+');
  });

  it('has zoom out button', () => {
    const buttons = geomap.shadowRoot!.querySelectorAll('.map-button');
    expect(buttons[1].textContent?.trim()).to.equal('−');
  });

  it('has location button', () => {
    const buttons = geomap.shadowRoot!.querySelectorAll('.map-button');
    expect(buttons[2].textContent?.trim()).to.equal('⊙');
  });

  it('displays markers', () => {
    const markers = geomap.shadowRoot!.querySelectorAll('.marker');
    expect(markers.length).to.equal(2);
  });

  it('markers have aria-label', () => {
    const marker = geomap.shadowRoot!.querySelector('.marker');
    expect(marker?.getAttribute('aria-label')).to.exist;
  });

  it('markers have tabindex', () => {
    const marker = geomap.shadowRoot!.querySelector('.marker');
    expect(marker?.getAttribute('tabindex')).to.equal('0');
  });

  it('marker click opens popup', async () => {
    const marker = geomap.shadowRoot!.querySelector('.marker') as HTMLButtonElement;
    marker.click();
    await geomap.updateComplete;
    const popup = geomap.shadowRoot!.querySelector('.popup');
    expect(popup).to.exist;
  });

  it('popup displays marker label', async () => {
    const marker = geomap.shadowRoot!.querySelector('.marker') as HTMLButtonElement;
    marker.click();
    await geomap.updateComplete;
    const popup = geomap.shadowRoot!.querySelector('.popup');
    expect(popup?.textContent).to.include('Ottawa');
  });

  it('popup has close button', async () => {
    const marker = geomap.shadowRoot!.querySelector('.marker') as HTMLButtonElement;
    marker.click();
    await geomap.updateComplete;
    const closeButton = geomap.shadowRoot!.querySelector('.popup-close');
    expect(closeButton).to.exist;
  });

  it('close button closes popup', async () => {
    const marker = geomap.shadowRoot!.querySelector('.marker') as HTMLButtonElement;
    marker.click();
    await geomap.updateComplete;
    const closeButton = geomap.shadowRoot!.querySelector('.popup-close') as HTMLElement;
    closeButton.click();
    await geomap.updateComplete;
    const popup = geomap.shadowRoot!.querySelector('.popup');
    expect(popup).to.be.null;
  });

  it('emits wb-geomap-marker-select event', async () => {
    let eventFired = false;
    geomap.addEventListener('wb-geomap-marker-select', () => { eventFired = true; });
    const marker = geomap.shadowRoot!.querySelector('.marker') as HTMLButtonElement;
    marker.click();
    await geomap.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('event includes marker data', async () => {
    let markerData: any = null;
    geomap.addEventListener('wb-geomap-marker-select', (e: Event) => {
      markerData = (e as CustomEvent).detail.marker;
    });
    const marker = geomap.shadowRoot!.querySelector('.marker') as HTMLButtonElement;
    marker.click();
    await geomap.updateComplete;
    expect(markerData.label).to.equal('Ottawa');
  });

  it('zoom in increases zoom level', async () => {
    const initialZoom = geomap.zoom;
    const zoomButton = geomap.shadowRoot!.querySelectorAll('.map-button')[0] as HTMLButtonElement;
    zoomButton.click();
    await geomap.updateComplete;
    expect(geomap.zoom).to.equal(initialZoom + 1);
  });

  it('zoom out decreases zoom level', async () => {
    const zoomButton = geomap.shadowRoot!.querySelectorAll('.map-button')[1] as HTMLButtonElement;
    zoomButton.click();
    await geomap.updateComplete;
    expect(geomap.zoom).to.be.lessThan(10);
  });

  it('emits wb-geomap-zoom event', async () => {
    let eventFired = false;
    geomap.addEventListener('wb-geomap-zoom', () => { eventFired = true; });
    const zoomButton = geomap.shadowRoot!.querySelectorAll('.map-button')[0] as HTMLButtonElement;
    zoomButton.click();
    await geomap.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('zoom event includes zoom level', async () => {
    let zoom = 0;
    geomap.addEventListener('wb-geomap-zoom', (e: Event) => {
      zoom = (e as CustomEvent).detail.zoom;
    });
    const zoomButton = geomap.shadowRoot!.querySelectorAll('.map-button')[0] as HTMLButtonElement;
    zoomButton.click();
    await geomap.updateComplete;
    expect(zoom).to.equal(11);
  });

  it('zoom has minimum value', async () => {
    geomap.zoom = 1;
    await geomap.updateComplete;
    const zoomButton = geomap.shadowRoot!.querySelectorAll('.map-button')[1] as HTMLButtonElement;
    zoomButton.click();
    await geomap.updateComplete;
    expect(geomap.zoom).to.equal(1);
  });

  it('zoom has maximum value', async () => {
    geomap.zoom = 18;
    await geomap.updateComplete;
    const zoomButton = geomap.shadowRoot!.querySelectorAll('.map-button')[0] as HTMLButtonElement;
    zoomButton.click();
    await geomap.updateComplete;
    expect(geomap.zoom).to.equal(18);
  });

  it('has default zoom level', () => {
    expect(geomap.zoom).to.equal(10);
  });

  it('has default center coordinates', () => {
    expect(geomap.centerLat).to.equal(45.4215);
    expect(geomap.centerLng).to.equal(-75.6972);
  });

  it('popup displays description if provided', async () => {
    const markers = geomap.shadowRoot!.querySelectorAll('.marker');
    (markers[1] as HTMLButtonElement).click();
    await geomap.updateComplete;
    const popup = geomap.shadowRoot!.querySelector('.popup');
    expect(popup?.textContent).to.include('Largest city');
  });

  it('handles missing description', async () => {
    const marker = geomap.shadowRoot!.querySelector('.marker') as HTMLButtonElement;
    marker.click();
    await geomap.updateComplete;
    expect(geomap).to.exist;
  });

  it('map controls have aria-labels', () => {
    const buttons = geomap.shadowRoot!.querySelectorAll('.map-button');
    expect(buttons[0].getAttribute('aria-label')).to.exist;
    expect(buttons[1].getAttribute('aria-label')).to.exist;
    expect(buttons[2].getAttribute('aria-label')).to.exist;
  });

  it('map controls have titles', () => {
    const buttons = geomap.shadowRoot!.querySelectorAll('.map-button');
    expect(buttons[0].getAttribute('title')).to.exist;
    expect(buttons[1].getAttribute('title')).to.exist;
    expect(buttons[2].getAttribute('title')).to.exist;
  });

  it('handles empty markers array', async () => {
    const noMarkers = await fixture<WBGeomap>(html`
      <wb-geomap .markers="${[]}"></wb-geomap>
    `);
    const markers = noMarkers.shadowRoot!.querySelectorAll('.marker');
    expect(markers.length).to.equal(0);
  });

  it('renders without errors when empty', async () => {
    const empty = await fixture<WBGeomap>(html`
      <wb-geomap></wb-geomap>
    `);
    expect(empty).to.exist;
  });
});
