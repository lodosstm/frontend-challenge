import axios from 'axios';
import { connect } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer.js';
import { middleware } from './middleware.js';

export const store = createStore(reducer, applyMiddleware(thunk, middleware));