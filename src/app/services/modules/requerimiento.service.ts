import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RequerimientoService {

  private apiGetRequerimientos = this.api.getBaseUrl + "requerimiento/getRequerimientos";
  private apiCreateRequerimientos = this.api.getBaseUrl + "requerimiento/crearRequerimientos";
  private apiUpdateRequerimientos = this.api.getBaseUrl + "requerimiento/actualizarRequerimientos";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getRequerimientos(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetRequerimientos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createRequerimientos(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateRequerimientos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateRequerimientos(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateRequerimientos, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
