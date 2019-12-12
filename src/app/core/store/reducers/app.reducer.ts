import { Action, createReducer, on } from '@ngrx/store';

import * as AppActions from '../actions/app.actions';

export interface State {
  text: string;
}

export const INITIAL_STATE: State = {
  text: undefined
};

export function reducer(_state: State | undefined, _action: Action) {
  return createReducer(
    INITIAL_STATE,

    on(AppActions.receiveHello, (state, action) => ({
      ...state,
      text: action.text
    }))
  )(_state, _action);
}
