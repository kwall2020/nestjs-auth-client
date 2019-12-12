import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreState } from './core/store/reducers';
import * as AuthActions from './core/store/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store<CoreState>) {}

  onTestClick() {
    this.store.dispatch(
      AuthActions.get({
        userName: 'kwall2004@gmail.com',
        password: '9lS*8Wbl^z0N*Ugn'
      })
    );
  }
}
