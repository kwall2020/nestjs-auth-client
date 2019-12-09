import { createSelector } from '@ngrx/store';

import { authFeatureSelector } from '../reducers';

const _userName = createSelector(
  authFeatureSelector,
  state => state && state.userName
);

const _token = createSelector(
  authFeatureSelector,
  state => state && state.token
);

const _refreshToken = createSelector(
  authFeatureSelector,
  state => state && state.refreshToken
);

export const userName = createSelector(_userName, __userName => __userName);
export const token = createSelector(_token, __token => __token);
export const refreshToken = createSelector(
  _refreshToken,
  __refreshToken => __refreshToken
);
