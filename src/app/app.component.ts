import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import * as AppActions from './core/store/actions/app.actions';
import { CoreState } from './core/store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private isDestroyed$ = new Subject();

  constructor(private store: Store<CoreState>) {}

  ngOnInit() {
    this.store.dispatch(
      AppActions.requestTransactions({
        categoryDescription: 'Entertainment',
        from: new Date(2019, 0, 1),
        to: new Date(2019, 0, 31),
        accountId: 1
      })
    );
    this.store.dispatch(
      AppActions.requestCategories({
        from: new Date(2019, 0, 1),
        to: new Date(2019, 0, 31),
        accountId: 1
      })
    );
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
  }
}
