import { createAction, props } from '@ngrx/store';

export const init = createAction(
  '[auth] init',
  props<{ userName: string; token: string; refreshToken: string }>()
);

export const requestToken = createAction(
  '[auth] request token',
  props<{ userName: string; password: string }>()
);

export const resetPassword = createAction(
  '[auth] reset password',
  props<{ userName: string; confirmationCode: string; newPassword: string }>()
);

export const refreshToken = createAction('[auth] refresh token');

export const receiveToken = createAction(
  '[auth] receive token',
  props<{ userName: string; token: string; refreshToken: string }>()
);
