import { createAction, props } from '@ngrx/store';

export const requestHello = createAction('[app] request hello');

export const receiveHello = createAction(
  '[app] receive hello',
  props<{ text: string }>()
);

export const requestTransactions = createAction('[app] request transactions');

export const receiveTransactions = createAction(
  '[app] receive transactions',
  props<{ transactions: any[] }>()
);
