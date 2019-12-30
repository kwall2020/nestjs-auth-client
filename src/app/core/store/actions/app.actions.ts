import { createAction, props } from '@ngrx/store';

export const login = createAction('[app] login');

export const resetPassword = createAction(
  '[app] reset password',
  props<{ userName: string }>()
);

export const requestTransactions = createAction(
  '[app] request transactions',
  props<{
    categoryDescription: string;
    from: Date;
    to: Date;
    accountId: number;
  }>()
);

export const receiveTransactions = createAction(
  '[app] receive transactions',
  props<{ transactions: any[] }>()
);

export const requestCategories = createAction(
  '[app] request categories',
  props<{ from: Date; to: Date; accountId: number }>()
);
