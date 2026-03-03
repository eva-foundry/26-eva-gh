/**
 * Parse HTML/Web Component example to extract props and content
 * @param {string} html - HTML string from metadata.examples.webcomponent
 * @returns {Object} { props: {}, slotContent: '' }
 */
export function parseComponentExample(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const element = doc.querySelector('*');
  
  if (!element) {
    return { props: {}, slotContent: '' };
  }
  
  // Extract attributes as props
  const props = {};
  for (const attr of element.attributes) {
    // Convert kebab-case to camelCase
    const propName = attr.name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    
    // Handle boolean attributes
    if (attr.value === '') {
      props[propName] = true;
    } else {
      props[propName] = attr.value;
    }
  }
  
  // Extract slot content
  const slotContent = element.innerHTML.trim();
  
  return { props, slotContent };
}

/**
 * Apply parsed example to a component element
 * @param {HTMLElement} element - Component element
 * @param {Object} parsed - Result from parseComponentExample
 */
export function applyParsedExample(element, parsed) {
  // Apply props as attributes
  Object.entries(parsed.props).forEach(([propName, value]) => {
    // Convert camelCase to kebab-case for attributes
    const attrName = propName.replace(/([A-Z])/g, '-$1').toLowerCase();
    
    if (typeof value === 'boolean') {
      if (value) {
        element.setAttribute(attrName, '');
      }
    } else {
      element.setAttribute(attrName, value);
    }
  });
  
  // Apply slot content
  if (parsed.slotContent) {
    element.innerHTML = parsed.slotContent;
  }
}
