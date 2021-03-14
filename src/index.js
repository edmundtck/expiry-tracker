import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import reportWebVitals from './reportWebVitals';
import rootReducer from './reducers';
import CssBaseline from '@material-ui/core/CssBaseline';
import './index.css';

import App from './App';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';

const middlewares = [ thunk ];

if (process.env.NODE_ENV === 'development') {
	middlewares.push(logger);
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(...middlewares)));

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<CssBaseline />
				<Auth0ProviderWithHistory>
					<App />
				</Auth0ProviderWithHistory>
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
