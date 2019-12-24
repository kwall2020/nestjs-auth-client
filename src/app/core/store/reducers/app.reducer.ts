import { Action, createReducer, on } from '@ngrx/store';

import * as AppActions from '../actions/app.actions';

export interface State {
  transactions: any[];
}

export const INITIAL_STATE: State = {
  transactions: undefined
};

export function reducer(_state: State | undefined, _action: Action) {
  return createReducer(
    INITIAL_STATE,

    on(AppActions.receiveTransactions, (state, action) => ({
      ...state,
      transactions: action.transactions
    }))
  )(_state, _action);
}
