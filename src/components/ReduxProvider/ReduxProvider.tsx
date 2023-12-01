import { Provider } from 'react-redux';
import { PropsWithChildren } from 'react';
import { Store } from '@/src/redux/store';

export const ReduxProvider = ({
  children,
  store,
}: PropsWithChildren<{ store: Store }>) => (
  <Provider store={store}>{children}</Provider>
);
