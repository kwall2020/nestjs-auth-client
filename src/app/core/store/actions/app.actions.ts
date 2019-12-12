import { createAction, props } from '@ngrx/store';

export const requestHello = createAction('[app] request hello');

export const receiveHello = createAction(
  '[app] receive hello',
  props<{ text: string }>()
);
