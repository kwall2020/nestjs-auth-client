import { createSelector } from '@ngrx/store';

import { appFeatureSelector } from '../reducers';

const _text = createSelector(appFeatureSelector, state => state && state.text);
const _transactions = createSelector(
  appFeatureSelector,
  state => state && state.transactions
);

export const text = createSelector(_text, __text => __text);
export const transactions = createSelector(
  _transactions,
  __transactions => __transactions
);
