import { Component } from '@angular/core';
import { AuthService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private auth: AuthService) {}

  onTestClick() {
    this.auth.authenticate('kwall2004@gmail.com', '@P05tr0ph39');
  }
}
