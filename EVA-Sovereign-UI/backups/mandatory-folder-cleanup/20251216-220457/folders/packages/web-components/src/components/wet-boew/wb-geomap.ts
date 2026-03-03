import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  description?: string;
}

/**
 * WB-Geomap - Interactive Maps
 * Interactive maps with markers, overlays, geolocation (simplified version)
 */
@customElement('wb-geomap')
export class WBGeomap extends EVAElement {
  static override styles = css`
    :host {
      display: block;
      position: relative;
    }

    .map-container {
      width: 100%;
      height: 400px;
      background: #e5e3df;
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      position: relative;
      overflow: hidden;
    }

    .map-controls {
      position: absolute;
      top: 10px;
      right: 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      z-index: 10;
    }

    .map-button {
      width: 30px;
      height: 30px;
      background: white;
      border: 1px solid #ccc;
      cursor: pointer;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .map-button:hover {
      background: #f5f5f5;
    }

    .map-button:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
    }

    .marker {
      position: absolute;
      width: 24px;
      height: 24px;
      background: #c00;
      border: 2px solid white;
      border-radius: 50% 50% 50% 0;
      transform: translate(-50%, -100%) rotate(-45deg);
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }

    .marker:hover {
      transform: translate(-50%, -100%) rotate(-45deg) scale(1.1);
    }

    .marker:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
    }

    .popup {
      position: absolute;
      background: white;
      padding: var(--eva-spacing-sm, 0.5rem);
      border: 1px solid #ccc;
      border-radius: var(--eva-border-radius-sm, 3px);
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      z-index: 100;
      min-width: 150px;
    }

    .popup-close {
      float: right;
      cursor: pointer;
      font-weight: bold;
    }
  `;

  @property({ type: Array })
  markers: MapMarker[] = [];

  @property({ type: Number })
  zoom = 10;

  @property({ type: Number })
  centerLat = 45.4215;

  @property({ type: Number })
  centerLng = -75.6972;

  @state()
  private selectedMarker: MapMarker | null = null;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-geomap', {
      'en-CA': {
        zoomIn: 'Zoom in',
        zoomOut: 'Zoom out',
        myLocation: 'My location',
        markerSelected: 'Marker selected',
        closePopup: 'Close popup'
      },
      'fr-CA': {
        zoomIn: 'Zoom avant',
        zoomOut: 'Zoom arrière',
        myLocation: 'Ma position',
        markerSelected: 'Marqueur sélectionné',
        closePopup: 'Fermer la fenêtre'
      }
    });
  }

  private zoomIn(): void {
    this.zoom = Math.min(this.zoom + 1, 18);
    this.emitEvent('wb-geomap-zoom', { zoom: this.zoom });
  }

  private zoomOut(): void {
    this.zoom = Math.max(this.zoom - 1, 1);
    this.emitEvent('wb-geomap-zoom', { zoom: this.zoom });
  }

  private selectMarker(marker: MapMarker): void {
    this.selectedMarker = marker;
    this.emitEvent('wb-geomap-marker-select', { marker });
    this.announce(`${this.getMessage('wb-geomap', 'markerSelected')}: ${marker.label}`);
  }

  private closePopup(): void {
    this.selectedMarker = null;
  }

  private getMarkerPosition(marker: MapMarker): { left: string; top: string } {
    const scale = Math.pow(2, this.zoom);
    const offsetX = (marker.lng - this.centerLng) * scale * 10 + 200;
    const offsetY = (this.centerLat - marker.lat) * scale * 10 + 200;

    return {
      left: `${offsetX}px`,
      top: `${offsetY}px`
    };
  }

  private async findMyLocation(): Promise<void> {
    if (!navigator.geolocation) {
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      this.centerLat = position.coords.latitude;
      this.centerLng = position.coords.longitude;
      this.emitEvent('wb-geomap-location', { 
        lat: this.centerLat, 
        lng: this.centerLng 
      });
    } catch (err) {
      this.emitEvent('wb-geomap-error', { error: 'Geolocation failed' });
    }
  }

  override render() {
    return html`
      <div class="map-container" role="application" aria-label="Interactive map">
        <div class="map-controls">
          <button 
            class="map-button" 
            @click="${this.zoomIn}"
            aria-label="${this.getMessage('wb-geomap', 'zoomIn')}"
            title="${this.getMessage('wb-geomap', 'zoomIn')}"
          >
            +
          </button>
          <button 
            class="map-button" 
            @click="${this.zoomOut}"
            aria-label="${this.getMessage('wb-geomap', 'zoomOut')}"
            title="${this.getMessage('wb-geomap', 'zoomOut')}"
          >
            −
          </button>
          <button 
            class="map-button" 
            @click="${this.findMyLocation}"
            aria-label="${this.getMessage('wb-geomap', 'myLocation')}"
            title="${this.getMessage('wb-geomap', 'myLocation')}"
          >
            ⊙
          </button>
        </div>

        ${this.markers.map(marker => {
          const pos = this.getMarkerPosition(marker);
          return html`
            <button
              class="marker"
              style="left: ${pos.left}; top: ${pos.top}"
              @click="${() => this.selectMarker(marker)}"
              aria-label="${marker.label}"
              tabindex="0"
            ></button>
          `;
        })}

        ${this.selectedMarker ? html`
          <div class="popup" style="left: 50%; top: 50%; transform: translate(-50%, -50%)">
            <span class="popup-close" @click="${this.closePopup}" aria-label="${this.getMessage('wb-geomap', 'closePopup')}">×</span>
            <h3>${this.selectedMarker.label}</h3>
            ${this.selectedMarker.description ? html`<p>${this.selectedMarker.description}</p>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-geomap': WBGeomap;
  }
}
