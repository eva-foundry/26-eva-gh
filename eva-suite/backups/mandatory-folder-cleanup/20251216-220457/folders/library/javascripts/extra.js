// EVA Agentic Book - Custom JavaScript
// P22-DPB (Documentation Publishing Bot) - Enhanced UX

document.addEventListener('DOMContentLoaded', function() {
  // Add keyboard shortcuts
  document.addEventListener('keydown', function(e) {
    // Ctrl+K or Cmd+K - Focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('.md-search__input');
      if (searchInput) {
        searchInput.focus();
      }
    }
  });

  // Add "Last Updated" timestamps if metadata exists
  const contentElement = document.querySelector('.md-content');
  if (contentElement) {
    const lastUpdated = document.querySelector('meta[name="last-updated"]');
    if (lastUpdated) {
      const timestamp = lastUpdated.getAttribute('content');
      const banner = document.createElement('div');
      banner.className = 'last-updated-banner';
      banner.innerHTML = `<small>📅 Last updated: ${timestamp}</small>`;
      banner.style.cssText = 'background: #f0f0f0; padding: 0.5rem 1rem; border-radius: 4px; margin-bottom: 1rem; text-align: right;';
      contentElement.prepend(banner);
    }
  }

  // Add copy buttons to code blocks (if not already present)
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(function(block) {
    if (!block.parentElement.querySelector('.copy-button')) {
      const button = document.createElement('button');
      button.className = 'copy-button';
      button.textContent = '📋 Copy';
      button.style.cssText = 'position: absolute; top: 0.5rem; right: 0.5rem; padding: 0.25rem 0.5rem; background: #e74c3c; color: white; border: none; border-radius: 3px; cursor: pointer; font-size: 0.8rem;';

      button.addEventListener('click', function() {
        navigator.clipboard.writeText(block.textContent);
        button.textContent = '✅ Copied!';
        setTimeout(function() {
          button.textContent = '📋 Copy';
        }, 2000);
      });

      block.parentElement.style.position = 'relative';
      block.parentElement.appendChild(button);
    }
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Track page views (placeholder for Application Insights)
  console.log('📊 Page view tracked:', window.location.pathname);
});
