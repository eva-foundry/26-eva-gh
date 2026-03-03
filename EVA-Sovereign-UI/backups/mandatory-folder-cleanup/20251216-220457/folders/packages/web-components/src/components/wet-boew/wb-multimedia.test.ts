import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach } from 'vitest';
import './wb-multimedia.js';
import type { WBMultimedia } from './wb-multimedia.js';

describe('WBMultimedia', () => {
  let multimedia: WBMultimedia;

  beforeEach(async () => {
    multimedia = await fixture<WBMultimedia>(html`
      <wb-multimedia src="/test.mp4" type="video"></wb-multimedia>
    `);
  });

  it('renders', () => {
    expect(multimedia).to.exist;
  });

  it('displays video element', () => {
    const video = multimedia.shadowRoot!.querySelector('video');
    expect(video).to.exist;
  });

  it('video has correct src', () => {
    const video = multimedia.shadowRoot!.querySelector('video');
    expect(video?.getAttribute('src')).to.equal('/test.mp4');
  });

  it('displays audio element for audio type', async () => {
    const audio = await fixture<WBMultimedia>(html`
      <wb-multimedia src="/test.mp3" type="audio"></wb-multimedia>
    `);
    const audioEl = audio.shadowRoot!.querySelector('audio');
    expect(audioEl).to.exist;
  });

  it('displays player controls', () => {
    const controls = multimedia.shadowRoot!.querySelector('.player-controls');
    expect(controls).to.exist;
  });

  it('controls have role=group', () => {
    const controls = multimedia.shadowRoot!.querySelector('.player-controls');
    expect(controls?.getAttribute('role')).to.equal('group');
  });

  it('has play/pause button', () => {
    const buttons = multimedia.shadowRoot!.querySelectorAll('.control-button');
    expect(buttons[0]).to.exist;
  });

  it('has mute button', () => {
    const buttons = multimedia.shadowRoot!.querySelectorAll('.control-button');
    expect(buttons[1]).to.exist;
  });

  it('has volume control', () => {
    const volume = multimedia.shadowRoot!.querySelector('.volume-control');
    expect(volume).to.exist;
  });

  it('volume control is range input', () => {
    const volume = multimedia.shadowRoot!.querySelector('.volume-control');
    expect(volume?.getAttribute('type')).to.equal('range');
  });

  it('has speed control', () => {
    const speed = multimedia.shadowRoot!.querySelector('.speed-control');
    expect(speed).to.exist;
  });

  it('speed control is range input', () => {
    const speed = multimedia.shadowRoot!.querySelector('.speed-control');
    expect(speed?.getAttribute('type')).to.equal('range');
  });

  it('displays fullscreen button for video', () => {
    const buttons = multimedia.shadowRoot!.querySelectorAll('.control-button');
    expect(buttons.length).to.be.greaterThan(2);
  });

  it('no fullscreen button for audio', async () => {
    const audio = await fixture<WBMultimedia>(html`
      <wb-multimedia src="/test.mp3" type="audio"></wb-multimedia>
    `);
    const fullscreenBtn = audio.shadowRoot!.querySelector('[aria-label*="Fullscreen"]');
    expect(fullscreenBtn).to.be.null;
  });

  it('displays transcript button when transcript provided', async () => {
    const withTranscript = await fixture<WBMultimedia>(html`
      <wb-multimedia src="/test.mp4" transcript="Test transcript text"></wb-multimedia>
    `);
    const transcriptBtn = withTranscript.shadowRoot!.querySelector('.control-button:last-child');
    expect(transcriptBtn?.textContent).to.include('Transcript');
  });

  it('hides transcript by default', async () => {
    const withTranscript = await fixture<WBMultimedia>(html`
      <wb-multimedia src="/test.mp4" transcript="Test transcript"></wb-multimedia>
    `);
    const transcript = withTranscript.shadowRoot!.querySelector('.transcript');
    expect(transcript).to.be.null;
  });

  it('transcript has role=region', async () => {
    const withTranscript = await fixture<WBMultimedia>(html`
      <wb-multimedia src="/test.mp4" transcript="Test transcript" show-transcript></wb-multimedia>
    `);
    const transcriptBtn = withTranscript.shadowRoot!.querySelectorAll('.control-button')[3] as HTMLButtonElement;
    transcriptBtn?.click();
    await withTranscript.updateComplete;
    const transcript = withTranscript.shadowRoot!.querySelector('.transcript');
    expect(transcript?.getAttribute('role')).to.equal('region');
  });

  it('volume has min/max/step', () => {
    const volume = multimedia.shadowRoot!.querySelector('.volume-control');
    expect(volume?.getAttribute('min')).to.equal('0');
    expect(volume?.getAttribute('max')).to.equal('1');
    expect(volume?.getAttribute('step')).to.equal('0.1');
  });

  it('speed has min/max/step', () => {
    const speed = multimedia.shadowRoot!.querySelector('.speed-control');
    expect(speed?.getAttribute('min')).to.equal('0.5');
    expect(speed?.getAttribute('max')).to.equal('2');
    expect(speed?.getAttribute('step')).to.equal('0.25');
  });

  it('default volume is 1', () => {
    expect(multimedia.volume).to.equal(1);
  });

  it('default speed is 1', () => {
    expect(multimedia.speed).to.equal(1);
  });

  it('default playing is false', () => {
    expect(multimedia.playing).to.equal(false);
  });

  it('displays captions track when provided', async () => {
    const withCaptions = await fixture<WBMultimedia>(html`
      <wb-multimedia src="/test.mp4" captions="/captions.vtt" type="video"></wb-multimedia>
    `);
    const track = withCaptions.shadowRoot!.querySelector('track');
    expect(track).to.exist;
  });

  it('caption track has correct attributes', async () => {
    const withCaptions = await fixture<WBMultimedia>(html`
      <wb-multimedia src="/test.mp4" captions="/captions.vtt" type="video"></wb-multimedia>
    `);
    const track = withCaptions.shadowRoot!.querySelector('track');
    expect(track?.getAttribute('kind')).to.equal('captions');
    expect(track?.getAttribute('src')).to.equal('/captions.vtt');
  });

  it('buttons have aria-labels', () => {
    const buttons = multimedia.shadowRoot!.querySelectorAll('.control-button');
    buttons.forEach(button => {
      expect(button.getAttribute('aria-label')).to.exist;
    });
  });

  it('volume control has aria-label', () => {
    const volume = multimedia.shadowRoot!.querySelector('.volume-control');
    expect(volume?.getAttribute('aria-label')).to.exist;
  });

  it('speed control has aria-label', () => {
    const speed = multimedia.shadowRoot!.querySelector('.speed-control');
    expect(speed?.getAttribute('aria-label')).to.exist;
  });

  it('video has controls attribute', () => {
    const video = multimedia.shadowRoot!.querySelector('video');
    expect(video?.hasAttribute('controls')).to.equal(true);
  });

  it('audio has controls attribute', async () => {
    const audio = await fixture<WBMultimedia>(html`
      <wb-multimedia src="/test.mp3" type="audio"></wb-multimedia>
    `);
    const audioEl = audio.shadowRoot!.querySelector('audio');
    expect(audioEl?.hasAttribute('controls')).to.equal(true);
  });

  it('renders without errors when empty', async () => {
    const empty = await fixture<WBMultimedia>(html`
      <wb-multimedia></wb-multimedia>
    `);
    expect(empty).to.exist;
  });
});
