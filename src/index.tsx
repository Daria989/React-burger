import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './services/reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter} from 'react-router-dom';
import { socketMiddleware } from './services/middleware/socketMiddleware';
import { socketMiddlewareAuth } from './services/middleware/socketMiddlewareAuth';
import * as wsActions from './services/actions/wsActions';
import * as wsActionsAuth from './services/actions/wsActionsAuth';
import { BASE_WS_URL } from './utils/constants';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk), applyMiddleware(socketMiddleware(`${BASE_WS_URL}/all`, wsActions), socketMiddlewareAuth(BASE_WS_URL, wsActionsAuth))));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <App />
      </BrowserRouter>
    </Provider>  
  </React.StrictMode>,
 document.getElementById('root')
);

