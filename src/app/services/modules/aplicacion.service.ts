import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {

  private apiGetAplicacionesFull = this.api.getBaseUrl + "aplicacion/getAplicacionesFull";
  private apiGetAplicaciones = this.api.getBaseUrl + "aplicacion/getAplicaciones";
  private apiCreateAplicaciones = this.api.getBaseUrl + "aplicacion/crearAplicaciones";
  private apiUpdateAplicaciones = this.api.getBaseUrl + "aplicacion/actualizarAplicaciones";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getAplicacionesFull(): Observable<any> {
    return this.http.get<any>(this.apiGetAplicacionesFull, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getAplicaciones(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetAplicaciones, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createAplicaciones(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateAplicaciones, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateAplicaciones(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateAplicaciones, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
