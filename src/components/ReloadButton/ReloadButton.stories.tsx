import { Meta, StoryObj } from '@storybook/react';
import { ReloadButton } from './ReloadButton';

const meta: Meta<typeof ReloadButton> = {
  title: 'ReloadButton',
  component: ReloadButton,
};

export default meta;

type Story = StoryObj<typeof ReloadButton>;

export const ReloadButtonComponent: Story = {};
