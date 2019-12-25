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

  transactions: any[];

  constructor(private store: Store<CoreState>) {}

  ngOnInit() {
    this.store
      .select(AppSelectors.transactions)
      .pipe(takeUntil(this.isDestroyed$))
      .subscribe({
        next: transactions => (this.transactions = transactions)
      });

    this.store.dispatch(AppActions.requestTransactions());
    this.store.dispatch(AppActions.requestCategories());
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
  }
}
