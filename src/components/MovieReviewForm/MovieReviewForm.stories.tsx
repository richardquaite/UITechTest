import { Meta, StoryObj } from '@storybook/react';
import { MovieReviewForm } from '@/src/components/MovieReviewForm/MovieReviewForm';
import { reactRouterParameters } from 'storybook-addon-react-router-v6';
import GetMovies200 from '@/src/mocks/responses/GetMovies200';

const meta: Meta<typeof MovieReviewForm> = {
  title: 'MovieReviewForm',
  component: MovieReviewForm,
};

export default meta;

type Story = StoryObj<typeof MovieReviewForm>;

export const ComponentWithSelection: Story = {};
ComponentWithSelection.parameters = {
  reactRouter: reactRouterParameters({
    location: {
      searchParams: { selected: GetMovies200[0].id },
    },
  }),
};

export const ComponentWithNoSelection: Story = {};
