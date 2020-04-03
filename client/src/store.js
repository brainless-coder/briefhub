import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducers from './reducers';

const initialState ={};

const middleWare = [thunk];

const store = createStore(rootReducers, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;