import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
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
import * as AppActions from '../actions/app.actions';
import * as AuthActions from '../actions/auth.actions';
import { CoreState } from '../reducers';
import * as AuthSelectors from '../selectors/auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<CoreState>,
    private authService: AuthService,
    private snackBarService: MatSnackBar
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

  requestToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.requestToken),
      mergeMap(action =>
        this.authService.authenticate(action.userName, action.password).pipe(
          mergeMap((response: CognitoUserSession) => [
            AuthActions.receiveToken({
              userName: action.userName,
              token: response.getAccessToken().getJwtToken(),
              refreshToken: response.getRefreshToken().getToken()
            })
          ]),
          catchError(error => {
            console.error(error);
            if (error.code === 'PasswordResetRequiredException') {
              this.store.dispatch(
                AppActions.resetPassword({ userName: action.userName })
              );
            } else {
              this.snackBarService.open(error.message, 'error', {
                duration: 5000,
                verticalPosition: 'top'
              });
              this.store.dispatch(AppActions.login());
            }
            return [];
          })
        )
      )
    )
  );

  resetPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.resetPassword),
      mergeMap(action =>
        this.authService
          .resetPassword(
            action.userName,
            action.confirmationCode,
            action.newPassword
          )
          .pipe(
            mergeMap(() => []),
            catchError(response => {
              console.error(response);
              return [];
            })
          )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      withLatestFrom(
        this.store.select(AuthSelectors.userName),
        this.store.select(AuthSelectors.refreshToken)
      ),
      mergeMap(([_, userName, refreshToken]) =>
        this.authService.refresh(userName, refreshToken).pipe(
          mergeMap((response: CognitoUserSession) => [
            AuthActions.receiveToken({
              userName,
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

  receiveToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.receiveToken),
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
