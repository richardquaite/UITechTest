import { render, renderHook, RenderOptions } from '@testing-library/react';
import { ReduxProvider } from '@/src/components/ReduxProvider/ReduxProvider';
import { store } from '@/src/redux/store';
import { BrowserRouter } from 'react-router-dom';
import { PropsWithChildren, ReactElement } from 'react';

export const AllTheProviders = ({ children }: PropsWithChildren) => {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </ReduxProvider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) => {
  return render(ui, {
    ...options,
    wrapper:
      typeof options?.wrapper !== 'undefined'
        ? ({ children }) => {
            const Wrapper = options.wrapper!;
            return (
              <AllTheProviders>
                <Wrapper>{children}</Wrapper>
              </AllTheProviders>
            );
          }
        : AllTheProviders,
  });
};

const customRenderHook: typeof renderHook = (r, options) => {
  return renderHook(r, {
    ...options,
    wrapper:
      typeof options?.wrapper !== 'undefined'
        ? ({ children }) => {
            const Wrapper = options.wrapper!;
            return (
              <AllTheProviders>
                <Wrapper>{children}</Wrapper>
              </AllTheProviders>
            );
          }
        : AllTheProviders,
  });
};

export * from '@testing-library/react';
export { customRender as render, customRenderHook as renderHook };
