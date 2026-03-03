/**
 * EVA Avatar Component
 * User avatar with image and fallback with Spark styling
 * Features: image loading, fallback initials, rounded design
 */

import { EVABaseComponent } from '../../utils/base-component';
import { 
  modernColors,
} from '../../tokens';

export class EVAAvatar extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        position: relative;
        display: flex;
        width: 2rem;
        height: 2rem;
        flex-shrink: 0;
        overflow: hidden;
        border-radius: 9999px;
      }

      .avatar {
        position: relative;
        display: flex;
        width: 100%;
        height: 100%;
      }
    `));

    const avatar = document.createElement('div');
    avatar.className = 'avatar';
    
    const slot = document.createElement('slot');
    avatar.appendChild(slot);

    this.shadow.appendChild(avatar);
  }
}

export class EVAAvatarImage extends EVABaseComponent {
  static get observedAttributes() {
    return ['src', 'alt'];
  }

  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        aspect-ratio: 1;
        width: 100%;
        height: 100%;
      }

      .image {
        aspect-ratio: 1;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `));

    const img = document.createElement('img');
    img.className = 'image';
    img.src = this.getAttr('src', '');
    img.alt = this.getAttr('alt', '');
    
    img.addEventListener('error', () => {
      this.style.display = 'none';
    });

    this.shadow.appendChild(img);
  }
}

export class EVAAvatarFallback extends EVABaseComponent {
  protected render(): void {
    this.shadow.innerHTML = '';
    
    this.shadow.appendChild(this.createStyles(`
      :host {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        border-radius: 9999px;
        background: ${modernColors.muted};
        color: ${modernColors.mutedForeground};
        font-size: 0.875rem;
        font-weight: 500;
      }
    `));

    const slot = document.createElement('slot');
    this.shadow.appendChild(slot);
  }
}

customElements.define('eva-avatar', EVAAvatar);
customElements.define('eva-avatar-image', EVAAvatarImage);
customElements.define('eva-avatar-fallback', EVAAvatarFallback);
