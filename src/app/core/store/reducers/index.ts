import * as fromRouterStore from '@ngrx/router-store';
import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../../environments/environment';

import * as fromApp from './app.reducer';
import * as fromAuth from './auth.reducer';
import * as fromRouter from './router.reducer';

export interface CoreState {
  router: fromRouterStore.RouterReducerState<fromRouter.RouterState>;
  auth: fromAuth.State;
  app: fromApp.State;
}

export const reducers: ActionReducerMap<CoreState> = {
  router: fromRouterStore.routerReducer,
  auth: fromAuth.reducer,
  app: fromApp.reducer
};

export const metaReducers: MetaReducer<CoreState>[] = !environment.production
  ? []
  : [];

export const authFeatureSelector = createFeatureSelector<fromAuth.State>(
  'auth'
);
export const appFeatureSelector = createFeatureSelector<fromApp.State>('app');
