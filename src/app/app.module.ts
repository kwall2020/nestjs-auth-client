import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InterceptorService } from './core/services/http-interceptor.service';
import { effects } from './core/store/effects';
import { metaReducers, reducers } from './core/store/reducers';
import { CustomSerializer } from './core/store/reducers/router.reducer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
    !environment.production
      ? StoreDevtoolsModule.instrument({
          maxAge: 50
        })
      : []
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
