import React from 'react';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import './config/reactotronConfig';

import Routes from './routes';

import { store, persistor } from './store';

import history from './services/history';

import GlobalStyle from './styles/global';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import '@szhsin/react-menu/dist/index.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
