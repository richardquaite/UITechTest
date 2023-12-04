# Implementation notes

I had to delete package-lock.json and recreate it because it referenced an inaccessible internal package.

I chose to go with RTKQuery because it offers exponential backoff for API requests out of the box, meaning it's rare you'll see an error despite the API being quite deliberately flaky. You can make it even less reliable to see error handling if needed. It also provides automatic caching, meaning we need to worry less about over-fetching. Generally though, I think it better suits GraphQL, or APIs with very specific endpoints. With a more general OO REST API where I needed to reduce more data like the average review score, I would opt for a more standard redux approach. In this example I think Redux is probably overkill, but I thought there was a hint you'd like to see it in the provided code.

I haven't considered the case where there's a data integrity issue, for example if the `filmCompanyId` doesn't map to one of the `movieCompanies` but it would be straightforward to add a stub company, or remove the movie if required.

I chose to use the querystring for the selected movie and sort direction. This makes the application RESTful so the URL can be shared, bookmarked and the page can be reloaded etc. You can see some interaction in the React Router tab in Storybook. Whilst not strictly required here, if we had a paginated GET movies endpoint we'd need to provide it in the request in order to hydrate the app correctly.

I setup msw to mock API requests in unit tests and Storybook. If you submit a review with the test `400` in Storybook, you can simulate a bad request. This is set to not retry the request when it fails.

I haven't provided full test coverage, but hopefully enough to show how I would.

I've favoured type inferrence over declaring input and return types everywhere.

There are some mock api responses `src/mocks/responses` and these are used with msw in Storybook and unit tests. This allows testing the full component lifecycle, up to and including the App component itself. The unit tests are testing the rendered output against the data in the mock responses, meaning you can change the mocks and tests should break when they should, and not break when they shouldn't. It would be possible to integrate msw with a browser testing solution like Playwright to provide psuedo end-to-end testing.

I wasn't sure whether "average review score to 1 decimal place" meant it should always display a decimal place even if the average is an integer. I built it to just show an integer in this case.

---

Our developer was part way through developing the following feature but left the company and you are tasked with picking up where they left off.

The aim is to complete the piece of work by refactoring and improving the current code to get it to a working state that passes all A/C. Use material UI components and a form library where desirable.

Please return as a link to a public GIT store of your choice. e.g. Github

**_A/C_**
Must have(s)

- Display total number of movies.
- Table must show movie title, average review score to 1 decimal place and company that produces the film.
  - Movie company data comes from movieCompanies GET request.
  - Movies data comes from movies GET request.
- User must be able to select table row to leave a review with form appearing when there is a selected movie.
  - POST request to submitReview endpoint and display message returned on response.
  - Form must restrict message to 100 characters and show an error message if over 100 and not allow for submission in this instance.
- Highlight selected movie row when clicked.
- Handle error and loading states.

Should have(s)

- Review column should be sortable.
- Submit review form should appear in a modal on mobile devices or small breakpoints.

Could have(s)

- Add a button (or other mechanism) to refresh movies and movie companies.
- Containerise application using docker.

The three endpoints to be used are:

- GET movie companies: http://localhost:4321/movieCompanies
- GET movies: http://localhost:4321/movies
- POST review: http://localhost:4321/submitReview
  - body {review: message}

Please run server locally from https://github.com/michaelOptix1/starter-express-api
