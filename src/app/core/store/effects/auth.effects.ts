import { Injectable } from '@angular/core';
import {
  Actions,
  createEffect,
  ofType,
  ROOT_EFFECTS_INIT
} from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import { AuthService } from '../../services';
import * as AuthActions from '../actions/auth.actions';
import { CoreState } from '../reducers';
import * as AuthSelectors from '../selectors/auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<CoreState>,
    private authService: AuthService
  ) {}

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() =>
        AuthActions.init({
          userName: localStorage.getItem('userName'),
          token: localStorage.getItem('token'),
          refreshToken: localStorage.getItem('refreshToken')
        })
      )
    )
  );

  request$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.request),
      mergeMap(action =>
        this.authService.authenticate(action.userName, action.password).pipe(
          mergeMap((response: CognitoUserSession) => [
            AuthActions.receive({
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
            AuthActions.receive({
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

  receive$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.receive),
      tap({
        next: action => {
          if (action.userName) {
            localStorage.setItem('userName', action.userName);
          } else {
            localStorage.removeItem('userName');
          }

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
