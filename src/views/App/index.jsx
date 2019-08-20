import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.scss';
import Routes from '../../routes';
import store from '../../redux/store/index';
import { history } from '../../helpers/utils';

const App = () => (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    </div>
);

export default App;
