import { Meta, StoryObj } from '@storybook/react';
import { MoviesTable } from '@/src/components/MoviesTable/MoviesTable';

const meta: Meta<typeof MoviesTable> = {
  title: 'MoviesTable',
  component: MoviesTable,
};

export default meta;

type Story = StoryObj<typeof MoviesTable>;

export const MoviesTableComponent: Story = {};
