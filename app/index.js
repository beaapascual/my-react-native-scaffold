/* eslint-disable require-jsdoc */

import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'remote-redux-devtools';
import { AppContainer } from './containers';
import * as reducers from './redux';
import { LOGGING_OUT } from './redux/modules/authentication';

// GLOBAL.XMLHttpRequxest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

console.ignoredYellowBox = [
    'Setting a timer',
    'Warning: isMounted(...) is deprecated',
];
console.disableYellowBox = true;

const appReducer = combineReducers(reducers);

// clear all stored state on logout
function rootReducer(state, action) {
    if (action.type === LOGGING_OUT) {
        state = undefined;
    }

    return appReducer(state, action);
}

const composeEnhancers = composeWithDevTools({
    realtime: global.__DEV__,
    port: 8000,
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
);

export default function app() {
    return (
        <Provider store={store}>
            <AppContainer />
        </Provider>
    );
}
