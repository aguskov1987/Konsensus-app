import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducers from './Reducers'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
let store = createStore(rootReducers, composedEnhancer);

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;

export default store;
