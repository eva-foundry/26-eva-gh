// src/components/Modal.stories.tsx
import React, { useState } from 'react';
import { AccessibleModal } from './Modal';
import { AccessibleButton } from './Button';

export default {
  title: 'Accessible/Modal',
  component: AccessibleModal,
};

export const Default = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AccessibleButton ariaLabel="Open modal" onClick={() => setOpen(true)}>
        Open Modal
      </AccessibleButton>
      <AccessibleModal isOpen={open} onClose={() => setOpen(false)} ariaLabel="Demo Modal">
        <p>This is an accessible modal dialog.</p>
      </AccessibleModal>
    </>
  );
};
