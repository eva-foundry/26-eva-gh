// demo/App.tsx
import React, { useState } from 'react';
import { AccessibleButton } from '../src/components/Button';
import { AccessibleForm } from '../src/components/Form';
import { AccessibleModal } from '../src/components/Modal';

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formValue, setFormValue] = useState('');

  return (
    <main>
      <h1>UX Accessibility Demo</h1>
      <AccessibleButton ariaLabel="Open modal" onClick={() => setModalOpen(true)}>
        Open Modal
      </AccessibleButton>
      <AccessibleModal isOpen={modalOpen} onClose={() => setModalOpen(false)} ariaLabel="Demo Modal">
        <p>This is an accessible modal dialog.</p>
      </AccessibleModal>
      <AccessibleForm ariaLabel="Demo Form" onSubmit={e => { e.preventDefault(); alert('Submitted: ' + formValue); }}>
        <label htmlFor="demo-input">Demo Input:</label>
        <input id="demo-input" value={formValue} onChange={e => setFormValue(e.target.value)} aria-required="true" />
        <AccessibleButton type="submit">Submit</AccessibleButton>
      </AccessibleForm>
    </main>
  );
};

export default App;
