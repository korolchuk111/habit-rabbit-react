// scroll bar
import 'simplebar/src/simplebar.css';

import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';

import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { store, persistor } from './store';

import App from './App';
import * as serviceWorker from './serviceWorker';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
const history = createBrowserHistory();
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <HelmetProvider>
        <BrowserRouter history={history}>
          <PersistGate persistor={persistor}>
            <App />
          </PersistGate>
        </BrowserRouter>
      </HelmetProvider>
    </Provider>
  </QueryClientProvider>
);

export default store;
// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
