import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private httpClient: HttpClient) {}

  public getTransaction(id: number): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}/transaction/${id.toString()}`
    );
  }

  public getTransactions(
    categoryDescription: string,
    from: Date,
    to: Date,
    accountId: number
  ): Observable<any> {
    return this.httpClient.get(
      `${
        environment.apiBaseUrl
      }/transaction?categoryDescription=${categoryDescription}&from=${moment(
        from
      ).format('YYYY-MM-DD')}&to=${moment(to).format(
        'YYYY-MM-DD'
      )}&accountId=${accountId.toString()}`
    );
  }

  public getCategories(
    from: Date,
    to: Date,
    accountId: number
  ): Observable<any> {
    return this.httpClient.get(
      `${environment.apiBaseUrl}/category?from=${moment(from).format(
        'YYYY-MM-DD'
      )}&to=${moment(to).format(
        'YYYY-MM-DD'
      )}&accountId=${accountId.toString()}`
    );
  }
}
