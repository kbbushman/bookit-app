import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import App from 'App';
import { AuthProvider } from 'providers/AuthProvider';
import { MapProvider } from 'providers/MapProvider';
import { initStore } from 'store';

import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.scss';

const store = initStore();

library.add(fas);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <MapProvider apiKey="N6OcrIpWfFwnTLIPEksAN31KNeoQ3pda">
          <App />
        </MapProvider>
      </AuthProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
