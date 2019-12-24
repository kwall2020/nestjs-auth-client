import { createSelector } from '@ngrx/store';

import { appFeatureSelector } from '../reducers';

const _transactions = createSelector(
  appFeatureSelector,
  state => state && state.transactions
);

export const transactions = createSelector(
  _transactions,
  __transactions => __transactions
);
