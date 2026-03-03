import { expect, fixture, html } from '@open-wc/testing';
import { describe, it, beforeEach, afterEach } from 'vitest';
import './wb-collapsible-alerts.js';
import type { WBCollapsibleAlerts } from './wb-collapsible-alerts.js';

describe('WBCollapsibleAlerts', () => {
  let alert: WBCollapsibleAlerts;

  beforeEach(async () => {
    localStorage.clear();
    alert = await fixture<WBCollapsibleAlerts>(html`
      <wb-collapsible-alerts type="info" dismissible collapsible>
        This is an alert message
      </wb-collapsible-alerts>
    `);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders', () => {
    expect(alert).to.exist;
  });

  it('displays alert content', () => {
    const content = alert.shadowRoot!.querySelector('.alert-content');
    expect(content).to.exist;
  });

  it('applies info type by default', async () => {
    const defaultAlert = await fixture<WBCollapsibleAlerts>(html`<wb-collapsible-alerts>Info</wb-collapsible-alerts>`);
    const alertDiv = defaultAlert.shadowRoot!.querySelector('.alert.info');
    expect(alertDiv).to.exist;
  });

  it('applies success type', async () => {
    const successAlert = await fixture<WBCollapsibleAlerts>(html`<wb-collapsible-alerts type="success">Success</wb-collapsible-alerts>`);
    const alertDiv = successAlert.shadowRoot!.querySelector('.alert.success');
    expect(alertDiv).to.exist;
  });

  it('applies warning type', async () => {
    const warningAlert = await fixture<WBCollapsibleAlerts>(html`<wb-collapsible-alerts type="warning">Warning</wb-collapsible-alerts>`);
    const alertDiv = warningAlert.shadowRoot!.querySelector('.alert.warning');
    expect(alertDiv).to.exist;
  });

  it('applies danger type', async () => {
    const dangerAlert = await fixture<WBCollapsibleAlerts>(html`<wb-collapsible-alerts type="danger">Danger</wb-collapsible-alerts>`);
    const alertDiv = dangerAlert.shadowRoot!.querySelector('.alert.danger');
    expect(alertDiv).to.exist;
  });

  it('shows dismiss button when dismissible', () => {
    const dismissBtn = alert.shadowRoot!.querySelector('.alert-btn:not(.collapse-btn)');
    expect(dismissBtn).to.exist;
  });

  it('hides dismiss button when not dismissible', async () => {
    const noDismiss = await fixture<WBCollapsibleAlerts>(html`<wb-collapsible-alerts>Alert</wb-collapsible-alerts>`);
    const dismissBtn = noDismiss.shadowRoot!.querySelector('.alert-btn:not(.collapse-btn)');
    expect(dismissBtn).to.be.null;
  });

  it('shows collapse button when collapsible', () => {
    const collapseBtn = alert.shadowRoot!.querySelector('.collapse-btn');
    expect(collapseBtn).to.exist;
  });

  it('hides collapse button when not collapsible', async () => {
    const noCollapse = await fixture<WBCollapsibleAlerts>(html`<wb-collapsible-alerts dismissible>Alert</wb-collapsible-alerts>`);
    const collapseBtn = noCollapse.shadowRoot!.querySelector('.collapse-btn');
    expect(collapseBtn).to.be.null;
  });

  it('dismisses alert with dismiss()', async () => {
    alert.dismiss();
    await alert.updateComplete;
    const alertDiv = alert.shadowRoot!.querySelector('.alert');
    expect(alertDiv).to.be.null;
  });

  it('dismisses alert on button click', async () => {
    const dismissBtn = alert.shadowRoot!.querySelector('.alert-btn:not(.collapse-btn)') as HTMLButtonElement;
    dismissBtn.click();
    await alert.updateComplete;
    const alertDiv = alert.shadowRoot!.querySelector('.alert');
    expect(alertDiv).to.be.null;
  });

  it('collapses alert with collapse()', async () => {
    alert.collapse();
    await alert.updateComplete;
    const alertDiv = alert.shadowRoot!.querySelector('.alert');
    expect(alertDiv?.classList.contains('collapsed')).to.equal(true);
  });

  it('expands alert with collapse() when collapsed', async () => {
    alert.collapse();
    await alert.updateComplete;
    alert.collapse();
    await alert.updateComplete;
    const alertDiv = alert.shadowRoot!.querySelector('.alert');
    expect(alertDiv?.classList.contains('collapsed')).to.equal(false);
  });

  it('collapses alert on button click', async () => {
    const collapseBtn = alert.shadowRoot!.querySelector('.collapse-btn') as HTMLButtonElement;
    collapseBtn.click();
    await alert.updateComplete;
    const alertDiv = alert.shadowRoot!.querySelector('.alert');
    expect(alertDiv?.classList.contains('collapsed')).to.equal(true);
  });

  it('resets alert with reset()', async () => {
    alert.dismiss();
    await alert.updateComplete;
    alert.reset();
    await alert.updateComplete;
    const alertDiv = alert.shadowRoot!.querySelector('.alert');
    expect(alertDiv).to.exist;
  });

  it('persists dismissed state to localStorage', async () => {
    const storageAlert = await fixture<WBCollapsibleAlerts>(html`
      <wb-collapsible-alerts dismissible storage-key="test-alert">Alert</wb-collapsible-alerts>
    `);
    storageAlert.dismiss();
    await storageAlert.updateComplete;
    expect(localStorage.getItem('test-alert')).to.equal('dismissed');
  });

  it('persists collapsed state to localStorage', async () => {
    const storageAlert = await fixture<WBCollapsibleAlerts>(html`
      <wb-collapsible-alerts collapsible storage-key="test-alert-2">Alert</wb-collapsible-alerts>
    `);
    storageAlert.collapse();
    await storageAlert.updateComplete;
    expect(localStorage.getItem('test-alert-2')).to.equal('collapsed');
  });

  it('restores dismissed state from localStorage', async () => {
    localStorage.setItem('test-alert-3', 'dismissed');
    const storageAlert = await fixture<WBCollapsibleAlerts>(html`
      <wb-collapsible-alerts dismissible storage-key="test-alert-3">Alert</wb-collapsible-alerts>
    `);
    await storageAlert.updateComplete;
    const alertDiv = storageAlert.shadowRoot!.querySelector('.alert');
    expect(alertDiv).to.be.null;
  });

  it('restores collapsed state from localStorage', async () => {
    localStorage.setItem('test-alert-4', 'collapsed');
    const storageAlert = await fixture<WBCollapsibleAlerts>(html`
      <wb-collapsible-alerts collapsible storage-key="test-alert-4">Alert</wb-collapsible-alerts>
    `);
    await storageAlert.updateComplete;
    const alertDiv = storageAlert.shadowRoot!.querySelector('.alert');
    expect(alertDiv?.classList.contains('collapsed')).to.equal(true);
  });

  it('clears localStorage on reset()', async () => {
    const storageAlert = await fixture<WBCollapsibleAlerts>(html`
      <wb-collapsible-alerts dismissible storage-key="test-alert-5">Alert</wb-collapsible-alerts>
    `);
    storageAlert.dismiss();
    await storageAlert.updateComplete;
    storageAlert.reset();
    expect(localStorage.getItem('test-alert-5')).to.be.null;
  });

  it('emits wb-alert-dismiss event', async () => {
    let eventFired = false;
    alert.addEventListener('wb-alert-dismiss', () => { eventFired = true; });
    alert.dismiss();
    await alert.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('emits wb-alert-collapse event', async () => {
    let eventFired = false;
    alert.addEventListener('wb-alert-collapse', () => { eventFired = true; });
    alert.collapse();
    await alert.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('emits wb-alert-expand event', async () => {
    alert.collapse();
    await alert.updateComplete;
    let eventFired = false;
    alert.addEventListener('wb-alert-expand', () => { eventFired = true; });
    alert.collapse();
    await alert.updateComplete;
    expect(eventFired).to.equal(true);
  });

  it('has role="alert"', () => {
    const alertDiv = alert.shadowRoot!.querySelector('.alert');
    expect(alertDiv?.getAttribute('role')).to.equal('alert');
  });

  it('displays correct icon for info', async () => {
    const infoAlert = await fixture<WBCollapsibleAlerts>(html`<wb-collapsible-alerts type="info">Info</wb-collapsible-alerts>`);
    const icon = infoAlert.shadowRoot!.querySelector('.alert-icon');
    expect(icon?.textContent).to.equal('ℹ️');
  });

  it('displays correct icon for success', async () => {
    const successAlert = await fixture<WBCollapsibleAlerts>(html`<wb-collapsible-alerts type="success">Success</wb-collapsible-alerts>`);
    const icon = successAlert.shadowRoot!.querySelector('.alert-icon');
    expect(icon?.textContent).to.equal('✓');
  });

  it('displays correct icon for warning', async () => {
    const warningAlert = await fixture<WBCollapsibleAlerts>(html`<wb-collapsible-alerts type="warning">Warning</wb-collapsible-alerts>`);
    const icon = warningAlert.shadowRoot!.querySelector('.alert-icon');
    expect(icon?.textContent).to.equal('⚠');
  });

  it('displays correct icon for danger', async () => {
    const dangerAlert = await fixture<WBCollapsibleAlerts>(html`<wb-collapsible-alerts type="danger">Danger</wb-collapsible-alerts>`);
    const icon = dangerAlert.shadowRoot!.querySelector('.alert-icon');
    expect(icon?.textContent).to.equal('✕');
  });
});
