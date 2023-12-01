import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/src/components/App/App';
import '@/src/index.css';
import { BrowserRouter } from 'react-router-dom';
import { ReduxProvider } from '@/src/components/ReduxProvider/ReduxProvider';
import { store } from '@/src/redux/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);
