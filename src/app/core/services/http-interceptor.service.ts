import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap, skipWhile, take } from 'rxjs/operators';

import * as AppActions from '../store/actions/app.actions';
import * as AuthActions from '../store/actions/auth.actions';
import { CoreState } from '../store/reducers';
import * as AuthSelectors from '../store/selectors/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private token: string;
  private isTokenRefreshPending = false;

  constructor(private store: Store<CoreState>) {}

  private getNewRequest(
    request: HttpRequest<any>
  ): Observable<HttpRequest<any>> {
    return this.store.select(AuthSelectors.token).pipe(
      skipWhile(token => this.isTokenRefreshPending && token === this.token),
      take(1),
      mergeMap(token => {
        this.token = token;
        this.isTokenRefreshPending = false;

        return of(
          request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          })
        );
      })
    );
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.getNewRequest(request).pipe(
      mergeMap(newRequest =>
        next.handle(newRequest).pipe(
          catchError(error => {
            if (!(error instanceof HttpErrorResponse)) {
              return throwError(error);
            }

            const response = <HttpErrorResponse>error;
            if (response.status !== 401) {
              return throwError(error);
            }

            if (!this.isTokenRefreshPending) {
              this.isTokenRefreshPending = true;

              if (!this.token) {
                this.store.dispatch(AppActions.login());
              } else {
                this.store.dispatch(AuthActions.refreshToken());
              }
            }

            return this.getNewRequest(request).pipe(
              mergeMap(anotherNewRequest =>
                next
                  .handle(anotherNewRequest)
                  .pipe(catchError(anotherError => throwError(anotherError)))
              )
            );
          })
        )
      )
    );
  }
}
