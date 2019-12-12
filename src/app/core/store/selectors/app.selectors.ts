import { createSelector } from '@ngrx/store';

import { appFeatureSelector } from '../reducers';

const _text = createSelector(appFeatureSelector, state => state && state.text);

export const text = createSelector(_text, __text => __text);
