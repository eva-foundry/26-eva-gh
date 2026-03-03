let componentsLoaded = false;

async function loadComponents() {
  try {
    await import('../../packages/eva-sovereign-ui-wc/src/index.ts');
    componentsLoaded = true;
    console.log('EVA Sovereign UI components loaded successfully');
  } catch (error) {
    console.error('Failed to load EVA Sovereign UI components:', error);
    console.warn('Demo will run with limited functionality');
  }
}

function initProfileSelector() {
  if (!window.EVASovereignUI?.getAllProfiles) {
    console.warn('EVASovereignUI.getAllProfiles not available');
    return;
  }
  
  const { getAllProfiles } = window.EVASovereignUI;
  const profileSelector = document.getElementById('profile-selector');
  const body = document.body;
  
  profileSelector?.addEventListener('change', (e) => {
    const selectedProfile = e.target.value;
    
    const profiles = getAllProfiles();
    profiles.forEach(profile => {
      body.classList.remove(`eva-theme-${profile.id}`);
    });
    
    body.classList.add(`eva-theme-${selectedProfile}`);
    
    console.log(`Switched to profile: ${selectedProfile}`);
  });
}

function initLanguageSwitchers() {
  const headerContainer = document.getElementById('header-language-switcher');
  const toggleContainer = document.getElementById('language-toggle-container');
  
  if (headerContainer) {
    const headerSwitcher = document.createElement('eva-language-switcher');
    headerContainer.appendChild(headerSwitcher);
    
    headerSwitcher.addEventListener('language-changed', (e) => {
      console.log(`Language changed to: ${e.detail.locale}`);
      updateFooter();
    });
  }
  
  if (toggleContainer) {
    const toggleSwitcher = document.createElement('eva-language-switcher');
    toggleContainer.appendChild(toggleSwitcher);
  }
}

function updateFooter() {
  const copyrightEl = document.getElementById('footer-copyright');
  const privacyEl = document.getElementById('footer-privacy');
  const termsEl = document.getElementById('footer-terms');
  const accessibilityEl = document.getElementById('footer-accessibility');
  
  if (typeof window === 'undefined' || !window.EVASovereignUI?.i18n || typeof window.EVASovereignUI.i18n.t !== 'function') {
    console.warn('EVASovereignUI.i18n not available, using fallback text');
    if (copyrightEl) copyrightEl.textContent = '© Government of Canada';
    if (privacyEl) privacyEl.textContent = 'Privacy';
    if (termsEl) termsEl.textContent = 'Terms';
    if (accessibilityEl) accessibilityEl.textContent = 'Accessibility';
    return;
  }
  
  try {
    const i18nService = window.EVASovereignUI.i18n;
    
    if (copyrightEl) copyrightEl.textContent = i18nService.t('footer.copyright');
    if (privacyEl) privacyEl.textContent = i18nService.t('footer.privacy');
    if (termsEl) termsEl.textContent = i18nService.t('footer.terms');
    if (accessibilityEl) accessibilityEl.textContent = i18nService.t('footer.accessibility');
  } catch (error) {
    console.error('Error updating footer with i18n:', error);
    if (copyrightEl) copyrightEl.textContent = '© Government of Canada';
    if (privacyEl) privacyEl.textContent = 'Privacy';
    if (termsEl) termsEl.textContent = 'Terms';
    if (accessibilityEl) accessibilityEl.textContent = 'Accessibility';
  }
}

function initQuickActions() {
  const quickActions = document.querySelector('eva-quick-actions');
  
  quickActions?.addEventListener('action-click', (e) => {
    console.log(`Quick action clicked: ${e.detail.actionId}`);
    alert(`Quick action: ${e.detail.actionId}`);
  });
}

function initChatPanel() {
  const chatPanel = document.querySelector('eva-chat-panel');
  
  chatPanel?.addEventListener('message-sent', (e) => {
    console.log('Message sent:', e.detail.message);
  });
  
  chatPanel?.addEventListener('voice-input-requested', () => {
    console.log('Voice input requested');
    alert('Voice input feature would be activated here');
  });
}

async function init() {
  await loadComponents();
  
  if (typeof window === 'undefined' || !window.EVASovereignUI) {
    console.warn('EVASovereignUI not loaded. Web components may not be available.');
    updateFooter();
    return;
  }
  
  console.log('EVA Sovereign UI Demo initialized');
  console.log('Available components:', Object.keys(window.EVASovereignUI));
  
  try {
    await Promise.all([
      customElements.whenDefined('eva-gc-header'),
      customElements.whenDefined('eva-hero-banner'),
      customElements.whenDefined('eva-language-switcher'),
      customElements.whenDefined('eva-quick-actions'),
      customElements.whenDefined('eva-chat-panel'),
      customElements.whenDefined('eva-page-shell')
    ]);
  } catch (error) {
    console.warn('Some custom elements failed to load:', error);
  }
  
  initProfileSelector();
  initLanguageSwitchers();
  initQuickActions();
  initChatPanel();
  updateFooter();
  
  if (typeof window !== 'undefined') {
    window.addEventListener('eva-locale-changed', () => {
      updateFooter();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
