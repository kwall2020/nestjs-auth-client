import * as fromRouterStore from '@ngrx/router-store';
import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../../environments/environment';

import * as fromRouter from './router.reducer';
import * as fromAuth from './auth.reducer';

export interface CoreState {
  router: fromRouterStore.RouterReducerState<fromRouter.RouterState>;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<CoreState> = {
  router: fromRouterStore.routerReducer,
  auth: fromAuth.reducer
};

export const metaReducers: MetaReducer<CoreState>[] = !environment.production
  ? []
  : [];

export const authFeatureSelector = createFeatureSelector<fromAuth.State>(
  'auth'
);
