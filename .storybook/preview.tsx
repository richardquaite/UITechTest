import { ReduxProvider } from '../src/components/ReduxProvider/ReduxProvider';
import { store } from '../src/redux/store';
import React from 'react';
import { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';
import { withRouter } from 'storybook-addon-react-router-v6';

import { handlers } from '../src/mocks/handlers';

initialize();

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
