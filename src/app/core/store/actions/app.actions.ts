import { createAction, props } from '@ngrx/store';

export const login = createAction('[app] login');

export const resetPassword = createAction(
  '[app] reset password',
  props<{ userName: string }>()
);

export const requestTransactions = createAction('[app] request transactions');

export const receiveTransactions = createAction(
  '[app] receive transactions',
  props<{ transactions: any[] }>()
);

export const requestCategories = createAction('[app] request categories');
