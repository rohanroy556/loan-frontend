import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Loan, Partner, PartnerLimit } from '../model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  readonly API_ORIGIN = 'https://apply-loan-server.herokuapp.com';
  readonly API = {
    partner: `${ this.API_ORIGIN }/partner`,
    loan: `${ this.API_ORIGIN }/loan`
  };

  constructor(private _httpClient: HttpClient) {}

  create(partner: Partner): Observable<Partner> {
    return this._httpClient.post<Partner>(this.API.partner, partner);
  }

  update(partner: Partner): Observable<Partner> {
    return this._httpClient.put<Partner>(`${ this.API.partner }/${ partner._id }`, partner);
  }

  get(): Observable<Array<Partner>> {
    return this._httpClient.get<Array<Partner>>(this.API.partner);
  }

  getById(id: string): Observable<Partner> {
    return this._httpClient.get<Partner>(`${ this.API.partner }/${ id }`);
  }

  delete(id: string): Observable<boolean> {
    return this._httpClient.delete<{ acknowledged: boolean, deletedCount: number }>(
      `${ this.API.partner }/${ id }`
    ).pipe(
      switchMap(data => data && data.deletedCount ? of(true) : throwError(false))
    );
  }

  getPartnerLimit(): Observable<Array<PartnerLimit>> {
    return this._httpClient.get<Array<PartnerLimit>>(this.API.loan);
  }

  getPartnerLimitById(id: string): Observable<PartnerLimit> {
    return this._httpClient.get<PartnerLimit>(`${ this.API.loan }/${ id }`);
  }

  pushLoanById(partnerId: string, amount: number): Observable<Partner> {
    return this._httpClient.patch<Partner>(`${ this.API.loan }/${ partnerId }`, { amount });
  }
}
