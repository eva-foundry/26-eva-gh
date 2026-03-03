/**
 * Animation and Transition Tokens
 * Based on Spark's smooth transition system
 */

export const transitions = {
  // Duration
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
  slower: '500ms',
  
  // Easing functions
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  
  // Common transition properties
  all: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  colors: 'color 200ms cubic-bezier(0.4, 0, 0.2, 1), background-color 200ms cubic-bezier(0.4, 0, 0.2, 1), border-color 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  opacity: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  shadow: 'box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'transform 200ms cubic-bezier(0.4, 0, 0.2, 1)',
};

export const animations = {
  // Fade animations
  fadeIn: {
    name: 'fadeIn',
    keyframes: `
      from { opacity: 0; }
      to { opacity: 1; }
    `,
    duration: '200ms',
    easing: 'ease-out',
  },
  
  fadeOut: {
    name: 'fadeOut',
    keyframes: `
      from { opacity: 1; }
      to { opacity: 0; }
    `,
    duration: '200ms',
    easing: 'ease-in',
  },
  
  // Slide animations
  slideInFromTop: {
    name: 'slideInFromTop',
    keyframes: `
      from { transform: translateY(-100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    `,
    duration: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  slideInFromBottom: {
    name: 'slideInFromBottom',
    keyframes: `
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    `,
    duration: '300ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Scale animations
  scaleIn: {
    name: 'scaleIn',
    keyframes: `
      from { transform: scale(0.95); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    `,
    duration: '200ms',
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Spin animation (for loading indicators)
  spin: {
    name: 'spin',
    keyframes: `
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    `,
    duration: '1000ms',
    easing: 'linear',
  },
  
  // Pulse animation (for loading or attention)
  pulse: {
    name: 'pulse',
    keyframes: `
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    `,
    duration: '2000ms',
    easing: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
};

/**
 * Helper to generate @keyframes CSS from animation config
 */
export function generateKeyframes(animation: typeof animations[keyof typeof animations]): string {
  return `
    @keyframes ${animation.name} {
      ${animation.keyframes}
    }
  `;
}

/**
 * Helper to generate animation CSS property
 */
export function generateAnimation(animation: typeof animations[keyof typeof animations], options?: {
  duration?: string;
  easing?: string;
  delay?: string;
  iterationCount?: string | number;
  fillMode?: string;
}): string {
  const duration = options?.duration || animation.duration;
  const easing = options?.easing || animation.easing;
  const delay = options?.delay || '0ms';
  const iterationCount = options?.iterationCount || '1';
  const fillMode = options?.fillMode || 'both';
  
  return `${animation.name} ${duration} ${easing} ${delay} ${iterationCount} ${fillMode}`;
}

// Generate all keyframes CSS
export const allKeyframes = Object.values(animations)
  .map(generateKeyframes)
  .join('\n');

export type TransitionProperty = keyof typeof transitions;
export type AnimationName = keyof typeof animations;
