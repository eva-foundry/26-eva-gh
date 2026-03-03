import { describe, it, expect, beforeEach } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './gc-stepper';
import type { GCStepper } from './gc-stepper';

describe('gc-stepper', () => {
  let element: GCStepper;

  beforeEach(async () => {
    element = await fixture(html`<gc-stepper></gc-stepper>`);
  });

  it('renders stepper container', () => {
    const stepper = element.shadowRoot?.querySelector('.stepper');
    expect(stepper).to.exist;
  });

  it('stepper has role="list"', () => {
    const stepper = element.shadowRoot?.querySelector('.stepper');
    expect(stepper?.getAttribute('role')).to.equal('list');
  });

  it('stepper has aria-label', () => {
    const stepper = element.shadowRoot?.querySelector('.stepper');
    expect(stepper?.getAttribute('aria-label')).to.be.a('string');
  });

  it('renders default steps', () => {
    const steps = element.shadowRoot?.querySelectorAll('.step');
    expect(steps?.length).to.equal(3);
  });

  it('steps have role="listitem"', () => {
    const steps = element.shadowRoot?.querySelectorAll('.step');
    steps?.forEach(step => {
      expect(step.getAttribute('role')).to.equal('listitem');
    });
  });

  it('renders custom steps', async () => {
    element.steps = [
      { label: 'First Step' },
      { label: 'Second Step' },
      { label: 'Third Step' },
      { label: 'Fourth Step' }
    ];
    await element.updateComplete;

    const steps = element.shadowRoot?.querySelectorAll('.step');
    expect(steps?.length).to.equal(4);
  });

  it('renders step indicators', () => {
    const indicators = element.shadowRoot?.querySelectorAll('.step-indicator');
    expect(indicators?.length).to.be.greaterThan(0);
  });

  it('step indicators have aria-label', () => {
    const indicators = element.shadowRoot?.querySelectorAll('.step-indicator');
    indicators?.forEach(indicator => {
      expect(indicator.getAttribute('aria-label')).to.be.a('string');
    });
  });

  it('renders step labels', () => {
    const labels = element.shadowRoot?.querySelectorAll('.step-label');
    expect(labels?.length).to.be.greaterThan(0);
  });

  it('renders step numbers', () => {
    const firstIndicator = element.shadowRoot?.querySelector('.step-indicator');
    const text = firstIndicator?.textContent?.trim();
    expect(text).to.match(/1|✓/);
  });

  it('renders step descriptions when provided', async () => {
    element.steps = [
      { label: 'Step', description: 'Description text' }
    ];
    await element.updateComplete;

    const description = element.shadowRoot?.querySelector('.step-description');
    expect(description).to.exist;
    expect(description?.textContent).to.include('Description');
  });

  it('does not render description when not provided', async () => {
    element.steps = [
      { label: 'Step' }
    ];
    await element.updateComplete;

    const description = element.shadowRoot?.querySelector('.step-description');
    expect(description).to.not.exist;
  });

  it('applies completed status', async () => {
    element.steps = [
      { label: 'Step 1', status: 'completed' }
    ];
    await element.updateComplete;

    const step = element.shadowRoot?.querySelector('.step');
    expect(step?.classList.contains('completed')).to.be.true;
  });

  it('applies current status', async () => {
    element.steps = [
      { label: 'Step 1', status: 'current' }
    ];
    await element.updateComplete;

    const step = element.shadowRoot?.querySelector('.step');
    expect(step?.classList.contains('current')).to.be.true;
  });

  it('applies pending status', async () => {
    element.steps = [
      { label: 'Step 1', status: 'pending' }
    ];
    await element.updateComplete;

    const step = element.shadowRoot?.querySelector('.step');
    expect(step?.classList.contains('pending')).to.be.true;
  });

  it('current step has aria-current="step"', async () => {
    element.steps = [
      { label: 'Step 1', status: 'current' }
    ];
    await element.updateComplete;

    const step = element.shadowRoot?.querySelector('.step');
    expect(step?.getAttribute('aria-current')).to.equal('step');
  });

  it('non-current steps have aria-current="false"', async () => {
    element.steps = [
      { label: 'Step 1', status: 'completed' },
      { label: 'Step 2', status: 'pending' }
    ];
    await element.updateComplete;

    const steps = element.shadowRoot?.querySelectorAll('.step');
    steps?.forEach((step, index) => {
      expect(step.getAttribute('aria-current')).to.equal('false');
    });
  });

  it('renders check icon for completed steps', async () => {
    element.steps = [
      { label: 'Step 1', status: 'completed' }
    ];
    await element.updateComplete;

    const checkIcon = element.shadowRoot?.querySelector('.check-icon');
    expect(checkIcon).to.exist;
  });

  it('check icon is SVG', async () => {
    element.steps = [
      { label: 'Step 1', status: 'completed' }
    ];
    await element.updateComplete;

    const checkIcon = element.shadowRoot?.querySelector('.check-icon');
    expect(checkIcon?.tagName.toLowerCase()).to.equal('svg');
  });

  it('check icon has aria-hidden', async () => {
    element.steps = [
      { label: 'Step 1', status: 'completed' }
    ];
    await element.updateComplete;

    const checkIcon = element.shadowRoot?.querySelector('.check-icon');
    expect(checkIcon?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('renders step connectors', async () => {
    element.steps = [
      { label: 'Step 1' },
      { label: 'Step 2' }
    ];
    await element.updateComplete;

    const connectors = element.shadowRoot?.querySelectorAll('.step-connector');
    expect(connectors?.length).to.be.greaterThan(0);
  });

  it('connectors have aria-hidden', () => {
    const connectors = element.shadowRoot?.querySelectorAll('.step-connector');
    connectors?.forEach(connector => {
      expect(connector.getAttribute('aria-hidden')).to.equal('true');
    });
  });

  it('uses currentStep property to determine status', async () => {
    element.steps = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' }
    ];
    element.currentStep = 1;
    await element.updateComplete;

    const steps = element.shadowRoot?.querySelectorAll('.step');
    expect(steps?.[0]?.classList.contains('completed')).to.be.true;
    expect(steps?.[1]?.classList.contains('current')).to.be.true;
    expect(steps?.[2]?.classList.contains('pending')).to.be.true;
  });

  it('updates when currentStep changes', async () => {
    element.steps = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' }
    ];
    element.currentStep = 0;
    await element.updateComplete;

    let current = element.shadowRoot?.querySelector('.step.current');
    expect(current?.textContent).to.include('Step 1');

    element.currentStep = 2;
    await element.updateComplete;

    current = element.shadowRoot?.querySelector('.step.current');
    expect(current?.textContent).to.include('Step 3');
  });

  it('applies proper CSS classes', () => {
    const stepper = element.shadowRoot?.querySelector('.stepper');
    expect(stepper?.classList.contains('stepper')).to.be.true;

    const step = element.shadowRoot?.querySelector('.step');
    expect(step?.classList.contains('step')).to.be.true;

    const indicator = element.shadowRoot?.querySelector('.step-indicator');
    expect(indicator?.classList.contains('step-indicator')).to.be.true;

    const content = element.shadowRoot?.querySelector('.step-content');
    expect(content?.classList.contains('step-content')).to.be.true;

    const label = element.shadowRoot?.querySelector('.step-label');
    expect(label?.classList.contains('step-label')).to.be.true;
  });

  it('renders step labels with correct text', async () => {
    element.steps = [
      { label: 'Custom Step 1' },
      { label: 'Custom Step 2' }
    ];
    await element.updateComplete;

    const labels = element.shadowRoot?.querySelectorAll('.step-label');
    expect(labels?.[0]?.textContent).to.equal('Custom Step 1');
    expect(labels?.[1]?.textContent).to.equal('Custom Step 2');
  });

  it('handles single step', async () => {
    element.steps = [
      { label: 'Only Step', status: 'current' }
    ];
    await element.updateComplete;

    const steps = element.shadowRoot?.querySelectorAll('.step');
    expect(steps?.length).to.equal(1);
  });

  it('handles many steps', async () => {
    element.steps = Array.from({ length: 10 }, (_, i) => ({
      label: `Step ${i + 1}`
    }));
    await element.updateComplete;

    const steps = element.shadowRoot?.querySelectorAll('.step');
    expect(steps?.length).to.equal(10);
  });

  it('status property overrides currentStep', async () => {
    element.steps = [
      { label: 'Step 1', status: 'pending' },
      { label: 'Step 2', status: 'current' },
      { label: 'Step 3', status: 'completed' }
    ];
    element.currentStep = 0;
    await element.updateComplete;

    const steps = element.shadowRoot?.querySelectorAll('.step');
    expect(steps?.[0]?.classList.contains('pending')).to.be.true;
    expect(steps?.[1]?.classList.contains('current')).to.be.true;
    expect(steps?.[2]?.classList.contains('completed')).to.be.true;
  });
});
