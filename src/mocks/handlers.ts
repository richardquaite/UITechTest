import { rest } from 'msw';

import GetMovies200 from './responses/GetMovies200.json';
import GetMovieCompanies200 from './responses/GetMovieCompanies200.json';
import { API_ORIGIN } from '../constants/constants';

/**
 * Annoyingly I can't share handlers between `src/mocks/handlers` and `.storybook/preview.tsx`
 * so they're copied between.
 */
export const handlers = [
  rest.get(`${API_ORIGIN}/movies`, (req, res, ctx) => {
    return res(ctx.delay(200), ctx.json(GetMovies200));
  }),
  rest.get(`${API_ORIGIN}/movieCompanies`, (req, res, ctx) => {
    return res(ctx.delay(200), ctx.json(GetMovieCompanies200));
  }),
  rest.post(`${API_ORIGIN}/submitReview`, async (req, res, ctx) => {
    const requestBody = await req.json();
    if (requestBody.review === '400') {
      return res(
        ctx.delay(200),
        ctx.status(400),
        ctx.json({ message: 'Something went wrong' })
      );
    }
    return res(ctx.json({ message: 'Thank you for your review!' }));
  }),
];
