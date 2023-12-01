import { render, RenderOptions } from '@testing-library/react';
import { ReduxProvider } from '../components/ReduxProvider/ReduxProvider';
import { store } from '../redux/store';
import { BrowserRouter } from 'react-router-dom';
import { PropsWithChildren, ReactElement } from 'react';

export const AllTheProviders = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </ReduxProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
