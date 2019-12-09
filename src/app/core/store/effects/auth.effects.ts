import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import { AuthService } from '../../services';
import { CoreState } from '../reducers';
import * as AuthActions from '../actions/auth.actions';
import * as AuthSelectors from '../selectors/auth.selectors';
import { CognitoUserSession } from 'amazon-cognito-identity-js';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<CoreState>,
    private authService: AuthService
  ) {}

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.get),
      mergeMap(action =>
        this.authService.authenticate(action.userName, action.password).pipe(
          mergeMap((response: CognitoUserSession) => [
            AuthActions.store({
              userName: action.userName,
              token: response.getAccessToken().getJwtToken(),
              refreshToken: response.getRefreshToken().getToken()
            })
          ]),
          catchError(response => {
            console.error(response);
            return [];
          })
        )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refresh),
      withLatestFrom(
        this.store.select(AuthSelectors.userName),
        this.store.select(AuthSelectors.refreshToken)
      ),
      mergeMap(([_, userName, refreshToken]) =>
        this.authService.refresh(userName, refreshToken).pipe(
          mergeMap((response: any) => [
            AuthActions.store({
              userName,
              token: response.accessToken.token,
              refreshToken: response.refreshToken
            })
          ]),
          catchError(response => {
            console.error(response);
            return [];
          })
        )
      )
    )
  );

  store$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.store),
      tap({
        next: action => {
          if (action.token) {
            localStorage.setItem('token', action.token);
          } else {
            localStorage.removeItem('token');
          }
          if (action.refreshToken) {
            localStorage.setItem('refreshToken', action.refreshToken);
          } else {
            localStorage.removeItem('refreshToken');
          }
        }
      }),
      mergeMap(() => [])
    )
  );
}
