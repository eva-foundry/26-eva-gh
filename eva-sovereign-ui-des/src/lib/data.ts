export interface CSSSnippet {
  id: string
  name: string
  category: string
  description: string
  tags: string[]
  code: string
}

export interface ColorPalette {
  id: string
  name: string
  category: string
  description: string
  colors: {
    name: string
    hex: string
    rgb: string
    oklch: string
  }[]
}

export interface StyleTemplate {
  id: string
  name: string
  category: string
  description: string
  tags: string[]
  html: string
  css: string
}

export interface GraphicElement {
  id: string
  name: string
  category: string
  description: string
  svg: string
  customizable: boolean
}

export const cssSnippets: CSSSnippet[] = [
  {
    id: 'flex-center',
    name: 'Flex Center',
    category: 'Flexbox',
    description: 'Center content horizontally and vertically',
    tags: ['flexbox', 'center', 'alignment'],
    code: `.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}`
  },
  {
    id: 'grid-responsive',
    name: 'Responsive Grid',
    category: 'Grid',
    description: 'Auto-fit responsive grid layout',
    tags: ['grid', 'responsive', 'layout'],
    code: `.grid-responsive {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}`
  },
  {
    id: 'fade-in',
    name: 'Fade In Animation',
    category: 'Animation',
    description: 'Smooth fade in effect',
    tags: ['animation', 'fade', 'transition'],
    code: `@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}`
  },
  {
    id: 'slide-up',
    name: 'Slide Up Animation',
    category: 'Animation',
    description: 'Element slides up while fading in',
    tags: ['animation', 'slide', 'transition'],
    code: `@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up {
  animation: slideUp 0.4s ease-out;
}`
  },
  {
    id: 'gradient-border',
    name: 'Gradient Border',
    category: 'Borders',
    description: 'Create a gradient border effect',
    tags: ['border', 'gradient', 'effect'],
    code: `.gradient-border {
  position: relative;
  background: linear-gradient(45deg, #667eea, #764ba2);
  padding: 2px;
  border-radius: 12px;
}

.gradient-border::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  right: 2px;
  bottom: 2px;
  background: white;
  border-radius: 10px;
}`
  },
  {
    id: 'truncate-text',
    name: 'Truncate Text',
    category: 'Typography',
    description: 'Single line text with ellipsis',
    tags: ['text', 'truncate', 'ellipsis'],
    code: `.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}`
  },
  {
    id: 'smooth-shadow',
    name: 'Smooth Shadow',
    category: 'Shadows',
    description: 'Layered smooth shadow effect',
    tags: ['shadow', 'elevation', 'depth'],
    code: `.smooth-shadow {
  box-shadow: 
    0 2.8px 2.2px rgba(0, 0, 0, 0.02),
    0 6.7px 5.3px rgba(0, 0, 0, 0.028),
    0 12.5px 10px rgba(0, 0, 0, 0.035),
    0 22.3px 17.9px rgba(0, 0, 0, 0.042),
    0 41.8px 33.4px rgba(0, 0, 0, 0.05),
    0 100px 80px rgba(0, 0, 0, 0.07);
}`
  }
]

export const colorPalettes: ColorPalette[] = [
  {
    id: 'gc-official',
    name: 'Government of Canada',
    category: 'Government',
    description: 'Official GC brand colors',
    colors: [
      { name: 'GC Red', hex: '#AF3C43', rgb: 'rgb(175, 60, 67)', oklch: 'oklch(0.50 0.12 15)' },
      { name: 'GC Blue', hex: '#26374A', rgb: 'rgb(38, 55, 74)', oklch: 'oklch(0.30 0.04 240)' },
      { name: 'GC Yellow', hex: '#F9C642', rgb: 'rgb(249, 198, 66)', oklch: 'oklch(0.85 0.15 90)' },
      { name: 'GC White', hex: '#FFFFFF', rgb: 'rgb(255, 255, 255)', oklch: 'oklch(1 0 0)' },
      { name: 'GC Black', hex: '#000000', rgb: 'rgb(0, 0, 0)', oklch: 'oklch(0 0 0)' }
    ]
  },
  {
    id: 'sunset-warmth',
    name: 'Sunset Warmth',
    category: 'Vibrant',
    description: 'Warm sunset-inspired palette',
    colors: [
      { name: 'Sunset Orange', hex: '#FF6B35', rgb: 'rgb(255, 107, 53)', oklch: 'oklch(0.68 0.20 35)' },
      { name: 'Coral Pink', hex: '#F7931E', rgb: 'rgb(247, 147, 30)', oklch: 'oklch(0.75 0.18 55)' },
      { name: 'Golden Yellow', hex: '#FDC830', rgb: 'rgb(253, 200, 48)', oklch: 'oklch(0.85 0.16 85)' },
      { name: 'Peach', hex: '#FFB88C', rgb: 'rgb(255, 184, 140)', oklch: 'oklch(0.82 0.12 50)' }
    ]
  },
  {
    id: 'forest-fresh',
    name: 'Forest Fresh',
    category: 'Nature',
    description: 'Earthy greens and browns',
    colors: [
      { name: 'Forest', hex: '#2D5016', rgb: 'rgb(45, 80, 22)', oklch: 'oklch(0.35 0.10 130)' },
      { name: 'Sage', hex: '#87A96B', rgb: 'rgb(135, 169, 107)', oklch: 'oklch(0.68 0.08 125)' },
      { name: 'Mint', hex: '#D1F2A5', rgb: 'rgb(209, 242, 165)', oklch: 'oklch(0.92 0.12 120)' },
      { name: 'Earth Brown', hex: '#8B7355', rgb: 'rgb(139, 115, 85)', oklch: 'oklch(0.55 0.06 60)' }
    ]
  },
  {
    id: 'lavender-dream',
    name: 'Lavender Dream',
    category: 'Pastel',
    description: 'Soft purple and lavender tones',
    colors: [
      { name: 'Deep Lavender', hex: '#9B59B6', rgb: 'rgb(155, 89, 182)', oklch: 'oklch(0.55 0.15 300)' },
      { name: 'Soft Lavender', hex: '#C39BD3', rgb: 'rgb(195, 155, 211)', oklch: 'oklch(0.72 0.10 300)' },
      { name: 'Lilac', hex: '#E8DAEF', rgb: 'rgb(232, 218, 239)', oklch: 'oklch(0.88 0.04 300)' },
      { name: 'Cream', hex: '#F4ECF7', rgb: 'rgb(244, 236, 247)', oklch: 'oklch(0.94 0.02 300)' }
    ]
  },
  {
    id: 'modern-gray',
    name: 'Modern Gray',
    category: 'Neutral',
    description: 'Sophisticated gray scale',
    colors: [
      { name: 'Charcoal', hex: '#2C3E50', rgb: 'rgb(44, 62, 80)', oklch: 'oklch(0.30 0.02 240)' },
      { name: 'Slate', hex: '#7F8C8D', rgb: 'rgb(127, 140, 141)', oklch: 'oklch(0.58 0.01 220)' },
      { name: 'Silver', hex: '#BDC3C7', rgb: 'rgb(189, 195, 199)', oklch: 'oklch(0.78 0.01 240)' },
      { name: 'Cloud', hex: '#ECF0F1', rgb: 'rgb(236, 240, 241)', oklch: 'oklch(0.94 0.005 240)' }
    ]
  }
]

export const styleTemplates: StyleTemplate[] = [
  {
    id: 'gc-btn-primary',
    name: 'GC Primary Button',
    category: 'GC Components',
    description: 'Canada.ca primary button styling',
    tags: ['button', 'primary', 'government'],
    html: '<button class="gc-btn-primary">Submit</button>',
    css: `.gc-btn-primary {
  background: oklch(0.50 0.12 15);
  color: oklch(1 0 0);
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.gc-btn-primary:hover {
  background: oklch(0.45 0.12 15);
}

.gc-btn-primary:focus-visible {
  outline: 3px solid oklch(0.85 0.15 90);
  outline-offset: 2px;
}`
  },
  {
    id: 'gc-btn-secondary',
    name: 'GC Secondary Button',
    category: 'GC Components',
    description: 'Canada.ca secondary button styling',
    tags: ['button', 'secondary', 'government'],
    html: '<button class="gc-btn-secondary">Cancel</button>',
    css: `.gc-btn-secondary {
  background: transparent;
  color: oklch(0.30 0.04 240);
  padding: 0.75rem 1.5rem;
  border: 2px solid oklch(0.30 0.04 240);
  border-radius: 0.25rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.gc-btn-secondary:hover {
  background: oklch(0.95 0.01 240);
}

.gc-btn-secondary:focus-visible {
  outline: 3px solid oklch(0.85 0.15 90);
  outline-offset: 2px;
}`
  },
  {
    id: 'gc-alert-success',
    name: 'GC Success Alert',
    category: 'GC Components',
    description: 'Canada.ca success alert styling',
    tags: ['alert', 'success', 'government'],
    html: '<div class="gc-alert-success"><strong>Success:</strong> Your form has been submitted.</div>',
    css: `.gc-alert-success {
  background: oklch(0.95 0.08 140);
  border-left: 4px solid oklch(0.55 0.15 140);
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.25rem;
}

.gc-alert-success strong {
  display: block;
  margin-bottom: 0.25rem;
}`
  },
  {
    id: 'gc-input',
    name: 'GC Input Field',
    category: 'GC Forms',
    description: 'Canada.ca input field styling',
    tags: ['input', 'form', 'government'],
    html: '<input type="text" class="gc-input" placeholder="Enter text">',
    css: `.gc-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid oklch(0.70 0.01 240);
  border-radius: 0.25rem;
  font-size: 1rem;
}

.gc-input:focus {
  border-color: oklch(0.30 0.04 240);
  outline: 3px solid oklch(0.85 0.15 90);
  outline-offset: 0;
}`
  },
  {
    id: 'glass-card',
    name: 'Glass Card',
    category: 'Modern',
    description: 'Modern glassmorphism card',
    tags: ['card', 'glass', 'modern'],
    html: '<div class="glass-card"><h3>Glass Card</h3><p>Beautiful glassmorphism effect</p></div>',
    css: `.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
}`
  }
]

export const graphicElements: GraphicElement[] = [
  {
    id: 'dotted-grid',
    name: 'Dotted Grid',
    category: 'Patterns',
    description: 'Simple dotted grid pattern',
    customizable: true,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
    <circle cx="2" cy="2" r="1" fill="currentColor" opacity="0.3"/>
  </pattern>
  <rect width="100" height="100" fill="url(#dots)"/>
</svg>`
  },
  {
    id: 'wave-pattern',
    name: 'Wave Pattern',
    category: 'Patterns',
    description: 'Smooth wave background',
    customizable: true,
    svg: `<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg">
  <path d="M0,50 C300,100 900,0 1200,50 L1200,120 L0,120 Z" fill="currentColor" opacity="0.8"/>
</svg>`
  },
  {
    id: 'geometric-blob',
    name: 'Organic Blob',
    category: 'Shapes',
    description: 'Organic blob shape',
    customizable: true,
    svg: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="M41.5,-67.5C53.9,-59.7,64.3,-47.8,70.8,-33.9C77.3,-20,79.9,-4.1,77.8,11.2C75.7,26.5,68.9,41.2,58.2,51.8C47.5,62.4,32.9,68.9,17.5,72.3C2.1,75.7,-14.1,76,-28.8,71.4C-43.5,66.8,-56.7,57.3,-65.8,44.7C-74.9,32.1,-79.9,16.1,-78.8,0.7C-77.7,-14.7,-70.5,-29.4,-60.8,-41.4C-51.1,-53.4,-39,-62.7,-25.6,-70.3C-12.2,-77.9,1.8,-83.8,15.8,-83C29.8,-82.2,29.1,-75.3,41.5,-67.5Z" fill="currentColor" opacity="0.6"/>
</svg>`
  }
]

export const categories = {
  css: ['Flexbox', 'Grid', 'Animation', 'Borders', 'Typography', 'Shadows'],
  colors: ['Government', 'Vibrant', 'Nature', 'Pastel', 'Neutral'],
  styles: ['GC Components', 'GC Forms', 'Modern'],
  graphics: ['Patterns', 'Shapes']
}
