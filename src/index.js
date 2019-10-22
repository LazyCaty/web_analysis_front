import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import reducer from './redux/reducer/index'
import thunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension';

const middleware = [thunk];
const composeEnhancers = composeWithDevTools({
});

const store = createStore(reducer,composeEnhancers(
    applyMiddleware(...middleware)));
    ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root'));
    // 数据仓库

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
