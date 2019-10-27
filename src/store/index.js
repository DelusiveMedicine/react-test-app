import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducers';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'react-router-redux';
import history from '../history';

const enhancer = applyMiddleware(thunk, routerMiddleware(history));

const store = createStore(reducer, {}, enhancer);

export default store