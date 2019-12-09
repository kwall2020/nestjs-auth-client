import { createAction, props } from '@ngrx/store';

export const init = createAction(
  '[auth] init',
  props<{ userName: string; token: string; refreshToken: string }>()
);

export const get = createAction(
  '[auth] get',
  props<{ userName: string; password: string }>()
);

export const refresh = createAction('[auth] refresh');

export const store = createAction(
  '[auth] store',
  props<{ userName: string; token: string; refreshToken: string }>()
);
