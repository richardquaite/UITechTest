import { ReduxProvider } from '../src/components/ReduxProvider/ReduxProvider';
import { store } from '../src/redux/store';
import React from 'react';
import { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { rest } from 'msw';
import { withRouter } from 'storybook-addon-react-router-v6';

import GetMovies200 from '../src/mocks/responses/GetMovies200.json';
import GetMovieCompanies200 from '../src/mocks/responses/GetMovieCompanies200.json';
import { API_ORIGIN } from '../src/constants/constants';

initialize();

/**
 * Annoyingly I can't share handlers between `src/mocks/handlers` and `.storybook/preview.tsx`
 * so they're copied between.
 */
const handlers = [
  rest.get(`${API_ORIGIN}/movies`, (req, res, ctx) => {
    return res(ctx.json(GetMovies200));
  }),
  rest.get(`${API_ORIGIN}/movieCompanies`, (req, res, ctx) => {
    return res(ctx.json(GetMovieCompanies200));
  }),
  rest.post(`${API_ORIGIN}/submitReview`, async (req, res, ctx) => {
    const requestBody = await req.json();
    if (requestBody.review === '400') {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Something went wrong' })
      );
    }
    return res(ctx.json({ message: 'Thank you for your review!' }));
  }),
];

const preview: Preview = {
  decorators: [
    (Story) => (
      <ReduxProvider store={store}>
        <Story />
      </ReduxProvider>
    ),
    withRouter,
  ],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    msw: {
      handlers,
    },
  },
  loaders: [mswLoader],
};

export default preview;
