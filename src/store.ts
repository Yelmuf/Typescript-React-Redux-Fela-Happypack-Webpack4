import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware, Epic } from 'redux-observable';
import { reducer } from './reducer';

const epicMiddleware = createEpicMiddleware(combineEpics());

const middleware = applyMiddleware(epicMiddleware);

export const store = createStore(
  reducer,
  composeWithDevTools(middleware)
);