import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';

export interface State {
  userName: string;
  token: string;
  refreshToken: string;
}

export const INITIAL_STATE: State = {
  userName: undefined,
  token: undefined,
  refreshToken: undefined
};

export function reducer(_state: State | undefined, _action: Action) {
  return createReducer(
    INITIAL_STATE,

    on(AuthActions.init, AuthActions.receiveToken, (state, action) => ({
      ...state,
      userName: action.userName,
      token: action.token,
      refreshToken: action.refreshToken
    }))
  )(_state, _action);
}
