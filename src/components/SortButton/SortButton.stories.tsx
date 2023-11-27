import { Meta, StoryObj } from '@storybook/react';
import { SortButton } from './SortButton';

const meta: Meta<typeof SortButton> = {
  title: 'SortButton',
  component: SortButton,
};

export default meta;

type Story = StoryObj<typeof SortButton>;

export const SortButtonComponent: Story = {};
