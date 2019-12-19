import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  public getHello(): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}`);
  }

  public getTransactions(): Observable<any> {
    return this.httpClient.get(`${environment.apiBaseUrl}/transaction`);
  }
}
