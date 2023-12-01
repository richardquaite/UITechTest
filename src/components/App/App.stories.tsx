import { Meta, StoryObj } from '@storybook/react';
import { App } from '@/src/components/App/App';

const meta: Meta<typeof App> = {
  title: 'App',
  component: App,
};

export default meta;

type Story = StoryObj<typeof App>;

export const AppComponent: Story = {};
