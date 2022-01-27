import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private apiGetRoles = this.api.getBaseUrl + "/rol/getRoles";
  private apiCreateRoles = this.api.getBaseUrl + "/rol/crearRoles";
  private apiUpdateRoles = this.api.getBaseUrl + "/rol/actualizarRoles";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getRoles(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetRoles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createRoles(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateRoles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateRoles(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateRoles, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
