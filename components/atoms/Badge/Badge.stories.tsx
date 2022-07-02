import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import Badge from './Badge';

export default {
  title: 'Badge',
  component: Badge,
} as ComponentMeta<typeof Badge>;

export const Primary: ComponentStory<typeof Badge> = () => (
  <Badge text="Free to Take" type="white" />
);
