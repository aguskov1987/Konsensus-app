import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducers from './Reducers'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export default createStore(rootReducers, composedEnhancer)