import { Meta, StoryObj } from '@storybook/react';
import { Movie } from './Movie';
import GetMovies200 from '../../mocks/responses/GetMovies200.json';

const meta: Meta<typeof Movie> = {
  title: 'Movie',
  component: Movie,
};

export default meta;

type Story = StoryObj<typeof Movie>;

export const MovieComponent: Story = {
  args: {
    id: '1',
  },
};

const movieWithNoReviews = GetMovies200.find(
  (movie) => movie.reviews.length === 0
);

if (!movieWithNoReviews) {
  throw new Error('There are no movies without reviews in the mock api');
}

export const MovieComponentWithNoReviews: Story = {
  args: {
    id: movieWithNoReviews.id,
  },
};
