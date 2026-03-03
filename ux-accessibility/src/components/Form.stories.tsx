// src/components/Form.stories.tsx
import React, { useState } from 'react';
import { AccessibleForm } from './Form';
import { AccessibleButton } from './Button';

export default {
  title: 'Accessible/Form',
  component: AccessibleForm,
};

export const Default = () => {
  const [value, setValue] = useState('');
  return (
    <AccessibleForm ariaLabel="Demo Form" onSubmit={e => { e.preventDefault(); alert('Submitted: ' + value); }}>
      <label htmlFor="demo-input">Demo Input:</label>
      <input id="demo-input" value={value} onChange={e => setValue(e.target.value)} aria-required="true" />
      <AccessibleButton type="submit">Submit</AccessibleButton>
    </AccessibleForm>
  );
};
