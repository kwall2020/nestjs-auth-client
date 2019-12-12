import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as AppActions from './core/store/actions/app.actions';
import { CoreState } from './core/store/reducers';
import * as AppSelectors from './core/store/selectors/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject();

  text: string;

  constructor(private store: Store<CoreState>) {}

  ngOnInit() {
    this.store
      .select(AppSelectors.text)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe({
        next: text => (this.text = text)
      });

    this.store.dispatch(AppActions.requestHello());
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
  }
}
