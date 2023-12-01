import { rest } from 'msw';

import GetMovies200 from '@/src/mocks/responses/GetMovies200';
import GetMovieCompanies200 from '@/src/mocks/responses/GetMovieCompanies200';
import { API_ORIGIN } from '@/src/constants/constants';

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
