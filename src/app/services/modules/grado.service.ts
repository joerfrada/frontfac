import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  private apiGetGradosFull = this.api.getBaseUrl + "grado/getGradosFull";
  private apiGetGrados = this.api.getBaseUrl + "grado/getGrados";
  private apiCreateGrados = this.api.getBaseUrl + "grado/crearGrados";
  private apiUpdateGrados = this.api.getBaseUrl + "grado/actualizarGrados";
  private apiGetDetalleGrados = this.api.getBaseUrl + "grado/getDetalleGrados";

  constructor(private http: HttpClient, private api: ApiService) { }

  public getGradosFull(): Observable<any> {
    return this.http.get<any>(this.apiGetGradosFull, this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getGrados(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetGrados, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public createGrados(data: any): Observable<any> {
    return this.http.post<any>(this.apiCreateGrados, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public updateGrados(data: any): Observable<any> {
    return this.http.post<any>(this.apiUpdateGrados, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }

  public getDetalleGrados(data: any): Observable<any> {
    return this.http.post<any>(this.apiGetDetalleGrados, JSON.stringify(data), this.api.getHttpOptions('g'))
    .pipe(retry(1), catchError(this.api.errorHandle));
  }
}
