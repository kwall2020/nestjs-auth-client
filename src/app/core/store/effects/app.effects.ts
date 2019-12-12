import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, mergeMap } from 'rxjs/operators';

import { AppService } from '../../services';
import * as AppActions from '../actions/app.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private appService: AppService) {}

  requestHello$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.requestHello),
      mergeMap(() =>
        this.appService.getHello().pipe(
          mergeMap((response: string) => [
            AppActions.receiveHello({
              text: response
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
}
