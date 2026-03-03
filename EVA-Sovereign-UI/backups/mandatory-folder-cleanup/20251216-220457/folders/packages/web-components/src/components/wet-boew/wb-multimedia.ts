import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { EVAElement } from '../EVAElement.js';
import { registerMessages } from '../../i18n/locale-manager.js';

/**
 * WB-Multimedia - Accessible Video/Audio Player
 * Media player with captions, transcripts, controls
 */
@customElement('wb-multimedia')
export class WBMultimedia extends EVAElement {
  static override styles = css`
    :host {
      display: block;
    }

    .player-container {
      max-width: 100%;
    }

    video, audio {
      width: 100%;
      max-width: 100%;
    }

    .player-controls {
      display: flex;
      gap: var(--eva-spacing-sm, 0.5rem);
      padding: var(--eva-spacing-sm, 0.5rem);
      background: var(--eva-colors-background-default, #f5f5f5);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      align-items: center;
    }

    .control-button {
      padding: var(--eva-spacing-xs, 0.25rem) var(--eva-spacing-sm, 0.5rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      border-radius: var(--eva-border-radius-sm, 3px);
      background: white;
      cursor: pointer;
    }

    .control-button:hover {
      background: var(--eva-colors-background-hover, #e5e5e5);
    }

    .control-button:focus {
      outline: 2px solid var(--eva-colors-focus, #303fc1);
    }

    .volume-control, .speed-control {
      width: 80px;
    }

    .transcript {
      margin-top: var(--eva-spacing-md, 1rem);
      padding: var(--eva-spacing-md, 1rem);
      border: 1px solid var(--eva-colors-border-default, #cccccc);
      background: var(--eva-colors-background-default, #fafafa);
      max-height: 200px;
      overflow-y: auto;
    }

    .transcript.hidden {
      display: none;
    }
  `;

  @property({ type: String })
  src = '';

  @property({ type: String })
  type: 'video' | 'audio' = 'video';

  @property({ type: String })
  captions = '';

  @property({ type: String })
  transcript = '';

  @property({ type: Boolean, attribute: 'show-transcript' })
  showTranscript = false;

  @state()
  private playing = false;

  @state()
  private volume = 1;

  @state()
  private speed = 1;

  @state()
  private transcriptVisible = false;

  private mediaElement: HTMLVideoElement | HTMLAudioElement | null = null;

  override connectedCallback(): void {
    super.connectedCallback();

    registerMessages('wb-multimedia', {
      'en-CA': {
        play: 'Play',
        pause: 'Pause',
        mute: 'Mute',
        unmute: 'Unmute',
        fullscreen: 'Fullscreen',
        speed: 'Speed',
        volume: 'Volume',
        transcript: 'Transcript',
        showTranscript: 'Show transcript',
        hideTranscript: 'Hide transcript',
        playing: 'Playing',
        paused: 'Paused'
      },
      'fr-CA': {
        play: 'Lecture',
        pause: 'Pause',
        mute: 'Muet',
        unmute: 'Activer le son',
        fullscreen: 'Plein écran',
        speed: 'Vitesse',
        volume: 'Volume',
        transcript: 'Transcription',
        showTranscript: 'Afficher la transcription',
        hideTranscript: 'Masquer la transcription',
        playing: 'Lecture en cours',
        paused: 'En pause'
      }
    });
  }

  override firstUpdated(): void {
    this.mediaElement = this.shadowRoot?.querySelector('video, audio') as HTMLVideoElement | HTMLAudioElement;
  }

  private togglePlay(): void {
    if (!this.mediaElement) return;

    if (this.playing) {
      this.mediaElement.pause();
      this.playing = false;
      this.announce(this.getMessage('wb-multimedia', 'paused'));
    } else {
      this.mediaElement.play();
      this.playing = true;
      this.announce(this.getMessage('wb-multimedia', 'playing'));
    }

    this.emitEvent('wb-multimedia-play', { playing: this.playing });
  }

  private toggleMute(): void {
    if (!this.mediaElement) return;

    this.mediaElement.muted = !this.mediaElement.muted;
    this.emitEvent('wb-multimedia-mute', { muted: this.mediaElement.muted });
  }

  private changeVolume(event: Event): void {
    if (!this.mediaElement) return;

    const input = event.target as HTMLInputElement;
    this.volume = parseFloat(input.value);
    this.mediaElement.volume = this.volume;
    this.emitEvent('wb-multimedia-volume', { volume: this.volume });
  }

  private changeSpeed(event: Event): void {
    if (!this.mediaElement) return;

    const input = event.target as HTMLInputElement;
    this.speed = parseFloat(input.value);
    this.mediaElement.playbackRate = this.speed;
    this.emitEvent('wb-multimedia-speed', { speed: this.speed });
  }

  private toggleFullscreen(): void {
    if (!this.mediaElement) return;

    if (this.mediaElement.requestFullscreen) {
      this.mediaElement.requestFullscreen();
      this.emitEvent('wb-multimedia-fullscreen', { fullscreen: true });
    }
  }

  private toggleTranscript(): void {
    this.transcriptVisible = !this.transcriptVisible;
  }

  override render() {
    return html`
      <div class="player-container">
        ${this.type === 'video' ? html`
          <video src="${this.src}" controls>
            ${this.captions ? html`
              <track kind="captions" src="${this.captions}" srclang="en" label="English" />
            ` : ''}
          </video>
        ` : html`
          <audio src="${this.src}" controls></audio>
        `}

        <div class="player-controls" role="group" aria-label="${this.getMessage('wb-multimedia', 'volume')}">
          <button 
            class="control-button" 
            @click="${this.togglePlay}"
            aria-label="${this.playing ? this.getMessage('wb-multimedia', 'pause') : this.getMessage('wb-multimedia', 'play')}"
          >
            ${this.playing ? '⏸' : '▶'}
          </button>

          <button 
            class="control-button" 
            @click="${this.toggleMute}"
            aria-label="${this.getMessage('wb-multimedia', 'mute')}"
          >
            🔇
          </button>

          <label>
            ${this.getMessage('wb-multimedia', 'volume')}:
            <input 
              type="range" 
              class="volume-control"
              min="0" 
              max="1" 
              step="0.1" 
              .value="${this.volume}"
              @input="${this.changeVolume}"
              aria-label="${this.getMessage('wb-multimedia', 'volume')}"
            />
          </label>

          <label>
            ${this.getMessage('wb-multimedia', 'speed')}:
            <input 
              type="range" 
              class="speed-control"
              min="0.5" 
              max="2" 
              step="0.25" 
              .value="${this.speed}"
              @input="${this.changeSpeed}"
              aria-label="${this.getMessage('wb-multimedia', 'speed')}"
            />
            ${this.speed}x
          </label>

          ${this.type === 'video' ? html`
            <button 
              class="control-button" 
              @click="${this.toggleFullscreen}"
              aria-label="${this.getMessage('wb-multimedia', 'fullscreen')}"
            >
              ⛶
            </button>
          ` : ''}

          ${this.transcript ? html`
            <button 
              class="control-button" 
              @click="${this.toggleTranscript}"
              aria-label="${this.transcriptVisible ? this.getMessage('wb-multimedia', 'hideTranscript') : this.getMessage('wb-multimedia', 'showTranscript')}"
            >
              ${this.getMessage('wb-multimedia', 'transcript')}
            </button>
          ` : ''}
        </div>

        ${this.transcript && this.transcriptVisible ? html`
          <div class="transcript" role="region" aria-label="${this.getMessage('wb-multimedia', 'transcript')}">
            ${this.transcript}
          </div>
        ` : ''}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wb-multimedia': WBMultimedia;
  }
}
