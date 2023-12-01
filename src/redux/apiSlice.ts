import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { API_ORIGIN } from '@/src/constants/constants';

const staggeredBaseQuery = retry(fetchBaseQuery({ baseUrl: API_ORIGIN }), {
  maxRetries: 3,
});

export const apiSlice = createApi({
  reducerPath: 'api',
  tagTypes: ['Movie', 'MovieCompany'],
  baseQuery: staggeredBaseQuery,
  endpoints: (build) => ({
    getMovies: build.query<Movie[], void>({
      query: () => `/movies`,
      providesTags: () => [{ type: 'Movie', id: 'LIST' }],
    }),

    getMovieCompanies: build.query<MovieCompany[], void>({
      query: () => `/movieCompanies`,
      providesTags: () => [{ type: 'MovieCompany', id: 'LIST' }],
    }),

    postMovieReview: build.mutation<{ message: string }, { review: string }>({
      query: (body) => ({
        url: '/submitReview',
        method: 'POST',
        body,
      }),
      extraOptions: { maxRetries: 0 },
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetMovieCompaniesQuery,
  usePostMovieReviewMutation,
} = apiSlice;
