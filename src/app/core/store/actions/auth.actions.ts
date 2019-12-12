import { createAction, props } from '@ngrx/store';

export const init = createAction(
  '[auth] init',
  props<{ userName: string; token: string; refreshToken: string }>()
);

export const request = createAction(
  '[auth] request',
  props<{ userName: string; password: string }>()
);

export const refresh = createAction('[auth] refresh');

export const receive = createAction(
  '[auth] receive',
  props<{ userName: string; token: string; refreshToken: string }>()
);
