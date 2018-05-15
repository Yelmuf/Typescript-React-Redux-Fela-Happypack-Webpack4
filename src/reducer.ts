import { Reducer, Action } from 'redux';

export type AppAction =
  | { type: 'text/set', payload: string }
;

const defaultState = {
  text: 'abyrvalg'
}

export type AppState = typeof defaultState;

export const reducer: Reducer<AppState, AppAction> = (state = defaultState, action) => {
  switch (action.type) {
    case 'text/set':
      return {
        ...state,
        text: action.payload
      };
    
    default:
      return state;
  }
};
