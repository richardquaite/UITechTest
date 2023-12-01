import { Meta, StoryObj } from '@storybook/react';
import { PageTitle } from '@/src/components/PageTitle/PageTitle';

const meta: Meta<typeof PageTitle> = {
  title: 'PageTitle',
  component: PageTitle,
};

export default meta;

type Story = StoryObj<typeof PageTitle>;

export const PageTitleComponent: Story = {
  args: {
    children: 'Some page title',
  },
};
