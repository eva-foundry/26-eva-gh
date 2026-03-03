// src/components/Button.stories.tsx
import React from 'react';
import { AccessibleButton } from './Button';

export default {
  title: 'Accessible/Button',
  component: AccessibleButton,
};

export const Default = () => (
  <AccessibleButton ariaLabel="Demo Button">Click Me</AccessibleButton>
);
